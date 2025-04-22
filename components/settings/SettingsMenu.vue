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
        class="w-full flex items-center px-3 py-2 rounded-md hover:bg-gray-100 text-sm font-medium"
        exact-active-class="bg-gray-100 text-gray-900"
      >
        {{ menu.label }}
      </NuxtLink>
    </li>
  </ul>
</template>
