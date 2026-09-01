"use client";

interface BrandLogoProps {
  className?: string;
  showText?: boolean;
}

export default function BrandLogo({ className = "h-10 sm:h-12" }: BrandLogoProps) {
  return (
    <div className={`relative flex items-center ${className}`}>
      <img
        src="/images/logo.jpg"
        alt="드림델 공식 로고"
        className="h-9 sm:h-11 w-auto object-contain mix-blend-multiply select-none hover:scale-105 transition-transform"
      />
    </div>
  );
}