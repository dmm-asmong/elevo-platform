import { notFound } from "next/navigation";
import Link from "next/link";
import { courses } from "@/content/courses.config";
import { getCourseMeta, getSessionList } from "@/lib/content";
import CourseProgress from "@/components/course/CourseProgress";

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
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-multiply"
           style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")', filter: 'invert(1)' }} />
      <div className="absolute top-0 right-0 w-[60%] h-[40%] bg-[#EAB308]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-8 py-16">
        {/* 브레드크럼 */}
        <div className="flex items-center gap-3 text-[10px] font-bold mb-12 uppercase tracking-[0.2em] text-[#666] animate-slide-up">
          <Link href="/" className="hover:text-[#ca8a04] transition-colors">Home</Link>
          <span className="opacity-30">/</span>
          <span className="text-[#111]">{course.title}</span>
        </div>

        {/* 과목 헤더 */}
        <header className="mb-20 animate-slide-up">
          <div className="flex items-center gap-6 mb-8">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
              style={{ 
                background: "rgba(0, 0, 0, 0.02)", 
                border: "1px solid rgba(0, 0, 0, 0.05)",
                backdropFilter: "blur(10px)"
              }}
            >
              {course.icon}
            </div>
            <div className="flex flex-col">
              <h1
                className="font-black text-4xl mb-2 tracking-tight text-[#111] italic"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {course.title}
              </h1>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308] shadow-[0_0_8px_rgba(234,179,8,0.5)] animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#ca8a04]">Curriculum</span>
              </div>
            </div>
          </div>
          
          <div className="max-w-2xl">
            <p className="text-base leading-relaxed text-[#555] mb-4">
              {meta?.description ?? course.description}
            </p>
            {meta?.targetAudience && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/5">
                <span className="text-[9px] font-black uppercase tracking-wider text-[#888]">Target</span>
                <span className="text-[10px] font-bold text-[#444]">{meta.targetAudience}</span>
              </div>
            )}
          </div>
        </header>

        <CourseProgress courseSlug={courseSlug} courseColor={course.color} sessions={sessions} />
      </div>
    </div>
  );
}
