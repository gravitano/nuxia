export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email } = body

  return {
    data: true
  }
})
