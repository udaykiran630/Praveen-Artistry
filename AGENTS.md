# Project Guidelines — Praveen Artistry

## Architecture & Codebase

- **Framework**: TanStack Start with React 19.
- **Routing**: TanStack Router with file-based routing under `src/routes/`.
- **Styling**: Tailwind CSS v4 configured in `src/styles.css`.
- **State Management**: TanStack React Query for data fetching and caching.
- **Backend**: Supabase for authentication and database management (`src/integrations/supabase/`).

## Conventions

- Keep page routes organized in `src/routes/`.
- Shared UI components belong in `src/components/ui/` and site-specific components in `src/components/site/`.
- Brand constants, formats, and utilities belong in `src/lib/brand.ts` and `src/lib/utils.ts`.
