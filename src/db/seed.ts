// Dev seed — populate the database with sample companies, roles, and a couple of
// users so the public board has something to show. Run with `npm run db:seed`.
//
// LEARNING NOTE: this is a plain Node script (run via tsx), NOT a Next.js
// route — it imports the same Drizzle `db` and schema your app uses.
// Docs: https://orm.drizzle.team/docs/seed-overview

import { db } from "@/db/drizzle"
// import { companies, jobs, users } from "@/db/schema"

async function main() {
  console.log("Seeding OpenRoles…")
  // TODO (Milestone 2): insert sample users (an employer + a candidate),
  // a company owned by the employer, and a handful of published jobs.
  // await db.insert(users).values([...])
  console.log("Done.")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
