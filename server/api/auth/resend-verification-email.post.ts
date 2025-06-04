import { defineEventHandler, readBody } from 'h3'
import { sendEmailVerificationEmailWorker } from '~~/workers/email-worker'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email } = body

  if (!email) {
    return createError({
      statusCode: 400,
      statusMessage: 'Email is required',
    })
  }

  // Cari user dengan email tsb
  const user = await db.query.users.findFirst({
    where: (u, { eq }) => eq(u.email, email),
  })

  if (!user) {
    return {
      data: true,
      message: 'Verification email sent',
    }
  }

  // send email verification
  const token = sign({
    id: user.id,
    // 1 minute
    expires: Date.now() + 60 * 1000, // 1 minute
  })

  // send email verification via worker
  sendEmailVerificationEmailWorker(user.email, token)

  return {
    data: true,
    message: 'Verification email sent',
  }
})
