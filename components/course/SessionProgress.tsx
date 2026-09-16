"use client";

import useLearningProgress from "./useLearningProgress";

export default function SessionProgress({
  courseSlug,
  sessionId,
  sessionIds,
  courseColor,
}: {
  courseSlug: string;
  sessionId: string;
  sessionIds: string[];
  courseColor: string;
}) {
  const { progress, isReady, storageError, updateCompleted } = useLearningProgress(
    courseSlug,
    sessionIds,
    sessionId,
  );
  const completed = progress.completedSessionIds.includes(sessionId);
  const completedCount = progress.completedSessionIds.length;
  const percentage = sessionIds.length === 0 ? 0 : Math.round((completedCount / sessionIds.length) * 100);

  return (
    <div className="mt-6 rounded-2xl border border-black/5 bg-white/80 p-4 shadow-sm backdrop-blur" aria-busy={!isReady}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-wider text-[#777]">
            <span>{isReady ? `${completedCount} / ${sessionIds.length}회 완료` : "진도를 불러오는 중"}</span>
            {isReady && <span className="font-mono">{percentage}%</span>}
          </div>
          <div
            className="h-1.5 overflow-hidden rounded-full bg-black/5"
            role="progressbar"
            aria-label="강의 진도"
            aria-valuemin={0}
            aria-valuemax={sessionIds.length}
            aria-valuenow={isReady ? completedCount : 0}
          >
            <div
              className="h-full rounded-full transition-[width] duration-500"
              style={{ width: isReady ? `${percentage}%` : "0%", background: courseColor }}
            />
          </div>
        </div>

        <button
          type="button"
          disabled={!isReady}
          onClick={() => updateCompleted(sessionId, !completed)}
          className="inline-flex min-w-32 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all disabled:cursor-wait disabled:opacity-50"
          style={{
            background: completed ? `${courseColor}14` : "#111",
            border: completed ? `1px solid ${courseColor}40` : "1px solid #111",
            color: completed ? courseColor : "#fff",
          }}
          aria-pressed={completed}
        >
          <span aria-hidden="true">{completed ? "✓" : "○"}</span>
          {completed ? "완료 취소" : "수강 완료"}
        </button>
      </div>
      {storageError && (
        <p className="mt-3 text-xs font-medium text-red-700" role="status">
          진도를 이 브라우저에 저장하지 못했습니다.
        </p>
      )}
    </div>
  );
}
