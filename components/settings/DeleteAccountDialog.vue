<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "vue-sonner";

import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { deleteAccountSchema } from "~/shared/shemas/delete-account";
import { Loader } from "lucide-vue-next";

const isOpen = defineModel<boolean>("open");

const { handleSubmit, isSubmitting, meta } = useForm({
  validationSchema: toTypedSchema(deleteAccountSchema),
});

const { clear } = useUserSession();

const isLoading = ref(false);

const onSubmit = handleSubmit((values) => {
  isLoading.value = true;

  $fetch("/api/settings/account", {
    method: "DELETE",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(() => {
      toast.success("Account deleted successfully");
      isOpen.value = false;
      clear();
      navigateTo("/auth/login");
    })
    .catch((error) => {
      toast.error(
        error.data?.message || "An error occurred while deleting your account"
      );
    })
    .finally(() => {
      isLoading.value = false;
    });
});
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <slot name="trigger">
        <Button variant="destructive" class="mt-2"> Delete account </Button>
      </slot>
    </DialogTrigger>
    <DialogContent>
      <form class="grid gap-4" @submit="onSubmit">
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete your account?
          </DialogTitle>
          <DialogDescription>
            Once your account is deleted, all of its resources and data will
            also be permanently deleted. Please enter your password to confirm
            you would like to permanently delete your account.
          </DialogDescription>
        </DialogHeader>

        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
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

        <DialogFooter>
          <Button
            variant="destructive"
            type="submit"
            :disabled="isSubmitting || !meta.valid || isLoading"
          >
            <Loader
              v-if="isSubmitting || isLoading"
              class="mr-2 h-4 w-4 animate-spin"
            />
            Delete account
          </Button>
          <Button
            type="button"
            variant="outline"
            :disabled="isSubmitting || isLoading"
            @click="isOpen = false"
          >
            Cancel
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
