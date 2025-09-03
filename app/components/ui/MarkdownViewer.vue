<script setup lang="ts">
import { cn } from '@/lib/utils'

interface Props {
  content?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  content: '',
  class: '',
})
</script>

<template>
  <div :class="cn('prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-blockquote:border-l-blue-500', props.class)">
    <MDC
      v-if="content"
      :value="content"
      :data="{}"
    />
    <div
      v-else
      class="text-muted-foreground italic text-center py-8"
    >
      No content available
    </div>
  </div>
</template>
