"use client";

import Link from "next/link";

interface FooterProps {
  onContact?: () => void;
  onOpenPriceModal?: () => void;
  onOpenDispatchModal?: () => void;
}

export default function Footer({ onContact, onOpenPriceModal, onOpenDispatchModal }: FooterProps) {
  return (
    <footer id="contact" className="border-t border-slate-200 bg-slate-950 text-slate-400 text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 24/7 Call Center Card */}
        <div className="mb-16 p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[11px] font-bold text-orange-400 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span>365일 24시간 친절 상담 센터 가동 중</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-black text-white mb-1">
              지금 바로 친절한 기사님이 필요하신가요?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              전화 한 통 또는 10초 온라인 접수로 가장 가까운 베테랑 기사님을 즉시 연결해 드립니다.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <a
              href="tel:1588-5575"
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-white text-slate-900 font-black flex items-center justify-center space-x-2.5 text-sm sm:text-base shadow-xl hover:bg-orange-50 transition-all active:scale-95 cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>📞 대표전화: 1588-5575</span>
            </a>
          </div>
        </div>

        {/* Directory Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
          <div>
            <div className="text-white font-bold mb-3 text-xs tracking-wider">배송 서비스</div>
            <ul className="space-y-2">
              <li><Link href="#services" className="hover:text-white transition-colors">오토바이 (서류/소형)</Link></li>
              <li><Link href="#services" className="hover:text-white transition-colors">다마스 (박스/가전)</Link></li>
              <li><Link href="#services" className="hover:text-white transition-colors">라보 (가구/파레트)</Link></li>
              <li><Link href="#services" className="hover:text-white transition-colors">밴 (500kg 밀폐)</Link></li>
              <li><Link href="#services" className="hover:text-white transition-colors">트럭 (1500kg 대형)</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-white font-bold mb-3 text-xs tracking-wider">요금 및 접수</div>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={onOpenPriceModal}
                  className="hover:text-white transition-colors text-left"
                >
                  실시간 정찰제 요금조회 (동대동/거리)
                </button>
              </li>
              <li><Link href="#services" className="hover:text-white transition-colors">기업 고객 월정산 혜택</Link></li>
              <li><Link href="#about" className="hover:text-white transition-colors">적재물 보험 1억 보상 안내</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-white font-bold mb-3 text-xs tracking-wider">서비스 거점</div>
            <ul className="space-y-2 text-slate-400">
              <li>서울 전역 (강남 / 논현 / 여의도 / 종로 / 마포)</li>
              <li>경기 전역 (판교 / 분당 / 수원 / 일산 / 용인)</li>
              <li>인천 및 수도권 주요 산업단지</li>
              <li>전국 KTX / 고속버스 연계 당일 특송</li>
            </ul>
          </div>
          <div>
            <div className="text-white font-bold mb-3 text-xs tracking-wider">드림델 이야기</div>
            <ul className="space-y-2">
              <li><Link href="#about" className="hover:text-white transition-colors">드림델 서비스 철학</Link></li>
              <li><span className="text-slate-400">안심 기사님 파트너 모집</span></li>
              <li><span className="text-slate-400">이용약관 및 개인정보처리방침</span></li>
            </ul>
          </div>
        </div>

        {/* Corporate Legal Notice (업로드해주신 사업자등록정보 100% 반영 + 신규 로고 배치) */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between text-slate-400 text-xs sm:text-[13px] gap-6 leading-relaxed">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Footer DDL Brand Logo */}
            <div className="p-2 rounded-2xl bg-white/95 shrink-0 shadow-md">
              <img
                src="/images/logo.jpg"
                alt="드림델 DDL 공식 로고"
                className="h-8 w-auto object-contain select-none"
              />
            </div>

            <div className="space-y-1.5">
              <p className="text-slate-200 font-semibold">
                서울특별시 강남구 논현동 114-14 금산빌딩 4층 (주)드림델 | 대표: 박상희
              </p>
              <p className="text-slate-400">
                사업자등록번호: <span className="text-slate-300 font-mono">211-86-78077</span> | 통신판매: <span className="text-slate-300">강남 2240호</span> | TEL: <span className="text-slate-200 font-bold font-mono">02-3446-7668</span> (대표: <span className="text-orange-400 font-bold font-mono">1588-5575</span>) | FAX: <span className="text-slate-300 font-mono">02-3446-6388</span>
              </p>
              <p className="text-slate-500 text-[11px]">
                현대해상 적재물 배상책임보험 1억원 정식 가입 (증권번호: 2026-HD-001)
              </p>
            </div>
          </div>
          <div className="shrink-0 text-slate-400 font-mono text-xs">
            COPYRIGHT 1994-{new Date().getFullYear()} (주)드림델 DREAMDEL.CO.KR ALL RIGHTS RESERVED
          </div>
        </div>
      </div>
    </footer>
  );
}