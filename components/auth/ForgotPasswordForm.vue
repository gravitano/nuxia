<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { AlertMessageProps } from "../alert/AlertMessage.vue";

const formSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
});

export type LoginFormValues = z.infer<typeof formSchema>;

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: toTypedSchema(formSchema),
});

const alert = reactive<AlertMessageProps>({
  description: "",
  variant: "info",
});

const onSubmit = handleSubmit((values) => {
  alert.description = "";

  $fetch("/api/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(() => {
      alert.description = "Password reset link sent to your email";
      alert.variant = "success";
      resetForm();
    })
    .catch((error) => {
      alert.description =
        error.data?.message || "An error occurred. Please try again.";
      alert.variant = "error";
    });
});
</script>

<template>
  <form class="w-full max-w-sm" @submit="onSubmit">
    <Card>
      <CardHeader>
        <CardTitle class="text-2xl"> Forgot Password </CardTitle>
        <CardDescription>
          Enter your email below to reset your password
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

          <Button type="submit" class="w-full" :disabled="isSubmitting">
            Send password reset link
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
