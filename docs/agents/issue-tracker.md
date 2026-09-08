# Issue tracker: Linear

Specs and tickets for OpenRoles live in **Linear**, reached through the
`linear-server` MCP server (`https://mcp.linear.app/mcp`, added to this project's
local config). There is no `gh`/`glab` equivalent — every operation below is an
MCP tool call, not a shell command.

> **Discover the tool names at runtime.** Don't hardcode them from memory. List
> what `linear-server` exposes and match by capability; Linear ships new tools
> over time. If the server isn't connected, run `/mcp` to authenticate before
> attempting any write.

## Workspace coordinates

- **Workspace:** `Open Roles`. The workspace *is* the product — there is no
  Linear project representing the app as a whole.
- **Team:** `URO` (display name "Uros Rakovic"). The only team.
- **Projects: one per milestone**, named after the roadmap entry —
  e.g. `M2 · Real data: the read path`. A Linear project is a scoped body of work
  with a start and an end, which is exactly what a milestone is; the whole app is
  the workspace. Create the project when you start the milestone.
- **Labels:** only `ready-for-human` exists so far (created 2026-09-08). The
  other four in [`triage-labels.md`](triage-labels.md) are not needed until
  `/triage` has incoming issues to sort.

> This section was guesswork until M2. It now records what is actually there.
> Earlier revisions of this file assumed a single `OpenRoles` project holding
> every milestone — that was wrong about Linear's hierarchy
> (workspace → teams → projects → issues) and has been corrected.

## Conventions

- **Create an issue** — the MCP "create issue" tool. Always set the team and the
  `OpenRoles` project. Markdown is supported in the description; use it.
- **Read an issue** — the "get issue" tool by identifier (`ENG-42`) or URL. Fetch
  its comments too; specs accumulate clarifications in the comment thread.
- **List issues** — the "list issues" tool, filtered by project and state.
- **Comment** — the "create comment" tool.
- **Labels** — the "update issue" tool. See [`triage-labels.md`](triage-labels.md).
  Linear labels must already exist in the workspace; create them once, by hand,
  before the first `/to-tickets` run.
- **Close** — move the issue to a `Done` workflow state (Linear uses states, not
  a boolean `closed` — "close" in any skill's wording means "set state to Done").

## Blocking edges

Linear has **native issue relations**. `/to-tickets` and `/wayfinder` both need
these, so use them rather than writing "Blocked by:" into the description:

- **`blocks` / `blocked by`** — the relation to use for a ticket's blocking edges.
- **Parent / sub-issue** — the relation to use for a map and its children.

A ticket is unblocked when every issue that blocks it is in a `Done` state. The
**frontier** is every issue in the project that is not `Done`, has no unfinished
blocker, and is unassigned.

## When a skill says "publish to the issue tracker"

Create a Linear issue in the `OpenRoles` project.

**Specs** (`/to-spec`) are published as **two objects in the milestone's
project**, because a Linear document cannot parent issues:

1. A **document** titled `Spec: M<n> — <milestone name>` holding the full spec.
   This is the canonical copy — edit it, not the issue.
2. A thin **issue** with the same title, linking to the document and carrying the
   ticket list. `/to-tickets` creates the milestone's tickets as **sub-issues**
   of this one.

Do not close the spec issue when its tickets are done; the human closes it after
the milestone self-review against [`../03-architecture.md`](../03-architecture.md).

## When a skill says "fetch the relevant ticket"

Get the issue by its Linear identifier, including comments.

## Repo-specific rules

These override the generic skill defaults. They come from
[`CLAUDE.md`](../../CLAUDE.md) — this is a learning capstone, and the human
writes the code.

1. **`/to-tickets` applies `ready-for-human`, never `ready-for-agent`.** Tickets
   here are implemented by hand. `ready-for-agent` would be false on every one.
2. **`/implement` is not used in this repo.** The flow stops at `/to-tickets`.
   The downstream skill is `/code-review`, run against the ticket after the human
   builds it.
3. **One spec per milestone, not one for the app.** `docs/04-roadmap.md` defines
   M0–M6. Run `/grill-with-docs` → `/to-spec` → `/to-tickets` for a single
   milestone at a time, so the ticket set fits one context window.
4. **`docs/` is the source of truth for product and architecture**, not Linear.
   Linear holds the worklist. If a spec contradicts
   [`docs/03-architecture.md`](../03-architecture.md), say so rather than
   silently overriding it.

## The GitHub remote is for code, not issues

`origin` is <https://github.com/urosrakovicdev/open-roles> and the `gh` CLI is
installed. **Neither changes the tracker.** A GitHub remote plus `gh` is exactly
the signal `/setup-matt-pocock-skills` uses to propose GitHub Issues — ignore it.
Issues for this repo live in Linear, per this file. GitHub hosts the code and
nothing else; GitHub Issues is not enabled as a work surface here.

## Pull requests as a triage surface

**PRs as a request surface: no.** This is a solo repo with no external
contributors, so there is no PR queue for `/triage` to read. Revisit only if the
repo ever takes contributions from outside.
