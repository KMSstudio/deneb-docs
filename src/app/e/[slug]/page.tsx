// @/app/e/[slug]/page.tsx

import DocsEdit from "./DocsEdit";
import { getDocsBySlug } from "@/feat/docs/docs.service";

type PageProps = { params: Promise<{ slug: string }> };
export default async function EditPage({ params }: PageProps) {
  const { slug } = await params;
  const docs = await getDocsBySlug(slug);

  return <DocsEdit slug={slug} content={docs?.content || ""} />;
}
