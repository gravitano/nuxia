import { createTagSchema } from '../../../shared/schemas/tags'
import { tags } from '../../database/schema'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)
  const body = await readBody(event)

  const result = createTagSchema.safeParse(body)
  if (!result.success) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Validation failed',
      data: result.error.format(),
    })
  }

  const { label, color } = result.data
  const db = useDrizzle()

  try {
    const [newTag] = await db
      .insert(tags)
      .values({
        label,
        color,
        updatedAt: new Date(),
      })
      .returning()

    return newTag
  }
  catch (error) {
    console.error('Error creating tag:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create tag',
    })
  }
})
