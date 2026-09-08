"use client";

interface BrandLogoProps {
  className?: string;
  showText?: boolean;
  onClick?: () => void;
}

export default function BrandLogo({ className = "", onClick }: BrandLogoProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex flex-col text-left leading-none cursor-pointer select-none ${className}`}
      aria-label="드림델 홈으로 이동"
    >
      <span className="font-display text-xl sm:text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 drop-shadow-[0_2px_14px_rgba(249,115,22,0.45)] group-hover:from-slate-950 group-hover:via-slate-900 group-hover:to-slate-950 group-hover:drop-shadow-none transition-all duration-300">
        드림델
      </span>
      <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 tracking-widest mt-1">
        QUICK · FREIGHT
      </span>
    </button>
  );
}
