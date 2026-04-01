"use client";

import { extractTOC } from "@/lib/toc";
import MarkdownViewer from "./MarkdownViewer";
import StickyTOC from "./StickyTOC";

interface Props {
  content: string; // 마크다운 원본 텍스트
}

/**
 * 모든 콘텐츠(Course, Skill 등)에서 공통으로 사용할 수 있는 통합 문서 뷰어 컴포넌트입니다.
 * 하얀 프레임의 메인 카드 스타일과 좌측/우측에 스티키 목차를 일관되게 렌더링합니다.
 */
export default function DocViewer({ content }: Props) {
  const tocHeadings = extractTOC(content);

  return (
    <div className="flex gap-8 items-start mb-8 w-full animate-slide-up delay-200">
      {/* 메인 콘텐츠 카드 */}
      <div
        className="flex-1 min-w-0 rounded-[24px] p-8 shadow-sm"
        style={{ background: "#ffffff", border: "1px solid #eaeaea" }}
      >
        <MarkdownViewer content={content} />
      </div>

      {/* 스티키 TOC */}
      {tocHeadings.length >= 2 && (
        <StickyTOC headings={tocHeadings} />
      )}
    </div>
  );
}
