# 01 · Product brief

## What OpenRoles is

A **job board**. Companies post roles; candidates browse and apply. It has a
public, SEO-facing half and a private, authenticated half — which is exactly why
it's a good vehicle for practicing the whole Next.js stack (the two halves
exercise opposite ends of the rendering/caching/auth model).

## Why this app (vs a to-do list)

A job board forces every concept from your lessons to show up naturally:

| Concept (lesson)                         | Where it appears in OpenRoles |
| ---------------------------------------- | ----------------------------- |
| Server/Client boundary (L1)              | Public pages are server-rendered; only the search box, apply button, and forms are client. |
| Render & caching model, PPR (L2)         | The board and role pages are cacheable + SEO-critical; results stream via Suspense. |
| Server Actions & read-your-writes (L3)   | Post/edit/publish a role; apply to a role; revalidate the public page on publish. |
| Structure & the DAL, DTOs, IDOR (L4)     | One `data/` layer; employers may only touch their own company's roles. |
| Auth: sessions & where checks live (L5)  | Three roles; optimistic redirect in `proxy.ts`, real checks in the DAL. |
| Deploy & operate (L6)                    | Env, caching at scale, the action encryption key, observability. |

## Users (roles)

- **Candidate** (default) — browse/search roles, apply, track applications.
- **Employer** — create a company, post/edit/publish/close roles, review applications.
- **Admin** — moderate roles/users.

## Core features

1. **Public board** — list published roles with **search, filters** (type,
   location, remote) and **pagination**.
2. **Role detail page** — shareable, SEO-optimized, cached, with an Apply action.
3. **Company profile** — public page listing a company's open roles.
4. **Auth** — sign up / log in (credentials, optionally an OAuth provider),
   sessions, role selection.
5. **Employer dashboard** — post a role (draft → publish), edit, close; see
   applications to your roles.
6. **Candidate dashboard** — your applications and their status.
7. **Admin console** — flag/remove roles, manage users.
8. **(Stretch)** featured-role payment via a webhook Route Handler; resume
   upload; email notifications via `after()`.

## Pages / routes

```
/                         landing (static)
/roles                    public board — search/filter/pagination
/roles/[slug]             role detail (cached, SEO, Apply)
/companies/[slug]         company profile (cached)
/login  /signup           auth
/dashboard                role-aware home (private)
/dashboard/roles/new      post a role (employer)
/dashboard/roles/[id]/edit edit a role (employer, owner-only)
/dashboard/applications   applications (candidate or employer view)
/dashboard/settings       profile
/admin                    moderation (admin)
/api/auth/[...nextauth]   Auth.js
/api/webhooks/stripe      example webhook
```

## Explicitly out of scope (keep it finishable)

Messaging/chat, real payments beyond the webhook demo, search-as-a-service,
i18n, a design system. Add them only after the core slice works.
