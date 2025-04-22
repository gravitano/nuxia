<script setup lang="ts">
definePageMeta({
  breadcrumbs: [
    {
      text: 'Settings',
      href: '/settings',
    },
    {
      text: 'Appearance',
      href: '/settings/appearance',
    }
  ],
})
</script>

<template>
  <SettingsAppearance />
</template>
