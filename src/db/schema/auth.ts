// Auth.js required tables (users, accounts, sessions, verificationTokens) plus
// our app-specific columns on `users` (role). The Drizzle adapter reads/writes
// these. Copy the canonical definitions from the Auth.js Drizzle adapter docs.
//
// Docs: https://authjs.dev/getting-started/adapters/drizzle  ← copy schema from here
//       https://orm.drizzle.team/docs/sql-schema-declaration

import { pgTable, text, timestamp, pgEnum } from "drizzle-orm/pg-core"

// A candidate applies to roles; an employer posts them; an admin moderates.
export const userRole = pgEnum("user_role", ["candidate", "employer", "admin"])

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  passwordHash: text("password_hash"), // for the Credentials provider (bcrypt)
  image: text("image"),
  role: userRole("role").notNull().default("candidate"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
})

// TODO (Milestone 3): add `accounts`, `sessions`, `verificationTokens` tables
// exactly as the Auth.js Drizzle adapter docs specify (link above).
