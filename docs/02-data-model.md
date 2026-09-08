# 02 · Data model

> Vocabulary follows [`CONTEXT.md`](../CONTEXT.md): a **Job** is a posting, a
> **Role** is a user permission, and a **Public Job** is Published *or* Closed.

Five core entities. The schema lives in [`src/db/schema/`](../src/db/schema),
one file per area. (Auth.js also adds `accounts` / `sessions` /
`verificationTokens` — copy those from the adapter docs.)

## Entities & relationships

```
user (candidate | employer | admin)
  │  owns
  ▼
company ──< job (draft | published | closed)
                 │  receives
                 ▼
            application >── user (the candidate)
```

- A **user** with role `employer` **owns** one or more **companies**.
- A **company** has many **jobs**.
- A **job** is a **Public Job** — reachable at `/roles/[slug]` — when it is
  `published` **or** `closed`; a `draft` never is. Only `published` jobs appear
  on the board. See [ADR-0005](adr/0005-closed-jobs-stay-publicly-reachable.md):
  404ing a job the week it fills discards every inbound link and share. It has
  many **applications**.
- An **application** links a **job** and a candidate **user** (unique per pair —
  you can't apply twice).

## Why these shapes (decisions)

- **`ownerId` on company, `companyId` on job.** Ownership is the spine of
  authorization (Lesson 04/05). "Can this employer edit this job?" =
  `job.company.ownerId === session.userId`. Without these FKs you can't write the
  IDOR-safe query.
- **`status` enums on job/application.** They drive both UX and the caching
  story (Lesson 02): the board lists `published` jobs, the detail page also
  serves `closed` ones, and a `draft` is never public. Publishing is the moment
  you invalidate the public page (Lesson 03).
- **`slug` on job/company.** Stable, human-readable public URLs
  (`/roles/senior-react-engineer`) and good `generateStaticParams` keys.
- **`passwordHash` on user.** For the Credentials provider; store a bcrypt hash,
  never the password. The session payload stays minimal — id + role only
  (Lesson 05).

## The DTO boundary (Lesson 04)

The tables above are the *internal* shape. The UI never sees raw rows — the
[`data/`](../src/data) layer maps them to **DTOs** in
[`src/data/dto.ts`](../src/data/dto.ts): only safe fields, plus derived flags
like `isAcceptingApplications`, and never `passwordHash` or another user's data.

> **`JobDetailDTO` must not carry `canEdit`.** An earlier version of this doc
> said it did. It can't: the detail page is cached and session-free, so a
> `canEdit` computed inside it would be either permanently `false` or — worse —
> the first visitor's answer served to everyone. Ownership-derived affordances
> belong to a separate, *dynamic* component fed by its own owner-scoped read.
> See [ADR-0003](adr/0003-use-cache-lives-in-the-dal.md).

## Migrations

Schema is TypeScript ("schema as code"). Change a file in `schema/`, then:

```bash
npm run db:generate   # emit a SQL migration into /migrations (commit it)
npm run db:migrate    # apply it to the database
```

More in **Lesson 08 — Postgres & Drizzle**.
