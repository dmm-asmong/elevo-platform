import { notFound } from "next/navigation";
import Link from "next/link";
import { courses } from "@/content/courses.config";
import { getCourseMeta, getSessionList } from "@/lib/content";

interface Props {
  params: Promise<{ courseSlug: string }>;
}

export default async function CoursePage({ params }: Props) {
  // Next 14.2 환경에서는 params가 Promise일 수도, 객체일 수도 있으므로 안전하게 처리
  const resolvedParams = await params;
  const { courseSlug } = resolvedParams;
  
  const course = courses.find((c) => c.slug === courseSlug);
  if (!course || course.status !== "active") notFound();

  const meta = getCourseMeta(courseSlug);
  const sessions = getSessionList(courseSlug);

  return (
    <div className="relative min-h-screen">
      {/* 배경 레이어 */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
           style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />
      <div className="absolute top-0 right-0 w-[60%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-8 py-16">
        {/* 브레드크럼 */}
        <div className="flex items-center gap-3 text-[10px] font-bold mb-12 uppercase tracking-[0.2em] text-[#555] animate-slide-up">
          <Link href="/" className="hover:text-yellow transition-colors">Home</Link>
          <span className="opacity-30">/</span>
          <span className="text-[#888]">{course.title}</span>
        </div>

        {/* 과목 헤더 */}
        <header className="mb-20 animate-slide-up">
          <div className="flex items-center gap-6 mb-8">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
              style={{ 
                background: "rgba(255, 255, 255, 0.03)", 
                border: "1px solid rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(10px)"
              }}
            >
              {course.icon}
            </div>
            <div className="flex flex-col">
              <h1
                className="font-black text-4xl mb-2 tracking-tight text-white italic"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {course.title}
              </h1>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow shadow-[0_0_8px_rgba(253,224,71,0.5)] animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-yellow/80">Curriculum</span>
              </div>
            </div>
          </div>
          
          <div className="max-w-2xl">
            <p className="text-base leading-relaxed text-[#888] mb-4">
              {meta?.description ?? course.description}
            </p>
            {meta?.targetAudience && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <span className="text-[9px] font-black uppercase tracking-wider text-[#666]">Target</span>
                <span className="text-[10px] font-bold text-[#aaa]">{meta.targetAudience}</span>
              </div>
            )}
          </div>
        </header>

        {/* 회차 섹션 헤더 */}
        <div className="flex items-center gap-6 mb-10 animate-slide-up delay-100">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono font-bold text-yellow tracking-[0.2em] mb-1">List</span>
            <h2 className="text-xl font-bold tracking-tight text-white uppercase italic" style={{ fontFamily: "var(--font-display)" }}>
              Sessions ({sessions.length})
            </h2>
          </div>
          <div className="flex-grow h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
        </div>

        {/* 회차 목록 */}
        <div className="grid gap-3">
          {sessions.map((session, i) => (
            <Link
              key={session.id}
              href={`/courses/${courseSlug}/${session.id}`}
              className="group animate-slide-up"
              style={{ animationDelay: `${(i + 2) * 0.08}s`, opacity: 0 }}
            >
              <div className="relative flex items-center gap-6 p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 overflow-hidden">
                {/* 호버 글로우 */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-yellow/[0.03] to-transparent" />
                
                {/* 번호 */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 transition-transform duration-500 group-hover:scale-110"
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    color: "#FDE047",
                    fontFamily: "var(--font-mono)",
                    border: "1px solid rgba(253, 224, 71, 0.1)",
                  }}
                >
                  {String(session.sessionNumber).padStart(2, "0")}
                </div>

                {/* 텍스트 */}
                <div className="flex-1 min-w-0 z-10">
                  <div className="font-bold text-base text-[#ccc] group-hover:text-white transition-colors duration-300">
                    {session.title}
                  </div>
                  <div className="text-[11px] font-bold mt-1.5 flex items-center gap-3 text-[#555] uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                      </svg>
                      {session.duration}
                    </span>
                    {session.tool && (
                      <span className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-white/10" />
                        {session.tool}
                      </span>
                    )}
                  </div>
                </div>

                {/* 자료 뱃지 */}
                <div className="flex items-center gap-2 flex-shrink-0 z-10">
                  {session.hasLesson && (
                    <div className="w-2 h-2 rounded-full bg-white/10" title="교안 포함" />
                  )}
                  {session.hasSlideHtml && (
                    <span className="text-[9px] font-black px-2 py-1 rounded bg-yellow/10 text-yellow border border-yellow/20 uppercase tracking-tighter">
                      SLIDE
                    </span>
                  )}
                  <svg
                    width="14" height="14" fill="none" stroke="currentColor" strokeWidth={3}
                    viewBox="0 0 24 24"
                    className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 text-yellow"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
