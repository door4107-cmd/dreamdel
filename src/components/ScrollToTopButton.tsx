"use client";

import { useState, useEffect } from "react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility();

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="최상단으로 이동"
      title="최상단으로 이동"
      className={`fixed bottom-4 right-6 sm:bottom-4 sm:right-6 z-40 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-900/90 hover:bg-orange-500 text-white backdrop-blur-md border border-slate-700/80 shadow-md hover:shadow-orange-500/25 transition-all duration-200 group cursor-pointer active:scale-90 ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto scale-100"
          : "opacity-0 translate-y-2 pointer-events-none scale-90"
      }`}
    >
      <svg
        className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:-translate-y-0.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.6"
          d="M5 11l7-7 7 7M12 4v16"
        />
      </svg>
    </button>
  );
}
