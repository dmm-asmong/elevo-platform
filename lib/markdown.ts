import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";
import { slugifyHeading } from "./toc";

/**
 * 서버 사이드에서 마크다운을 HTML로 변환하는 유틸리티
 * - GFM 테이블, 취소선 등 지원 (remark-gfm)
 * - h2/h3 헤딩에 id 속성 주입 (StickyTOC 스크롤 앵커용)
 * - 프롬프트 블록 / 코드 블록 COPY 버튼 주입
 * - ==text== → hl-gold, !!text!! → hl-blue 하이라이트
 */
export async function processMarkdown(raw: string): Promise<string> {
  const processed = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(raw);

  let finalHtml = processed.toString();

  finalHtml = finalHtml
    // h2/h3에 id 주입 (이모지·HTML 태그 제거 후 slug)
    .replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_, level, inner) => {
      const plainText = inner.replace(/<[^>]+>/g, "");
      const id = slugifyHeading(plainText);
      return `<h${level} id="${id}">${inner}</h${level}>`;
    })
    // 프롬프트 블록
    .replace(
      /<pre><code class="language-prompt">([\s\S]*?)<\/code><\/pre>/g,
      (_, code) =>
        `<div class="prompt-block"><span class="prompt-label">프롬프트 예시</span><button class="copy-btn">COPY</button><pre><code>${code.trim()}</code></pre></div>`
    )
    // 일반 코드 블록
    .replace(
      /<pre><code(?: class="language-(\w+)")?>([\s\S]*?)<\/code><\/pre>/g,
      (_, lang, code) =>
        `<div class="code-wrapper"><button class="copy-btn" data-lang="${lang || ""}">COPY</button><pre><code>${code.trim()}</code></pre></div>`
    )
    // 하이라이트
    .replace(/==(.+?)==/g, '<mark class="hl-gold">$1</mark>')
    .replace(/!!(.+?)!!/g, '<mark class="hl-blue">$1</mark>');

  return finalHtml;
}
