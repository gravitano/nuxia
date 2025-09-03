import { z } from 'zod'

export const createNoteSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title too long'),
  contentMd: z.string().default(''),
  tagIds: z.array(z.number().int().positive()).optional(),
})

export const updateNoteSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title too long').optional(),
  contentMd: z.string().optional(),
  isPinned: z.boolean().optional(),
  tagIds: z.array(z.number().int().positive()).optional(),
})

export const noteQuerySchema = z.object({
  q: z.string().optional(),
  tag: z.string().optional(),
  pinned: z.union([z.boolean(), z.string()]).transform((val) => {
    if (typeof val === 'string') {
      return val === 'true' || val === '1'
    }
    return val
  }).optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
})

export type CreateNoteInput = z.infer<typeof createNoteSchema>
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>
export type NoteQuery = z.infer<typeof noteQuerySchema>
