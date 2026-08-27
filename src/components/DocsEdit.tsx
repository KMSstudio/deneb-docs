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
          {render ? "편집" : "렌더"}
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
