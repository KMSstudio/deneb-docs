// @/components/DocsHeader.tsx

import Link from "next/link";

function WTools({ slug }: { slug: string }) {
  const path = encodeURIComponent(slug);
  return (
    <>
      <div className="docs-head__group">
        <button className="docs-head__action docs-head__action--icon" type="button" title="즐겨찾기">
          <svg viewBox="0 0 576 512" aria-hidden="true">
            <path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0z" />
          </svg>
        </button>

        <Link className="docs-head__action" href={`/edit/${path}`}>
          <svg viewBox="0 0 512 512" aria-hidden="true">
            <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
          </svg>
          <span>편집</span>
        </Link>

        <Link className="docs-head__action" href={`/act/${path}`}>
          <svg viewBox="0 0 448 512" aria-hidden="true">
            <path d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96z" />
          </svg>
          <span>역사</span>
        </Link>
      </div>

      <button className="docs-head__more" type="button" title="더 보기">
        <svg viewBox="0 0 128 512" aria-hidden="true">
          <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
        </svg>
      </button>
    </>
  );
}

function EditTools({ slug }: { slug: string }) {
  const path = encodeURIComponent(slug);
  return (
    <div className="docs-head__group">
      <Link className="docs-head__action" href={`/w/${path}`}>문서</Link>
      <Link className="docs-head__action" href={`/act/${path}`}>역사</Link>
    </div>
  );
}

function ActTools({ slug }: { slug: string }) {
  const path = encodeURIComponent(slug);
  return (
    <div className="docs-head__group">
      <Link className="docs-head__action" href={`/w/${path}`}>문서</Link>
      <Link className="docs-head__action" href={`/edit/${path}`}>편집</Link>
    </div>
  );
}

type Props = { slug: string; updatedAt: string; page: "w" | "edit" | "act"; };
export default function DocsHeader({ slug, updatedAt, page }: Props) {
  return (
    <header className="docs-head">
      <div className="docs-head__info">
        <h1 className="docs-head__title">{decodeURIComponent(slug)}</h1>
        <div className="docs-head__updated">
          최근 수정 시각: <time>{new Date(updatedAt).toLocaleString("ko-KR")}</time>
        </div>
      </div>

      <div className="docs-head__tools">
        {page === "w" && <WTools slug={slug} />}
        {page === "edit" && <EditTools slug={slug} />}
        {page === "act" && <ActTools slug={slug} />}
      </div>
    </header>
  );
}
