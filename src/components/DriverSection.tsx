"use client";

import Image from "next/image";

export default function DriverSection() {
  return (
    <section
      id="driver"
      data-fullpage-section
      className="scroll-mt-14 relative overflow-hidden bg-[#060A14] py-16 sm:py-20 lg:py-0 lg:flex lg:h-[100svh] lg:snap-start lg:snap-always lg:items-center text-slate-100"
    >
      {/* ── Top Curved Wave Divider transitioning from 03 CORPORATE (#F1F5F9) ── */}
      <div className="absolute top-0 inset-x-0 overflow-hidden leading-none pointer-events-none z-10">
        <svg
          className="relative block w-full h-7 sm:h-10 text-[#F1F5F9]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,0 L1200,0 L1200,30 Q600,90 0,30 Z" />
        </svg>
      </div>

      {/* ── Subtle Ambient Glow & Texture ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-driver opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* ── Left Column: 헤드라인, 서브카피, 3대 핵심 혜택 & 전화 문의 액션 (7 cols) ── */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Main Headline */}
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.2] break-keep mb-3">
                신뢰할 수 있는{" "}
                <span className="text-orange-400 font-black">
                  드림델 운송서비스!
                </span>
              </h2>

              {/* Subtitle */}
              <p className="text-slate-300 text-sm sm:text-base md:text-lg font-normal leading-relaxed break-keep mb-6 sm:mb-8">
                기존 운송업체와 차별화된 서비스를 지향하는 드림델에서
                <br className="hidden sm:inline" />{" "}
                열정넘치는 라이더/기사 분들을 상시모집합니다.
              </p>

              {/* 3대 핵심 혜택 카드 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5 mb-6 sm:mb-8">
                {/* 1. 안정적인 물량 */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-sm flex flex-col justify-between hover:border-slate-700 transition-all">
                  <div>
                    <div className="text-xs font-bold text-orange-400 mb-1">안정적인 물량</div>
                    <div className="font-bold text-white text-sm sm:text-base mb-1">풍부한 고정 오더</div>
                    <p className="text-xs text-slate-300 leading-relaxed break-keep">
                      2,500여 개 기업 고객사 기반으로 비수기 없이 안정적인 배차를 지원합니다.
                    </p>
                  </div>
                </div>

                {/* 2. 당일 정산 */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-sm flex flex-col justify-between hover:border-slate-700 transition-all">
                  <div>
                    <div className="text-xs font-bold text-emerald-400 mb-1">투명한 정산</div>
                    <div className="font-bold text-white text-sm sm:text-base mb-1">당일 100% 입금</div>
                    <p className="text-xs text-slate-300 leading-relaxed break-keep">
                      운임 마감 즉시 당일 정산 원칙으로 일한 만큼 확실한 수익을 보장합니다.
                    </p>
                  </div>
                </div>

                {/* 3. 전 차종 지원 */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-sm flex flex-col justify-between hover:border-slate-700 transition-all">
                  <div>
                    <div className="text-xs font-bold text-blue-400 mb-1">전 차종 모집</div>
                    <div className="font-bold text-white text-sm sm:text-base mb-1">초보자 1:1 안내</div>
                    <p className="text-xs text-slate-300 leading-relaxed break-keep">
                      오토바이부터 다마스, 라보, 1톤까지 신규 기사님도 바로 적응할 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button: 전화 문의 직통 */}
              <div>
                <a
                  href="tel:1588-5575"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-base shadow-lg shadow-orange-500/25 transition-all active:scale-95 cursor-pointer"
                >
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>기사 등록 전화 문의 1588-5575</span>
                </a>
              </div>
            </div>
          </div>

          {/* ── Right Column: 퀵기사 · 화물기사 인물 컷 & 모집 요강 카드 (5 cols) ── */}
          <div className="lg:col-span-5">
            <div className="relative w-full aspect-[960/700] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 border border-slate-700 shadow-xl group">
              <Image
                src="/images/driver_dreamdel.jpg"
                alt="드림델 퀵기사 및 화물기사 인물 컷"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none" />

              {/* Bottom Recruitment Information Strip */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-950/90 border border-slate-800/80 backdrop-blur-md text-white shadow-xl">
                <div className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5 mb-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>드림델 기사 모집 요강</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5 text-xs text-slate-300">
                  <div>
                    <span className="text-slate-400 block text-[11px]">모집 부문</span>
                    <span className="font-bold text-white">오토바이 / 다마스 / 라보 / 1톤</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">근무 형태</span>
                    <span className="font-bold text-white">전업 및 투잡 자유 선택</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">활동 지역</span>
                    <span className="font-bold text-white">서울 및 수도권 전역</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">지원 자격</span>
                    <span className="font-bold text-white">면허 소지자 (초보 환영)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
