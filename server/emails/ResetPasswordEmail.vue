<script setup lang="ts">
import {
  Button,
  Container,
  Font,
  Head,
  Html,
  Section,
  Tailwind,
  Text,
} from '@vue-email/components'

defineProps<{
  name: string
  resetUrl: string
}>()
</script>

<template>
  <Tailwind
    :config="{
      theme: {
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
        extend: {
          colors: {
            brand: '#007291',
            text: '#333',
          },
        },
      },
    }"
  >
    <Html lang="en">
      <Head>
        <Font
          font-family="Inter"
          fallback-font-family="Arial"
          :web-font="{
            url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap',
            format: 'woff2',
          }"
          :font-weight="400"
          font-style="normal"
        />
      </Head>
      <Section class="bg-gray-100 py-10 px-5 font-sans">
        <Container class="bg-white max-w-xl mx-auto p-6 rounded-lg shadow">
          <Text class="text-sm text-gray-500 mb-4">
            Hello {{ name }},
          </Text>

          <Text class="text-text text-base mb-6">
            You recently requested to reset your password. Click the button
            below to proceed:
          </Text>

          <Button
            :href="resetUrl"
            class="bg-brand px-4 py-2 text-white font-semibold rounded inline-block"
          >
            Reset Password
          </Button>

          <Text class="text-sm text-gray-500 mt-6">
            If you didn't request a password reset, you can safely ignore this
            email.
          </Text>

          <Text class="text-xs text-gray-400 mt-8">
            © 2025 Your Company. All rights reserved.
          </Text>
        </Container>
      </Section>
    </Html>
  </Tailwind>
</template>
