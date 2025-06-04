<script setup lang="ts">
import type { LucideIcon } from 'lucide-vue-next'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

defineProps<{
  groupLabel?: string
  items: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}>()
</script>

<template>
  <SidebarGroup class="group-data-[collapsible=icon]:hidden">
    <SidebarGroupLabel v-if="groupLabel">
      {{ groupLabel }}
    </SidebarGroupLabel>
    <SidebarMenu>
      <SidebarMenuItem v-for="item in items" :key="item.name">
        <SidebarMenuButton as-child>
          <NuxtLink :to="item.url">
            <component :is="item.icon" />
            <span>{{ item.name }}</span>
          </NuxtLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>
