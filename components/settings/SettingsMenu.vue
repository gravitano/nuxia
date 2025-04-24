<script setup lang="ts">
const menus = [
  {
    label: "Profile",
    to: "/settings/profile",
  },
  {
    label: "Password",
    to: "/settings/password",
  },
  {
    label: "Appearance",
    to: "/settings/appearance",
  },
];
</script>

<template>
  <ul class="space-y-0.5">
    <li v-for="menu in menus" :key="menu.label">
      <NuxtLink
        :to="menu.to"
        class="w-full flex items-center px-3 py-2 rounded-md hover:bg-sidebar-accent dark:hover:bg-neutral-900 text-sm font-medium"
        exact-active-class="bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
      >
        {{ menu.label }}
      </NuxtLink>
    </li>
  </ul>
</template>
