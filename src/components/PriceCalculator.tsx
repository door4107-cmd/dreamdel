"use client";

import { useState } from "react";

interface VehicleOption {
  id: string;
  name: string;
  sub: string;
  basePrice: number;
  baseKm: number;
  ratePerKm: number;
}

export default function PriceCalculator() {
  const vehicles: VehicleOption[] = [
    { id: "bike", name: "오토바이 급행", sub: "서류/소형 (20kg 이내)", basePrice: 8000, baseKm: 5, ratePerKm: 1000 },
    { id: "damas", name: "다마스", sub: "박스/가전 (350kg 이내)", basePrice: 25000, baseKm: 10, ratePerKm: 1500 },
    { id: "labo", name: "라보", sub: "가구/파레트 (500kg 이내)", basePrice: 35000, baseKm: 10, ratePerKm: 1800 },
    { id: "truck", name: "트럭", sub: "전국특송 (1,100kg 이내)", basePrice: 50000, baseKm: 15, ratePerKm: 2200 },
  ];

  const [selectedId, setSelectedId] = useState<string>("bike");
  const [distance, setDistance] = useState<number>(12);
  const [isUrgent, setIsUrgent] = useState<boolean>(false);
  const [isNightTime, setIsNightTime] = useState<boolean>(false);
  const [hasHelper, setHasHelper] = useState<boolean>(false);

  const vehicle = vehicles.find((v) => v.id === selectedId) || vehicles[0];

  const extraKm = Math.max(0, distance - vehicle.baseKm);
  const distanceFee = extraKm * vehicle.ratePerKm;
  const urgentFee = isUrgent ? 4000 : 0;
  const nightFee = isNightTime ? 5000 : 0;
  const helperFee = hasHelper ? 15000 : 0;

  const totalFee = vehicle.basePrice + distanceFee + urgentFee + nightFee + helperFee;

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl bg-[#0e0e12] border border-white/[0.08] p-6 sm:p-10 shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Input Column */}
        <div className="lg:col-span-7 space-y-8">
          {/* Step 1: Vehicle Select */}
          <div>
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-3">
              Step 1 · 필요한 차량을 골라주세요
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {vehicles.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedId(v.id)}
                  className={`p-3.5 rounded-xl text-left border transition-all ${
                    selectedId === v.id
                      ? "bg-white/[0.08] border-amber-400/40 text-white shadow-md"
                      : "bg-white/[0.02] border-white/[0.06] text-neutral-300 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="text-sm font-bold text-white mb-0.5">{v.name}</div>
                  <div className="text-[11px] text-neutral-400">{v.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Distance */}
          <div>
            <div className="flex justify-between items-baseline mb-3">
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Step 2 · 예상 이동 거리 설정
              </div>
              <div className="text-2xl font-bold font-mono text-white">
                {distance} <span className="text-sm text-neutral-400 font-sans">km</span>
              </div>
            </div>

            <input
              type="range"
              min="1"
              max="100"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-white mb-3"
            />

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-neutral-400">자주 이용하는 거리:</span>
              {[5, 12, 25, 50].map((d) => (
                <button
                  key={d}
                  onClick={() => setDistance(d)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                    distance === d
                      ? "bg-white/15 text-white border-white/30"
                      : "bg-white/[0.02] text-neutral-400 border-white/[0.06] hover:text-white"
                  }`}
                >
                  {d}km
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Options */}
          <div>
            <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3">
              Step 3 · 필요한 옵션만 쏙쏙 선택
            </div>
            <div className="space-y-2">
              <label className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] cursor-pointer transition-colors">
                <div>
                  <div className="text-xs font-semibold text-white">⚡ 초특급 논스톱 직행 (+4,000원)</div>
                  <div className="text-[11px] text-neutral-400">다른 경유지 없이 고객님 물품만 최우선으로 직행합니다</div>
                </div>
                <input
                  type="checkbox"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-white focus:ring-0 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] cursor-pointer transition-colors">
                <div>
                  <div className="text-xs font-semibold text-white">🌙 심야 / 새벽 배차 (+5,000원)</div>
                  <div className="text-[11px] text-neutral-400">20:00 ~ 익일 08:00 야간 전담 안심 기사님이 출동합니다</div>
                </div>
                <input
                  type="checkbox"
                  checked={isNightTime}
                  onChange={(e) => setIsNightTime(e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-white focus:ring-0 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] cursor-pointer transition-colors">
                <div>
                  <div className="text-xs font-semibold text-white">📦 기사님 상하차 운반 도움 (+15,000원)</div>
                  <div className="text-[11px] text-neutral-400">계단 운반 및 무거운 짐 픽업을 친절하게 도와드립니다</div>
                </div>
                <input
                  type="checkbox"
                  checked={hasHelper}
                  onChange={(e) => setHasHelper(e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-white focus:ring-0 cursor-pointer"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Live Receipt Card */}
        <div className="lg:col-span-5 rounded-2xl bg-black/60 border border-white/[0.09] p-6 sm:p-7 flex flex-col justify-between h-full shadow-xl">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
                ✨ 실시간 정찰제 견적서
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                1원도 투명하게
              </span>
            </div>

            <div className="mb-6">
              <div className="text-xs text-neutral-400 mb-1">예상 결제 금액</div>
              <div className="text-4xl sm:text-5xl font-black font-mono text-white tracking-tight">
                {totalFee.toLocaleString()}
                <span className="text-lg font-sans font-normal text-neutral-400 ml-1">원</span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-neutral-300 pb-6 border-b border-white/[0.08] mb-6">
              <div className="flex justify-between">
                <span>{vehicle.name} 기본운임 ({vehicle.baseKm}km)</span>
                <span className="text-white font-mono">{vehicle.basePrice.toLocaleString()}원</span>
              </div>
              {extraKm > 0 && (
                <div className="flex justify-between">
                  <span>추가 거리 운임 ({extraKm}km)</span>
                  <span className="text-white font-mono">+{distanceFee.toLocaleString()}원</span>
                </div>
              )}
              {isUrgent && (
                <div className="flex justify-between text-amber-400">
                  <span>⚡ 초특급 직행 할증</span>
                  <span className="font-mono">+{urgentFee.toLocaleString()}원</span>
                </div>
              )}
              {isNightTime && (
                <div className="flex justify-between text-neutral-300">
                  <span>🌙 심야 배차 할증</span>
                  <span className="font-mono">+{nightFee.toLocaleString()}원</span>
                </div>
              )}
              {hasHelper && (
                <div className="flex justify-between text-neutral-300">
                  <span>📦 기사님 운반 보조료</span>
                  <span className="font-mono">+{helperFee.toLocaleString()}원</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <p className="text-[11px] text-neutral-400 text-center mb-3 leading-relaxed">
              ※ 통행료 및 기상 상황에 따라 실제 도로 기준 미세한 차이가 있을 수 있습니다.
            </p>
            <button
              onClick={() => {
                const el = document.getElementById("order");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full btn-tactile-primary !py-3.5 !text-xs font-bold shadow-lg shadow-white/10"
            >
              이 금액으로 10초 만에 접수하기 ✨
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}