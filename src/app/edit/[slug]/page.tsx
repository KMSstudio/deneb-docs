// @/app/e/[slug]/page.tsx

import DocsEdit from "@/components/DocsEdit";

import DocsHeader from "@/components/DocsHeader";
import { getDocsBySlug } from "@/feat/docs/docs.service";

import "@/css/docs.css";

type PageProps = { params: Promise<{ slug: string }> };

export default async function EditPage({ params }: PageProps) {
  const { slug } = await params;
  const docs = await getDocsBySlug(slug);
  const updatedAt: string = docs?.updated_at || new Date().toISOString()

  return (
    <article className="docs">
      <DocsHeader slug={slug} updatedAt={updatedAt} page={"edit"} />
      <DocsEdit slug={slug} content={docs?.content || ""} />
    </article>
  );
}
