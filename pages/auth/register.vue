<script setup lang="ts">
import { toast } from "vue-sonner";
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

const isLoading = ref(false);
const error = ref<string>();

function onSubmit(values: RegisterFormValues) {
  isLoading.value = true;
  error.value = undefined;

  $fetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(() => {
      navigateTo("/auth/login");
    })
    .catch((err) => {
      error.value =
        err.data?.message ||
        "An error occurred while registering. Please try again.";
    })
    .finally(() => {
      isLoading.value = false;
    });
}
</script>

<template>
  <AuthRegisterForm :is-loading="isLoading" :error="error" @submit="onSubmit" />
</template>
