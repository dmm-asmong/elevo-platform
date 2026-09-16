"use client";

import { useState } from "react";
import MarkdownViewer from "@/components/viewer/MarkdownViewer";

interface Tab {
  id: string;
  label: string;
  content: string | null;
  badge?: string;
}

interface Props {
  tabs: Tab[];
}

export default function ContentTabs({ tabs }: Props) {
  const available = tabs.filter((t) => t.content !== null);
  const [activeTab, setActiveTab] = useState(available[0]?.id ?? "");

  if (available.length === 0) {
    return (
      <div className="text-center py-16 text-sm" style={{ color: "#888" }}>
        콘텐츠 준비 중입니다.
      </div>
    );
  }

  const activeContent = available.find((t) => t.id === activeTab)?.content ?? "";
  const isWorksheet = activeTab === "worksheet";

  return (
    <div>
      {/* 탭 헤더 */}
      <div className="print-hide mb-7 flex flex-col gap-2 sm:flex-row">
        <div className="flex flex-1 gap-0.5 p-1 rounded-xl" style={{ background: "#f4f4f5" }}>
          {available.map((tab) => (
            <button
              type="button"
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                color: activeTab === tab.id ? "#111" : "#888",
                background: activeTab === tab.id ? "#fff" : "transparent",
                boxShadow: activeTab === tab.id ? "0 1px 3px rgba(0,0,0,0.05)" : "none",
                flex: "1",
                justifyContent: "center",
              }}
            >
              {tab.label}
              {tab.badge && (
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded-full"
                  style={{
                    background: "rgba(0,0,0,0.05)",
                    color: activeTab === tab.id ? "#111" : "#888",
                  }}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {isWorksheet && (
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#111] px-4 py-2.5 text-xs font-bold text-white transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 9V3h12v6M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v7H6v-7z" />
            </svg>
            인쇄하기
          </button>
        )}
      </div>

      {/* 콘텐츠 */}
      <div className="print-content">
        <MarkdownViewer content={activeContent} />
      </div>
    </div>
  );
}
