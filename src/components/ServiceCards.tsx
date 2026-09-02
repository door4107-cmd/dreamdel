"use client";

import { useState } from "react";
import Image from "next/image";

type TabId = "bike" | "vehicle" | "express" | "etc";

export default function ServiceCards() {
  const [activeTab, setActiveTab] = useState<TabId>("bike");

  const tabs = [
    { id: "bike" as TabId, label: "오토바이 운송서비스", shortLabel: "오토바이" },
    { id: "vehicle" as TabId, label: "차량 운송서비스", shortLabel: "차량(다마스/라보/1톤)" },
    { id: "express" as TabId, label: "전국연계 운송서비스", shortLabel: "전국연계(KTX/항공)" },
    { id: "etc" as TabId, label: "기타 서비스", shortLabel: "특수/맞춤옵션" },
  ];

  return (
    <div className="w-full">
      {/* ── 1. Section Header ── */}
      <div className="mb-8 sm:mb-12">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 text-white text-[11px] font-mono font-bold tracking-widest uppercase mb-4 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
          <span>02 BUSINESS</span>
        </div>
        
        <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-[1.2] break-keep mb-3">
          보내야 할 것이 무엇이든, 맞는 수단이 있습니다
        </h2>
        <p className="text-slate-600 text-sm sm:text-base font-medium break-keep">
          소형 서류 퀵배송부터 1톤~11톤 대형 화물, KTX·항공 전국 당일 연계망까지 최적의 운송 수단을 제공합니다.
        </p>
      </div>

      {/* ── 2. Tab Navigation Bar (Sleek Modern Segmented Tabs) ── */}
      <div className="border-b border-slate-200 mb-8 sm:mb-10">
        <div className="flex flex-wrap gap-2 sm:gap-6">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3.5 sm:pb-4 text-sm sm:text-base font-bold transition-all relative cursor-pointer ${
                  isActive
                    ? "text-slate-950"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <span>{tab.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-slate-950 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 3. Active Tab Content Container ── */}
      <div className="p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-sm">
        {/* ── TAB 01: 오토바이 운송서비스 ── */}
        {activeTab === "bike" && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
              {/* Left Column: 오토바이 이미지 */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="relative w-full h-full min-h-[320px] sm:min-h-[380px] lg:min-h-[440px] rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-200/90 shadow-md flex items-center justify-center p-4">
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/vehicles/bike.jpg"
                      alt="오토바이 주행 컷"
                      fill
                      className="object-contain object-center drop-shadow-xl"
                      priority
                      sizes="(max-width: 1024px) 100vw, 42vw"
                    />
                  </div>
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-bold border border-white/15">
                    오토바이 퀵서비스
                  </div>
                </div>
              </div>

              {/* Right Column: 서비스 설명 및 비교표 */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div className="mb-5">
                  <div className="inline-block text-xs font-mono font-bold text-orange-600 uppercase mb-1">
                    TAB 01 · MOTORCYCLE
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mb-2">
                    오토바이 운송서비스
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed break-keep font-medium">
                    도심 속 가장 빠른 기동성으로 서류, 소형 패키지, 긴급 물품을 30분 내외로 신속 배송합니다.
                  </p>
                </div>

                {/* 2-Service Comparison Table */}
                <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200 text-slate-950 font-black">
                        <th className="py-3 px-3.5 sm:px-4 border-r border-slate-200 w-[22%] bg-slate-100">서비스 구분</th>
                        <th className="py-3 px-3.5 sm:px-4 border-r border-slate-200 w-[39%] text-slate-900">일반 오토바이 운송</th>
                        <th className="py-3 px-3.5 sm:px-4 w-[39%] text-orange-600">급송 · 프리미엄 오토바이</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-700 font-medium">
                      <tr>
                        <th className="py-2.5 px-3.5 sm:px-4 bg-slate-50 border-r border-slate-200 font-bold text-slate-900">개요</th>
                        <td className="py-2.5 px-3.5 sm:px-4 border-r border-slate-200">기본적인 규격 소형물품 운송</td>
                        <td className="py-2.5 px-3.5 sm:px-4 text-slate-950 font-bold">최우선 픽업 및 직통 단독 배송</td>
                      </tr>
                      <tr>
                        <th className="py-2.5 px-3.5 sm:px-4 bg-slate-50 border-r border-slate-200 font-bold text-slate-900">접수</th>
                        <td className="py-2.5 px-3.5 sm:px-4 border-r border-slate-200">온라인 / 전화 (1588-5575)</td>
                        <td className="py-2.5 px-3.5 sm:px-4">전화 (1588-5575) / 직통</td>
                      </tr>
                      <tr>
                        <th className="py-2.5 px-3.5 sm:px-4 bg-slate-50 border-r border-slate-200 font-bold text-slate-900">접수시간</th>
                        <td colSpan={2} className="py-2.5 px-3.5 sm:px-4 text-slate-900 font-semibold">
                          평일 08:00~20:00 · 토요일 08:00~19:00 · 일·공휴일 09:00~18:00 (야간 24시 접수 가능)
                        </td>
                      </tr>
                      <tr>
                        <th className="py-2.5 px-3.5 sm:px-4 bg-slate-50 border-r border-slate-200 font-bold text-slate-900">운송지역</th>
                        <td className="py-2.5 px-3.5 sm:px-4 border-r border-slate-200">서울 · 경기 · 인천 전역</td>
                        <td className="py-2.5 px-3.5 sm:px-4">서울 · 경기 · 인천 전역</td>
                      </tr>
                      <tr>
                        <th className="py-2.5 px-3.5 sm:px-4 bg-slate-50 border-r border-slate-200 font-bold text-slate-900">소요시간</th>
                        <td className="py-2.5 px-3.5 sm:px-4 border-r border-slate-200 leading-snug">
                          서울 시내 10km 이내 30분 내외<br />
                          수도권 60분 내외
                        </td>
                        <td className="py-2.5 px-3.5 sm:px-4 leading-snug text-slate-950 font-bold">
                          서울 시내 10km 이내 20분 내외<br />
                          수도권 40분 내외 직송
                        </td>
                      </tr>
                      <tr>
                        <th className="py-2.5 px-3.5 sm:px-4 bg-slate-50 border-r border-slate-200 font-bold text-slate-900">적재규격</th>
                        <td colSpan={2} className="py-2.5 px-3.5 sm:px-4 text-slate-900 font-semibold">
                          오토바이 적재함 탑재 물품 · 최대 중량 20kg 이내 · 3면의 합 120cm 이내
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 02: 차량 운송서비스 ── */}
        {activeTab === "vehicle" && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
              {/* Left Column: 차량 이미지 */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="relative w-full h-full min-h-[320px] sm:min-h-[380px] lg:min-h-[440px] rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-200/90 shadow-md flex items-center justify-center p-4">
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/vehicles/damas.jpg"
                      alt="차량 운송 주행 컷"
                      fill
                      className="object-contain object-center drop-shadow-xl"
                      sizes="(max-width: 1024px) 100vw, 42vw"
                    />
                  </div>
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-bold border border-white/15">
                    다마스 · 라보 · 1톤 트럭
                  </div>
                </div>
              </div>

              {/* Right Column: 서비스 설명 및 상세 항목 */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div className="mb-5">
                  <div className="inline-block text-xs font-mono font-bold text-blue-600 uppercase mb-1">
                    TAB 02 · VEHICLES
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mb-2">
                    차량 운송서비스
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed break-keep font-medium">
                    오토바이로 운송이 불가능한 박스 화물, 가전/가구, 파레트 및 대형 화물을 전차종으로 안전하게 운송합니다.
                  </p>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <tbody className="divide-y divide-slate-200 text-slate-700 font-medium">
                      <tr>
                        <th className="p-4 bg-slate-50 border-r border-slate-200 font-bold text-slate-900 w-[24%]">차량 라인업</th>
                        <td className="p-4 text-slate-950 font-bold text-sm sm:text-base">다마스 (밴) / 라보 (소형화물) / 1톤~11톤 카고·탑차</td>
                      </tr>
                      <tr>
                        <th className="p-4 bg-slate-50 border-r border-slate-200 font-bold text-slate-900">접수 방법</th>
                        <td className="p-4">온라인 실시간 접수 / 전화 접수 (1588-5575)</td>
                      </tr>
                      <tr>
                        <th className="p-4 bg-slate-50 border-r border-slate-200 font-bold text-slate-900">운송 권역</th>
                        <td className="p-4">수도권 전역 및 전국 전 지역 (도서산간 제외)</td>
                      </tr>
                      <tr>
                        <th className="p-4 bg-slate-50 border-r border-slate-200 font-bold text-slate-900">적재 중량</th>
                        <td className="p-4 text-slate-950 font-semibold">다마스 (350kg) / 라보 (450kg) / 1톤 (1,000kg 이상)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 03: 전국연계 운송서비스 ── */}
        {activeTab === "express" && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
              {/* Left Column: 전국연계 이미지 */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="relative w-full h-full min-h-[320px] sm:min-h-[380px] lg:min-h-[440px] rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-200/90 shadow-md flex items-center justify-center p-4">
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/vehicles/van.jpg"
                      alt="전국연계 운송 컷"
                      fill
                      className="object-contain object-center drop-shadow-xl"
                      sizes="(max-width: 1024px) 100vw, 42vw"
                    />
                  </div>
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-bold border border-white/15">
                    KTX · 고속버스 · 항공 연계
                  </div>
                </div>
              </div>

              {/* Right Column: 서비스 설명 및 상세 항목 */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div className="mb-5">
                  <div className="inline-block text-xs font-mono font-bold text-emerald-600 uppercase mb-1">
                    TAB 03 · NATIONWIDE
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mb-2">
                    전국연계 당일 특송서비스
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed break-keep font-medium">
                    KTX 특급망, 고속버스 터미널망, 국내 항공망과 도심 퀵서비스를 연계하여 전국 어디든 당일 배송합니다.
                  </p>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <tbody className="divide-y divide-slate-200 text-slate-700 font-medium">
                      <tr>
                        <th className="p-4 bg-slate-50 border-r border-slate-200 font-bold text-slate-900 w-[24%]">연계 수단</th>
                        <td className="p-4 text-slate-950 font-bold text-sm sm:text-base">KTX 특급열차 / 고속버스 당일택배 / 국내선 항공 특송</td>
                      </tr>
                      <tr>
                        <th className="p-4 bg-slate-50 border-r border-slate-200 font-bold text-slate-900">접수 방법</th>
                        <td className="p-4">전화 전담 배차 (1588-5575)</td>
                      </tr>
                      <tr>
                        <th className="p-4 bg-slate-50 border-r border-slate-200 font-bold text-slate-900">배송 기준</th>
                        <td className="p-4 text-slate-950 font-semibold">오전 픽업 접수 시 당일 오후 도착 보장</td>
                      </tr>
                      <tr>
                        <th className="p-4 bg-slate-50 border-r border-slate-200 font-bold text-slate-900">서비스 권역</th>
                        <td className="p-4">전국 주요 광역시, KTX 정차역 및 지방 거점 도시</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 04: 기타 서비스 ── */}
        {activeTab === "etc" && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
              {/* Left Column: 기타 서비스 이미지 */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="relative w-full h-full min-h-[320px] sm:min-h-[380px] lg:min-h-[440px] rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-200/90 shadow-md flex items-center justify-center p-4">
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/vehicles/truck.jpg"
                      alt="기타 운송 옵션 컷"
                      fill
                      className="object-contain object-center drop-shadow-xl"
                      sizes="(max-width: 1024px) 100vw, 42vw"
                    />
                  </div>
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-bold border border-white/15">
                    맞춤형 특수 운송 옵션
                  </div>
                </div>
              </div>

              {/* Right Column: 3행 옵션 카드 */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div className="mb-5">
                  <div className="inline-block text-xs font-mono font-bold text-purple-600 uppercase mb-1">
                    TAB 04 · SPECIAL OPTIONS
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mb-2">
                    맞춤형 특수 운송 옵션
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed break-keep font-medium">
                    고객사의 비즈니스 스케줄과 현장 조건에 맞춘 유연한 부가 운송 솔루션을 제공합니다.
                  </p>
                </div>

                <div className="space-y-3.5 my-auto">
                  <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-white hover:shadow-sm transition-all">
                    <div>
                      <div className="font-bold text-slate-950 text-sm sm:text-base">지정 시간 예약 운송</div>
                      <div className="text-xs text-slate-500 mt-0.5">고객이 지정한 정확한 일시에 픽업 및 배송 완료</div>
                    </div>
                    <span className="text-xs font-mono font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
                      RESERVE
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-white hover:shadow-sm transition-all">
                    <div>
                      <div className="font-bold text-slate-950 text-sm sm:text-base">단기 보관 후 지정 배송</div>
                      <div className="text-xs text-slate-500 mt-0.5">안전 물류 창고 보관 후 원하는 시간대에 맞춰 순차 배송</div>
                    </div>
                    <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                      STORAGE
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-white hover:shadow-sm transition-all">
                    <div>
                      <div className="font-bold text-slate-950 text-sm sm:text-base">다중 경유지 순회 운송</div>
                      <div className="text-xs text-slate-500 mt-0.5">단 한 번의 접수로 여러 거래처 동시 배송 및 서류 회수</div>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      MULTI-WAY
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}