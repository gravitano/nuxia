import { updatePasswordSchema } from '#shared/shemas/update-password'
import { users } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  // make sure the user is logged in
  // This will throw a 401 error if the request doesn't come from a valid user session
  const { user } = await requireUserSession(event)

  // Parse the request body
  const result = await readValidatedBody(event, updatePasswordSchema.safeParse)

  if (!result.success) {
    return createError({
      statusCode: 422,
      statusMessage: 'Validation Error',
      data: result.error.flatten(),
    })
  }

  const { new_password } = result.data

  const hashedPassword = await hashPassword(new_password)

  await db
    .update(users)
    .set({ password: hashedPassword })
    .where(eq(users.id, user.id))

  return {
    message: 'Password updated successfully',
  }
})
