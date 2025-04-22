<script setup lang="ts">
definePageMeta({
  breadcrumbs: [
    {
      text: 'Settings',
      href: '/settings',
    },
    {
      text: 'Password',
      href: '/settings/password',
    }
  ],
})
</script>

<template>
  <SettingsUpdatePassword />
</template>
