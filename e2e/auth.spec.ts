// E2E (Playwright): the auth flow end to end against a real browser + build.
// Docs: https://nextjs.org/docs/app/guides/testing/playwright
import { test, expect } from "@playwright/test"

test.describe("authentication", () => {
  test("a visitor can sign up, then reach the dashboard", async ({ page }) => {
    // TODO (Milestone 3): go to /signup, fill the form, submit, expect /dashboard.
    await page.goto("/")
    await expect(page).toHaveTitle(/OpenRoles/)
  })

  test("the dashboard redirects logged-out visitors to /login", async ({
    page,
  }) => {
    // TODO: assert the proxy.ts optimistic redirect (Lesson 05) sends us to /login.
    await page.goto("/dashboard")
    // await expect(page).toHaveURL(/\/login/)
  })
})
