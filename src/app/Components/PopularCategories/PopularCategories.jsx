"use client";

import React, { useRef } from "react";
import Link from "next/link";
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
    title: "Fashion",
    icon: Shirt,
    bg: "bg-pink-100",
    color: "text-pink-500",
    path: "/Pages/Fasion",
  },
  {
    title: "Electronics",
    icon: Smartphone,
    bg: "bg-blue-100",
    color: "text-blue-500",
    path: "/Pages/Electronics",
  },
  {
    title: "Home & Living",
    icon: Home,
    bg: "bg-green-100",
    color: "text-green-500",
    path: "/Pages/HomeLiving",
  },
  {
    title: "Men's Shoes",
    icon: Sparkles,
    bg: "bg-purple-100",
    color: "text-purple-500",
    path: "/Pages/MenShoes",
  },
  {
    title: "Gadgets",
    icon: Sparkles,
    bg: "bg-orange-100",
    color: "text-orange-500",
    path: "/Pages/Gadgets",
  },
  {
    title: "All Products",
    icon: Package,
    bg: "bg-emerald-100",
    color: "text-emerald-500",
    path: "/Pages/AllProduct",
  },
];

const PopularCategories = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section
      id="popular-categories"
      className="py-14 bg-white scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-slate-900 mb-10 md:mb-14 tracking-tight">
          Popular Categories
        </h2>

        <div className="relative">
          {/* Categories Grid */}
          <div
            ref={scrollRef}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 w-full"
          >
            {categories.map((item, index) => {
              const Icon = item.icon;

              return (
                <Link
                  key={index}
                  href={item.path}
                  className="block group"
                >
                  <div className="h-40 border border-gray-200 rounded-3xl flex flex-col items-center justify-center group-hover:shadow-lg group-hover:border-[#19b77a] group-hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-white p-4">
                    <div
                      className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon
                        className={item.color}
                        size={28}
                      />
                    </div>

                    <h3 className="mt-4 text-base sm:text-lg font-semibold text-slate-800 text-center group-hover:text-[#19b77a] transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;