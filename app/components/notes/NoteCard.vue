<script setup lang="ts">
import {
  MoreVertical,
  Pin,
  Trash2,
} from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Define component name for debugging
defineOptions({
  name: 'NoteCard',
})

const props = defineProps<Props>()

defineEmits<{
  click: []
  togglePin: []
  delete: []
}>()

interface Note {
  id: number
  title: string
  contentMd: string
  isPinned: boolean
  createdAt: string
  updatedAt: string
  tags: Array<{
    id: number
    label: string
    color: string
  }>
}

interface Props {
  note: Note
}

const preview = computed(() => {
  if (!props.note.contentMd)
    return 'No content'

  // More comprehensive markdown cleaning
  return props.note.contentMd
    .replace(/#{1,6}\s/g, '') // Remove headings
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/~~(.*?)~~/g, '$1') // Remove strikethrough
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links but keep text
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/```[\s\S]*?```/g, '[Code Block]') // Replace code blocks
    .replace(/>\s/g, '') // Remove blockquotes
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .replace(/\s+/g, ' ') // Collapse multiple spaces
    .trim()
    .substring(0, 150) + (props.note.contentMd.length > 150 ? '...' : '')
})

const formattedDate = computed(() => {
  return new Date(props.note.updatedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
})
</script>

<template>
  <Card
    class="cursor-pointer hover:shadow-md transition-shadow"
    @click="$emit('click')"
  >
    <CardHeader class="pb-3">
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <CardTitle class="text-lg line-clamp-2">
            <Pin
              v-if="note.isPinned"
              class="inline h-4 w-4 mr-2 text-primary"
            />
            {{ note.title }}
          </CardTitle>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="sm" @click.stop>
              <MoreVertical class="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem @click.stop="$emit('togglePin')">
              <Pin class="mr-2 h-4 w-4" />
              {{ note.isPinned ? 'Unpin' : 'Pin' }}
            </DropdownMenuItem>
            <DropdownMenuItem @click.stop="$emit('delete')">
              <Trash2 class="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </CardHeader>
    <CardContent class="pt-0">
      <p class="text-sm text-muted-foreground line-clamp-3 mb-3">
        {{ preview }}
      </p>
      <div class="flex flex-wrap gap-1 mb-3">
        <Badge
          v-for="tag in note.tags"
          :key="tag.id"
          variant="secondary"
          class="text-xs"
          :style="{ backgroundColor: `${tag.color}20`, color: tag.color }"
        >
          {{ tag.label }}
        </Badge>
      </div>
      <p class="text-xs text-muted-foreground">
        {{ formattedDate }}
      </p>
    </CardContent>
  </Card>
</template>
