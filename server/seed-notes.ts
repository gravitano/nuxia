import process from 'node:process'
import { Client } from 'pg'

async function seedData() {
  const client = new Client(process.env.DATABASE_URL!)
  await client.connect()

  try {
    // First, create some sample tags
    await client.query(`
      INSERT INTO tags (id, label, color) VALUES
      ('550e8400-e29b-41d4-a716-446655440001', 'Personal', '#3b82f6'),
      ('550e8400-e29b-41d4-a716-446655440002', 'Work', '#ef4444'),
      ('550e8400-e29b-41d4-a716-446655440003', 'Ideas', '#f59e0b'),
      ('550e8400-e29b-41d4-a716-446655440004', 'Todo', '#10b981'),
      ('550e8400-e29b-41d4-a716-446655440005', 'Research', '#8b5cf6')
      ON CONFLICT (id) DO NOTHING;
    `)

    // Get the first user (assuming user with id=1 exists)
    const userResult = await client.query('SELECT id FROM users LIMIT 1')
    if (userResult.rows.length === 0) {
      console.log('No users found. Please register a user first.')
      return
    }

    const userId = userResult.rows[0].id

    // Create some sample notes
    await client.query(`
      INSERT INTO notes (id, owner_id, title, content_md, is_pinned) VALUES
      ('660e8400-e29b-41d4-a716-446655440001', $1, 'Welcome to Notes', 'This is your first note! You can write in **Markdown** format.

## Features
- Create and edit notes
- Tag organization  
- Search functionality
- Pin important notes
- Markdown support

Start writing your thoughts and ideas here!', true),
      ('660e8400-e29b-41d4-a716-446655440002', $1, 'Project Ideas', '## App Ideas
- Todo list app with AI suggestions
- Recipe manager with meal planning
- Personal finance tracker
- Habit tracker with analytics

## Business Ideas  
- Local delivery service
- Online tutoring platform
- Subscription box for books

Remember to validate ideas before building!', false),
      ('660e8400-e29b-41d4-a716-446655440003', $1, 'Meeting Notes - Q4 Planning', '## Attendees
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
- [ ] Review design mockups', false),
      ('660e8400-e29b-41d4-a716-446655440004', $1, 'Learning Goals 2024', '## Technical Skills
- Master TypeScript
- Learn Rust programming
- Explore AI/ML fundamentals
- Improve system design knowledge

## Soft Skills
- Better communication
- Leadership development
- Time management
- Public speaking

## Courses to Take
- Advanced React patterns
- Database design
- DevOps fundamentals', false)
      ON CONFLICT (id) DO NOTHING;
    `, [userId])

    // Add some tag relationships
    await client.query(`
      INSERT INTO note_tags (note_id, tag_id) VALUES
      ('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001'),
      ('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003'),
      ('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001'),
      ('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440002'),
      ('660e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001'),
      ('660e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440005')
      ON CONFLICT DO NOTHING;
    `)

    console.log('Sample data seeded successfully!')
  }
  catch (error) {
    console.error('Error seeding data:', error)
  }
  finally {
    await client.end()
  }
}

seedData().then(() => process.exit(0))
