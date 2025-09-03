<script setup lang="ts">
import {
  ArrowLeft,
  Pin,
  Trash2,
} from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import LiveEditor from '@/components/ui/LiveEditor.vue'

definePageMeta({
  middleware: 'auth',
})

const route = useRoute()
const noteId = route.params.id as string

const titleContent = ref('')
const contentHtml = ref('')
const saving = ref(false)

// Fetch note
const { data: note, pending, error, refresh } = await useLazyFetch(`/api/notes/${noteId}`)

// Initialize title and content when note loads
watch(note, (newNote) => {
  if (newNote) {
    titleContent.value = newNote.title
    contentHtml.value = newNote.contentMd || ''
  }
}, { immediate: true })

useHead(() => ({
  title: note.value?.title || 'Note',
}))

function goBack() {
  history.back()
}

function formatDate(date: string) {
  if (!date)
    return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

async function togglePin() {
  try {
    await $fetch(`/api/notes/${noteId}`, {
      method: 'PATCH',
      body: { isPinned: !note.value?.isPinned },
    })
    refresh()
  }
  catch (error) {
    console.error('Error toggling pin:', error)
  }
}

async function saveTitle() {
  if (!titleContent.value.trim())
    return

  saving.value = true
  try {
    await $fetch(`/api/notes/${noteId}`, {
      method: 'PATCH',
      body: { title: titleContent.value.trim() },
    })
    refresh()
  }
  catch (error) {
    console.error('Error saving title:', error)
  }
  finally {
    saving.value = false
  }
}

async function saveContent(content: string) {
  saving.value = true
  try {
    await $fetch(`/api/notes/${noteId}`, {
      method: 'PATCH',
      body: { contentMd: content },
    })
    // Don't refresh to avoid losing editor state
  }
  catch (error) {
    console.error('Error saving content:', error)
  }
  finally {
    saving.value = false
  }
}

function blurOnEnter(event: KeyboardEvent) {
  const target = event.target as HTMLInputElement
  if (target) {
    target.blur()
  }
}

async function deleteNote() {
  // eslint-disable-next-line no-alert
  if (!confirm('Are you sure you want to delete this note?')) {
    return
  }

  try {
    await $fetch(`/api/notes/${noteId}`, {
      method: 'DELETE',
    })

    navigateTo('/notes')
  }
  catch (error) {
    console.error('Error deleting note:', error)
  }
}
</script>

<template>
  <div class="container mx-auto p-6 max-w-4xl">
    <div v-if="pending" class="space-y-4">
      <div class="h-8 w-1/2 bg-gray-200 rounded animate-pulse" />
      <div class="h-4 w-1/4 bg-gray-200 rounded animate-pulse" />
      <div class="h-64 bg-gray-200 rounded animate-pulse" />
    </div>

    <div v-else-if="error" class="text-center py-12">
      <h1 class="text-2xl font-bold mb-4">
        Note not found
      </h1>
      <p class="text-muted-foreground mb-4">
        The note you're looking for doesn't exist or has been deleted.
      </p>
      <Button @click="goBack">
        <ArrowLeft class="mr-2 h-4 w-4" />
        Go Back
      </Button>
    </div>

    <div v-else>
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-4">
          <Button variant="outline" @click="goBack">
            <ArrowLeft class="mr-2 h-4 w-4" />
            Back
          </Button>
          <div class="flex-1">
            <!-- Live Editable Title -->
            <div class="group">
              <h1 class="text-3xl font-bold tracking-tight flex items-center gap-2 cursor-text hover:bg-gray-50 dark:hover:bg-gray-900/50 px-2 py-1 rounded transition-colors">
                <Pin v-if="note?.isPinned" class="h-6 w-6 text-primary" />
                <input
                  v-model="titleContent"
                  class="bg-transparent border-none outline-none flex-1 text-3xl font-bold tracking-tight"
                  placeholder="Untitled"
                  @blur="saveTitle"
                  @keydown.enter="blurOnEnter"
                >
              </h1>
            </div>
            <p class="text-muted-foreground ml-2">
              {{ formatDate(note?.updatedAt || '') }}
            </p>
          </div>
        </div>
        <div class="flex gap-2">
          <Button variant="outline" @click="togglePin">
            <Pin class="mr-2 h-4 w-4" />
            {{ note?.isPinned ? 'Unpin' : 'Pin' }}
          </Button>
          <Button variant="destructive" @click="deleteNote">
            <Trash2 class="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <!-- Tags -->
      <div v-if="note?.tags && note.tags.length > 0" class="flex flex-wrap gap-2 mb-6">
        <Badge
          v-for="tag in note.tags"
          :key="tag.id"
          variant="secondary"
          :style="{ backgroundColor: `${tag.color}20`, color: tag.color }"
        >
          {{ tag.label }}
        </Badge>
      </div>

      <!-- Basic Tiptap Editor for Content -->
      <div class="mt-8">
        <LiveEditor
          v-model="contentHtml"
          placeholder="Start writing your note..."
          class="min-h-[400px] border border-gray-200 dark:border-gray-700 rounded-lg"
          @update:model-value="saveContent"
        />
      </div>
    </div>
  </div>
</template>
