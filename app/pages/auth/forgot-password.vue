<script setup lang="ts">
useHead({
  title: 'Forgot Password',
  meta: [
    {
      name: 'description',
      content: 'Forgot Password page for the application.',
    },
  ],
})

definePageMeta({
  layout: 'auth',
  middleware: 'guest',
})
</script>

<template>
  <AuthForgotPasswordForm />
</template>
