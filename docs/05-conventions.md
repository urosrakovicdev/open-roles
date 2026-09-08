# 05 · Conventions (where things live)

The folder layout *is* the architecture. When you add code, this table tells you
where it goes — and the "never" column is what keeps the boundaries honest.

| If you're writing…                        | Put it in…                  | Never… |
| ----------------------------------------- | --------------------------- | ------ |
| A page/route                              | `src/app/**`                | …put DB queries or auth logic inline — call the DAL. |
| A DB read (or a query)                    | `src/data/*.ts` (DAL)       | …import `db` from a component or action directly. |
| A mutation                                | `src/actions/*.ts`          | …skip verify/authorize/validate — it's a public endpoint. |
| A table                                   | `src/db/schema/*.ts`        | …edit the DB by hand — change schema, generate a migration. |
| Input validation                          | `src/lib/validations/*.ts`  | …treat zod as an ownership check (it validates shape only). |
| A reusable component                      | `src/components/{ui,forms}` | …add `"use client"` unless the leaf needs interactivity. |
| A secret / env read                       | `src/lib/env.ts`            | …read `process.env` in client code or prefix a secret `NEXT_PUBLIC_`. |
| Observability / startup code              | `src/instrumentation.ts`    | — |

## Naming & style

- **Path alias:** import via `@/…` (maps to `src/`). e.g. `import { db } from "@/db/drizzle"`.
- **Route groups** `(marketing)` / `(auth)` / `(app)` organize routes without
  adding URL segments.
- **Server by default.** A file is a Server Component unless it starts with
  `"use client"`. Actions start with `"use server"`. DAL/db/env start with
  `import "server-only"`.
- **Colocation is fine** (Lesson 04): a folder isn't a route until it has a
  `page`/`route` file, so helper and test files can live next to what they serve.
- **Tests:** pure-logic unit tests colocated as `*.test.ts` (Vitest, Node
  environment — DAL query shaping, DTO mappers, zod validations); full-flow
  tests in `e2e/` (Playwright). No UI component testing — cover UI behaviour
  through the Playwright e2e flows, not isolated component render tests.
- Prettier + ESLint (`next/core-web-vitals`) enforce formatting/lint.

## The one rule that prevents most bugs

> Components and actions **call the DAL**; only the DAL touches the database, and
> the DAL is the only place auth and ownership are decided. If you're tempted to
> `import { db }` outside `src/data` or `src/db`, stop — that's the smell.
