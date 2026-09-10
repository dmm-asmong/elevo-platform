import { courses } from "@/content/courses.config";
import CourseCard from "@/components/home/CourseCard";

export default function HomePage() {
  const activeCourses = courses.filter((c) => c.status === "active");
  const comingCourses = courses.filter((c) => c.status === "coming-soon");

  return (
    <div className="min-h-screen">

      {/* ── HERO ── */}
      <section className="relative flex items-center px-8 pt-14 pb-10 overflow-hidden">
        <div className="relative z-20 max-w-screen-xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            {/* 고품격 유리 뱃지 */}
            <div className="inline-flex items-center gap-3 mb-5 px-3 py-1.5 rounded-full border border-black/5 bg-white/70 backdrop-blur-md shadow-sm animate-slide-up">
              <div className="relative">
                <span className="block w-2 w-2 rounded-full bg-[#EAB308] shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#666]">
                Elevo · AI Platform
              </span>
            </div>

            {/* 메인 헤드라인 - 조화로운 타이포그래피 */}
            <h1
              className="animate-slide-up font-bold mb-4 tracking-tighter leading-[1.05] text-[#111]"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                fontFamily: "var(--font-display)",
              }}
            >
              <span className="block opacity-40 italic">Elevating Your</span>
              <span className="block text-[#EAB308] yellow-glow">GenAI</span>
            </h1>

            <div className="animate-slide-up delay-100">
              <p className="text-base leading-relaxed text-[#555] max-w-lg mb-5 font-medium">
                AI와 함께라면 누구나 상상 속 웹앱을 직접 빌드할 수 있습니다.
                가장 모던하고 직관적인 AI 코딩 커리큘럼.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <button className="px-6 py-3.5 rounded-xl bg-yellow text-[#111] font-black text-[10px] uppercase tracking-[0.2em] shadow-md hover:bg-[#FACC15] transition-all transform active:scale-95">
                  Start Training
                </button>
                <div className="px-6 py-3.5 rounded-xl border border-black/10 bg-black/5 text-[#666] font-black text-[10px] uppercase tracking-[0.2em]">
                  7 Sessions
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 커리큘럼 ── */}
      <section className="relative px-8 py-20 max-w-screen-xl mx-auto">
        
        {/* 운영 중 */}
        {activeCourses.length > 0 && (
          <div className="mb-24">
            <div className="flex items-center gap-6 mb-12 animate-slide-up">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono font-bold text-[#EAB308] tracking-[0.2em] mb-1">01</span>
                <h2 className="text-2xl font-bold tracking-tight text-[#111] uppercase italic" style={{ fontFamily: "var(--font-display)" }}>
                  Active Courses
                </h2>
              </div>
              <div className="flex-grow h-[1px] bg-gradient-to-r from-[#ddd] to-transparent" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {activeCourses.map((course, i) => (
                <div
                  key={course.slug}
                  className="animate-slide-up"
                  style={{ animationDelay: `${i * 0.15}s`, opacity: 0 }}
                >
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 준비 중 */}
        {comingCourses.length > 0 && (
          <div>
            <div className="flex items-center gap-6 mb-12 animate-slide-up">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono font-bold text-[#888] tracking-[0.2em] mb-1">02</span>
                <h2 className="text-2xl font-bold tracking-tight text-[#888] uppercase italic" style={{ fontFamily: "var(--font-display)" }}>
                  Coming Soon
                </h2>
              </div>
              <div className="flex-grow h-[1px] bg-gradient-to-r from-[#eee] to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 opacity-60">
              {comingCourses.map((course) => (
                <CourseCard key={course.slug} course={course} />
              ))}
            </div>
          </div>
        )}

      </section>
    </div>
  );
}
