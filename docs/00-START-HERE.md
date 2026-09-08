# 00 · Start here

Welcome to **OpenRoles** — a job board you'll build to practice the entire
Next.js 16 App Router stack end to end. This is a **learning codebase**: the
point isn't to ship it, it's to make every architectural decision *on purpose*
and be able to explain it.

## How this repo is meant to be used

1. **Read these docs in order** (they're short):
   - [`01-product-brief.md`](01-product-brief.md) — what we're building (features, pages, roles).
   - [`02-data-model.md`](02-data-model.md) — the entities and how they relate.
   - [`03-architecture.md`](03-architecture.md) — the big decisions, each tied to a lesson.
   - [`04-roadmap.md`](04-roadmap.md) — the milestone-by-milestone build plan. **This is your worklist.**
   - [`05-conventions.md`](05-conventions.md) — where each kind of code lives and why.
2. **Skim the file tree.** Every file already exists as a documented stub: open
   any one and the top comment tells you what it's for and links the docs. The
   structure *is* a lesson in itself — this is what a best-practice App Router
   project looks like.
3. **Build milestone by milestone** ([`04-roadmap.md`](04-roadmap.md)). Each
   milestone is small, ends in something runnable, and maps to lessons you've
   already done.
4. **Keep a [`learning-log.md`](learning-log.md)** — jot what surprised you, what
   broke, what you'd do differently. That's where fluency becomes understanding.

## Working with the AI agent in this repo

There's a [`CLAUDE.md`](../CLAUDE.md) at the repo root. Claude Code reads it
automatically at the start of **every** conversation here, so a fresh chat
already knows this is your learning capstone and that the agent should act as a
**reviewer / pair-teacher** (guide and review, not ghostwrite). You don't need to
re-explain the setup, and you don't need the `/teach` command in this repo —
just start talking. (`/teach` stays in the teaching workspace, for building
actual lessons.)

## The relationship to your lessons

You've completed six lessons + a checkpoint in the `Teachings/Next.js`
workspace: the server/client boundary, the render & caching model, server
actions & mutations, structure & the Data Access Layer, auth, and
deploy/operate. **This project is where that knowledge becomes a skill.** Each
doc and file comment cites the lesson it comes from, so you're always one click
from the theory.

## Prerequisite you haven't covered yet

You haven't used **PostgreSQL** or **Drizzle ORM** before. Before Milestone 1,
do **Lesson 08 — Postgres & Drizzle** in the teaching workspace
(`lessons/0008-postgres-and-drizzle.html`). It's written specifically to unblock
this build.

## First commands

See the [README](../README.md#getting-started). Short version: `npm install`,
copy `.env.example` → `.env.local`, set up a free Neon database, then
`npm run db:generate && npm run db:migrate && npm run dev`.
