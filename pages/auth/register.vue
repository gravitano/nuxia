<script setup lang="ts">
import type { RegisterFormValues } from "~/components/auth/RegisterForm.vue";

useHead({
  title: "Register",
  meta: [
    {
      name: "description",
      content: "Register page for the application.",
    },
  ],
});

definePageMeta({
  layout: "auth",
  middleware: "guest",
});

async function onSubmit(values: RegisterFormValues) {
  const res = await $fetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.data) {
    navigateTo("/auth/login");
  } else {
    // Handle error
    console.error("Login failed:", res);
  }
}
</script>

<template>
  <AuthRegisterForm @submit="onSubmit" />
</template>
