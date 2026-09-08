// Auth.js v5 (NextAuth) — the single source of auth configuration.
// Exports `handlers` (for the API route), `signIn`/`signOut` (call from Server
// Actions / Components), and `auth()` (read the session anywhere on the server).
//
// LEARNING NOTE: `auth()` here is the library's version of the `verifySession()`
// we built by hand in Lesson 05. The DAL in src/data/dal.ts wraps it so every
// read/mutation goes through one audited entry point.
//
// Docs: https://authjs.dev/getting-started/installation
//       https://authjs.dev/getting-started/adapters/drizzle
//       https://authjs.dev/getting-started/authentication/credentials

import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import Credentials from "next-auth/providers/credentials"
import { db } from "@/db/drizzle"

export const { handlers, signIn, signOut, auth } = NextAuth({
  // The adapter persists users/accounts/sessions to Postgres via Drizzle.
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" }, // stateless session (Lesson 05) — required for Credentials
  pages: { signIn: "/login" },
  providers: [
    // TODO (Milestone 3 — auth): implement credential verification.
    // Look up the user by email, compare the bcrypt hash, return the user or null.
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (_credentials) => {
        // TODO: validate with zod (lib/validations), query the DAL, verify hash.
        return null
      },
    }),
    // TODO (optional): add an OAuth provider, e.g. GitHub.
    // GitHub({ clientId: process.env.AUTH_GITHUB_ID, clientSecret: ... }),
  ],
  callbacks: {
    // TODO: persist `role` onto the token/session so the DAL can authorize by role.
  },
})
