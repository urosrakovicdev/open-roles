# components/

Reusable React components.

- **`ui/`** — presentational primitives (Button, Input, Card, Badge). Mostly
  Server Components; add `"use client"` only to the leaves that need
  interactivity (Lesson 01 — push the boundary down).
- **`forms/`** — form components wired to Server Actions via `useActionState`
  (Lesson 03). These are Client Components by nature.

**Rule of thumb (Lesson 01):** a component is a Server Component until it needs
state, effects, event handlers, or browser APIs. Only then does it (or a small
child it delegates to) get `"use client"`.
