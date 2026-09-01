"use client";

import Image from "next/image";
import { type PointerEvent as ReactPointerEvent, useEffect, useRef, useState } from "react";
import DispatchModal from "@/components/DispatchModal";
import PrivacyPolicyModal from "@/components/PrivacyPolicyModal";

type PageId = "home" | "company" | "services" | "corporate" | "driver" | "contact";

type ServiceId = "bike" | "vehicle" | "nationwide" | "custom";

const pages: Array<{ id: PageId; label: string; dark: boolean }> = [
  { id: "home", label: "드림델", dark: true },
  { id: "company", label: "회사소개", dark: false },
  { id: "services", label: "사업영역", dark: true },
  { id: "corporate", label: "법인서비스", dark: false },
  { id: "driver", label: "기사모집", dark: true },
  { id: "contact", label: "문의하기", dark: false },
];

const heroCards: Array<{ number: string; title: string; description: string; image: string; target: PageId | "dispatch" }> = [
  { number: "01", title: "회사소개", description: "운송의 기본을 지켜온 시간", image: "/images/vehicles/van.jpg", target: "company" },
  { number: "02", title: "사업영역", description: "퀵·화물·전국연계 안내", image: "/images/vehicles/bike.jpg", target: "services" },
  { number: "03", title: "법인서비스", description: "반복 운송 상담과 운영 안내", image: "/images/vehicles/truck.jpg", target: "corporate" },
  { number: "04", title: "기사모집", description: "퀵·화물 기사 지원 상담", image: "/images/driver.jpg", target: "driver" },
  { number: "05", title: "인터넷간편접수", description: "로그인 후 접수 진행", image: "/images/vehicles/damas.jpg", target: "dispatch" },
];

const corporateBrands = ["LesMore", "DKNY", "EXR", "TOD'S", "YSL", "Brioni", "DreamCIS", "Häagen-Dazs", "TOM FORD", "CJ홈쇼핑", "LIG손해보험", "삼양"];

const services: Record<ServiceId, { label: string; eyebrow: string; title: string; description: string; detail: string; facts: string[]; image: string }> = {
  bike: {
    label: "오토바이",
    eyebrow: "MOTORCYCLE DELIVERY",
    title: "가장 빠르게 가장 가볍게",
    description: "서류와 소형 패키지를 위한 도심 퀵서비스입니다",
    detail: "서울·경기·인천 권역의 긴급 배송은 접수 시 운송 가능 여부와 예상 시간을 안내합니다",
    facts: ["서울·경기·인천", "최대 20kg 이내", "3면 합 120cm 이내"],
    image: "/images/vehicles/bike.jpg",
  },
  vehicle: {
    label: "차량화물",
    eyebrow: "VEHICLE FREIGHT",
    title: "물품 크기에 맞춘 차량 배차",
    description: "다마스·라보·밴·트럭 등 운송 조건에 맞춰 안내합니다",
    detail: "가전·가구·박스 화물은 중량과 상하차 조건을 확인한 뒤 상담으로 배차합니다",
    facts: ["다마스·라보·밴", "1톤~11톤 화물", "상하차 조건 상담"],
    image: "/images/vehicles/damas.jpg",
  },
  nationwide: {
    label: "전국연계",
    eyebrow: "NATIONWIDE NETWORK",
    title: "전국 당일 연결을 위한 선택지",
    description: "KTX·고속버스·항공 연계 가능 여부를 상담으로 확인합니다",
    detail: "출발·도착 지역과 마감 시간 및 물품 조건에 따라 가능한 운송 수단을 제안합니다",
    facts: ["KTX·고속버스·항공", "마감 시간 확인", "연결 가능 여부 상담"],
    image: "/images/vehicles/van.jpg",
  },
  custom: {
    label: "맞춤운송",
    eyebrow: "CUSTOM LOGISTICS",
    title: "정해진 방식보다 맞는 방식으로",
    description: "예약·다중 경유·상하차 지원이 필요한 운송을 상담합니다",
    detail: "현장 조건과 일정에 맞춘 운송 계획은 고객센터에서 확인할 수 있습니다",
    facts: ["예약 운송", "다중 경유", "현장 조건 확인"],
    image: "/images/vehicles/truck.jpg",
  },
};

function OnlineOrderIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M3 9h18" />
      <path d="M6.5 6.5h.01M9 6.5h.01" />
      <path d="M7 13h5M7 16h3" />
      <path d="m14.5 15 1.7 1.7 3.3-3.7" />
    </svg>
  );
}

export default function FullPageHome() {
  const containerRef = useRef<HTMLElement>(null);
  const heroRailRef = useRef<HTMLDivElement>(null);
  const heroRailDragRef = useRef({ pointerId: -1, startX: 0, startScrollLeft: 0, moved: false });
  const heroRailMomentumRef = useRef({ frameId: 0, velocity: 0, lastX: 0, lastMoveTime: 0 });
  const heroRailClickBlockRef = useRef(0);
  const [activePage, setActivePage] = useState<PageId>("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [serviceId, setServiceId] = useState<ServiceId>("bike");
  const [isHeroRailDragging, setIsHeroRailDragging] = useState(false);

  const activeIndex = pages.findIndex((page) => page.id === activePage);
  const activeTheme = pages[activeIndex]?.dark ? "dark" : "light";
  const selectedService = services[serviceId];


  const scrollToPage = (id: PageId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsMenuOpen(false);
  };

  const handleHeroCard = (target: PageId | "dispatch") => {
    if (target === "dispatch") {
      setIsDispatchModalOpen(true);
      return;
    }

    scrollToPage(target);
  };

  const stopHeroRailMomentum = () => {
    const momentum = heroRailMomentumRef.current;
    if (momentum.frameId) {
      cancelAnimationFrame(momentum.frameId);
      momentum.frameId = 0;
    }
    momentum.velocity = 0;
  };

  const moveHeroCards = (direction: -1 | 1) => {
    const rail = heroRailRef.current;
    if (!rail) return;

    stopHeroRailMomentum();

    const firstCard = rail.querySelector<HTMLElement>("[data-hero-card]");
    const cardStep = (firstCard?.offsetWidth ?? rail.clientWidth) + 16;
    const maxScrollLeft = Math.max(0, rail.scrollWidth - rail.clientWidth);
    const isAtStart = rail.scrollLeft <= 2;
    const isAtEnd = rail.scrollLeft >= maxScrollLeft - 2;
    const nextLeft = direction > 0
      ? isAtEnd ? 0 : Math.min(maxScrollLeft, rail.scrollLeft + cardStep)
      : isAtStart ? maxScrollLeft : Math.max(0, rail.scrollLeft - cardStep);

    rail.scrollTo({ left: nextLeft, behavior: "smooth" });
  };

  const startHeroRailDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    const rail = heroRailRef.current;
    if (!rail) return;

    stopHeroRailMomentum();

    heroRailDragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: rail.scrollLeft,
      moved: false,
    };
    heroRailMomentumRef.current.lastX = event.clientX;
    heroRailMomentumRef.current.lastMoveTime = performance.now();
    setIsHeroRailDragging(true);
  };

  const dragHeroRail = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rail = heroRailRef.current;
    const drag = heroRailDragRef.current;
    if (!rail || drag.pointerId !== event.pointerId) return;

    const distance = event.clientX - drag.startX;
    const momentum = heroRailMomentumRef.current;
    const now = performance.now();
    const elapsed = now - momentum.lastMoveTime;
    if (elapsed > 0) {
      const instantVelocity = -(event.clientX - momentum.lastX) / elapsed;
      momentum.velocity = momentum.velocity * 0.55 + instantVelocity * 0.45;
      momentum.lastX = event.clientX;
      momentum.lastMoveTime = now;
    }
    if (Math.abs(distance) > 4) {
      if (!drag.moved) {
        rail.setPointerCapture(event.pointerId);
      }
      drag.moved = true;
      event.preventDefault();
    }
    rail.scrollLeft = drag.startScrollLeft - distance;
  };

  const endHeroRailDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rail = heroRailRef.current;
    const drag = heroRailDragRef.current;
    if (!rail || drag.pointerId !== event.pointerId) return;

    if (rail.hasPointerCapture(event.pointerId)) {
      rail.releasePointerCapture(event.pointerId);
    }
    if (drag.moved) {
      heroRailClickBlockRef.current = Date.now() + 200;
    }
    heroRailDragRef.current.pointerId = -1;
    setIsHeroRailDragging(false);

    const momentum = heroRailMomentumRef.current;
    const releasedSoonAfterMoving = performance.now() - momentum.lastMoveTime < 80;
    if (!drag.moved || !releasedSoonAfterMoving || Math.abs(momentum.velocity) < 0.04) return;

    let previousTime = performance.now();
    const glide = (time: number) => {
      const elapsed = Math.min(time - previousTime, 32);
      previousTime = time;
      const previousLeft = rail.scrollLeft;
      rail.scrollLeft += momentum.velocity * elapsed;
      momentum.velocity *= Math.pow(0.92, elapsed / (1000 / 60));

      const reachedEdge = Math.abs(rail.scrollLeft - previousLeft) < 0.01;
      if (reachedEdge || Math.abs(momentum.velocity) < 0.02) {
        momentum.frameId = 0;
        momentum.velocity = 0;
        return;
      }
      momentum.frameId = requestAnimationFrame(glide);
    };

    momentum.frameId = requestAnimationFrame(glide);
  };

  useEffect(() => () => {
    const frameId = heroRailMomentumRef.current.frameId;
    if (frameId) cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateActivePage = () => {
      const pageNodes = Array.from(container.querySelectorAll<HTMLElement>("[data-page]"));
      const viewportCenter = container.scrollTop + container.clientHeight * 0.45;
      const nearestPage = pageNodes.reduce((nearest, page) => {
        return Math.abs(page.offsetTop - viewportCenter) < Math.abs(nearest.offsetTop - viewportCenter) ? page : nearest;
      }, pageNodes[0]);

      if (nearestPage?.dataset.page) {
        setActivePage(nearestPage.dataset.page as PageId);
      }
    };

    container.addEventListener("scroll", updateActivePage, { passive: true });
    updateActivePage();
    return () => container.removeEventListener("scroll", updateActivePage);
  }, []);

  return (
    <div className="relative h-[100svh] overflow-hidden bg-slate-950">
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-5">
        <div className="pointer-events-auto mx-auto max-w-7xl">
          <div
            className={`flex w-full min-w-0 items-center justify-between rounded-2xl border px-3 py-2.5 shadow-2xl backdrop-blur-xl transition-all duration-500 sm:px-5 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] ${
              activeTheme === "dark"
                ? "border-white/15 bg-slate-950/55 text-white shadow-slate-950/30"
                : "border-slate-200/90 bg-white/85 text-slate-950 shadow-slate-900/10"
            }`}
          >
            <button type="button" onClick={() => scrollToPage("home")} className="group shrink-0 px-1 text-left leading-none lg:col-start-1 lg:justify-self-start" aria-label="드림델 첫 화면으로 이동">
              <span className={`relative inline-block text-xl font-black tracking-[-0.09em] transition-colors sm:text-2xl lg:text-3xl ${activeTheme === "dark" ? "text-white" : "text-slate-950"}`}>
                드림델
                <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-90 rounded-full bg-orange-500 transition-transform group-hover:scale-x-100" />
              </span>
              <span className={`mt-1.5 block text-[7px] font-black tracking-[0.18em] transition-colors sm:text-[8px] ${activeTheme === "dark" ? "text-slate-200" : "text-slate-600"}`}>QUICK · FREIGHT</span>
            </button>

            <nav className="hidden items-center gap-1 lg:col-start-2 lg:flex lg:justify-self-center" aria-label="주요 메뉴">
              {pages.slice(1).map((page) => (
                <button
                  key={page.id}
                  type="button"
                  onClick={() => scrollToPage(page.id)}
                  className={`rounded-full px-3 py-2 text-base font-bold transition-colors ${
                    activePage === page.id
                      ? activeTheme === "dark"
                        ? "bg-white text-slate-950"
                        : "bg-slate-950 text-white"
                      : activeTheme === "dark"
                        ? "text-slate-200 hover:bg-white/10 hover:text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                >
                  {page.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2.5 lg:col-start-3 lg:justify-self-end">
              <a
                href="tel:1588-5452"
                className={`hidden text-right font-black leading-none sm:block ${activeTheme === "dark" ? "text-white" : "text-slate-950"}`}
              >
                <span className={`block text-xs font-bold ${activeTheme === "dark" ? "text-slate-200" : "text-slate-500"}`}>24시 접수</span>
                <span className="mt-1 block text-base tracking-[-0.02em] lg:text-lg">1588-5452</span>
              </a>
              <button
                type="button"
                onClick={() => setIsDispatchModalOpen(true)}
                className="hidden items-center gap-2 rounded-lg border border-blue-300 bg-blue-600 px-3.5 py-2.5 text-xs font-black text-white shadow-lg shadow-blue-950/30 transition-colors hover:bg-blue-700 sm:inline-flex"
              >
                <OnlineOrderIcon className="h-[18px] w-[18px] text-white" />
                인터넷 간편접수
              </button>
              <button
                type="button"
                onClick={() => setIsMenuOpen((open) => !open)}
                aria-expanded={isMenuOpen}
                aria-label="메뉴 열기"
                className={`grid h-10 w-10 place-items-center rounded-xl lg:hidden ${activeTheme === "dark" ? "bg-white/10 text-white" : "bg-slate-100 text-slate-950"}`}
              >
                <span className="text-lg leading-none">{isMenuOpen ? "×" : "☰"}</span>
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <nav
            className={`pointer-events-auto mx-auto mt-2 max-w-7xl rounded-2xl border p-2 shadow-2xl backdrop-blur-xl lg:hidden ${
              activeTheme === "dark" ? "border-white/15 bg-slate-950/95" : "border-slate-200 bg-white/95"
            }`}
            aria-label="모바일 주요 메뉴"
          >
            {pages.slice(1).map((page) => (
              <button
                key={page.id}
                type="button"
                onClick={() => scrollToPage(page.id)}
                className={`block w-full rounded-xl px-4 py-3 text-left text-sm font-bold ${
                  activeTheme === "dark" ? "text-white hover:bg-white/10" : "text-slate-900 hover:bg-slate-100"
                }`}
              >
                {page.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      <main ref={containerRef} className="h-[100svh] snap-y snap-mandatory overflow-y-auto scroll-smooth" aria-label="드림델 소개">
        <section id="home" data-page="home" className="relative h-[100svh] snap-start overflow-hidden bg-slate-950 text-white">
          <video autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover opacity-60">
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(249,115,22,0.28),transparent_30%),linear-gradient(90deg,rgba(2,6,23,0.92),rgba(2,6,23,0.46),rgba(2,6,23,0.32))]" />
          <div className="relative flex h-full flex-col justify-center gap-5 pb-7 pt-24 sm:pt-28">
            <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
              <p className="font-mono text-[10px] font-bold tracking-[0.22em] text-orange-300 sm:text-xs">DREAMDEL / DELIVERY NETWORK</p>
              <div className="mt-2 flex flex-wrap items-end gap-x-5 gap-y-3">
                <h1 className="text-3xl font-black leading-[1.04] tracking-[-0.06em] sm:text-4xl lg:text-5xl">
                  운송을 고르는<br />
                  <span className="text-orange-400">가장 빠른 방법</span>
                </h1>
                <span className="mb-0.5 inline-block whitespace-nowrap text-3xl font-black leading-none tracking-[-0.12em] text-white [text-shadow:0_0_28px_rgba(251,146,60,0.82)] sm:text-4xl lg:text-5xl">드림델</span>
              </div>
            </div>

            <div className="w-full">
              <div className="mx-auto mb-3 flex max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
                <p className="text-xs font-black tracking-[0.18em] text-slate-200">DREAMDEL SERVICES</p>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => moveHeroCards(-1)} className="grid h-10 w-10 place-items-center rounded-full border border-white/25 bg-slate-950/55 text-xl font-black text-white transition hover:border-orange-300 hover:bg-orange-500" aria-label="이전 카드 보기">‹</button>
                  <button type="button" onClick={() => moveHeroCards(1)} className="grid h-10 w-10 place-items-center rounded-full border border-white/25 bg-slate-950/55 text-xl font-black text-white transition hover:border-orange-300 hover:bg-orange-500" aria-label="다음 카드 보기">›</button>
                </div>
              </div>

              <div
                ref={heroRailRef}
                onPointerDown={startHeroRailDrag}
                onPointerMove={dragHeroRail}
                onPointerUp={endHeroRailDrag}
                onPointerCancel={endHeroRailDrag}
                className={`hero-card-rail flex gap-4 overflow-x-auto px-5 pb-2 pt-1 select-none touch-pan-y sm:px-8 lg:px-12 ${
                  isHeroRailDragging ? "cursor-grabbing" : "cursor-grab"
                }`}
              >
                {heroCards.map((card) => (
                  <button
                    key={card.number}
                    data-hero-card
                    type="button"
                    onClick={() => {
                      if (Date.now() >= heroRailClickBlockRef.current) {
                        handleHeroCard(card.target);
                      }
                    }}
                    className="group relative h-72 w-72 shrink-0 overflow-hidden rounded-3xl border border-white/20 bg-slate-800 p-6 text-left shadow-2xl shadow-slate-950/50 transition duration-500 hover:-translate-y-2 hover:border-orange-300 sm:h-80 sm:w-80 lg:h-96 lg:w-96"
                  >
                    <Image src={card.image} alt="" fill className="object-cover opacity-100 transition duration-700 group-hover:scale-105" sizes="(max-width: 640px) 288px, (max-width: 1024px) 320px, 384px" />
                    <span className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/10 to-slate-950/90" />
                    <span className="relative block text-[10px] font-black tracking-[0.18em] text-orange-200">DREAMDEL</span>
                    <div className="absolute inset-x-6 bottom-6">
                      <span className="block text-3xl font-black leading-tight tracking-[-0.06em] text-white [text-shadow:0_2px_14px_rgba(15,23,42,0.95)] sm:text-4xl">{card.title}</span>
                      <span className="mt-3 block max-w-[18ch] text-base font-bold leading-relaxed text-white">{card.description}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsDispatchModalOpen(true)}
            className="fixed bottom-10 right-10 z-30 inline-flex items-center gap-2.5 rounded-xl border border-blue-300 bg-blue-600 px-4.5 py-3.5 text-sm font-black text-white shadow-xl shadow-blue-950/35 transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:bottom-12 sm:right-14"
          >
            <OnlineOrderIcon className="h-5 w-5 text-white" />
            인터넷 간편접수
          </button>
        </section>

        <section id="company" data-page="company" className="flex h-[100svh] snap-start items-center overflow-hidden bg-[#f4f6f8] px-5 py-24 text-slate-950 sm:px-8 lg:px-12">
          <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <p className="text-xs font-black tracking-[0.2em] text-orange-600">01 / COMPANY</p>
              <h2 className="mt-4 max-w-3xl text-4xl font-black leading-[1.08] tracking-[-0.055em] sm:text-6xl">1994년부터<br />운송의 기본을 지켜왔습니다</h2>
              <p className="mt-6 max-w-2xl text-sm font-medium leading-relaxed text-slate-600 sm:text-lg">1994년 설립 이후 퀵서비스부터 차량화물·전국연계 운송까지 다뤄왔으며 운송 수단·출발지·도착지·현장 조건을 먼저 확인해 가능한 운송 방식을 안내합니다</p>
              <button type="button" onClick={() => scrollToPage("contact")} className="mt-7 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800">상담 창구 확인 →</button>
            </div>
            <div className="grid grid-cols-2 gap-3 self-end sm:gap-4">
              <div className="col-span-2 rounded-2xl bg-slate-950 p-5 text-white sm:p-7">
                <p className="text-xs font-bold tracking-[0.18em] text-slate-400">OPERATING SINCE</p>
                <p className="mt-3 text-5xl font-black tracking-[-0.06em] sm:text-7xl">1994</p>
                <p className="mt-3 text-sm font-medium text-slate-300">서울·경기 중심 운송 상담 및 배차 안내</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6"><p className="text-[11px] font-black tracking-widest text-slate-400">INSURANCE</p><p className="mt-3 text-lg font-black sm:text-2xl">5000만원</p><p className="mt-1 text-xs font-medium text-slate-500">적재물배상책임보험 보상한도</p></div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6"><p className="text-[11px] font-black tracking-widest text-slate-400">NATIONWIDE</p><p className="mt-3 text-lg font-black sm:text-2xl">KTX · 항공</p><p className="mt-1 text-xs font-medium text-slate-500">전국 연계 가능 여부 상담</p></div>
              <a href="https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%20%EA%B0%95%EB%82%A8%EA%B5%AC%20%EB%85%BC%ED%98%84%EB%8F%99%20114-14" target="_blank" rel="noreferrer" className="col-span-2 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-orange-300 sm:p-5"><p className="text-[11px] font-black tracking-widest text-slate-400">SEOUL HEAD OFFICE</p><p className="mt-2 text-sm font-black sm:text-base">서울 강남구 논현동 114-14 · 금산빌딩 4층</p><p className="mt-1 text-xs font-medium text-slate-500">학동역 10번 출구 도보 3분 · 네이버 지도 열기 →</p></a>
            </div>
          </div>
        </section>

        <section id="services" data-page="services" className="relative flex h-[100svh] snap-start items-center overflow-hidden bg-slate-950 px-5 py-24 text-white sm:px-8 lg:px-12">
          <div className="absolute inset-y-0 right-0 hidden w-1/2 opacity-40 lg:block">
            <Image src={selectedService.image} alt="" fill className="object-cover" sizes="50vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent" />
          </div>
          <div className="relative mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <p className="text-xs font-black tracking-[0.2em] text-orange-300">02 / SERVICES</p>
              <h2 className="mt-4 text-4xl font-black leading-[1.08] tracking-[-0.055em] sm:text-6xl">보내야 할 것이<br />무엇이든</h2>
              <div className="mt-7 grid grid-cols-2 gap-2">
                {(Object.keys(services) as ServiceId[]).map((id) => (
                  <button key={id} type="button" onClick={() => setServiceId(id)} className={`rounded-xl border px-4 py-3 text-left text-sm font-black transition ${serviceId === id ? "border-orange-400 bg-orange-500 text-white" : "border-white/15 bg-white/5 text-slate-200 hover:bg-white/10"}`}>{services[id].label}</button>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-end rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl sm:p-9 lg:min-h-[440px]">
              <p className="text-xs font-black tracking-[0.18em] text-orange-300">{selectedService.eyebrow}</p>
              <h3 className="mt-4 max-w-xl text-3xl font-black leading-tight tracking-[-0.045em] sm:text-5xl">{selectedService.title}</h3>
              <p className="mt-5 max-w-xl text-base font-bold text-slate-100 sm:text-lg">{selectedService.description}</p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300">{selectedService.detail}</p>
              <div className="mt-6 flex flex-wrap gap-2">{selectedService.facts.map((fact) => <span key={fact} className="rounded-full border border-white/20 bg-slate-950/35 px-3 py-1.5 text-xs font-bold text-slate-100">{fact}</span>)}</div>
              <div className="mt-8 flex flex-wrap gap-3"><a href="tel:1588-5452" className="rounded-full border border-white/30 px-5 py-3 text-sm font-black text-white hover:bg-white/10">전화 상담 1588-5452</a></div>
            </div>
          </div>
        </section>

        <section id="corporate" data-page="corporate" className="flex h-[100svh] snap-start items-center overflow-hidden bg-white px-5 py-24 text-slate-950 sm:px-8 lg:px-12">
          <div className="mx-auto w-full max-w-7xl">
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><p className="text-xs font-black tracking-[0.2em] text-orange-600">03 / CORPORATE</p><h2 className="mt-4 text-4xl font-black tracking-[-0.055em] sm:text-6xl">기업 물류를<br />더 단순하게</h2></div><p className="max-w-md text-sm font-medium leading-relaxed text-slate-600 sm:text-base">정기 운송 반복 배차 월 단위 정산은 조건을 먼저 확인한 뒤 담당자가 맞춤으로 안내합니다</p></div>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {[
                ["01", "기업 전용 단가 상담", "정기 물량과 주요 노선 기준 안내"],
                ["02", "월 통합 정산", "세금계산서·상세 명세서 발행 여부 상담"],
                ["03", "다건 접수 운영", "PC·모바일 접수와 운영 절차 안내"],
                ["04", "적재물 보험 안내", "보장 범위와 운송 조건을 먼저 확인"],
              ].map(([number, title, copy]) => <div key={number} className="min-h-40 rounded-2xl border border-slate-200 bg-[#f4f6f8] p-4 sm:min-h-52 sm:p-6"><p className="text-xs font-black text-orange-600">{number}</p><h3 className="mt-7 text-lg font-black tracking-[-0.035em] sm:text-2xl">{title}</h3><p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">{copy}</p></div>)}
            </div>
            <div className="mt-5 rounded-2xl border border-slate-200 bg-[#f8f9fc] p-4 sm:px-5 sm:py-4">
              <p className="text-xs font-black tracking-[0.16em] text-slate-500">주요 브랜드 · CORPORATE PARTNERS</p>
              <div className="mt-3 grid grid-cols-3 gap-x-3 gap-y-2 sm:grid-cols-6 lg:grid-cols-12">{corporateBrands.map((brand) => <span key={brand} className="whitespace-nowrap text-center text-xs font-black tracking-[-0.04em] text-slate-700 sm:text-sm">{brand}</span>)}</div>
            </div>
            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-slate-950 p-5 text-white sm:px-7"><div><p className="text-sm font-black">법인 계약 상담이 필요하신가요</p><p className="mt-1 text-xs text-slate-300">정기 물량과 주요 운송 노선을 알려주시면 확인 후 안내합니다</p></div><a href="tel:1588-5452" className="rounded-full bg-orange-500 px-5 py-3 text-sm font-black hover:bg-orange-600">법인 상담 1588-5452</a></div>
          </div>
        </section>

        <section id="driver" data-page="driver" className="relative flex h-[100svh] snap-start items-center overflow-hidden bg-[#111827] px-5 py-24 text-white sm:px-8 lg:px-12">
          <Image src="/images/driver.jpg" alt="운송 기사" fill className="object-cover opacity-35" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/30" />
          <div className="relative mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div><p className="text-xs font-black tracking-[0.2em] text-orange-300">04 / DRIVER NETWORK</p><h2 className="mt-4 text-4xl font-black leading-[1.08] tracking-[-0.055em] sm:text-6xl">함께 달릴<br />기사님을 찾습니다</h2><p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-lg">오토바이 퀵·차량 화물 운송을 희망하는 기사님은 고객센터를 통해 활동 지역과 차량 조건을 먼저 상담할 수 있습니다</p><a href="tel:1588-5452" className="mt-7 inline-flex rounded-full bg-orange-500 px-5 py-3 text-sm font-black text-white hover:bg-orange-600">기사 지원 상담 1588-5452</a></div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">{[["운송 조건 상담", "활동 권역과 차량 조건을 먼저 확인"], ["운영 안내", "배차·정산 관련 절차를 상담으로 안내"], ["안전 운행", "운송 전 필요한 사항을 확인"]].map(([title, copy]) => <div key={title} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-lg sm:p-5"><h3 className="text-base font-black">{title}</h3><p className="mt-2 text-xs leading-relaxed text-slate-300">{copy}</p></div>)}</div>
          </div>
        </section>

        <section id="contact" data-page="contact" className="flex h-[100svh] snap-start items-center overflow-hidden bg-[#f4f6f8] px-5 py-24 text-slate-950 sm:px-8 lg:px-12">
          <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div><p className="text-xs font-black tracking-[0.2em] text-orange-600">05 / CONTACT</p><h2 className="mt-4 text-4xl font-black leading-[1.08] tracking-[-0.055em] sm:text-6xl">운송 전<br />먼저 확인하세요</h2><p className="mt-5 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-lg">정확한 요금·배차 가능 여부·보험 보장 범위는 물품과 운송 조건에 따라 달라질 수 있어 고객센터 확인 후 접수해 주세요</p><div className="mt-7 flex flex-wrap gap-3"><a href="tel:1588-5452" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white hover:bg-slate-800">전화 상담 1588-5452</a></div></div>
            <div className="self-end rounded-3xl bg-white p-6 shadow-xl shadow-slate-900/10 sm:p-8"><p className="text-xs font-black tracking-[0.16em] text-slate-400">드림델 안내</p><dl className="mt-6 space-y-4 text-sm"><div className="flex justify-between gap-6 border-b border-slate-100 pb-3"><dt className="font-bold text-slate-500">대표 접수</dt><dd className="font-black">1588-5452</dd></div><div className="flex justify-between gap-6 border-b border-slate-100 pb-3"><dt className="font-bold text-slate-500">고객만족센터</dt><dd className="font-black">02-3446-7668</dd></div><div className="flex justify-between gap-6 border-b border-slate-100 pb-3"><dt className="font-bold text-slate-500">주소</dt><dd className="text-right font-bold">서울 강남구 논현동 114-14<br />금산빌딩 4층</dd></div></dl><button type="button" onClick={() => setIsPrivacyOpen(true)} className="mt-6 text-xs font-bold text-slate-600 underline underline-offset-4 hover:text-slate-950">개인정보처리방침</button><p className="mt-4 text-[11px] text-slate-400">© DREAMDEL All rights reserved</p></div>
          </div>
        </section>
      </main>

      <DispatchModal isOpen={isDispatchModalOpen} onClose={() => setIsDispatchModalOpen(false)} />
      <PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </div>
  );
}
