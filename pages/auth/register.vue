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

function onSubmit(values: RegisterFormValues) {
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
    .catch((error) => {
      toast.error(
        error.data?.message ||
          "An error occurred while registering. Please try again."
      );
    });
}
</script>

<template>
  <AuthRegisterForm @submit="onSubmit" />
</template>
