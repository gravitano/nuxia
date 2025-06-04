<script setup lang="ts">
import type * as z from 'zod'
import { updateProfileSchema } from '#shared/shemas/update-profile'
import { toTypedSchema } from '@vee-validate/zod'

import { Loader } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const { isLoading } = defineProps<{
  isLoading?: boolean
}>()

defineEmits<{
  submit: [values: ProfileInformationFormValues]
}>()

export type ProfileInformationFormValues = z.infer<typeof updateProfileSchema>

const { user, fetch: refreshSession } = useUserSession()

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(updateProfileSchema),
  initialValues: {
    name: user.value?.name || '',
    email: user.value?.email || '',
  },
})

const onSubmit = handleSubmit((values) => {
  $fetch('/api/settings/profile', {
    method: 'PUT',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(() => {
      toast.success('Profile updated successfully')
      refreshSession()
    })
    .catch((error) => {
      toast.error(
        error.message || 'An error occurred while updating your profile',
      )
    })
})
</script>

<template>
  <div class="grid gap-4">
    <header>
      <h3 class="mb-0.5 text-base font-medium">
        Profile information
      </h3>
      <p class="text-sm text-muted-foreground">
        Update your name and email address
      </p>
    </header>

    <form class="grid gap-4" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Enter your full name"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

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

      <div>
        <Button type="submit" :disabled="isSubmitting || isLoading">
          <Loader
            v-if="isSubmitting || isLoading"
            class="mr-2 h-4 w-4 animate-spin"
            stroke-width="3"
          />
          Save
        </Button>
      </div>
    </form>
  </div>
</template>
