"use client";

import { useEffect, useState } from "react";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

interface Props {
  content: string;
}

export default function MarkdownViewer({ content }: Props) {
  const [renderedHtml, setRenderedHtml] = useState("");

  useEffect(() => {
    async function processMarkdown() {
      // 1. remark를 사용하여 마크다운을 기본 HTML로 변환 (줄바꿈 및 태그 중첩 문제 해결)
      const processed = await remark()
        .use(remarkGfm)
        .use(html, { sanitize: false })
        .process(content);
      
      let finalHtml = processed.toString();

      // 2. 후처리를 통해 UI 클래스 및 복사 버튼 주입
      finalHtml = finalHtml
        // 프롬프트 블록 특수 처리
        .replace(/<pre><code class="language-prompt">([\s\S]*?)<\/code><\/pre>/g, (_, code) => 
          `<div class="prompt-block"><span class="prompt-label">프롬프트 예시</span><button class="copy-btn">COPY</button><pre><code>${code.trim()}</code></pre></div>`
        )
        // 일반 코드 블록 처리
        .replace(/<pre><code(?: class="language-(\w+)")?>([\s\S]*?)<\/code><\/pre>/g, (_, lang, code) => 
          `<div class="code-wrapper"><button class="copy-btn" data-lang="${lang || ""}">COPY</button><pre><code>${code.trim()}</code></pre></div>`
        )
        // 하이라이트 구문 연동 (remark가 처리 못한 사용자 정의 문법)
        .replace(/==(.+?)==/g, '<mark class="hl-gold">$1</mark>')
        .replace(/!!(.+?)!!/g, '<mark class="hl-blue">$1</mark>');

      setRenderedHtml(finalHtml);
    }
    
    processMarkdown();
  }, [content]);

  useEffect(() => {
    const handleCopy = async (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("copy-btn")) {
        const pre = target.nextElementSibling as HTMLPreElement;
        const codeElement = pre?.querySelector("code");
        // innerText 대신 textContent를 사용하여 HTML 태그가 섞여 있어도 텍스트만 추출
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
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
}
