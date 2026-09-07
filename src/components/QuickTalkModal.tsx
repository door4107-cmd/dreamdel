"use client";

interface QuickTalkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDispatchModal?: () => void;
}

export default function QuickTalkModal({
  isOpen,
  onClose,
  onOpenDispatchModal,
}: QuickTalkModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/75 backdrop-blur-md animate-fade-in">
      <div
        className="fixed inset-0"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-lg rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden flex flex-col my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 border-b border-amber-300/80">
          <div className="flex items-center space-x-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#191919] text-[#FEE500] text-sm font-black shadow-sm">
              AI
            </span>
            <div>
              <h3 className="text-base font-black text-slate-950 leading-tight">
                드림델 24시 AI 퀵톡접수
              </h3>
              <p className="text-[11px] font-bold text-slate-800">
                카카오톡으로 10초 만에 끝나는 초간편 자동배차
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 text-slate-900 flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
            aria-label="닫기"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Main Hero Card */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-slate-900">
            <div className="flex items-start gap-3">
              <span className="text-2xl shrink-0">⚡</span>
              <div className="space-y-1">
                <div className="font-bold text-sm text-slate-950">
                  출발지·도착지만 남기면 끝!
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  카카오톡 채널에 주소와 화물 내용만 남겨주시면 AI 관제 시스템이 가장 빠른 최단거리 기사님을 실시간 10초 내 자동 배차합니다.
                </p>
              </div>
            </div>
          </div>

          {/* 3-Step Process */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              HOW IT WORKS
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-lg block mb-1">💬</span>
                <span className="text-[11px] font-black text-slate-900 block">1. 톡 메시지</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">주소 & 연락처</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-lg block mb-1">🤖</span>
                <span className="text-[11px] font-black text-slate-900 block">2. AI 자동배차</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">실시간 10초 배정</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-lg block mb-1">🚀</span>
                <span className="text-[11px] font-black text-slate-900 block">3. 픽업 & 배송</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">위치 실시간 추적</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2">
            <a
              href="http://pf.kakao.com"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 px-4 rounded-2xl bg-[#FEE500] hover:bg-[#FDD835] active:bg-[#FBC02D] text-[#191919] font-black text-sm shadow-lg shadow-amber-300/40 flex items-center justify-center space-x-2 transition-all active:scale-95 cursor-pointer border border-[#E5CE00]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.558 1.708 4.8 4.27 6.054-.187.697-.68 2.528-.778 2.923-.122.493.18.487.38.354.157-.105 2.502-1.701 3.518-2.392.525.077 1.06.118 1.61.118 4.97 0 9-3.185 9-7.115S16.97 3 12 3z" />
              </svg>
              <span>카카오톡 AI 퀵톡 접수하기</span>
            </a>

            {onOpenDispatchModal && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenDispatchModal();
                }}
                className="w-full py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center space-x-1.5"
              >
                <span>인터넷접수 바로가기 ↗</span>
              </button>
            )}

            <a
              href="tel:1588-5575"
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center space-x-2 transition-all text-center"
            >
              <span>전화 상담 및 접수: 1588-5575</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
