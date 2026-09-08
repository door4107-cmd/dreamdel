"use client";

import { useState, useEffect, useRef } from "react";

// 히어로 하단 태그라인 (한 문장씩 fade 슬라이드로 순환)
const HERO_TAGLINES = [
  "10분 빠르게 픽업하고",
  "10분 빠르게 배송하기위해",
  "오늘도 노력하겠습니다.",
];

export default function HeroSection() {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState<1 | 2>(1);
  const [taglineIndex, setTaglineIndex] = useState(0);

  // 하단 태그라인 순환 (3.4초마다 한 문장씩 교체)
  useEffect(() => {
    const id = setInterval(() => {
      setTaglineIndex((i) => (i + 1) % HERO_TAGLINES.length);
    }, 3400);
    return () => clearInterval(id);
  }, []);

  // 1. 100% Seamless 60FPS Crossfading Video Loop
  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    const SPEED = 0.58;
    const FADE_DURATION_MS = 1800;
    const TRIGGER_BEFORE_END_SEC = 2.4;

    v1.defaultMuted = true;
    v1.muted = true;
    v2.defaultMuted = true;
    v2.muted = true;

    v1.playbackRate = SPEED;
    v2.playbackRate = SPEED;
    v1.play().catch(() => {});

    let isVideoTransitioning = false;
    let animId: number;

    const checkLoop = () => {
      const currentVideo = activeVideo === 1 ? v1 : v2;
      const nextVideo = activeVideo === 1 ? v2 : v1;

      if (currentVideo.duration) {
        const timeLeft = currentVideo.duration - currentVideo.currentTime;
        if (timeLeft <= TRIGGER_BEFORE_END_SEC && !isVideoTransitioning) {
          isVideoTransitioning = true;
          nextVideo.currentTime = 0;
          nextVideo.play().catch(() => {});
          setActiveVideo(activeVideo === 1 ? 2 : 1);

          setTimeout(() => {
            isVideoTransitioning = false;
          }, FADE_DURATION_MS);
        }
      }
      animId = requestAnimationFrame(checkLoop);
    };

    animId = requestAnimationFrame(checkLoop);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [activeVideo]);

  return (
    <section
      id="hero"
      data-fullpage-section
      className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden pt-28 md:pt-36 pb-12 sm:pb-16 px-0 lg:h-[100svh] lg:min-h-0 lg:snap-start lg:snap-always bg-[#18181B]"
    >
      {/* 🎬 1. Full-Width Background Video Layer with Fallback Cinematic Ambient Glow */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* Dynamic Modern Urban Flow Background (Always visible beneath video) */}
        <div className="absolute inset-0 bg-[#0B0F19]">
          {/* Radial ambient glow orbs */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-orange-500/20 via-amber-500/15 to-blue-600/20 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute bottom-10 right-10 w-[500px] h-[400px] bg-blue-500/15 rounded-full blur-[120px]" />
          
          {/* Futuristic Logistics Perspective Highway Grid */}
          <div className="absolute inset-0 bg-grid-dark opacity-40" />
          
          {/* Glowing Speed Light Streaks simulating nighttime city express logistics */}
          <div className="absolute inset-0 overflow-hidden opacity-30">
            <div className="absolute h-[1px] w-3/4 -top-10 left-10 bg-gradient-to-r from-transparent via-orange-400 to-transparent rotate-[-12deg] blur-[1px]" />
            <div className="absolute h-[2px] w-full top-1/3 -left-20 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent rotate-[8deg] blur-[1px]" />
            <div className="absolute h-[1px] w-2/3 bottom-1/4 right-0 bg-gradient-to-r from-transparent via-blue-400/70 to-transparent rotate-[-6deg] blur-[1px]" />
          </div>
        </div>

        <video
          ref={video1Ref}
          autoPlay
          muted
          playsInline
          preload="auto"
          style={{ transform: "scale(1.13)", transformOrigin: "0% 100%" }}
          className={`absolute inset-0 w-full h-full object-cover brightness-[0.95] contrast-[1.05] transition-opacity duration-[1800ms] ease-in-out ${
            activeVideo === 1 ? "opacity-90" : "opacity-0"
          }`}
        >
          <source src="/videos/adt.mp4" type="video/mp4" />
        </video>

        <video
          ref={video2Ref}
          muted
          playsInline
          preload="auto"
          style={{ transform: "scale(1.13)", transformOrigin: "0% 100%" }}
          className={`absolute inset-0 w-full h-full object-cover brightness-[0.95] contrast-[1.05] transition-opacity duration-[1800ms] ease-in-out ${
            activeVideo === 2 ? "opacity-90" : "opacity-0"
          }`}
        >
          <source src="/videos/adt.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Soft Tint Overlay (균일하고 자연스러운 영상 톤) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#12141A]/60 via-[#18181B]/30 to-[#18181B]/80" />
      </div>

      {/* ── Content Container (z-10) ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col justify-between h-full">
        {/* ── 2. Top Header & Title Area ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="text-xs sm:text-sm font-bold tracking-widest text-slate-400 uppercase mb-3 sm:mb-4">
              DREAMDEL · GLOBAL LOGISTICS INNOVATOR
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

        {/* ── Bottom Section: Tagline (히어로 섹션 하단 중앙 순환) ── */}
        <div className="mt-auto pb-2 sm:pb-6 flex justify-center">
          <div className="relative h-8 sm:h-9 w-full max-w-md overflow-hidden">
            {HERO_TAGLINES.map((line, i) => (
              <p
                key={line}
                aria-hidden={i !== taglineIndex}
                className={`absolute inset-x-0 top-0 h-full flex items-center justify-center whitespace-nowrap text-lg sm:text-xl md:text-2xl font-bold text-white/90 break-keep leading-none transition-all duration-700 ease-out ${
                  i === taglineIndex
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-full"
                }`}
              >
                <span className="inline-block w-1.5 h-5 sm:h-6 rounded-full bg-orange-500 mr-3 shrink-0 shadow-[0_0_12px_rgba(249,115,22,0.8)]" />
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}