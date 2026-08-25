"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface HeroSectionProps {
  onQuote?: () => void;
  onOpenDispatchModal?: () => void;
}

export default function HeroSection({ onQuote, onOpenDispatchModal }: HeroSectionProps) {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState<1 | 2>(1);

  // 1. 100% Seamless 60FPS Crossfading Video Loop
  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    const SPEED = 0.58;
    const FADE_DURATION_MS = 1800;
    const TRIGGER_BEFORE_END_SEC = 2.4;

    v1.playbackRate = SPEED;
    v2.playbackRate = SPEED;

    let isTransitioning = false;
    let animId: number;

    const checkLoop = () => {
      if (activeVideo === 1 && v1.duration && !isTransitioning) {
        if (v1.currentTime >= v1.duration - TRIGGER_BEFORE_END_SEC) {
          isTransitioning = true;
          v2.currentTime = 0;
          v2.playbackRate = SPEED;
          v2.play().catch(() => {});
          setActiveVideo(2);

          setTimeout(() => {
            if (v1) {
              v1.pause();
              v1.currentTime = 0;
            }
            isTransitioning = false;
          }, FADE_DURATION_MS + 200);
        }
      } else if (activeVideo === 2 && v2.duration && !isTransitioning) {
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

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const cards = [
    {
      tag: "01 COMPANY",
      title: "회사소개",
      descLine1: "1994년부터 이어온",
      descLine2: "운송 노하우",
      imageSrc: "/images/driver.jpg",
      actionText: "자세히 보기 ↓",
      actionType: "scroll",
      targetId: "company",
    },
    {
      tag: "02 BUSINESS",
      title: "사업영역",
      descLine1: "오토바이·차량·전국연계",
      descLine2: "기타 서비스까지",
      imageSrc: "/images/vehicles/bike.jpg",
      actionText: "자세히 보기 ↓",
      actionType: "scroll",
      targetId: "services",
    },
    {
      tag: "03 ORDER ↗",
      title: "오더접수",
      descLine1: "지금 바로 접수",
      descLine2: "실시간 배차",
      imageSrc: "/images/vehicles/damas.jpg",
      actionText: "접수하러 가기 ↗",
      actionType: "dispatch",
    },
    {
      tag: "04 CORPORATE",
      title: "법인서비스",
      descLine1: "월 정산·세금계산서",
      descLine2: "거래처 전용 조건",
      imageSrc: "/images/vehicles/truck.jpg",
      actionText: "자세히 보기 ↓",
      actionType: "scroll",
      targetId: "about",
    },
  ];

  const handleCardClick = (card: typeof cards[0]) => {
    if (card.actionType === "dispatch") {
      if (onOpenDispatchModal) onOpenDispatchModal();
    } else if (card.targetId) {
      scrollTo(card.targetId);
    }
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden pt-28 md:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-[#18181B]">
      {/* 🎬 1. Full-Width Background Video Layer (1.8초 스무스 크로스페이드 루프 - 선명한 비주얼 최적화) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={video1Ref}
          autoPlay
          muted
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover brightness-[0.95] contrast-[1.05] transition-opacity duration-[1800ms] ease-in-out ${
            activeVideo === 1 ? "opacity-90" : "opacity-0"
          }`}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        <video
          ref={video2Ref}
          muted
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover brightness-[0.95] contrast-[1.05] transition-opacity duration-[1800ms] ease-in-out ${
            activeVideo === 2 ? "opacity-90" : "opacity-0"
          }`}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Soft Tint Overlay (영상 생생함 극대화 + 텍스트 가독성 조화) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#12141A]/65 via-[#18181B]/35 to-[#18181B]/75" />
      </div>

      {/* ── Content Container (z-10) ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col justify-between h-full">
        {/* ── 2. Top Header & Title Area ── */}
        <div className="mb-8 sm:mb-10">
          <div className="text-xs sm:text-sm font-mono font-bold tracking-widest text-slate-400 uppercase mb-3 sm:mb-4">
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

        {/* ── 3. 4 Feature Cards Grid (X 표시 및 규격문구 제거, 세련된 카드 레이아웃) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8 sm:mb-10">
          {cards.map((card, idx) => (
            <div
              key={idx}
              onClick={() => handleCardClick(card)}
              className="group relative h-[340px] sm:h-[370px] md:h-[390px] rounded-2xl bg-white border border-slate-200/90 hover:border-orange-500 overflow-hidden flex flex-col justify-between p-6 sm:p-7 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
            >
              {/* Background Visual Layer (선명하게 보이도록 투명도 및 오버레이 최적화) */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={card.imageSrc}
                  alt={card.title}
                  fill
                  className="object-cover object-center opacity-65 group-hover:opacity-85 group-hover:scale-105 transition-all duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/45 to-white/90 group-hover:from-white/90 group-hover:via-white/25 group-hover:to-white/85 transition-colors" />
              </div>

              {/* Card Header (Tag, Title, Description) */}
              <div className="relative z-10">
                <div className="text-[11px] font-mono font-bold tracking-wider text-slate-600 uppercase mb-2">
                  {card.tag}
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mb-2 group-hover:text-orange-600 transition-colors drop-shadow-[0_1px_4px_rgba(255,255,255,0.9)]">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-800 leading-snug font-semibold drop-shadow-[0_1px_4px_rgba(255,255,255,0.9)]">
                  {card.descLine1}<br />
                  {card.descLine2}
                </p>
              </div>

              {/* Card Footer (Action Link with Hover Transition) */}
              <div className="relative z-10 pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <span className="font-black text-xs sm:text-sm text-slate-950 group-hover:text-orange-600 transition-colors inline-flex items-center space-x-1.5 drop-shadow-[0_1px_3px_rgba(255,255,255,0.8)]">
                  <span>{card.actionText}</span>
                </span>
                <span className="w-7 h-7 rounded-full bg-white/90 shadow-sm group-hover:bg-orange-50 text-slate-700 group-hover:text-orange-600 flex items-center justify-center text-xs font-bold transition-colors">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── 4. Bottom Badges (2 Pill/Box Badges) ── */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-4 py-2 rounded-lg bg-slate-900/90 border border-slate-700 text-slate-300 text-xs sm:text-sm font-medium">
            적재물배상책임보험 보상한도 5,000만원
          </div>
          <div className="px-4 py-2 rounded-lg bg-slate-900/90 border border-slate-700 text-slate-300 text-xs sm:text-sm font-medium">
            사랑의열매 &apos;착한가게&apos; 참여업체
          </div>
        </div>
      </div>
    </section>
  );
}