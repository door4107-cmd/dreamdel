"use client";

interface BrandLogoProps {
  className?: string;
  showText?: boolean;
  variant?: "dark" | "light";
  onClick?: () => void;
}

export default function BrandLogo({
  className = "",
  variant = "dark",
  onClick,
}: BrandLogoProps) {
  const isLight = variant === "light";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex flex-col text-left leading-none cursor-pointer select-none ${className}`}
      aria-label="드림델 홈으로 이동"
    >
      {isLight ? (
        <span className="font-display text-xl sm:text-2xl font-black tracking-tight text-slate-950 group-hover:text-orange-600 transition-colors flex items-baseline">
          드림델
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-600 ml-1 mb-0.5" />
        </span>
      ) : (
        <span className="font-display text-xl sm:text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 drop-shadow-[0_2px_14px_rgba(249,115,22,0.45)] group-hover:brightness-125 transition-all duration-300 flex items-baseline">
          드림델
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-400 ml-1 mb-0.5" />
        </span>
      )}
    </button>
  );
}
