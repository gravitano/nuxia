import { and, eq, isNotNull } from 'drizzle-orm'
import { notes } from '../../../database/schema'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const noteId = getRouterParam(event, 'id')

  if (!noteId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Note ID is required',
    })
  }

  const db = useDrizzle()

  // Check if note exists and belongs to user (and is deleted)
  const existingNote = await db.query.notes.findFirst({
    where: and(
      eq(notes.id, noteId),
      eq(notes.ownerId, user.id),
      isNotNull(notes.deletedAt),
    ),
  })

  if (!existingNote) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Deleted note not found',
    })
  }

  try {
    // Restore the note
    await db
      .update(notes)
      .set({
        deletedAt: null,
        updatedAt: new Date(),
      })
      .where(eq(notes.id, noteId))

    return { success: true }
  }
  catch (error) {
    console.error('Error restoring note:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to restore note',
    })
  }
})
