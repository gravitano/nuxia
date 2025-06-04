import { deleteAccountSchema } from '#shared/shemas/delete-account'
import { users } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  // make sure the user is logged in
  // This will throw a 401 error if the request doesn't come from a valid user session
  const { user } = await requireUserSession(event)

  // Parse the request body
  const result = await readValidatedBody(event, deleteAccountSchema.safeParse)

  if (!result.success) {
    return createError({
      statusCode: 422,
      statusMessage: 'Validation Error',
      data: result.error.flatten(),
    })
  }

  const { password } = result.data

  const userRecord = await db.query.users.findFirst({
    where: (u, { eq }) => eq(u.id, user.id),
  })

  if (!userRecord) {
    return createError({
      statusCode: 400,
      statusMessage: 'Invalid password',
    })
  }

  if (!(await verifyPassword(userRecord.password, password))) {
    return createError({
      statusCode: 400,
      statusMessage: 'Invalid password',
    })
  }

  // Delete the user account
  await db.delete(users).where(eq(users.id, user.id))

  await clearUserSession(event)

  return {
    message: 'Account deleted successfully',
  }
})
