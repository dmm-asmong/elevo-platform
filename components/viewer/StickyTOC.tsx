"use client";

import { useEffect, useState } from "react";
import type { TOCHeading } from "@/lib/toc";

interface Props {
  headings: TOCHeading[];
}

export default function StickyTOC({ headings }: Props) {
  const h2s = headings.filter((h) => h.level === 2);
  const [activeId, setActiveId] = useState<string>(h2s[0]?.id ?? "");

  useEffect(() => {
    if (h2s.length === 0) return;

    const OFFSET = 120; // 뷰포트 상단에서 이 픽셀 이하로 들어오면 active

    const getActive = () => {
      let current = h2s[0].id;
      for (const h of h2s) {
        const el = document.getElementById(h.id);
        if (el && el.getBoundingClientRect().top <= OFFSET) {
          current = h.id;
        }
      }
      return current;
    };

    const onScroll = () => setActiveId(getActive());

    // 마운트 직후 초기 상태 설정
    setActiveId(getActive());

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headings]);

  if (h2s.length < 2) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  };

  return (
    <aside className="toc-sidebar">
      <p className="toc-sidebar-label">목차</p>
      <ol className="toc-sidebar-list">
        {h2s.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`toc-link${activeId === h.id ? " active" : ""}`}
              onClick={(e) => handleClick(e, h.id)}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </aside>
  );
}
