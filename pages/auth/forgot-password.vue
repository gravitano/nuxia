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
})
</script>

<template>
  <AuthForgotPasswordForm />
</template>
