import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

const source = readFileSync(new URL("../lib/learning-progress.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
});
const {
  getCourseProgress,
  parseLearningProgress,
  readLearningProgress,
  resolveResumeSessionId,
  setSessionCompleted,
} = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);

const sessionIds = ["session-01", "session-02", "session-03"];

test("invalid and stale stored progress is safely ignored", () => {
  assert.deepEqual(parseLearningProgress("not json"), {});

  const stored = parseLearningProgress(JSON.stringify({
    course: {
      completedSessionIds: ["session-01", "removed-session", "session-01", 3],
      lastVisitedSessionId: "removed-session",
    },
  }));

  assert.deepEqual(getCourseProgress(stored, "course", sessionIds), {
    completedSessionIds: ["session-01"],
    lastVisitedSessionId: null,
  });
});

test("blocked storage is reported instead of looking like empty progress", () => {
  const result = readLearningProgress({
    getItem() {
      throw new Error("blocked");
    },
  });

  assert.deepEqual(result, { progress: {}, ok: false });
});

test("completion can be toggled without duplicating session ids", () => {
  const initial = { completedSessionIds: [], lastVisitedSessionId: "session-01" };
  const completed = setSessionCompleted(initial, "session-01", true);

  assert.deepEqual(setSessionCompleted(completed, "session-01", true).completedSessionIds, ["session-01"]);
  assert.deepEqual(setSessionCompleted(completed, "session-01", false).completedSessionIds, []);
});

test("resume follows the last position, then the next incomplete session", () => {
  assert.equal(resolveResumeSessionId({ completedSessionIds: [], lastVisitedSessionId: "session-02" }, sessionIds), "session-02");
  assert.equal(resolveResumeSessionId({ completedSessionIds: ["session-02"], lastVisitedSessionId: "session-02" }, sessionIds), "session-03");
  assert.equal(resolveResumeSessionId({ completedSessionIds: ["session-02", "session-03"], lastVisitedSessionId: "session-03" }, sessionIds), "session-01");
  assert.equal(resolveResumeSessionId({ completedSessionIds: sessionIds, lastVisitedSessionId: "session-03" }, sessionIds), "session-03");
});
