import { z } from 'zod'

export const createTagSchema = z.object({
  label: z.string().min(1, 'Label is required').max(100, 'Label too long'),
  color: z.string().regex(/^#[\da-f]{6}$/i, 'Invalid color format').default('#3b82f6'),
})

export const updateTagSchema = z.object({
  label: z.string().min(1, 'Label is required').max(100, 'Label too long').optional(),
  color: z.string().regex(/^#[\da-f]{6}$/i, 'Invalid color format').optional(),
})

export type CreateTagInput = z.infer<typeof createTagSchema>
export type UpdateTagInput = z.infer<typeof updateTagSchema>
