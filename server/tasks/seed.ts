import { notes, noteTags, tags, users } from '../database/schema'

export default defineTask({
  meta: {
    name: 'db:seed',
    description: 'Seed the database with initial data',
  },
  async run() {
    // Create a sample user
    const [user] = await db.insert(users).values([
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        password: await hashPassword('secret123'),
        emailVerifiedAt: new Date(),
      },
    ]).onConflictDoNothing().returning()

    // Create sample tags
    const tagData = [
      { label: 'Personal', color: '#3b82f6' },
      { label: 'Work', color: '#ef4444' },
      { label: 'Ideas', color: '#f59e0b' },
      { label: 'Todo', color: '#10b981' },
      { label: 'Research', color: '#8b5cf6' },
    ]

    const createdTags = await db.insert(tags).values(tagData).onConflictDoNothing().returning()

    // Create sample notes
    const noteData = [
      {
        ownerId: user?.id || 1,
        title: 'Welcome to Notes',
        contentMd: `This is your first note! You can write in **Markdown** format.

## Features
- Create and edit notes
- Tag organization  
- Search functionality
- Pin important notes
- Markdown support

Start writing your thoughts and ideas here!`,
        isPinned: true,
      },
      {
        ownerId: user?.id || 1,
        title: 'Project Ideas',
        contentMd: `## App Ideas
- Todo list app with AI suggestions
- Recipe manager with meal planning
- Personal finance tracker
- Habit tracker with analytics

## Business Ideas  
- Local delivery service
- Online tutoring platform
- Subscription box for books

Remember to validate ideas before building!`,
        isPinned: false,
      },
      {
        ownerId: user?.id || 1,
        title: 'Meeting Notes - Q4 Planning',
        contentMd: `## Attendees
- John Smith (PM)
- Sarah Johnson (Dev)
- Mike Wilson (Design)

## Key Points
- Launch timeline moved to January
- Need to finalize feature scope by next week
- User testing scheduled for December

## Action Items
- [ ] Update project timeline
- [ ] Schedule user testing sessions
- [ ] Review design mockups`,
        isPinned: false,
      },
    ]

    const createdNotes = await db.insert(notes).values(noteData).onConflictDoNothing().returning()

    // Create tag relationships
    if (createdNotes.length > 0 && createdTags.length > 0) {
      const tagRelations = [
        { noteId: createdNotes[0].id, tagId: createdTags[0].id }, // Welcome - Personal
        { noteId: createdNotes[1].id, tagId: createdTags[2].id }, // Project Ideas - Ideas
        { noteId: createdNotes[1].id, tagId: createdTags[0].id }, // Project Ideas - Personal
        { noteId: createdNotes[2].id, tagId: createdTags[1].id }, // Meeting - Work
      ]

      await db.insert(noteTags).values(tagRelations).onConflictDoNothing()
    }

    return { result: 'Success - Created user, tags, and notes' }
  },
})
