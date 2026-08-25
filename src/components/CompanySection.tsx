"use client";

import { useState } from "react";

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
    <section id="company" className="scroll-mt-14 py-16 sm:py-20 bg-[#F8F9FC] border-t border-slate-200/80 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── 1. Top Section Index & Heroic Typography ── */}
        <div className="mb-8 sm:mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 text-white text-[11px] font-mono font-bold tracking-widest uppercase mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            <span>01 COMPANY</span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-[1.2] break-keep">
            도전과 혁신으로 변화를 주도하는 운송서비스{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600">
              드림델
            </span>
          </h2>
        </div>

        {/* ── 2. Upper Main Grid: Editorial Narrative & 4 Bento Metric Cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Brand Manifesto & Action Bar (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-black text-slate-950 tracking-tight leading-snug break-keep">
                1994년 설립 이후 30년, 시간을 지키는 일만 해왔습니다.
              </h3>
              
              <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed break-keep font-medium">
                <p>
                  드림델은 신속·정확·안전이라는 물류의 기본 원칙을 30년간 단 한 번도 타협하지 않았습니다.
                </p>
                <p>
                  축적된 수도권 도심 운송 데이터와 24시간 실시간 통합 배차 인프라를 바탕으로, 단순한 배송을 넘어 비즈니스의 확실한 성공 파트너가 되어 드립니다.
                </p>
              </div>
            </div>

            {/* Quick Action Dock */}
            {onQuote && (
              <div className="mt-8 pt-6 border-t border-slate-200/90 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onQuote}
                  className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 active:bg-black text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  <span>맞춤 운송 견적 문의하기</span>
                  <svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>

                {/* Mobile: Direct Click Dialing */}
                <a
                  href="tel:1588-5575"
                  className="md:hidden inline-flex items-center space-x-2 px-4 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300/80 text-slate-900 text-xs sm:text-sm font-bold shadow-sm transition-all active:scale-95 cursor-pointer"
                >
                  <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>전화 상담: 1588-5575</span>
                </a>

                {/* PC: Informational View */}
                <div
                  className="hidden md:inline-flex items-center space-x-2 px-4 py-3 rounded-xl bg-white border border-slate-300/80 text-slate-900 text-xs sm:text-sm font-bold shadow-sm select-text cursor-default"
                >
                  <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>전화 상담: 1588-5575</span>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: 2x2 Bento Metric Cards (6 cols) */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Metric 1: 1994 */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-md hover:border-slate-300 transition-all group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase">SINCE</span>
                  <span className="w-2 h-2 rounded-full bg-orange-500 group-hover:scale-125 transition-transform" />
                </div>
                <div className="font-mono text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                  1994
                </div>
                <div className="mt-2 text-xs sm:text-sm text-slate-600 font-bold">
                  설립 · 30년 신뢰 운영
                </div>
              </div>

              {/* Metric 2: 5,000만원 */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-md hover:border-slate-300 transition-all group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase">INSURANCE</span>
                  <span className="w-2 h-2 rounded-full bg-blue-500 group-hover:scale-125 transition-transform" />
                </div>
                <div className="font-mono text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                  5,000<span className="text-lg sm:text-xl font-bold ml-1">만원</span>
                </div>
                <div className="mt-2 text-xs sm:text-sm text-slate-600 font-bold">
                  적재물배상 보상한도
                </div>
              </div>

              {/* Metric 3: 000곳 */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-md hover:border-slate-300 transition-all group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase">PARTNERS</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform" />
                </div>
                <div className="font-mono text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                  000<span className="text-lg sm:text-xl font-bold ml-1">곳</span>
                </div>
                <div className="mt-2 text-xs sm:text-sm text-slate-600 font-bold flex items-center space-x-1">
                  <span>거래처</span>
                  <span className="text-[11px] text-slate-400 font-normal">※확인필요</span>
                </div>
              </div>

              {/* Metric 4: 00대 */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-md hover:border-slate-300 transition-all group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase">FLEET</span>
                  <span className="w-2 h-2 rounded-full bg-purple-500 group-hover:scale-125 transition-transform" />
                </div>
                <div className="font-mono text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                  00<span className="text-lg sm:text-xl font-bold ml-1">대</span>
                </div>
                <div className="mt-2 text-xs sm:text-sm text-slate-600 font-bold flex items-center space-x-1">
                  <span>보유 차량</span>
                  <span className="text-[11px] text-slate-400 font-normal">※확인필요</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 3. Lower 3-Pillars (연혁, 인증·보험, 오시는 길) ── */}
        <div className="mt-10 sm:mt-14 pt-8 sm:pt-10 border-t border-slate-200/90">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Pillar 1: 연혁 (History) */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-orange-600" />
                  <span>연혁 · HISTORY</span>
                </h4>
                <div className="space-y-3.5">
                  <div className="flex items-start space-x-3 pb-2.5 border-b border-slate-100">
                    <span className="font-mono font-black text-slate-950 text-sm shrink-0">1994</span>
                    <span className="text-slate-700 text-xs sm:text-sm leading-snug font-medium">
                      드림델 종합 퀵서비스 설립 (강남 본사)
                    </span>
                  </div>
                  <div className="flex items-start space-x-3 pb-2.5 border-b border-slate-100">
                    <span className="font-mono font-black text-slate-950 text-sm shrink-0">2005</span>
                    <span className="text-slate-700 text-xs sm:text-sm leading-snug font-medium">
                      종합물류 법인 전환 및 수도권 통합망 구축
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="font-mono font-black text-slate-950 text-sm shrink-0">2018</span>
                    <span className="text-slate-700 text-xs sm:text-sm leading-snug font-medium">
                      KTX·항공 연계 전국 당일 특송 인프라 확장
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillar 2: 인증 · 보험 (Certifications & Trust) */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>인증 · 보험 · TRUST</span>
                </h4>
                <div className="space-y-3">
                  {/* Badge 1 */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="leading-tight">
                      <div className="font-bold text-slate-950 text-xs sm:text-sm">적재물배상책임보험</div>
                      <div className="text-[11px] text-slate-500 font-medium">최대 5,000만원 전액 보상 증서 보유</div>
                    </div>
                  </div>

                  {/* Badge 2 */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div className="leading-tight">
                      <div className="font-bold text-slate-950 text-xs sm:text-sm">사랑의열매 &apos;착한가게&apos;</div>
                      <div className="text-[11px] text-slate-500 font-medium">지역 사회 정기 후원 공익 협약</div>
                    </div>
                  </div>

                  {/* Badge 3 */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="leading-tight">
                      <div className="font-bold text-slate-950 text-xs sm:text-sm">화물자동차운송주선 허가증</div>
                      <div className="text-[11px] text-slate-500 font-medium">국토교통부 정식 인가 주선 사업자</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillar 3: 오시는 길 (Location) */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>오시는 길 · LOCATION</span>
                </h4>
                <div className="space-y-2">
                  <div className="text-xs text-slate-500 font-medium">드림델 서울 본사</div>
                  <div className="font-bold text-slate-950 text-sm sm:text-base leading-snug">
                    서울 강남구 논현동 114-14 금산빌딩 4층
                  </div>
                  <div className="text-xs text-slate-500">
                    (지하철 7호선 학동역 10번 출구 도보 3분)
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center space-x-2">
                <button
                  type="button"
                  onClick={copyAddress}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all active:scale-95 flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>{copied ? "주소 복사됨 ✓" : "주소 복사"}</span>
                </button>
                <a
                  href="https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%20%EA%B0%95%EB%82%A8%EA%B5%AC%20%EB%85%BC%ED%98%84%EB%8F%99%20114-14"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs border border-slate-300 transition-all text-center"
                >
                  네이버지도 ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
