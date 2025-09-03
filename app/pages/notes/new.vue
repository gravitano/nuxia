<script setup lang="ts">
import {
  ArrowLeft,
  Plus,
  Save,
  X,
} from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import TiptapEditor from '@/components/ui/tiptap/TiptapEditor.vue'

definePageMeta({
  middleware: 'auth',
})

useHead({
  title: 'Create Note',
})

const title = ref('')
const content = ref('')
const selectedTags = ref<any[]>([])
const saving = ref(false)
const showTagDialog = ref(false)
const newTagLabel = ref('')

// Fetch available tags
const { data: availableTags, refresh: refreshTags } = await useLazyFetch('/api/tags', {
  default: () => [],
})

function goBack() {
  history.back()
}

function removeTag(tagToRemove: any) {
  selectedTags.value = selectedTags.value.filter(tag => tag.id !== tagToRemove.id)
}

function isTagSelected(tag: any) {
  return selectedTags.value.some(selectedTag => selectedTag.id === tag.id)
}

function toggleTag(tag: any) {
  if (isTagSelected(tag)) {
    removeTag(tag)
  }
  else {
    selectedTags.value.push(tag)
  }
}

async function createTag() {
  if (!newTagLabel.value.trim())
    return

  try {
    const newTag = await $fetch('/api/tags', {
      method: 'POST',
      body: { label: newTagLabel.value.trim() },
    })

    selectedTags.value.push(newTag)
    newTagLabel.value = ''
    await refreshTags()
  }
  catch (error) {
    console.error('Error creating tag:', error)
  }
}

async function saveNote() {
  if (!title.value.trim())
    return

  saving.value = true

  try {
    const note = await $fetch('/api/notes', {
      method: 'POST',
      body: {
        title: title.value.trim(),
        contentMd: content.value,
        tagIds: selectedTags.value.map(tag => tag.id),
      },
    })

    navigateTo(`/notes/${note.id}`)
  }
  catch (error) {
    console.error('Error saving note:', error)
  }
  finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="container mx-auto p-6 max-w-4xl">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">
          Create Note
        </h1>
        <p class="text-muted-foreground">
          Write your thoughts and ideas
        </p>
      </div>
      <div class="flex gap-2">
        <Button variant="outline" @click="goBack">
          <ArrowLeft class="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button :disabled="!title.trim() || saving" @click="saveNote">
          <Save class="mr-2 h-4 w-4" />
          {{ saving ? 'Saving...' : 'Save' }}
        </Button>
      </div>
    </div>

    <div class="space-y-6">
      <!-- Title -->
      <div>
        <Label for="title">Title</Label>
        <Input
          id="title"
          v-model="title"
          placeholder="Enter note title..."
          class="text-lg"
        />
      </div>

      <!-- Tags -->
      <div>
        <Label>Tags</Label>
        <div class="flex flex-wrap gap-2 mt-2">
          <Badge
            v-for="tag in selectedTags"
            :key="tag.id"
            variant="secondary"
            class="cursor-pointer"
            :style="{ backgroundColor: `${tag.color}20`, color: tag.color }"
            @click="removeTag(tag)"
          >
            {{ tag.label }}
            <X class="ml-1 h-3 w-3" />
          </Badge>
          <Button variant="outline" size="sm" @click="showTagDialog = true">
            <Plus class="mr-1 h-3 w-3" />
            Add Tag
          </Button>
        </div>
      </div>

      <!-- Content -->
      <div>
        <Label for="content">Content</Label>
        <TiptapEditor
          v-model="content"
          placeholder="Start writing your note..."
          class="min-h-[400px]"
        />
      </div>
    </div>

    <!-- Tag Selection Dialog -->
    <Dialog v-model:open="showTagDialog">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Tags</DialogTitle>
        </DialogHeader>
        <div class="space-y-4">
          <div class="flex gap-2">
            <Input
              v-model="newTagLabel"
              placeholder="Create new tag..."
              @keyup.enter="createTag"
            />
            <Button @click="createTag">
              Create
            </Button>
          </div>
          <div class="flex flex-wrap gap-2">
            <Badge
              v-for="tag in availableTags"
              :key="tag.id"
              variant="outline"
              class="cursor-pointer hover:bg-gray-100"
              :class="{ 'bg-gray-100': isTagSelected(tag) }"
              @click="toggleTag(tag)"
            >
              <div
                class="w-2 h-2 rounded-full mr-2"
                :style="{ backgroundColor: tag.color }"
              />
              {{ tag.label }}
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
