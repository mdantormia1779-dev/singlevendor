"use client";

import { Package, Search } from "lucide-react";

const TrackOrder = () => {
  return (
    <section className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-5 ">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Track Your Order
            </h1>

            <p className="mt-2 text-lg text-slate-500">
              Real-time updates on your shipment progress
            </p>
          </div>

          {/* Search */}
          <div className="flex w-full lg:w-95.5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <input
              type="text"
              placeholder="Enter order number..."
              className="flex-1 px-5 py-4 text-slate-700 outline-none"
            />

            <button className="bg-[#10B981] hover:bg-[#059669] text-white px-7 flex items-center gap-2 transition">
              <Search size={18} />
              Track
            </button>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex justify-center mt-24">
          <div className="w-full max-w-[720px] bg-white rounded-[28px] shadow-xl shadow-slate-100 border border-slate-100 px-10 py-16 text-center">
            {/* Icon */}
            <div className="w-24 h-24 rounded-full bg-[#ECFDF5] flex items-center justify-center mx-auto">
              <Package
                size={48}
                strokeWidth={2}
                className="text-[#10B981]"
              />
            </div>

            {/* Title */}
            <h2 className="mt-8 text-4xl font-bold text-slate-900">
              Order Not Found
            </h2>

            {/* Description */}
            <p className="mt-5 text-lg text-slate-500 leading-8 max-w-md mx-auto">
              We couldn't find an order with that number.
              Please double-check and try again.
            </p>

            {/* Button */}
            <button className="mt-10 bg-[#10B981] hover:bg-[#059669] text-white px-10 h-14 rounded-2xl font-semibold transition">
              Back to Shopping
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrackOrder;