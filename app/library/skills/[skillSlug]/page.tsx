import { notFound } from "next/navigation";
import Link from "next/link";
import { skills } from "@/content/skills.config";
import { getSkillContent } from "@/lib/skills";
import DocViewer from "@/components/viewer/DocViewer";
interface Props {
  params: Promise<{ skillSlug: string }>;
}

export default async function SkillDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const { skillSlug } = resolvedParams;

  const skill = skills.find((s) => s.slug === skillSlug);
  if (!skill) notFound();

  const htmlContent = await getSkillContent(skill.contentFile);

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
        style={{ background: `${skill.color}08` }}
      />

      <div className="relative z-10 mx-auto px-8 py-16" style={{ maxWidth: "1280px" }}>
        {/* 브레드크럼 */}
        <div className="flex items-center gap-3 text-[10px] font-bold mb-12 uppercase tracking-[0.2em] text-[#666] animate-slide-up">
          <Link href="/" className="hover:text-[#ea580c] transition-colors">
            Home
          </Link>
          <span className="opacity-30">/</span>
          <Link
            href="/library/skills"
            className="hover:text-[#ea580c] transition-colors"
          >
            Skills
          </Link>
          <span className="opacity-30">/</span>
          <span className="text-[#111]">{skill.title}</span>
        </div>

        {/* 헤더 */}
        <header className="mb-16 animate-slide-up">
          <div className="flex items-center gap-6 mb-8">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
              style={{
                background: "rgba(0, 0, 0, 0.02)",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                backdropFilter: "blur(10px)",
              }}
            >
              {skill.icon}
            </div>
            <div className="flex flex-col">
              <h1
                className="font-black text-4xl mb-2 tracking-tight text-[#111] italic"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {skill.title}
              </h1>
              <div className="flex items-center gap-3">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{
                    background: skill.color,
                    boxShadow: `0 0 8px ${skill.color}80`,
                  }}
                />
                <span
                  className="text-[11px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: `${skill.color}cc` }}
                >
                  Skill Analysis
                </span>
              </div>
            </div>
          </div>

          {/* 메타 정보 카드 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#ffffff] border border-[#eaeaea]">
              <span className="text-[9px] font-black uppercase tracking-wider text-[#888]">
                Author
              </span>
              <span className="text-[11px] font-bold text-[#444] ml-auto">
                {skill.author}
              </span>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#ffffff] border border-[#eaeaea]">
              <span className="text-[9px] font-black uppercase tracking-wider text-[#888]">
                Added
              </span>
              <span className="text-[11px] font-mono font-bold text-[#444] ml-auto">
                {skill.addedAt}
              </span>
            </div>
            <a
              href={skill.source}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#ffffff] border border-[#eaeaea] hover:border-[#ccc] hover:shadow-sm transition-all duration-300 group"
            >
              <span className="text-[9px] font-black uppercase tracking-wider text-[#888]">
                Source
              </span>
              <span className="text-[11px] font-bold text-[#444] ml-auto truncate max-w-[120px] group-hover:text-[#111] transition-colors">
                GitHub ↗
              </span>
            </a>
          </div>

          {/* 태그 */}
          <div className="flex items-center gap-2 flex-wrap">
            {skill.tags.map((tag) => (
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
              style={{ color: skill.color }}
            >
              Document
            </span>
            <h2
              className="text-xl font-bold tracking-tight text-[#111] uppercase italic"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Analysis
            </h2>
          </div>
          <div className="flex-grow h-[1px] bg-gradient-to-r from-black/5 to-transparent" />
        </div>

        {/* 마크다운 본문 */}
        <DocViewer content={htmlContent} />
      </div>
    </div>
  );
}
