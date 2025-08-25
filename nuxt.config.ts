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
    mailHost: '',
    mailPort: 587,
    mailSecure: false,
    mailUsername: '',
    mailPassword: '',
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
