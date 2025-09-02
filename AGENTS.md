# Repository Guidelines

## Project Structure & Module Organization
- `app/`: UI and app code — `components/`, `pages/`, `layouts/`, `assets/`, `middleware/`, `lib/` (utilities).
- `server/`: Backend/Nitro — `api/` (e.g., `users/index.get.ts`, `auth/login.post.ts`), `database/` (Drizzle `schema.ts`, `migrations/`), `tasks/`, `workers/`, `utils/`, `emails/`.
- `public/`: Static assets served at root.
- `shared/`, `types/`: Shared types and modules.
- Do not edit generated `.nuxt/` artifacts.

## Build, Test, and Development Commands
- `pnpm dev`: Start Nuxt dev server at `http://localhost:3000`.
- `pnpm build`: Build for production.
- `pnpm preview`: Preview the production build locally.
- `pnpm db:generate`: Generate Drizzle migrations from `server/database/schema.ts`.
- `pnpm db:push` (alias `pnpm migrate`): Apply migrations to `DATABASE_URL`.
- `pnpm db:seed`: Run Nitro task `db:seed` (see `server/tasks`).
- `pnpm lint` / `pnpm lint:fix`: Lint with ESLint and optionally fix issues.

## Coding Style & Naming Conventions
- TypeScript everywhere; 2-space indentation.
- ESLint via `@antfu/eslint-config` and Nuxt integration. Run `pnpm lint` before commits.
- Vue components: PascalCase in `app/components` (e.g., `UserCard.vue`).
- Utilities/composables: camelCase in `app/lib` (e.g., `useUser.ts`).
- API routes: `server/api/<path>/<name>.<method>.ts` (e.g., `profile.put.ts`).
- Tailwind CSS v4 for styling; keep classes semantic and grouped logically.

## Testing Guidelines
- Nuxt Test Utils is installed; preferred runner is Vitest. Co-locate tests as `*.spec.ts` next to sources or under `__tests__/`.
- Example names: `app/components/UserCard.spec.ts`, `server/api/users/index.get.spec.ts`.
- Add a script like `"test": "vitest"` when introducing tests; run with `pnpm test`.

## Commit & Pull Request Guidelines
- Use conventional prefixes: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`. Keep subject < 72 chars.
- PRs must include: concise description, linked issues, screenshots for UI changes, DB migration notes, and checklist: `pnpm lint`, `pnpm build`, and migrations applied.

## Security & Configuration Tips
- Copy `.env.example` to `.env`. Set `DATABASE_URL` and mail settings (`runtimeConfig` in `nuxt.config.ts`). Never commit secrets.
- Database: update `server/database/schema.ts`, then `pnpm db:generate` and `pnpm db:push`.
- Avoid direct edits in `.nuxt/`. Place static assets in `public/`.
