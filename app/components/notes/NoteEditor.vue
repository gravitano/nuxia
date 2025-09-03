<script setup lang="ts">
import {
  Plus,
  X,
} from 'lucide-vue-next'
import { TiptapEditor } from '@/components/ui/tiptap'

interface Tag {
  id: number
  label: string
  color: string
}

interface Props {
  title?: string
  content?: string
  tags?: Tag[]
  availableTags?: Tag[]
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  content: '',
  tags: () => [],
  availableTags: () => [],
})

const emit = defineEmits<{
  'update:title': [value: string]
  'update:content': [value: string]
  'update:tags': [value: Tag[]]
  'refreshTags': []
}>()

const localTitle = computed({
  get: () => props.title,
  set: value => emit('update:title', value),
})

const localContent = computed({
  get: () => props.content,
  set: value => emit('update:content', value),
})

const selectedTags = computed({
  get: () => props.tags,
  set: value => emit('update:tags', value),
})

const showTagDialog = ref(false)
const newTagLabel = ref('')

function removeTag(tagToRemove: Tag) {
  selectedTags.value = selectedTags.value.filter(tag => tag.id !== tagToRemove.id)
}

function isTagSelected(tag: Tag) {
  return selectedTags.value.some(selectedTag => selectedTag.id === tag.id)
}

function toggleTag(tag: Tag) {
  if (isTagSelected(tag)) {
    removeTag(tag)
  }
  else {
    selectedTags.value = [...selectedTags.value, tag]
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

    selectedTags.value = [...selectedTags.value, newTag]
    newTagLabel.value = ''
    emit('refreshTags')
  }
  catch (error) {
    console.error('Error creating tag:', error)
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Title -->
    <div>
      <Label for="title">Title</Label>
      <Input
        id="title"
        v-model="localTitle"
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
        v-model="localContent"
        placeholder="Start writing your note... Use **bold**, *italic*, # headings, and more markdown syntax."
        class="mt-2"
      />
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
            <Button :disabled="!newTagLabel.trim()" @click="createTag">
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
