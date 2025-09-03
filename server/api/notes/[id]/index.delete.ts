import { and, eq, isNull } from 'drizzle-orm'
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

  // Check if note exists and belongs to user
  const existingNote = await db.query.notes.findFirst({
    where: and(
      eq(notes.id, noteId),
      eq(notes.ownerId, user.id),
      isNull(notes.deletedAt),
    ),
  })

  if (!existingNote) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Note not found',
    })
  }

  try {
    // Soft delete the note
    await db
      .update(notes)
      .set({
        deletedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(notes.id, noteId))

    return { success: true }
  }
  catch (error) {
    console.error('Error deleting note:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete note',
    })
  }
})
