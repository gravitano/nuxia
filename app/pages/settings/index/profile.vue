<script setup lang="ts">
definePageMeta({
  breadcrumbs: [
    {
      text: 'Settings',
      href: '/settings',
    },
    {
      text: 'Profile',
      href: '/settings/profile',
    },
  ],
})

useHead({
  title: 'Profile',
  meta: [
    {
      name: 'description',
      content: 'Settings Profile',
    },
  ],
})
</script>

<template>
  <div class="grid gap-8">
    <SettingsProfileInformation />
    <SettingsDeleteAccount />
  </div>
</template>
