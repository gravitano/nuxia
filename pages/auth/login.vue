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
  middleware: "guest",
});

const { fetch: refreshSession } = useUserSession();

function onSubmit(values: LoginFormValues) {
  $fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async () => {
      await refreshSession();
      navigateTo("/dashboard");
    })
    .catch((error) => {
      toast.error(
        error.data?.message ||
          "An error occurred while logging in. Please try again."
      );
    });
}
</script>

<template>
  <AuthLoginForm @submit="onSubmit" />
</template>
