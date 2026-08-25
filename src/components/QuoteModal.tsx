"use client";

import { useState } from "react";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [formData, setFormData] = useState({
    inquiryType: "퀵",
    companyName: "",
    contactName: "",
    phone: "",
    origin: "",
    destination: "",
    content: "",
    agreePrivacy: false,
  });

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [showPrivacyDetail, setShowPrivacyDetail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const faqs = [
    {
      q: "운송요금은 어떻게 산정되나요?",
      a: "출발지-도착지 간 실거리, 선택 차종(오토바이/다마스/라보/1톤), 적재 물품 중량 및 급행 여부에 따라 표준 공시 요율에 의해 투명하게 산정됩니다.",
    },
    {
      q: "배송지역은 어디까지 되나요?",
      a: "서울·경기·인천 수도권 전 지역 즉시 퀵 배송과 KTX특급·고속버스·항공 연계를 통한 전국 주요 도시 당일 배송이 모두 가능합니다.",
    },
    {
      q: "픽업 예약은 어떻게 하나요?",
      a: "본 상담 문의 양식이나 대표번호(1588-5575)를 통해 희망하시는 날짜와 정확한 픽업 시간을 지정하여 예약하실 수 있습니다.",
    },
    {
      q: "배달 소요시간은 얼마나 되나요?",
      a: "일반 오토바이 기준 서울 시내 10km 이내 30분 내외, 프리미엄 급행은 20분 내외 직송을 원칙으로 신속 배송합니다.",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreePrivacy) {
      alert("개인정보 수집·이용에 동의해 주세요.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      inquiryType: "퀵",
      companyName: "",
      contactName: "",
      phone: "",
      origin: "",
      destination: "",
      content: "",
      agreePrivacy: false,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-slate-950/75 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Top Control Bar */}
        <div className="flex items-center justify-between px-6 sm:px-10 pt-6 pb-2 shrink-0 bg-white">
          <div className="text-xs sm:text-sm font-mono font-bold tracking-widest text-slate-500 uppercase">
            05 QUOTE
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 flex items-center justify-center transition-colors text-sm font-bold cursor-pointer"
            aria-label="닫기"
          >
            ✕
          </button>
        </div>

        {/* Modal Scrollable Container */}
        <div className="px-6 sm:px-10 pb-8 sm:pb-10 overflow-y-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 tracking-tight leading-tight mb-2">
              견적 및 상담 문의
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 font-medium break-keep">
              품목과 지역만 남겨주시면 담당자가 확인 후 회신드립니다.
            </p>
          </div>

          {isSubmitted ? (
            <div className="py-12 text-center space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl shadow-sm">
                ✓
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-950">
                문의가 정상적으로 접수되었습니다!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed break-keep">
                남겨주신 연락처(<span className="font-bold text-slate-900 font-mono">{formData.phone}</span>)로 전문 상담 매니저가 확인 후 신속히 맞춤 견적을 회신드리겠습니다.
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 text-left space-y-1.5">
                <div>• 문의 유형: <span className="font-bold text-slate-900">{formData.inquiryType}</span></div>
                <div>• 신청자: <span className="font-bold text-slate-900">{formData.contactName} {formData.companyName ? `(${formData.companyName})` : ""}</span></div>
                <div>• 빠른 전화 문의: <a href="tel:1588-5575" className="text-orange-600 font-bold font-mono">1588-5575</a></div>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="w-full py-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                확인
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* ── Left Column: Form (7 or 8 cols) ── */}
              <div className="lg:col-span-7 xl:col-span-8">
                <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                  {/* Row 1: 문의 유형 & 회사명 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="relative">
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full px-3.5 sm:px-4 py-3 rounded-lg border border-slate-300 text-xs sm:text-sm font-medium text-slate-800 bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 focus:outline-none appearance-none cursor-pointer"
                      >
                        <option value="문의 유형 (퀵 / 화물 / 법인계약)">문의 유형 (퀵 / 화물 / 법인계약)</option>
                        <option value="퀵">퀵 서비스</option>
                        <option value="화물">화물 운송 (다마스/라보/1톤)</option>
                        <option value="법인계약">법인 정기 계약 / 월정산</option>
                        <option value="기타">기타 맞춤 운송</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500 text-xs">
                        ▼
                      </div>
                    </div>

                    <div>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="회사명"
                        className="w-full px-3.5 sm:px-4 py-3 rounded-lg border border-slate-300 text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Row 2: 담당자명 (필수) & 연락처 (필수) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <input
                        type="text"
                        required
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        placeholder="담당자명 (필수)"
                        className="w-full px-3.5 sm:px-4 py-3 rounded-lg border border-slate-300 text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="연락처 (필수)"
                        className="w-full px-3.5 sm:px-4 py-3 rounded-lg border border-slate-300 text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Row 3: 출발지 & 도착지 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <input
                        type="text"
                        value={formData.origin}
                        onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                        placeholder="출발지"
                        className="w-full px-3.5 sm:px-4 py-3 rounded-lg border border-slate-300 text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        placeholder="도착지"
                        className="w-full px-3.5 sm:px-4 py-3 rounded-lg border border-slate-300 text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Row 4: 문의 내용 (품목·중량·월 예상 물량·희망 시간) */}
                  <div>
                    <textarea
                      rows={5}
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="문의 내용 (품목·중량·월 예상 물량·희망 시간)"
                      className="w-full px-3.5 sm:px-4 py-3 rounded-lg border border-slate-300 text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 focus:outline-none resize-none"
                    />
                  </div>

                  {/* Row 5: 개인정보 수집·이용 동의 */}
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-700 pt-1">
                    <label className="flex items-center space-x-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={formData.agreePrivacy}
                        onChange={(e) => setFormData({ ...formData, agreePrivacy: e.target.checked })}
                        className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                      />
                      <span className="font-medium">
                        개인정보 수집·이용에 동의합니다 (필수)
                      </span>
                    </label>
                    <span className="text-slate-400">·</span>
                    <button
                      type="button"
                      onClick={() => setShowPrivacyDetail(!showPrivacyDetail)}
                      className="text-xs text-slate-500 hover:text-slate-900 underline font-medium cursor-pointer"
                    >
                      내용 보기
                    </button>
                  </div>

                  {/* Collapsible Privacy Detail */}
                  {showPrivacyDetail && (
                    <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                      <strong>개인정보 수집 및 이용 안내</strong>
                      <ul className="list-disc pl-4 mt-1 space-y-0.5">
                        <li>수집 항목: 담당자명, 연락처, 회사명, 출발지, 도착지, 문의내용</li>
                        <li>수집 목적: 운송 상담, 맞춤 견적 제공 및 배차 안내</li>
                        <li>보유 기간: 문의 처리 완료 후 1년간 보관 후 파기</li>
                      </ul>
                    </div>
                  )}

                  {/* Row 6: 문의 신청 버튼 */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-44 sm:w-48 py-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 active:bg-black text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 text-center"
                    >
                      {isSubmitting ? "신청 처리 중..." : "문의 신청"}
                    </button>
                  </div>
                </form>
              </div>

              {/* ── Right Column: CS Center & FAQ (5 or 4 cols) ── */}
              <div className="lg:col-span-5 xl:col-span-4 space-y-4">
                {/* 1. CS Center Card */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <div className="text-[11px] font-mono font-bold tracking-wider text-slate-500 uppercase mb-3">
                    CS CENTER
                  </div>

                  <div className="mb-4">
                    <div className="text-xs text-slate-500 font-medium mb-0.5">접수 대표번호</div>
                    <a
                      href="tel:1588-5575"
                      className="font-display text-2xl sm:text-3xl font-black text-slate-950 tracking-tight hover:text-orange-600 transition-colors"
                    >
                      1588-5575
                    </a>
                  </div>

                  <div className="mb-4">
                    <div className="text-xs text-slate-500 font-medium mb-0.5">고객만족센터</div>
                    <a
                      href="tel:02-3446-7668"
                      className="font-display text-lg sm:text-xl font-bold text-slate-900 tracking-tight hover:text-orange-600 transition-colors"
                    >
                      02-3446-7668
                    </a>
                  </div>

                  <div className="pt-3 border-t border-slate-100 text-[11px] sm:text-xs text-slate-500 leading-relaxed font-medium">
                    <div>FAX 02-3446-6388</div>
                    <div className="text-slate-600 mt-0.5">평일 08~20시 / 토 08~19시 / 일·공휴 09~18시</div>
                  </div>
                </div>

                {/* 2. 자주 묻는 질문 FAQ Card */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <div className="font-display font-black text-sm sm:text-base text-slate-950 tracking-tight mb-3">
                    자주 묻는 질문
                  </div>

                  <div className="divide-y divide-slate-100 text-xs sm:text-sm">
                    {faqs.map((faq, idx) => (
                      <div key={idx} className="py-2.5 first:pt-0 last:pb-0">
                        <button
                          type="button"
                          onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                          className="w-full text-left font-medium text-slate-800 hover:text-slate-950 flex items-center justify-between group cursor-pointer"
                        >
                          <span className="break-keep group-hover:underline">{faq.q}</span>
                          <span className="text-xs text-slate-400 ml-2 shrink-0">
                            {openFaqIndex === idx ? "▲" : "▼"}
                          </span>
                        </button>
                        {openFaqIndex === idx && (
                          <p className="mt-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg leading-relaxed break-keep">
                            {faq.a}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}