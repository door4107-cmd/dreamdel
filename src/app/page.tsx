"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CompanySection from "@/components/CompanySection";
import ServiceCards from "@/components/ServiceCards";
import CorporateSection from "@/components/CorporateSection";
import DriverSection from "@/components/DriverSection";
import FloatingActions from "@/components/FloatingActions";
import DispatchModal from "@/components/DispatchModal";
import QuickTalkModal from "@/components/QuickTalkModal";
import QuoteModal from "@/components/QuoteModal";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import Footer from "@/components/Footer";

export default function Home() {
  const pageScrollerRef = useRef<HTMLElement>(null);
  const isSectionTransitioningRef = useRef(false);
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);
  const [isQuickTalkModalOpen, setIsQuickTalkModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  useEffect(() => {
    const scroller = pageScrollerRef.current;
    if (!scroller) return;

    let unlockTimer: ReturnType<typeof setTimeout> | undefined;
    const handleWheel = (event: WheelEvent) => {
      if (!window.matchMedia("(min-width: 1024px)").matches || Math.abs(event.deltaY) < 2) return;

      event.preventDefault();
      if (isSectionTransitioningRef.current) return;

      const sections = Array.from(scroller.querySelectorAll<HTMLElement>("[data-fullpage-section]"));
      if (!sections.length) return;

      const currentIndex = sections.reduce((nearestIndex, section, index) => {
        const currentDistance = Math.abs(sections[nearestIndex].offsetTop - scroller.scrollTop);
        const candidateDistance = Math.abs(section.offsetTop - scroller.scrollTop);
        return candidateDistance < currentDistance ? index : nearestIndex;
      }, 0);
      const nextIndex = Math.min(sections.length - 1, Math.max(0, currentIndex + (event.deltaY > 0 ? 1 : -1)));
      if (nextIndex === currentIndex) return;

      isSectionTransitioningRef.current = true;
      sections[nextIndex].scrollIntoView({ behavior: "smooth", block: "start" });
      unlockTimer = setTimeout(() => {
        isSectionTransitioningRef.current = false;
      }, 700);
    };

    scroller.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      scroller.removeEventListener("wheel", handleWheel);
      if (unlockTimer) clearTimeout(unlockTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-900 selection:bg-orange-500 selection:text-white">
      {/* Floating Glass Navbar */}
      <Navbar
        navItems={[
          { href: "#company", label: "회사소개" },
          { href: "#services", label: "사업영역" },
          { href: "#about", label: "법인서비스" },
          { href: "#calculator", label: "문의하기" },
          { href: "#driver", label: "기사모집" },
        ]}
        onOpenDispatchModal={() => setIsDispatchModalOpen(true)}
        onOpenQuickTalkModal={() => setIsQuickTalkModalOpen(true)}
        onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
      />

      <main
        id="page-scroller"
        ref={pageScrollerRef}
        className="lg:h-[100svh] lg:snap-y lg:snap-mandatory lg:overflow-y-auto lg:overscroll-y-contain lg:scroll-smooth"
      >
        {/* Top Hero Section */}
        <HeroSection />

        {/* 1. Company Introduction Section (01 COMPANY) */}
        <CompanySection
          onQuote={() => setIsQuoteModalOpen(true)}
        />

        {/* 2. Fleet Specifications Section (02 BUSINESS) */}
        <section id="services" data-fullpage-section className="scroll-mt-14 relative overflow-hidden bg-gradient-to-br from-[#1E293B] via-[#1A2234] to-[#111827] py-12 sm:py-18 lg:flex lg:h-[100svh] lg:snap-start lg:snap-always lg:items-center lg:py-8 text-white">
          {/* Top Curved Wave Divider */}
          <div className="absolute top-0 inset-x-0 overflow-hidden leading-none pointer-events-none z-10">
            <svg className="relative block w-full h-7 sm:h-10 text-[#F1F5F9]" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="currentColor">
              <path d="M0,0 L1200,0 L1200,30 Q600,90 0,30 Z" />
            </svg>
          </div>

          {/* Sweeping Wave & Glows */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <svg className="absolute -top-1/4 -right-1/4 w-[130%] h-[150%] opacity-15" viewBox="0 0 1000 1000" fill="none">
              <path d="M0 350C320 220 680 580 1000 380V1000H0V350Z" fill="url(#business-wave-grad)" />
              <defs>
                <linearGradient id="business-wave-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#818CF8" stopOpacity="0.22" />
                  <stop offset="50%" stopColor="#6366F1" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#111827" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute -top-24 left-1/4 w-[620px] h-[480px] rounded-full bg-indigo-500/10 blur-[140px]" />
            <div className="absolute -bottom-24 right-1/4 w-[580px] h-[440px] rounded-full bg-slate-500/10 blur-[140px]" />
            <div className="absolute inset-0 bg-grid-dark opacity-35" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <ServiceCards />
          </div>
        </section>

        {/* 3. Corporate B2B & Clients Section (03 CORPORATE) */}
        <CorporateSection
          onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        />

        {/* 4. Driver Recruitment Section (04 DRIVER) */}
        <DriverSection />

        {/* 5. Footer */}
        <Footer />
      </main>

      {/* Floating Dispatch Actions & Mobile Action Dock */}
      <FloatingActions
        onOpenDispatchModal={() => setIsDispatchModalOpen(true)}
        onOpenQuickTalkModal={() => setIsQuickTalkModalOpen(true)}
      />

      {/* Embedded Live Dispatch Modal (인터넷접수) */}
      <DispatchModal
        isOpen={isDispatchModalOpen}
        onClose={() => setIsDispatchModalOpen(false)}
      />

      {/* 24시 AI 퀵톡접수 Modal */}
      <QuickTalkModal
        isOpen={isQuickTalkModalOpen}
        onClose={() => setIsQuickTalkModalOpen(false)}
        onOpenDispatchModal={() => setIsDispatchModalOpen(true)}
      />

      {/* Custom B2B & Freight Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />

      {/* Floating Scroll To Top Button */}
      <ScrollToTopButton />
    </div>
  );
}
