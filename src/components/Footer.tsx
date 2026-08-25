"use client";

import { useState } from "react";
import BrandLogo from "@/components/BrandLogo";
import PrivacyPolicyModal from "@/components/PrivacyPolicyModal";

export default function Footer() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <footer id="footer" className="bg-white border-t border-slate-200 py-12 sm:py-16 text-slate-700 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── 1. Logo ── */}
          <div className="mb-6 sm:mb-8">
            <BrandLogo className="h-9 sm:h-10" showText={true} />
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
                <span className="text-slate-800 font-mono">211-86-77077</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-slate-400 font-bold">Tel</span>
                <span className="text-slate-800 font-mono">02-3446-7668</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-slate-400 font-bold">Fax</span>
                <span className="text-slate-800 font-mono">02-3446-6388</span>
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
              <div className="text-[11px] sm:text-xs text-slate-500 font-mono">
                COPYRIGHT © (주)드림델 ALL RIGHTS RESERVED.
              </div>
            </div>

            {/* Right: 고객센터 1588-5575 & TOP Button */}
            <div className="flex items-center space-x-4 self-end md:self-auto">
              <div className="flex items-center space-x-2">
                <span className="text-xs sm:text-sm text-slate-500 font-medium">고객센터</span>
                <span className="font-mono text-base sm:text-lg md:text-xl font-black text-slate-950">
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