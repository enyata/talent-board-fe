# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Enyata Talent Board — a Next.js 15 (App Router) frontend for scouting and hiring talent. Two user-facing roles (recruiter / talent) share the same app, gated by route groups and profile-completion state.

## Commands

Package manager is **yarn** (yarn.lock is authoritative; no package-lock.json).

- `yarn dev` — start the dev server (Next.js, Turbopack off by default)
- `yarn build` — production build
- `yarn start` — run the production build
- `yarn lint` — ESLint (`next/core-web-vitals` + `next/typescript`)
- `yarn docker-dev` — build and run via `docker-compose.yml` (serves on port 3000)

There is no test suite configured in this repo (no test runner, no `*.test.*`/`*.spec.*` files) — do not assume Jest/Vitest exist.

Environment variables (see `.env`, read via `src/lib/env.ts`): `NEXT_PUBLIC_API_URL` (backend API base URL) and `NEXT_PUBLIC_APP_ENV`. Add new env vars to `env.ts`'s lookup map rather than reading `process.env` directly in components.

## Architecture

### Route groups (`src/app`)

- `(website)` — public marketing pages (home, talents listing, privacy/terms). No auth required.
- `(auth)` — login/signup/forgot-password + OAuth callback/finalize flow. Has its own split-screen layout with a testimonial carousel.
- `(protected)` — dashboard, profile, talent detail/bookmarks. Server-rendered layout (`(protected)/layout.tsx`) fetches the current user via `getUser()` and redirects to `/login` (no user), `/onboard` (profile not completed), or renders a `Timeout` component if the request exceeds its timeout.
- `onboard` — multi-step profile completion form (own layout, gated by `profile_completed`).
- `src/app/api/auth/finalize/route.ts` — Next.js Route Handler used to finalize OAuth token exchange server-side.

### Auth model — dual token strategy

Tokens exist in two places simultaneously and both are synced on hydration:

1. **httpOnly cookies** (`access_token`, `refresh_token`) — set server-side via `src/lib/store-token.ts` (`"use server"`), read by server components/middleware. These are the source of truth for SSR gating.
2. **Zustand store** (`src/store/authStore.ts`) — `accessToken`/`refreshToken`/`user` held client-side for attaching `Authorization`/`x-refresh-token` headers on axios requests (`src/lib/axiosInstance.ts`).

`src/components/authHydrator.tsx` is the bridge: protected/website/onboard layouts fetch the user + cookie values server-side and pass them into `AuthHydrator`, which pushes them into the Zustand store on mount so client components have access without a second fetch.

`src/middleware.ts` does a cheap cookie-presence check (`refresh_token`) to gate `/dashboard`, `/profile`, `/settings`, `/onboard` before the request even reaches layouts — this is a fast redirect, not the real auth check (that happens in `(protected)/layout.tsx` via `getUser()`).

The axios response interceptor rotates the access token automatically: if the API responds with an `x-access-token` header, it's written back into `useAuthStore`.

### Data fetching conventions

- **Server-side reads on initial load** go through plain `fetch` wrapped in `withTimeout()` (`src/lib/withTimeout.ts`) — an `AbortController`-based timeout helper that throws `RequestTimeoutError` on expiry. Server functions like `src/api/user.ts#getUser` and `src/api/talent.ts#fetchTopTalents` are `"use server"` and follow this pattern; layouts catch `RequestTimeoutError` specifically to render a `Timeout` fallback rather than a hard error.
- **Client-side reads/writes** go through `src/lib/requests.ts` (`GET`/`POST`/`PATCH`/`DEL` thin wrappers over the shared `axiosInstance`) combined with TanStack Query. Query hooks live in `src/hooks/` (e.g. `useTalents.ts`, `useDashboard.ts`); mutations live in `src/hooks/mutations/` and invalidate related query keys on success (see `hooks/mutations/talent.ts` invalidating `talents`, `dashboard`, `saved_talents`, and the specific `talent` detail key together — when adding a new mutation that affects talent data, mirror this invalidation set rather than only invalidating one key).
- `QueryProviders` (`src/components/providers/queryProvider.tsx`) wraps the whole app in root `layout.tsx`; there's a second, currently unused `tanstack-query-provider.tsx` — check which is actually mounted before assuming both are live.

### State (Zustand stores in `src/store/`)

`authStore`, `userStore`, `talentStore`, `dashboardStore` — plain Zustand stores, no persistence middleware. Auth state is rehydrated per-request via `AuthHydrator` rather than persisted to storage, so a hard refresh always re-derives client state from the server-rendered cookies/user fetch.

### UI layer

- shadcn/ui (`components.json`: style `new-york`, base color `neutral`, RSC on) — generated primitives live in `src/components/ui`. Path aliases: `@/components`, `@/lib`, `@/hooks`, `@/ui` all resolve under `src/` (see `tsconfig.json` `@/*` → `./src/*`).
- Tailwind v4 (CSS-based config via `@tailwindcss/postcss`, no `tailwind.config.*` file — theme lives in `src/app/globals.css`).
- Two toast systems currently coexist in root layout: `sonner` (`Toaster`) and `react-toastify` (`ToastContainer`, marked `TODO: rem react-toastify` in `layout.tsx`) — prefer `sonner` for new code.
- Local fonts (Neue Haas) are loaded via `next/font/local` in root `layout.tsx` alongside Geist; font files live under `public/fonts/`.

### Deployment

Two independent deploy targets are configured: Netlify (`netlify.toml`, `@netlify/plugin-nextjs`) and Docker (`Dockerfile` + `docker-compose.yml`, standalone Next.js output via `output: "standalone"` in `next.config.ts`). Image `remotePatterns` in `next.config.ts` are currently scoped to `media.licdn.com` and `lh3.googleusercontent.com` (LinkedIn/Google avatar sources) — extend this list when adding new external image hosts.
