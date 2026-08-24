"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ClientLogos from "@/components/ClientLogos";
import ServiceCards from "@/components/ServiceCards";
import FloatingPriceModal from "@/components/FloatingPriceModal";
import DispatchModal from "@/components/DispatchModal";
import QuoteModal from "@/components/QuoteModal";
import Footer from "@/components/Footer";

export default function Home() {
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-900 selection:bg-orange-500 selection:text-white">
      {/* Floating Glass Navbar */}
      <Navbar
        navItems={[
          { href: "#order", label: "주문접수" },
          { href: "#services", label: "용달안내" },
          { href: "#about", label: "회사소개" },
          { href: "#clients", label: "주요고객" },
          { href: "#calculator", label: "견적문의" },
        ]}
        onOpenPriceModal={() => setIsPriceModalOpen(true)}
        onOpenDispatchModal={() => setIsDispatchModalOpen(true)}
        onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
      />

      <main>
        {/* 1. Hero Section */}
        <HeroSection
          onQuote={() => setIsPriceModalOpen(true)}
        />

        {/* 2. Fleet Specifications Section (용달안내) */}
        <section id="services" className="relative py-16 sm:py-24 border-t border-slate-200/80 overflow-hidden bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ServiceCards />
          </div>
        </section>

        {/* 3. Trust & Company Infrastructure Section (회사소개 - Bespoke 3-Column Bento Grid) */}
        <section id="about" className="relative py-20 sm:py-28 border-t border-slate-200/80 bg-[#F1F3F9] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header with Balanced Typography */}
            <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
              <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-orange-100 border border-orange-200 text-xs font-bold text-orange-600 mb-4 shadow-sm">
                <svg className="w-3.5 h-3.5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>신뢰와 안전의 드림델 인프라</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight sm:leading-tight break-keep">
                대한민국 비즈니스를 움직이는,<br className="hidden sm:inline" />
                <span className="text-gradient-vermilion">가장 든든한 물류 파트너.</span>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed break-keep max-w-2xl mx-auto font-medium">
                실시간 GPS 관제망과 현대해상 1억원 적재물 배상책임보험을 바탕으로, 급한 서류부터 대형 화물까지 가장 안전하고 정직하게 배송합니다.
              </p>
            </div>

            {/* Proportioned Bento Grid (3-Column Golden Ratio) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {/* Card 1: Large Anchor Card (보험 1억 보증) */}
              <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-105 transition-transform">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200 shadow-sm">
                      100% 정식 보험 가입
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-950 mb-2.5 tracking-tight">
                    현대해상 적재물 배상책임보험 1억 원 가입
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed break-keep max-w-xl font-normal">
                    모든 물품에 현대해상 정식 보험이 자동 적용됩니다. 소중한 계약서, 전자제품, 고가 화물까지 파손이나 분실 걱정 없이 100% 안심하고 맡기실 수 있습니다.
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2 font-medium">
                  <span className="font-mono font-bold text-slate-800">최고 보상한도: 100,000,000원</span>
                  <span className="text-orange-600 font-bold bg-orange-50 px-3 py-1 rounded-full border border-orange-200">증권번호: 2026-HD-001 ✓</span>
                </div>
              </div>

              {/* Card 2: 실시간 GPS 관제 */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 hover:border-emerald-300 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm group-hover:scale-105 transition-transform">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shadow-sm">
                      실시간 관제망
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-950 mb-2 tracking-tight">
                    실시간 GPS 안심 관제
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed break-keep">
                    기사님의 현재 위치와 실시간 이동 경로를 내 스마트폰으로 투명하게 확인하실 수 있습니다.
                  </p>
                </div>
                <div className="mt-6 pt-3.5 border-t border-slate-100 text-xs font-mono font-bold text-emerald-600 flex items-center justify-between">
                  <span>위치 오차 5m 이내 정밀 관제</span>
                  <span>● Live</span>
                </div>
              </div>

              {/* Card 3: 비대면 안심 사진 전송 */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 hover:border-orange-300 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 shadow-sm group-hover:scale-105 transition-transform">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="text-xs font-bold text-orange-700 bg-orange-50 px-3 py-1 rounded-full border border-orange-200 shadow-sm">
                      카카오 알림톡
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-950 mb-2 tracking-tight">
                    비대면 안심 사진 전송
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed break-keep">
                    배송 완료 즉시 현장 사진과 인수증 서명을 카카오 알림톡으로 전송해 안도감을 드립니다.
                  </p>
                </div>
                <div className="mt-6 pt-3.5 border-t border-slate-100 text-xs text-slate-500 font-medium">
                  완료 즉시 3초 내 자동 발송
                </div>
              </div>

              {/* Card 4: 기업 회원 혜택 */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 hover:border-purple-300 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shadow-sm group-hover:scale-105 transition-transform">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200 shadow-sm">
                      B2B 파트너십
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-950 mb-2 tracking-tight">
                    기업 회원 전용 혜택
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed break-keep">
                    전자세금계산서 간편 월합산 발행과 기업 전용 할인 운임 계약을 친절히 지원합니다.
                  </p>
                </div>
                <div className="mt-6 pt-3.5 border-t border-slate-100 text-xs text-slate-500 font-medium">
                  월 정산 / 후불 결제 상담 가능
                </div>
              </div>

              {/* Card 5: 핵심 지표 카드 (하이라이트 다크 엑센트) */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white border border-slate-700 flex flex-col justify-between shadow-2xl">
                <div>
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">
                    <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    <span>검증된 물류 파트너</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 my-2">
                    <div>
                      <div className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tight">10,000+</div>
                      <div className="text-[11px] text-slate-400 mt-1">월간 배송 완료</div>
                    </div>
                    <div>
                      <div className="text-3xl sm:text-4xl font-black font-mono text-amber-400 tracking-tight">99.8%</div>
                      <div className="text-[11px] text-slate-400 mt-1">약속 시간 준수</div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-3.5 border-t border-white/10 text-xs text-slate-400">
                  평균 배차 시간: <span className="text-white font-mono font-bold">8.4초</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Major Clients & B2B Partners Section (회사소개 바로 밑 주요 고객사) */}
        <ClientLogos />
      </main>

      {/* 4. Dual Floating Sticky Action Buttons & Mobile Action Dock */}
      <FloatingPriceModal
        isOpen={isPriceModalOpen}
        onOpen={() => setIsPriceModalOpen(true)}
        onClose={() => setIsPriceModalOpen(false)}
        onOpenDispatchModal={() => setIsDispatchModalOpen(true)}
      />

      {/* 5. Embedded Live Dispatch Modal */}
      <DispatchModal
        isOpen={isDispatchModalOpen}
        onClose={() => setIsDispatchModalOpen(false)}
      />

      {/* 6. Custom B2B & Freight Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />

      {/* 7. Footer */}
      <Footer
        onContact={() => scrollTo("about")}
        onOpenPriceModal={() => setIsPriceModalOpen(true)}
      />
    </div>
  );
}