"use client";

import { useState, useEffect } from "react";

interface DriverSectionProps {
  onOpenDriverApply?: (type: "bike" | "truck") => void;
}

export default function DriverSection({ onOpenDriverApply }: DriverSectionProps) {
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    vehicle: "오토바이",
    region: "서울 강남/서초/송파",
    experience: "신규 (초보자 환영)",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Keyboard accessibility: Close driver modal on Escape
  useEffect(() => {
    if (!activeModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModal]);

  const handleOpenModal = () => {
    if (onOpenDriverApply) {
      onOpenDriverApply("bike");
    } else {
      setActiveModal(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleCloseModal = () => {
    setActiveModal(false);
    setIsSubmitted(false);
    setFormData({
      name: "",
      phone: "",
      vehicle: "오토바이",
      region: "서울 강남/서초/송파",
      experience: "신규 (초보자 환영)",
    });
  };

  return (
    <section
      id="driver"
      data-fullpage-section
      className="scroll-mt-14 relative overflow-hidden bg-[#060A14] py-20 lg:py-0 lg:flex lg:h-[100svh] lg:snap-start lg:snap-always lg:items-center text-slate-100"
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

      {/* ── Minimalist Content Container ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        {/* Main Headline */}
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.25] break-keep mb-5 sm:mb-6">
          신뢰할 수 있는 드림델 운송서비스!
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-xl md:text-2xl text-slate-300 font-medium leading-relaxed break-keep max-w-3xl mx-auto mb-8 sm:mb-12">
          기존 운송업체와 차별화된 서비스를 지향하는 드림델에서
          <br className="hidden sm:inline" />{" "}
          열정넘치는 라이더/기사 분들을 상시모집합니다.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 max-w-md mx-auto">
          <button
            type="button"
            onClick={handleOpenModal}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-base shadow-lg shadow-orange-500/25 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>간편 기사 지원하기</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          <a
            href="tel:1588-5575"
            className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-base backdrop-blur-md transition-all active:scale-95 flex items-center justify-center gap-2.5"
          >
            <svg className="h-4 w-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>전화 문의 1588-5575</span>
          </a>
        </div>
      </div>

      {/* ── Direct Quick Application Modal ── */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
            onClick={handleCloseModal}
          />
          <div className="relative z-10 w-full max-w-md rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 text-slate-900">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
                <h3 className="font-display font-black text-lg sm:text-xl text-slate-950 tracking-tight">
                  드림델 기사 지원
                </h3>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-sm font-bold cursor-pointer transition-colors"
                aria-label="닫기"
              >
                ✕
              </button>
            </div>

            {isSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-950">기사 지원이 접수되었습니다!</h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    담당자가 확인 후 빠른 시일 내에 기사님 번호로 안내 전화를 드립니다.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-slate-950 text-white font-bold text-xs cursor-pointer"
                >
                  확인
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    성함 (이름) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="홍길동"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    연락처 (휴대폰 번호) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="010-1234-5678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    희망 차종
                  </label>
                  <select
                    value={formData.vehicle}
                    onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none"
                  >
                    <option value="오토바이">오토바이 퀵</option>
                    <option value="다마스">다마스 밴</option>
                    <option value="라보">라보 트럭</option>
                    <option value="1톤 화물">1톤 카고/탑차</option>
                    <option value="차량 미소유(상담희망)">차량 미소유 (상담 희망)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      희망 활동 지역
                    </label>
                    <select
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none"
                    >
                      <option value="서울 강남/서초/송파">서울 강남권</option>
                      <option value="서울 강북/종로/마포">서울 강북권</option>
                      <option value="경기 판교/성남/분당">경기 남부 (판교/분당)</option>
                      <option value="경기 일산/고양/파주">경기 북부 (일산/고양)</option>
                      <option value="인천 및 수도권 전역">수도권 전역</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      배송 경험 여부
                    </label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none"
                    >
                      <option value="신규 (초보자 환영)">신규 (초보)</option>
                      <option value="1년 미만">1년 미만</option>
                      <option value="1년 ~ 3년">1년 ~ 3년</option>
                      <option value="3년 이상 베테랑">3년 이상 베테랑</option>
                    </select>
                  </div>
                </div>

                <div className="pt-1">
                  <label className="flex items-center space-x-2 cursor-pointer select-none text-xs text-slate-700">
                    <input
                      type="checkbox"
                      required
                      defaultChecked
                      className="w-4 h-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                    />
                    <span className="font-medium">
                      기사 등록을 위한 개인정보 수집·이용에 동의합니다 (필수)
                    </span>
                  </label>
                  <p className="text-[11px] text-slate-500 mt-1 pl-6 leading-tight">
                    • 수집목적: 기사 등록 상담 및 배차 지원 / 보유기간: 1년
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-black text-sm shadow-md transition-all active:scale-[0.98] cursor-pointer"
                  >
                    {isSubmitting ? "접수 처리 중..." : "기사 등록 간편 신청하기 →"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
