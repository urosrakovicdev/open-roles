# ADR-0001 · Stack: Postgres + Drizzle + Auth.js

- **Status:** accepted
- **Date:** 2026-06-26

## Context
A learning project to practice the full Next.js App Router stack. The stack
should be current best-practice, type-safe end to end, framework-native, and let
us implement the patterns from the lessons (DAL, server actions, the two-tier
auth model) rather than hide them.

## Decision
- **PostgreSQL (Neon serverless)** — the default relational DB for Next apps;
  Neon gives a free, serverless-friendly Postgres with a connection string.
- **Drizzle ORM** — "schema as code" in TypeScript, SQL-fluent, lightweight,
  excellent type inference; pairs cleanly with the DAL pattern.
- **Auth.js v5 (NextAuth)** — self-host library that maps onto the Lesson 05
  model: its `auth()` is our `verifySession()`, and on Next 16 it wires through
  `proxy.ts`. Drizzle adapter persists users/sessions.
- **Zod** for validation; **Vitest + Playwright** for tests.

## Consequences
- Easier: type-safe queries, a real migration story, auth primitives we can
  audit (not a black box), all the lesson patterns expressible directly.
- Harder: more initial wiring than a managed all-in-one (e.g. Clerk); we own the
  auth edge cases — which is the point, pedagogically.
- Traded away: Clerk's hosted UI/MFA and Prisma's larger ecosystem.

## Alternatives considered
- **Prisma** — great DX but heavier runtime/bundle; Drizzle is the current
  momentum choice and closer to SQL (better for learning).
- **Clerk (managed auth)** — fastest, but hides exactly the auth internals
  Lesson 05 wants us to practice.
- **Supabase** — fine, but bundles DB+auth+storage in a way that obscures the
  individual pieces we're trying to learn.
