import process from 'node:process'
import { drizzle } from 'drizzle-orm/node-postgres'

import * as schema from '../database/schema'

export { and, eq, or, sql } from 'drizzle-orm'

export const tables = schema

export function useDrizzle() {
  return drizzle(process.env.DATABASE_URL!, { schema })
}

export const db = drizzle(process.env.DATABASE_URL!, { schema })

export type User = typeof schema.users.$inferSelect
