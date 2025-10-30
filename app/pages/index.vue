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
    icon: '⚙️',
    name: 'nuxt-processor',
    description: 'Background job processing with Bull queues',
    url: 'https://github.com/danielroe/nuxt-processor',
  },
  {
    icon: '📊',
    name: 'Bull Board',
    description: 'Beautiful UI dashboard for monitoring job queues',
    url: 'https://github.com/felixmosh/bull-board',
  },
  {
    icon: '🔴',
    name: 'Redis',
    description: 'In-memory data store for job queue management',
    url: 'https://redis.io',
  },
  {
    icon: '📨',
    name: 'Vue Email',
    description: 'Build and send emails using Vue & TypeScript',
    url: 'https://vuemail.net',
  },
  {
    icon: '✉️',
    name: 'Resend',
    description: 'Modern email API for developers',
    url: 'https://resend.com',
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
    <header class="fixed w-full top-0 z-50 backdrop-blur bg-background/70">
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
      class="relative animate-fade-in-up min-h-screen flex flex-col items-center justify-center text-center"
    >
      <!-- background -->
      <div
        class="absolute inset-0 bg-linear-to-br/hsl from-zinc-950 to-neutral-500 from-75% z-[1]"
      />

      <!-- hero content -->
      <div class="container mx-auto px-4 lg:px-0 lg:py-20 z-10">
        <div class="text-center">
          <div class="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-1.5 text-sm text-muted-foreground shadow-sm backdrop-blur mb-6">
            <span>✨ Fullstack starter template for Nuxt</span>
          </div>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Ship fast with {{ appConfig.app.name }}
          </h1>
          <p class="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {{ appConfig.app.description }} Whether you're building an MVP, dashboard, or internal tool — Nuxia gives you a powerful starting point with clean and minimal setup.
          </p>
          <div class="flex justify-center items-center flex-wrap gap-4">
            <Button as-child size="lg">
              <NuxtLink to="/auth/login">
                Get Started
              </NuxtLink>
            </Button>
            <Button as-child variant="outline" size="lg">
              <NuxtLink href="https://github.com/gravitano/nuxia" target="_blank" rel="noopener noreferrer">
                View on GitHub
              </NuxtLink>
            </Button>
          </div>
        </div>
      </div>
    </section>

    <section
      id="features"
      class="container mx-auto px-4 lg:px-0 py-20"
    >
      <div>
        <h2 class="text-3xl font-bold mb-2 text-center">
          Everything You Need to Ship Fast
        </h2>
        <p class="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Nuxia comes preconfigured with authentication, email, job queues, database migrations, and a beautiful UI component library. Start building your product, not the infrastructure.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card class="h-full">
          <CardContent class="p-6 space-y-3">
            <div class="text-2xl">🔐</div>
            <h3 class="text-lg font-semibold">Authentication</h3>
            <p class="text-sm text-muted-foreground">
              Secure authentication flows with nuxt-auth-utils, JWT secrets, and protected routes.
            </p>
          </CardContent>
        </Card>

        <Card class="h-full">
          <CardContent class="p-6 space-y-3">
            <div class="text-2xl">📨</div>
            <h3 class="text-lg font-semibold">Email System</h3>
            <p class="text-sm text-muted-foreground">
              Build beautiful emails with Vue Email and send them via Resend API integration.
            </p>
          </CardContent>
        </Card>

        <Card class="h-full">
          <CardContent class="p-6 space-y-3">
            <div class="text-2xl">⚙️</div>
            <h3 class="text-lg font-semibold">Job Queues</h3>
            <p class="text-sm text-muted-foreground">
              Background job processing with Bull queues, Redis, and a beautiful Bull Board dashboard.
            </p>
          </CardContent>
        </Card>

        <Card class="h-full">
          <CardContent class="p-6 space-y-3">
            <div class="text-2xl">🐘</div>
            <h3 class="text-lg font-semibold">Database Management</h3>
            <p class="text-sm text-muted-foreground">
              Type-safe database operations with Drizzle ORM, migrations, and PostgreSQL.
            </p>
          </CardContent>
        </Card>

        <Card class="h-full">
          <CardContent class="p-6 space-y-3">
            <div class="text-2xl">🌱</div>
            <h3 class="text-lg font-semibold">Type Safety</h3>
            <p class="text-sm text-muted-foreground">
              End-to-end TypeScript with Zod schemas shared between client and server.
            </p>
          </CardContent>
        </Card>

        <Card class="h-full">
          <CardContent class="p-6 space-y-3">
            <div class="text-2xl">🧩</div>
            <h3 class="text-lg font-semibold">UI Components</h3>
            <p class="text-sm text-muted-foreground">
              Beautiful, accessible components built with shadcn-vue and Tailwind CSS.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>

    <section
      id="tech-stack"
      class="container mx-auto px-4 lg:px-0 py-20"
    >
      <div>
        <h2 class="text-3xl font-bold mb-2 text-center">
          Powered by Modern Tools
        </h2>
        <p class="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
          Built with the best-in-class tools for fullstack development. A carefully selected stack that balances developer experience with production scalability.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <NuxtLink
          v-for="tech in techStack"
          :key="tech.name"
          :to="tech.url"
          target="_blank"
          rel="noopener noreferrer"
          class="block h-full group"
        >
          <Card class="h-full group-hover:border-primary transition-all duration-200 relative overflow-hidden">
            <!-- background -->
            <div
              class="absolute inset-0 bg-linear-to-br/hsl from-zinc-950 to-neutral-500 from-75% z-[1]"
            />

            <CardContent class="space-y-2 z-10">
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
