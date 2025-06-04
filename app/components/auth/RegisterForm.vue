<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Loader } from 'lucide-vue-next'
import { useForm } from 'vee-validate'

import * as z from 'zod'
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
  error?: string
}>()

const emit = defineEmits<{
  submit: [values: RegisterFormValues]
}>()

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string(),
})

export type RegisterFormValues = z.infer<typeof formSchema>

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(formSchema),
})

const onSubmit = handleSubmit((values) => {
  emit('submit', values)
})
</script>

<template>
  <form class="w-full max-w-sm" @submit="onSubmit">
    <Card>
      <CardHeader>
        <CardTitle class="text-xl">
          Sign Up
        </CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <AlertMessage v-if="error" variant="error" :description="error" />

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
            {{ isSubmitting || isLoading ? "Creating..." : "Create Account" }}
          </Button>

          <Button
            type="button"
            variant="outline"
            class="w-full"
            :disabled="isSubmitting || isLoading"
          >
            Sign up with Google
          </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Already have an account?
          <NuxtLink to="/auth/login" class="underline">
            Sign in
          </NuxtLink>
        </div>
      </CardContent>
    </Card>
  </form>
</template>
