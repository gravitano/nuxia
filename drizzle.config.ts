/* eslint-disable node/prefer-global/process */
import { defineConfig } from 'drizzle-kit'
import 'dotenv/config'

export default defineConfig({
  out: './server/database/migrations',
  schema: './server/database/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
