<script setup lang="ts">
import type { LoginFormValues } from '~/components/auth/LoginForm.vue'

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
  middleware: 'guest',
})

const { fetch: refreshSession } = useUserSession()

const isLoading = ref(false)
const error = ref<string>()

function onSubmit(values: LoginFormValues) {
  isLoading.value = true
  error.value = undefined

  $fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async () => {
      await refreshSession()
      navigateTo('/dashboard')
    })
    .catch((err) => {
      error.value
        = err.data?.message
          || 'An error occurred while logging in. Please try again.'
    })
    .finally(() => {
      isLoading.value = false
    })
}
</script>

<template>
  <AuthLoginForm :is-loading="isLoading" :error="error" @submit="onSubmit" />
</template>
