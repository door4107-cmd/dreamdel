"use client";

import { useState } from "react";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    phone: "",
    email: "",
    vehicleType: "오토바이",
    serviceType: "단건 급행",
    originAddress: "",
    destAddress: "",
    cargoDetails: "",
    needsLabor: false,
    needsTaxInvoice: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Daum Postcode Integration
  const openPostcode = (target: "origin" | "dest") => {
    if (typeof window === "undefined") return;

    const loadAndOpen = () => {
      const daum = (window as unknown as { daum?: { Postcode: new (options: { oncomplete: (data: { roadAddress: string; address: string; buildingName: string }) => void }) => { open: () => void } } }).daum;
      if (daum && daum.Postcode) {
        new daum.Postcode({
          oncomplete(data) {
            const fullAddress = data.roadAddress || data.address;
            const extra = data.buildingName ? ` (${data.buildingName})` : "";
            const finalAddr = fullAddress + extra;

            setFormData((prev) => ({
              ...prev,
              [target === "origin" ? "originAddress" : "destAddress"]: finalAddr,
            }));
          },
        }).open();
      }
    };

    if (!(window as unknown as { daum?: unknown }).daum) {
      const script = document.createElement("script");
      script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      script.onload = loadAndOpen;
      document.head.appendChild(script);
    } else {
      loadAndOpen();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      companyName: "",
      contactName: "",
      phone: "",
      email: "",
      vehicleType: "오토바이",
      serviceType: "단건 급행",
      originAddress: "",
      destAddress: "",
      cargoDetails: "",
      needsLabor: false,
      needsTaxInvoice: true,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-scale-up">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 font-bold">
              📝
            </div>
            <div>
              <h3 className="font-display font-black text-base sm:text-lg text-white">
                맞춤 견적 문의 (B2B · 대량 · 기업 제휴)
              </h3>
              <p className="text-[11px] text-slate-400">
                전문 배차 매니저가 내용을 검토한 후 10분 이내에 최적의 견적을 안내해 드립니다.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-colors cursor-pointer"
          >
            닫기 ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl shadow-sm">
                ✓
              </div>
              <h4 className="text-xl sm:text-2xl font-black text-slate-950">
                견적 문의가 정상 접수되었습니다!
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                작성해 주신 연락처(<span className="font-bold text-slate-900 font-mono">{formData.phone}</span>)로 전담 매니저가 10분 내에 맞춤 견적 및 운송 플랜을 안내해 드리겠습니다.
              </p>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 max-w-md mx-auto text-left space-y-1">
                <div>• 접수 구분: <span className="font-bold text-slate-900">{formData.serviceType} ({formData.vehicleType})</span></div>
                <div>• 세금계산서: <span className="font-bold text-slate-900">{formData.needsTaxInvoice ? "발행 요청" : "미발행"}</span></div>
                <div>• 긴급 문의: <span className="font-bold text-orange-600 font-mono">1588-5575</span> (365일 24시간)</div>
              </div>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-8 py-3 rounded-2xl bg-slate-900 hover:bg-black text-white font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  확인 완료
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 1. 신청자 & 연락처 정보 */}
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                  <span>1. 신청자 정보</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      회사명 (개인은 성함)
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="예: (주)드림델"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      담당자명 <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      placeholder="예: 홍길동"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      연락처 (휴대폰) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="010-1234-5678"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      이메일 (견적서 수신용)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="contact@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 2. 서비스 구분 & 희망 차종 */}
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>2. 운송 서비스 & 희망 차종</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">서비스 유형</label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="단건 급행">단건 긴급 퀵배송</option>
                      <option value="기업 정기배송">기업 정기/고정 배송 계약</option>
                      <option value="월정산 B2B">기업 월정산 후불 제휴</option>
                      <option value="전국 당일특송">전국 KTX/고속버스 연계 당일특송</option>
                      <option value="대형 화물/용달">대형 용달/화물 운송</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">희망 차종</label>
                    <select
                      value={formData.vehicleType}
                      onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="오토바이">오토바이 (서류 / 소형 박스)</option>
                      <option value="다마스">다마스 (중형 박스 / 라면 30박스)</option>
                      <option value="라보">라보 (가구 / 1파레트 / 500kg)</option>
                      <option value="밴">밴 (밀폐형 화물 / 500kg)</option>
                      <option value="1톤 트럭">1톤 트럭 (대형 화물 / 2파레트)</option>
                      <option value="기타/상담필요">차종 상담 필요 (매니저 추천)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 3. 구간 주소 (다음 주소찾기 버튼 탑재) */}
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>3. 출발지 및 도착지 구간</span>
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex justify-between">
                      <span>출발지 주소</span>
                      <span className="text-[11px] text-slate-400 font-normal">건물명/도로명 검색</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.originAddress}
                        onChange={(e) => setFormData({ ...formData, originAddress: e.target.value })}
                        placeholder="예: 서울시 강남구 논현동 114-14"
                        className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => openPostcode("origin")}
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold shrink-0 transition-all active:scale-95 cursor-pointer"
                      >
                        🔍 주소찾기
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex justify-between">
                      <span>도착지 주소</span>
                      <span className="text-[11px] text-slate-400 font-normal">건물명/도로명 검색</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.destAddress}
                        onChange={(e) => setFormData({ ...formData, destAddress: e.target.value })}
                        placeholder="예: 경기도 성남시 분당구 판교역로 166"
                        className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => openPostcode("dest")}
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold shrink-0 transition-all active:scale-95 cursor-pointer"
                      >
                        🔍 주소찾기
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. 화물 상세 & 부가 요청 */}
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  <span>4. 화물 내용 및 특이사항</span>
                </h4>
                <textarea
                  rows={2}
                  value={formData.cargoDetails}
                  onChange={(e) => setFormData({ ...formData, cargoDetails: e.target.value })}
                  placeholder="화물 품목, 수량, 규격, 상하차 인력 필요 여부 등을 자유롭게 적어주세요."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none resize-none"
                />
                <div className="flex flex-wrap gap-4 mt-2">
                  <label className="flex items-center space-x-2 text-xs font-bold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.needsLabor}
                      onChange={(e) => setFormData({ ...formData, needsLabor: e.target.checked })}
                      className="rounded text-orange-600 focus:ring-orange-500 w-4 h-4"
                    />
                    <span>기사님 상하차 도움 필요</span>
                  </label>
                  <label className="flex items-center space-x-2 text-xs font-bold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.needsTaxInvoice}
                      onChange={(e) => setFormData({ ...formData, needsTaxInvoice: e.target.checked })}
                      className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    <span>전자세금계산서 발행 필요</span>
                  </label>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-500 text-left">
                  ⚡ 24시간 전화 즉시 상담: <a href="tel:1588-5575" className="text-orange-600 font-bold font-mono">1588-5575</a>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-slate-900 hover:bg-black text-white font-black text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  <span>{isSubmitting ? "접수 처리 중..." : "맞춤 견적 신청하기 →"}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}