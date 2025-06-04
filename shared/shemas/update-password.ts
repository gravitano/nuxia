import { z } from 'zod'

export const updatePasswordSchema = z
  .object({
    current_password: z.string(),
    new_password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/\d/, 'Password must contain at least one number')
      .regex(
        /[@$!%*?&#]/,
        'Password must contain at least one special character',
      ),
    confirm_password: z.string().min(1, 'Confirm password is required'),
  })
  .refine(data => data.new_password === data.confirm_password, {
    message: 'Passwords must match',
  })
