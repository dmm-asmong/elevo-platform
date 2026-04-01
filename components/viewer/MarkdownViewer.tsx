"use client";

import { useEffect } from "react";

interface Props {
  content: string; // 서버에서 processMarkdown()으로 변환된 HTML
}

export default function MarkdownViewer({ content }: Props) {
  useEffect(() => {
    const handleCopy = async (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("copy-btn")) {
        const pre = target.nextElementSibling as HTMLPreElement;
        const codeElement = pre?.querySelector("code");
        const code = codeElement?.textContent || "";

        try {
          await navigator.clipboard.writeText(code.trim());
          const originalText = target.innerText;
          target.innerText = "COPIED!";
          target.classList.add("copied");

          setTimeout(() => {
            target.innerText = originalText;
            target.classList.remove("copied");
          }, 2000);
        } catch (err) {
          console.error("Failed to copy!", err);
        }
      }
    };

    document.addEventListener("click", handleCopy);
    return () => document.removeEventListener("click", handleCopy);
  }, []);

  return (
    <div
      className="prose-light"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
