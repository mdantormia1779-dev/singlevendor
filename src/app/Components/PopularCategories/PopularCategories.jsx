"use client";

import React from "react";
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
    title: "Book",
    icon: BookOpen,
    bg: "bg-orange-100",
    color: "text-orange-500",
    path: "/Components/Working",
  },
  {
    title: "Grocery",
    icon: Package,
    bg: "bg-emerald-100",
    color: "text-emerald-500",
    path: "/Components/Working",
  },
];

const PopularCategories = () => {
  return (
    <section
      id="popular-categories"
      className="py-20 bg-white scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center text-slate-900 mb-14">
          Popular Categories
        </h2>

        <div className="relative flex items-center">
          {/* Left Button */}
          <button className="absolute -left-4 z-10 w-10 h-10 rounded-full bg-[#19b77a] text-white flex items-center justify-center shadow-lg hover:bg-[#149765] transition">
            <ChevronLeft size={20} />
          </button>

          {/* Categories */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 w-full">
            {categories.map((item, index) => {
              const Icon = item.icon;

              return (
                <Link
                  key={index}
                  href={item.path}
                  className="block"
                >
                  <div className="h-40 border border-gray-200 rounded-3xl flex flex-col items-center justify-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-white">
                    <div
                      className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center`}
                    >
                      <Icon
                        className={item.color}
                        size={30}
                      />
                    </div>

                    <h3 className="mt-6 text-2xl font-semibold text-slate-800 text-center">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Right Button */}
          <button className="absolute -right-4 z-10 w-10 h-10 rounded-full bg-[#19b77a] text-white flex items-center justify-center shadow-lg hover:bg-[#149765] transition">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;