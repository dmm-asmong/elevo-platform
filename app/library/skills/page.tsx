import Link from "next/link";
import { skills } from "@/content/skills.config";

export const metadata = {
  title: "Skills 아카이브 · ELEVO",
  description: "AI 코딩 도구, 워크플로우, 자동화 스킬을 아카이빙합니다.",
};

export default function SkillsPage() {
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
      <div className="absolute top-0 right-0 w-[60%] h-[40%] bg-orange-400/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 mx-auto px-8 py-16" style={{ maxWidth: "1280px" }}>
        {/* 브레드크럼 */}
        <div className="flex items-center gap-3 text-[10px] font-bold mb-12 uppercase tracking-[0.2em] text-[#666] animate-slide-up">
          <Link href="/" className="hover:text-[#ea580c] transition-colors">
            Home
          </Link>
          <span className="opacity-30">/</span>
          <span className="text-[#111]">자료실</span>
          <span className="opacity-30">/</span>
          <span className="text-[#111]">Skills</span>
        </div>

        {/* 헤더 */}
        <header className="mb-20 animate-slide-up">
          <div className="flex items-center gap-6 mb-8">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
              style={{
                background: "rgba(0, 0, 0, 0.02)",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                backdropFilter: "blur(10px)",
              }}
            >
              🧠
            </div>
            <div className="flex flex-col">
              <h1
                className="font-black text-4xl mb-2 tracking-tight text-[#111] italic"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Skills
              </h1>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(255,107,53,0.5)] animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-600">
                  Archive
                </span>
              </div>
            </div>
          </div>

          <p className="text-base leading-relaxed text-[#555] max-w-2xl">
            AI 코딩 도구, 워크플로우 자동화, 프로덕티비티 스킬을 분석하고
            아카이빙합니다. 발견한 유용한 도구와 기법들을 이곳에서 관리합니다.
          </p>
        </header>

        {/* 섹션 헤더 */}
        <div className="flex items-center gap-6 mb-10 animate-slide-up delay-100">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono font-bold text-orange-400 tracking-[0.2em] mb-1">
              Collection
            </span>
            <h2
              className="text-xl font-bold tracking-tight text-[#111] uppercase italic"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Skills ({skills.length})
            </h2>
          </div>
          <div className="flex-grow h-[1px] bg-gradient-to-r from-black/5 to-transparent" />
        </div>

        {/* 스킬 목록 */}
        <div className="grid gap-4">
          {skills.map((skill, i) => (
            <Link
              key={skill.slug}
              href={`/library/skills/${skill.slug}`}
              className="group animate-slide-up"
              style={{ animationDelay: `${(i + 2) * 0.08}s`, opacity: 0 }}
            >
              <div className="relative flex items-start gap-6 p-6 rounded-xl border border-black/5 bg-[#ffffff] shadow-sm hover:border-black/10 hover:shadow-md transition-all duration-300 overflow-hidden">
                {/* 호버 글로우 */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${skill.color}08 0%, transparent 50%)`,
                  }}
                />

                {/* 아이콘 */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-transform duration-500 group-hover:scale-110"
                  style={{
                    background: "rgba(0, 0, 0, 0.02)",
                    border: `1px solid ${skill.color}20`,
                  }}
                >
                  {skill.icon}
                </div>

                {/* 텍스트 */}
                <div className="flex-1 min-w-0 z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg text-[#111] group-hover:text-black transition-colors duration-300">
                      {skill.title}
                    </h3>
                    <span
                      className="text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider"
                      style={{
                        background: `${skill.color}15`,
                        color: skill.color,
                        border: `1px solid ${skill.color}30`,
                      }}
                    >
                      {skill.author.split("(")[0].trim()}
                    </span>
                  </div>
                  <p className="text-sm text-[#555] leading-relaxed mb-3">
                    {skill.description}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {skill.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/5 text-[#666] border border-black/5"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="ml-auto text-[10px] font-mono text-[#aaa]">
                      {skill.addedAt}
                    </span>
                  </div>
                </div>

                {/* 화살표 */}
                <svg
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                  viewBox="0 0 24 24"
                  className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 mt-4"
                  style={{ color: skill.color }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* 빈 상태 (스킬이 없을 때) */}
        {skills.length === 0 && (
          <div className="text-center py-20">
            <div className="text-4xl mb-4 opacity-20">🧠</div>
            <p className="text-[#555] text-sm">아직 등록된 스킬이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
