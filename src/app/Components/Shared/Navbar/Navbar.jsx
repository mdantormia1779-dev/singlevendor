"use client";

import React, { useState, useEffect } from "react";
import { Search, Heart, ShoppingCart, User, Truck } from "lucide-react";
import NavMenu from "./NavMenu/NavMenu";
import Image from "next/image";
import logo from "../../../../../public/logo.png";
import Link from "next/link";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isBottomVisible, setIsBottomVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const cartItems = useSelector((state) => state.cart.items);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        setIsBottomVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scroll Down -> নিচের গ্রিন বার হাইড হবে
        setIsBottomVisible(false);
      } else {
        // Scroll Up -> নিচের গ্রিন বার আবার আসবে
        setIsBottomVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Main Header Container */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white">
        {/* Top Navbar (সবসময় ফিক্সড থাকবে এবং এটার নিচে শ্যাডো থাকবে) */}
        <div className="bg-white relative z-20 shadow-sm">
          <div className="max-w-7xl mx-auto h-23 px-6 flex items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-11 h-11 rounded-xl bg-[#19b77a] flex items-center justify-center">
                <div className="bg-emerald-500 p-2 rounded-lg text-white">
                  <Image src={logo} alt="Logo" width={24} height={24} />
                </div>
              </div>

              <h2 className="text-3xl font-bold text-[#111]">Finora</h2>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-3xl flex rounded-2xl overflow-hidden border border-gray-200">
              <input
                type="text"
                placeholder="Search for products, brands, categories..."
                className="flex-1 h-14 px-5 text-lg outline-none"
              />

              <button className="bg-[#19b77a] hover:bg-[#16a56f] duration-300 px-8 flex items-center gap-2 text-white font-medium">
                <Search size={20} />
                Search
              </button>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4 shrink-0">
              <Link
                href="/Pages/OrderTracking"
                className="bg-[#1b2236] text-white h-12 px-6 rounded-xl flex items-center gap-2 font-semibold"
              >
                <Truck size={20} />
                Track Order
              </Link>

              {/* Wishlist */}
              <div className="relative cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-[#ffeaea] flex items-center justify-center">
                  <Heart size={22} />
                </div>

                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  2
                </span>
              </div>

              <Link href="/Pages/ShopingCards">
                <div className="relative cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-[#e9f9f3] flex items-center justify-center">
                    <ShoppingCart size={22} />
                  </div>

                  {/* ✅ Dynamic count */}
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#19b77a] text-white text-xs flex items-center justify-center">
                    {cartItems.length}
                  </span>
                </div>
              </Link>

              {/* User */}
              <div className="w-12 h-12 rounded-full bg-[#19b77a] flex items-center justify-center text-white cursor-pointer">
                <User size={22} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navbar (গ্রিন বার - এটি অ্যানিমেশন দিয়ে টপ বারের নিচে চলে যাবে) */}
        <div
          className={`overflow-hidden bg-[#19b77a] shadow-md transition-[max-height,opacity,transform] duration-400 ease-in-out ${
            isBottomVisible
              ? "max-h-20 opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-3"
          }`}
        >
          <div className="max-w-7xl mx-auto h-17.5 px-6 flex items-center gap-12 text-white font-medium text-lg">
            <NavMenu />
          </div>
        </div>
      </header>

      {/* Spacer (Navbar Height) */}
      <div className="h-40.5" />
    </>
  );
};

export default Navbar;
