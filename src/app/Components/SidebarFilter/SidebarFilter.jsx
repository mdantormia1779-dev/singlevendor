"use client";

import React from "react";
import { Search, Minus, Star } from "lucide-react";

const SidebarFilter = ({
  categories = [],
  searchTerm = "",
  onSearchChange = () => {},
  maxPrice = 10000,
  priceDraft,
  priceValue,
  onPriceChange = () => {},
  onPriceReset,
  selectedCategories = [],
  onCategoryToggle = () => {},
  selectedRatings = [],
  onRatingToggle = () => {},
  onApply = () => {},
  onClear,
  onClearAll,
}) => {
  const currentPrice =
    priceDraft !== undefined
      ? priceDraft
      : priceValue !== undefined
      ? priceValue
      : maxPrice;

  const validMax = maxPrice > 0 ? maxPrice : 10000;
  const percent = Math.min(100, Math.max(0, (Number(currentPrice || 0) / validMax) * 100));

  const handleReset = onClearAll || onClear || onPriceReset || (() => onPriceChange(validMax));

  return (
    <div className="w-full lg:w-72 shrink-0 font-sans">
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-6">
        {/* Search */}
        {onSearchChange && (
          <div>
            <h3 className="text-sm font-semibold mb-3 text-slate-900">Search Products</h3>
            <div className="relative">
              <input
                type="text"
                value={searchTerm || ""}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Find your product..."
                className="w-full pl-3 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:border-transparent transition-all"
              />
              <button
                type="button"
                className="absolute right-1.5 top-1.5 p-1 bg-[#10b981] text-white rounded-md hover:bg-[#0f9f6e] transition-colors"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        <hr className="border-slate-100" />

        {/* Price Filter */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-slate-900">Price Filter</h3>
            <Minus className="w-4 h-4 text-slate-400" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Max Budget</span>
              <button
                type="button"
                onClick={() => onPriceChange(validMax)}
                className="text-slate-400 hover:text-emerald-600 font-semibold cursor-pointer"
              >
                Reset
              </button>
            </div>

            {/* Real range input */}
            <div className="relative my-4 h-1.5">
              <input
                type="range"
                min={0}
                max={validMax}
                value={Number(currentPrice || 0)}
                onChange={(e) => onPriceChange(Number(e.target.value))}
                className="absolute -top-2 left-0 w-full h-5 opacity-0 cursor-pointer z-10"
              />
              <div className="h-1.5 bg-slate-100 rounded-full relative">
                <div
                  className="absolute h-full bg-[#10b981] rounded-full"
                  style={{ width: `${percent}%` }}
                ></div>
                <div
                  className="absolute w-3.5 h-3.5 bg-white border-2 border-[#10b981] rounded-full -top-1 shadow-xs pointer-events-none"
                  style={{ left: `calc(${percent}% - 7px)` }}
                ></div>
              </div>
            </div>

            <div className="flex justify-between text-xs font-bold text-slate-600">
              <span>৳0</span>
              <span className="text-emerald-700">৳{Number(currentPrice || 0).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        {categories && categories.length > 0 && (
          <>
            <hr className="border-slate-100" />
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-semibold text-slate-900">Categories</h3>
                <Minus className="w-4 h-4 text-slate-400" />
              </div>
              <div className="space-y-2.5">
                {categories.map((cat, idx) => (
                  <label key={idx} className="flex items-center justify-between text-sm text-slate-600 cursor-pointer group">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.name)}
                        onChange={() => onCategoryToggle(cat.name)}
                        className="w-4 h-4 rounded border-slate-300 text-[#10b981] focus:ring-[#10b981] cursor-pointer"
                      />
                      <span className="group-hover:text-slate-900 transition-colors text-xs font-medium">{cat.name}</span>
                    </div>
                    {cat.count !== undefined && (
                      <span className="text-xs text-slate-400">({cat.count})</span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Rating */}
        <hr className="border-slate-100" />
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-slate-900">Customer Rating</h3>
            <Minus className="w-4 h-4 text-slate-400" />
          </div>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((stars, idx) => (
              <label key={idx} className="flex items-center gap-2.5 text-xs text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedRatings.includes(stars)}
                  onChange={() => onRatingToggle(stars)}
                  className="w-4 h-4 rounded border-slate-300 text-[#10b981] focus:ring-[#10b981] cursor-pointer"
                />
                <div className="flex gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < stars ? "fill-current" : "text-slate-200"}`} />
                  ))}
                </div>
                <span className="text-[11px] text-slate-400 font-medium">&amp; Up</span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="w-full bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarFilter;
