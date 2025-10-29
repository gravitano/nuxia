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
- 📨 **Vue Email** — Build and send emails using Vue & TypeScript
- ✉️ **Resend** — Modern email API for developers
- 🔎 **Zod** — TypeScript-first schema validation with superpowers
- 🌱 **TypeScript** — Full type safety across frontend & backend

## Setup

```bash
# Clone the repository using `giget`
npx giget@latest gh:gravitano/nuxia nuxia-app
cd nuxia-app

# Create .env file with the following variables:
# DATABASE_URL=postgresql://user:password@localhost:5432/nuxia
# JWT_SECRET=your-jwt-secret-key-here
# NUXT_APP_URL=http://localhost:3000
# NUXT_RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
# NUXT_MAIL_FROM_NAME=Nuxia
# NUXT_MAIL_FROM_EMAIL=onboarding@resend.dev

# Install dependencies
pnpm install # or yarn, bun, etc.

# Migrate the database and seed initial data
pnpm db:push # migrate the database
pnpm db:seed

# Start the development server
pnpm dev
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
```

> **Note**: You need to get a Resend API key from [resend.com](https://resend.com). The free tier includes 100 emails/day and 3,000 emails/month.

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
