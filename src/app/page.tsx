"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CompanySection from "@/components/CompanySection";
import ServiceCards from "@/components/ServiceCards";
import CorporateSection from "@/components/CorporateSection";
import DriverSection from "@/components/DriverSection";
import FloatingPriceModal from "@/components/FloatingPriceModal";
import DispatchModal from "@/components/DispatchModal";
import QuoteModal from "@/components/QuoteModal";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import Footer from "@/components/Footer";

export default function Home() {
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-900 selection:bg-orange-500 selection:text-white">
      {/* Floating Glass Navbar */}
      <Navbar
        navItems={[
          { href: "#company", label: "회사소개" },
          { href: "#services", label: "사업영역" },
          { href: "#order", label: "오더접수 ↗" },
          { href: "#about", label: "법인서비스" },
          { href: "#calculator", label: "견적문의" },
          { href: "#driver", label: "퀵·화물 기사모집" },
        ]}
        onOpenPriceModal={() => setIsPriceModalOpen(true)}
        onOpenDispatchModal={() => setIsDispatchModalOpen(true)}
        onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
      />

      <main>
        {/* Top Hero Section (DREAMDEL · GLOBAL LOGISTICS INNOVATOR & 4 Featured Cards) */}
        <HeroSection
          onQuote={() => setIsQuoteModalOpen(true)}
          onOpenDispatchModal={() => setIsDispatchModalOpen(true)}
        />

        {/* 1. Company Introduction Section (01 COMPANY) */}
        <CompanySection
          onQuote={() => setIsQuoteModalOpen(true)}
        />

        {/* 2. Fleet Specifications Section (02 BUSINESS) */}
        <section id="services" className="scroll-mt-14 relative py-12 sm:py-18 border-t border-slate-200/80 overflow-hidden bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ServiceCards />
          </div>
        </section>

        {/* 3. Corporate B2B & Clients Section (03 CORPORATE) */}
        <CorporateSection
          onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        />

        {/* 4. Driver Recruitment Section (05 DRIVER) */}
        <DriverSection />
      </main>

      {/* 4. Dual Floating Sticky Action Buttons & Mobile Action Dock */}
      <FloatingPriceModal
        isOpen={isPriceModalOpen}
        onOpen={() => setIsPriceModalOpen(true)}
        onClose={() => setIsPriceModalOpen(false)}
        onOpenDispatchModal={() => setIsDispatchModalOpen(true)}
      />

      {/* 5. Embedded Live Dispatch Modal */}
      <DispatchModal
        isOpen={isDispatchModalOpen}
        onClose={() => setIsDispatchModalOpen(false)}
      />

      {/* 6. Custom B2B & Freight Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />

      {/* 7. Footer */}
      <Footer />

      {/* 8. Floating Scroll To Top Button (어느 섹션에서나 최상단 이동) */}
      <ScrollToTopButton />
    </div>
  );
}