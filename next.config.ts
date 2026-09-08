// Next.js configuration.
// Docs: https://nextjs.org/docs/app/api-reference/config/next-config-js
//
// LEARNING NOTES (tie back to the lessons):
// - `cacheComponents` turns on the Next.js 16 opt-in caching model (Cache
//   Components / `use cache`). See Lesson 02. Without it, you're on the older
//   implicit model. We want the modern one.
// - In PRODUCTION across multiple instances you'll also set `deploymentId` and a
//   custom `cacheHandler` here, and pin NEXT_SERVER_ACTIONS_ENCRYPTION_KEY in the
//   environment. See Lesson 06 and docs/03-architecture.md. Left out for local dev.

import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Opt in to the Cache Components model (Lesson 02).
  cacheComponents: true,

  // TODO (Milestone 6 — deploy): when self-hosting multiple instances, add:
  //   deploymentId: process.env.DEPLOYMENT_VERSION,
  //   cacheHandler: require.resolve("./cache-handler.js"),
  //   cacheMaxMemorySize: 0,
  // Docs: https://nextjs.org/docs/app/guides/self-hosting
}

export default nextConfig
