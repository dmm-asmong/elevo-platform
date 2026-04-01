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
    <div className="relative min-h-screen">
      {/* 배경 */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage:
            'url("https://www.transparenttextures.com/patterns/stardust.png")',
          filter: "invert(1)",
        }}
      />
      <div
        className="absolute top-0 right-0 w-[60%] h-[40%] blur-[120px] rounded-full pointer-events-none"
        style={{ background: `${course.color}08` }}
      />

      <div className="relative z-10 mx-auto px-8 py-16" style={{ maxWidth: "1280px" }}>
        {/* 브레드크럼 */}
        <div className="flex items-center gap-3 text-[10px] font-bold mb-12 uppercase tracking-[0.2em] text-[#666] animate-slide-up">
          <Link href="/" className="hover:text-[#ea580c] transition-colors">
            Home
          </Link>
          <span className="opacity-30">/</span>
          <Link
            href={`/courses/${courseSlug}`}
            className="hover:text-[#ea580c] transition-colors"
          >
            {course.title}
          </Link>
          <span className="opacity-30">/</span>
          <span className="text-[#111]">{session.sessionNumber}회차</span>
        </div>

        {/* 헤더 */}
        <header className="mb-16 animate-slide-up">
          <div className="flex items-start justify-between gap-6 mb-8">
            <div className="flex items-center gap-6">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] flex-shrink-0"
                style={{
                  background: "rgba(0, 0, 0, 0.02)",
                  border: "1px solid rgba(0, 0, 0, 0.05)",
                  backdropFilter: "blur(10px)",
                }}
              >
                {course.icon}
              </div>
              <div className="flex flex-col">
                <div className="font-mono text-[11px] mb-2" style={{ color: "#888" }}>
                  {String(session.sessionNumber).padStart(2, "0")} / {String(sessions.length).padStart(2, "0")}
                </div>
                <h1
                  className="font-black text-4xl mb-2 tracking-tight text-[#111] italic"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {session.title}
                </h1>
                <div className="flex items-center gap-3">
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{
                      background: course.color,
                      boxShadow: `0 0 8px ${course.color}80`,
                    }}
                  />
                  <span
                    className="text-[11px] font-bold uppercase tracking-[0.2em]"
                    style={{ color: `${course.color}cc` }}
                  >
                    {course.title}
                  </span>
                </div>
              </div>
            </div>

            {/* 프레젠테이션 버튼 */}
            {content.hasSlideHtml && (
              <Link
                href={`/courses/${courseSlug}/${sessionId}/present`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 flex-shrink-0"
                style={{ background: "#EAB308", color: "#111", boxShadow: "0 4px 14px rgba(234, 179, 8, 0.3)" }}
              >
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                프레젠테이션
              </Link>
            )}
          </div>

          {/* 메타 정보 카드 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#ffffff] border border-[#eaeaea]">
              <span className="text-[9px] font-black uppercase tracking-wider text-[#888]">
                Session
              </span>
              <span className="text-[11px] font-bold text-[#444] ml-auto font-mono">
                {String(session.sessionNumber).padStart(2, "0")} / {String(sessions.length).padStart(2, "0")}
              </span>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#ffffff] border border-[#eaeaea]">
              <span className="text-[9px] font-black uppercase tracking-wider text-[#888]">
                Duration
              </span>
              <span className="text-[11px] font-bold text-[#444] ml-auto">
                {session.duration}
              </span>
            </div>
            {session.tool && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#ffffff] border border-[#eaeaea]">
                <span className="text-[9px] font-black uppercase tracking-wider text-[#888]">
                  Tool
                </span>
                <span className="text-[11px] font-bold text-[#444] ml-auto truncate max-w-[120px]">
                  {session.tool}
                </span>
              </div>
            )}
          </div>

          {/* 태그 */}
          <div className="flex items-center gap-2 flex-wrap">
            {course.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#f0f0f0] text-[#555] border border-[#eaeaea]"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* 구분선 */}
        <div className="flex items-center gap-6 mb-10 animate-slide-up delay-100">
          <div className="flex flex-col">
            <span
              className="text-[10px] font-mono font-bold tracking-[0.2em] mb-1"
              style={{ color: course.color }}
            >
              Document
            </span>
            <h2
              className="text-xl font-bold tracking-tight text-[#111] uppercase italic"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Lesson
            </h2>
          </div>
          <div className="flex-grow h-[1px] bg-gradient-to-r from-black/5 to-transparent" />
        </div>

        {/* 콘텐츠 + 사이드 TOC */}
        <div className="flex gap-8 items-start mb-8 animate-slide-up delay-200">
          <div
            className="flex-1 min-w-0 rounded-[24px] p-6 shadow-sm"
            style={{ background: "#ffffff", border: "1px solid #eaeaea" }}
          >
            <ContentTabs tabs={tabs} />
          </div>

          {tocHeadings.length >= 2 && (
            <StickyTOC headings={tocHeadings} />
          )}
        </div>

        {/* 이전/다음 */}
        <div className="flex justify-between gap-4 animate-slide-up delay-300" style={{ maxWidth: "768px" }}>
          {prevSession ? (
            <Link
              href={`/courses/${courseSlug}/${prevSession.id}`}
              className="group flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 hover:shadow-sm"
              style={{ background: "#ffffff", border: "1px solid #eaeaea", flex: "1", maxWidth: "48%" }}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                style={{ color: "#666", flexShrink: 0 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
              </svg>
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: "#888" }}>이전</div>
                <div className="text-sm font-medium truncate group-hover:text-[#111] transition-colors" style={{ color: "#444" }}>
                  {prevSession.title}
                </div>
              </div>
            </Link>
          ) : <div style={{ flex: 1 }} />}

          {nextSession && (
            <Link
              href={`/courses/${courseSlug}/${nextSession.id}`}
              className="group flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 text-right justify-end hover:shadow-sm"
              style={{ background: "#ffffff", border: "1px solid #eaeaea", flex: "1", maxWidth: "48%" }}
            >
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: "#888" }}>다음</div>
                <div className="text-sm font-medium truncate group-hover:text-[#111] transition-colors" style={{ color: "#444" }}>
                  {nextSession.title}
                </div>
              </div>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                style={{ color: course.color, flexShrink: 0 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
