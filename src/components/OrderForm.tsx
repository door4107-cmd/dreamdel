"use client";

import { useState } from "react";

interface OrderFormProps {
  onSubmit?: (data: any) => void;
}

export default function OrderForm({ onSubmit }: OrderFormProps) {
  const [formData, setFormData] = useState({
    senderName: "",
    senderPhone: "",
    senderAddress: "",
    receiverName: "",
    receiverPhone: "",
    receiverAddress: "",
    vehicleType: "bike",
    urgency: "standard",
    itemDetails: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.senderPhone || !formData.senderAddress || !formData.receiverAddress) {
      alert("출발지, 도착지, 연락처는 필수 입력 항목입니다. 꼼꼼히 확인해 주세요!");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      if (onSubmit) onSubmit(formData);
    }, 700);
  };

  return (
    <div className="w-full max-w-3xl mx-auto rounded-3xl bg-[#0e0e12] border border-white/[0.08] p-6 sm:p-10 shadow-2xl">
      {isSuccess ? (
        <div className="py-12 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-6 text-2xl">
            ✨
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
            기분 좋은 퀵 배차가 접수되었습니다!
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto mb-8 leading-relaxed">
            보내주신 연락처(<span className="text-amber-300 font-semibold">{formData.senderPhone}</span>)로 10초 이내에 배정된 기사님의 친절한 안내와 실시간 GPS 링크가 카카오 알림톡으로 도착합니다.
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="btn-tactile-secondary !py-2.5 !px-6 !text-xs font-semibold"
          >
            새로운 배차 추가 신청하기 ✨
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Route */}
          <div>
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-4 pb-2 border-b border-white/[0.06]">
              Section 1 · 어디서 어디로 보낼까요?
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Departure */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2.5">
                <div className="text-xs font-bold text-red-400 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-red-400 mr-2" />
                  보내는 곳 (출발지)
                </div>
                <input
                  type="text"
                  name="senderName"
                  value={formData.senderName}
                  onChange={handleChange}
                  placeholder="보내는 분 성함 / 회사명"
                  className="input-minimal !py-2.5 !text-xs"
                />
                <input
                  type="tel"
                  name="senderPhone"
                  value={formData.senderPhone}
                  onChange={handleChange}
                  placeholder="연락처 (예: 010-1234-5678) *"
                  required
                  className="input-minimal !py-2.5 !text-xs"
                />
                <input
                  type="text"
                  name="senderAddress"
                  value={formData.senderAddress}
                  onChange={handleChange}
                  placeholder="출발 상세 주소 *"
                  required
                  className="input-minimal !py-2.5 !text-xs"
                />
              </div>

              {/* Destination */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2.5">
                <div className="text-xs font-bold text-blue-400 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-blue-400 mr-2" />
                  받는 곳 (도착지)
                </div>
                <input
                  type="text"
                  name="receiverName"
                  value={formData.receiverName}
                  onChange={handleChange}
                  placeholder="받는 분 성함 / 회사명"
                  className="input-minimal !py-2.5 !text-xs"
                />
                <input
                  type="tel"
                  name="receiverPhone"
                  value={formData.receiverPhone}
                  onChange={handleChange}
                  placeholder="받는 분 연락처"
                  className="input-minimal !py-2.5 !text-xs"
                />
                <input
                  type="text"
                  name="receiverAddress"
                  value={formData.receiverAddress}
                  onChange={handleChange}
                  placeholder="도착 상세 주소 *"
                  required
                  className="input-minimal !py-2.5 !text-xs"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Vehicle */}
          <div>
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-4 pb-2 border-b border-white/[0.06]">
              Section 2 · 차량 및 물품 세부사항
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-neutral-300 mb-1.5 font-medium">희망 배송 차량</label>
                <select
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  className="input-minimal !py-2.5 !text-xs bg-[#16161c]"
                >
                  <option value="bike">🏍️ 오토바이 급행 (서류/소형 20kg 이내)</option>
                  <option value="damas">🚚 다마스 (박스/소형가전 350kg 이내)</option>
                  <option value="labo">🚛 라보 (가구/파레트 500kg 이내)</option>
                  <option value="truck">🚐 1톤 대형특송 (대형/전국특송 1,100kg 이내)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-neutral-300 mb-1.5 font-medium">배송 긴급도</label>
                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                  className="input-minimal !py-2.5 !text-xs bg-[#16161c]"
                >
                  <option value="standard">일반 정규 배송 (30~45분 이내 도착)</option>
                  <option value="express">⚡ 초특급 직행 배송 (논스톱 다이렉트)</option>
                  <option value="reserve">📅 시간 지정 예약 배송</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs text-neutral-300 mb-1.5 font-medium">물품 정보 및 기사님 전달사항</label>
                <input
                  type="text"
                  name="itemDetails"
                  value={formData.itemDetails}
                  onChange={handleChange}
                  placeholder="예: 파손주의 물품입니다 / 부재 시 문 앞에 놓아주세요"
                  className="input-minimal !py-2.5 !text-xs"
                />
              </div>
            </div>
          </div>

          {/* Submission Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-tactile-primary !py-4 text-sm font-bold flex items-center justify-center space-x-2 shadow-2xl"
            >
              {isSubmitting ? (
                <span>가장 가까운 친절 기사님 연결 중... ✨</span>
              ) : (
                <>
                  <span>10초 만에 친절 기사님 부르기 🚀</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
            <div className="flex items-center justify-center space-x-4 mt-3 text-[11px] text-neutral-400">
              <span>🛡️ 현대해상 적재물 1억 보험 100% 가입</span>
              <span>·</span>
              <span>📍 실시간 GPS 안심 관제</span>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}