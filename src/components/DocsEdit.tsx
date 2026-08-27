// @/app/e/[slug]/DocsEdit.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DocsRender from "@/components/DocsRender";

import "@/css/docs-edit.css";

type Props = { slug: string; content: string };
export default function DocsEdit({ slug, content }: Props) {
  const router = useRouter();

  const [text, setText] = useState(content);
  const [editor, setEditor] = useState("plain");
  const [render, setRender] = useState(false);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);

    try {
      const res = await fetch("/api/docs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, content: text }),
      });

      if (!res.ok) { throw new Error("Failed to save docs"); }
      router.push(`/w/${encodeURIComponent(slug)}`);
    } catch (error) {
      console.error(error);
      setSaving(false);
    }
  }

  return (
    <div className="docs-edit">
      <section className="docs-edit__tools">
        <select
          className="docs-edit__select"
          value={editor}
          onChange={e => setEditor(e.target.value)}
          disabled={render}
        >
          <option value="plain">Plain Text</option>
        </select>

        <button
          className="docs-edit__render"
          type="button"
          onClick={() => setRender(!render)}
        >
          <svg viewBox="0 0 512 512" aria-hidden="true">
            <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
          </svg>
          <span>{render ? "편집하기" : "미리보기"}</span>
        </button>
      </section>

      <section className="docs-edit__main">
        {render ? (
          <div className="docs-edit__preview">
            <DocsRender content={text} />
          </div>
        ) : (
          <textarea
            className="docs-edit__editor"
            value={text}
            onChange={e => setText(e.target.value)}
          />
        )}
      </section>

      <section className="docs-edit__submit">
        <p className="docs-edit__notice">
          기여된 내용을 본 위키에 배포하고, 기여한 문서에 대한 하이퍼링크 또는 URL을 이용하여 최초 저작자를 표시하는 것으로 충분합니다. 이 동의는 철회할 수 없습니다.
        </p>

        <button
          className="docs-edit__submit-btn"
          type="button"
          onClick={save}
          disabled={saving}
        >
          수정
        </button>
      </section>
    </div>
  );
}
