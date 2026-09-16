"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative min-h-screen overflow-hidden px-6 py-16 grid place-items-center">
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
      <div className="absolute -top-32 right-0 w-96 h-96 rounded-full bg-[#EAB308]/10 blur-[100px] pointer-events-none" />

      <main className="relative w-full max-w-2xl text-center animate-slide-up" role="alert">
        <p className="mb-5 text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#a16207]">
          Something went wrong
        </p>
        <div
          className="relative mx-auto grid h-28 w-28 place-items-center rounded-[2rem] border border-black/5 bg-white/70 text-5xl font-black text-[#111] shadow-[0_20px_70px_rgba(0,0,0,0.08)] backdrop-blur"
          style={{ fontFamily: "var(--font-display)" }}
          aria-hidden="true"
        >
          !<span className="absolute mt-14 ml-9 h-3 w-3 rounded-full bg-[#EAB308]" />
        </div>
        <h1 className="mt-10 text-2xl font-bold tracking-tight text-[#111]">
          화면을 불러오지 못했습니다
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#666]">
          일시적인 오류일 수 있습니다. 다시 시도하거나 홈으로 돌아가 학습을 이어가세요.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-xl bg-[#111] px-6 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-white transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            다시 시도
          </button>
          <Link
            href="/"
            className="rounded-xl border border-black/10 bg-white/70 px-6 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-[#444] backdrop-blur transition-colors hover:bg-white"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </main>
    </div>
  );
}
