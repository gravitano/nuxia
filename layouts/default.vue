<script setup lang="ts">
import AppSidebar from "@/components/AppSidebar.vue";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const route = useRoute();
const breadcrumbs = computed(() => {
  return (route.meta?.breadcrumbs ?? []) as Array<{
    text: string;
    href: string;
  }>;
});
const hasBreadcrumbs = computed(() => {
  return breadcrumbs.value.length > 0;
});
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header
        class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
      >
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator
            orientation="vertical"
            class="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb v-if="hasBreadcrumbs">
            <BreadcrumbList>
              <template v-for="(crumb, index) in breadcrumbs" :key="index">
                <BreadcrumbItem class="hidden md:block">
                  <BreadcrumbPage v-if="index === breadcrumbs.length - 1">
                    {{ crumb.text }}
                  </BreadcrumbPage>

                  <BreadcrumbLink v-else :href="crumb.href">
                    {{ crumb.text }}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator
                  class="hidden md:block"
                  v-if="index < breadcrumbs.length - 1"
                />
              </template>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <!-- content -->
      <slot />
    </SidebarInset>
  </SidebarProvider>
</template>
