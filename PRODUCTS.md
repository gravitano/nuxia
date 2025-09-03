# Note Taker

A minimal-yet-powerful personal note app with **markdown editor**, **tags**, **instant search**, **offline-first**, and **real‑time collaboration**. Built with **Nuxt 4**, **TailwindCSS**, **shadcn‑vue**, **Drizzle ORM**, **PostgreSQL**, and **Yjs**.

> Goal: ship a clean MVP you can extend into a full personal knowledge base (PKB) or lightweight team wiki.

---

## ✨ Features (MVP)

* **Create/Edit notes** — Markdown + slash commands, autosave.
* **Tags** — Fast filtering, tag suggestions.
* **Search** — Full‑text (title + body), scoped by tag/date.
* **Pin / Star** — Keep important notes on top.
* **Trash & Restore** — Soft delete with 30‑day retention.
* **Dark Mode** — System aware.
* **Offline‑first** — Local cache; sync when online.
* **Collaboration** — Live cursors, presence, and conflict‑free editing using **Yjs**.

### Optional (toggleable)

* **Auth** (email/OTP or OAuth via Supabase Auth/Better Auth)
* **Note history** (revision snapshots)
* **Comments** (inline + thread)
* **Import/Export** (.md / .json)
* **AI helper** (summarize, suggest tags)

---

## 🧱 Tech Stack

* **Frontend**: Nuxt 4, Vue 3, TypeScript, Tailwind, shadcn‑vue
* **Editor**: Tiptap (ProseMirror) with Markdown extension
* **Realtime Collab**: Yjs + Hocuspocus server (WebSocket)
* **DB/ORM**: PostgreSQL + Drizzle ORM (SQL migrations)
* **Search**: PostgreSQL `tsvector` (or MiniSearch client‑side for offline)
* **Cache/Offline**: IndexedDB (Dexie) + PWA service worker (Nitro)
* **Auth**: Supabase Auth (or Better Auth alternative)
* **Deploy**: Vercel/Cloudflare Pages (frontend) + Fly.io/Render/Docker for API & WS

---

## 🗺️ Architecture Overview

```
┌──────────────────┐    WebSocket     ┌─────────────────────┐
│ Nuxt 4 (SSR/SPA) │⟷⟷⟷⟷⟷⟷⟷⟷⟷⟷⟷│ Hocuspocus (Yjs WS) │
│  - UI (shadcn)   │                  │  - awareness/pres.  │
│  - Tiptap (Yjs)  │                  │  - doc persistence  │
└───────┬──────────┘                  └─────────┬───────────┘
        │ REST/RPC (Nitro server)               │
        ▼                                        ▼
┌──────────────────┐                    ┌───────────────────┐
│ Nuxt Server API  │  Drizzle (SQL)     │  PostgreSQL       │
│  - notes/tags    │────────────────────│  (notes, tags,    │
│  - auth webhooks │                    │   revisions, ...) │
└──────────────────┘                    └───────────────────┘
```

> Collab state lives in Yjs docs; persisted to Postgres via Hocuspocus hooks.

---

## 📦 Project Structure

```
.
├─ apps/
│  ├─ web/                # Nuxt 4 app (UI + server routes)
│  └─ ws/                 # Hocuspocus (Yjs) server
├─ packages/
│  ├─ db/                 # Drizzle ORM schema + migrations
│  └─ ui/                 # Shared UI tokens/components (optional)
├─ docker/                # Compose files for dev DB/WS
├─ .env.example
└─ README.md
```

---

## 🗃️ Database (ERD)

```
users (id, email, name, avatar_url, created_at)
notes (id, owner_id, title, content_md, content_yjs, is_pinned, deleted_at,
       created_at, updated_at)
note_tags (note_id, tag_id)
tags (id, label, color)
collaborators (note_id, user_id, role)   -- role: owner|editor|viewer
revisions (id, note_id, snapshot_md, created_at, created_by)
comments (id, note_id, user_id, body, range, created_at)
```

### Drizzle schema snippet

```ts
// packages/db/schema.ts
export const notes = pgTable('notes', {
  id: uuid('id').defaultRandom().primaryKey(),
  ownerId: uuid('owner_id').notNull().references(() => users.id),
  title: text('title').notNull(),
  contentMd: text('content_md').default(''),
  contentYjs: bytea('content_yjs'), // persisted Yjs state (optional)
  isPinned: boolean('is_pinned').default(false),
  deletedAt: timestamp('deleted_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
```

---

## 🔐 Permissions (RBAC)

* **owner**: full access, manage collaborators
* **editor**: read/write
* **viewer**: read-only

Server guards:

* Row‑level checks on `notes.owner_id` and `collaborators` join
* API responds with 403 on forbidden access

---

## 🚀 Quick Start (Dev)

### 0) Prerequisites

* Node.js 20+
* pnpm 9+
* Docker (for Postgres & Hocuspocus)

