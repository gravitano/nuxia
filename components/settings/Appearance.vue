<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Computer, Moon, Sun } from "lucide-vue-next";

const activeTab = ref("system");
const tabs = [
  {
    value: "system",
    label: "System",
    icon: Computer,
  },
  {
    value: "dark",
    label: "Dark",
    icon: Moon,
  },
  {
    value: "light",
    label: "Light",
    icon: Sun,
  },
];
</script>

<template>
  <div class="grid gap-4">
    <header>
      <h3 class="mb-0.5 text-base font-medium">Appearance settings</h3>
      <p class="text-sm text-muted-foreground">
        Update your account's appearance settings
      </p>
    </header>

    <Tabs v-model="activeTab">
      <TabsList>
        <TabsTrigger v-for="tab in tabs" :key="tab.value" :value="tab.value">
          <component :is="tab.icon" class="mr-2 h-4 w-4" />
          {{ tab.label }}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  </div>
</template>
