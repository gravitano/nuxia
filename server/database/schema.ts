// server/db/schema.ts
import {
  pgTable,
  serial,
  varchar,
  timestamp,
  text,
  index,
} from "drizzle-orm/pg-core";

// ------------------
// Users Table
// ------------------
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerifiedAt: timestamp("email_verified_at"),
  password: varchar("password", { length: 255 }).notNull(),
  rememberToken: varchar("remember_token", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ---------------------------
// Password Reset Tokens Table
// ---------------------------
export const passwordResetTokens = pgTable(
  "password_reset_tokens",
  {
    email: varchar("email", { length: 255 }).notNull(),
    token: text("token").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [index("password_reset_tokens_email_index").on(table.email)]
);
