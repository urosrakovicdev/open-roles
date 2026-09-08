// Playwright config — end-to-end tests that drive a real browser against a
// running build. Use these for the flows that span the whole stack: sign up →
// post a role → see it on the public board → apply.
// Docs: https://nextjs.org/docs/app/guides/testing/playwright
import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  // Starts the app before the tests run.
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
})
