"use client";

import { useState, useEffect, useRef } from "react";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const runwayRef = useRef<HTMLDivElement>(null);
  const phase1Ref = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);
  const phase3Ref = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [activePhase, setActivePhase] = useState<1 | 2 | 3>(1);
  const lastPhaseRef = useRef<1 | 2 | 3>(1);

  // Jump directly to a fleet phase scene if telemetry tab clicked
  const handleSeekToPhase = (phase: 1 | 2 | 3) => {
    const video = videoRef.current;
    if (!video) return;
    if (phase === 1) video.currentTime = 0.0;
    else if (phase === 2) video.currentTime = 3.4;
    else if (phase === 3) video.currentTime = 6.7;
  };

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
      const progressEl = progressBarRef.current;

      if (v && v.duration) {
        const duration = 10.0; // sian.mp4 exact 10.0s 3-scene sequence
        const t = v.currentTime % duration;
        const runwayWidth = runway ? runway.clientWidth : 800;

        // 1. Update Timeline Progress Bar (0% ~ 100%)
        if (progressEl) {
          const progressPercent = Math.min(100, Math.max(0, (t / duration) * 100));
          progressEl.style.width = `${progressPercent}%`;
        }

        // 2. Active Phase Detection (3 Fleet Stages)
        let currentPhase: 1 | 2 | 3 = 1;
        if (t >= 6.7) {
          currentPhase = 3;
        } else if (t >= 3.4) {
          currentPhase = 2;
        } else {
          currentPhase = 1;
        }

        if (currentPhase !== lastPhaseRef.current) {
          lastPhaseRef.current = currentPhase;
          setActivePhase(currentPhase);
        }

        // 3. Phase 1: "10분 빠르게 픽업하고" (0.0s ~ 3.4s - 오토바이 속도 맞춰 왼쪽 -> 오른쪽)
        if (p1El) {
          if (t < 3.4) {
            const p1 = Math.min(1, Math.max(0, t / 3.4));
            const w1 = p1El.offsetWidth || 220;
            const maxTravel1 = Math.max(0, runwayWidth - w1 - 24);
            const x1 = p1 * maxTravel1 * 0.78;

            let op1 = 1;
            if (t < 0.25) op1 = t / 0.25;
            else if (t > 3.1) op1 = Math.max(0, (3.4 - t) / 0.3);

            p1El.style.opacity = op1.toFixed(3);
            p1El.style.transform = `translate3d(${x1.toFixed(1)}px, 0, 0)`;
            p1El.style.filter = "none";
            p1El.style.pointerEvents = "auto";
          } else {
            p1El.style.opacity = "0";
            p1El.style.pointerEvents = "none";
          }
        }

        // 4. Phase 2: "10분 빠르게 배송하기위해" (3.4s ~ 6.7s - 다마스 등장과 동시 왼쪽 -> 오른쪽 글이 흐리게/모션블러)
        if (p2El) {
          if (t >= 3.4 && t < 6.7) {
            const p2 = Math.min(1, Math.max(0, (t - 3.4) / 3.3));
            const w2 = p2El.offsetWidth || 240;
            const maxTravel2 = Math.max(0, runwayWidth - w2 - 24);
            const x2 = p2 * maxTravel2 * 0.82;

            let op2 = 1;
            if (t < 3.65) op2 = Math.max(0, (t - 3.4) / 0.25);
            else if (t > 6.4) op2 = Math.max(0, (6.7 - t) / 0.3);

            // 글이 흐리게 (Dynamic Motion Blur): 속도감에 따른 텍스트 모션블러
            const blurAmount = 1.0 + Math.sin(p2 * Math.PI) * 3.8;

            p2El.style.opacity = op2.toFixed(3);
            p2El.style.transform = `translate3d(${x2.toFixed(1)}px, 0, 0)`;
            p2El.style.filter = `blur(${blurAmount.toFixed(1)}px)`;
            p2El.style.pointerEvents = "auto";
          } else {
            p2El.style.opacity = "0";
            p2El.style.pointerEvents = "none";
          }
        }

        // 5. Phase 3: "오늘도 노력하겠습니다." (6.7s ~ 10.0s - 1톤 탑차 시점~종료 동기화: 우측 zone에서 우측으로 이동)
        if (p3El) {
          if (t >= 6.7 && t <= duration) {
            const p3 = Math.min(1, Math.max(0, (t - 6.7) / 3.3));
            const w3 = p3El.offsetWidth || 230;
            const maxTravel3 = Math.max(0, runwayWidth - w3 - 24);
            // 오른쪽에서 오른쪽으로 부드럽게 글라이딩 이동
            const startX = maxTravel3 * 0.45;
            const endX = maxTravel3 * 0.95;
            const x3 = startX + p3 * (endX - startX);

            let op3 = 1;
            if (t < 6.95) op3 = Math.max(0, (t - 6.7) / 0.25);
            else if (t > 9.7) op3 = Math.max(0, (duration - t) / 0.3);

            p3El.style.opacity = op3.toFixed(3);
            p3El.style.transform = `translate3d(${x3.toFixed(1)}px, 0, 0)`;
            p3El.style.filter = "none";
            p3El.style.pointerEvents = "auto";
          } else {
            p3El.style.opacity = "0";
            p3El.style.pointerEvents = "none";
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

        {/* ── 3. Bottom Panoramic Synchronized Tagline Stage (파노라마 형태) ── */}
        <div className="mt-auto pb-6 sm:pb-10 w-full max-w-5xl mx-auto">
          <div className="relative rounded-2xl bg-zinc-950/75 border border-white/15 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.65)] overflow-hidden p-3.5 sm:p-5">
            {/* Upper Telemetry Bar: 3 Fleet Stages */}
            <div className="grid grid-cols-3 gap-2 pb-3 mb-2 border-b border-white/10 text-xs sm:text-sm">
              {/* Stage 1 Badge */}
              <button
                type="button"
                onClick={() => handleSeekToPhase(1)}
                className={`flex items-center justify-between px-2.5 sm:px-3 py-1.5 rounded-lg border transition-all text-left ${
                  activePhase === 1
                    ? "bg-orange-500/15 border-orange-500/50 text-orange-200 shadow-[0_0_12px_rgba(249,115,22,0.2)]"
                    : "bg-white/[0.03] border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06]"
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      activePhase === 1 ? "bg-orange-400 animate-pulse" : "bg-zinc-600"
                    }`}
                  />
                  <span className="font-bold tracking-tight text-[11px] sm:text-xs">01 퀵 오토바이</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline">00:00 - 00:03</span>
              </button>

              {/* Stage 2 Badge */}
              <button
                type="button"
                onClick={() => handleSeekToPhase(2)}
                className={`flex items-center justify-between px-2.5 sm:px-3 py-1.5 rounded-lg border transition-all text-left ${
                  activePhase === 2
                    ? "bg-amber-500/15 border-amber-500/50 text-amber-200 shadow-[0_0_12px_rgba(251,191,36,0.2)]"
                    : "bg-white/[0.03] border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06]"
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      activePhase === 2 ? "bg-amber-400 animate-pulse" : "bg-zinc-600"
                    }`}
                  />
                  <span className="font-bold tracking-tight text-[11px] sm:text-xs">02 다마스 밴</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline">00:03 - 00:06</span>
              </button>

              {/* Stage 3 Badge */}
              <button
                type="button"
                onClick={() => handleSeekToPhase(3)}
                className={`flex items-center justify-between px-2.5 sm:px-3 py-1.5 rounded-lg border transition-all text-left ${
                  activePhase === 3
                    ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-200 shadow-[0_0_12px_rgba(52,211,153,0.2)]"
                    : "bg-white/[0.03] border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06]"
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      activePhase === 3 ? "bg-emerald-400 animate-pulse" : "bg-zinc-600"
                    }`}
                  />
                  <span className="font-bold tracking-tight text-[11px] sm:text-xs">03 1톤 탑차</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline">00:06 - 00:10</span>
              </button>
            </div>

            {/* Panoramic Runway */}
            <div
              ref={runwayRef}
              className="relative h-12 sm:h-14 md:h-16 w-full overflow-hidden flex items-center bg-black/40 rounded-xl px-4 border border-white/5"
            >
              {/* Runway Lane Guidelines */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

              {/* Phase 1: 10분 빠르게 픽업하고 (오토바이 속도 동기화: 좌 -> 우) */}
              <div
                ref={phase1Ref}
                className="absolute left-0 will-change-transform flex items-center gap-2.5 whitespace-nowrap text-sm sm:text-lg md:text-2xl font-black text-white tracking-tight select-none"
                style={{ opacity: 0 }}
              >
                <span className="inline-block w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,1)] shrink-0" />
                <span>10분 빠르게 픽업하고</span>
              </div>

              {/* Phase 2: 10분 빠르게 배송하기위해 (다마스 등장과 동시: 좌 -> 우 글이 흐리게/모션블러) */}
              <div
                ref={phase2Ref}
                className="absolute left-0 will-change-transform flex items-center gap-2.5 whitespace-nowrap text-sm sm:text-lg md:text-2xl font-black text-amber-200 tracking-tight select-none"
                style={{ opacity: 0 }}
              >
                <span className="inline-block w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,1)] shrink-0" />
                <span>10분 빠르게 배송하기위해</span>
              </div>

              {/* Phase 3: 오늘도 노력하겠습니다. (1톤 탑차 시점~종료 동기화: 우측 zone에서 우측으로 이동) */}
              <div
                ref={phase3Ref}
                className="absolute left-0 will-change-transform flex items-center gap-2.5 whitespace-nowrap text-sm sm:text-lg md:text-2xl font-black text-white tracking-tight select-none"
                style={{ opacity: 0 }}
              >
                <span className="inline-block w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,1)] shrink-0" />
                <span>오늘도 노력하겠습니다.</span>
              </div>
            </div>

            {/* Continuous 10s Panoramic Sync Progress Bar */}
            <div className="mt-3 relative h-1 sm:h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-400 rounded-full will-change-[width]"
                style={{ width: "0%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}