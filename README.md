# Nuxia

**Nuxia** is a fullstack starter template for [Nuxt](https://nuxt.com), built to help you ship fast with clean and minimal setup. Whether you're building an MVP, dashboard, or internal tool — Nuxia gives you a powerful starting point.

![Nuxt.js](https://img.shields.io/badge/Nuxia-00DC82?logo=nuxtdotjs&style=flat-square)
![License](https://img.shields.io/github/license/gravitano/nuxia?style=flat-square)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)

## 🔧 Tech Stack

- ✅ **Nuxt** — The Progressive Web Framework
- 🎨 **Tailwind CSS** — Utility-first CSS framework for rapid UI development
- 🧩 **shadcn-vue** — Beautiful UI components built with Tailwind CSS
- 🧠 **Drizzle ORM** — Headless TypeScript ORM with a head
- 🐘 **PostgreSQL** — Reliable open-source SQL database
- 🔐 **nuxt-auth-utils** — Authentication utilities for Nuxt
- 🛠️ **nuxt-workers** — SSR-safe, zero-config Web Workers integration for Nuxt
- ⚙️ **nuxt-processor** — Background job processing with Bull queues
- 📊 **Bull Board** — Beautiful UI dashboard for monitoring job queues
- 🔴 **Redis** — In-memory data store for job queue management
- 📨 **Vue Email** — Build and send emails using Vue & TypeScript
- ✉️ **Resend** — Modern email API for developers
- 🔎 **Zod** — TypeScript-first schema validation with superpowers
- 🌱 **TypeScript** — Full type safety across frontend & backend

## Setup

```bash
# Clone the repository using `giget`
npx giget@latest gh:gravitano/nuxia nuxia-app
cd nuxia-app

# Create .env file with required variables (see Environment Variables section)

# Install dependencies
pnpm install # or yarn, bun, etc.

# Make sure Redis is running (required for job queues)
# Using Docker:
docker run -d -p 6379:6379 redis:alpine

# Migrate the database and seed initial data
pnpm db:push # migrate the database
pnpm db:seed

# Start the development server (in one terminal)
pnpm dev

# Start the job processor (in another terminal)
pnpm processor:dev
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/nuxia

# JWT
JWT_SECRET=your-jwt-secret-key-here

# Application
NUXT_APP_URL=http://localhost:3000

# Resend Email Service
# Get your API key from https://resend.com/api-keys
NUXT_RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
NUXT_MAIL_FROM_NAME=Nuxia
NUXT_MAIL_FROM_EMAIL=onboarding@resend.dev

# Redis (for job queues)
NUXT_REDIS_URL=redis://127.0.0.1:6379/0
# Or use separate config:
# NUXT_REDIS_HOST=127.0.0.1
# NUXT_REDIS_PORT=6379
# NUXT_REDIS_PASSWORD=
# NUXT_REDIS_USERNAME=
# NUXT_REDIS_DB=0
```

> **Note**: You need to get a Resend API key from [resend.com](https://resend.com). The free tier includes 100 emails/day and 3,000 emails/month.

> **Note**: Redis is required for background job processing. You can run it locally with Docker: `docker run -d -p 6379:6379 redis:alpine`

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# pnpm
pnpm dev

# npm
npm run dev

# yarn
yarn dev

# bun
bun run dev
```

### Job Queue Processor

For background jobs (emails, notifications, etc.), run the processor in a separate terminal:

```bash
# Development mode (with hot reload)
pnpm processor:dev

# Production mode
pnpm processor:prod
```

### Bull Board Dashboard

Monitor your job queues at `http://localhost:3000/bull-board` when the dev server is running. This provides a beautiful UI to:

- View active, completed, and failed jobs
- Retry failed jobs
- Monitor queue metrics
- Clean old jobs

## Production

Build the application for production:

```bash
# pnpm
pnpm build

# npm
npm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# pnpm
pnpm preview

# npm
npm run preview

# yarn
yarn preview

# bun
bun run preview
```

### Production Deployment

When deploying to production, make sure to:

1. **Run the Nuxt app** (your main server)
2. **Run the job processor** separately as a background service:
   ```bash
   pnpm processor:prod
   ```

> **Tip**: Use a process manager like PM2 or supervisord to keep both the Nuxt server and the job processor running in production.

Example with PM2:

```bash
# Start Nuxt server
pm2 start .output/server/index.mjs --name nuxia-app

# Start job processor
pm2 start .output/server/workers/index.mjs --name nuxia-processor
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
