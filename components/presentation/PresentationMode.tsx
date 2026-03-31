"use client";

import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  slideUrl: string;
  sessionTitle: string;
  backUrl: string;
}

export default function PresentationMode({ slideUrl, sessionTitle, backUrl }: Props) {
  const router = useRouter();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !document.fullscreenElement) {
        router.push(backUrl);
      }
      if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [router, backUrl, toggleFullscreen]);

  // 마우스 움직임 시 컨트롤 표시
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timer);
      timer = setTimeout(() => setShowControls(false), 3000);
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50"
      style={{ background: "#0a1628" }}
    >
      {/* iframe: 기존 HTML 슬라이드 */}
      <iframe
        src={slideUrl}
        className="w-full h-full border-0"
        title={sessionTitle}
        allow="fullscreen"
      />

      {/* 오버레이 컨트롤 (마우스 움직일 때만 표시) */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3 transition-opacity duration-300"
        style={{
          background: "linear-gradient(to bottom, rgba(10,22,40,0.8), transparent)",
          opacity: showControls ? 1 : 0,
          pointerEvents: showControls ? "auto" : "none",
        }}
      >
        <span className="text-sm font-medium" style={{ color: "#a8c4f0" }}>
          {sessionTitle}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors"
            style={{ background: "rgba(58,123,213,0.3)", color: "#a8c4f0" }}
            title="전체화면 (F)"
          >
            {isFullscreen ? (
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 9L4 4m0 0h5m-5 0v5M15 9l5-5m0 0h-5m5 0v5M9 15l-5 5m0 0h5m-5 0v-5M15 15l5 5m0 0h-5m5 0v-5" />
              </svg>
            ) : (
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            )}
            <span>{isFullscreen ? "전체화면 종료" : "전체화면"}</span>
          </button>

          <button
            onClick={() => router.push(backUrl)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors"
            style={{ background: "rgba(255,255,255,0.1)", color: "#a8c4f0" }}
            title="뷰어로 돌아가기 (ESC)"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>닫기</span>
          </button>
        </div>
      </div>

      {/* 하단 힌트 */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs transition-opacity duration-300"
        style={{ color: "#4a6fa8", opacity: showControls ? 1 : 0 }}
      >
        F: 전체화면 · ESC: 뷰어로
      </div>
    </div>
  );
}
