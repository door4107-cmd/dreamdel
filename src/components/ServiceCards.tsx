"use client";

import Image from "next/image";

interface ServiceItem {
  id: string;
  name: string;
  badge: string;
  summary: string;
  capacity: string;
  imageSrc: string;
  accentColor: string;
  accentBg: string;
  recommended: string;
}

export default function ServiceCards() {
  const services: ServiceItem[] = [
    {
      id: "bike",
      name: "오토바이",
      badge: "가장 빠른 배차",
      summary: "긴급 서류 · 소형 박스 · 여권 · 귀중품",
      capacity: "최대 20kg",
      imageSrc: "/images/vehicles/bike.jpg",
      accentColor: "text-orange-600",
      accentBg: "bg-orange-50 border-orange-200/80 text-orange-700",
      recommended: "30분 내 초고속 도착",
    },
    {
      id: "damas",
      name: "다마스",
      badge: "우천 안심 밀폐",
      summary: "라면박스 10~15개 · 데스크톱 · 소형가전",
      capacity: "최대 350kg",
      imageSrc: "/images/vehicles/damas.jpg",
      accentColor: "text-blue-600",
      accentBg: "bg-blue-50 border-blue-200/80 text-blue-700",
      recommended: "비·눈 100% 안심 차단",
    },
    {
      id: "labo",
      name: "라보",
      badge: "가구 · 파레트",
      summary: "소파 · 매트리스 · 전시장 부스 장비",
      capacity: "최대 500kg",
      imageSrc: "/images/vehicles/labo.jpg",
      accentColor: "text-emerald-600",
      accentBg: "bg-emerald-50 border-emerald-200/80 text-emerald-700",
      recommended: "부피 큰 가구 적재 최적화",
    },
    {
      id: "van",
      name: "밴",
      badge: "대용량 밀폐",
      summary: "의류 행거 · 행사 장비 · 방송 음향 기기",
      capacity: "최대 500kg",
      imageSrc: "/images/vehicles/van.jpg",
      accentColor: "text-cyan-600",
      accentBg: "bg-cyan-50 border-cyan-200/80 text-cyan-700",
      recommended: "스타리아급 안심 밀폐 운송",
    },
    {
      id: "truck",
      name: "트럭",
      badge: "전국 당일 직행",
      summary: "기업 정기 물류 · 산업 장비 · 대형 화물",
      capacity: "최대 1500kg",
      imageSrc: "/images/vehicles/truck.jpg",
      accentColor: "text-purple-600",
      accentBg: "bg-purple-50 border-purple-200/80 text-purple-700",
      recommended: "전국 어디든 당일 직행",
    },
  ];

  return (
    <div className="w-full">
      {/* Editorial Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-5 border-b border-slate-200/90">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-orange-50 border border-orange-200/80 text-[11px] font-bold text-orange-600 mb-2">
            <svg className="w-3.5 h-3.5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>맞춤 차량 스펙 가이드</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
            어떤 화물이든, 가장 완벽한 크기로.
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-3 sm:mt-0">
          적재 용량별 최적 차량 배치 · 10초 실시간 AI 기사님 매칭
        </p>
      </div>

      {/* 5-Column Grid with Luxury Automotive Showcase Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
        {services.map((item) => (
          <div
            key={item.id}
            className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group overflow-hidden cursor-pointer active:scale-[0.98]"
          >
            <div>
              {/* Top Badges */}
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${item.accentBg}`}>
                  {item.badge}
                </span>
                <span className={`text-xs font-mono font-black ${item.accentColor}`}>
                  {item.capacity}
                </span>
              </div>

              {/* Vehicle Render Image Showcase Frame */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-4 bg-slate-950 border border-slate-200/80 shadow-inner group-hover:shadow-md transition-shadow">
                <Image
                  src={item.imageSrc}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
                  priority
                />
              </div>

              {/* Title & Summary */}
              <h3 className="text-lg font-black text-slate-950 tracking-tight mb-1.5 group-hover:text-orange-600 transition-colors">
                {item.name}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                {item.summary}
              </p>
            </div>

            {/* Bottom Feature Pill Tag */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 font-medium">
              <span>{item.recommended}</span>
              <svg className="w-3.5 h-3.5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}