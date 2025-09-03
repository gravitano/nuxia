import { eq } from 'drizzle-orm'
import { createNoteSchema } from '../../../shared/schemas/notes'
import { notes, noteTags } from '../../database/schema'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const body = await readBody(event)

  const result = createNoteSchema.safeParse(body)
  if (!result.success) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Validation failed',
      data: result.error.format(),
    })
  }

  const { title, contentMd, tagIds = [] } = result.data
  const db = useDrizzle()

  try {
    // Create the note
    const [newNote] = await db
      .insert(notes)
      .values({
        ownerId: user.id,
        title,
        contentMd,
        updatedAt: new Date(),
      })
      .returning()

    // Add tags if provided
    if (tagIds.length > 0) {
      const tagRelations = tagIds.map(tagId => ({
        noteId: newNote.id,
        tagId,
      }))

      await db.insert(noteTags).values(tagRelations)
    }

    // Fetch the note with tags
    const noteWithTags = await db.query.notes.findFirst({
      where: eq(notes.id, newNote.id),
      with: {
        noteTags: {
          with: {
            tag: true,
          },
        },
      },
    })

    return {
      ...noteWithTags,
      tags: noteWithTags?.noteTags.map(nt => nt.tag) || [],
    }
  }
  catch (error) {
    console.error('Error creating note:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create note',
    })
  }
})
