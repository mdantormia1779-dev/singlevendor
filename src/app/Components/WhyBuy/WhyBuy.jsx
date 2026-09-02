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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
            Confidence & Care
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">
            Why Buy From Finora?
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Delivering quality, speed, and peace of mind with every package
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-slate-50/60 border border-slate-200/80 rounded-3xl p-6 flex flex-col items-center text-center hover:bg-white hover:border-emerald-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-emerald-100/70 group-hover:bg-emerald-500 group-hover:text-white text-emerald-600 flex items-center justify-center mb-5 transition-colors shadow-2xs">
                  <Icon size={26} strokeWidth={2.2} />
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-slate-900">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-500">
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
