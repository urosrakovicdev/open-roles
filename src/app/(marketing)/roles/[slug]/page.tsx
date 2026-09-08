// Public role detail ("/roles/[slug]"). The shareable, SEO-critical page.
//
// LEARNING NOTE (Lesson 02/03): published roles change rarely, so this is a
// prime `use cache` + on-demand revalidation target — cache the page, tag it
// `job-${slug}`, and have the employer's publish/edit action call updateTag to
// refresh it. generateStaticParams can prebuild popular roles. generateMetadata
// gives each role real <title>/OpenGraph tags.
// Docs: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
//       https://nextjs.org/docs/app/api-reference/functions/generate-metadata

import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getPublishedJobBySlug } from "@/data/jobs"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  // TODO: const job = await getPublishedJobBySlug(slug); return { title: job.title }
  return { title: slug }
}

export default async function RoleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const job = await getPublishedJobBySlug(slug)
  if (!job) notFound()
  // TODO: render role detail + an "Apply" button (Client Component → Server Action).
  return <main>{/* role: {slug} */}</main>
}
