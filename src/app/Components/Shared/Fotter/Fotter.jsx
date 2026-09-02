"use client";

import { Mail, MapPin, Phone, RotateCcw, ShieldCheck, Star, Truck } from "lucide-react";
import React, { useState } from "react";
import { BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import Link from "next/link";
import { toast } from "react-toastify";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      toast.error("Please enter a valid email address (e.g. name@domain.com)!");
      return;
    }
    toast.success("Thank you for subscribing to Finora newsletter! 🎉");
    setEmail("");
  };

  return (
    <footer className="bg-[#090d16] text-slate-400 py-14 px-4 sm:px-6 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto">
        {/* Top Features Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 border-b border-slate-800/80 pb-12 mb-12">
          {[
            {
              icon: Truck,
              title: "Free Delivery",
              sub: "On orders above ৳1,000",
            },
            {
              icon: RotateCcw,
              title: "Easy Returns",
              sub: "7-day instant return policy",
            },
            {
              icon: ShieldCheck,
              title: "SSL Secure Payment",
              sub: "100% encrypted checkout",
            },
            {
              icon: Star,
              title: "100% Authentic",
              sub: "Directly sourced products",
            },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3.5 group">
              <div className="p-3 bg-slate-800/60 rounded-2xl border border-slate-700/60 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors shrink-0 shadow-2xs">
                <item.icon size={22} />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm sm:text-base tracking-tight">{item.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16 bg-gradient-to-r from-[#0f1422] to-[#13192b] p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/60">
              Stay Connected
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
              Subscribe to Finora Insider
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">Get instant access to weekly flash sales, secret promo codes & new arrivals.</p>
          </div>
          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-2.5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="bg-slate-900 border border-slate-700/80 px-4 py-3 rounded-2xl w-full md:w-80 outline-none text-white text-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-slate-500"
            />
            <button type="submit" className="bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-black px-6 py-3 rounded-2xl transition-all cursor-pointer text-xs uppercase tracking-wider shrink-0 shadow-sm">
              Subscribe
            </button>
          </form>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-white tracking-tight">Finora<span className="text-emerald-500">.</span></span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-400">
              Bangladesh&apos;s trusted single-vendor destination for premium apparel, electronics, and daily essentials.
            </p>
            <div className="flex gap-3 text-slate-400 pt-1">
              <FaFacebook className="cursor-pointer hover:text-emerald-400 hover:scale-110 transition-all" size={20} />
              <BsInstagram className="cursor-pointer hover:text-emerald-400 hover:scale-110 transition-all" size={20} />
              <BsTwitter className="cursor-pointer hover:text-emerald-400 hover:scale-110 transition-all" size={20} />
              <BsYoutube className="cursor-pointer hover:text-emerald-400 hover:scale-110 transition-all" size={20} />
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm tracking-wide uppercase mb-4">Explore Store</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/Pages/AllProduct" className="hover:text-emerald-400 transition-colors">
                  All Catalog Products
                </Link>
              </li>
              <li>
                <Link href="/Pages/Fasion" className="hover:text-emerald-400 transition-colors">
                  Fashion & Lifestyle
                </Link>
              </li>
              <li>
                <Link href="/Pages/Electronics" className="hover:text-emerald-400 transition-colors">
                  Consumer Electronics
                </Link>
              </li>
              <li>
                <Link href="/Pages/MenShoes" className="hover:text-emerald-400 transition-colors">
                  Men&apos;s Footwear
                </Link>
              </li>
              <li>
                <Link href="/Pages/HomeLiving" className="hover:text-emerald-400 transition-colors">
                  Home & Living Decor
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm tracking-wide uppercase mb-4">Customer Support</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/Pages/OrderTracking" className="hover:text-emerald-400 transition-colors">
                  Track Your Package
                </Link>
              </li>
              <li>
                <Link href="/Dashboard/user/Orders" className="hover:text-emerald-400 transition-colors">
                  My Orders History
                </Link>
              </li>
              <li>
                <Link href="/Dashboard/user/Wishlist" className="hover:text-emerald-400 transition-colors">
                  Saved Wishlist
                </Link>
              </li>
              <li>
                <Link href="/Pages/ShopingCards" className="hover:text-emerald-400 transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-emerald-400 transition-colors">
                  Sign In / Register
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3.5 text-xs sm:text-sm">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase mb-4">Get In Touch</h4>
            <div className="flex items-center gap-3">
              <Phone size={17} className="text-emerald-400 shrink-0" />
              <span className="font-semibold text-white">+880 1700-FINORA</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={17} className="text-emerald-400 shrink-0" />
              <span>support@finora.com</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={17} className="text-emerald-400 shrink-0 mt-0.5" />
              <span>Gulshan-2, Dhaka 1212, Bangladesh</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-800 text-xs gap-4 text-center md:text-left">
          <div className="flex flex-wrap gap-2 justify-center items-center">
            <span className="text-slate-500 font-medium mr-1">We Accept:</span>
            {["bKash", "Nagad", "Rocket", "Visa", "MasterCard", "Cash On Delivery"].map((method) => (
              <span
                key={method}
                className="bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 text-slate-300 font-semibold"
              >
                {method}
              </span>
            ))}
          </div>
          <p className="text-slate-500">
            © 2026 Finora Ecommerce Ltd. All rights reserved. Powered by Next.js & PostgreSQL.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

