<script setup lang="ts">
import { debounce } from 'lodash-es'
import {
  FileText,
  Pin,
  Plus,
} from 'lucide-vue-next'
import NoteCard from '@/components/notes/NoteCard.vue'

definePageMeta({
  middleware: 'auth',
})

useHead({
  title: 'Notes',
})

const searchQuery = ref('')
const selectedTag = ref('')
const showPinnedOnly = ref(false)
const currentPage = ref(1)

// Fetch notes with reactive params
const { data, pending, refresh } = await useLazyFetch('/api/notes', {
  query: computed(() => ({
    q: searchQuery.value || undefined,
    tag: selectedTag.value || undefined,
    pinned: showPinnedOnly.value || undefined,
    page: currentPage.value,
    limit: 12,
  })),
  default: () => ({ notes: [], pagination: { page: 1, limit: 12, total: 0, totalPages: 0 } }),
})

// Debounced search
const debouncedSearch = debounce(() => {
  currentPage.value = 1
  refresh()
}, 300)

function onSearchInput() {
  debouncedSearch()
}

function createNote() {
  navigateTo('/notes/new')
}

function openNote(id: number) {
  navigateTo(`/notes/${id}`)
}

function togglePinnedFilter() {
  showPinnedOnly.value = !showPinnedOnly.value
  currentPage.value = 1
  refresh()
}

async function togglePin(note: any) {
  try {
    await $fetch(`/api/notes/${note.id}`, {
      method: 'PATCH',
      body: { isPinned: !note.isPinned },
    })
    refresh()
  }
  catch (error) {
    console.error('Error toggling pin:', error)
  }
}

async function deleteNote(note: any) {
  if (!window.confirm('Are you sure you want to delete this note?')) {
    return
  }

  try {
    await $fetch(`/api/notes/${note.id}`, {
      method: 'DELETE',
    })
    refresh()
  }
  catch (error) {
    console.error('Error deleting note:', error)
  }
}

// Watch for pinned changes
watch(showPinnedOnly, () => {
  currentPage.value = 1
  refresh()
})
</script>

<template>
  <div class="container mx-auto p-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">
          Notes
        </h1>
        <p class="text-muted-foreground">
          Manage your personal notes
        </p>
      </div>
      <Button @click="createNote">
        <Plus class="mr-2 h-4 w-4" />
        New Note
      </Button>
    </div>

    <!-- Search and Filter Bar -->
    <div class="flex flex-col sm:flex-row gap-4 mb-6">
      <div class="flex-1">
        <Input
          v-model="searchQuery"
          placeholder="Search notes..."
          class="w-full"
          @input="onSearchInput"
        />
      </div>
      <div class="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          :class="{ 'bg-primary text-primary-foreground': showPinnedOnly }"
          @click="togglePinnedFilter"
        >
          <Pin class="mr-2 h-4 w-4" />
          Pinned
        </Button>
      </div>
    </div>

    <!-- Notes Grid -->
    <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card v-for="i in 6" :key="i" class="h-48">
        <CardContent class="p-4">
          <div class="h-4 w-3/4 mb-2 bg-gray-200 rounded animate-pulse" />
          <div class="h-3 w-full mb-2 bg-gray-200 rounded animate-pulse" />
          <div class="h-3 w-2/3 bg-gray-200 rounded animate-pulse" />
        </CardContent>
      </Card>
    </div>

    <div v-else-if="data?.notes.length === 0" class="text-center py-12">
      <FileText class="mx-auto h-12 w-12 text-muted-foreground mb-4" />
      <h3 class="text-lg font-medium mb-2">
        No notes found
      </h3>
      <p class="text-muted-foreground mb-4">
        {{ searchQuery || selectedTag ? 'Try adjusting your search or filters' : 'Create your first note to get started' }}
      </p>
      <Button v-if="!searchQuery && !selectedTag" @click="createNote">
        <Plus class="mr-2 h-4 w-4" />
        Create Note
      </Button>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <NoteCard
        v-for="note in data?.notes"
        :key="note.id"
        :note="note"
        @click="openNote(note.id)"
        @toggle-pin="togglePin(note)"
        @delete="deleteNote(note)"
      />
    </div>
  </div>
</template>
