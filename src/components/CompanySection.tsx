"use client";

import { useState } from "react";
import Image from "next/image";

interface CompanySectionProps {
  onQuote?: () => void;
}

export default function CompanySection({ onQuote }: CompanySectionProps) {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText("서울 강남구 논현동 114-14 금산빌딩 4층");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="company"
      data-fullpage-section
      className="scroll-mt-14 relative overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#F1F5F9] pt-16 pb-10 sm:pt-20 sm:pb-12 lg:py-0 lg:flex lg:min-h-[100svh] lg:snap-start lg:snap-always lg:items-center text-slate-900 selection:bg-orange-500 selection:text-white"
    >
      {/* ── Top Technical Border Line ── */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/25 to-transparent pointer-events-none" />

      {/* ── Atmospheric Ambient Lighting ── */}
      <div className="absolute -top-32 -right-32 w-[550px] h-[450px] rounded-full bg-orange-400/8 blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[550px] h-[450px] rounded-full bg-blue-500/6 blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-2 sm:py-3 lg:py-0 lg:-translate-y-6">
        {/* ── Section Header (시원하고 또렷한 헤드라인) ── */}
        <div className="mb-5 sm:mb-6 lg:mb-7">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-950 tracking-tight leading-[1.2] break-keep">
              30년 신뢰의 도심 퀵서비스,{" "}
              <span className="text-orange-600 font-black">
                드림델
              </span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 font-medium break-keep">
              수도권 10분 내 신속 배차부터 전국 당일 연계 특송까지 지원합니다.
            </p>
          </div>
        </div>

        {/* ── Two-Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* ── Left Column: 3 핵심 강점 & 기업 인증 (7 cols) ── */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
            {/* 3 Core Highlights: Editorial Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {/* Card 1: 10분 배차 */}
              <div className="relative p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-orange-500/80 hover:shadow-md transition-all duration-200 group flex flex-col justify-between overflow-hidden">
                {/* Big Metric Display */}
                <div className="mb-2">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-3xl sm:text-4xl font-black text-slate-950 tracking-tight group-hover:text-orange-600 transition-colors">
                      10
                    </span>
                    <span className="text-base sm:text-lg font-bold text-slate-900">
                      분 내 배차
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-[13px] text-slate-600 font-medium leading-relaxed break-keep">
                  수도권 전역 1,200대 기사 실시간 최단거리 배차
                </p>
              </div>

              {/* Card 2: 5천만원 책임보상 */}
              <div className="relative p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-blue-500/80 hover:shadow-md transition-all duration-200 group flex flex-col justify-between overflow-hidden">
                {/* Big Metric Display */}
                <div className="mb-2">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-3xl sm:text-4xl font-black text-slate-950 tracking-tight group-hover:text-blue-600 transition-colors">
                      5,000
                    </span>
                    <span className="text-base sm:text-lg font-bold text-slate-900">
                      만 책임보상
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-[13px] text-slate-600 font-medium leading-relaxed break-keep">
                  현대해상 적재물 배상책임보험 최대 5,000만원 보장
                </p>
              </div>

              {/* Card 3: 기업 후불 정산 */}
              <div className="relative p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-800 hover:shadow-md transition-all duration-200 group flex flex-col justify-between overflow-hidden">
                {/* Big Metric Display */}
                <div className="mb-2">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-2xl sm:text-3xl font-black text-slate-950 tracking-tight group-hover:text-slate-700 transition-colors">
                      월 1회
                    </span>
                    <span className="text-base sm:text-lg font-bold text-slate-900">
                      후불 정산
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-[13px] text-slate-600 font-medium leading-relaxed break-keep">
                  월말 합산 전자세금계산서 발행 및 전담 배차 담당자 배정
                </p>
              </div>
            </div>

            {/* Compact Business Credentials (크고 또렷해진 명세 바) */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <span className="text-slate-400 font-semibold block text-xs mb-1">설립연도</span>
                  <span className="font-bold text-slate-900 text-sm sm:text-base">1994년 (30년 전통)</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block text-xs mb-1">사업인가</span>
                  <span className="font-bold text-slate-900 text-sm sm:text-base">국토교통부 정식허가</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block text-xs mb-1">적재물보험</span>
                  <span className="font-bold text-blue-700 text-sm sm:text-base">현대해상 5,000만원</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 font-semibold block text-xs mb-1">본사위치</span>
                    <span className="font-bold text-slate-900 text-sm sm:text-base truncate">강남구 논현동</span>
                  </div>
                  <button
                    type="button"
                    onClick={copyAddress}
                    className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-colors shrink-0"
                  >
                    {copied ? "완료✓" : "복사"}
                  </button>
                </div>
              </div>
            </div>

            {/* Direct Action Bar */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              {onQuote && (
                <button
                  type="button"
                  onClick={onQuote}
                  className="px-6 py-3 rounded-full bg-slate-950 hover:bg-slate-800 active:scale-95 text-white font-bold text-sm sm:text-base shadow-sm transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>기업 물류 견적 문의</span>
                  <span>→</span>
                </button>
              )}
              <a
                href="tel:1588-5575"
                className="px-5 py-3 rounded-full bg-white hover:bg-slate-100 border border-slate-300 text-slate-900 font-bold text-sm sm:text-base shadow-2xs transition-all flex items-center gap-2.5"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-600 font-medium">상담콜:</span>
                <span className="font-display font-black text-black text-base sm:text-lg tracking-tight">1588-5575</span>
              </a>
              <a
                href="https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%20%EA%B0%95%EB%82%A8%EA%B5%AC%20%EB%85%BC%ED%98%84%EB%8F%99%20114-14"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-slate-500 hover:text-orange-600 font-medium ml-auto hidden sm:inline-block"
              >
                본사 위치 안내 ↗
              </a>
            </div>
          </div>

          {/* ── Right Column: Counselor Photo & Key Stats (5 cols) ── */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3.5">
            {/* Visual Photo Card */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-200/90 shadow-md group">
              <div className="relative aspect-[16/11] w-full">
                <Image
                  src="/images/counselor.jpg"
                  alt="드림델 24시 전문 상담원"
                  fill
                  className="object-cover object-[center_30%] group-hover:scale-102 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                {/* Top Live Badge */}
                <div className="absolute top-3.5 right-3.5 px-3 py-1.5 rounded-full bg-slate-950/90 border border-slate-700/60 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>전문 상담원 대기</span>
                </div>

                {/* Bottom Strip */}
                <div className="absolute bottom-3.5 inset-x-3.5 px-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-700/60 text-white flex items-center justify-between shadow-md">
                  <span className="text-sm sm:text-base font-bold text-white">배차 전문 상담원 1:1 직통 안내</span>
                  <span className="text-orange-400 font-display font-black text-sm sm:text-base tracking-tight">1588-5575</span>
                </div>
              </div>

              {/* 3 Prominent Metrics */}
              <div className="p-3 bg-slate-900 border-t border-slate-800 text-slate-200 grid grid-cols-3 divide-x divide-slate-800 text-center">
                <div className="px-2">
                  <span className="block font-display font-black text-orange-400 text-lg sm:text-2xl tracking-tight">3초 내</span>
                  <span className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">상담 응답</span>
                </div>
                <div className="px-2">
                  <span className="block font-display font-black text-emerald-400 text-lg sm:text-2xl tracking-tight">99.8%</span>
                  <span className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">배송 만족도</span>
                </div>
                <div className="px-2">
                  <span className="block font-display font-black text-white text-lg sm:text-2xl tracking-tight">1,200+</span>
                  <span className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">실시간 배차망</span>
                </div>
              </div>
            </div>

            {/* 3 Trust Badges */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs grid grid-cols-3 divide-x divide-slate-100 text-center">
              <div className="px-2">
                <span className="font-bold text-slate-900 block text-xs sm:text-sm">현대해상 보험</span>
                <span className="text-xs text-slate-500 font-medium mt-0.5">5,000만원 보장</span>
              </div>
              <div className="px-2">
                <span className="font-bold text-slate-900 block text-xs sm:text-sm">국토교통부</span>
                <span className="text-xs text-slate-500 font-medium mt-0.5">정식 화물주선</span>
              </div>
              <div className="px-2">
                <span className="font-bold text-slate-900 block text-xs sm:text-sm">사랑의열매</span>
                <span className="text-xs text-slate-500 font-medium mt-0.5">착한가게 후원</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
