"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CompanySection from "@/components/CompanySection";
import ServiceCards from "@/components/ServiceCards";
import CorporateSection from "@/components/CorporateSection";
import DriverSection from "@/components/DriverSection";
import ContactSection from "@/components/ContactSection";
import FloatingActions from "@/components/FloatingActions";
import DispatchModal from "@/components/DispatchModal";
import QuickTalkModal from "@/components/QuickTalkModal";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import Footer from "@/components/Footer";

export default function Home() {
  const pageScrollerRef = useRef<HTMLElement>(null);
  const isSectionTransitioningRef = useRef(false);
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);
  const [isQuickTalkModalOpen, setIsQuickTalkModalOpen] = useState(false);

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

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
          { href: "#driver", label: "기사모집" },
          { href: "#contact", label: "문의하기" },
        ]}
        onOpenDispatchModal={() => setIsDispatchModalOpen(true)}
        onOpenQuickTalkModal={() => setIsQuickTalkModalOpen(true)}
        onOpenQuoteModal={scrollToContact}
      />

      <main
        id="page-scroller"
        ref={pageScrollerRef}
        className="lg:h-[100svh] lg:snap-y lg:snap-mandatory lg:overflow-y-auto lg:overscroll-y-contain lg:scroll-smooth"
      >
        {/* Top Hero Section */}
        <HeroSection />

        {/* 1. Company Introduction Section */}
        <CompanySection
          onQuote={scrollToContact}
        />

        {/* 2. Fleet Specifications Section */}
        <section id="services" data-fullpage-section className="scroll-mt-14 relative overflow-hidden bg-[#0F172A] py-12 sm:py-18 lg:flex lg:h-[100svh] lg:snap-start lg:snap-always lg:items-center lg:py-8 text-white">
          {/* Top Divider */}
          <div className="absolute top-0 inset-x-0 overflow-hidden leading-none pointer-events-none z-10">
            <svg className="relative block w-full h-7 sm:h-10 text-[#F1F5F9]" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="currentColor">
              <path d="M0,0 L1200,0 L1200,30 Q600,90 0,30 Z" />
            </svg>
          </div>

          {/* Technical Subtle Grid Texture */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-grid-dark opacity-30" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <ServiceCards />
          </div>
        </section>

        {/* 3. Corporate B2B & Clients Section */}
        <CorporateSection
          onOpenQuoteModal={scrollToContact}
        />

        {/* 4. Driver Recruitment Section */}
        <DriverSection />

        {/* 5. Contact & Inquiry Section */}
        <ContactSection />

        {/* 6. Footer */}
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

      {/* Floating Scroll To Top Button */}
      <ScrollToTopButton />
    </div>
  );
}
