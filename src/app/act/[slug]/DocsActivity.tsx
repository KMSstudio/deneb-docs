// @/app/act/[slug]/DocsActivity.tsx

import type { Action } from "@/types/act.type";
import "@/css/docs-act.css";

function ActItem({ act }: { act: Action }) {
  return (
    <div className="docs-act__item">
      <div className="docs-act__info">
        <span className="docs-act__version">v{act.version}</span>
        <span className="docs-act__user">{act.user_id}</span>
        <time className="docs-act__date" dateTime={act.created_at}>
          {new Date(act.created_at).toLocaleString("ko-KR")}
        </time>
      </div>

      <div className="docs-act__diff">
        <span className="docs-act__addition">+{act.additions}</span>
        <span className="docs-act__deletion">-{act.deletions}</span>
      </div>
    </div>
  );
}

export default function DocsActivity({ acts }: { acts: Action[] }) {
  return (
    <section className="docs-act">
      <div className="docs-act__head">
        <h2 className="docs-act__title">문서 역사</h2>
        <span className="docs-act__count">{acts.length}개 기록</span>
      </div>

      {acts.length === 0 ? (
        <div className="docs-act__empty">변경 기록이 없습니다.</div>
      ) : (
        <div className="docs-act__list">
          {acts.map((act) => <ActItem act={act} key={act.id} />)}
        </div>
      )}
    </section>
  );
}
