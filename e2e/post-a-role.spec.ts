// E2E (Playwright): an employer posts a role; it appears on the public board.
// The vertical slice that proves the whole stack (auth → action → DB → cache →
// public page) works together.
// Docs: https://nextjs.org/docs/app/guides/testing/playwright
import { test, expect } from "@playwright/test"

test("employer posts a role and it shows on the public board", async ({
  page,
}) => {
  // TODO (Milestone 4): sign in as an employer, create + publish a role,
  // then visit /roles and expect the new role to be listed.
  await page.goto("/roles")
  await expect(page).toHaveURL(/\/roles/)
})
