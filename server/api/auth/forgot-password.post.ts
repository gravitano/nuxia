import { randomBytes } from 'node:crypto'
// server/api/auth/forgot-password.ts
import { defineEventHandler, readBody } from 'h3'
import { passwordResetTokens } from '~~/server/database/schema'
import { sendResetPasswordEmailWorker } from '~~/server/workers/email-worker'

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
      message: 'Reset link has been sent to your email',
    }
  }

  // Generate token
  const token = randomBytes(32).toString('hex')

  // Simpan token ke tabel password_reset_tokens
  await db.insert(passwordResetTokens).values({
    email,
    token,
  })

  // Kirim email via worker
  sendResetPasswordEmailWorker(email, token)

  return {
    data: true,
    message: 'Reset link has been sent to your email',
  }
})
