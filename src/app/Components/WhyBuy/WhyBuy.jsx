"use client";

import React from "react";
import { Truck, Shield, RefreshCcw, ShoppingBag } from "lucide-react";

const features = [
  {
    title: "Free delivery",
    description: "Free delivery within 24 hours within Dhaka",
    icon: Truck,
  },
  {
    title: "100% Original",
    description: "All products are authentic with warranty.",
    icon: Shield,
  },
  {
    title: "Easy returns",
    description: "Hassle-free returns within 7 days",
    icon: RefreshCcw,
  },
  {
    title: "Cash on delivery",
    description: "Pay when you receive it, safe and easy",
    icon: ShoppingBag,
  },
];

const WhyBuy = () => {
  return (
    <section className="pb-15 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-5xl font-bold text-[#111827]">
            Why buy from us?
          </h2>

          <p className="mt-4 text-xl text-gray-500">
            Trusted by 50,000+ customers across Bangladesh
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="border border-gray-200 rounded-[28px] py-10 px-8 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-20 h-20 rounded-3xl bg-[#EAF8F4] flex items-center justify-center mb-8">
                  <Icon size={38} className="text-[#18B779]" strokeWidth={2} />
                </div>

                {/* Title */}
                <h3 className="text-[22px] font-bold text-[#111827]">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-4 text-[18px] leading-8 text-gray-500">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyBuy;
