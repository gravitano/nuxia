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
import { Loader } from "lucide-vue-next";

const { isLoading } = defineProps<{
  isLoading?: boolean;
  error?: string;
}>();

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

          <AlertMessage v-if="error" variant="error" :description="error" />

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

          <PasswordField with-forgot-password />

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
            {{ isSubmitting || isLoading ? "Logging in..." : "Login" }}
          </Button>
          <Button
            type="button"
            variant="outline"
            class="w-full"
            :disabled="isSubmitting || isLoading"
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
