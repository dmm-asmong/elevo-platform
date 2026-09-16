import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden px-6 py-16 grid place-items-center">
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
      <div className="absolute -top-32 right-0 w-96 h-96 rounded-full bg-[#EAB308]/10 blur-[100px] pointer-events-none" />

      <main className="relative w-full max-w-2xl text-center animate-slide-up">
        <p className="mb-4 text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#a16207]">
          Route not found
        </p>
        <div
          className="text-[clamp(7rem,24vw,13rem)] font-black leading-[0.8] tracking-[-0.08em] text-[#111]"
          style={{ fontFamily: "var(--font-display)" }}
          aria-hidden="true"
        >
          404<span className="text-[#EAB308]">.</span>
        </div>
        <h1 className="mt-10 text-2xl font-bold tracking-tight text-[#111]">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#666]">
          주소가 바뀌었거나 존재하지 않는 강의·세션입니다. 홈에서 학습 경로를 다시 선택해 주세요.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-xl bg-[#111] px-6 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-white transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            홈으로 돌아가기
          </Link>
          <Link
            href="/library/skills"
            className="rounded-xl border border-black/10 bg-white/70 px-6 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-[#444] backdrop-blur transition-colors hover:bg-white"
          >
            스킬 둘러보기
          </Link>
        </div>
      </main>
    </div>
  );
}
