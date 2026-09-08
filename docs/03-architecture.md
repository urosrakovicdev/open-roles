# 03 · Architecture (the decisions, mapped to lessons)

This is the "why" behind the file tree. Each decision links to the lesson it
came from. When you review your own PRs, check the code against this doc.

## 1. Server-first; push the client boundary down (Lesson 01)

Everything is a **Server Component** by default. `"use client"` appears only on
the leaves that truly need interactivity — the search box, the apply button, the
forms in `components/forms/`. Pages, layouts, lists, and detail views stay on the
server so they can `await` the DAL and ship no JS.

> Smell to catch in review: `"use client"` at the top of a page, or a hook in a
> Server Component.

## 2. The render & caching model is opt-in (Lesson 02)

`cacheComponents: true` is on (`next.config.ts`). Nothing is cached unless we say
so with `use cache`. The plan:

- **Public, slow-changing pages** (`/roles/[slug]`, `/companies/[slug]`,
  landing) → cached, tagged (`job-${slug}`), revalidated on edit/publish.
- **The board** (`/roles`) → cacheable shell + filtered results streamed behind
  `<Suspense>`; reading `searchParams` makes the results dynamic.
- **Dashboard pages** → dynamic, per-user, never cached.

## 3. All data goes through a Data Access Layer (Lesson 04)

[`src/data/`](../src/data) is `server-only`. It is the **only** place that:

- reads/writes the database,
- verifies the session (`verifySession`) and role (`requireRole`),
- returns **DTOs**, never raw rows.

Pages and actions call the DAL; they never touch `db` directly. One audited choke
point instead of scattered queries.

## 4. Mutations are thin Server Actions that delegate (Lesson 03)

[`src/actions/`](../src/actions) hold `'use server'` functions. Each is a public
POST endpoint, so each one: **verifies → authorizes → validates (zod) → writes →
revalidates**. For read-your-own-writes (an employer publishing a role) use
`updateTag(tag)` — it expires the entry immediately, so the next read waits for
fresh data instead of being served stale, and the employer sees their change at
once. `updateTag` is Server-Action-only.

> **Next 16:** the bare `revalidateTag(tag)` call is deprecated. It now takes a
> cache profile as a second argument — `revalidateTag(tag, "max")` for
> stale-while-revalidate, `revalidateTag(tag, { expire: 0 })` to force a
> blocking revalidate — and it is the *background-freshness* tool, legal in both
> Server Actions and Route Handlers. Reach for `updateTag` when the user must
> see their own write.

## 5. Auth: optimistic in the proxy, real in the DAL (Lesson 05)

- `proxy.ts` does the **optimistic**, cookie-only redirect (logged out → /login).
  It is *not* the security boundary and never hits the DB.
- The **real** check is `verifySession()` / `requireRole()` in the DAL, re-run at
  **every** entry point — each page, each Server Action, each Route Handler.
- **Ownership (IDOR):** role checks aren't enough. Editing a role loads it scoped
  to the employer's company; applications are always filtered by the session.

> Smells to catch: an auth check only in `proxy.ts`; an auth check in a layout
> (layouts don't re-render on nav); `return null` as "protection".

## 6. Built to deploy and operate (Lesson 06)

- **Env:** server secrets via `lib/env.ts` (validated, server-only); only
  `NEXT_PUBLIC_*` reaches the client, inlined at build.
- **Production (when we get there):** set `deploymentId`, a shared `cacheHandler`,
  and pin `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` (the four-gotcha checklist).
- **Observability:** `instrumentation.ts` is the seam for tracing.
- **Route Handlers** (`/api/webhooks/*`) are the BFF surface for external callers.

## The request, end to end

```
Browser
  └─ proxy.ts        optimistic cookie check → maybe redirect      (L5)
  └─ Server Component (page)                                       (L1)
       └─ data/ (DAL)  verifySession + ownership-scoped query      (L4/L5)
            └─ db (Drizzle → Postgres)                             (L08)
       └─ returns a DTO → renders HTML (+ streams Suspense holes)  (L2)
  └─ Client leaf (form) → Server Action                           (L3)
       └─ data/ (DAL) verify → validate → write → updateTag        (L3/L4)
```
