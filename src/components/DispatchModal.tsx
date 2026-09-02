"use client";

import { useState } from "react";

interface DispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DispatchModal({ isOpen, onClose }: DispatchModalProps) {
  const [isLoading, setIsLoading] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-2 md:p-3 animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Window (대폭 확장된 대형 화면 창) */}
      <div className="relative z-10 w-[98vw] max-w-[1440px] h-[96vh] rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-2xl flex flex-col overflow-hidden">
        {/* Clean Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-3.5 bg-slate-900 border-b border-slate-800 shrink-0">
          <div className="flex items-center space-x-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
              실시간 간편접수
            </h3>
          </div>

          <button
            onClick={onClose}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs sm:text-sm font-bold transition-all active:scale-95 cursor-pointer border border-slate-700"
            aria-label="닫기"
          >
            <span>닫기</span>
            <span className="font-mono">✕</span>
          </button>
        </div>

        {/* Live Iframe Body */}
        <div className="relative w-full flex-1 bg-slate-50 overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10 space-y-3">
              <div className="w-10 h-10 border-3 border-orange-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-bold text-slate-600">
                공식 간편 접수 시스템을 안전하게 불러오는 중입니다...
              </p>
            </div>
          )}

          <iframe
            src="https://ad.dreamdel.co.kr"
            title="드림델 공식 간편접수 시스템"
            className="w-full h-full border-0 bg-white"
            onLoad={() => setIsLoading(false)}
            allow="geolocation; camera"
          />
        </div>
      </div>
    </div>
  );
}