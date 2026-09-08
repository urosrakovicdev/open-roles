# 02 · Data model

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
- A **job**, when `published`, is public; it has many **applications**.
- An **application** links a **job** and a candidate **user** (unique per pair —
  you can't apply twice).

## Why these shapes (decisions)

- **`ownerId` on company, `companyId` on job.** Ownership is the spine of
  authorization (Lesson 04/05). "Can this employer edit this job?" =
  `job.company.ownerId === session.userId`. Without these FKs you can't write the
  IDOR-safe query.
- **`status` enums on job/application.** They drive both UX and the caching
  story: only `published` jobs are public and cacheable (Lesson 02), and
  publishing is the moment you revalidate the public page (Lesson 03).
- **`slug` on job/company.** Stable, human-readable public URLs
  (`/roles/senior-react-engineer`) and good `generateStaticParams` keys.
- **`passwordHash` on user.** For the Credentials provider; store a bcrypt hash,
  never the password. The session payload stays minimal — id + role only
  (Lesson 05).

## The DTO boundary (Lesson 04)

The tables above are the *internal* shape. The UI never sees raw rows — the
[`data/`](../src/data) layer maps them to **DTOs** in
[`src/data/dto.ts`](../src/data/dto.ts) (e.g. `JobDetailDTO` exposes `canEdit`,
a derived flag, but never `internalNotes` or another user's data).

## Migrations

Schema is TypeScript ("schema as code"). Change a file in `schema/`, then:

```bash
npm run db:generate   # emit a SQL migration into /migrations (commit it)
npm run db:migrate    # apply it to the database
```

More in **Lesson 08 — Postgres & Drizzle**.
