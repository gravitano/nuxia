export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, email, password } = body

  return {
    data: {
      user: {
        id: 1,
        name,
        email,
      },
    }
  }
})
