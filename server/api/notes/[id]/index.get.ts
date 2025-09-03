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

  const note = await db.query.notes.findFirst({
    where: and(
      eq(notes.id, noteId),
      eq(notes.ownerId, user.id),
      isNull(notes.deletedAt),
    ),
    with: {
      noteTags: {
        with: {
          tag: true,
        },
      },
    },
  })

  if (!note) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Note not found',
    })
  }

  return {
    ...note,
    tags: note.noteTags.map(nt => nt.tag),
  }
})
