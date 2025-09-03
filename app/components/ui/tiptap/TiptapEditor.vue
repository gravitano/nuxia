<script setup lang="ts">
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Props {
  modelValue?: string
  placeholder?: string
  editable?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'Start writing...',
  editable: true,
  class: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const editor = ref<Editor>()

onMounted(() => {
  editor.value = new Editor({
    content: props.modelValue,
    editable: props.editable,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        codeBlock: {
          languageClassPrefix: 'language-',
        },
      }),
      Placeholder.configure({
        placeholder: props.placeholder,
      }),
    ],
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      emit('update:modelValue', html)
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4',
      },
    },
  })
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})

// Watch for external changes to modelValue
watch(() => props.modelValue, (newValue) => {
  if (editor.value && editor.value.getHTML() !== newValue) {
    editor.value.commands.setContent(newValue)
  }
})

// Watch for editable changes
watch(() => props.editable, (newValue) => {
  if (editor.value) {
    editor.value.setEditable(newValue)
  }
})

// Toolbar commands
const toggleBold = () => editor.value?.chain().focus().toggleBold().run()
const toggleItalic = () => editor.value?.chain().focus().toggleItalic().run()
const toggleStrike = () => editor.value?.chain().focus().toggleStrike().run()
const toggleCode = () => editor.value?.chain().focus().toggleCode().run()
const toggleBulletList = () => editor.value?.chain().focus().toggleBulletList().run()
const toggleOrderedList = () => editor.value?.chain().focus().toggleOrderedList().run()
const toggleBlockquote = () => editor.value?.chain().focus().toggleBlockquote().run()
const setHorizontalRule = () => editor.value?.chain().focus().setHorizontalRule().run()

function setHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  editor.value?.chain().focus().toggleHeading({ level }).run()
}

// Check if command is active
function isActive(name: string, attributes = {}) {
  return editor.value?.isActive(name, attributes) || false
}
</script>

<template>
  <div :class="cn('border rounded-md', props.class)">
    <!-- Toolbar -->
    <div v-if="editable" class="border-b p-2 flex flex-wrap gap-1">
      <!-- Typography -->
      <Button
        variant="ghost"
        size="sm"
        :class="{ 'bg-muted': isActive('heading', { level: 1 }) }"
        @click="setHeading(1)"
      >
        H1
      </Button>
      <Button
        variant="ghost"
        size="sm"
        :class="{ 'bg-muted': isActive('heading', { level: 2 }) }"
        @click="setHeading(2)"
      >
        H2
      </Button>
      <Button
        variant="ghost"
        size="sm"
        :class="{ 'bg-muted': isActive('heading', { level: 3 }) }"
        @click="setHeading(3)"
      >
        H3
      </Button>

      <div class="w-px h-6 bg-border mx-1" />

      <!-- Text formatting -->
      <Button
        variant="ghost"
        size="sm"
        :class="{ 'bg-muted': isActive('bold') }"
        @click="toggleBold"
      >
        <span class="font-bold">B</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        :class="{ 'bg-muted': isActive('italic') }"
        @click="toggleItalic"
      >
        <span class="italic">I</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        :class="{ 'bg-muted': isActive('strike') }"
        @click="toggleStrike"
      >
        <span class="line-through">S</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        :class="{ 'bg-muted': isActive('code') }"
        @click="toggleCode"
      >
        <span class="font-mono text-sm">Code</span>
      </Button>

      <div class="w-px h-6 bg-border mx-1" />

      <!-- Lists -->
      <Button
        variant="ghost"
        size="sm"
        :class="{ 'bg-muted': isActive('bulletList') }"
        @click="toggleBulletList"
      >
        • List
      </Button>
      <Button
        variant="ghost"
        size="sm"
        :class="{ 'bg-muted': isActive('orderedList') }"
        @click="toggleOrderedList"
      >
        1. List
      </Button>

      <div class="w-px h-6 bg-border mx-1" />

      <!-- Other -->
      <Button
        variant="ghost"
        size="sm"
        :class="{ 'bg-muted': isActive('blockquote') }"
        @click="toggleBlockquote"
      >
        Quote
      </Button>
      <Button
        variant="ghost"
        size="sm"
        @click="setHorizontalRule"
      >
        HR
      </Button>
    </div>

    <!-- Editor Content -->
    <EditorContent :editor="editor" />
  </div>
</template>

<style>
/* Tiptap Editor Styles */
.ProseMirror {
  outline: none;
}

.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}

.ProseMirror h1 {
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 2.25rem;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.ProseMirror h2 {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 2rem;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
}

.ProseMirror h3 {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.75rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.ProseMirror h4,
.ProseMirror h5,
.ProseMirror h6 {
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.75rem;
  margin-top: 0.75rem;
  margin-bottom: 0.25rem;
}

.ProseMirror p {
  margin-bottom: 0.75rem;
}

.ProseMirror ul,
.ProseMirror ol {
  margin-bottom: 0.75rem;
  padding-left: 1.5rem;
}

.ProseMirror ul {
  list-style-type: disc;
}

.ProseMirror ol {
  list-style-type: decimal;
}

.ProseMirror li {
  margin-bottom: 0.25rem;
}

.ProseMirror blockquote {
  border-left: 4px solid #e5e7eb;
  padding-left: 1rem;
  margin: 1rem 0;
  font-style: italic;
  color: #6b7280;
}

.ProseMirror code {
  background-color: #f3f4f6;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-family: ui-monospace, SFMono-Regular, 'SF Mono', monospace;
  font-size: 0.875rem;
}

.ProseMirror pre {
  background-color: #1f2937;
  color: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1rem 0;
}

.ProseMirror pre code {
  background-color: transparent;
  padding: 0;
  color: inherit;
}

.ProseMirror hr {
  border: none;
  border-top: 2px solid #e5e7eb;
  margin: 2rem 0;
}
</style>
