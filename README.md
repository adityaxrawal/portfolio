# Aditya Rawal — Portfolio

React 19 + Vite 8 + TypeScript 6 portfolio site.

## Prerequisites
- Node.js >=20
- pnpm >= 9

## Setup
```bash
pnpm install
pnpm dev        # → http://localhost:3000
```

## Scripts
```bash
pnpm dev           # Development server
pnpm build         # Production build (runs GitHub data prefetch first)
pnpm preview       # Preview production build
pnpm lint          # ESLint
pnpm type-check    # TypeScript check
pnpm test          # Vitest
```

## Architecture
```
src/app/      → Entry point, router
src/features/ → Feature modules
src/          → Shared components, hooks, utils
api/          → Vercel serverless functions
scripts/      → Build-time scripts (GitHub data fetching)
```
