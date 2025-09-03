import process from 'node:process'
import { Client } from 'pg'

async function createTables() {
  const client = new Client(process.env.DATABASE_URL!)
  await client.connect()

  try {
    // Create tags table
    await client.query(`
      CREATE TABLE IF NOT EXISTS tags (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        label varchar(100) NOT NULL,
        color varchar(7) DEFAULT '#3b82f6',
        created_at timestamp DEFAULT now(),
        updated_at timestamp DEFAULT now() NOT NULL
      );
    `)

    // Create notes table
    await client.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        owner_id integer NOT NULL,
        title text NOT NULL,
        content_md text DEFAULT '',
        is_pinned boolean DEFAULT false,
        deleted_at timestamp,
        created_at timestamp DEFAULT now(),
        updated_at timestamp DEFAULT now() NOT NULL,
        FOREIGN KEY (owner_id) REFERENCES users(id)
      );
    `)

    // Create note_tags junction table
    await client.query(`
      CREATE TABLE IF NOT EXISTS note_tags (
        note_id uuid NOT NULL,
        tag_id uuid NOT NULL,
        FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE cascade,
        FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE cascade
      );
    `)

    console.log('Tables created successfully!')
  }
  catch (error) {
    console.error('Error creating tables:', error)
  }
  finally {
    await client.end()
  }
}

createTables().then(() => process.exit(0))
