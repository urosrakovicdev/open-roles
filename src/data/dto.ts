// DTOs (Data Transfer Objects) + their mappers (Lesson 04).
// A DTO is the shaped, minimal object the UI receives — only safe fields, plus
// derived flags (e.g. canEdit). Mappers convert a raw DB row → DTO. Keeping
// these here means "what may the client see?" is answered in ONE place.
//
// Docs: https://nextjs.org/docs/app/guides/data-security (Controlling return values)

// Example shapes (fill in as the schema firms up):
export type JobCardDTO = {
  slug: string
  title: string
  companyName: string
  location: string | null
  type: string
}

export type JobDetailDTO = JobCardDTO & {
  description: string
  salaryMin: number | null
  salaryMax: number | null
  canEdit: boolean // derived from session ownership — never a raw column
}

// TODO: export `toJobCardDTO(row)` / `toJobDetailDTO(row, session)` mappers.
// These are pure functions → perfect for a Vitest unit test (see dal.test.ts).
