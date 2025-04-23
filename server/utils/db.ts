import { drizzle } from "drizzle-orm/node-postgres";
export { sql, eq, and, or } from "drizzle-orm";

import * as schema from "../database/schema";

export const tables = schema;

export function useDrizzle() {
  return drizzle(process.env.DATABASE_URL!, { schema });
}

export const db = drizzle(process.env.DATABASE_URL!, { schema });

export type User = typeof schema.users.$inferSelect;
