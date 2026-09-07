"use client";

import { useState } from "react";
import Image from "next/image";

type TabId = "bike" | "vehicle" | "express" | "etc";

export default function ServiceCards() {
  const [activeTab, setActiveTab] = useState<TabId>("bike");

  const tabs = [
    { id: "bike" as TabId, label: "오토바이 운송", badge: "최대 10kg" },
    { id: "vehicle" as TabId, label: "차량 운송", badge: "다마스·라보·1톤" },
    { id: "express" as TabId, label: "전국연계 특송", badge: "KTX·항공" },
    { id: "etc" as TabId, label: "맞춤 특수옵션", badge: "예약·보관·경유" },
  ];

  const handleTabClick = (id: TabId, e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    setActiveTab(id);
  };

  return (
    <div className="w-full">
      {/* ── 1. Section Header ── */}
      <div className="mb-4 sm:mb-6 lg:mb-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-orange-400 text-xs sm:text-sm font-bold tracking-wider uppercase mb-2 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
          <span>02 FLEET &amp; SERVICES</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight break-keep">
            화물 크기와 긴급도에 맞춘{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400">
              최적의 운송 라인업
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-medium break-keep">
            도심 소형 긴급 퀵배송부터 1톤 화물, KTX·항공 전국 당일 특송까지 완벽 지원
          </p>
        </div>
      </div>

      {/* ── 2. Tab Navigation Bar (화면 움직임을 유발하는 scale 효과 배제) ── */}
      <div className="mb-4 sm:mb-5">
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap p-1.5 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/15 gap-1.5 sm:gap-2 shadow-inner">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={(e) => handleTabClick(tab.id, e)}
                className={`flex items-center justify-center sm:justify-start gap-2.5 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm md:text-base font-bold transition-colors cursor-pointer select-none ${
                  isActive
                    ? "bg-white text-slate-950 shadow-md"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`hidden sm:inline-block text-xs px-2 py-0.5 rounded-md font-bold ${
                    isActive
                      ? "bg-orange-100 text-orange-700"
                      : "bg-white/10 text-slate-300"
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 3. Active Tab Content Container (모든 탭 높이 고정으로 탭 전환 시 화면 흔들림 완전 방지) ── */}
      <div className="rounded-2xl sm:rounded-3xl border border-white/80 bg-white/98 p-5 sm:p-6 lg:p-6 shadow-2xl backdrop-blur-xl text-slate-950 lg:h-[480px] flex flex-col justify-between overflow-hidden">
        {/* ── TAB 01: 오토바이 운송서비스 ── */}
        {activeTab === "bike" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-stretch h-full">
            {/* Left Column: 오토바이 비주얼 */}
            <div className="lg:col-span-4 flex flex-col h-full">
              <div className="relative w-full h-[220px] sm:h-[260px] lg:h-full min-h-[220px] rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-700/60 shadow-md flex items-center justify-center p-3">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/vehicles/bike.jpg"
                    alt="오토바이 퀵배송 주행"
                    fill
                    className="object-contain object-center drop-shadow-2xl"
                    priority
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-xs sm:text-sm font-bold border border-slate-700 shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                  <span>도심 신속 배차 1위</span>
                </div>
                <div className="absolute bottom-3 inset-x-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/15 text-white text-center">
                  <div className="text-xs sm:text-sm font-bold text-orange-400">적재 한도 안내</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-200 mt-0.5">
                    최대 10kg 이내 · 3면 합 100cm 이내
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 서비스 안내 & 소요시간 & 운행시간 */}
            <div className="lg:col-span-8 flex flex-col justify-between h-full space-y-3">
              {/* Header Title */}
              <div>
                <div className="inline-block text-xs sm:text-sm font-bold tracking-wider text-orange-600 uppercase mb-0.5">
                  TAB 01 · MOTORCYCLE QUICK
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                  오토바이 운송서비스
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-slate-600 mt-0.5 font-medium leading-normal">
                  도심 정체 속에서도 가장 빠른 기동성으로 서류, 소형 패키지, 긴급 물품을 안전하게 배송합니다.
                </p>
              </div>

              {/* 운행 및 접수시간 스트립 (야간접수 삭제, 정확한 운영시간) */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 shadow-2xs">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs sm:text-sm font-bold text-slate-950">운행 및 접수 시간</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs sm:text-sm">
                  <div className="bg-white p-2 rounded-lg border border-slate-200/80">
                    <span className="text-slate-500 font-bold block text-xs mb-0.5">평일</span>
                    <span className="font-black text-slate-900 text-sm sm:text-base">08:00 ~ 20:00</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200/80">
                    <span className="text-orange-600 font-bold block text-xs mb-0.5">토요일</span>
                    <span className="font-black text-slate-900 text-sm sm:text-base">09:00 ~ 19:00</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200/80">
                    <span className="text-blue-600 font-bold block text-xs mb-0.5">일·공휴일</span>
                    <span className="font-black text-slate-900 text-sm sm:text-base">10:00 ~ 18:00</span>
                  </div>
                </div>
              </div>

              {/* 소요시간 비교 카드 (일반 vs 급송) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 일반 오토바이 */}
                <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-black text-slate-950 text-sm sm:text-base">일반 오토바이 운송</span>
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      표준 퀵
                    </span>
                  </div>
                  <div className="space-y-1 text-xs sm:text-sm">
                    <div className="flex items-center justify-between py-0.5 border-b border-slate-100">
                      <span className="text-slate-600 font-semibold">10km 이내</span>
                      <span className="font-black text-slate-950 text-sm sm:text-base">60분 내외</span>
                    </div>
                    <div className="flex items-center justify-between py-0.5">
                      <span className="text-slate-600 font-semibold">수도권 전역</span>
                      <span className="font-black text-slate-950 text-sm sm:text-base">90분 내외</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    규격 소형물품 표준 경로 배송
                  </p>
                </div>

                {/* 급송 오토바이 */}
                <div className="p-3.5 rounded-xl bg-orange-50/60 border border-orange-200/90 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-black text-orange-950 text-sm sm:text-base">급송 · 프리미엄 직송</span>
                    <span className="text-xs font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded">
                      단독 배차
                    </span>
                  </div>
                  <div className="space-y-1 text-xs sm:text-sm">
                    <div className="flex items-center justify-between py-0.5 border-b border-orange-100">
                      <span className="text-orange-900 font-semibold">10km 이내</span>
                      <span className="font-black text-orange-600 text-sm sm:text-base">40분 내외</span>
                    </div>
                    <div className="flex items-center justify-between py-0.5">
                      <span className="text-orange-900 font-semibold">수도권 전역</span>
                      <span className="font-black text-orange-600 text-sm sm:text-base">60분 내외</span>
                    </div>
                  </div>
                  <p className="text-xs text-orange-700/90 mt-1 font-semibold">
                    접수 즉시 최우선 픽업 &amp; 1:1 직통 배송
                  </p>
                </div>
              </div>

              {/* 적재 규격 및 권역 상세 바 */}
              <div className="p-3 rounded-xl bg-white border border-slate-200/90 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-500 shrink-0">적재 규격:</span>
                  <span className="font-bold text-slate-900">
                    최대 중량 <strong className="text-orange-600 font-black">10kg</strong> 이내 · 3면의 합 <strong className="text-orange-600 font-black">100cm</strong> 이내
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-500 shrink-0">운송 권역:</span>
                  <span className="font-semibold text-slate-800">서울 · 경기 · 인천 전역 실시간 배차</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 02: 차량 운송서비스 ── */}
        {activeTab === "vehicle" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-stretch h-full">
            {/* Left Column: 차량 비주얼 */}
            <div className="lg:col-span-4 flex flex-col h-full">
              <div className="relative w-full h-[220px] sm:h-[260px] lg:h-full min-h-[220px] rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-700/60 shadow-md flex items-center justify-center p-3">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/vehicles/damas.jpg"
                    alt="차량 운송 라인업"
                    fill
                    className="object-contain object-center drop-shadow-2xl"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-xs sm:text-sm font-bold border border-slate-700 shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span>다마스 · 라보 · 1톤 트럭</span>
                </div>
                <div className="absolute bottom-3 inset-x-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/15 text-white text-center">
                  <div className="text-xs sm:text-sm font-bold text-blue-400">차종별 적재 중량</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-200 mt-0.5">
                    다마스 350kg · 라보 450kg · 1톤 1,000kg
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 차종 라인업 & 소요시간 & 운행시간 */}
            <div className="lg:col-span-8 flex flex-col justify-between h-full space-y-3">
              {/* Header Title */}
              <div>
                <div className="inline-block text-xs sm:text-sm font-bold tracking-wider text-blue-600 uppercase mb-0.5">
                  TAB 02 · VEHICLE FREIGHT
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                  차량 운송서비스 (다마스 / 라보 / 1톤)
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-slate-600 mt-0.5 font-medium leading-normal">
                  오토바이로 불가능한 박스 화물, 가전·가구, 파레트 화물을 전차종으로 안전하게 운송합니다.
                </p>
              </div>

              {/* 운행 및 접수시간 스트립 (야간접수 삭제, 동일한 표준 운영시간) */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 shadow-2xs">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs sm:text-sm font-bold text-slate-950">차량 배차 및 접수 시간</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs sm:text-sm">
                  <div className="bg-white p-2 rounded-lg border border-slate-200/80">
                    <span className="text-slate-500 font-bold block text-xs mb-0.5">평일</span>
                    <span className="font-black text-slate-900 text-sm sm:text-base">08:00 ~ 20:00</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200/80">
                    <span className="text-orange-600 font-bold block text-xs mb-0.5">토요일</span>
                    <span className="font-black text-slate-900 text-sm sm:text-base">09:00 ~ 19:00</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200/80">
                    <span className="text-blue-600 font-bold block text-xs mb-0.5">일·공휴일</span>
                    <span className="font-black text-slate-900 text-sm sm:text-base">10:00 ~ 18:00</span>
                  </div>
                </div>
              </div>

              {/* 3대 차종 스펙 카드 (1톤 1,000kg "이상" 삭제 반영) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* 다마스 */}
                <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-blue-400 transition-colors flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-black text-slate-950 text-sm sm:text-base">다마스 (밴)</span>
                    <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      350kg
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-normal">
                    소형 박스(최대 25박스), 서류박스, 우천 안심 밀폐 운송
                  </p>
                </div>

                {/* 라보 */}
                <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-blue-400 transition-colors flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-black text-slate-950 text-sm sm:text-base">라보 (소형화물)</span>
                    <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      450kg
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-normal">
                    표준 파레트 1개, 소형 가구, 기계부품, 높은 화물 적재
                  </p>
                </div>

                {/* 1톤 트럭 (1000kg - "이상" 삭제) */}
                <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-blue-400 transition-colors flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-black text-slate-950 text-sm sm:text-base">1톤 트럭</span>
                    <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      1,000kg
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-normal">
                    대형 파레트 2개, 기업 대량 물류, 카고/탑차 맞춤 배차
                  </p>
                </div>
              </div>

              {/* 소요시간 및 운송 권역 */}
              <div className="p-3 rounded-xl bg-white border border-slate-200/90 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-500 shrink-0">소요 시간:</span>
                  <span className="font-bold text-slate-900">
                    일반 10km <strong className="text-slate-950 font-black">60분 내외</strong> (수도권 90분) · 급송 <strong className="text-orange-600 font-black">40분 내외</strong> (수도권 60분)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-500 shrink-0">운송 권역:</span>
                  <span className="font-semibold text-slate-800">수도권 전역 및 전국 주요 도시 당일 배송</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 03: 전국연계 운송서비스 ── */}
        {activeTab === "express" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-stretch h-full">
            {/* Left Column: 전국연계 비주얼 */}
            <div className="lg:col-span-4 flex flex-col h-full">
              <div className="relative w-full h-[220px] sm:h-[260px] lg:h-full min-h-[220px] rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-700/60 shadow-md flex items-center justify-center p-3">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/vehicles/van.jpg"
                    alt="전국연계 운송서비스"
                    fill
                    className="object-contain object-center drop-shadow-2xl"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-xs sm:text-sm font-bold border border-slate-700 shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>KTX · 항공 · 고속버스 연계</span>
                </div>
                <div className="absolute bottom-3 inset-x-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/15 text-white text-center">
                  <div className="text-xs sm:text-sm font-bold text-emerald-400">전국 당일 특송</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-200 mt-0.5">
                    오전 접수 시 당일 오후 전국 도착 보장
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 전국 연계망 안내 */}
            <div className="lg:col-span-8 flex flex-col justify-between h-full space-y-3">
              <div>
                <div className="inline-block text-xs sm:text-sm font-bold tracking-wider text-emerald-600 uppercase mb-0.5">
                  TAB 03 · NATIONWIDE EXPRESS
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                  전국연계 당일 특송서비스
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-slate-600 mt-0.5 font-medium leading-normal">
                  KTX 특급망, 고속버스 터미널망, 국내 항공망과 도심 퀵서비스를 연계하여 전국 어디든 당일 배송합니다.
                </p>
              </div>

              {/* 운행 및 접수시간 */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 shadow-2xs">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs sm:text-sm font-bold text-slate-950">전국 연계 접수 시간</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs sm:text-sm">
                  <div className="bg-white p-2 rounded-lg border border-slate-200/80">
                    <span className="text-slate-500 font-bold block text-xs mb-0.5">평일</span>
                    <span className="font-black text-slate-900 text-sm sm:text-base">08:00 ~ 20:00</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200/80">
                    <span className="text-orange-600 font-bold block text-xs mb-0.5">토요일</span>
                    <span className="font-black text-slate-900 text-sm sm:text-base">09:00 ~ 19:00</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200/80">
                    <span className="text-blue-600 font-bold block text-xs mb-0.5">일·공휴일</span>
                    <span className="font-black text-slate-900 text-sm sm:text-base">10:00 ~ 18:00</span>
                  </div>
                </div>
              </div>

              {/* 3대 연계망 카드 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
                  <div className="font-bold text-slate-950 text-sm sm:text-base mb-1">KTX 특급 연계</div>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-normal">
                    서울/용산역 발 주요 KTX 정차역 2~3시간 내 직송 연계
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
                  <div className="font-bold text-slate-950 text-sm sm:text-base mb-1">고속버스 터미널 연계</div>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-normal">
                    강남·동서울 터미널 수하물 발송 후 현지 퀵 최종 문앞 배송
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
                  <div className="font-bold text-slate-950 text-sm sm:text-base mb-1">국내 항공 특송 연계</div>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-normal">
                    김포공항 발 제주·부산 등 원거리 도서 지역 당일 도착 보장
                  </p>
                </div>
              </div>

              {/* 접수 안내 바 */}
              <div className="p-3 rounded-xl bg-white border border-slate-200/90 flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-500">배송 기준:</span>
                  <span className="font-bold text-slate-900">오전 픽업 접수 시 당일 오후 최종 도착</span>
                </div>
                <a
                  href="tel:1588-5575"
                  className="font-display font-black text-black hover:text-orange-600 text-xs sm:text-sm tracking-tight"
                >
                  연계 전담 문의: 1588-5575
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 04: 맞춤 특수옵션 ── */}
        {activeTab === "etc" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-stretch h-full">
            {/* Left Column: 특수옵션 비주얼 */}
            <div className="lg:col-span-4 flex flex-col h-full">
              <div className="relative w-full h-[220px] sm:h-[260px] lg:h-full min-h-[220px] rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-700/60 shadow-md flex items-center justify-center p-3">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/vehicles/truck.jpg"
                    alt="맞춤형 특수 운송 옵션"
                    fill
                    className="object-contain object-center drop-shadow-2xl"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-xs sm:text-sm font-bold border border-slate-700 shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <span>기업 B2B 맞춤 물류 솔루션</span>
                </div>
                <div className="absolute bottom-3 inset-x-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/15 text-white text-center">
                  <div className="text-xs sm:text-sm font-bold text-purple-400">유연한 맞춤 배차</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-200 mt-0.5">
                    예약 배송 · 단기 보관 · 다중 경유 순회
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 특수 옵션 리스트 (다른 탭과 동일한 4단 구조로 완전 일치) */}
            <div className="lg:col-span-8 flex flex-col justify-between h-full space-y-3">
              <div>
                <div className="inline-block text-xs sm:text-sm font-bold tracking-wider text-purple-600 uppercase mb-0.5">
                  TAB 04 · CUSTOMIZED SOLUTIONS
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                  맞춤형 특수 운송 솔루션
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-slate-600 mt-0.5 font-medium leading-normal">
                  고객사의 업무 스케줄과 현장 조건에 맞춘 맞춤형 부가 운송 솔루션을 제공합니다.
                </p>
              </div>

              {/* 상담 및 접수시간 */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 shadow-2xs">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs sm:text-sm font-bold text-slate-950">특수 운송 상담 및 접수 시간</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs sm:text-sm">
                  <div className="bg-white p-2 rounded-lg border border-slate-200/80">
                    <span className="text-slate-500 font-bold block text-xs mb-0.5">평일</span>
                    <span className="font-black text-slate-900 text-sm sm:text-base">08:00 ~ 20:00</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200/80">
                    <span className="text-orange-600 font-bold block text-xs mb-0.5">토요일</span>
                    <span className="font-black text-slate-900 text-sm sm:text-base">09:00 ~ 19:00</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200/80">
                    <span className="text-blue-600 font-bold block text-xs mb-0.5">일·공휴일</span>
                    <span className="font-black text-slate-900 text-sm sm:text-base">10:00 ~ 18:00</span>
                  </div>
                </div>
              </div>

              {/* 3대 특수 옵션 카드 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-950 text-sm sm:text-base">시간 예약 운송</span>
                    <span className="text-[10px] font-bold tracking-wider text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded">
                      RESERVE
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-normal">
                    고객이 지정한 정확한 일시 및 분 단위 픽업 &amp; 배송
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-950 text-sm sm:text-base">보관 후 배송</span>
                    <span className="text-[10px] font-bold tracking-wider text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                      STORAGE
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-normal">
                    안전 물류 창고 보관 후 원하는 일정에 맞춘 순차 배송
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-950 text-sm sm:text-base">다중 경유 운송</span>
                    <span className="text-[10px] font-bold tracking-wider text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                      MULTI-WAY
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-normal">
                    1회 접수로 여러 거래처 동시 배송 및 회수 처리
                  </p>
                </div>
              </div>

              {/* 하단 기업 지원 바 */}
              <div className="p-3 rounded-xl bg-white border border-slate-200/90 flex items-center justify-between text-xs sm:text-sm">
                <span className="font-semibold text-slate-700">
                  월말 후불 세금계산서 발행 및 법인 전담 매니저 1:1 지원
                </span>
                <span className="font-display font-bold text-slate-900 tracking-tight">
                  전화 상담 1588-5575
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
