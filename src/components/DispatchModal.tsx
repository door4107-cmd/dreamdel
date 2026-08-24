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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Window */}
      <div className="relative z-10 w-full max-w-5xl h-[92vh] max-h-[920px] rounded-3xl bg-white border border-slate-200 shadow-2xl flex flex-col overflow-hidden">
        {/* Clean Modal Header (오직 '실시간간편접수'만 심플하고 또렷하게 표시) */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-slate-900 border-b border-slate-800 shrink-0">
          <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
            실시간간편접수
          </h3>

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