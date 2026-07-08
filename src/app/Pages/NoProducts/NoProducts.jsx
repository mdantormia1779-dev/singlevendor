"use client";

import { Search } from "lucide-react";

const NoProducts = () => {
  return (
    <section className="min-h-[75vh] flex items-center justify-center bg-[#FAFAFA]">
      <div className="text-center">

        {/* Icon */}
        <div className="mx-auto w-20 h-20 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center">
          <Search
            size={42}
            strokeWidth={2.2}
            className="text-gray-700"
          />
        </div>

        {/* Title */}
        <h2 className="mt-6 text-3xl font-bold text-gray-900">
          No products found
        </h2>

        {/* Subtitle */}
        <p className="mt-3 text-gray-500 text-lg">
          Try adjusting your filters or search terms
        </p>

        {/* Button */}
        <button className="mt-8 px-7 py-3 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-semibold transition-all duration-300">
          Clear Filters
        </button>

      </div>
    </section>
  );
};

export default NoProducts;