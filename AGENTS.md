# Repository Guidelines

## Project Structure & Module Organization

- `app/`: Nuxt app (pages, layouts, components, assets, middleware).
- `server/`: APIs (`server/api`), database (`server/database` via Drizzle), utils, emails, workers, and Nitro tasks.
- `shared/shemas/`: Zod schemas shared between client/server.
- `types/`: TypeScript ambient types.
- `public/`: Static assets.
- Root configs: `nuxt.config.ts`, `drizzle.config.ts`, `tsconfig.json`, `eslint.config.mjs`.

## Build, Test, and Development Commands

- `pnpm dev`: Run the Nuxt dev server at `http://localhost:3000`.
- `pnpm build`: Production build (server and client bundles).
- `pnpm preview`: Serve the production build locally.
- `pnpm generate`: Pre-rendered output (for static hosting paths where applicable).
- `pnpm db:generate`: Generate Drizzle migrations from `server/database/schema.ts`.
- `pnpm db:push` (alias `pnpm migrate`): Apply migrations to the database.
- `pnpm db:seed`: Run Nitro task `db:seed` to populate sample data.
- `pnpm lint` / `pnpm lint:fix`: Check/fix code style with ESLint.

## Coding Style & Naming Conventions

- Language: TypeScript, Vue 3 (Nuxt 4). Use `<script setup>` in SFCs.
- ESLint: Antfu + Nuxt config (`eslint.config.mjs`). Run `pnpm lint` before PRs.
- Indentation: 2 spaces; keep imports ordered (handled by ESLint config).
- Naming: Vue components in `PascalCase` (e.g., `PasswordField.vue`); pages/routes in lowercase directory names (e.g., `app/pages/auth/login.vue`).

## Testing Guidelines

- Framework: `@nuxt/test-utils` is installed; Vitest is recommended.
- Placement: `tests/` or feature‑adjacent `*.spec.ts`.
- Status: No test script yet. If you add tests, include `vitest` and a `pnpm test` script.

## Commit & Pull Request Guidelines

- Commits: Follow Conventional Commits (e.g., `feat:`, `fix:`, `chore:`, `refactor:`). Examples in history: `fix: ...`, `chore: upgrade ...`.
- PRs: Provide a clear description, link related issues, include screenshots/GIFs for UI changes, list steps to verify, and ensure `pnpm lint` passes.

## Security & Configuration Tips

- Copy `.env.example` to `.env`. Set `DATABASE_URL`, `JWT_SECRET`, mail settings (see `nuxt.config.ts` runtimeConfig), and `appUrl`.
- Drizzle uses `DATABASE_URL` (see `drizzle.config.ts`). Never commit secrets or production DB credentials.
