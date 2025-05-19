<script setup lang="ts">
definePageMeta({
  breadcrumbs: [
    {
      text: "Settings",
      href: "/settings",
    },
    {
      text: "Password",
      href: "/settings/password",
    },
  ],
});

useHead({
  title: "Password",
  meta: [
    {
      name: "description",
      content: "Settings Password",
    },
  ],
});
</script>

<template>
  <SettingsUpdatePassword />
</template>
