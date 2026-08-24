"use client";

import { useState } from "react";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  features: string[];
  price: string;
  fromPrice?: string;
  badge?: {
    label: string;
    color: "red" | "blue" | "green";
  };
}

export default function ServiceCard({
  icon,
  title,
  description,
  features,
  price,
  fromPrice,
  badge,
}: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="card p-6 hover:shadow-2xl hover:shadow-red-500/10 hover:-translate-y-1 transition-all duration-500 group">
      {badge && (
        <div className="mb-3">
          <span
            className={`badge ${badge.color === "red" ? "badge-red" : badge.color === "blue" ? "badge-blue" : "badge-green"}`}
          >
            {badge.label}
          </span>
        </div>
      )}
      <div className="flex items-start justify-between mb-4">
        <div className="w-14 h-14 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
          {icon}
        </div>
        {fromPrice && (
          <span className="text-sm font-bold text-red-500 bg-red-500/10 px-3 py-1 rounded-full">
            {fromPrice}
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-slate-400 text-sm mb-4 line-clamp-3">{description}</p>

      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start text-sm text-slate-300">
            <svg
              className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <div className="pt-4 border-t border-slate-800/50">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-2.5 px-4 bg-slate-800/50 hover:bg-red-500/20 text-slate-300 hover:text-white rounded-xl font-medium transition-all duration-300 text-sm group/btn"
        >
          {isExpanded ? "접기" : "자세히 보기"}
        </button>
      </div>
    </div>
  );
}
