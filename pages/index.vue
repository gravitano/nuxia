<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

definePageMeta({
  layout: "blank",
});
</script>

<template>
  <div>
    <header class="container">
      <Button as-child>
        <NuxtLink to="/auth/login">Login</NuxtLink>
      </Button>
      <Button as-child>
        <NuxtLink to="/auth/register">Register</NuxtLink>
      </Button>
    </header>

    <div class="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <h2 class="font-semibold text-lg">Let's get started</h2>

          <p class="mt-2">
            Nuxt has an incredibly rich ecosystem. We suggest starting with the
            following.
          </p>

          <ul class="list-disc list-inside mt-1">
            <li>
              <a
                href="https://nuxt.com/docs/getting-started/introduction"
                target="_blank"
                class="text-blue-500 hover:underline"
              >
                Nuxt Documentation
              </a>
            </li>
            <li>
              <a
                href="https://nuxt.com/modules"
                target="_blank"
                class="text-blue-500 hover:underline"
              >
                Nuxt Modules
              </a>
            </li>
            <li>
              <a
                href="https://nuxt.com/examples"
                target="_blank"
                class="text-blue-500 hover:underline"
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
