import { loginSchema } from '#shared/shemas/login'
import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // validate with zod
  const result = loginSchema.safeParse(body)
  if (!result.success) {
    return createError({
      statusCode: 422,
      statusMessage: 'Validation error',
      data: result.error,
    })
  }

  const { email, password } = result.data

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  // Cari user berdasarkan email
  const user = await db.query.users.findFirst({
    where: (u, { eq }) => eq(u.email, email),
  })

  if (!user) {
    return createError({
      statusCode: 401,
      statusMessage: 'Invalid email or password',
    })
  }

  // Tambahkan pengecekan email terverifikasi
  if (!user.emailVerifiedAt) {
    return createError({
      statusCode: 403,
      statusMessage: 'Please verify your email before logging in.',
    })
  }

  // Cek password cocok
  const isValid = await verifyPassword(user.password, password)
  if (!isValid) {
    return createError({
      statusCode: 401,
      statusMessage: 'Invalid email or password',
    })
  }

  // Generate access token
  const accessToken = generateAccessToken({
    sub: user.id,
    name: user.name,
    email: user.email,
  })

  // Simpan session
  await setUserSession(event, {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    secure: {
      apiToken: accessToken,
    },
    loggedInAt: new Date(),
  })

  return {
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      access_token: accessToken,
    },
  }
})
