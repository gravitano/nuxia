import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    'nuxt-auth-utils',
    'nuxt-workers',
    'nuxt-processor',
  ],
  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
    },
  },

  css: ['~/assets/css/tailwind.css'],

  colorMode: {
    classSuffix: '',
    preference: 'system', // atau 'dark' | 'light'
    fallback: 'light',
    storage: 'cookie',
  },

  runtimeConfig: {
    appUrl: 'http://localhost:3000',
    resendApiKey: '',
    mailFromName: 'Warsono',
    mailFromEmail: 'warsono16694@gmail.com',
  },

  compatibilityDate: '2024-11-01',

  nitro: {
    experimental: {
      tasks: true,
    },
    rollupConfig: {
      plugins: [vue()],
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  eslint: {
    config: {
      stylistic: true,
      standalone: false,
    },
  },

  processor: {
    redis: {
      // Prefer a single URL if available (takes precedence over other fields)
      // e.g. redis://user:pass@host:6379/0
      url: process.env.NUXT_REDIS_URL,
      host: process.env.NUXT_REDIS_HOST ?? '127.0.0.1',
      port: Number(process.env.NUXT_REDIS_PORT ?? 6379),
      password: process.env.NUXT_REDIS_PASSWORD ?? '',
      username: process.env.NUXT_REDIS_USERNAME,
      db: Number(process.env.NUXT_REDIS_DB ?? 0),
      // Optional connection behavior
      // Delay connecting until first Redis command (useful to avoid build-time connects)
      lazyConnect: process.env.NUXT_REDIS_LAZY_CONNECT
        ? process.env.NUXT_REDIS_LAZY_CONNECT === 'true'
        : undefined,
      // Milliseconds to wait before giving up when establishing the connection
      connectTimeout: process.env.NUXT_REDIS_CONNECT_TIMEOUT
        ? Number(process.env.NUXT_REDIS_CONNECT_TIMEOUT)
        : undefined,
    },
  },

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './app/components/ui',
  },
})
