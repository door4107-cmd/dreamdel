"use client";

import { useState } from "react";

interface QuoteFormProps {
  onSubmit: (data: QuoteFormData) => void;
}

interface QuoteFormData {
  name: string;
  phone: string;
  from: string;
  to: string;
  distance: number;
  serviceType: "short" | "long" | "urgent";
  date: string;
  time: string;
}

export default function QuoteForm({ onSubmit }: QuoteFormProps) {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: "",
    phone: "",
    from: "",
    to: "",
    distance: 0,
    serviceType: "short",
    date: new Date().toISOString().split("T")[0],
    time: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    onSubmit(formData);
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({
      name: "",
      phone: "",
      from: "",
      to: "",
      distance: 0,
      serviceType: "short",
      date: new Date().toISOString().split("T")[0],
      time: "",
    });
  };

  if (submitted) {
    return (
      <div className="card p-8 text-center animate-fade-in">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">문의가 접수되었습니다!</h3>
        <p className="text-slate-400 mb-4">
          담당자가 최대한 빠른 시간에 연락드리겠습니다.<br />
          (보통 10 분 이내 응답합니다)
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="btn-secondary"
        >
          다시 문의하기
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="name" className="label">이름</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="input-field"
            placeholder="홍길동"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="label">연락처</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="input-field"
            placeholder="010-XXXX-XXXX"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="from" className="label">출발지</label>
          <input
            id="from"
            name="from"
            type="text"
            required
            className="input-field"
            placeholder="출발지 입력"
            value={formData.from}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="to" className="label">도착지</label>
          <input
            id="to"
            name="to"
            type="text"
            required
            className="input-field"
            placeholder="도착지 입력"
            value={formData.to}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Service Type */}
      <div className="space-y-2">
        <label className="label">서비스 유형</label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: "short", label: "단거리", icon: "🚗" },
            { value: "long", label: "장거리", icon: "🚚" },
            { value: "urgent", label: "응급", icon: "🚨" },
          ].map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, serviceType: type.value as any }))}
              className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                formData.serviceType === type.value
                  ? "border-red-500 bg-red-500/10 text-white"
                  : "border-slate-700/50 bg-slate-900/50 text-slate-400 hover:border-slate-600"
              }`}
            >
              <span className="text-2xl block mb-1">{type.icon}</span>
              <span className="text-sm font-medium">{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Distance for long-distance */}
      {formData.serviceType === "long" && (
        <div className="space-y-2 animate-fade-in">
          <label htmlFor="distance" className="label">거리 (km)</label>
          <input
            id="distance"
            name="distance"
            type="number"
            min="0"
            max="9999"
            className="input-field"
            placeholder="예: 50"
            value={formData.distance}
            onChange={handleChange}
          />
        </div>
      )}

      {/* Date & Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="date" className="label">요청일</label>
          <input
            id="date"
            name="date"
            type="date"
            required
            className="input-field"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="time" className="label">요청 시간</label>
          <input
            id="time"
            name="time"
            type="time"
            required
            className="input-field"
            value={formData.time}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`btn-primary w-full py-4 text-lg font-black ${
          isSubmitting ? "cursor-not-allowed" : ""
        }`}
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            문의 접수 중...
          </>
        ) : (
          <>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            견적 요청하기
          </>
        )}
      </button>
    </form>
  );
}
