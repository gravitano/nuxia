<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updatePasswordSchema } from "#shared/shemas/update-password";
import { toast } from "vue-sonner";
import { Loader } from "lucide-vue-next";

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: toTypedSchema(updatePasswordSchema),
});

const isLoading = ref(false);

const onSubmit = handleSubmit((values) => {
  isLoading.value = true;

  $fetch("/api/settings/password", {
    method: "PUT",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(() => {
      toast.success("Password updated successfully");
      resetForm();
    })
    .catch((error) => {
      toast.error(
        error.data?.message || "An error occurred while updating your password"
      );
    })
    .finally(() => {
      isLoading.value = false;
    });
});
</script>

<template>
  <div class="grid gap-4">
    <header>
      <h3 class="mb-0.5 text-base font-medium">Update password</h3>
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
        <Button type="submit" :disabled="isSubmitting || isLoading">
          <Loader
            v-if="isSubmitting || isLoading"
            class="mr-2 h-4 w-4 animate-spin"
          />
          Save Password
        </Button>
      </div>
    </form>
  </div>
</template>
