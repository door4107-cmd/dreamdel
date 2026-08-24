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

  // 1. Seamless Dual-Video Crossfade & 0.75x Slow Motion Loop
  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    v1.playbackRate = 0.75;
    v2.playbackRate = 0.75;

    let isTransitioning = false;

    const handleTimeUpdate1 = () => {
      if (!v1.duration || isTransitioning) return;
      if (v1.currentTime >= v1.duration - 1.2) {
        isTransitioning = true;
        v2.currentTime = 0;
        v2.playbackRate = 0.75;
        v2.play().catch(() => {});
        setActiveVideo(2);
        setTimeout(() => {
          isTransitioning = false;
        }, 1500);
      }
    };

    const handleTimeUpdate2 = () => {
      if (!v2.duration || isTransitioning) return;
      if (v2.currentTime >= v2.duration - 1.2) {
        isTransitioning = true;
        v1.currentTime = 0;
        v1.playbackRate = 0.75;
        v1.play().catch(() => {});
        setActiveVideo(1);
        setTimeout(() => {
          isTransitioning = false;
        }, 1500);
      }
    };

    v1.addEventListener("timeupdate", handleTimeUpdate1);
    v2.addEventListener("timeupdate", handleTimeUpdate2);

    return () => {
      v1.removeEventListener("timeupdate", handleTimeUpdate1);
      v2.removeEventListener("timeupdate", handleTimeUpdate2);
    };
  }, []);

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
    <section id="hero" className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-28 md:pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      {/* 🎬 1. Full-Width Background Video Layer (자연스럽고 화사하게 밝아진 화질) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={video1Ref}
          autoPlay
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover brightness-[1.04] contrast-[1.04] transition-opacity duration-1000 ease-in-out ${
            activeVideo === 1 ? "opacity-85" : "opacity-0"
          }`}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        <video
          ref={video2Ref}
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover brightness-[1.04] contrast-[1.04] transition-opacity duration-1000 ease-in-out ${
            activeVideo === 2 ? "opacity-85" : "opacity-0"
          }`}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Clean Soft Light Blend to Section Below */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-[#F8F9FC]" />
      </div>

      {/* 2. Soft Ambient Lighting */}
      <div className="ambient-glow bg-orange-500/10 top-1/4 left-1/2 -translate-x-1/2" />
      <div className="ambient-glow bg-blue-500/8 top-1/2 left-1/3" />

      {/* 3. Hero Centered Foreground with Generous Typography Scale */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Dynamic Live Badge */}
        <div className="inline-flex items-center space-x-2.5 px-5 py-2 rounded-full bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-sm mb-7 hover:border-slate-300 transition-all">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500" />
          </span>
          <span className="text-sm font-bold text-slate-800">
            수도권 30초 배차망
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-sm font-medium text-slate-600">
            {latestDispatch.area} · <span className="text-orange-600 font-extrabold">{latestDispatch.vehicle}</span> ({latestDispatch.status})
          </span>
        </div>

        {/* 🌟 이상적인 비율의 세련된 메인 헤드라인 (정말 약간만 더 크게 조율) */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 mb-6 leading-[1.12] break-keep drop-shadow-[0_2px_12px_rgba(255,255,255,0.9)]">
          급할 땐 고민 없이,<br />
          <span className="text-gradient-vermilion drop-shadow-none">가장 빠른 퀵서비스 드림델.</span>
        </h1>

        {/* 30초 배차 안전하고 빠른 배송 드림델 서브 카피 (가독성 높은 로열 블루 포인트) */}
        <p className="text-lg sm:text-xl md:text-2xl text-slate-800 font-semibold max-w-3xl mx-auto mb-10 leading-relaxed break-keep">
          오토바이 급행부터 다마스 · 라보 · 밴 · 트럭까지.<br className="hidden sm:inline" />
          지금 부르면 가장 가까운 전문 기사님의 <span className="text-blue-700 font-black drop-shadow-sm">30초 배차, 안전하고 빠른 배송 드림델</span>.
        </p>

        {/* 시원해진 메인 인터랙티브 CTA 버튼 */}
        <div className="flex items-center justify-center gap-3 mb-16">
          <button
            type="button"
            onClick={onQuote}
            className="btn-tactile-primary text-base sm:text-lg !py-4.5 !px-10 flex items-center justify-center space-x-3 shadow-[0_12px_30px_rgba(15,23,42,0.25)] active:scale-[0.98] transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none font-bold"
          >
            <span>실시간 요금 조회 (동대동 / 거리)</span>
            <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

        {/* 4. 4열 신뢰 지표 카드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
          <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-sm text-left hover:border-slate-300 hover:shadow-md transition-all">
            <div className="text-[11px] font-bold text-orange-600 mb-1 flex items-center space-x-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>30초 매칭</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
              24.8<span className="text-xs font-bold text-slate-500 ml-0.5">초</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">평균 배차 시간</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-sm text-left hover:border-slate-300 hover:shadow-md transition-all">
            <div className="text-[11px] font-bold text-emerald-600 mb-1 flex items-center space-x-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>정시 배송</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
              99.8<span className="text-xs font-bold text-slate-500 ml-0.5">%</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">도심 약속 준수</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-sm text-left hover:border-slate-300 hover:shadow-md transition-all">
            <div className="text-[11px] font-bold text-blue-600 mb-1 flex items-center space-x-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>책임 보험</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
              1<span className="text-xs font-bold text-slate-500 ml-0.5">억원</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">현대해상 정식가입</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-sm text-left hover:border-slate-300 hover:shadow-md transition-all">
            <div className="text-[11px] font-bold text-rose-600 mb-1 flex items-center space-x-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>상담 센터</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
              365<span className="text-xs font-bold text-slate-500 ml-0.5">일</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">24시간 친절 응대</div>
          </div>
        </div>
      </div>
    </section>
  );
}