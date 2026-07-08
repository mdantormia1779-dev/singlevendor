"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import MarqueeSection from "../MarqueeSection/MarqueeSection";
import Link from "next/link";

const Hero = () => {
  // স্লাইডারের জন্য ইমেজ অ্যারে
  const heroImages = [
    "https://i.ibb.co/GfQQjzb4/Group-1000004900.png",
    "https://i.ibb.co/GfQQjzb4/Group-1000004900.png",
    "https://i.ibb.co/GfQQjzb4/Group-1000004900.png",
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // অটো স্লাইডার (৩ সেকেন্ড পর পর)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="bg-[#eef8f6] py-15 flex items-center">
        <div className="max-w-7xl mx-auto px-7 grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Side */}
          <div>
            {/* New Collection Tag */}
            <div className="inline-flex items-center bg-[#dff8ee] text-[#16b77a] text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
              ✨ New collection has arrived.
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight text-[#0f172a] mb-6">
              Your favorite <br />
              <span className="text-[#16b77a]">products</span> are now <br />{" "}
              easier
            </h1>

            {/* Description Subtitle */}
            <p className="text-[#64748b] text-base font-medium max-w-lg mb-8 leading-relaxed">
              100% original product, fast delivery and secure payment. With cash
              on delivery facility in Dhaka.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button className="bg-[#16b77a] hover:bg-[#129a66] text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                Shop Now
              </button>
              <Link href={"/Pages/AllProduct"}>
                <button className="border-2 border-[#cbd5e1] hover:border-[#16b77a] text-[#334155] hover:text-[#16b77a] font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition-all">
                  Explore Products
                  <span>→</span>
                </button>
              </Link>
            </div>

            {/* Bottom Trust Icons */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-[#64748b] font-medium border-t border-[#e2e8f0] pt-6">
              <div className="flex items-center gap-2">
                <span className="text-[#16b77a]">🛡️</span> Secure payment
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#16b77a]">🚚</span> Free delivery
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#16b77a]">🔄</span> 7 days return
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="relative">
            {/* Main Image Container */}
            <div className="bg-[#dff8f3] rounded-[35px] overflow-hidden relative aspect-[4/3] w-full">
              {/* Animated Sliding Images */}
              {heroImages.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  alt="Hero Products"
                  fill
                  className={`object-cover absolute top-0 left-0 w-full h-full transition-all duration-700 ${
                    activeIndex === index
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-105"
                  }`}
                  priority={index === 0}
                />
              ))}
            </div>

            {/* Slider Navigation Dots */}
            <div className="flex justify-center gap-3 mt-5">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-[#16b77a] w-5" // Active dot becomes a bit wider like modern sliders
                      : "bg-[#cbd5e1] hover:bg-[#16b77a]/50"
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
