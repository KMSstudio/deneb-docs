// @/app/e/[slug]/DocsEdit.tsx

"use client";

import { useState } from "react";

type Props = { slug: string; content: string };
export default function DocsEdit({ slug, content }: Props) {
  const [text, setText] = useState(content);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function save() {
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/docs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, content: text }),
      });

      if (!res.ok) { throw new Error("Failed to save docs"); }
      setMessage("Saved");
    } catch (error) {
      console.error(error);
      setMessage("Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h1>{slug}</h1>

      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        rows={30}
        cols={100}
      />

      <div>
        <button onClick={save} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
        {message && <span>{message}</span>}
      </div>
    </div>
  );
}
