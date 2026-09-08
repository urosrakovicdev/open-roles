// Example colocated unit test (Vitest). The DAL's pure pieces — DTO mappers,
// query-param parsing — are the cheapest, highest-value things to test.
// Run with `npm test`. Docs: https://nextjs.org/docs/app/guides/testing/vitest
//
// LEARNING NOTE: don't test the DB here, and don't mock the query builder
// either — that tests the mock. Test the SHAPING logic: does a raw row become a
// safe DTO, and does the derived flag follow the job's lifecycle?

import { describe, it, expect } from "vitest"

describe("job DTO mapping", () => {
  it("placeholder — replace once toJobDetailDTO exists (URO-9)", () => {
    // The mappers are pure and take NO session: JobDetailDTO is public and
    // cacheable, so it has no `canEdit` (ADR-0003). Lifecycle reaches the UI as
    // one derived bit instead of the raw status enum.
    //
    // const dto = toJobDetailDTO(publishedRow)
    // expect(dto.isAcceptingApplications).toBe(true)
    // expect(toJobDetailDTO(closedRow).isAcceptingApplications).toBe(false)
    // expect(dto).not.toHaveProperty("id")
    // expect(dto).not.toHaveProperty("canEdit")
    expect(true).toBe(true)
  })
})
