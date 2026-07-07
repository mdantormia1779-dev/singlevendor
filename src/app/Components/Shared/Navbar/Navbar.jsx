"use client";

import React from "react";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Truck,
  ChevronDown,
} from "lucide-react";

const Navbar = () => {
  return (
    <header className="w-full shadow-sm">
      {/* Top Navbar */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto h-[92px] px-6 flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-11 h-11 rounded-xl bg-[#19b77a] flex items-center justify-center">
              <span className="text-white text-3xl font-bold">F</span>
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
            <button className="bg-[#1b2236] text-white h-12 px-6 rounded-xl flex items-center gap-2 font-semibold">
              <Truck size={20} />
              Track Order
            </button>

            {/* Wishlist */}
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-[#ffeaea] flex items-center justify-center">
                <Heart size={22} />
              </div>

              <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                2
              </span>
            </div>

            {/* Cart */}
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-[#e9f9f3] flex items-center justify-center">
                <ShoppingCart size={22} />
              </div>

              <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#19b77a] text-white text-xs flex items-center justify-center">
                3
              </span>
            </div>

            {/* User */}
            <div className="w-12 h-12 rounded-full bg-[#19b77a] flex items-center justify-center text-white">
              <User size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navbar */}
      <div className="bg-[#19b77a]">
        <div className="max-w-7xl mx-auto h-[70px] px-6 flex items-center gap-12 text-white font-medium text-lg">
          <button className="flex items-center gap-1">
            Home <ChevronDown size={18} />
          </button>

          <button className="flex items-center gap-1">
            Fashion <ChevronDown size={18} />
          </button>

          <button className="flex items-center gap-1">
            Electronics <ChevronDown size={18} />
          </button>

          <button className="flex items-center gap-1">
            Men's Shoes <ChevronDown size={18} />
          </button>

          <button className="flex items-center gap-1">
            Home & Living <ChevronDown size={18} />
          </button>

          <button className="flex items-center gap-1">
            Gadgets <ChevronDown size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;