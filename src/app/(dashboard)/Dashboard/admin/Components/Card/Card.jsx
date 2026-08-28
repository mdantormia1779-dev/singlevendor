"use client";

import React from "react";
import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";

export default function Card({
  title,
  value,
  percent,
  trend,
  period,
  color,
  icon,
}) {
  const gradientId = `g-${color.replace("#", "")}`;

  const areaPath =
    "M0 70 C40 50 70 30 110 55 S180 15 220 45 S280 65 310 35 S330 20 340 15 L340 90 L0 90 Z";

  const linePath =
    "M0 70 C40 50 70 30 110 55 S180 15 220 45 S280 65 310 35 S330 20 340 15";

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xs transition-all hover:shadow-lg hover:-translate-y-0.5 group">
      {/* Card Header */}
      <div className="p-6 pb-2">
        <div className="flex items-start justify-between">
          {/* Icon in soft tinted squircle */}
          <div
            className="flex h-13 w-13 items-center justify-center rounded-2xl text-white shadow-md transition-transform group-hover:scale-105"
            style={{
              backgroundColor: color,
            }}
          >
            {icon}
          </div>

          {/* Trend Pill */}
          <div
            className={`inline-flex items-center gap-1 text-xs font-extrabold px-2.5 py-1 rounded-full border ${
              trend === "up"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-rose-50 text-rose-700 border-rose-200"
            }`}
          >
            {trend === "up" ? (
              <ArrowUpRight size={13} className="stroke-[2.5]" />
            ) : (
              <ArrowDownRight size={13} className="stroke-[2.5]" />
            )}
            <span>{percent}</span>
          </div>
        </div>

        {/* Title and Value */}
        <div className="mt-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {title}
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {value}
            </h2>
            <span className="text-[11px] font-semibold text-slate-400">{period}</span>
          </div>
        </div>
      </div>

      {/* Sparkline Chart */}
      <div className="px-3 pb-2 -mt-1">
        <svg
          viewBox="0 0 340 90"
          className="h-16 w-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.25} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>

          <path d={areaPath} fill={`url(#${gradientId})`} />

          <path
            d={linePath}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}