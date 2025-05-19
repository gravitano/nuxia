<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import type { AlertMessageProps } from "../alert/AlertMessage.vue";
import { resetPasswordSchema } from "#shared/shemas/reset-password";
import { Loader } from "lucide-vue-next";

const route = useRoute();
const token = route.query.token as string;

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: toTypedSchema(resetPasswordSchema),
});

const isLoading = ref(false);
const alert = reactive<AlertMessageProps>({
  description: "",
  variant: "info",
});

const onSubmit = handleSubmit((values) => {
  isLoading.value = true;
  alert.description = "";

  $fetch("/api/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({
      ...values,
      token,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(() => {
      alert.description = "Password reset successfully";
      alert.variant = "success";
      resetForm();
      navigateTo("/auth/login");
    })
    .catch((error) => {
      alert.description =
        error.data?.message || "An error occurred. Please try again.";
      alert.variant = "error";
    })
    .finally(() => {
      isLoading.value = false;
    });
});
</script>

<template>
  <form class="w-full max-w-sm" @submit="onSubmit">
    <Card>
      <CardHeader>
        <CardTitle class="text-2xl"> Reset Password </CardTitle>
        <CardDescription>
          Enter your current password and new password below to reset your
          password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <AlertMessage v-if="alert.description" v-bind="alert" />

          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="new_password">
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your new password"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="confirm_password">
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm your new password"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <Button
            type="submit"
            class="w-full"
            :disabled="isSubmitting || isLoading"
          >
            <Loader
              v-if="isSubmitting || isLoading"
              class="h-4 w-4 animate-spin"
              aria-hidden="true"
            />
            Reset Password
          </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Or, return to
          <NuxtLink to="/auth/login" class="underline"> Sign in </NuxtLink>
        </div>
      </CardContent>
    </Card>
  </form>
</template>
