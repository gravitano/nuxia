<script setup lang="ts">
useHead({
  title: "Resend Verification Email",
  meta: [
    {
      name: "description",
      content: "Resend Verification Email",
    },
  ],
});

definePageMeta({
  layout: "auth",
  middleware: "guest",
});
</script>

<template>
  <AuthForgotPasswordForm />
</template>
