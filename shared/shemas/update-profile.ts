import { z } from 'zod'

export const updateProfileSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email(),
})
