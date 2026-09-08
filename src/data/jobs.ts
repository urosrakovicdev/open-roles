// Job READS. server-only. Returns DTOs (Lesson 04) — shaped objects with only
// the fields the UI may see — never raw Drizzle rows.
//
// Two audiences, two trust levels:
//  - Public reads (the board, a published role) need NO session but MUST filter
//    to status = 'published'.
//  - Owner reads (an employer's drafts) MUST call verifySession() and scope by
//    ownership, or you ship an IDOR (Lesson 04/05).
//
// Docs: https://orm.drizzle.team/docs/select
//       https://nextjs.org/docs/app/guides/data-security

import "server-only"
import { db } from "@/db/drizzle"
import { verifySession } from "./dal"

// PUBLIC: list published roles (search/filter/pagination). Cacheable (Lesson 02).
export async function listPublishedJobs(_params: {
  q?: string
  page?: number
}) {
  // TODO (Milestone 2): query jobs where status = 'published', paginate, map to DTOs.
  // return rows.map(toJobCardDTO)
  return []
}

// PUBLIC: one published role by slug (for /roles/[slug], generateStaticParams).
export async function getPublishedJobBySlug(_slug: string) {
  // TODO: fetch published job + company, return a JobDetailDTO or null.
  return null
}

// OWNER: roles belonging to the signed-in employer's company (drafts included).
export async function listMyJobs() {
  const { userId } = await verifySession() // authn
  // TODO: scope by company.ownerId === userId (authz / ownership). Map to DTOs.
  void userId
  return []
}
