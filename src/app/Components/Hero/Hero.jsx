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
      <section ref={heroContainerRef} className="relative bg-gradient-to-b from-[#eef8f6] via-[#f7fbf9] to-white py-12 md:py-20 flex items-center overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Content Side */}
          <div className="space-y-6">
            {/* Live Collection Pill */}
            <div className="inline-flex items-center gap-2.5 bg-white border border-emerald-200/80 text-emerald-800 text-xs font-bold px-4 py-1.5 rounded-full shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Finora 2026 Collection • 100% Authentic</span>
            </div>

            {/* Main Heading */}
            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.12] text-slate-900 tracking-tight"
            >
              Your favorite <br />
              <span className="text-emerald-600 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-700 bg-clip-text text-transparent">
                products
              </span>{" "}
              are now <br />
              closer than ever.
            </h1>

            {/* Description Subtitle */}
            <p
              ref={descRef}
              className="text-slate-600 text-sm sm:text-base font-normal max-w-lg leading-relaxed"
            >
              Discover authentic lifestyle, fashion apparel & everyday gadgets. Enjoy fast nationwide delivery, cash on delivery & seamless bKash checkout.
            </p>

            {/* Call to Action Buttons */}
            <div ref={ctaRef} className="flex flex-wrap items-center gap-4 pt-1">
              <Link href="/Pages/AllProduct">
                <button className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold px-7 py-3.5 rounded-2xl flex items-center gap-2.5 transition-all shadow-md shadow-emerald-600/20 cursor-pointer hover:shadow-lg hover:-translate-y-0.5">
                  <ShoppingBag size={18} />
                  Shop Now
                </button>
              </Link>

              <Link href="/Pages/Fasion">
                <button className="border-2 border-slate-200 hover:border-emerald-600 text-slate-700 hover:text-emerald-600 font-bold px-7 py-3.5 rounded-2xl flex items-center gap-2 transition-all cursor-pointer hover:bg-white hover:shadow-xs active:scale-95">
                  Explore Fashion
                  <ArrowRight size={16} />
                </button>
              </Link>
            </div>

            {/* Social Proof Avatars */}
            <div className="flex items-center gap-4 pt-1">
              <div className="flex -space-x-2.5 overflow-hidden">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80"
                  alt="Customer 1"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
                  alt="Customer 2"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
                  alt="Customer 3"
                />
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 ring-2 ring-white text-[10px] font-extrabold text-white">
                  +15k
                </div>
              </div>
              <div className="text-xs text-slate-600">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  {"★".repeat(5)}
                  <span className="text-slate-800 ml-1">4.9 / 5.0</span>
                </div>
                <p className="text-slate-500 text-[11px]">From 15,000+ satisfied shoppers</p>
              </div>
            </div>

            {/* Bottom Trust Icons */}
            <div
              ref={trustRef}
              className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-600 font-semibold border-t border-slate-200/80 pt-6"
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600 border border-emerald-100">
                  <ShieldCheck size={16} />
                </div>
                <span>100% Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600 border border-emerald-100">
                  <Truck size={16} />
                </div>
                <span>Free delivery ৳1000+</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600 border border-emerald-100">
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

              {/* Floating Verified Quality Badge */}
              <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-white/80 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black text-base shadow-sm">
                  ✓
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Verified Quality</p>
                  <p className="text-[11px] text-emerald-600 font-semibold">100% Genuine Guaranteed</p>
                </div>
              </div>
            </div>

            {/* Slider Navigation Dots */}
            <div className="flex justify-center gap-2 mt-5">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === index
                      ? "bg-emerald-600 w-8"
                      : "bg-slate-300 hover:bg-slate-400 w-2"
                  }`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Banner */}
      <MarqueeSection />
    </>
  );
};

export default Hero;