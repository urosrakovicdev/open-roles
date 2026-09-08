# 04 · Roadmap (your worklist)

Build in thin vertical slices. Each milestone ends in something you can run and
see. Check items off as you go; log surprises in [`learning-log.md`](learning-log.md).

> Tip: after each milestone, do a self-review against
> [`03-architecture.md`](03-architecture.md) — that's the "lead a review" muscle
> from your Checkpoint.

## M0 · Boot the project ✅ scaffolded
- [ ] `npm install`; create a Neon DB; fill `.env.local`; `npx auth secret`.
- [ ] **Do Lesson 08 (Postgres & Drizzle) first if DB is new to you.**
- [ ] `npm run db:generate && npm run db:migrate` with the starter schema.
- [ ] `npm run dev` → the landing page renders.
- **Win:** the app boots and talks to a real database.

## M1 · Public shell, no data yet (Lessons 01–02)
- [ ] Landing page; `(marketing)` header/footer; a `/roles` page with hardcoded cards.
- [ ] Decide what's static vs dynamic; add a `<Suspense>` boundary on the list.
- **Win:** a fast, server-rendered public skin.

## M2 · Real data: the read path (Lessons 02, 04, 08)
- [ ] Finish the schema (`accounts`/`sessions` for Auth.js, relations); seed data.
- [ ] Implement `data/jobs.ts` reads + DTO mappers; wire the board + role detail.
- [ ] Add `use cache` + tags to the role page; `generateStaticParams` + metadata.
- **Win:** the public board shows seeded roles from Postgres, cached.

## M3 · Auth (Lessons 03, 05)
- [ ] Auth.js Credentials provider; signup/login forms → Server Actions; `role`.
- [ ] `verifySession` / `requireRole` in the DAL; `proxy.ts` redirect.
- [ ] Protect the dashboard; confirm the layout is NOT the boundary.
- **Win:** you can sign up, log in, and reach a role-gated dashboard.

## M4 · The write path: post a role (Lessons 03, 04)
- [ ] `createJob` / `publishJob` / `deleteJob` actions (verify → validate → own → write).
- [ ] Employer "new role" + "edit role" (owner-scoped) pages and forms.
- [ ] `updateTag` on publish → the public page updates immediately.
- **Win:** an employer posts a role and sees it live on the board (read-your-writes).

## M5 · Applications & the second role (Lessons 03–05)
- [ ] Candidate applies (`applyToJob`); unique constraint; candidateId from session.
- [ ] Candidate + employer application views (correctly scoped by the DAL).
- [ ] Admin console with `requireRole('admin')`.
- **Win:** the full two-sided flow works, ownership enforced throughout.

## M6 · Test, deploy, operate (Lessons 06 + testing)
- [ ] Vitest unit tests for DTO mappers/validations; Playwright e2e for the two
      key flows (sign up→dashboard; post→board).
- [ ] Deploy to Vercel; set env; verify build.
- [ ] Write the production-readiness notes: where would `deploymentId` /
      `cacheHandler` / the encryption key go if self-hosted? (Lesson 06 checklist.)
- **Win:** a deployed, tested app — and you can explain its production posture.

## Stretch
Featured-role payment (Stripe webhook), resume upload, email on new application
via `after()`, OAuth login, optimistic UI on apply (`useOptimistic`).
