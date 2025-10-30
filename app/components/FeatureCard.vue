<script setup lang="ts">
interface Props {
  icon: string
  title: string
  description: string
  url?: string
}

defineProps<Props>()
</script>

<template>
  <component
    :is="url ? 'NuxtLink' : 'div'"
    :to="url"
    :target="url ? '_blank' : undefined"
    :rel="url ? 'noopener noreferrer' : undefined"
    class="block h-full group"
  >
    <Card class="h-full group-hover:border-primary transition-all duration-200 relative overflow-hidden">
      <!-- background -->
      <div
        class="absolute inset-0 bg-linear-to-br/hsl from-zinc-950 to-neutral-500 from-75% z-1"
      />
      <CardContent class="p-6 space-y-3 z-10">
        <div class="text-2xl">
          {{ icon }}
        </div>
        <h3 class="text-lg font-semibold">
          {{ title }}
        </h3>
        <p class="text-sm text-muted-foreground">
          {{ description }}
        </p>
      </CardContent>
    </Card>
  </component>
</template>
