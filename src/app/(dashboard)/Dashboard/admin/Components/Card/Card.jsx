"use client";

import {
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
} from "lucide-react";

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
    "M0 82 C35 58 60 45 90 82 S140 18 170 58 S230 90 260 52 S315 38 340 30 L340 100 L0 100 Z";

  const linePath =
    "M0 82 C35 58 60 45 90 82 S140 18 170 58 S230 90 260 52 S315 38 340 30";

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between p-6">
        <div className="flex gap-4">
          {/* Icon */}
          <div
            className="flex h-14 w-14 items-center justify-center text-white"
            style={{
              backgroundColor: color,
              clipPath:
                "polygon(25% 5%,75% 5%,100% 50%,75% 95%,25% 95%,0 50%)",
            }}
          >
            {icon}
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-lg font-medium text-gray-700">
                {title}
              </h4>

              <div
                className={`flex items-center gap-1 text-sm font-semibold ${
                  trend === "up"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {trend === "up" ? (
                  <ArrowUpRight size={16} />
                ) : (
                  <ArrowDownRight size={16} />
                )}

                <span>{percent}</span>
              </div>
            </div>

            <h2 className="mt-2 text-4xl font-bold text-gray-900">
              {value}
            </h2>
          </div>
        </div>

        <button className="flex items-center gap-1 text-sm text-gray-600">
          {period}
          <ChevronDown size={16} />
        </button>
      </div>

      {/* Chart */}
      <div className="px-4 pb-4">
        <svg
          viewBox="0 0 340 100"
          className="h-28 w-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id={gradientId}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor={color}
                stopOpacity="0.35"
              />
              <stop
                offset="100%"
                stopColor={color}
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          <path
            d={areaPath}
            fill={`url(#${gradientId})`}
          />

          <path
            d={linePath}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}