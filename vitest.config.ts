// Vitest config — unit/integration tests for pure logic: DAL query shaping, DTO
// mappers, zod validations. Keep these fast and DB-free (mock the db module).
// This project does not do UI component testing, so the environment is plain
// Node (no jsdom) and there's no React Testing Library setup.
// Docs: https://nextjs.org/docs/app/guides/testing/vitest
//
// LEARNING NOTE: Server Components and anything that touches the DB end-to-end
// are covered by Playwright (e2e). Vitest here is for the testable units
// underneath them.

import { defineConfig } from "vitest/config"
import { resolve } from "node:path"

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    // Only colocated unit tests under src/. Without this, Vitest's default glob
    // also picks up e2e/*.spec.ts — those are Playwright specs, and collecting
    // them here fails ("Playwright Test needs to be invoked via 'npx playwright
    // test'"). Playwright owns e2e/ via playwright.config.ts; Vitest owns src/.
    // `.ts` only, deliberately: this project does no UI component testing
    // (docs/05-conventions.md).
    include: ["src/**/*.test.ts"],
  },
  resolve: {
    alias: { "@": resolve(__dirname, "./src") },
  },
})
