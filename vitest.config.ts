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
  },
  resolve: {
    alias: { "@": resolve(__dirname, "./src") },
  },
})
