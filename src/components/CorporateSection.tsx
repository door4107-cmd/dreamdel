"use client";

interface CorporateSectionProps {
  onOpenQuoteModal?: () => void;
}

export default function CorporateSection({ onOpenQuoteModal }: CorporateSectionProps = {}) {
  const partners = [
    "CJ홈쇼핑", "Häagen-Dazs", "TOM FORD", "DKNY",
    "TOD'S", "YSL", "삼양", "DreamCIS"
  ];

  return (
    <section
      id="about"
      data-fullpage-section
      className="scroll-mt-14 relative overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#F1F5F9] py-14 lg:py-0 lg:flex lg:h-[100svh] lg:snap-start lg:snap-always lg:items-center text-slate-900 selection:bg-orange-500 selection:text-white"
    >
      {/* ── Top Subtle Technical Border Line ── */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/25 to-transparent pointer-events-none" />

      {/* ── Atmospheric Ambient Lighting ── */}
      <div className="absolute -top-32 -left-32 w-[550px] h-[450px] rounded-full bg-orange-400/8 blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[550px] h-[450px] rounded-full bg-blue-500/6 blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-4 lg:-translate-y-4">
        {/* ── 1. Section Header ── */}
        <div className="mb-6 lg:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-orange-700 text-xs sm:text-sm font-bold tracking-wider uppercase mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <span>03 CORPORATE B2B</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight break-keep">
              기업 물류의 모든 번거로움,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                드림델이 해결합니다
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium break-keep">
              맞춤 우대 요금 · 월 통합 후불 정산 · B2B 전담 매니저 배정
            </p>
          </div>
        </div>

        {/* ── 2. Two-Column Architectural Console ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* ── Left Column: 3대 핵심 혜택 (7 cols) ── */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-3.5">
            {/* 3 Core Benefit Rows */}
            <div className="space-y-3">
              {/* Benefit 1 */}
              <div className="p-4 sm:p-4.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-orange-400 transition-all flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="font-bold text-slate-950 text-base sm:text-lg">기업 맞춤 우대 단가제</h4>
                    <span className="text-xs font-bold text-orange-700 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200/70 shrink-0">
                      최대 30% 절감
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed break-keep">
                    정기 운송 노선과 월 발송 물량을 분석하여 합리적인 전용 요율표를 제안합니다.
                  </p>
                </div>
              </div>

              {/* Benefit 2 */}
              <div className="p-4 sm:p-4.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-blue-400 transition-all flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="font-bold text-slate-950 text-base sm:text-lg">월 1회 통합 후불 정산</h4>
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/70 shrink-0">
                      세무 간소화
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed break-keep">
                    건별 결제 번거로움 없이 월말 전자세금계산서 100% 발행 및 상세 배송 명세서를 제공합니다.
                  </p>
                </div>
              </div>

              {/* Benefit 3 */}
              <div className="p-4 sm:p-4.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-emerald-400 transition-all flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="font-bold text-slate-950 text-base sm:text-lg">1:1 전담 배차 플래너</h4>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/70 shrink-0">
                      전담 지원
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed break-keep">
                    다건 대량 배송도 담당 플래너가 1:1로 실시간 배차 및 완료 상태를 끝까지 책임집니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {onOpenQuoteModal && (
                <button
                  type="button"
                  onClick={onOpenQuoteModal}
                  className="px-6 py-3 rounded-full bg-slate-950 hover:bg-slate-800 active:scale-95 text-white font-bold text-sm sm:text-base shadow-sm transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>법인 전용 맞춤 견적 문의</span>
                  <span>→</span>
                </button>
              )}
              <a
                href="tel:1588-5575"
                className="px-5 py-3 rounded-full bg-white hover:bg-slate-100 border border-slate-300 text-slate-900 font-bold text-sm sm:text-base shadow-2xs transition-all flex items-center gap-2.5"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-600 font-medium">법인 직통:</span>
                <span className="font-display font-black text-black text-base sm:text-lg tracking-tight">1588-5575</span>
              </a>
            </div>
          </div>

          {/* ── Right Column: 주요 파트너 & 신뢰 지표 (5 cols) ── */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3.5">
            {/* 3 Real-time Corporate Trust Metrics */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                CORPORATE TRUST METRICS
              </div>
              <div className="grid grid-cols-3 divide-x divide-slate-100 text-center">
                <div className="px-2">
                  <span className="block font-display font-black text-slate-950 text-xl sm:text-2xl tracking-tight">2,500+</span>
                  <span className="text-xs text-slate-500 font-medium mt-0.5">고정 법인 파트너</span>
                </div>
                <div className="px-2">
                  <span className="block font-display font-black text-emerald-600 text-xl sm:text-2xl tracking-tight">99.8%</span>
                  <span className="text-xs text-slate-500 font-medium mt-0.5">정시 배송 준수율</span>
                </div>
                <div className="px-2">
                  <span className="block font-display font-black text-blue-600 text-xl sm:text-2xl tracking-tight">5,000만</span>
                  <span className="text-xs text-slate-500 font-medium mt-0.5">적재물 전액 보장</span>
                </div>
              </div>
            </div>

            {/* Major Partners Grid (8개 엄선 브랜드 뱃지) */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-950 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  <span>주요 거래처 파트너사</span>
                </span>
                <span className="text-[11px] font-bold tracking-wider text-slate-400">PARTNERS</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                {partners.map((partner, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-center hover:bg-white hover:border-orange-300 hover:shadow-2xs transition-all"
                  >
                    <span className="font-bold text-slate-800 text-xs sm:text-sm truncate">
                      {partner}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Assurance Strip */}
            <div className="p-3.5 rounded-2xl bg-slate-900 text-white shadow-md flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold text-slate-200">국토교통부 정식 허가 주선사</span>
              </div>
              <span className="text-slate-400 font-medium">현대해상 100% 가입</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
