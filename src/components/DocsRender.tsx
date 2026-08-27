// @/components/markdown.tsx

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import type { Root, PhrasingContent } from "mdast";
import { visit } from "unist-util-visit";
import "katex/dist/katex.min.css";

function remarkWikiLink() {
  return (tree: Root) => {
    visit(tree, "text", (node, index, parent) => {
      if (!parent || index === undefined) { return; }
      if (parent.type === "link" || parent.type === "linkReference") { return; }

      const regex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
      const children: PhrasingContent[] = [];
      let cursor = 0;
      let match;

      while ((match = regex.exec(node.value)) !== null) {
        if (match.index > cursor) {
          children.push({
            type: "text",
            value: node.value.slice(cursor, match.index),
          });
        }

        const slug = match[1].trim();
        const display = match[2]?.trim() || slug;

        children.push({
          type: "link",
          url: `/w/${encodeURIComponent(slug)}`,
          children: [{ type: "text", value: display }],
        });

        cursor = regex.lastIndex;
      }

      if (!children.length) { return; }

      if (cursor < node.value.length) {
        children.push({
          type: "text",
          value: node.value.slice(cursor),
        });
      }

      parent.children.splice(index, 1, ...children);
      return index + children.length;
    });
  };
}

export default function Markdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath, remarkWikiLink]}
      rehypePlugins={[rehypeKatex]}
      skipHtml
      components={{
        a({ href, children, ...props }) {
          if (href?.startsWith("/w/")) { return <Link href={href}>{children}</Link>; }
          return <a href={href} {...props}>{children}</a>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
