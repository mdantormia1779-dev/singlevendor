"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Flame } from "lucide-react";
import Card from "../Shared/Card/Card";
import Link from "next/link";
import gsap from "gsap";

const TrendingProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const gridRef = useRef(null);

  useEffect(() => {
    fetch("/api/products?sort=rating&limit=8")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.products) {
          setProducts(data.products);
        }
      })
      .catch((err) => console.error("Trending products fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  // GSAP animation
  useEffect(() => {
    if (products.length > 0 && gridRef.current) {
      const cards = gridRef.current.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 35, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
        }
      );
    }
  }, [products]);

  return (
    <section className="pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200 flex items-center gap-1">
                <Flame size={14} className="text-rose-600" /> High Demand
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Trending Products
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-1">
              Most loved and highest rated items this week
            </p>
          </div>
          <Link href="/Pages/AllProduct?sort=rating">
            <button className="flex items-center gap-2 px-6 py-2.5 border-2 border-gray-900 hover:border-emerald-600 hover:text-emerald-600 hover:bg-emerald-50/40 rounded-full font-bold text-sm transition-all cursor-pointer">
              View All <ArrowRight size={16} />
            </button>
          </Link>
        </div>

        {/* Loading Skeleton or Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl p-4 border border-gray-100 animate-pulse space-y-4"
              >
                <div className="bg-gray-200 h-52 rounded-xl w-full" />
                <div className="h-4 bg-gray-200 rounded-md w-3/4" />
                <div className="h-4 bg-gray-200 rounded-md w-1/2" />
                <div className="h-8 bg-gray-200 rounded-xl w-full" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="py-12 text-center text-gray-500 text-sm">
            No trending products available.
          </div>
        ) : (
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
          >
            {products.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingProduct;
