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

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
});

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(formSchema),
});

const onSubmit = handleSubmit((values) => {
  // Handle form submission
});
</script>

<template>
  <div class="grid gap-4">
    <header>
      <h3 class="mb-0.5 text-base font-medium">
        Update password
      </h3>
      <p class="text-sm text-muted-foreground">
        Ensure your account is using a long, random password to stay secure
      </p>
    </header>

    <form class="grid gap-4" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="current_password">
        <FormItem>
          <FormLabel>Current Password</FormLabel>
          <FormControl>
            <Input
              type="password"
              placeholder="Enter your current password"
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

      <div>
        <Button type="submit" :disabled="isSubmitting"> Save Password </Button>
      </div>
    </form>
  </div>
</template>
