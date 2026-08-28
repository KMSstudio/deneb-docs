// @/app/act/[slug]/page.tsx

import { notFound } from "next/navigation";

import DocsHeader from "@/components/DocsHeader";
import DocsActivity from "./DocsActivity";
import { getDocsBySlug } from "@/feat/docs/docs.service";
import { getActsByDocs } from "@/feat/act/act.service";

import "@/css/docs.css";

type PageProps = { params: Promise<{ slug: string }> };
export default async function ActPage({ params }: PageProps) {
  const { slug } = await params;
  const docs = await getDocsBySlug(slug);
  if (!docs) { notFound(); }

  const acts = await getActsByDocs(docs.id);

  return (
    <article className="docs">
      <DocsHeader slug={slug} updatedAt={docs.updated_at} page={"act"} />
      <DocsActivity acts={acts} />
    </article>
  );
}
