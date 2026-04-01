import { courses } from "@/content/courses.config";
import CourseCard from "@/components/home/CourseCard";

export default function HomePage() {
  const activeCourses = courses.filter((c) => c.status === "active");
  const comingCourses = courses.filter((c) => c.status === "coming-soon");

  return (
    <div className="min-h-screen">

      {/* ── HERO ── */}
      <section className="relative flex items-center px-8 pt-20 pb-16 overflow-hidden">
        {/* 아주 미세한 노이즈 레이어 */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-soft-light z-20"
             style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />
        
        {/* 배경 히어로 메인 비주얼 */}
        <div className="absolute top-0 right-0 w-full h-full lg:w-[60%] z-0 pointer-events-none select-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#fafafa] via-[#fafafa]/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#fafafa] via-transparent to-[#fafafa] z-10" />
          <img 
            src="/images/hero.png" 
            alt="Hero Visual" 
            className="w-full h-full object-cover lg:object-right opacity-[0.15] grayscale pointer-events-none"
          />
        </div>

        {/* 배경 광원 효과 추가 */}
        <div className="absolute -top-[10%] left-[20%] w-[40%] h-[40%] bg-yellow/20 blur-[150px] rounded-full pointer-events-none" />

        <div className="relative z-20 max-w-screen-xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            {/* 고품격 유리 뱃지 */}
            <div className="inline-flex items-center gap-3 mb-8 px-3 py-1.5 rounded-full border border-black/5 bg-white/70 backdrop-blur-md shadow-sm animate-slide-up">
              <div className="relative">
                <span className="block w-2 w-2 rounded-full bg-[#EAB308] shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#666]">
                Elevo · AI Platform
              </span>
            </div>

            {/* 메인 헤드라인 - 조화로운 타이포그래피 */}
            <h1
              className="animate-slide-up font-bold mb-6 tracking-tighter leading-[1.05] text-[#111]"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontFamily: "var(--font-display)",
              }}
            >
              <span className="block opacity-40 italic">Elevating</span>
              <span className="block italic text-gradient">Your</span>
              <span className="block text-[#EAB308] yellow-glow">GenAI</span>
            </h1>

            <div className="animate-slide-up delay-100">
              <p className="text-base leading-relaxed text-[#555] max-w-lg mb-8 font-medium">
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
