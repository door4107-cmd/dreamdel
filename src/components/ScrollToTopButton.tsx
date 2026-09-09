"use client";

import { useState, useEffect } from "react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const pageScroller = document.getElementById("page-scroller");
    const toggleVisibility = () => {
      if ((pageScroller?.scrollTop ?? window.scrollY) > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const scrollTarget = pageScroller ?? window;
    scrollTarget.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility();

    return () => {
      scrollTarget.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    const pageScroller = document.getElementById("page-scroller");
    if (pageScroller) {
      pageScroller.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="최상단으로 이동"
      title="최상단으로 이동"
      className={`fixed bottom-16 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center justify-center w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-slate-900/95 hover:bg-orange-600 text-white backdrop-blur-md border border-slate-700/90 shadow-lg hover:shadow-orange-500/25 transition-all duration-200 group cursor-pointer active:scale-95 ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto scale-100"
          : "opacity-0 translate-y-2 pointer-events-none scale-90"
      }`}
    >
      <svg
        className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-200 group-hover:-translate-y-0.5"
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
