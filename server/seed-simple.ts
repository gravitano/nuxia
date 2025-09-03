import process from 'node:process'
import bcrypt from 'bcrypt'
import { Client } from 'pg'

async function seedData() {
  const client = new Client(process.env.DATABASE_URL!)
  await client.connect()

  try {
    // Create a sample user first
    const hashedPassword = await bcrypt.hash('secret123', 10)
    await client.query(`
      INSERT INTO users (id, name, email, password, email_verified_at, created_at, updated_at) 
      VALUES (1, 'John Doe', 'john@example.com', $1, NOW(), NOW(), NOW())
      ON CONFLICT (id) DO NOTHING;
    `, [hashedPassword])

    // Create sample tags
    await client.query(`
      INSERT INTO tags (label, color, created_at, updated_at) VALUES
      ('Personal', '#3b82f6', NOW(), NOW()),
      ('Work', '#ef4444', NOW(), NOW()),
      ('Ideas', '#f59e0b', NOW(), NOW()),
      ('Todo', '#10b981', NOW(), NOW()),
      ('Research', '#8b5cf6', NOW(), NOW())
      ON CONFLICT DO NOTHING;
    `)

    // Create sample notes
    await client.query(`
      INSERT INTO notes (owner_id, title, content_md, is_pinned, created_at, updated_at) VALUES
      (1, 'Welcome to Notes', 'This is your first note! You can write in **Markdown** format.

## Features
- Create and edit notes
- Tag organization  
- Search functionality
- Pin important notes
- Markdown support

Start writing your thoughts and ideas here!', true, NOW(), NOW()),
      (1, 'Project Ideas', '## App Ideas
- Todo list app with AI suggestions
- Recipe manager with meal planning
- Personal finance tracker
- Habit tracker with analytics

## Business Ideas  
- Local delivery service
- Online tutoring platform
- Subscription box for books

Remember to validate ideas before building!', false, NOW(), NOW()),
      (1, 'Meeting Notes - Q4 Planning', '## Attendees
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
- [ ] Review design mockups', false, NOW(), NOW())
      ON CONFLICT DO NOTHING;
    `)

    // Add some tag relationships
    await client.query(`
      INSERT INTO note_tags (note_id, tag_id) VALUES
      (1, 1), -- Welcome - Personal
      (2, 3), -- Project Ideas - Ideas
      (2, 1), -- Project Ideas - Personal
      (3, 2)  -- Meeting - Work
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
