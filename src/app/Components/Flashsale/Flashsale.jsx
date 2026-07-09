"use client";

import React, { useEffect, useState } from "react";
import { Flame, Clock3 } from "lucide-react";
import { motion } from "framer-motion";
import products from "@/app/data/data.json";
import FlashCard from "../Shared/FlashCard/FlashCard";

const Flashsale = () => {
  const [time, setTime] = useState({ hours: 12, minutes: 34, seconds: 53 });
  const [isPaused, setIsPaused] = useState(false); // হোভার স্টেট ট্র্যাক করার জন্য

  // টাইমার লজিক
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

  return (
    <section className="pb-15">
      <div className="max-w-7xl mx-auto bg-[#FFF5F4] rounded-3xl p-8 overflow-hidden">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
              <Flame className="text-red-500" />
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold">Flash sale 🔥</h2>
              <p className="text-gray-500 text-sm sm:text-base">
                Buy before time runs out!
              </p>
            </div>
          </div>

          {/* Timer Section */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <Clock3 className="text-red-500 hidden sm:block" />
            {[
              { value: time.hours, label: "Hours" },
              { value: time.minutes, label: "Mins" },
              { value: time.seconds, label: "Secs" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-red-500 text-white rounded-xl px-4 py-2 text-center min-w-[70px]"
              >
                <h3 className="text-2xl sm:text-3xl font-bold">
                  {String(item.value).padStart(2, "0")}
                </h3>
                <p className="text-[10px] sm:text-xs uppercase tracking-wider">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* --- Infinite Marquee Section --- */}
        <div
          className="overflow-hidden relative w-full"
          onMouseEnter={() => setIsPaused(true)} // মাউস ভেতরে আসলে স্টেট true হবে
          onMouseLeave={() => setIsPaused(false)} // মাউস চলে গেলে স্টেট false হবে
        >
          <motion.div
            className="flex gap-6 w-max"
            // যদি `isPaused` সত্য হয়, তবে অ্যানিমেশনটি থেমে থাকবে (paused), নাহলে চলবে (running)
            animate={isPaused ? { x: undefined } : { x: ["0%", "-50%"] }}
            style={{ animationPlayState: isPaused ? "paused" : "running" }}
            transition={{
              duration: 25,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {/* ইনফিনিট লুপের জন্য ডেটা ২ বার ম্যাপ করা হয়েছে */}
            {[...products, ...products].map((product, index) => (
              <div key={index} className="shrink-0 w-80 py-2">
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
