"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import MarqueeSection from "../MarqueeSection/MarqueeSection";

const Hero = () => {
  // ✅ Correct image URL (i.ibb.co)
  const heroImages = [
    "https://i.ibb.co/GfQQjzb4/Group-1000004900.png",
    "https://i.ibb.co/GfQQjzb4/Group-1000004900.png",
    "https://i.ibb.co/GfQQjzb4/Group-1000004900.png",
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // ✅ Auto Slide (3 sec interval)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="bg-[#eef8f6]">
        <div className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side */}
          <div>
            <div className="inline-flex items-center bg-[#dff8ee] text-[#16b77a] text-sm px-4 py-2 rounded-full mb-6">
              ✨ New collection has arrived.
            </div>

            <h1 className="text-6xl font-extrabold leading-tight text-[#0f172a]">
              Your favorite <br /> 
              <span className="text-[#16b77a]">products</span> are now <br /> easier
            </h1>
          </div>

          {/* Right Side */}
          <div className="relative">
            <div className="bg-[#dff8f3] rounded-[35px] overflow-hidden relative h-100">

              {/* 🔥 Animated Image */}
              {heroImages.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  alt="Hero"
                  fill
                  className={`object-cover absolute top-0 left-0 w-full h-full transition-all duration-700 ${
                    activeIndex === index
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-110"
                  }`}
                  priority
                />
              ))}

            </div>

            {/* Dots */}
            <div className="flex justify-center gap-3 mt-5">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeIndex === index
                      ? "bg-[#16b77a] scale-125"
                      : "border border-[#16b77a]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <MarqueeSection />
    </>
  );
};

export default Hero;