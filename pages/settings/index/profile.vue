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
    }
  ],
})
</script>

<template>
  <div class="grid gap-8">
    <SettingsProfileInformation />
    <SettingsDeleteAccount />
  </div>
</template>
