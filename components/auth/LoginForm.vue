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

const emit = defineEmits<{
  submit: [values: LoginFormValues];
}>();

const formSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string(),
});

export type LoginFormValues = z.infer<typeof formSchema>;

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(formSchema),
});

const onSubmit = handleSubmit((values) => {
  emit("submit", values);
});
</script>

<template>
  <form class="w-full max-w-sm" @submit="onSubmit">
    <Card>
      <CardHeader>
        <CardTitle class="text-2xl"> Login </CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <AlertMessage
            v-if="$route.query.verified"
            variant="success"
            description="Email verified successfully!"
          />

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

          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <div class="flex items-center">
                <FormLabel for="password">Password</FormLabel>
                <NuxtLink
                  to="/auth/forgot-password"
                  class="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </NuxtLink>
              </div>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <Button type="submit" class="w-full" :disabled="isSubmitting">
            Login
          </Button>
          <Button
            type="button"
            variant="outline"
            class="w-full"
            :disabled="isSubmitting"
          >
            Login with Google
          </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <NuxtLink to="/auth/register" class="underline"> Sign up </NuxtLink>
        </div>
      </CardContent>
    </Card>
  </form>
</template>
