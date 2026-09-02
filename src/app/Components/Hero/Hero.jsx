"use client";

import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import MarqueeSection from "../MarqueeSection/MarqueeSection";
import Link from "next/link";
import gsap from "gsap";

const Hero = () => {
  const heroImages = [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const heroContainerRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const trustRef = useRef(null);
  const imageFrameRef = useRef(null);

  // GSAP Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      )
        .fromTo(
          descRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(
          trustRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.2"
        )
        .fromTo(
          imageFrameRef.current,
          { scale: 0.92, opacity: 0, rotate: 1 },
          { scale: 1, opacity: 1, rotate: 0, duration: 1, ease: "back.out(1.2)" },
          "-=0.8"
        );
    }, heroContainerRef);

    return () => ctx.revert();
  }, []);

  // Auto Slider
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <>
      <section ref={heroContainerRef} className="bg-gradient-to-b from-[#eef8f6] via-[#f5fbf9] to-white py-12 md:py-20 flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Content Side */}
          <div className="space-y-6">
            {/* New Collection Tag */}
            <div className="inline-flex items-center gap-2 bg-emerald-100/70 border border-emerald-200 text-emerald-800 text-xs font-extrabold px-4 py-1.5 rounded-full shadow-xs">
              <Sparkles size={14} className="text-emerald-600" />
              <span>Finora 2026 Collection has arrived</span>
            </div>

            {/* Main Heading */}
            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900 tracking-tight"
            >
              Your favorite <br />
              <span className="text-emerald-600 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                products
              </span>{" "}
              are now <br />
              closer than ever.
            </h1>

            {/* Description Subtitle */}
            <p
              ref={descRef}
              className="text-slate-600 text-sm sm:text-base font-medium max-w-lg leading-relaxed"
            >
              100% authentic curated lifestyle, apparel & electronics. Enjoy fast nationwide delivery with cash on delivery & bKash checkout.
            </p>

            {/* Call to Action Buttons */}
            <div ref={ctaRef} className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/Pages/AllProduct">
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-3.5 rounded-2xl flex items-center gap-2.5 transition-all shadow-md shadow-emerald-200 cursor-pointer hover:shadow-lg hover:-translate-y-0.5">
                  <ShoppingBag size={18} />
                  Shop Now
                </button>
              </Link>

              <Link href="/Pages/Fasion">
                <button className="border-2 border-slate-200 hover:border-emerald-600 text-slate-700 hover:text-emerald-600 font-bold px-7 py-3.5 rounded-2xl flex items-center gap-2 transition-all cursor-pointer hover:bg-emerald-50/50">
                  Explore Fashion
                  <ArrowRight size={16} />
                </button>
              </Link>
            </div>

            {/* Bottom Trust Icons */}
            <div
              ref={trustRef}
              className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-500 font-bold border-t border-slate-200/80 pt-6"
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600">
                  <ShieldCheck size={16} />
                </div>
                <span>100% Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600">
                  <Truck size={16} />
                </div>
                <span>Free delivery ৳1000+</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600">
                  <RotateCcw size={16} />
                </div>
                <span>7 Days Easy Return</span>
              </div>
            </div>
          </div>

          {/* Right Image Side with GSAP Floating Effect */}
          <div className="relative">
            <div
              ref={imageFrameRef}
              className="bg-gradient-to-tr from-emerald-100/60 to-teal-50 rounded-[40px] overflow-hidden relative aspect-[4/3] w-full shadow-2xl border-4 border-white"
            >
              {heroImages.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  alt="Finora Featured"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={`object-cover absolute top-0 left-0 w-full h-full transition-all duration-1000 ${
                    activeIndex === index
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-105"
                  }`}
                  priority={index < 2}
                  loading={index < 2 ? "eager" : undefined}
                />
              ))}

              {/* Floating Badge */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-white/80 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-extrabold text-sm">
                  ✓
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">Verified Quality</p>
                  <p className="text-[10px] text-emerald-600 font-semibold">10,000+ Happy Customers</p>
                </div>
              </div>
            </div>

            {/* Slider Navigation Dots */}
            <div className="flex justify-center gap-2.5 mt-6">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === index
                      ? "bg-emerald-600 w-8"
                      : "bg-slate-300 hover:bg-emerald-400 w-2"
                  }`}
                  aria-label={`Slide ${index + 1}`}
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