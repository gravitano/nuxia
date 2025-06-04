<script setup lang="ts">
import { AlertCircle, CheckCircle, FileWarning, Info } from 'lucide-vue-next'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export interface AlertMessageProps {
  title?: string
  description: string
  variant?: 'info' | 'success' | 'warning' | 'error'
}

const {
  title,
  description,
  variant = 'info',
} = defineProps<AlertMessageProps>()

const alertIcon = computed(() => {
  switch (variant) {
    case 'info':
      return Info
    case 'success':
      return CheckCircle
    case 'warning':
      return FileWarning
    case 'error':
      return AlertCircle
    default:
      return Info
  }
})
</script>

<template>
  <Alert :variant="variant">
    <component :is="alertIcon" class="w-4 h-4" />
    <AlertTitle v-if="title">
      {{ title }}
    </AlertTitle>
    <AlertDescription>
      {{ description }}
    </AlertDescription>
  </Alert>
</template>
