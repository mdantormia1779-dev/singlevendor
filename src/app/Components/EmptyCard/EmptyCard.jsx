import { ArrowRight, ShoppingBag } from "lucide-react";
import React from "react";

const EmptyCard = () => {
  return (
    <div>
      {/* Empty Cart Card */}
      <div className="max-w-7xl mx-auto px-6 py-24 flex justify-center">
        <div className="w-full max-w-130 bg-white border border-gray-200 rounded-[30px] shadow-sm p-12 text-center">
          {/* Icon */}
          <div className="w-32 h-32 rounded-full bg-[#E8F9F2] flex items-center justify-center mx-auto">
            <ShoppingBag size={64} strokeWidth={2} className="text-[#18B779]" />
          </div>

          {/* Title */}
          <h2 className="mt-10 text-[42px] font-bold text-gray-900 leading-tight">
            Your cart feels light!
          </h2>

          {/* Description */}
          <p className="mt-6 text-[18px] text-gray-500 leading-8 max-w-85 mx-auto">
            You haven't added any items yet. Explore our premium collections and
            find something you'll love.
          </p>

          {/* Button */}
          <button className="mt-10 h-14 px-8 bg-[#18B779] hover:bg-[#139866] text-white rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 mx-auto transition-all duration-300">
            Explore Best Sellers
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmptyCard;
