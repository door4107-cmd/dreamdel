"use client";

import { useState, useEffect, useRef } from "react";

interface HeroSectionProps {
  onQuote: () => void;
}

export default function HeroSection({ onQuote }: HeroSectionProps) {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState<1 | 2>(1);

  const [latestDispatch, setLatestDispatch] = useState({
    area: "강남 테헤란로 → 송파 롯데타워",
    vehicle: "오토바이",
    status: "매칭 완료 ✨",
  });

  // 1. 100% Seamless 60FPS Crossfading Video Loop (완벽하게 부드러운 무한 디졸브 루프)
  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    const SPEED = 0.58;
    const FADE_DURATION_MS = 1800;
    const TRIGGER_BEFORE_END_SEC = 2.4; // 끝까지 도달하기 2.4초 전에 다음 영상 시작

    v1.playbackRate = SPEED;
    v2.playbackRate = SPEED;

    let isTransitioning = false;
    let animId: number;

    const checkLoop = () => {
      // 1번 영상 ➔ 2번 영상 전환 체크
      if (activeVideo === 1 && v1.duration && !isTransitioning) {
        if (v1.currentTime >= v1.duration - TRIGGER_BEFORE_END_SEC) {
          isTransitioning = true;
          v2.currentTime = 0;
          v2.playbackRate = SPEED;
          v2.play().catch(() => {});
          setActiveVideo(2);

          // 페이드가 완전히 끝난 후 1번 영상을 안전하게 대기 상태로 정돈
          setTimeout(() => {
            if (v1) {
              v1.pause();
              v1.currentTime = 0;
            }
            isTransitioning = false;
          }, FADE_DURATION_MS + 200);
        }
      }
      // 2번 영상 ➔ 1번 영상 전환 체크
      else if (activeVideo === 2 && v2.duration && !isTransitioning) {
        if (v2.currentTime >= v2.duration - TRIGGER_BEFORE_END_SEC) {
          isTransitioning = true;
          v1.currentTime = 0;
          v1.playbackRate = SPEED;
          v1.play().catch(() => {});
          setActiveVideo(1);

          setTimeout(() => {
            if (v2) {
              v2.pause();
              v2.currentTime = 0;
            }
            isTransitioning = false;
          }, FADE_DURATION_MS + 200);
        }
      }

      animId = requestAnimationFrame(checkLoop);
    };

    animId = requestAnimationFrame(checkLoop);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [activeVideo]);

  // 2. Telemetry Live Dispatch Data
  useEffect(() => {
    const dispatches = [
      { area: "강남 테헤란로 → 송파 롯데타워", vehicle: "오토바이", status: "매칭 완료 ✨" },
      { area: "여의도 IFC → 서초 법원로", vehicle: "다마스", status: "배송 중 📦" },
      { area: "광화문 D타워 → 판교 테크노밸리", vehicle: "라보", status: "픽업 완료 🚚" },
      { area: "상암 DMC → 용산 한남동", vehicle: "밴", status: "출발 🚀" },
      { area: "인천 송도 → 구로디지털단지", vehicle: "트럭", status: "배차 확정 ⚡" },
    ];

    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % dispatches.length;
      setLatestDispatch(dispatches[idx]);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden pt-28 md:pt-36 pb-20 px-4 sm:px-6 lg:px-8">
      {/* 🎬 1. Full-Width Background Video Layer (1.8초 울트라 스무스 크로스페이드 디졸브) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={video1Ref}
          autoPlay
          muted
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover brightness-[1.02] contrast-[1.02] transition-opacity duration-[1800ms] ease-in-out ${
            activeVideo === 1 ? "opacity-75" : "opacity-0"
          }`}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        <video
          ref={video2Ref}
          muted
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover brightness-[1.02] contrast-[1.02] transition-opacity duration-[1800ms] ease-in-out ${
            activeVideo === 2 ? "opacity-75" : "opacity-0"
          }`}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* 100% Transparent Video Viewport */}
        <div className="absolute inset-0 bg-transparent" />
      </div>

      {/* 2. Ambient Lighting */}
      <div className="ambient-glow bg-orange-500/10 top-1/4 left-1/2 -translate-x-1/2" />
      <div className="ambient-glow bg-blue-500/8 top-1/2 left-1/3" />

      {/* 3. Hero Left-Aligned Foreground (세련된 좌측 정렬 레이아웃) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full text-left px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Dynamic Live Badge (좌측 정렬) */}
          <div className="inline-flex items-center space-x-2.5 px-5 py-2.5 rounded-full bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-sm mb-7 hover:border-slate-300 transition-all">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500" />
            </span>
            <span className="text-sm sm:text-base font-black text-slate-900">
              수도권 30초 배차망
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-sm sm:text-base font-semibold text-slate-700">
              {latestDispatch.area} · <span className="text-orange-600 font-black">{latestDispatch.vehicle}</span> ({latestDispatch.status})
            </span>
          </div>

          {/* 메인 헤드라인 (좌측 정렬) */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 mb-6 leading-[1.12] break-keep drop-shadow-[0_2px_15px_rgba(255,255,255,0.95)]">
            급할 땐 고민 없이,<br />
            <span className="text-gradient-vermilion drop-shadow-none">가장 빠른 퀵서비스 드림델</span>
          </h1>

          {/* 🌟 2. 100% 투명 배경 서브 카피 (좌측 정렬) */}
          <div className="mb-12 text-left">
            <p className="text-sm sm:text-base md:text-lg font-bold text-slate-800 mb-2 break-keep drop-shadow-[0_1px_8px_rgba(255,255,255,0.9)]">
              오토바이 급행부터 다마스 · 라보 · 밴 · 1톤 트럭까지.
            </p>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-slate-950 leading-snug break-keep drop-shadow-[0_2px_12px_rgba(255,255,255,0.95)]">
              지금 부르면 가장 가까운 전문 기사님의{" "}
              <span className="text-slate-950 font-black">
                30초 배차, 안전하고 빠른 배송 드림델
              </span>
            </p>
          </div>
        </div>

        {/* 🌟 3. 압도적 가독성의 4칸 신뢰 지표 카드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl">
          {/* Card 1: 배차 시간 */}
          <div className="p-5 sm:p-7 rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200 shadow-lg hover:shadow-2xl hover:border-orange-300 hover:-translate-y-1 transition-all text-left">
            <div className="text-xs sm:text-sm font-black text-orange-600 mb-2 flex items-center space-x-1.5">
              <span className="p-1.5 rounded-lg bg-orange-100/80">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              <span>초고속 매칭</span>
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 font-mono tracking-tight my-1">
              24.8<span className="text-sm sm:text-base font-bold text-slate-500 ml-1">초</span>
            </div>
            <div className="text-xs sm:text-sm text-slate-600 font-bold mt-1">평균 배차 시간</div>
          </div>

          {/* Card 2: 약속 시간 준수 */}
          <div className="p-5 sm:p-7 rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200 shadow-lg hover:shadow-2xl hover:border-emerald-300 hover:-translate-y-1 transition-all text-left">
            <div className="text-xs sm:text-sm font-black text-emerald-600 mb-2 flex items-center space-x-1.5">
              <span className="p-1.5 rounded-lg bg-emerald-100/80">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <span>정시 도착</span>
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 font-mono tracking-tight my-1">
              99.8<span className="text-sm sm:text-base font-bold text-slate-500 ml-1">%</span>
            </div>
            <div className="text-xs sm:text-sm text-slate-600 font-bold mt-1">도심 약속 준수율</div>
          </div>

          {/* Card 3: 적재물 책임보험 */}
          <div className="p-5 sm:p-7 rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200 shadow-lg hover:shadow-2xl hover:border-blue-300 hover:-translate-y-1 transition-all text-left">
            <div className="text-xs sm:text-sm font-black text-blue-600 mb-2 flex items-center space-x-1.5">
              <span className="p-1.5 rounded-lg bg-blue-100/80">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </span>
              <span>책임 보험</span>
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 font-mono tracking-tight my-1">
              1<span className="text-sm sm:text-base font-bold text-slate-500 ml-1">억원</span>
            </div>
            <div className="text-xs sm:text-sm text-slate-600 font-bold mt-1">현대해상 100% 가입</div>
          </div>

          {/* Card 4: 24시간 상담 센터 */}
          <div className="p-5 sm:p-7 rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200 shadow-lg hover:shadow-2xl hover:border-rose-300 hover:-translate-y-1 transition-all text-left">
            <div className="text-xs sm:text-sm font-black text-rose-600 mb-2 flex items-center space-x-1.5">
              <span className="p-1.5 rounded-lg bg-rose-100/80">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </span>
              <span>상담 센터</span>
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 font-mono tracking-tight my-1">
              365<span className="text-sm sm:text-base font-bold text-slate-500 ml-1">일</span>
            </div>
            <div className="text-xs sm:text-sm text-slate-600 font-bold mt-1">24시간 친절 상담</div>
          </div>
        </div>
      </div>
    </section>
  );
}