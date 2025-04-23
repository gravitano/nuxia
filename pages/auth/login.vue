<script setup lang="ts">
import { toast } from "vue-sonner";
import type { LoginFormValues } from "~/components/auth/LoginForm.vue";

useHead({
  title: "Login",
  meta: [
    {
      name: "description",
      content: "Login page for the application.",
    },
  ],
});

definePageMeta({
  layout: "auth",
});

async function onSubmit(values: LoginFormValues) {
  const res = await $fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.data) {
    navigateTo("/dashboard");
  } else {
    toast.error("Login failed. Please check your credentials.");
  }
}
</script>

<template>
  <AuthLoginForm @submit="onSubmit" />
</template>
