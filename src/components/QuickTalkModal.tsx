"use client";

import { useEffect } from "react";

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
  // Keyboard accessibility: Close modal on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/75 backdrop-blur-md animate-fade-in">
      <div
        className="fixed inset-0"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-lg rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden flex flex-col my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 text-white border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FEE500] text-[#191919] text-xs font-black shadow-sm">
              AI
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-white tracking-tight leading-tight">
                  드림델 24시 AI 퀵톡접수
                </h3>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-300 bg-amber-400/15 border border-amber-400/30 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  10초 배정
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                카카오톡으로 출발·도착지만 남기면 실시간 자동 배차
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center font-bold text-sm transition-colors cursor-pointer border border-slate-700"
            aria-label="닫기"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Main Hero Card */}
          <div className="p-4.5 rounded-2xl bg-slate-900 text-white border border-slate-800 relative overflow-hidden group">
            <div className="absolute top-0 inset-x-0 h-0.5 bg-amber-500" />
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-mono text-[10px] font-bold tracking-wider text-amber-400 uppercase mb-1">
                  INSTANT AUTO DISPATCH
                </div>
                <div className="font-bold text-base text-white tracking-tight mb-1">
                  출발지와 도착지 주소로 간편 접수
                </div>
                <p className="text-xs text-slate-300 leading-relaxed break-keep font-normal">
                  카카오톡 채널에 주소와 물품 정보를 입력하시면 관제 시스템에서 가장 가까운 기사님을 신속하게 자동 배차합니다.
                </p>
              </div>
            </div>
          </div>

          {/* 3-Step Process (에디토리얼 인덱스 스텝 바) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                DISPATCH PIPELINE
              </span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                무인 자동화 연동
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-left">
              {/* Step 1 */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between">
                <span className="font-mono text-[10px] font-black text-slate-500 tracking-wider block mb-1">
                  01 · CHAT
                </span>
                <div>
                  <span className="text-xs font-black text-slate-950 block">톡 메시지 전송</span>
                  <span className="text-[11px] text-slate-500 font-medium block mt-0.5 leading-tight">
                    출발·도착지 주소 입력
                  </span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 flex flex-col justify-between">
                <span className="font-mono text-[10px] font-black text-amber-700 tracking-wider block mb-1">
                  02 · AI MATCH
                </span>
                <div>
                  <span className="text-xs font-black text-slate-950 block">10초 자동배차</span>
                  <span className="text-[11px] text-amber-800/80 font-medium block mt-0.5 leading-tight">
                    최단거리 기사 우선 배정
                  </span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between">
                <span className="font-mono text-[10px] font-black text-slate-500 tracking-wider block mb-1">
                  03 · TRACK
                </span>
                <div>
                  <span className="text-xs font-black text-slate-950 block">실시간 관제</span>
                  <span className="text-[11px] text-slate-500 font-medium block mt-0.5 leading-tight">
                    픽업 및 도착 완료 알림
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-1">
            <a
              href="http://pf.kakao.com"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-[#FEE500] hover:bg-[#FDD835] active:bg-[#FBC02D] text-[#191919] font-black text-sm shadow-md flex items-center justify-center space-x-2 transition-all active:scale-95 cursor-pointer border border-[#E5CE00]"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.558 1.708 4.8 4.27 6.054-.187.697-.68 2.528-.778 2.923-.122.493.18.487.38.354.157-.105 2.502-1.701 3.518-2.392.525.077 1.06.118 1.61.118 4.97 0 9-3.185 9-7.115S16.97 3 12 3z" />
              </svg>
              <span>카카오톡 AI 퀵톡 접수하기 →</span>
            </a>

            {onOpenDispatchModal && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenDispatchModal();
                }}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm border border-slate-800 transition-all active:scale-95 cursor-pointer flex items-center justify-center space-x-1.5"
              >
                <span>인터넷 실시간 접수 바로가기 ↗</span>
              </button>
            )}

            <a
              href="tel:1588-5575"
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center space-x-2 transition-all text-center"
            >
              <span>전화 상담 및 접수: 1588-5575</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
