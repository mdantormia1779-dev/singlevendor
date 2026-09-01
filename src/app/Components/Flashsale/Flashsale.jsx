"use client";

import React, { useEffect, useState, useRef } from "react";
import { Flame, Clock3 } from "lucide-react";
import { motion } from "framer-motion";
import FlashCard from "../Shared/FlashCard/FlashCard";
import gsap from "gsap";

const Flashsale = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState({ hours: 12, minutes: 34, seconds: 53 });
  const [isPaused, setIsPaused] = useState(false);
  const headerRef = useRef(null);

  // Fetch real products from API
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.products) {
          // Prefer items with discount or all products
          const discounted = data.products.filter((p) => p.discount || p.oldPrice);
          setProducts(discounted.length > 0 ? discounted : data.products);
        }
      })
      .catch((err) => console.error("Flashsale fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { hours: h, minutes: m, seconds: s } = prev;
        if (s > 0) s--;
        else {
          s = 59;
          if (m > 0) m--;
          else {
            m = 59;
            if (h > 0) h--;
          }
        }
        return { hours: h, minutes: m, seconds: s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // GSAP animation for header icon pulse
  useEffect(() => {
    if (headerRef.current) {
      gsap.to(headerRef.current.querySelector(".flame-icon"), {
        scale: 1.15,
        repeat: -1,
        yoyo: true,
        duration: 0.8,
        ease: "power1.inOut",
      });
    }
  }, []);

  if (loading || products.length === 0) {
    return null;
  }

  // Duplicate for seamless infinite loop marquee
  const marqueeItems = [...products, ...products];

  return (
    <section className="pb-16">
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-[#FFF5F4] via-[#FFF9F8] to-[#FFF5F4] border border-red-100 rounded-3xl p-6 sm:p-8 overflow-hidden shadow-xs">
        {/* Header Section */}
        <div
          ref={headerRef}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10"
        >
          <div className="flex items-center gap-4">
            <div className="flame-icon w-12 h-12 rounded-2xl bg-red-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-red-200">
              <Flame size={26} />
            </div>
            <div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Flash Sale 🔥
              </h2>
              <p className="text-gray-500 text-xs sm:text-base font-medium mt-0.5">
                Limited-time deals from Finora catalog — grab before stock runs out!
              </p>
            </div>
          </div>

          {/* Timer Section */}
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-start sm:justify-end">
            <Clock3 className="text-red-500 hidden sm:block" size={20} />
            {[
              { value: time.hours, label: "Hours" },
              { value: time.minutes, label: "Mins" },
              { value: time.seconds, label: "Secs" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-red-500 text-white rounded-2xl px-3 sm:px-4 py-2 text-center min-w-16 sm:min-w-18 shadow-sm"
              >
                <h3 className="text-xl sm:text-2xl font-black font-mono">
                  {String(item.value).padStart(2, "0")}
                </h3>
                <p className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* --- Infinite Marquee Section --- */}
        <div
          className="overflow-hidden relative w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            className="flex gap-6 w-max"
            animate={isPaused ? { x: undefined } : { x: ["0%", "-50%"] }}
            style={{ animationPlayState: isPaused ? "paused" : "running" }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {marqueeItems.map((product, index) => (
              <div key={`${product.id}-${index}`} className="shrink-0 w-72 sm:w-80 py-2">
                <FlashCard product={product} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Flashsale;
