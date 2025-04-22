<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- Nuxt  -->
    <ClientOnly>
      <Toaster rich-colors />
    </ClientOnly>
  </div>
</template>
