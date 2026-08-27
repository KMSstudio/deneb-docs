// @/app/w/[slug]/page.tsx

import { notFound } from "next/navigation";
import { getDocsBySlug } from "@/feat/docs/docs.service";

type PageProps = { params: Promise<{slug: string;}>; };
export default async function DocumentPage({ params }: PageProps) {
  const { slug } = await params;
  const document = await getDocsBySlug(slug);
  if (!document) { notFound(); }
  return (
    <pre>
      {document.content}
    </pre>
  );
}
