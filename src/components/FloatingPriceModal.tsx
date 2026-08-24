"use client";

import { useState } from "react";
import {
  DongPricingRequest,
  DistancePricingRequest,
  PricingResult,
  fetchDongPrice,
  fetchDistancePrice,
} from "@/lib/pricingService";

interface FloatingPriceModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenDispatchModal: () => void;
}

export default function FloatingPriceModal({
  isOpen,
  onOpen,
  onClose,
  onOpenDispatchModal,
}: FloatingPriceModalProps) {
  const [activeTab, setActiveTab] = useState<"dong" | "distance">("dong");

  const [dongForm, setDongForm] = useState<DongPricingRequest>({
    originSido: "서울특별시",
    originGungu: "강남구",
    originDong: "역삼동",
    destSido: "서울특별시",
    destGungu: "송파구",
    destDong: "잠실동",
    vehicleType: "bike",
  });

  const [distanceForm, setDistanceForm] = useState<DistancePricingRequest>({
    originAddress: "서울 강남구 테헤란로 123",
    destAddress: "서울 송파구 올림픽로 300",
    distanceKm: 12,
    vehicleType: "bike",
    isExpress: false,
    isNight: false,
    hasHelper: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PricingResult | null>(null);

  const handleDongSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await fetchDongPrice(dongForm);
      setResult(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDistanceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await fetchDistancePrice(distanceForm);
      setResult(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyToOrder = () => {
    onClose();
    onOpenDispatchModal();
  };

  const openPostcode = (target: "origin" | "dest") => {
    const loadAndOpen = () => {
      if (typeof window !== "undefined" && (window as any).daum && (window as any).daum.Postcode) {
        new (window as any).daum.Postcode({
          oncomplete: function (data: any) {
            const fullAddress = data.roadAddress || data.address;
            const extra = data.buildingName ? ` (${data.buildingName})` : "";
            const resultAddress = `${fullAddress}${extra}`;
            if (target === "origin") {
              setDistanceForm((prev) => ({ ...prev, originAddress: resultAddress }));
            } else {
              setDistanceForm((prev) => ({ ...prev, destAddress: resultAddress }));
            }
          },
        }).open();
      }
    };

    if (typeof window !== "undefined") {
      if (!(window as any).daum || !(window as any).daum.Postcode) {
        const script = document.createElement("script");
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.onload = () => loadAndOpen();
        document.head.appendChild(script);
      } else {
        loadAndOpen();
      }
    }
  };

  const seoulGungus = ["강남구", "서초구", "송파구", "영등포구", "마포구", "종로구", "중구", "용산구", "강동구", "성동구", "광진구", "구로구", "금천구", "동작구", "관악구", "양천구", "강서구", "은평구", "서대문구", "성북구", "강북구", "도봉구", "노원구", "중랑구", "동대문구"];
  const gyeonggiGungus = ["성남시 분당구", "성남시 수정구", "수원시 영통구", "수원시 팔달구", "용인시 수지구", "용인시 기흥구", "고양시 일산동구", "부천시", "안양시 동안구", "하남시", "화성시 동탄", "남양주시", "평택시", "파주시", "시흥시", "김포시", "광명시"];

  return (
    <>
      {/* 🖥️ 1. Desktop Dual Floating Action Buttons (sm 이상 화면 전용) */}
      <div className="hidden sm:flex fixed bottom-6 right-6 z-40 flex-col items-end space-y-2.5 animate-fade-in">
        {/* Top Button: 10초 간편 접수 */}
        <button
          type="button"
          onClick={onOpenDispatchModal}
          className="w-[200px] h-12 flex items-center justify-center space-x-2 px-4 rounded-full bg-slate-900 text-white font-bold text-sm shadow-xl shadow-slate-900/25 hover:bg-black hover:scale-[1.03] active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none"
        >
          <svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>10초 간편 접수</span>
          <svg className="w-3.5 h-3.5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Bottom Button: 실시간 요금 조회 */}
        <button
          type="button"
          onClick={onOpen}
          className="w-[200px] h-12 flex items-center justify-center space-x-2 px-4 rounded-full bg-white/95 backdrop-blur-xl border border-slate-300 text-slate-800 font-bold text-sm shadow-xl shadow-slate-300/60 hover:border-slate-400 hover:scale-[1.03] active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
        >
          <span className="flex h-2 w-2 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
          </span>
          <span className="tracking-tight text-slate-800">실시간 요금 조회</span>
        </button>
      </div>

      {/* 📱 2. Mobile-First Bottom Sticky Action Dock (스마트폰 최하단 고정바) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 p-2.5 bg-white/95 backdrop-blur-2xl border-t border-slate-200/90 shadow-2xl flex items-center justify-between gap-2 safe-bottom">
        <a
          href="tel:1588-5575"
          className="flex-1 h-12 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-300/70 text-slate-900 font-bold text-xs flex items-center justify-center space-x-1.5 active:scale-95 transition-transform"
        >
          <svg className="w-4 h-4 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span>1588-5575</span>
        </a>

        <button
          type="button"
          onClick={onOpen}
          className="flex-1 h-12 rounded-2xl bg-white border border-slate-300 text-slate-800 font-bold text-xs flex items-center justify-center space-x-1 active:scale-95 transition-transform shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1" />
          <span>요금 조회</span>
        </button>

        <button
          type="button"
          onClick={onOpenDispatchModal}
          className="flex-[1.2] h-12 rounded-2xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center space-x-1.5 active:scale-95 transition-transform shadow-lg shadow-slate-900/20"
        >
          <svg className="w-3.5 h-3.5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>간편 접수</span>
        </button>
      </div>

      {/* Modern Light Price Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-md transition-opacity"
            onClick={onClose}
          />

          {/* Modal Content */}
          <div className="relative z-10 w-full max-w-2xl rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-orange-50 border border-orange-200 text-[10px] font-bold text-orange-600 mb-1.5">
                  <span>회사 정식 요금표 조회 DB</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-black text-slate-900">
                  실시간 퀵서비스 요금 조회
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors font-bold text-sm cursor-pointer"
                aria-label="닫기"
              >
                ✕
              </button>
            </div>

            {/* Segmented Switcher */}
            <div className="grid grid-cols-2 gap-1.5 p-1.5 rounded-2xl bg-slate-100 border border-slate-200 mb-6">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("dong");
                  setResult(null);
                }}
                className={`py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                  activeTab === "dong"
                    ? "bg-white text-slate-900 shadow-sm shadow-slate-300"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                동대동 구간별 요금
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("distance");
                  setResult(null);
                }}
                className={`py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                  activeTab === "distance"
                    ? "bg-white text-slate-900 shadow-sm shadow-slate-300"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                주행 거리별 요금
              </button>
            </div>

            {/* TAB 1: Dong-to-Dong */}
            {activeTab === "dong" && (
              <form onSubmit={handleDongSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                    <div className="text-xs font-bold text-orange-600 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-orange-500 mr-2" />
                      출발지 (구·동)
                    </div>
                    <select
                      value={dongForm.originSido}
                      onChange={(e) => setDongForm({ ...dongForm, originSido: e.target.value })}
                      className="input-minimal !py-2 !text-xs bg-white text-slate-800 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="서울특별시">서울특별시</option>
                      <option value="경기도">경기도</option>
                      <option value="인천광역시">인천광역시</option>
                    </select>

                    <select
                      value={dongForm.originGungu}
                      onChange={(e) => setDongForm({ ...dongForm, originGungu: e.target.value })}
                      className="input-minimal !py-2 !text-xs bg-white text-slate-800 focus:ring-2 focus:ring-blue-500"
                    >
                      {dongForm.originSido === "서울특별시"
                        ? seoulGungus.map((g) => <option key={g} value={g}>{g}</option>)
                        : gyeonggiGungus.map((g) => <option key={g} value={g}>{g}</option>)}
                    </select>

                    <input
                      type="text"
                      value={dongForm.originDong}
                      onChange={(e) => setDongForm({ ...dongForm, originDong: e.target.value })}
                      placeholder="출발 동 이름 (예: 역삼동, 삼성동)"
                      required
                      className="input-minimal !py-2 !text-xs bg-white text-slate-800 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                    <div className="text-xs font-bold text-blue-600 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
                      도착지 (구·동)
                    </div>
                    <select
                      value={dongForm.destSido}
                      onChange={(e) => setDongForm({ ...dongForm, destSido: e.target.value })}
                      className="input-minimal !py-2 !text-xs bg-white text-slate-800 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="서울특별시">서울특별시</option>
                      <option value="경기도">경기도</option>
                      <option value="인천광역시">인천광역시</option>
                    </select>

                    <select
                      value={dongForm.destGungu}
                      onChange={(e) => setDongForm({ ...dongForm, destGungu: e.target.value })}
                      className="input-minimal !py-2 !text-xs bg-white text-slate-800 focus:ring-2 focus:ring-blue-500"
                    >
                      {dongForm.destSido === "서울특별시"
                        ? seoulGungus.map((g) => <option key={g} value={g}>{g}</option>)
                        : gyeonggiGungus.map((g) => <option key={g} value={g}>{g}</option>)}
                    </select>

                    <input
                      type="text"
                      value={dongForm.destDong}
                      onChange={(e) => setDongForm({ ...dongForm, destDong: e.target.value })}
                      placeholder="도착 동 이름 (예: 잠실동, 판교동)"
                      required
                      className="input-minimal !py-2 !text-xs bg-white text-slate-800 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    배송 차량 선택 (5개 차종)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {[
                      { id: "bike", label: "오토바이", desc: "20kg 이내" },
                      { id: "damas", label: "다마스", desc: "350kg" },
                      { id: "labo", label: "라보", desc: "500kg" },
                      { id: "van", label: "밴", desc: "500kg 밀폐" },
                      { id: "truck", label: "트럭", desc: "1500kg" },
                    ].map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setDongForm({ ...dongForm, vehicleType: v.id as any })}
                        className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer active:scale-[0.98] ${
                          dongForm.vehicleType === v.id
                            ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                            : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <div className="text-xs font-bold">{v.label}</div>
                        <div className={`text-[10px] ${dongForm.vehicleType === v.id ? "text-slate-300" : "text-slate-500"}`}>{v.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-tactile-primary !py-3.5 !text-sm font-bold shadow-xl shadow-slate-900/15 cursor-pointer active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-orange-500"
                >
                  {isLoading ? "회사 DB 요금 조회 중..." : "동대동 공식 요금 조회하기 →"}
                </button>
              </form>
            )}

            {/* TAB 2: Distance */}
            {activeTab === "distance" && (
              <form onSubmit={handleDistanceSubmit} className="space-y-6">
                <div className="space-y-4">
                  {/* 출발지 주소 + 주소찾기 */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                      <span className="flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-orange-500" />
                        <span>출발지 주소 (도로명/지번)</span>
                      </span>
                      <span className="text-[11px] text-slate-400 font-normal">건물명/도로명 검색 가능</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={distanceForm.originAddress}
                        onChange={(e) => setDistanceForm({ ...distanceForm, originAddress: e.target.value })}
                        placeholder="예: 서울시 강남구 테헤란로 123"
                        required
                        className="flex-1 input-minimal !py-2.5 !text-xs sm:!text-sm bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => openPostcode("origin")}
                        className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs sm:text-sm shrink-0 flex items-center space-x-1.5 active:scale-95 transition-all shadow-sm cursor-pointer"
                      >
                        <svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span>주소찾기</span>
                      </button>
                    </div>
                  </div>

                  {/* 도착지 주소 + 주소찾기 */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                      <span className="flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        <span>도착지 주소 (도로명/지번)</span>
                      </span>
                      <span className="text-[11px] text-slate-400 font-normal">건물명/도로명 검색 가능</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={distanceForm.destAddress}
                        onChange={(e) => setDistanceForm({ ...distanceForm, destAddress: e.target.value })}
                        placeholder="예: 서울시 송파구 올림픽로 300"
                        required
                        className="flex-1 input-minimal !py-2.5 !text-xs sm:!text-sm bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => openPostcode("dest")}
                        className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs sm:text-sm shrink-0 flex items-center space-x-1.5 active:scale-95 transition-all shadow-sm cursor-pointer"
                      >
                        <svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span>주소찾기</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                  <div>
                    <div className="flex justify-between items-baseline mb-1.5">
                      <label className="text-xs font-bold text-slate-700">예상 이동 거리</label>
                      <span className="text-lg font-black font-mono text-slate-900">{distanceForm.distanceKm} km</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={distanceForm.distanceKm}
                      onChange={(e) => setDistanceForm({ ...distanceForm, distanceKm: Number(e.target.value) })}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">배송 차종</label>
                    <select
                      value={distanceForm.vehicleType}
                      onChange={(e) => setDistanceForm({ ...distanceForm, vehicleType: e.target.value as any })}
                      className="input-minimal !py-2 !text-xs bg-white text-slate-800 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="bike">오토바이 (20kg)</option>
                      <option value="damas">다마스 (350kg)</option>
                      <option value="labo">라보 (500kg)</option>
                      <option value="van">밴 (500kg 밀폐)</option>
                      <option value="truck">트럭 (1500kg)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <label className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium cursor-pointer hover:bg-slate-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={distanceForm.isExpress}
                      onChange={(e) => setDistanceForm({ ...distanceForm, isExpress: e.target.checked })}
                      className="rounded bg-white border-slate-300 text-orange-600 focus:ring-orange-500"
                    />
                    <span>⚡ 급행 (+4,000)</span>
                  </label>

                  <label className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium cursor-pointer hover:bg-slate-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={distanceForm.isNight}
                      onChange={(e) => setDistanceForm({ ...distanceForm, isNight: e.target.checked })}
                      className="rounded bg-white border-slate-300 text-orange-600 focus:ring-orange-500"
                    />
                    <span>🌙 심야 (+5,000)</span>
                  </label>

                  <label className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium cursor-pointer hover:bg-slate-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={distanceForm.hasHelper}
                      onChange={(e) => setDistanceForm({ ...distanceForm, hasHelper: e.target.checked })}
                      className="rounded bg-white border-slate-300 text-orange-600 focus:ring-orange-500"
                    />
                    <span>📦 운반도움 (+15,000)</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-tactile-primary !py-3.5 !text-sm font-bold shadow-xl shadow-slate-900/15 cursor-pointer active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-orange-500"
                >
                  {isLoading ? "거리 요금 계산 중..." : "주행 거리 요금 조회하기 →"}
                </button>
              </form>
            )}

            {/* Live Result Card */}
            {result && (
              <div className="mt-6 p-5 rounded-2xl bg-slate-900 text-white animate-fade-in shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="text-xs font-bold text-amber-400">
                    DB 조회 완료: {result.routeDescription}
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 font-bold">
                    약 {result.estimatedMinutes}분 소요 예상
                  </span>
                </div>

                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">{result.vehicleName} 최종 운임</span>
                    <span className="text-3xl font-black font-mono text-white">
                      {result.totalPrice.toLocaleString()}
                    </span>
                    <span className="text-sm text-slate-400 ml-1">원</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleApplyToOrder}
                    className="btn-tactile-primary !bg-orange-500 hover:!bg-orange-600 !text-white !py-2.5 !px-5 !text-xs font-bold shadow-lg flex items-center space-x-1.5 cursor-pointer active:scale-[0.98]"
                  >
                    <span>간편 접수 바로가기</span>
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}