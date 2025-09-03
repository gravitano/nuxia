import { desc } from 'drizzle-orm'
import { tags } from '../../database/schema'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)
  const db = useDrizzle()

  // Get all tags
  const tagsList = await db
    .select()
    .from(tags)
    .orderBy(desc(tags.createdAt))

  return tagsList
})
