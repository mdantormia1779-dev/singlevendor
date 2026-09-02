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
    <footer className="bg-[#0a0c10] text-gray-400 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Features Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 border-b border-gray-800 pb-12 mb-12">
          {[
            {
              icon: Truck,
              title: "Free Delivery",
              sub: "On orders above ৳1,000",
            },
            {
              icon: RotateCcw,
              title: "Easy Returns",
              sub: "7-day return policy",
            },
            {
              icon: ShieldCheck,
              title: "SSL Secure",
              sub: "100% secure payments",
            },
            {
              icon: Star,
              title: "Original Products",
              sub: "100% authentic items",
            },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="p-2.5 bg-gray-900 rounded-full border border-gray-800 text-green-500 shrink-0">
                <item.icon size={22} />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm sm:text-base">{item.title}</h4>
                <p className="text-xs text-gray-500">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16 bg-[#11141a] p-6 sm:p-8 rounded-2xl border border-gray-800">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Subscribe to our Newsletter
            </h2>
            <p className="text-sm text-gray-400">Get the latest updates on new arrivals, hot deals and discount coupons.</p>
          </div>
          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-[#1a1d23] border border-gray-700 p-3 rounded-xl w-full md:w-80 outline-none text-white text-sm focus:border-green-500 transition-colors"
            />
            <button type="submit" className="bg-green-500 text-black font-bold px-6 py-3 rounded-xl hover:bg-green-400 transition cursor-pointer text-sm shrink-0">
              Subscribe
            </button>
          </form>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-16">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white tracking-tight">Finora</h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Your trusted destination for premium lifestyle and fashion products. Quality you can
              trust, prices you will love.
            </p>
            <div className="flex gap-4 text-gray-400 pt-2">
              <FaFacebook className="cursor-pointer hover:text-white transition-colors" size={20} />
              <BsInstagram className="cursor-pointer hover:text-white transition-colors" size={20} />
              <BsTwitter className="cursor-pointer hover:text-white transition-colors" size={20} />
              <BsYoutube className="cursor-pointer hover:text-white transition-colors" size={20} />
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/Pages/AllProduct" className="hover:text-green-400 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/Pages/Fasion" className="hover:text-green-400 transition-colors">
                  Fashion Collection
                </Link>
              </li>
              <li>
                <Link href="/Pages/Electronics" className="hover:text-green-400 transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/Pages/OrderTracking" className="hover:text-green-400 transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/Dashboard/user" className="hover:text-green-400 transition-colors">
                  Customer Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Customer Care</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/Dashboard/user/Orders" className="hover:text-green-400 transition-colors">
                  My Orders
                </Link>
              </li>
              <li>
                <Link href="/Dashboard/user/Wishlist" className="hover:text-green-400 transition-colors">
                  My Wishlist
                </Link>
              </li>
              <li>
                <Link href="/Pages/ShopingCards" className="hover:text-green-400 transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <span className="hover:text-green-400 transition-colors cursor-pointer">
                  Returns & Refunds
                </span>
              </li>
              <li>
                <span className="hover:text-green-400 transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-3.5 text-sm">
            <h4 className="text-white font-bold mb-4">Contact Us</h4>
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-green-500 shrink-0" />
              <span>+880 1234-567890</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-green-500 shrink-0" />
              <span>support@finora.com</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-green-500 shrink-0 mt-0.5" />
              <span>123 Shopping Street, Gulshan-2, Dhaka 1212, Bangladesh</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800 text-sm gap-4 text-center md:text-left">
          <div className="flex flex-wrap gap-2 justify-center">
            {["Visa", "MasterCard", "bKash", "Nagad", "COD"].map((method) => (
              <span
                key={method}
                className="bg-[#1a1d23] px-3 py-1 rounded-lg border border-gray-700 text-xs text-gray-300 font-medium"
              >
                {method}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-500">
            © 2026 Finora Commerce. All rights reserved. Made with ❤️ in Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

