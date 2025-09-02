import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

// Boot a Nuxt test instance (SSR server only)
await setup({
  server: true,
  browser: false,
})

describe('home page', () => {
  it('renders the Nuxia brand on the homepage', async () => {
    const html = await $fetch('/')
    expect(html).toContain('Nuxia')
  })
})

