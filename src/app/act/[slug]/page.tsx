// @/app/act/[slug]/page.tsx

import { notFound } from "next/navigation";
import { getDocsBySlug } from "@/feat/docs/docs.service";
import { getActsByDocs } from "@/feat/act/act.service";
import "@/css/docs-act.css";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function DocsActPage({ params }: Props) {
  const { slug } = await params;
  const docs = await getDocsBySlug(slug);
  if (!docs) { notFound(); }

  const acts = await getActsByDocs(docs.id);

  return (
    <main className="docs-act">
      <header className="docs-act__head">
        <div>
          <h1 className="docs-act__title">{docs.slug}</h1>
          <p className="docs-act__description">문서 변경 기록</p>
        </div>
        <span className="docs-act__count">{acts.length} changes</span>
      </header>

      {acts.length === 0 ? (
        <div className="docs-act__empty">변경 기록이 없습니다.</div>
      ) : (
        <div className="docs-act__list">
          {acts.map((act) => (
            <article className="docs-act__item" key={act.id}>
              <div className="docs-act__item-main">
                <span className="docs-act__version">v{act.version}</span>
                <span className="docs-act__user">{act.user_id}</span>
                <time className="docs-act__date" dateTime={act.created_at}>
                  {new Date(act.created_at).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}
                </time>
              </div>

              <div className="docs-act__diff">
                <span className="docs-act__addition">+{act.additions}</span>
                <span className="docs-act__deletion">-{act.deletions}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
