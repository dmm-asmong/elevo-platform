import { notFound } from "next/navigation";
import Link from "next/link";
import { courses } from "@/content/courses.config";
import { getSessionList, getSessionContent } from "@/lib/content";
import { extractTOC } from "@/lib/toc";
import ContentTabs from "@/components/course/ContentTabs";
import StickyTOC from "@/components/viewer/StickyTOC";

interface Props {
  params: Promise<{ courseSlug: string; sessionId: string }>;
}

export default async function SessionPage({ params }: Props) {
  const { courseSlug, sessionId } = await params;
  const course = courses.find((c) => c.slug === courseSlug);
  if (!course || course.status !== "active") notFound();

  const sessions = getSessionList(courseSlug);
  const session = sessions.find((s) => s.id === sessionId);
  if (!session) notFound();

  const content = getSessionContent(courseSlug, sessionId);
  const tocHeadings = content.lesson ? extractTOC(content.lesson) : [];

  const tabs = [
    { id: "lesson", label: "교안", content: content.lesson },
    {
      id: "worksheet",
      label: "워크시트",
      content: content.worksheet,
      badge: content.worksheet ? "인쇄용" : undefined,
    },
  ];

  const sessionIndex = sessions.findIndex((s) => s.id === sessionId);
  const prevSession = sessions[sessionIndex - 1];
  const nextSession = sessions[sessionIndex + 1];

  return (
    <div className="px-6 py-10" style={{ maxWidth: "1280px", margin: "0 auto" }}>

      {/* 브레드크럼 */}
      <div className="flex items-center gap-2 text-xs mb-8 uppercase tracking-widest" style={{ color: "#888" }}>
        <Link href="/" className="hover:text-white transition-colors">홈</Link>
        <span>/</span>
        <Link href={`/courses/${courseSlug}`} className="hover:text-white transition-colors">
          {course.title}
        </Link>
        <span>/</span>
        <span style={{ color: "#aaa" }}>{session.sessionNumber}회차</span>
      </div>

      {/* 회차 헤더 */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <div className="font-mono text-xs mb-2" style={{ color: "#888" }}>
            {String(session.sessionNumber).padStart(2, "0")} / {String(sessions.length).padStart(2, "0")}
          </div>
          <h1
            className="font-bold text-2xl mb-2"
            style={{ color: "#fff", fontFamily: "var(--font-display)", letterSpacing: "-0.025em" }}
          >
            {session.title}
          </h1>
          <div className="flex items-center gap-3 text-xs" style={{ color: "#999" }}>
            <span>{session.duration}</span>
            {session.tool && <><span>·</span><span>{session.tool}</span></>}
          </div>
        </div>

        {content.hasSlideHtml && (
          <Link
            href={`/courses/${courseSlug}/${sessionId}/present`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 flex-shrink-0"
            style={{ background: "#FDE047", color: "#000" }}
          >
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            프레젠테이션
          </Link>
        )}
      </div>

      {/* 콘텐츠 + 사이드 TOC */}
      <div className="flex gap-8 items-start mb-8">
        {/* 메인 콘텐츠 카드 */}
        <div
          className="flex-1 min-w-0 rounded-[24px] p-6"
          style={{ background: "#181818", border: "1px solid #282828" }}
        >
          <ContentTabs tabs={tabs} />
        </div>

        {/* 스티키 TOC */}
        {tocHeadings.length >= 2 && (
          <StickyTOC headings={tocHeadings} />
        )}
      </div>

      {/* 이전/다음 */}
      <div className="flex justify-between gap-4" style={{ maxWidth: "768px" }}>
        {prevSession ? (
          <Link
            href={`/courses/${courseSlug}/${prevSession.id}`}
            className="group flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid #1c1c1c", flex: "1", maxWidth: "48%" }}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
              style={{ color: "#888", flexShrink: 0 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
            </svg>
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: "#888" }}>이전</div>
              <div className="text-sm font-medium truncate group-hover:text-white transition-colors" style={{ color: "#aaa" }}>
                {prevSession.title}
              </div>
            </div>
          </Link>
        ) : <div style={{ flex: 1 }} />}

        {nextSession && (
          <Link
            href={`/courses/${courseSlug}/${nextSession.id}`}
            className="group flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 text-right justify-end"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid #1c1c1c", flex: "1", maxWidth: "48%" }}
          >
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: "#888" }}>다음</div>
              <div className="text-sm font-medium truncate group-hover:text-white transition-colors" style={{ color: "#aaa" }}>
                {nextSession.title}
              </div>
            </div>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
              style={{ color: "#FDE047", flexShrink: 0 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}
