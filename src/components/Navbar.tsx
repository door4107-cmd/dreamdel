"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";

interface NavItem {
  href: string;
  label: string;
}

interface NavbarProps {
  navItems: NavItem[];
  onOpenPriceModal?: () => void;
  onOpenDispatchModal?: () => void;
  onOpenQuoteModal?: () => void;
}

export default function Navbar({ navItems, onOpenPriceModal, onOpenDispatchModal, onOpenQuoteModal }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`mt-4 flex items-center justify-between h-16 md:h-20 px-5 md:px-8 rounded-full transition-all duration-300 ${
            scrolled
              ? "bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
              : "bg-white/90 backdrop-blur-xl border border-slate-200/70 shadow-[0_4px_20px_rgb(0,0,0,0.04)]"
          }`}
        >
          {/* Brand Identity with Modern DDL Logo */}
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center space-x-3 group cursor-pointer"
          >
            <BrandLogo className="h-9 sm:h-10" showText={true} />
            <span className="hidden lg:inline-block h-4 w-px bg-slate-300 mx-1" />
            <div className="hidden lg:flex items-center space-x-2 text-xs sm:text-sm font-extrabold text-orange-600">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span>30초 쾌속 배차</span>
            </div>
          </Link>

          {/* Desktop Navigation Links (크고 또렷해진 메뉴 폰트) */}
          <nav className="hidden md:flex items-center space-x-1.5">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="px-5 py-2.5 rounded-full text-base font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-all cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Area (24시 접수 1588-5575 & 오더접수 버튼) */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Phone Info: Mobile (clickable) */}
            <a
              href="tel:1588-5575"
              className="md:hidden flex flex-col items-end text-right active:scale-95 transition-transform"
            >
              <span className="text-[10px] font-bold text-slate-500 leading-none">24시 접수</span>
              <span className="font-mono font-black text-sm text-slate-900 leading-tight">1588-5575</span>
            </a>

            {/* Phone Info: PC Desktop (unclickable) */}
            <div className="hidden md:flex flex-col items-end text-right select-text cursor-default">
              <span className="text-[11px] font-medium text-slate-500 leading-none">24시 접수</span>
              <span className="font-mono font-black text-base text-slate-900 leading-tight">1588-5575</span>
            </div>

            {/* [오더접수 ↗] Button */}
            {onOpenDispatchModal && (
              <button
                type="button"
                onClick={onOpenDispatchModal}
                className="hidden sm:inline-flex items-center space-x-1 px-4 sm:px-5 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 active:bg-black text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <span>오더접수</span>
                <span>↗</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 focus:outline-none cursor-pointer"
              aria-label="메뉴"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 p-4 rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-2xl space-y-1 animate-fade-in">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="w-full text-left px-4 py-3 rounded-2xl text-sm font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-100/80 transition-colors"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-3 mt-2 border-t border-slate-100">
              <a
                href="tel:1588-5575"
                className="block text-center py-3 text-xs font-bold text-slate-800 bg-slate-100 rounded-2xl"
              >
                📞 24시간 친절 상담: 1588-5575
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}