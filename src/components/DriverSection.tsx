"use client";

import { useState } from "react";
import Image from "next/image";

interface DriverSectionProps {
  onOpenDriverApply?: (type: "bike" | "truck") => void;
}

export default function DriverSection({ onOpenDriverApply }: DriverSectionProps) {
  const [activeModal, setActiveModal] = useState<"bike" | "truck" | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    region: "서울/수도권",
    experience: "신규",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const benefits = [
    {
      title: "안정적인 물량 보장",
      description: "30년 축적 기업 고정 거래처 및 실시간 쾌속 오더 우선 배정",
      icon: (
        <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      title: "투명한 당일 정산",
      description: "업계 최저 수준 수수료 체계 및 운임 100% 당일 정산 원칙 준수",
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: "1:1 전담 관제 지원",
      description: "초보자도 쉽게 적응하는 1:1 멘토링, 적재물 보험 및 안전 운행 지원",
      icon: (
        <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
  ];

  const handleApplyClick = (type: "bike" | "truck") => {
    if (onOpenDriverApply) {
      onOpenDriverApply(type);
    } else {
      setActiveModal(type);
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
    setActiveModal(null);
    setIsSubmitted(false);
    setFormData({
      name: "",
      phone: "",
      region: "서울/수도권",
      experience: "신규",
    });
  };

  return (
    <section id="driver" className="scroll-mt-14 py-16 sm:py-20 bg-[#F8F9FC] border-t border-slate-200/90 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* ── Left Column: Texts, 3 Benefit Cards & 2 Action Buttons (7 cols) ── */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Header Tag */}
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 text-white text-[11px] font-mono font-bold tracking-widest uppercase mb-4 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                <span>05 DRIVER</span>
              </div>

              {/* Main Headline */}
              <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-[1.2] break-keep mb-3">
                함께 달릴 퀵기사·화물기사님을 모십니다
              </h2>

              {/* Subtitle */}
              <p className="text-slate-600 text-sm sm:text-base font-medium break-keep mb-8 sm:mb-10">
                기사님의 땀과 시간에 정당한 대가를 드립니다. 안정적인 오더 물량과 투명한 당일 정산으로 오래 일할 수 있는 상생 환경을 만듭니다.
              </p>

              {/* 3 Benefit Cards (3-col horizontal grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 mb-8 sm:mb-10">
                {benefits.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-[0_2px_12px_rgb(0,0,0,0.03)] hover:border-slate-300 hover:shadow-md transition-all group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <h3 className="font-display font-black text-base text-slate-950 mb-1 tracking-tight group-hover:text-orange-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed break-keep font-normal">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2 Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5">
              <button
                type="button"
                onClick={() => handleApplyClick("bike")}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 active:bg-black text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer text-center flex items-center justify-center space-x-2"
              >
                <span>오토바이 퀵기사 지원하기</span>
                <svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => handleApplyClick("truck")}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-950 text-slate-950 font-bold text-xs sm:text-sm shadow-sm transition-all active:scale-95 cursor-pointer text-center flex items-center justify-center space-x-2"
              >
                <span>차량·화물기사 지원하기</span>
                <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* ── Right Column: 퀵기사 · 화물기사 인물 컷 (960 x 680) (5 cols) ── */}
          <div className="lg:col-span-5">
            <div className="relative w-full aspect-[960/680] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/90 shadow-xl group">
              <Image
                src="/images/driver.jpg"
                alt="드림델 퀵기사 및 화물기사 인물 컷"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/15 text-white flex items-center justify-between shadow-lg">
                <div>
                  <div className="text-xs sm:text-sm font-black text-white flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>드림델 상생 배차 네트워크</span>
                  </div>
                  <div className="text-[11px] text-slate-300 font-medium mt-0.5">
                    업계 최고 수준 운임 배분 & 24시간 실시간 관제 센터 가동
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded border border-orange-500/20">
                  RECRUIT
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Direct Quick Application Modal ── */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
            onClick={handleCloseModal}
          />
          <div className="relative z-10 w-full max-w-md rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
                <h3 className="font-display font-black text-lg sm:text-xl text-slate-950 tracking-tight">
                  {activeModal === "bike" ? "오토바이 퀵기사 지원" : "차량·화물기사 지원"}
                </h3>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold cursor-pointer"
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
                    담당자가 확인 후 24시간 이내에 기사님 번호로 안내 전화를 드립니다.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-slate-950 text-white font-bold text-xs"
                >
                  확인
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
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
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none"
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
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      희망 활동 지역
                    </label>
                    <select
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none"
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
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none"
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
