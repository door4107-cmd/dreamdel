"use client";

import { useState } from "react";
import BrandLogo from "@/components/BrandLogo";
import PrivacyPolicyModal from "@/components/PrivacyPolicyModal";

export default function Footer() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      const pageScroller = document.getElementById("page-scroller");
      if (pageScroller) {
        pageScroller.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <footer id="footer" data-fullpage-section className="scroll-mt-14 relative overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F8F9FC] to-[#F1F3F9] py-12 text-xs text-slate-700 sm:py-16 sm:text-sm lg:flex lg:h-[100svh] lg:snap-start lg:snap-always lg:items-center">
        {/* ── Top Curved Wave Divider transitioning from 04 DRIVER (#060A14) ── */}
        <div className="absolute top-0 inset-x-0 overflow-hidden leading-none pointer-events-none z-10">
          <svg className="relative block w-full h-7 sm:h-10 text-[#060A14]" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="currentColor">
            <path d="M0,0 L1200,0 L1200,30 Q600,90 0,30 Z" />
          </svg>
        </div>

        {/* Subtle ground texture */}
        <div className="absolute inset-0 bg-dot-subtle opacity-40 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* ── 1. Brand Wordmark (마크로고 이미지 제거, 텍스트 워드마크 적용) ── */}
          <div className="mb-6 sm:mb-8">
            <BrandLogo onClick={scrollToTop} />
          </div>

          {/* ── 2. Business Information Grid (전자상거래법 제10조 필수고지) ── */}
          <div className="space-y-2 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-4xl mb-8">
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-slate-400 font-bold">주소</span>
                <span className="text-slate-800">서울특별시 강남구 논현동 114-14 금산빌딩 4층</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-slate-400 font-bold">대표</span>
                <span className="text-slate-800">박상희</span>
              </div>
            </div>

            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-slate-400 font-bold">사업자등록번호</span>
                <span className="text-slate-800 font-semibold">211-86-77077</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-slate-400 font-bold">Tel</span>
                <span className="text-slate-800 font-semibold">02-3446-7668</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-slate-400 font-bold">Fax</span>
                <span className="text-slate-800 font-semibold">02-3446-6388</span>
              </div>
            </div>

            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-slate-400 font-bold">통신판매업</span>
                <span className="text-slate-800">통신판매업 신고번호 강남 2240호</span>
              </div>
            </div>
          </div>

          {/* ── 3. Bottom Row: Privacy / Copyright & Customer Center / TOP Button ── */}
          <div className="pt-6 border-t border-slate-200/80 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            {/* Left: 개인정보처리방침 & COPYRIGHT */}
            <div className="space-y-1.5">
              <div>
                <button
                  type="button"
                  onClick={() => setIsPrivacyOpen(true)}
                  className="font-bold text-slate-900 hover:text-orange-600 transition-colors cursor-pointer text-xs sm:text-sm underline underline-offset-4"
                >
                  개인정보처리방침
                </button>
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500 font-medium">
                COPYRIGHT © (주)드림델 ALL RIGHTS RESERVED.
              </div>
            </div>

            {/* Right: 고객센터 1588-5575 & TOP Button */}
            <div className="flex items-center space-x-4 self-end md:self-auto">
              <div className="flex items-center space-x-2">
                <span className="text-xs sm:text-sm text-slate-500 font-medium">고객센터</span>
                <span className="font-display text-base sm:text-lg md:text-xl font-black text-slate-950 tracking-tight">
                  1588-5575
                </span>
              </div>

              <button
                type="button"
                onClick={scrollToTop}
                className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer flex items-center space-x-1"
                aria-label="페이지 맨 위로 이동"
              >
                <span>TOP</span>
                <span>↑</span>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* 개인정보처리방침 전문 모달 */}
      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </>
  );
}