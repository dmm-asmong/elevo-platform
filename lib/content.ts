import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface SessionMeta {
  sessionNumber: number;
  title: string;
  duration: string;
  tool: string;
  hasLesson: boolean;
  hasSlideOutline: boolean;
  hasSlideHtml: boolean;
  hasWorksheet: boolean;
  status: "published" | "draft" | "coming-soon";
}

export interface CourseMeta {
  title: string;
  description: string;
  targetAudience: string;
  totalSessions: number;
}

export interface SessionContent {
  lesson: string | null;
  slideOutline: string | null;
  worksheet: string | null;
  hasSlideHtml: boolean;
  slideUrl: string | null; // /slides/... 경로 (html 또는 pdf)
}

export function getCourseMeta(courseSlug: string): CourseMeta | null {
  const metaPath = path.join(CONTENT_DIR, courseSlug, "meta.json");
  if (!fs.existsSync(metaPath)) return null;
  return JSON.parse(fs.readFileSync(metaPath, "utf-8"));
}

export function getSessionList(courseSlug: string): (SessionMeta & { id: string })[] {
  const courseDir = path.join(CONTENT_DIR, courseSlug);
  if (!fs.existsSync(courseDir)) return [];

  const entries = fs.readdirSync(courseDir, { withFileTypes: true });
  const sessionDirs = entries
    .filter((e) => e.isDirectory() && e.name.startsWith("session-"))
    .map((e) => e.name)
    .sort();

  return sessionDirs.map((dir) => {
    const metaPath = path.join(courseDir, dir, "meta.json");
    const meta: SessionMeta = fs.existsSync(metaPath)
      ? JSON.parse(fs.readFileSync(metaPath, "utf-8"))
      : {
          sessionNumber: parseInt(dir.replace("session-", "")),
          title: `${dir.replace("session-", "")}회차`,
          duration: "90분",
          tool: "",
          hasLesson: false,
          hasSlideOutline: false,
          hasSlideHtml: false,
          hasWorksheet: false,
          status: "draft",
        };
    return { ...meta, id: dir };
  });
}

export function getSessionContent(courseSlug: string, sessionId: string): SessionContent {
  const sessionDir = path.join(CONTENT_DIR, courseSlug, sessionId);

  const readMd = (filename: string): string | null => {
    const filePath = path.join(sessionDir, filename);
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, "utf-8");
    const { content } = matter(raw);
    return content;
  };

  const publicSlideDir = path.join(process.cwd(), "public", "slides", courseSlug);
  const htmlExists = fs.existsSync(path.join(publicSlideDir, `${sessionId}.html`))
    || fs.existsSync(path.join(sessionDir, "slide.html"));
  const pdfExists = fs.existsSync(path.join(publicSlideDir, `${sessionId}.pdf`));

  const slideUrl = htmlExists
    ? `/slides/${courseSlug}/${sessionId}.html`
    : pdfExists
    ? `/slides/${courseSlug}/${sessionId}.pdf`
    : null;

  return {
    lesson: readMd("lesson.md"),
    slideOutline: readMd("slide-outline.md"),
    worksheet: readMd("worksheet.md"),
    hasSlideHtml: !!slideUrl,
    slideUrl,
  };
}
