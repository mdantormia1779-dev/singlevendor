"use client";

import React from "react";
import {
  Shirt,
  Smartphone,
  Home,
  Sparkles,
  BookOpen,
  Package,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const categories = [
  {
    title: "fashion",
    icon: Shirt,
    bg: "bg-pink-100",
    color: "text-pink-500",
  },
  {
    title: "Electronics",
    icon: Smartphone,
    bg: "bg-blue-100",
    color: "text-blue-500",
  },
  {
    title: "Home & Living",
    icon: Home,
    bg: "bg-green-100",
    color: "text-green-500",
  },
  {
    title: "Men's Shoes",
    icon: Sparkles,
    bg: "bg-purple-100",
    color: "text-purple-500",
  },
  {
    title: "book",
    icon: BookOpen,
    bg: "bg-orange-100",
    color: "text-orange-500",
  },
  {
    title: "grocery",
    icon: Package,
    bg: "bg-emerald-100",
    color: "text-emerald-500",
  },
];

const PopularCategories = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-5xl font-bold text-center text-slate-900 mb-14">
          Popular Categories
        </h2>

        <div className="relative flex items-center">
          {/* Left Button */}
          <button className="absolute -left-4 z-10 w-10 h-10 rounded-full bg-[#19b77a] text-white flex items-center justify-center shadow-lg">
            <ChevronLeft size={20} />
          </button>

          {/* Cards */}
          <div className="grid grid-cols-6 gap-6 w-full">
            {categories.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="h-40 border border-gray-200 rounded-3xl flex flex-col items-center justify-center hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center`}
                  >
                    <Icon className={`${item.color}`} size={30} />
                  </div>

                  <h3 className="mt-6 text-2xl font-semibold text-slate-800">
                    {item.title}
                  </h3>
                </div>
              );
            })}
          </div>

          {/* Right Button */}
          <button className="absolute -right-4 z-10 w-10 h-10 rounded-full bg-[#19b77a] text-white flex items-center justify-center shadow-lg">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;