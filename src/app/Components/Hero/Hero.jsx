"use client";

import React from "react";
import { ArrowRight, ShieldCheck, Truck, RotateCcw, ShoppingBag } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  return (
    <>
      <section className="bg-[#eef8f6]">
        <div className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center bg-[#dff8ee] text-[#16b77a] text-sm px-4 py-2 rounded-full mb-6">
              ✨ New collection has arrived.
            </div>

            <h1 className="text-6xl font-extrabold leading-tight text-[#0f172a]">
              Your favorite <br />
              <span className="text-[#16b77a]">products</span> are now <br />
              easier
            </h1>

            <p className="text-gray-500 text-xl mt-8 max-w-xl leading-9">
              100% original product, fast delivery and secure payment.
              With cash on delivery facility in Dhaka.
            </p>

            <div className="flex gap-5 mt-10">
              <button className="bg-[#16b77a] text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:bg-[#109b67] duration-300">
                <ShoppingBag size={20} />
                Shop Now
              </button>

              <button className="border border-[#16b77a] text-black px-8 py-4 rounded-xl font-medium flex items-center gap-2 hover:bg-white duration-300">
                Explore Products
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="flex flex-wrap gap-8 mt-10 text-gray-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-[#16b77a]" size={20} />
                Secure payment
              </div>

              <div className="flex items-center gap-2">
                <Truck className="text-[#16b77a]" size={20} />
                Free delivery
              </div>

              <div className="flex items-center gap-2">
                <RotateCcw className="text-[#16b77a]" size={20} />
                7 days return
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="bg-[#dff8f3] rounded-[35px] overflow-hidden">
              <Image
                src="/images/hero.png"
                alt="Hero"
                width={900}
                height={700}
                className="w-full h-auto object-cover"
                priority
              />
            </div>

            {/* Price Card */}
            <div className="absolute bottom-5 right-5 bg-white rounded-2xl shadow-xl px-5 py-3 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#e7fbf3] flex items-center justify-center">
                <ShoppingBag className="text-[#16b77a]" />
              </div>

              <div>
                <h3 className="font-bold text-lg">৳৫০,০০০+</h3>
                <p className="text-sm text-gray-500">সবচেয়ে কেনা</p>
              </div>
            </div>

            {/* Slider Dots */}
            <div className="flex justify-center gap-3 mt-5">
              <span className="w-3 h-3 rounded-full bg-[#16b77a]"></span>
              <span className="w-3 h-3 rounded-full border border-[#16b77a]"></span>
              <span className="w-3 h-3 rounded-full border border-[#16b77a]"></span>
              <span className="w-3 h-3 rounded-full border border-[#16b77a]"></span>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Strip */}
      <div className="bg-[#16b77a] text-white py-5">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between text-lg font-medium gap-4">
          <span>Cash on Delivery available</span>
          <span>• bKash · Nagad · Rocket</span>
          <span>• 100% authentic guarantee</span>
          <span>• 7-day easy returns</span>
          <span>• Cash on Delivery available</span>
        </div>
      </div>
    </>
  );
};

export default Hero;