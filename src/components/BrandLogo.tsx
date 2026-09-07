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
      <span className="font-display text-xl sm:text-2xl font-black tracking-tight text-orange-600 group-hover:text-black transition-colors">
        드림델
      </span>
      <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 tracking-widest mt-1">
        QUICK · FREIGHT
      </span>
    </button>
  );
}
