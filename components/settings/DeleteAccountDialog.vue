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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const isOpen = defineModel<boolean>("open");

const formSchema = z.object({
  password: z.string(),
});

const { handleSubmit, isSubmitting, meta } = useForm({
  validationSchema: toTypedSchema(formSchema),
});

const onSubmit = handleSubmit((_values) => {
  toast.success("Account deleted successfully");
  isOpen.value = false;
  navigateTo("/auth/login");
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
            :disabled="isSubmitting || !meta.valid"
          >
            Delete account
          </Button>
          <Button type="button" variant="outline" @click="isOpen = false">
            Cancel
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
