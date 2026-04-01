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

  return (
    <div>
      {/* 탭 헤더 */}
      <div className="flex gap-0.5 mb-7 p-1 rounded-xl" style={{ background: "#f4f4f5" }}>
        {available.map((tab) => (
          <button
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
                  background: activeTab === tab.id ? "rgba(0,0,0,0.05)" : "rgba(0,0,0,0.05)",
                  color: activeTab === tab.id ? "#111" : "#888",
                }}
              >
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* 콘텐츠 */}
      <MarkdownViewer content={activeContent} />
    </div>
  );
}
