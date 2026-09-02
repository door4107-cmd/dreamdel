"use client";

interface Client {
  name: string;
  category: string;
  desc: string;
}

export default function ClientLogos() {
  const clients: Client[] = [
    { name: "Yves Saint Laurent", category: "럭셔리 패션", desc: "입생로랑 코리아" },
    { name: "TOM FORD", category: "명품 패션", desc: "톰포드 뷰티·패션" },
    { name: "TOD'S", category: "럭셔리 레더", desc: "토즈 코리아" },
    { name: "Brioni", category: "하이엔드 수트", desc: "브리오니" },
    { name: "DKNY", category: "글로벌 패션", desc: "도나카란 뉴욕" },
    { name: "Häagen-Dazs", category: "글로벌 F&B", desc: "하겐다즈 코리아" },
    { name: "CJ홈쇼핑", category: "미디어 커머스", desc: "CJ ENM 커머스부문" },
    { name: "samyang", category: "식품·바이오", desc: "삼양그룹" },
    { name: "LIG손해보험", category: "금융·보험", desc: "LIG (KB손해보험)" },
    { name: "DreamCIS", category: "임상 연구", desc: "드림씨아이에스" },
    { name: "EXR", category: "스포츠 웨어", desc: "이엑스알 코리아" },
    { name: "LesMore", category: "슈즈 멀티샵", desc: "레스모아" },
  ];

  return (
    <section id="clients" className="py-16 sm:py-20 bg-white border-t border-slate-200/90 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/90 text-xs font-bold text-blue-700 mb-3.5 shadow-sm">
            <svg className="w-3.5 h-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>드림델 주요 고객사 & B2B 파트너십</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight break-keep">
            대한민국을 대표하는 글로벌 브랜드가<br className="hidden sm:inline" />
            <span className="text-gradient-vermilion">드림델의 신속하고 안전한 배송</span>을 선택합니다.
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-500 font-medium break-keep">
            명품 패션 · 글로벌 F&B · 종합 엔터테인먼트 · 제약 바이오 등 수많은 기업의 안심 물류 파트너
          </p>
        </div>

        {/* 12 Major Clients Showcase Grid (12개 고객사 정밀 그리드) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {clients.map((client) => (
            <div
              key={client.name}
              className="p-4 sm:p-5 rounded-2xl bg-[#F8F9FC] border border-slate-200/80 hover:border-slate-300 hover:bg-white hover:shadow-lg transition-all duration-200 flex flex-col justify-between items-center text-center group cursor-pointer active:scale-95"
            >
              <div className="w-full">
                <span className="text-[10px] font-bold text-slate-500 group-hover:text-blue-600 transition-colors uppercase tracking-wider block mb-2">
                  {client.category}
                </span>
                <div className="font-black text-sm sm:text-base text-slate-900 group-hover:text-orange-600 transition-colors tracking-tight font-display py-1">
                  {client.name}
                </div>
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-2 pt-2 border-t border-slate-200/60 w-full truncate">
                {client.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Corporate Trust B2B Assurance Banner */}
        <div className="mt-10 p-5 sm:p-6 rounded-3xl bg-slate-950 text-white border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center space-x-3.5 text-left">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-bold text-white">기업 회원 전용 월정산 & 전자세금계산서 발행</div>
              <div className="text-xs text-slate-400 mt-0.5">정기 배송 계약 시 기업 우대 할인 및 전담 배차 매니저 1:1 배정</div>
            </div>
          </div>

          <a
            href="tel:1588-5575"
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white hover:bg-orange-50 text-slate-900 font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 text-center shrink-0"
          >
            기업 제휴 상담: 1588-5575
          </a>
        </div>
      </div>
    </section>
  );
}