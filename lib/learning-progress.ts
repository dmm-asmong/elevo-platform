export const LEARNING_PROGRESS_KEY = "elevo:learning-progress:v1";

export interface CourseProgress {
  completedSessionIds: string[];
  lastVisitedSessionId: string | null;
}

export type LearningProgress = Record<string, CourseProgress>;

const EMPTY_COURSE_PROGRESS: CourseProgress = {
  completedSessionIds: [],
  lastVisitedSessionId: null,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function parseLearningProgress(raw: string | null): LearningProgress {
  if (!raw) return {};

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) return {};

    const progress: LearningProgress = {};
    for (const [courseSlug, value] of Object.entries(parsed)) {
      if (["__proto__", "constructor", "prototype"].includes(courseSlug) || !isRecord(value)) continue;

      const completedSessionIds = Array.isArray(value.completedSessionIds)
        ? [...new Set(value.completedSessionIds.filter((id): id is string => typeof id === "string"))]
        : [];
      const lastVisitedSessionId = typeof value.lastVisitedSessionId === "string"
        ? value.lastVisitedSessionId
        : null;

      progress[courseSlug] = { completedSessionIds, lastVisitedSessionId };
    }

    return progress;
  } catch {
    return {};
  }
}

export function readLearningProgress(storage: Pick<Storage, "getItem">): {
  progress: LearningProgress;
  ok: boolean;
} {
  try {
    return { progress: parseLearningProgress(storage.getItem(LEARNING_PROGRESS_KEY)), ok: true };
  } catch {
    return { progress: {}, ok: false };
  }
}

export function writeLearningProgress(
  storage: Pick<Storage, "setItem">,
  progress: LearningProgress,
): boolean {
  try {
    storage.setItem(LEARNING_PROGRESS_KEY, JSON.stringify(progress));
    return true;
  } catch {
    return false;
  }
}

export function getCourseProgress(
  progress: LearningProgress,
  courseSlug: string,
  sessionIds: string[],
): CourseProgress {
  const stored = progress[courseSlug] ?? EMPTY_COURSE_PROGRESS;
  const validIds = new Set(sessionIds);

  return {
    completedSessionIds: stored.completedSessionIds.filter((id) => validIds.has(id)),
    lastVisitedSessionId: stored.lastVisitedSessionId && validIds.has(stored.lastVisitedSessionId)
      ? stored.lastVisitedSessionId
      : null,
  };
}

export function setCourseProgress(
  progress: LearningProgress,
  courseSlug: string,
  courseProgress: CourseProgress,
): LearningProgress {
  return { ...progress, [courseSlug]: courseProgress };
}

export function setSessionCompleted(
  progress: CourseProgress,
  sessionId: string,
  completed: boolean,
): CourseProgress {
  const completedIds = new Set(progress.completedSessionIds);
  if (completed) completedIds.add(sessionId);
  else completedIds.delete(sessionId);

  return { ...progress, completedSessionIds: [...completedIds] };
}

export function resolveResumeSessionId(
  progress: CourseProgress,
  sessionIds: string[],
): string | null {
  if (sessionIds.length === 0) return null;

  const completedIds = new Set(progress.completedSessionIds);
  const lastVisitedIndex = progress.lastVisitedSessionId
    ? sessionIds.indexOf(progress.lastVisitedSessionId)
    : -1;

  if (lastVisitedIndex >= 0 && !completedIds.has(sessionIds[lastVisitedIndex])) {
    return sessionIds[lastVisitedIndex];
  }

  if (lastVisitedIndex >= 0) {
    const nextIncomplete = sessionIds.slice(lastVisitedIndex + 1).find((id) => !completedIds.has(id));
    if (nextIncomplete) return nextIncomplete;
  }

  return sessionIds.find((id) => !completedIds.has(id))
    ?? progress.lastVisitedSessionId
    ?? sessionIds[0];
}
