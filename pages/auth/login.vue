<script setup lang="ts">
import type { LoginFormValues } from '~/components/auth/LoginForm.vue';

useHead({
  title: 'Login',
  meta: [
    {
      name: 'description',
      content: 'Login page for the application.',
    },
  ],
})

definePageMeta({
  layout: 'auth',
})

async function onSubmit(values: LoginFormValues) {
  const res = await $fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.data) {
    // Handle successful login
    navigateTo('/dashboard');
  } else {
    // Handle error
    console.error('Login failed:', res);
  }
}
</script>

<template>
  <AuthLoginForm @submit="onSubmit" />
</template>
