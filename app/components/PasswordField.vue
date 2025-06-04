<script setup lang="ts">
import { Eye, EyeOff } from 'lucide-vue-next'

export interface PasswordFieldProps {
  name?: string
  label?: string
  description?: string
  placeholder?: string
  withForgotPassword?: boolean
  forgotPasswordLink?: string
  forgotPasswordText?: string
}

const {
  name = 'password',
  label = 'Password',
  description = '',
  placeholder = 'Enter your password',
  withForgotPassword = false,
  forgotPasswordLink = '/auth/forgot-password',
  forgotPasswordText = 'Forgot Password?',
} = defineProps<PasswordFieldProps>()

const isPasswordVisible = ref(false)
</script>

<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem>
      <div v-if="withForgotPassword" class="flex items-center">
        <FormLabel :for="name">
          {{ label }}
        </FormLabel>
        <NuxtLink
          :to="forgotPasswordLink"
          class="ml-auto inline-block text-sm underline"
        >
          {{ forgotPasswordText }}
        </NuxtLink>
      </div>
      <FormLabel v-else>
        {{ label }}
      </FormLabel>
      <FormControl>
        <div class="relative">
          <Input
            :type="isPasswordVisible ? 'text' : 'password'"
            :placeholder="placeholder"
            v-bind="componentField"
          />
          <Button
            variant="ghost"
            type="button"
            class="absolute right-0 top-1/2 -translate-y-1/2"
            @click="isPasswordVisible = !isPasswordVisible"
          >
            <EyeOff v-if="isPasswordVisible" class="size-4" />
            <Eye v-else class="size-4" />
          </Button>
        </div>
      </FormControl>
      <FormDescription v-if="description">
        {{ description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
