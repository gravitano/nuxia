// server/db/schema.ts
import { relations } from 'drizzle-orm'
import {
  boolean,
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

// ------------------
// Users Table
// ------------------
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  emailVerifiedAt: timestamp('email_verified_at'),
  password: varchar('password', { length: 255 }).notNull(),
  rememberToken: varchar('remember_token', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// ---------------------------
// Password Reset Tokens Table
// ---------------------------
export const passwordResetTokens = pgTable(
  'password_reset_tokens',
  {
    email: varchar('email', { length: 255 }).notNull(),
    token: text('token').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
  },
  table => [index('password_reset_tokens_email_index').on(table.email)],
)

// ------------------
// Tags Table
// ------------------
export const tags = pgTable('tags', {
  id: serial('id').primaryKey(),
  label: varchar('label', { length: 100 }).notNull(),
  color: varchar('color', { length: 7 }).default('#3b82f6'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// ------------------
// Notes Table
// ------------------
export const notes = pgTable('notes', {
  id: serial('id').primaryKey(),
  ownerId: integer('owner_id').notNull().references(() => users.id),
  title: text('title').notNull(),
  contentMd: text('content_md').default(''),
  isPinned: boolean('is_pinned').default(false),
  deletedAt: timestamp('deleted_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// ------------------
// Note Tags Junction Table
// ------------------
export const noteTags = pgTable('note_tags', {
  noteId: integer('note_id').notNull().references(() => notes.id, { onDelete: 'cascade' }),
  tagId: integer('tag_id').notNull().references(() => tags.id, { onDelete: 'cascade' }),
})

// ------------------
// Relations
// ------------------
export const usersRelations = relations(users, ({ many }) => ({
  notes: many(notes),
}))

export const notesRelations = relations(notes, ({ one, many }) => ({
  owner: one(users, {
    fields: [notes.ownerId],
    references: [users.id],
  }),
  noteTags: many(noteTags),
}))

export const tagsRelations = relations(tags, ({ many }) => ({
  noteTags: many(noteTags),
}))

export const noteTagsRelations = relations(noteTags, ({ one }) => ({
  note: one(notes, {
    fields: [noteTags.noteId],
    references: [notes.id],
  }),
  tag: one(tags, {
    fields: [noteTags.tagId],
    references: [tags.id],
  }),
}))
