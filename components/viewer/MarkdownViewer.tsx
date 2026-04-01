"use client";

import { useEffect, useState } from "react";
import { slugifyHeading } from "@/lib/toc";

interface Props {
  content: string;
}

export default function MarkdownViewer({ content }: Props) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    setHtml(renderMarkdown(content));
  }, [content]);

  useEffect(() => {
    const handleCopy = async (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("copy-btn")) {
        const pre = target.nextElementSibling as HTMLPreElement;
        const code = pre?.querySelector("code")?.innerText || "";
        
        try {
          await navigator.clipboard.writeText(code);
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
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/* ── 테이블 파서 ── */
function parseTables(md: string): string {
  return md.replace(
    /(\|.+\|\n\|[-| :]+\|\n(?:\|.+\|\n?)+)/g,
    (block) => {
      const rows = block.trim().split("\n");
      const headerCells = rows[0]
        .split("|").slice(1, -1)
        .map((c) => `<th>${c.trim()}</th>`)
        .join("");
      const bodyRows = rows.slice(2).map((row) => {
        const cells = row
          .split("|").slice(1, -1)
          .map((c) => `<td>${c.trim()}</td>`)
          .join("");
        return `<tr>${cells}</tr>`;
      }).join("");
      return `<table><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table>\n`;
    }
  );
}

/* ── 메인 렌더러 ── */
function renderMarkdown(md: string): string {
  let html = parseTables(md);

  html = html
    // 프롬프트 블록 (일반 코드 블록보다 먼저 처리)
    .replace(/```prompt\n([\s\S]*?)```/g, (_, code) =>
      `<div class="prompt-block"><span class="prompt-label">프롬프트 예시</span><button class="copy-btn">COPY</button><pre><code>${code.trim()}</code></pre></div>`
    )
    // 일반 코드 블록
    .replace(/```[\w]*\n([\s\S]*?)```/g, (_, code) => 
      `<div class="code-wrapper"><button class="copy-btn">COPY</button><pre><code>${code.trim()}</code></pre></div>`
    )
    // 인라인 코드
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    // ==highlight== → 골드
    .replace(/==(.+?)==/g, '<mark class="hl-gold">$1</mark>')
    // !!highlight!! → 블루
    .replace(/!!(.+?)!!/g, '<mark class="hl-blue">$1</mark>')
    // 헤딩 (앵커 id)
    .replace(/^#### (.+)$/gm, (_, t) => `<h4 id="${slugifyHeading(t)}">${t}</h4>`)
    .replace(/^### (.+)$/gm,  (_, t) => `<h3 id="${slugifyHeading(t)}">${t}</h3>`)
    .replace(/^## (.+)$/gm,   (_, t) => `<h2 id="${slugifyHeading(t)}">${t}</h2>`)
    .replace(/^# (.+)$/gm,    (_, t) => `<h1 id="${slugifyHeading(t)}">${t}</h1>`)
    // 굵게 + 기울임
    .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
    // 굵게
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // 기울임
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // 수평선
    .replace(/^---$/gm, "<hr>")
    // 순서 있는 목록
    .replace(/^\d+\. (.+)$/gm, "<li class='ordered'>$1</li>")
    // 순서 없는 목록
    .replace(/^[-*] (.+)$/gm, "<li>$1</li>")
    // blockquote
    .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>");

  // li 태그 묶기
  html = html.replace(/(<li(?:\s[^>]*)?>[\s\S]*?<\/li>\n?)+/g, (match) => {
    if (match.includes("class='ordered'")) {
      return `<ol>${match.replace(/ class='ordered'/g, "")}</ol>`;
    }
    return `<ul>${match}</ul>`;
  });

  // 단락 처리
  const lines = html.split("\n");
  const result: string[] = [];
  let inPre = false;
  let inPrompt = false;

  for (const line of lines) {
    if (line.includes('<div class="prompt-block">')) inPrompt = true;
    if (line.includes("</div>") && inPrompt) { inPrompt = false; result.push(line); continue; }
    if (line.startsWith("<pre>")) inPre = true;
    if (line.includes("</pre>")) inPre = false;

    if (inPre || inPrompt || line.trim() === "") {
      result.push(line);
    } else if (
      /^<(h[1-6]|ul|ol|li|pre|hr|blockquote|table|thead|tbody|tr|th|td|div)/.test(line) ||
      /^<\/(ul|ol|table|thead|tbody|div)>/.test(line)
    ) {
      result.push(line);
    } else {
      result.push(`<p>${line}</p>`);
    }
  }

  return result.join("\n");
}
