"use client";

import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    inquiryType: "퀵 서비스",
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
      a: "출발지-도착지 간 실거리, 선택 차종(오토바이/다마스/라보/1톤), 적재 중량 및 급송 여부에 따라 표준 요율표를 기준으로 투명하게 산정됩니다.",
    },
    {
      q: "배송지역은 어디까지 가능한가요?",
      a: "서울·경기·인천 수도권 전 지역 10분 내 실시간 퀵 배송과 KTX·고속버스·항공 연계를 통한 전국 주요 도시 당일 배송을 모두 지원합니다.",
    },
    {
      q: "픽업 예약 및 정시 배송이 가능한가요?",
      a: "온라인 문의 또는 대표번호(1588-5575)를 통해 희망하시는 날짜와 분 단위 시간을 지정하여 사전 예약 배차를 이용하실 수 있습니다.",
    },
    {
      q: "배달 소요시간은 얼마나 걸리나요?",
      a: "일반 오토바이 기준 서울 시내 10km 이내 60분 내외, 단독 직송 급송은 40분 내외로 최단 경로를 통해 신속하게 배송됩니다.",
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
      inquiryType: "퀵 서비스",
      companyName: "",
      contactName: "",
      phone: "",
      origin: "",
      destination: "",
      content: "",
      agreePrivacy: false,
    });
  };

  return (
    <section
      id="contact"
      data-fullpage-section
      className="scroll-mt-14 relative overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#F1F5F9] pt-20 pb-16 lg:py-0 lg:flex lg:min-h-[100svh] lg:snap-start lg:snap-always lg:items-center text-slate-900 selection:bg-orange-500 selection:text-white"
    >
      {/* ── Top Curved Wave Divider transitioning from 04 DRIVER (#060A14) ── */}
      <div className="absolute top-0 inset-x-0 overflow-hidden leading-none pointer-events-none z-10">
        <svg
          className="relative block w-full h-7 sm:h-10 text-[#060A14]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,0 L1200,0 L1200,30 Q600,90 0,30 Z" />
        </svg>
      </div>

      {/* ── Ambient Glow Lighting ── */}
      <div className="absolute -top-32 -left-32 w-[550px] h-[450px] rounded-full bg-orange-400/8 blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[550px] h-[450px] rounded-full bg-blue-500/6 blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-4 lg:-translate-y-2">
        {/* ── Section Header ── */}
        <div className="mb-6 sm:mb-8 text-center lg:text-left">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-950 tracking-tight leading-tight mb-2.5">
            견적 및 상담 문의
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 font-medium break-keep">
            품목과 지역만 남겨주시면 배차 전문 상담 매니저가 확인 후 신속히 맞춤 견적을 회신드립니다.
          </p>
        </div>

        {isSubmitted ? (
          <div className="py-12 text-center space-y-4 max-w-lg mx-auto bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl shadow-sm">
              ✓
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-950">
              문의가 정상적으로 접수되었습니다!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed break-keep">
              남겨주신 연락처(<span className="font-bold text-slate-900">{formData.phone}</span>)로 전문 상담 매니저가 확인 후 신속히 맞춤 견적을 회신드리겠습니다.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 text-left space-y-1.5">
              <div>• 문의 유형: <span className="font-bold text-slate-900">{formData.inquiryType}</span></div>
              <div>• 신청자: <span className="font-bold text-slate-900">{formData.contactName} {formData.companyName ? `(${formData.companyName})` : ""}</span></div>
              <div>• 빠른 전화 문의: <a href="tel:1588-5575" className="text-orange-600 font-bold">1588-5575</a></div>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="w-full py-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              추가 문의하기
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* ── Left Column: Form (7 cols) ── */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Row 1: 문의 유형 & 회사명 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="relative">
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 bg-slate-50/50 focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none appearance-none cursor-pointer pr-10 transition-colors"
                    >
                      <option value="퀵 서비스">퀵 서비스</option>
                      <option value="차량 화물 (다마스/라보/1톤)">차량 화물 (다마스/라보/1톤)</option>
                      <option value="법인 정기 계약 / 월정산">법인 정기 계약 / 월정산</option>
                      <option value="기타 맞춤 운송">기타 맞춤 운송</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="회사명 (선택)"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 bg-slate-50/50 focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2: 담당자명 (필수) & 연락처 (필수) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <input
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      placeholder="담당자명 (필수) *"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 bg-slate-50/50 focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="연락처 (필수) *"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 bg-slate-50/50 focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Row 3: 출발지 & 도착지 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <input
                      type="text"
                      value={formData.origin}
                      onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                      placeholder="출발지 (동/구 또는 주소)"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 bg-slate-50/50 focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      placeholder="도착지 (동/구 또는 주소)"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 bg-slate-50/50 focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Row 4: 문의 내용 */}
                <div>
                  <textarea
                    rows={4}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="문의 내용 (품목, 중량, 월 예상 물량, 희망 시간 등을 편하게 남겨주세요)"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 bg-slate-50/50 focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none resize-none transition-colors"
                  />
                </div>

                {/* Row 5: 개인정보 수집·이용 동의 */}
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-700 pt-1">
                  <label className="flex items-center space-x-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.agreePrivacy}
                      onChange={(e) => setFormData({ ...formData, agreePrivacy: e.target.checked })}
                      className="w-4 h-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
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
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] sm:text-xs text-slate-600 leading-relaxed">
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
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-slate-950 hover:bg-slate-800 active:bg-black text-white font-bold text-sm shadow-md transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <span>{isSubmitting ? "신청 처리 중..." : "문의 신청하기"}</span>
                    <span>→</span>
                  </button>
                </div>
              </form>
            </div>

            {/* ── Right Column: CS Center & FAQ (5 cols) ── */}
            <div className="lg:col-span-5 space-y-4">
              {/* 1. CS Center Card */}
              <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
                <div className="text-xs font-bold text-slate-500 mb-2">
                  접수 및 고객센터 안내
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

                <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 leading-relaxed font-medium space-y-0.5">
                  <div>FAX: 02-3446-6388</div>
                  <div className="text-slate-600">평일 08:00~20:00 / 토 09:00~19:00 / 일·공휴일 10:00~18:00</div>
                </div>
              </div>

              {/* 2. FAQ Accordion Card */}
              <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
                <div className="font-display font-black text-sm sm:text-base text-slate-950 tracking-tight mb-3">
                  자주 묻는 질문
                </div>

                <div className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="py-2.5 first:pt-0 last:pb-0">
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                        className="w-full text-left font-medium text-slate-800 hover:text-slate-950 flex items-center justify-between group cursor-pointer py-1"
                      >
                        <span className="break-keep group-hover:underline">{faq.q}</span>
                        <svg
                          className={`w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 transition-transform duration-200 shrink-0 ml-2 ${
                            openFaqIndex === idx ? "rotate-180 text-slate-950" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {openFaqIndex === idx && (
                        <p className="mt-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl leading-relaxed break-keep border border-slate-100">
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
    </section>
  );
}
