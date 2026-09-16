"use client";

import Link from "next/link";
import { useMemo } from "react";
import { resolveResumeSessionId } from "@/lib/learning-progress";
import useLearningProgress from "./useLearningProgress";

interface SessionSummary {
  id: string;
  sessionNumber: number;
  title: string;
  duration: string;
  tool: string;
  hasLesson: boolean;
  hasSlideHtml: boolean;
}

export default function CourseProgress({
  courseSlug,
  courseColor,
  sessions,
}: {
  courseSlug: string;
  courseColor: string;
  sessions: SessionSummary[];
}) {
  const sessionIds = useMemo(() => sessions.map((session) => session.id), [sessions]);
  const { progress, isReady, storageError } = useLearningProgress(courseSlug, sessionIds);
  const completedIds = new Set(progress.completedSessionIds);
  const completedCount = completedIds.size;
  const percentage = sessions.length === 0 ? 0 : Math.round((completedCount / sessions.length) * 100);
  const resumeSessionId = resolveResumeSessionId(progress, sessionIds);
  const allCompleted = sessions.length > 0 && completedCount === sessions.length;

  return (
    <section aria-busy={!isReady}>
      <div className="mb-12 rounded-2xl border border-black/5 bg-white/80 p-5 shadow-sm backdrop-blur animate-slide-up delay-100">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-end justify-between gap-4">
              <div>
                <div className="text-[9px] font-black uppercase tracking-[0.22em] text-[#888]">Learning progress</div>
                <div className="mt-1 text-sm font-bold text-[#333]" aria-live="polite">
                  {isReady ? `${completedCount} / ${sessions.length}회 완료` : "진도를 불러오는 중"}
                </div>
              </div>
              {isReady && <span className="font-mono text-xs font-bold text-[#666]">{percentage}%</span>}
            </div>
            <div
              className="h-2 overflow-hidden rounded-full bg-black/5"
              role="progressbar"
              aria-label="강의 진도"
              aria-valuemin={0}
              aria-valuemax={sessions.length}
              aria-valuenow={isReady ? completedCount : 0}
            >
              <div
                className="h-full rounded-full transition-[width] duration-500"
                style={{ width: isReady ? `${percentage}%` : "0%", background: courseColor }}
              />
            </div>
          </div>

          {isReady && resumeSessionId && (
            <Link
              href={`/courses/${courseSlug}/${resumeSessionId}`}
              className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-xl bg-[#111] px-5 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-white transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {allCompleted ? "복습하기" : progress.lastVisitedSessionId ? "이어보기" : "학습 시작"}
              <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
        {storageError && (
          <p className="mt-3 text-xs font-medium text-red-700" role="status">
            진도를 이 브라우저에 저장하지 못했습니다.
          </p>
        )}
      </div>

      <div className="flex items-center gap-6 mb-10 animate-slide-up delay-100">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono font-bold text-[#ca8a04] tracking-[0.2em] mb-1">List</span>
          <h2 className="text-xl font-bold tracking-tight text-[#111] uppercase italic" style={{ fontFamily: "var(--font-display)" }}>
            Sessions ({sessions.length})
          </h2>
        </div>
        <div className="flex-grow h-[1px] bg-gradient-to-r from-black/5 to-transparent" />
      </div>

      <div className="grid gap-3">
        {sessions.map((session, index) => {
          const completed = isReady && completedIds.has(session.id);

          return (
            <Link
              key={session.id}
              href={`/courses/${courseSlug}/${session.id}`}
              className="group animate-slide-up"
              style={{ animationDelay: `${(index + 2) * 0.08}s`, opacity: 0 }}
            >
              <div className="relative flex items-center gap-4 sm:gap-6 p-5 rounded-xl border border-black/5 bg-white hover:border-black/10 hover:shadow-md transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-[#EAB308]/[0.05] to-transparent" />
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 transition-transform duration-500 group-hover:scale-110"
                  style={{
                    background: completed ? `${courseColor}18` : "rgba(0, 0, 0, 0.03)",
                    color: completed ? courseColor : "#ca8a04",
                    fontFamily: "var(--font-mono)",
                    border: `1px solid ${completed ? `${courseColor}40` : "rgba(234, 179, 8, 0.15)"}`,
                  }}
                  aria-hidden="true"
                >
                  {completed ? "✓" : String(session.sessionNumber).padStart(2, "0")}
                </div>

                <div className="flex-1 min-w-0 z-10">
                  <div className="font-bold text-base text-[#333] group-hover:text-[#111] transition-colors duration-300">
                    {session.title}
                  </div>
                  <div className="text-[11px] font-bold mt-1.5 flex items-center gap-3 text-[#777] uppercase tracking-wider">
                    <span>{session.duration}</span>
                    {session.tool && <span>· {session.tool}</span>}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 z-10">
                  {completed && (
                    <span className="hidden sm:inline text-[9px] font-black uppercase tracking-wider" style={{ color: courseColor }}>
                      완료
                    </span>
                  )}
                  {session.hasSlideHtml && (
                    <span className="text-[9px] font-black px-2 py-1 rounded bg-[#EAB308]/10 text-[#ca8a04] border border-[#EAB308]/20 uppercase tracking-tighter">
                      Slide
                    </span>
                  )}
                  <span className="text-[#ca8a04] transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
