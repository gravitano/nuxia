<script setup lang="ts">
definePageMeta({
  layout: 'blank',
})

const appConfig = useAppConfig()

useSeoMeta({
  title: appConfig.app.name,
  description: appConfig.app.description,
  ogTitle: appConfig.app.name,
  ogDescription: appConfig.app.description,
})

const { loggedIn } = useUserSession()

const techStack = [
  {
    icon: '✅',
    name: 'Nuxt',
    description: 'The Progressive Web Framework',
    url: 'https://nuxt.com',
  },
  {
    icon: '🎨',
    name: 'Tailwind CSS',
    description: 'Utility-first CSS framework for rapid UI development',
    url: 'https://tailwindcss.com',
  },
  {
    icon: '🧩',
    name: 'shadcn-vue',
    description: 'Beautiful UI components built with Tailwind CSS',
    url: 'https://www.shadcn-vue.com/',
  },
  {
    icon: '🧠',
    name: 'Drizzle ORM',
    description: 'Headless TypeScript ORM with a head',
    url: 'https://orm.drizzle.team',
  },
  {
    icon: '🐘',
    name: 'PostgreSQL',
    description: 'Reliable open-source SQL database',
    url: 'https://www.postgresql.org',
  },
  {
    icon: '🔐',
    name: 'nuxt-auth-utils',
    description: 'Authentication utilities for Nuxt',
    url: 'https://github.com/atinux/nuxt-auth-utils',
  },
  {
    icon: '🛠️',
    name: 'nuxt-workers',
    description: 'SSR-safe, zero-config Web Workers integration for Nuxt',
    url: 'https://github.com/danielroe/nuxt-workers',
  },
  {
    icon: '📨',
    name: 'Vue Email',
    description: 'Build and send emails using Vue & TypeScript',
    url: 'https://vuemail.net',
  },
  {
    icon: '✉️',
    name: 'Nodemailer',
    description: 'Send emails easily with SMTP',
    url: 'https://nodemailer.com',
  },
  {
    icon: '🔎',
    name: 'Zod',
    description: 'TypeScript-first schema validation with superpowers',
    url: 'https://zod.dev',
  },
  {
    icon: '🌱',
    name: 'TypeScript',
    description: 'Full type safety across frontend & backend',
    url: 'https://www.typescriptlang.org',
  },
]
</script>

<template>
  <div class="flex flex-col min-h-screen bg-background">
    <header class="border-b sticky top-0 z-50 backdrop-blur bg-background/70">
      <div
        class="container mx-auto flex justify-between items-center px-4 lg:px-0 py-6"
      >
        <NuxtLink
          to="/"
          class="text-xl font-bold text-primary flex items-center gap-2"
        >
          <span class="text-2xl">🧬</span> Nuxia
        </NuxtLink>
        <nav class="flex items-center gap-4">
          <Button as-child class="rounded-full p-0 size-8">
            <NuxtLink href="https://github.com/gravitano/nuxia" target="_blank" rel="noopener noreferrer">
              <Icon name="i-logos:github-icon" />
            </NuxtLink>
          </Button>
          <Button v-if="loggedIn" as-child>
            <NuxtLink to="/dashboard">
              Dashboard
            </NuxtLink>
          </Button>
          <template v-else>
            <Button variant="outline" as-child>
              <NuxtLink to="/auth/login">
                Login
              </NuxtLink>
            </Button>
            <!-- <Button as-child>
          <NuxtLink to="/auth/register">Register</NuxtLink>
        </Button> -->
          </template>
        </nav>
      </div>
    </header>

    <section
      id="hero"
      class="container mx-auto px-4 lg:px-0 py-20 relative animate-fade-in-up"
    >
      <div class="text-center">
        <h1 class="text-4xl font-bold mb-4">
          {{ appConfig.app.name }}
        </h1>
        <p class="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          {{ appConfig.app.description }}
        </p>
        <div class="flex justify-center items-center">
          <Button as-child>
            <NuxtLink to="/auth/login">
              Get Started
            </NuxtLink>
          </Button>
          <!-- github -->
          <Button as-child variant="outline" class="ml-4">
            <NuxtLink href="https://github.com/gravitano/nuxia" target="_blank" rel="noopener noreferrer">
              View on GitHub
            </NuxtLink>
          </Button>
        </div>
      </div>
    </section>

    <section
      id="tech-stack"
      class="container mx-auto px-4 lg:px-0 py-12 animate-fade-in-up"
    >
      <div>
        <h2 class="text-3xl font-bold mb-2 text-center">
          Tech Stack
        </h2>
        <p class="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
          Nuxia is built with a modern tech stack that ensures performance,
          scalability, and developer experience. Here are the key technologies
          we use:
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <NuxtLink
          v-for="tech in techStack"
          :key="tech.name"
          :to="tech.url"
          target="_blank"
          rel="noopener noreferrer"
          class="block h-full"
        >
          <Card class="h-full">
            <CardContent class="space-y-2">
              <div class="text-lg">
                {{ tech.icon }}
              </div>
              <div class="flex items-center gap-4 mb-2">
                <h3 class="text-lg font-semibold">
                  {{ tech.name }}
                </h3>
              </div>
              <p class="text-muted-foreground text-sm">
                {{ tech.description }}
              </p>
            </CardContent>
          </Card>
        </NuxtLink>
      </div>
    </section>

    <footer>
      <div class="container mx-auto px-4 lg:px-0 py-6 text-center">
        <p class="text-sm text-muted-foreground">
          &copy; {{ new Date().getFullYear() }} {{ appConfig.app.name }}. All
          rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>
