"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { courses } from "@/content/courses.config";

export default function SideNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const activeCourses = courses.filter((c) => c.status === "active");
  const comingCourses = courses.filter((c) => c.status === "coming-soon");

  return (
    <>
      {/* 모바일 토글 */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-4 left-4 z-50 w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
        style={{
          background: "#111",
          color: "#888",
          border: "1px solid #222",
        }}
        aria-label="메뉴"
      >
        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          {open
            ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            : <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18" />}
        </svg>
      </button>

      {/* 딤 오버레이 */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-30"
          style={{ background: "rgba(0,0,0,0.8)" }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* 사이드바 본체 */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 flex flex-col transition-transform duration-500 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 overflow-hidden`}
        style={{
          width: "280px",
          background: "rgba(10, 10, 12, 0.7)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRight: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        {/* 아주 미세한 그라데이션 오버레이 */}
        <div className="absolute inset-0 pointer-events-none opacity-20"
             style={{ background: "linear-gradient(to bottom, rgba(253, 224, 71, 0.05), transparent 30%)" }} />

        {/* 로고 영역 */}
        <div className="relative px-6 py-8 mb-4">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-4 group">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-lg flex-shrink-0 transition-transform duration-500 group-hover:rotate-[10deg] shadow-[0_0_15px_rgba(253,224,71,0.2)]"
              style={{
                background: "#FDE047",
                color: "#111",
                fontFamily: "var(--font-display)",
              }}
            >
              E
            </div>
            <div className="flex flex-col">
              <span
                className="font-black text-lg tracking-[-0.05em] leading-none mb-1 text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                ELEVO
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#555]">
                PLATFORM
              </span>
            </div>
          </Link>
        </div>

        {/* 네비게이션 */}
        <nav className="relative flex-1 overflow-y-auto px-4 py-2 space-y-1">
          
          <div className="px-3 mb-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#444]">Main Menu</span>
          </div>

          {/* 홈 링크 */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
              ${pathname === "/" ? "text-white bg-white/5 border border-white/10 shadow-[0_4px_15px_rgba(0,0,0,0.2)]" : "text-[#777] hover:text-[#aaa] hover:bg-white/5"}`}
          >
            <div className={`p-1.5 rounded-lg transition-colors duration-300 ${pathname === "/" ? "bg-yellow/10 text-yellow" : "bg-white/5 text-[#444] group-hover:text-[#666]"}`}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <span className="flex-1 tracking-tight">전체 커리큘럼</span>
          </Link>

          {/* 활성 과목 */}
          {activeCourses.length > 0 && (
            <div className="pt-8">
              <div className="px-3 mb-4 flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#444]">Curriculum</span>
                <div className="flex-grow h-[1px] bg-white/5" />
              </div>
              
              <div className="space-y-1">
                {activeCourses.map((course) => {
                  const isActive = pathname.startsWith(`/courses/${course.slug}`);
                  return (
                    <Link
                      key={course.slug}
                      href={`/courses/${course.slug}`}
                      onClick={() => setOpen(false)}
                      className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
                        ${isActive ? "text-white bg-white/5 border border-white/10" : "text-[#666] hover:text-[#999] hover:bg-white/5"}`}
                    >
                      <span className={`text-lg transition-transform duration-300 ${isActive ? "scale-110 opacity-100" : "opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"}`}>
                        {course.icon}
                      </span>
                      <span className="flex-1 truncate tracking-tight">{course.title}</span>
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow shadow-[0_0_10px_rgba(253,224,71,0.5)] animate-pulse" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* 준비 중 */}
          {comingCourses.length > 0 && (
            <div className="pt-8">
              <div className="px-3 mb-4">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#444]">Soon</span>
              </div>
              <div className="space-y-1">
                {comingCourses.map((course) => (
                  <div
                    key={course.slug}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#444]"
                  >
                    <span className="text-lg opacity-20 grayscale">{course.icon}</span>
                    <span className="flex-1 truncate tracking-tight">{course.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* 하단 영역 */}
        <div className="relative px-6 py-6 mt-auto">
          <div className="absolute top-0 left-6 right-6 h-[1px] bg-white/5" />
          <div className="flex items-center justify-between text-[10px] font-bold tracking-wider text-[#444] uppercase">
            <span>© 2026 ELEVO</span>
            <div className="flex gap-2">
              <div className="w-1 h-1 rounded-full bg-white/10" />
              <div className="w-1 h-1 rounded-full bg-white/10" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
