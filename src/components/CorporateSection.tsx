interface CorporateSectionProps {
  onOpenQuoteModal?: () => void;
}

export default function CorporateSection({ onOpenQuoteModal: _onOpenQuoteModal }: CorporateSectionProps = {}) {
  const benefits = [
    {
      number: "01",
      title: "기업 전용 맞춤 요금제",
      description: "월 정기 물량 및 주요 운송 노선에 맞춘 기업 전용 단가표를 제공합니다.",
      badge: "최대 30% 절감",
      icon: (
        <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "월 1회 통합 후불 정산",
      description: "건별 결제 번거로움 없이 월말 세금계산서 100% 자동 발행 및 상세 명세서를 지원합니다.",
      badge: "세무 자동화",
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "법인 전용 접수 콘솔",
      description: "사내 PC에서 원클릭 대량 접수, 다건 배차, 실시간 배송 경로 추적을 한눈에 관리합니다.",
      badge: "웹 / 모바일 지원",
      icon: (
        <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      number: "04",
      title: "안심 적재물 책임보험",
      description: "중요 서류부터 고가 화물까지 운송 중 파손·분실 시 최고 5,000만원 전액 보상 체계 완비.",
      badge: "100% 안심 보상",
      icon: (
        <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ];

  const brandRow1 = ["LesMore", "DKNY", "EXR", "TOD'S", "YSL", "Brioni"];
  const brandRow2 = ["DreamCIS", "Häagen-Dazs", "TOM FORD", "CJ홈쇼핑", "LIG손해보험", "삼양"];

  return (
    <section id="about" className="scroll-mt-14 py-16 sm:py-20 bg-white border-t border-slate-200/90 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── 1. Section Header ── */}
        <div className="mb-10 sm:mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 text-white text-[11px] font-mono font-bold tracking-widest uppercase mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            <span>03 CORPORATE</span>
          </div>
          
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-[1.2] break-keep mb-3">
            법인 고객은 접수부터 정산까지 한 번에
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium break-keep">
            기업 전용 요금 · 월 통합 정산 · 전담 배차 관제로 기업 물류 담당자의 업무를 획기적으로 줄여드립니다.
          </p>
        </div>

        {/* ── 2. 4 Benefit Cards Grid (Bespoke Swiss Architecture) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-14 sm:mb-18">
          {benefits.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-[0_2px_12px_rgb(0,0,0,0.03)] hover:border-slate-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full font-mono">
                    {item.badge}
                  </span>
                </div>

                <div className="text-[11px] font-mono font-bold text-slate-400 mb-1">
                  BENEFIT {item.number}
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-950 tracking-tight mb-2 group-hover:text-orange-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed break-keep font-normal">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── 3. Brand Showcase Section (Refined Luxury Typography & Layout) ── */}
        <div className="mb-12 sm:mb-16">
          <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-display text-lg sm:text-xl font-black text-slate-950 tracking-tight flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
              <span>이미 이런 주요 브랜드가 드림델과 함께합니다</span>
            </h3>
            <span className="text-xs font-mono text-slate-400 font-bold hidden sm:inline">
              PROVEN TRACK RECORD
            </span>
          </div>

          {/* 12 Brand Boxes (6 x 2 Grid) */}
          <div className="space-y-3">
            {/* Row 1 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {brandRow1.map((brand, idx) => (
                <div
                  key={idx}
                  className="h-16 sm:h-20 rounded-xl bg-slate-50/90 border border-slate-200/80 flex items-center justify-center p-3 text-center hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all group"
                >
                  <span className="font-display font-black text-xs sm:text-sm text-slate-700 group-hover:text-slate-950 tracking-wider">
                    {brand}
                  </span>
                </div>
              ))}
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {brandRow2.map((brand, idx) => (
                <div
                  key={idx}
                  className="h-16 sm:h-20 rounded-xl bg-slate-50/90 border border-slate-200/80 flex items-center justify-center p-3 text-center hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all group"
                >
                  <span className="font-display font-black text-xs sm:text-sm text-slate-700 group-hover:text-slate-950 tracking-wider">
                    {brand}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 4. Bottom Corporate Consultation Callout Box (드림델 전화번호 직통 안내) ── */}
        <div className="p-7 sm:p-9 rounded-2xl bg-slate-950 text-white border border-slate-800 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[11px] font-bold text-orange-400 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span>법인 계약 전담팀 직통</span>
            </div>
            <h4 className="font-display text-xl sm:text-2xl font-black text-white tracking-tight mb-1.5">
              법인 계약 상담이 필요하신가요?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 font-medium break-keep">
              물량과 정기 운송 노선을 알려주시면 전담 담당자가 1:1 맞춤 우대 단가를 신속히 제안드립니다.
            </p>
          </div>

          {/* Mobile: 실제 전화 발신 연결 */}
          <a
            href="tel:1588-5575"
            className="md:hidden shrink-0 w-full px-7 py-4 rounded-xl bg-white hover:bg-orange-50 text-slate-950 font-black text-sm sm:text-base shadow-xl transition-all active:scale-95 cursor-pointer text-center inline-flex items-center justify-center space-x-2.5 group"
          >
            <svg className="w-4 h-4 text-orange-600 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>법인 상담 문의: 1588-5575</span>
          </a>

          {/* PC (Desktop): 클릭 안되고 안내만 되는 형태 */}
          <div
            className="hidden md:inline-flex shrink-0 px-8 py-4 rounded-xl bg-white text-slate-950 font-black text-sm sm:text-base shadow-xl text-center items-center justify-center space-x-2.5 select-text cursor-default"
          >
            <svg className="w-4 h-4 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>법인 상담 문의: 1588-5575</span>
          </div>
        </div>
      </div>
    </section>
  );
}
