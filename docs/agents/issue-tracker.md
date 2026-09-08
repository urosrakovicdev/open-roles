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

<!-- Fill these in on first use, then this file stops being guesswork. -->

- **Team:** _TBD — discover via the MCP server's "list teams" tool and record the key here (e.g. `ENG`)._
- **Project:** `OpenRoles` — the Linear project all specs and tickets belong to.
  Its description is the product brief; keep it in sync with
  [`docs/01-product-brief.md`](../01-product-brief.md), which is the source of truth.

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

**Specs** (`/to-spec`) are issues too — one per milestone, titled
`Spec: M<n> — <milestone name>`, with the milestone's tickets created as
**sub-issues** of it. Do not close a spec issue when its tickets are done; the
human closes it after the milestone self-review.

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
