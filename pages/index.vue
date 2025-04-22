<script setup lang="ts">
definePageMeta({
  layout: "blank",
});

useHead({
  title: "Nuxt Starter Kit",
  meta: [
    {
      name: "description",
      content: "Nuxt Starter Kit",
    },
  ],
});
</script>

<template>
  <div class="flex flex-col min-h-screen bg-background">
    <header class="container mx-auto px-4 lg:px-0 py-6 flex justify-end items-center gap-2">
      <Button as-child>
        <NuxtLink to="/auth/login">Login</NuxtLink>
      </Button>
      <Button as-child>
        <NuxtLink to="/auth/register">Register</NuxtLink>
      </Button>
    </header>

    <div class="flex-1 flex items-center justify-center px-4 lg:px-0 py-4 lg:py-10">
      <Card class="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Let's get started</CardTitle>
          <CardDescription>
            Nuxt has an incredibly rich ecosystem. We suggest starting with the
            following.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul class="list-disc list-inside">
            <li>
              <a
                href="https://nuxt.com/docs/getting-started/introduction"
                target="_blank"
                class="text-primary text-sm font-medium hover:underline"
              >
                Nuxt Documentation
              </a>
            </li>
            <li>
              <a
                href="https://nuxt.com/modules"
                target="_blank"
                class="text-primary text-sm font-medium hover:underline"
              >
                Nuxt Modules
              </a>
            </li>
            <li>
              <a
                href="https://nuxt.com/examples"
                target="_blank"
                class="text-primary text-sm font-medium hover:underline"
              >
                Nuxt Examples
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
