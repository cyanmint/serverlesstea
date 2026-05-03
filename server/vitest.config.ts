import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  resolve: {
    alias: {
      'cloudflare:email': path.resolve(__dirname, 'test/mocks/cloudflare-email.ts'),
    },
  },
})
