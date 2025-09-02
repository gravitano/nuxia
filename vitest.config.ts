import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: [
      'app/**/*.{spec,test}.ts',
      'server/**/*.{spec,test}.ts',
      'tests/**/*.nuxt.spec.ts',
    ],
    exclude: ['node_modules', '.nuxt', 'dist'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      reportsDirectory: './coverage',
      include: ['app/**/*.{ts,vue}', 'server/**/*.{ts}'],
      exclude: [
        '**/*.d.ts',
        '**/*.{spec,test}.ts',
        'node_modules/**',
        '.nuxt/**',
      ],
    },
  },
})
