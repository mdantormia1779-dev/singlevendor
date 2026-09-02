"use client";

import { Search, RotateCcw } from "lucide-react";

const NoProducts = ({ onReset }) => {
  return (
    <section className="min-h-[50vh] flex items-center justify-center bg-white rounded-3xl border border-gray-200 p-8 my-4">
      <div className="text-center max-w-md mx-auto">
        {/* Icon */}
        <div className="mx-auto w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
          <Search
            size={36}
            strokeWidth={2}
            className="text-[#10B981]"
          />
        </div>

        {/* Title */}
        <h2 className="mt-6 text-2xl sm:text-3xl font-bold text-gray-900">
          No products found
        </h2>

        {/* Subtitle */}
        <p className="mt-2.5 text-gray-500 text-sm sm:text-base">
          We couldn&apos;t find matches for your search or active filters. Try adjusting your search query or reset filters.
        </p>

        {/* Button */}
        {onReset && (
          <button
            onClick={onReset}
            className="mt-6 px-6 py-3 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-semibold transition-all duration-300 flex items-center gap-2 mx-auto cursor-pointer shadow-sm"
          >
            <RotateCcw size={16} />
            <span>Clear Filters</span>
          </button>
        )}
      </div>
    </section>
  );
};

export default NoProducts;