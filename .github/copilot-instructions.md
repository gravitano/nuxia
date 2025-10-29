# Nuxia Copilot Instructions

## Project Architecture

**Nuxia** is a full-stack Nuxt 4 starter template with a clear separation between frontend (`app/`) and backend (`server/`) code:

- **Frontend**: Vue 3 + Nuxt 4 with TypeScript, shadcn-vue components, Tailwind CSS
- **Backend**: Nitro server with PostgreSQL + Drizzle ORM, JWT auth, email workers
- **Shared**: Zod schemas in `shared/schemas/` for type-safe validation across client/server

## Key Development Patterns

### File Structure Conventions

- Place new pages in `app/pages/` (auto-routed)
- Use `app/components/` for reusable components, following shadcn-vue patterns
- Server API endpoints go in `server/api/` with `.get.ts`/`.post.ts` suffixes
- Shared validation schemas in `shared/schemas/` (used by both client/server)

### Authentication Flow

- Use `nuxt-auth-utils` for session management: `useUserSession()` composable
- Protect pages with `auth.ts` middleware: `definePageMeta({ middleware: 'auth' })`
- API endpoints validate with Zod schemas from `shared/schemas/`
- JWT tokens generated in `server/utils/jwt.ts` for API access

### Database Patterns

- Schema defined in `server/database/schema.ts` using Drizzle ORM
- Run migrations: `pnpm db:push` (pushes schema changes)
- Seed data: `pnpm db:seed` (runs `server/tasks/seed.ts`)
- Query using `db.query.tableName.findFirst()` pattern

### Component Structure

- Forms use `vee-validate` + Zod: import from `@vee-validate/zod`
- UI components from `app/components/ui/` (shadcn-vue based)
- Emit pattern: `defineEmits<{ submit: [values: FormType] }>()` for type safety
- Props: `defineProps<{ isLoading?: boolean }>()` with TypeScript

### Email & Background Tasks

- Email templates in `server/emails/` as Vue components
- Background email sending via `server/workers/email-worker.ts`
- Tasks defined in `server/tasks/` for database operations

## Development Commands

```bash
# Development
pnpm dev                    # Start dev server (localhost:3000)
pnpm build                  # Production build
pnpm db:push               # Apply schema changes to DB
pnpm db:seed               # Seed initial data
pnpm lint                  # ESLint check
pnpm lint:fix              # Auto-fix linting issues
```

## Integration Points

- **Email**: Vue Email templates + Nodemailer (configured in `nuxt.config.ts` runtimeConfig)
- **Auth**: Session-based with `nuxt-auth-utils`, JWT for API access
- **Database**: PostgreSQL connection via `DATABASE_URL` environment variable
- **Workers**: `nuxt-workers` for background email processing

## Code Examples

### API Endpoint Pattern

```typescript
// server/api/example.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const result = exampleSchema.safeParse(body)
  if (!result.success) {
    return createError({ statusCode: 422, data: result.error })
  }
  // ... business logic
})
```

### Form Component Pattern

```vue
<script setup lang="ts">
const emit = defineEmits<{ submit: [values: FormValues] }>()
const formSchema = z.object({ /* ... */ })
type FormValues = z.infer<typeof formSchema>
const { handleSubmit } = useForm({ validationSchema: toTypedSchema(formSchema) })
</script>
```

### Protected Page

```vue
<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
// Page is now protected by authentication
</script>
```
