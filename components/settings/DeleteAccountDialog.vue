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

const isOpen = defineModel<boolean>("open");
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <slot name="trigger">
        <Button variant="destructive" class="mt-2"> Delete account </Button>
      </slot>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogDescription>
          Please proceed with caution. This action cannot be undone.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button
          variant="destructive"
          @click="
            () => {
              isOpen = false;
              toast.success('Account deleted successfully');
            }
          "
        >
          Delete account
        </Button>
        <Button variant="outline" @click="isOpen = false"> Cancel </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
