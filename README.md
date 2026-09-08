# OpenRoles

A job board — built as a **learning project** to practice the full Next.js 16
App Router stack end to end. This is not production software; it is a teaching
codebase where every architectural decision is documented and tied back to the
lessons in the `Teachings/Next.js` workspace.

> **New here? Read [`docs/00-START-HERE.md`](docs/00-START-HERE.md) first.**
> It explains what we're building, why the folders are arranged this way, and
> the milestone-by-milestone plan.
>
> Using Claude Code in this repo? [`CLAUDE.md`](CLAUDE.md) auto-loads every
> session and puts the agent in reviewer/pair-teacher mode — no setup needed.

## Stack

| Concern    | Choice                              | Why / docs |
| ---------- | ----------------------------------- | ---------- |
| Framework  | Next.js 16 (App Router)             | https://nextjs.org/docs |
| Database   | PostgreSQL (Neon serverless)        | https://neon.tech/docs |
| ORM        | Drizzle ORM                         | https://orm.drizzle.team |
| Auth       | Auth.js v5 (NextAuth)               | https://authjs.dev |
| Validation | Zod                                 | https://zod.dev |
| Unit tests | Vitest                              | https://nextjs.org/docs/app/guides/testing/vitest |
| E2E tests  | Playwright                          | https://nextjs.org/docs/app/guides/testing/playwright |

## Getting started

```bash
npm install                 # resolve dependencies (versions in package.json are indicative)
cp .env.example .env.local  # then fill in DATABASE_URL and run: npx auth secret
npm run db:generate         # generate SQL migrations from src/db/schema
npm run db:migrate          # apply them to your Neon database
npm run db:seed             # (optional) load sample roles/companies
npm run dev                 # http://localhost:3000
```

## Project map (the short version)

```
src/
  app/            routes — grouped: (marketing) public, (auth), (app) dashboard, admin, api
  db/             Drizzle: connection + schema (tables) + seed
  data/           the Data Access Layer — server-only reads, auth, DTOs (Lessons 04–05)
  actions/        Server Actions — thin 'use server' mutations that delegate to data/
  lib/            validations (zod), env, utils
  components/     ui primitives + forms
  auth.ts         Auth.js config        proxy.ts  optimistic auth redirect (Lesson 05)
docs/             the product brief, data model, architecture, roadmap, and ADRs
```

Full explanation in [`docs/05-conventions.md`](docs/05-conventions.md).
