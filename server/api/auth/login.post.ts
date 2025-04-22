export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  return {
    data: {
      user: {
        id: 1,
        name: 'John Doe',
        email,
      },
      access_token: 'dummy_token_123456',
    }
  }
})
