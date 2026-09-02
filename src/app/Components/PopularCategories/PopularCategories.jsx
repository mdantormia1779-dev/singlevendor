"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Shirt,
  Smartphone,
  Home,
  Sparkles,
  Package,
  Layers,
} from "lucide-react";
import gsap from "gsap";

const baseCategories = [
  {
    title: "Fashion",
    categoryKey: "Fashion",
    icon: Shirt,
    bg: "bg-pink-50 text-pink-600 border-pink-100",
    path: "/Pages/Fasion",
  },
  {
    title: "Electronics",
    categoryKey: "Electronics",
    icon: Smartphone,
    bg: "bg-blue-50 text-blue-600 border-blue-100",
    path: "/Pages/Electronics",
  },
  {
    title: "Home & Living",
    categoryKey: "Home & Living",
    icon: Home,
    bg: "bg-emerald-50 text-emerald-600 border-emerald-100",
    path: "/Pages/HomeLiving",
  },
  {
    title: "Men's Shoes",
    categoryKey: "Men's Shoes",
    icon: Sparkles,
    bg: "bg-purple-50 text-purple-600 border-purple-100",
    path: "/Pages/MenShoes",
  },
  {
    title: "Gadgets",
    categoryKey: "Gadgets",
    icon: Layers,
    bg: "bg-orange-50 text-orange-600 border-orange-100",
    path: "/Pages/Gadgets",
  },
  {
    title: "All Products",
    categoryKey: "All",
    icon: Package,
    bg: "bg-teal-50 text-teal-600 border-teal-100",
    path: "/Pages/AllProduct",
  },
];

const PopularCategories = () => {
  const [categoryCounts, setCategoryCounts] = useState({});
  const gridRef = useRef(null);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.products) {
          const counts = { All: data.products.length };
          data.products.forEach((p) => {
            const cat = p.category || "Fashion";
            counts[cat] = (counts[cat] || 0) + 1;
          });
          setCategoryCounts(counts);
        }
      })
      .catch((err) => console.error("Category fetch error:", err));
  }, []);

  // GSAP animation
  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 25, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.07,
          ease: "power2.out",
        }
      );
    }
  }, []);

  return (
    <section id="popular-categories" className="py-8 sm:py-10 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Browse By Category
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 tracking-tight">
            Popular Categories
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Explore quality authentic collections curated by category
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 w-full"
        >
          {baseCategories.map((item, index) => {
            const Icon = item.icon;
            const count = categoryCounts[item.categoryKey] !== undefined
              ? `${categoryCounts[item.categoryKey]} Items`
              : "Explore";

            return (
              <Link key={index} href={item.path} className="block group">
                <div className="h-44 border border-slate-200/80 rounded-3xl flex flex-col items-center justify-center group-hover:shadow-xl group-hover:border-emerald-500 group-hover:-translate-y-1.5 transition-all duration-300 cursor-pointer bg-white p-4">
                  <div
                    className={`w-14 h-14 rounded-2xl ${item.bg} border flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xs`}
                  >
                    <Icon size={26} />
                  </div>

                  <h3 className="mt-3 text-sm sm:text-base font-bold text-slate-800 text-center group-hover:text-emerald-600 transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-[11px] text-gray-400 font-semibold mt-0.5">
                    {count}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;