import Link from "next/link";
import type { Course } from "@/content/courses.config";

export default function CourseCard({ course }: { course: Course }) {
  const isActive = course.status === "active";

  const card = (
    <div
      className="group relative rounded-xl h-full transition-all duration-700 overflow-hidden"
      style={{
        background: isActive ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.01)",
        border: isActive ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(255, 255, 255, 0.03)",
        cursor: isActive ? "pointer" : "default",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* 호버 시 내부 글로우 효과 */}
      {isActive && (
        <>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background: "radial-gradient(circle at top right, rgba(253, 224, 71, 0.08), transparent 70%)"
            }}
          />
          <div className="absolute -inset-[1px] bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </>
      )}

      <div className="relative z-10 p-6 h-full flex flex-col">
        {/* 헤더 행 */}
        <div className="flex items-start justify-between mb-6">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center text-xl flex-shrink-0 transition-transform duration-500 group-hover:scale-110"
            style={{
              background: isActive ? "rgba(255, 255, 255, 0.03)" : "transparent",
              border: isActive ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(255, 255, 255, 0.05)",
              boxShadow: isActive ? "0 4px 20px rgba(0,0,0,0.2)" : "none"
            }}
          >
            {course.icon}
          </div>

          <div className="flex items-center gap-2">
            {isActive && course.sessions > 0 && (
              <span
                className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border"
                style={{
                  background: "rgba(253,224,71,0.05)",
                  color: "#FDE047",
                  borderColor: "rgba(253,224,71,0.2)",
                  letterSpacing: "0.05em",
                }}
              >
                {course.sessions} SESSIONS
              </span>
            )}

            {!isActive && (
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded border"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  color: "#444",
                  borderColor: "rgba(255,255,255,0.05)",
                  letterSpacing: "0.05em",
                }}
              >
                COMING SOON
              </span>
            )}
          </div>
        </div>

        {/* 제목 */}
        <h3
          className="font-bold text-lg mb-2 transition-colors duration-300"
          style={{
            color: isActive ? "#fff" : "#444",
            fontFamily: "var(--font-display)",
            letterSpacing: "-0.01em",
          }}
        >
          {course.title}
        </h3>

        {/* 설명 */}
        <p
          className="text-sm leading-relaxed mb-6 flex-grow"
          style={{
            color: isActive ? "#999" : "#333",
            lineHeight: 1.6,
          }}
        >
          {course.description}
        </p>

        {/* 하단 행: 태그 + 액션 */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <div className="flex flex-wrap gap-2">
            {course.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-bold uppercase tracking-wider text-[#666]"
              >
                # {tag}
              </span>
            ))}
          </div>

          {isActive && (
            <div className="flex items-center gap-2 text-yellow opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
              <span className="text-[10px] font-bold tracking-widest">ENTER</span>
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (isActive) {
    return (
      <Link href={`/courses/${course.slug}`} className="block h-full course-card-active" style={{ textDecoration: "none" }}>
        {card}
      </Link>
    );
  }

  return card;
}
