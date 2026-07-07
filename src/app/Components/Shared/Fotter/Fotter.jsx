import { Mail, MapPin, Phone, RotateCcw, ShieldCheck, Star, Truck } from "lucide-react";
import React from "react";
import { BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0a0c10] text-gray-400 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Features Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-800 pb-12 mb-12">
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
              <div className="p-2 bg-gray-900 rounded-full border border-gray-800 text-green-500">
                <item.icon size={24} />
              </div>
              <div>
                <h4 className="text-white font-semibold">{item.title}</h4>
                <p className="text-xs text-gray-500">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Subscribe to our Newsletter
            </h2>
            <p>Get the latest updates on new products and upcoming sales</p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-[#1a1d23] border border-gray-700 p-3 rounded-lg w-full md:w-80 outline-none text-white"
            />
            <button className="bg-green-500 text-black font-bold px-6 py-3 rounded-lg hover:bg-green-600 transition">
              Subscribe
            </button>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Finora</h3>
            <p className="text-sm leading-relaxed">
              Your trusted destination for premium products. Quality you can
              trust, prices youll love.
            </p>
            <div className="flex gap-4">
              <FaFacebook className="cursor-pointer hover:text-white" />
              <BsInstagram className="cursor-pointer hover:text-white" />
              <BsTwitter className="cursor-pointer hover:text-white" />
              <BsYoutube className="cursor-pointer hover:text-white" />
            </div>
          </div>

          {[
            {
              title: "Quick Links",
              links: ["About Us", "Contact", "Careers", "Press", "Blog"],
            },
            {
              title: "Customer Service",
              links: [
                "Help Center",
                "Track Order",
                "Returns",
                "Shipping Info",
                "Privacy Policy",
                "Terms & Conditions",
              ],
            },
          ].map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-bold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li
                    key={link}
                    className="hover:text-green-500 cursor-pointer"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="space-y-4">
            <h4 className="text-white font-bold mb-4">Contact Us</h4>
            <div className="flex items-center gap-2">
              <Phone size={18} /> +880 1234-567890
            </div>
            <div className="flex items-center gap-2">
              <Mail size={18} /> support@finora.com
            </div>
            <div className="flex gap-2">
              <MapPin size={20} />{" "}
              <span>
                123 Shopping Street, Gulshan-2, Dhaka 1212, Bangladesh
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800 text-sm">
          <div className="flex gap-4 mb-4 md:mb-0">
            {["Visa", "MasterCard", "bKash", "Nagad", "COD"].map((method) => (
              <span
                key={method}
                className="bg-[#1a1d23] px-3 py-1 rounded border border-gray-700"
              >
                {method}
              </span>
            ))}
          </div>
          <p>
            © 2026 Finora Commerce. All rights reserved. Made with ❤️ in
            Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
