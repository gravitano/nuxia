<script setup lang="ts">
useHead({
  title: 'Reset Password',
  meta: [
    {
      name: 'description',
      content: 'Reset Password page for the application.',
    },
  ],
})

definePageMeta({
  layout: 'auth',
  middleware: 'guest',
})
</script>

<template>
  <AuthResetPasswordForm />
</template>
