// server/api/auth/register.ts
import { defineEventHandler, readBody } from 'h3'
import { users } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, email, password } = body

  if (!name || !email || !password) {
    return createError({
      statusCode: 400,
      statusMessage: 'Name, email, and password are required',
    })
  }

  // Cek kalau email sudah terdaftar
  const existing = await db.query.users.findFirst({
    where: (u, { eq }) => eq(u.email, email),
  })

  if (existing) {
    return createError({
      statusCode: 409,
      statusMessage: 'Email already registered',
    })
  }

  // Hash password
  const hashedPassword = await hashPassword(password)

  // Simpan user ke database
  const inserted = await db
    .insert(users)
    .values({
      name,
      email,
      password: hashedPassword,
    })
    .returning()

  const user = inserted[0]

  // send email verification
  const token = sign({
    id: user.id,
    // 1 minute
    expires: Date.now() + 60 * 1000, // 1 minute
  })

  await sendEmailVerificationEmail(user.email, token)

  return {
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    },
  }
})
