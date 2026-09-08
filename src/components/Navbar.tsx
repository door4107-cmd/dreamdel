"use client";

import { useState, useEffect } from "react";

interface NavItem {
  href: string;
  label: string;
}

interface NavbarProps {
  navItems: NavItem[];
  onOpenPriceModal?: () => void;
  onOpenDispatchModal?: () => void;
  onOpenQuoteModal?: () => void;
  onOpenQuickTalkModal?: () => void;
}


export default function Navbar({
  navItems,
  onOpenPriceModal,
  onOpenDispatchModal,
  onOpenQuoteModal,
  onOpenQuickTalkModal,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const pageScroller = document.getElementById("page-scroller");
    const handleScroll = () => {
      setScrolled((pageScroller?.scrollTop ?? window.scrollY) > 15);
    };
    const scrollTarget = pageScroller ?? window;
    scrollTarget.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => scrollTarget.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const handleNavClick = (href: string) => {
    if (href === "#calculator" && onOpenQuoteModal) {
      onOpenQuoteModal();
    } else if (href === "#price" && onOpenPriceModal) {
      onOpenPriceModal();
    } else if (href === "#order" && onOpenDispatchModal) {
      onOpenDispatchModal();
    } else {
      scrollTo(href.replace("#", ""));
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-3 pt-2 sm:px-6 sm:pt-3">
      <div className="pointer-events-auto relative z-10 mx-auto max-w-7xl">
        <div
          className={`flex w-full min-w-0 items-center justify-between rounded-2xl border px-3 py-2 sm:px-4 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-300 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] ${
            scrolled
              ? "border-slate-800 bg-[#0B0F19]/95 text-white shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
              : "border-slate-800/80 bg-[#0B0F19]/90 text-white"
          }`}
        >
          {/* ── 1. Left: 한글 드림델 텍스트 브랜드 & 전화번호 ── */}
          <div className="flex items-center gap-2 sm:gap-3 lg:col-start-1 lg:justify-self-start shrink-0">
            <button
              type="button"
              onClick={() => scrollTo("hero")}
              className="group shrink-0 flex items-center text-left leading-none cursor-pointer"
              aria-label="드림델 첫 화면으로 이동"
            >
              <span className="flex flex-col">
                <span className="font-display text-xl sm:text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 drop-shadow-[0_2px_16px_rgba(249,115,22,0.5)] group-hover:brightness-125 group-hover:scale-[1.02] transition-all duration-300">
                  드림델
                </span>
                <span className="text-[8px] sm:text-[9px] font-bold tracking-widest text-slate-400 leading-none">
                  QUICK · FREIGHT
                </span>
              </span>
            </button>

            {/* 전화번호 */}
            <div className="h-5 w-[1px] bg-slate-800 mx-0.5 hidden sm:block" />
            <a
              href="tel:1588-5575"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 shadow-sm transition-all active:scale-95 group shrink-0"
              aria-label="고객센터 전화 1588-5575"
            >
              <svg aria-hidden="true" className="h-3.5 w-3.5 text-orange-400 shrink-0 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-display text-xs sm:text-base font-black text-white tracking-tight whitespace-nowrap">
                1588-5575
              </span>
            </a>
          </div>

          {/* ── 2. Center: 네비게이션 메뉴 ── */}
          <nav className="hidden items-center gap-0.5 lg:col-start-2 lg:flex lg:justify-self-center" aria-label="주요 메뉴">
            {navItems.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => handleNavClick(item.href)}
                className="rounded-full px-3 py-1.5 text-sm font-bold text-slate-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* ── 3. Right: 인터넷접수 & AI퀵톡접수 2개 액션 버튼 (메뉴바 상시 노출, 깔끔한 솔리드 캡슐) ── */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:col-start-3 lg:justify-self-end shrink-0">
            {/* 인터넷접수 버튼 */}
            {onOpenDispatchModal && (
              <button
                type="button"
                onClick={onOpenDispatchModal}
                className="flex h-9 w-[94px] sm:w-[114px] items-center justify-center gap-1.5 rounded-full border border-blue-700/30 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-[11.5px] sm:text-xs font-black text-white shadow-sm transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
              >
                <svg aria-hidden="true" className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>인터넷접수</span>
              </button>
            )}

            {/* AI퀵톡접수 버튼 */}
            {onOpenQuickTalkModal && (
              <button
                type="button"
                onClick={onOpenQuickTalkModal}
                className="flex h-9 w-[94px] sm:w-[114px] items-center justify-center gap-1.5 rounded-full border border-black/10 bg-[#FEE500] hover:bg-[#FDD835] active:bg-[#FBC02D] text-[11.5px] sm:text-xs font-black text-[#191919] shadow-sm transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
              >
                <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-[#191919]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.558 1.708 4.8 4.27 6.054-.187.697-.68 2.528-.778 2.923-.122.493.18.487.38.354.157-.105 2.502-1.701 3.518-2.392.525.077 1.06.118 1.61.118 4.97 0 9-3.185 9-7.115S16.97 3 12 3z" />
                </svg>
                <span>AI퀵톡접수</span>
              </button>
            )}

            {/* 모바일 햄버거 토글 */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="grid h-9 w-9 place-items-center rounded-full bg-slate-900 text-slate-200 hover:bg-slate-800 border border-slate-700/80 shadow-sm transition-all active:scale-95 lg:hidden cursor-pointer shrink-0"
              aria-expanded={isMenuOpen}
              aria-label="메뉴"
            >
              <span className="text-sm sm:text-base leading-none font-bold">{isMenuOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>

        {/* 모바일 네비게이션 드롭다운 */}
        {isMenuOpen && (
          <nav
            className="mt-2 space-y-1.5 rounded-2xl border border-slate-800 bg-[#0B0F19]/95 p-3 shadow-2xl backdrop-blur-xl lg:hidden"
            aria-label="모바일 주요 메뉴"
          >
            {navItems.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => handleNavClick(item.href)}
                className="block w-full rounded-xl px-4 py-2.5 text-left text-sm font-bold text-slate-200 hover:bg-white/10 hover:text-orange-400 transition-colors"
              >
                {item.label}
              </button>
            ))}

            <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-2">
              {onOpenDispatchModal && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenDispatchModal();
                  }}
                  className="flex h-10 items-center justify-center gap-1.5 px-3 rounded-xl border border-blue-700/30 bg-blue-600 text-white font-black text-xs shadow-sm active:scale-95 transition-transform"
                >
                  <svg aria-hidden="true" className="h-4 w-4 shrink-0 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>인터넷접수</span>
                </button>
              )}

              {onOpenQuickTalkModal && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenQuickTalkModal();
                  }}
                  className="flex h-10 items-center justify-center gap-1.5 px-3 rounded-xl bg-[#FEE500] text-[#191919] font-black text-xs shadow-sm border border-black/10 active:scale-95 transition-transform"
                >
                  <svg className="h-4 w-4 shrink-0 text-[#191919]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.558 1.708 4.8 4.27 6.054-.187.697-.68 2.528-.778 2.923-.122.493.18.487.38.354.157-.105 2.502-1.701 3.518-2.392.525.077 1.06.118 1.61.118 4.97 0 9-3.185 9-7.115S16.97 3 12 3z" />
                  </svg>
                  <span>AI퀵톡접수</span>
                </button>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
