// Example colocated unit test (Vitest). The DAL's pure pieces — DTO mappers,
// query-param parsing — are the cheapest, highest-value things to test.
// Run with `npm test`. Docs: https://nextjs.org/docs/app/guides/testing/vitest
//
// LEARNING NOTE: don't test the DB here — mock it. Test the SHAPING logic (does
// a raw row become a safe DTO? does canEdit reflect ownership?).

import { describe, it, expect } from "vitest"

describe("job DTO mapping", () => {
  it("placeholder — replace once toJobDetailDTO exists", () => {
    // const dto = toJobDetailDTO(fakeRow, { userId: "owner", role: "employer" })
    // expect(dto.canEdit).toBe(true)
    // expect(dto).not.toHaveProperty("internalNotes")
    expect(true).toBe(true)
  })
})
