# Cloudflare Workers React Starter

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/hamgor/mark-six-analysis-predictor)

A production-ready full-stack starter template for building scalable applications with Cloudflare Workers, Durable Objects, and React. This template provides a robust foundation with type-safe APIs, indexed entities for efficient data management, and a modern UI powered by Tailwind CSS and shadcn/ui.

## Features

- **Cloudflare Durable Objects**: Entity-based storage with automatic indexing and pagination for users, chats, and custom data models.
- **Type-Safe Full-Stack**: Shared TypeScript types between frontend and Worker for seamless development.
- **React + Vite + Tailwind**: Modern frontend with shadcn/ui components, TanStack Query, and Framer Motion.
- **Hot-Reload Development**: Simultaneous Worker and frontend development with Bun and Vite.
- **API-First**: RESTful endpoints with Hono for users, chats, and messages (extensible via `worker/user-routes.ts`).
- **Production-Ready**: CORS, error handling, logging, and Cloudflare-specific optimizations.
- **Seed Data**: Mock users, chats, and messages auto-populate on first run.
- **Theme Support**: Dark/light mode with localStorage persistence.

## Tech Stack

- **Backend**: Cloudflare Workers, Durable Objects, Hono, TypeScript
- **Frontend**: React 18, Vite, Tailwind CSS, shadcn/ui, TanStack Query, Lucide Icons
- **Data**: Indexed Durable Objects (KV-like with versioning/CAS)
- **Tools**: Bun, Wrangler, ESLint, TypeScript
- **UI/UX**: Framer Motion, Sonner Toasts, Sidebar Layout

## Quick Start

1. **Prerequisites**:
   - [Bun](https://bun.sh/) installed
   - [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) (`bunx wrangler@latest`)

2. **Clone & Install**:
   ```bash
   git clone <your-repo-url>
   cd <project>
   bun install
   ```

3. **Development**:
   ```bash
   bun run dev
   ```
   - Frontend: http://localhost:3000
   - Worker API: http://localhost:8787/api/health

## Development

### Project Structure
```
├── src/              # React frontend (Vite)
├── worker/           # Cloudflare Worker API
├── shared/           # Shared types & mock data
└── ...               # Config files (tsconfig, tailwind, wrangler)
```

### Key Files to Customize
- **API Routes**: `worker/user-routes.ts` (add endpoints)
- **Entities**: `worker/entities.ts` (extend IndexedEntity)
- **Frontend Pages**: `src/pages/HomePage.tsx` (replace demo)
- **Sidebar**: `src/components/app-sidebar.tsx` (optional)
- **API Client**: `src/lib/api-client.ts` (query/mutate helpers)

### Scripts
```bash
bun run dev          # Start dev server (frontend + worker)
bun run build        # Build for production
bun run lint         # Lint code
bun run preview      # Preview production build
bun run cf-typegen   # Generate Worker types
```

### Adding shadcn Components
```bash
bunx shadcn@latest add button dialog
```

### Environment
Set `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` for deployment:
```bash
wrangler login
wrangler whoami
```

## API Examples

Test endpoints at `http://localhost:8787/api/`:

```bash
# List users
curl http://localhost:8787/api/users

# Create user
curl -X POST http://localhost:8787/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe"}'

# List chats
curl http://localhost:8787/api/chats

# Send message
curl -X POST http://localhost:8787/api/chats/c1/messages \
  -H "Content-Type: application/json" \
  -d '{"userId": "u1", "text": "Hello!"}'
```

## Deployment

1. **Build & Deploy**:
   ```bash
   bun run build
   bun run deploy
   ```
   - Deploys Worker + static assets to Cloudflare.
   - Custom domain via `wrangler.toml`.

2. **One-Click Deploy**:
   [![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/hamgor/mark-six-analysis-predictor)

3. **Production Config**:
   - Edit `wrangler.jsonc` for bindings/migrations.
   - Run `bun run cf-typegen` after `wrangler deploy` for updated types.

## Customization Guide

1. **New Entity**: Extend `IndexedEntity` in `worker/entities.ts`.
2. **New Route**: Add to `worker/user-routes.ts`.
3. **Frontend Query**: Use `api()` from `src/lib/api-client.ts` with TanStack Query.
4. **Sidebar/Layout**: Use `AppLayout` or build custom.

## Troubleshooting

- **Worker Routes Fail**: Check `worker/user-routes.ts` exports `userRoutes(app)`.
- **Types Missing**: Run `bun run cf-typegen`.
- **CORS Issues**: Enabled for `/api/*`.
- **Seed Data**: Clears on entity delete; re-runs `ensureSeed`.

## License
MIT - Feel free to use in commercial projects. No warranty provided.