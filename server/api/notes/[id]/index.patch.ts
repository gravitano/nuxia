import { and, eq, isNull } from 'drizzle-orm'
import { updateNoteSchema } from '../../../../shared/schemas/notes'
import { notes, noteTags } from '../../../database/schema'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const noteId = getRouterParam(event, 'id')
  const body = await readBody(event)

  if (!noteId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Note ID is required',
    })
  }

  const result = updateNoteSchema.safeParse(body)
  if (!result.success) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Validation failed',
      data: result.error.format(),
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

  const { title, contentMd, isPinned, tagIds } = result.data

  try {
    // Update note
    const updateData: any = { updatedAt: new Date() }
    if (title !== undefined)
      updateData.title = title
    if (contentMd !== undefined)
      updateData.contentMd = contentMd
    if (isPinned !== undefined)
      updateData.isPinned = isPinned

    await db
      .update(notes)
      .set(updateData)
      .where(eq(notes.id, noteId))

    // Update tags if provided
    if (tagIds !== undefined) {
      // Remove existing tags
      await db.delete(noteTags).where(eq(noteTags.noteId, noteId))

      // Add new tags
      if (tagIds.length > 0) {
        const tagRelations = tagIds.map(tagId => ({
          noteId,
          tagId,
        }))
        await db.insert(noteTags).values(tagRelations)
      }
    }

    // Return updated note with tags
    const updatedNote = await db.query.notes.findFirst({
      where: eq(notes.id, noteId),
      with: {
        noteTags: {
          with: {
            tag: true,
          },
        },
      },
    })

    return {
      ...updatedNote,
      tags: updatedNote?.noteTags.map(nt => nt.tag) || [],
    }
  }
  catch (error) {
    console.error('Error updating note:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update note',
    })
  }
})
