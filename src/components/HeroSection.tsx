"use client";

import { useEffect, useRef } from "react";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const runwayRef = useRef<HTMLDivElement>(null);
  const phase1Ref = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);
  const phase3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(() => {});
    }

    let animId: number;

    const renderLoop = () => {
      const v = videoRef.current;
      const runway = runwayRef.current;
      const p1El = phase1Ref.current;
      const p2El = phase2Ref.current;
      const p3El = phase3Ref.current;

      if (v && v.duration) {
        const duration = 10.0; // sian.mp4 exact 10.0s 3-scene sequence
        const t = v.currentTime % duration;
        const runwayWidth = runway ? runway.clientWidth : 800;

        // 1. Phase 1: "10분 빠르게 픽업하고" (0.0s ~ 3.4s - 정중앙 기준 좌 -> 우 미세 글라이딩)
        if (p1El) {
          if (t < 3.4) {
            const p1 = Math.min(1, Math.max(0, t / 3.4));
            // 정중앙(0px) 기준 -25px에서 +25px로 부드럽게 글라이딩
            const x1 = (p1 - 0.5) * 50;

            let op1 = 1;
            if (t < 0.25) op1 = t / 0.25;
            else if (t > 3.1) op1 = Math.max(0, (3.4 - t) / 0.3);

            p1El.style.opacity = op1.toFixed(3);
            p1El.style.transform = `translate3d(${x1.toFixed(1)}px, 0, 0)`;
          } else {
            p1El.style.opacity = "0";
          }
        }

        // 2. Phase 2: "10분 빠르게 배송하기위해" (3.4s ~ 6.7s - 정중앙 기준 좌 -> 우 미세 글라이딩, 선명)
        if (p2El) {
          if (t >= 3.4 && t < 6.7) {
            const p2 = Math.min(1, Math.max(0, (t - 3.4) / 3.3));
            const x2 = (p2 - 0.5) * 50;

            let op2 = 1;
            if (t < 3.65) op2 = Math.max(0, (t - 3.4) / 0.25);
            else if (t > 6.4) op2 = Math.max(0, (6.7 - t) / 0.3);

            p2El.style.opacity = op2.toFixed(3);
            p2El.style.transform = `translate3d(${x2.toFixed(1)}px, 0, 0)`;
          } else {
            p2El.style.opacity = "0";
          }
        }

        // 3. Phase 3: "오늘도 노력하겠습니다." (6.7s ~ 10.0s - 정중앙 기준 우측 방향 글라이딩)
        if (p3El) {
          if (t >= 6.7 && t <= duration) {
            const p3 = Math.min(1, Math.max(0, (t - 6.7) / 3.3));
            const x3 = -15 + p3 * 40;

            let op3 = 1;
            if (t < 6.95) op3 = Math.max(0, (t - 6.7) / 0.25);
            else if (t > 9.7) op3 = Math.max(0, (duration - t) / 0.3);

            p3El.style.opacity = op3.toFixed(3);
            p3El.style.transform = `translate3d(${x3.toFixed(1)}px, 0, 0)`;
          } else {
            p3El.style.opacity = "0";
          }
        }
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section
      id="hero"
      data-fullpage-section
      className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden pt-28 md:pt-36 pb-8 sm:pb-12 px-0 lg:h-[100svh] lg:min-h-0 lg:snap-start lg:snap-always bg-[#18181B]"
    >
      {/* 🎬 1. Full-Width Background Video Layer with Fallback Cinematic Ambient Glow */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#0B0F19]">
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-orange-500/20 via-amber-500/15 to-blue-600/20 rounded-full blur-[140px] animate-pulse"
            style={{ animationDuration: "6s" }}
          />
          <div className="absolute bottom-10 right-10 w-[500px] h-[400px] bg-blue-500/15 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-grid-dark opacity-40" />
        </div>

        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{ transform: "scale(1.05)", transformOrigin: "50% 50%" }}
          className="absolute inset-0 w-full h-full object-cover brightness-[0.93] contrast-[1.07]"
        >
          <source src="/videos/sian.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Soft Tint Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#12141A]/65 via-[#18181B]/35 to-[#18181B]/85" />
      </div>

      {/* ── Content Container (z-10) ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col justify-between h-full">
        {/* ── 2. Top Header & Title Area ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 border border-white/15 backdrop-blur-md text-[11px] sm:text-xs font-mono font-bold tracking-wider text-slate-200 uppercase mb-3 sm:mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>DREAMDEL · 24/7 FLEET DISPATCH CONTROL</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.18] break-keep mb-3">
              꿈의 운송서비스<br />
              고객님의 든든한 운송파트너{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 drop-shadow-[0_2px_14px_rgba(249,115,22,0.45)]">
                드림델
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 font-medium break-keep">
              오토바이 퀵부터 11톤 화물, 전국연계 운송까지
            </p>
          </div>
        </div>

        {/* ── 3. Bottom Panoramic Synchronized Tagline Stage (화면 가로 완전 정중앙 & 최적 비율) ── */}
        <div className="mt-auto pb-10 sm:pb-14 md:pb-16 w-full flex justify-center items-center">
          <div
            ref={runwayRef}
            className="relative h-12 sm:h-14 w-full max-w-2xl mx-auto overflow-hidden flex items-center justify-center pointer-events-none"
          >
            {/* Phase 1: 10분 빠르게 픽업하고 (정중앙 flex 기준) */}
            <div
              ref={phase1Ref}
              className="absolute inset-x-0 mx-auto w-full will-change-transform flex items-center justify-center text-center text-base sm:text-xl md:text-2xl font-bold text-white tracking-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)] select-none"
              style={{ opacity: 0 }}
            >
              <span>10분 빠르게 픽업하고</span>
            </div>

            {/* Phase 2: 10분 빠르게 배송하기위해 (정중앙 flex 기준) */}
            <div
              ref={phase2Ref}
              className="absolute inset-x-0 mx-auto w-full will-change-transform flex items-center justify-center text-center text-base sm:text-xl md:text-2xl font-bold text-white tracking-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)] select-none"
              style={{ opacity: 0 }}
            >
              <span>10분 빠르게 배송하기위해</span>
            </div>

            {/* Phase 3: 오늘도 노력하겠습니다. (정중앙 flex 기준) */}
            <div
              ref={phase3Ref}
              className="absolute inset-x-0 mx-auto w-full will-change-transform flex items-center justify-center text-center text-base sm:text-xl md:text-2xl font-bold text-white tracking-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)] select-none"
              style={{ opacity: 0 }}
            >
              <span>오늘도 노력하겠습니다.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}