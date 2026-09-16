"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { skills } from "@/content/skills.config";
import { courses } from "@/content/courses.config";

const SIDEBAR_WIDTH = 280;
const SIDEBAR_COLLAPSED_WIDTH = 72;

export default function SideNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const activeCourses = courses.filter((c) => c.status === "active");
  const comingCourses = courses.filter((c) => c.status === "coming-soon");

  const sidebarWidth = collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH;

  return (
    <>
      {/* 모바일 토글 */}
      <button
        onClick={() => setOpen(!open)}
        className="print-hide lg:hidden fixed top-4 left-4 z-50 w-9 h-9 rounded-xl flex items-center justify-center transition-colors shadow-sm"
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          color: "#333",
          border: "1px solid rgba(0, 0, 0, 0.1)",
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
          className="print-hide lg:hidden fixed inset-0 z-30"
          style={{ background: "rgba(0,0,0,0.8)" }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* 사이드바 본체 */}
      <aside
        className={`print-hide fixed top-0 left-0 h-full z-40 flex flex-col transition-all duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 overflow-hidden`}
        style={{
          width: `${sidebarWidth}px`,
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRight: "1px solid rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* 아주 미세한 그라데이션 오버레이 */}
        <div className="absolute inset-0 pointer-events-none opacity-20"
             style={{ background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.02), transparent 30%)" }} />

        {/* 로고 영역 */}
        <div className={`relative py-8 mb-4 ${collapsed ? "px-0 flex justify-center" : "px-6"}`}>
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-4 group">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-lg flex-shrink-0 transition-transform duration-500 group-hover:rotate-[10deg] shadow-[0_0_15px_rgba(253,224,71,0.2)]"
              style={{
                background: "#111111",
                color: "#FDE047",
                fontFamily: "var(--font-display)",
              }}
            >
              E
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span
                  className="font-black text-lg tracking-[-0.05em] leading-none mb-1 text-[#111]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  ELEVO
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#999]">
                  PLATFORM
                </span>
              </div>
            )}
          </Link>
        </div>

        {/* 네비게이션 */}
        <nav className={`relative flex-1 overflow-y-auto py-2 space-y-1 ${collapsed ? "px-2" : "px-4"}`}>
          
          {!collapsed && (
            <div className="px-3 mb-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#444]">Main Menu</span>
            </div>
          )}

          {/* 홈 링크 */}
          <NavItem
            href="/"
            label="전체 커리큘럼"
            isActive={pathname === "/"}
            collapsed={collapsed}
            onClick={() => setOpen(false)}
            icon={
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            }
            activeIconClass="bg-yellow/20 text-[#ca8a04]"
          />

          {/* 활성 과목 */}
          {activeCourses.length > 0 && (
            <div className="pt-8">
              {!collapsed && (
                <div className="px-3 mb-4 flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#666]">Curriculum</span>
                  <div className="flex-grow h-[1px] bg-black/5" />
                </div>
              )}
              {collapsed && (
                <div className="mb-2 flex justify-center">
                  <div className="w-6 h-[1px] bg-black/10" />
                </div>
              )}
              
              <div className="space-y-1">
                {activeCourses.map((course) => {
                  const isActive = pathname.startsWith(`/courses/${course.slug}`);
                  return (
                    <NavItem
                      key={course.slug}
                      href={`/courses/${course.slug}`}
                      label={course.title}
                      isActive={isActive}
                      collapsed={collapsed}
                      onClick={() => setOpen(false)}
                      emoji={course.icon}
                      color={course.color}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* 준비 중 */}
          {comingCourses.length > 0 && (
            <div className="pt-8">
              {!collapsed && (
                <div className="px-3 mb-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#666]">Soon</span>
                </div>
              )}
              {collapsed && (
                <div className="mb-2 flex justify-center">
                  <div className="w-6 h-[1px] bg-black/10" />
                </div>
              )}
              <div className="space-y-1">
                {comingCourses.map((course) => (
                  <div
                    key={course.slug}
                    className={`flex items-center rounded-xl text-sm font-medium text-[#999] ${
                      collapsed ? "justify-center px-0 py-3" : "gap-3 px-4 py-3"
                    }`}
                  >
                    <span className={`text-lg opacity-20 grayscale ${collapsed ? "" : ""}`}>{course.icon}</span>
                    {!collapsed && <span className="flex-1 truncate tracking-tight">{course.title}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 자료실 */}
          <div className="pt-8">
            {!collapsed && (
              <div className="px-3 mb-4 flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#666]">Library</span>
                <div className="flex-grow h-[1px] bg-black/5" />
              </div>
            )}
            {collapsed && (
              <div className="mb-2 flex justify-center">
                <div className="w-6 h-[1px] bg-black/10" />
              </div>
            )}
            <div className="space-y-1">
              <NavItem
                href="/library/skills"
                label="Skills"
                isActive={pathname.startsWith("/library/skills")}
                collapsed={collapsed}
                onClick={() => setOpen(false)}
                icon={
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                }
                activeIconClass="bg-orange-400/20 text-[#ea580c]"
                badge={!collapsed ? String(skills.length) : undefined}
              />
            </div>
          </div>
        </nav>

        {/* 하단 영역 */}
        <div className={`relative py-6 mt-auto ${collapsed ? "px-3" : "px-6"}`}>
          <div className={`absolute top-0 h-[1px] bg-black/5 ${collapsed ? "left-3 right-3" : "left-6 right-6"}`} />
          {!collapsed && (
            <div className="flex items-center justify-between text-[10px] font-bold tracking-wider text-[#888] uppercase">
              <span>© 2026 ELEVO</span>
              <div className="flex gap-2">
                <div className="w-1 h-1 rounded-full bg-black/10" />
                <div className="w-1 h-1 rounded-full bg-black/10" />
              </div>
            </div>
          )}
        </div>

        {/* 데스크탑 접기/펼치기 토글 버튼 */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -right-3 w-6 h-6 rounded-full items-center justify-center z-50 transition-all duration-200 hover:scale-110 active:scale-95"
          style={{
            background: "#fff",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            color: "#666",
          }}
          aria-label={collapsed ? "사이드바 펼치기" : "사이드바 접기"}
        >
          <svg
            width="12"
            height="12"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </aside>

      {/* 메인 콘텐츠 영역 스페이서 - 데스크탑에서 사이드바 너비만큼 여백 확보 */}
      <div
        className="print-hide hidden lg:block flex-shrink-0 transition-all duration-300 ease-in-out"
        style={{ width: `${sidebarWidth}px` }}
      />
    </>
  );
}

/* ─── 네비게이션 아이템 컴포넌트 ─── */
interface NavItemProps {
  href: string;
  label: string;
  isActive: boolean;
  collapsed: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  emoji?: string;
  activeIconClass?: string;
  badge?: string;
  color?: string;
}

function NavItem({ href, label, isActive, collapsed, onClick, icon, emoji, activeIconClass, badge, color }: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group relative flex items-center rounded-xl text-sm font-medium transition-all duration-300
        ${collapsed ? "justify-center px-0 py-3" : "gap-3 px-4 py-3"}
        ${isActive ? "text-[#111] bg-black/5 border border-black/5 shadow-sm" : "text-[#666] hover:text-[#222] hover:bg-black/5"}`}
      title={collapsed ? label : undefined}
    >
      {color && (
        <span
          className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-4 rounded-full transition-opacity duration-300"
          style={{ backgroundColor: color, opacity: isActive ? 1 : 0.35 }}
        />
      )}
      {icon && (
        <div className={`p-1.5 rounded-lg transition-colors duration-300 ${isActive ? (activeIconClass || "bg-yellow/20 text-[#ca8a04]") : "bg-black/5 text-[#666] group-hover:text-[#444]"}`}>
          {icon}
        </div>
      )}
      {emoji && (
        <span className={`text-lg transition-transform duration-300 ${isActive ? "scale-110 opacity-100" : "opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"}`}>
          {emoji}
        </span>
      )}
      {!collapsed && (
        <>
          <span className="flex-1 truncate tracking-tight">{label}</span>
          {badge && (
            <span className="text-[10px] font-mono font-bold text-[#888]">{badge}</span>
          )}
          {isActive && (
            <div className="w-1.5 h-1.5 rounded-full bg-[#EAB308] shadow-[0_0_10px_rgba(234,179,8,0.5)] animate-pulse" />
          )}
        </>
      )}

      {/* 접힌 상태에서 호버 시 툴팁 */}
      {collapsed && (
        <div className="absolute left-full ml-2 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap
          opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-[60]"
          style={{
            background: "#111",
            color: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          {label}
          <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-2 h-2 rotate-45"
            style={{ background: "#111" }}
          />
        </div>
      )}
    </Link>
  );
}
