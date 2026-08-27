// @/app/w/[slug]/page.tsx

import { notFound } from "next/navigation";

import DocsRender from "@/components/DocsRender";
import DocsHeader from "@/components/DocsHeader";
import { getDocsBySlug } from "@/feat/docs/docs.service";

import "@/css/docs.css";

type PageProps = { params: Promise<{ slug: string }> };
export default async function DocumentPage({ params }: PageProps) {
  const { slug } = await params;
  const docs = await getDocsBySlug(slug);
  if (!docs) { notFound(); }

  return (
    <article className="docs">
      <DocsHeader slug={slug} updatedAt={docs.updated_at} page={"w"} />
      <DocsRender content={docs.content} />
    </article>
  );
}
