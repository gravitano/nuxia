<script setup lang="ts">
definePageMeta({
  middleware: ["requires-auth"],
  breadcrumbs: [
    {
      text: "Settings",
      href: "/settings",
    },
  ],
});
</script>

<template>
  <div class="p-4 flex flex-col gap-4">
    <div class="space-y-0.5">
      <h2 class="text-xl font-semibold tracking-tight">Settings</h2>
      <p class="text-sm text-muted-foreground">
        Manage your profile and account settings
      </p>
    </div>

    <div class="flex flex-col lg:flex-row gap-6 items-start relative">
      <div class="w-full lg:w-3/12">
        <div class="sticky top-0">
          <SettingsMenu />
        </div>
      </div>
      <div class="lg:w-9/12">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>
