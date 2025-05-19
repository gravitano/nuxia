<script setup lang="ts">
definePageMeta({
  breadcrumbs: [
    {
      text: "Settings",
      href: "/settings",
    },
    {
      text: "Appearance",
      href: "/settings/appearance",
    },
  ],
});

useHead({
  title: "Appearance",
  meta: [
    {
      name: "description",
      content: "Settings Appearance",
    },
  ],
});
</script>

<template>
  <SettingsAppearance />
</template>
