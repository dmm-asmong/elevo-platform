"use client";

import { useCallback, useEffect, useState } from "react";
import {
  LEARNING_PROGRESS_KEY,
  getCourseProgress,
  readLearningProgress,
  setCourseProgress,
  setSessionCompleted,
  writeLearningProgress,
  type CourseProgress,
} from "@/lib/learning-progress";

const EMPTY_PROGRESS: CourseProgress = {
  completedSessionIds: [],
  lastVisitedSessionId: null,
};

export default function useLearningProgress(
  courseSlug: string,
  sessionIds: string[],
  currentSessionId?: string,
) {
  const [progress, setProgress] = useState<CourseProgress>(EMPTY_PROGRESS);
  const [isReady, setIsReady] = useState(false);
  const [storageError, setStorageError] = useState(false);

  const loadProgress = useCallback((recordVisit: boolean) => {
    const readResult = readLearningProgress(window.localStorage);
    const allProgress = readResult.progress;
    let courseProgress = getCourseProgress(allProgress, courseSlug, sessionIds);
    let saved = true;

    if (recordVisit && currentSessionId && sessionIds.includes(currentSessionId)) {
      courseProgress = { ...courseProgress, lastVisitedSessionId: currentSessionId };
      saved = writeLearningProgress(
        window.localStorage,
        setCourseProgress(allProgress, courseSlug, courseProgress),
      );
    }

    setStorageError(!readResult.ok || !saved);
    setProgress(courseProgress);
    setIsReady(true);
  }, [courseSlug, currentSessionId, sessionIds]);

  useEffect(() => {
    loadProgress(true);

    const handleStorage = (event: StorageEvent) => {
      if (event.key === null || event.key === LEARNING_PROGRESS_KEY) loadProgress(false);
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [loadProgress]);

  const updateCompleted = useCallback((sessionId: string, completed: boolean) => {
    const readResult = readLearningProgress(window.localStorage);
    const allProgress = readResult.progress;
    const current = getCourseProgress(allProgress, courseSlug, sessionIds);
    const next = setSessionCompleted(current, sessionId, completed);
    const saved = writeLearningProgress(
      window.localStorage,
      setCourseProgress(allProgress, courseSlug, next),
    );

    setProgress(next);
    setStorageError(!readResult.ok || !saved);
  }, [courseSlug, sessionIds]);

  return { progress, isReady, storageError, updateCompleted };
}