### 1) Clone & install

```bash
pnpm i
```

### 2) Environment

Copy `.env.example` → `.env` and set values:

```bash
# Nuxt
NUXT_APP_URL=http://localhost:3000
NUXT_PUBLIC_APP_NAME=Note Taker
NUXT_PUBLIC_WS_URL=ws://localhost:3001

# DB
DATABASE_URL=postgres://postgres:postgres@localhost:5432/notetaker

# Auth (Supabase) — optional
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# AI (optional)
OPENAI_API_KEY=
```

### 3) Run services (DB + WS)

```bash
pnpm -w dev:stack
# or: docker compose -f docker/dev.yml up -d
```

### 4) Generate & run migrations

```bash
pnpm -w db:generate
pnpm -w db:migrate
pnpm -w db:seed   # optional
```

### 5) Start apps

```bash
pnpm -w dev       # runs Nuxt + watches WS in dev
```

> Web at [http://localhost:3000](http://localhost:3000) — WebSocket at ws\://localhost:3001

---

## 🛠️ Scripts

```jsonc
// root package.json (excerpt)
{
  "scripts": {
    "dev": "pnpm -C apps/web dev",
    "dev:stack": "docker compose -f docker/dev.yml up -d",
    "db:generate": "drizzle-kit generate --config=packages/db/drizzle.config.ts",
    "db:migrate": "drizzle-kit migrate --config=packages/db/drizzle.config.ts",
    "db:studio": "drizzle-kit studio --config=packages/db/drizzle.config.ts",
    "lint": "eslint .",
    "typecheck": "vue-tsc --noEmit",
    "test": "vitest run"
  }
}
```

---

## 🧩 Nuxt 4 Setup (apps/web)

* **Modules**: `@nuxtjs/tailwindcss`, `@nuxtjs/robots`, PWA (`@vite-pwa/nuxt`), optional `@nuxtjs/supabase`
* **UI**: shadcn‑vue (prebuilt components port) + Tailwind config
* **Editor**: Tiptap + Collaboration extension (Yjs)

Example composable for collab:

```ts
// apps/web/composables/useYDoc.ts
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

export function useYDoc(noteId: string) {
  const ydoc = new Y.Doc()
  const WS_URL = useRuntimeConfig().public.wsUrl
  const provider = new WebsocketProvider(WS_URL, `note-${noteId}`, ydoc)
  const ytext = ydoc.getText('content')
  return { ydoc, provider, ytext }
}
```

Bind `ytext` to Tiptap via the collaboration extension.

---

## 🌐 Hocuspocus (apps/ws)

Minimal server (TypeScript):

```ts
import { Server } from '@hocuspocus/server'

export const server = Server.configure({
  port: 3001,
  onAuthenticate: async ({ token }) => { /* verify JWT / session */ },
  onLoadDocument: async ({ documentName }) => { /* load Yjs state from DB */ },
  onStoreDocument: async ({ state }) => { /* persist Yjs state to DB */ },
})

server.listen()
```

> For small teams you can skip persistence and rely on note `content_md` snapshots as a fallback.

---

## 🧵 API (Nuxt Server Routes)

```
GET  /api/notes              # list (q, tag, pinned)
POST /api/notes              # create
GET  /api/notes/:id          # get
PATCH /api/notes/:id         # update meta (title, tags, pinned)
DELETE /api/notes/:id        # soft delete
POST /api/notes/:id/restore  # restore
POST /api/notes/:id/share    # invite collaborator (role)
GET  /api/tags               # list/create/delete
```

> Collab edits flow via WS; server routes manage metadata, tags, and permissions.

---

## 🔍 Search

**Option A (server)**: Postgres `tsvector` + index on title/body; keep in sync on save.
**Option B (client)**: MiniSearch over cached notes for instant offline search.

---

## 🧰 Quality

* ESLint + Prettier + Type‑safe API types
* Vitest component & API tests
* Commit hooks via `lint-staged` & `simple-git-hooks`

---

## 🔄 Data Lifecycle

* Autosave every N seconds or on blur
* Snapshots → `revisions` table (daily or manual)
* Soft delete → auto purge after 30 days (cron / Nitro task)

---

## 🔒 Security Notes

* JWT from Supabase Auth or session cookie (HttpOnly, SameSite=Lax)
* RLS (if using Supabase) or application‑level RBAC
* Rate‑limit invites & API

---

## 🗺️ Roadmap

* [ ] Mobile PWA polish (install prompt, offline images)
* [ ] Import/Export Markdown
* [ ] Inline comments & mentions (@)
* [ ] AI summarize + auto‑tag
* [ ] Public share links (read‑only)
* [ ] End‑to‑end encryption (per note) option

---

## 🤝 Contributing

PRs welcome! Please run `pnpm lint` and `pnpm test` before submitting.

---

## 📝 License

MIT — use freely, attribute appreciated.