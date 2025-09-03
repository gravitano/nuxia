import { and, desc, eq, inArray, isNull, sql } from 'drizzle-orm'
import { noteQuerySchema } from '../../../shared/schemas/notes'
import { notes, noteTags, tags } from '../../database/schema'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const query = getQuery(event)

  const result = noteQuerySchema.safeParse(query)
  if (!result.success) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Validation failed',
      data: result.error.format(),
    })
  }

  const { q, pinned, page, limit } = result.data
  // TODO: Re-enable tag filtering: const { q, tag, pinned, page, limit } = result.data
  const offset = (page - 1) * limit

  const db = useDrizzle()

  // Base query conditions
  const conditions = [
    eq(notes.ownerId, user.id), // user.id is number which matches ownerId type
    isNull(notes.deletedAt), // Only non-deleted notes
  ]

  // Add search condition
  if (q) {
    conditions.push(
      sql`(${notes.title} ILIKE ${`%${q}%`} OR ${notes.contentMd} ILIKE ${`%${q}%`})`,
    )
  }

  // Add pinned filter
  if (pinned !== undefined) {
    conditions.push(eq(notes.isPinned, pinned))
  }

  // Get notes
  const notesList = await db
    .select({
      id: notes.id,
      title: notes.title,
      contentMd: notes.contentMd,
      isPinned: notes.isPinned,
      createdAt: notes.createdAt,
      updatedAt: notes.updatedAt,
    })
    .from(notes)
    .where(and(...conditions))
    .orderBy(desc(notes.isPinned), desc(notes.updatedAt))
    .limit(limit)
    .offset(offset)

  // Get tags for each note (temporarily disabled)
  // const noteIds = notesList.map(note => note.id)
  const notesWithTags = []

  // For now, skip the tags loading to isolate the database issue
  // TODO: Re-implement tags loading after fixing the main query

  // Combine notes with their tags (empty for now)
  for (const note of notesList) {
    notesWithTags.push({
      ...note,
      tags: [], // Temporarily empty until we fix the inArray issue
    })
  }

  // Filter by tag if specified (temporarily disabled until tags are working)
  const filteredNotes = notesWithTags
  // TODO: Re-enable tag filtering after fixing tags loading
  // if (tag) {
  //   filteredNotes = notesWithTags.filter(note =>
  //     note.tags.some(t => t.label.toLowerCase().includes(tag.toLowerCase())),
  //   )
  // }

  // Get total count
  const [{ count: totalCount }] = await db
    .select({ count: sql<number>`count(*)`.as('count') })
    .from(notes)
    .where(and(...conditions))

  return {
    notes: filteredNotes,
    pagination: {
      page,
      limit,
      total: totalCount,
      totalPages: Math.ceil(totalCount / limit),
    },
  }
})
