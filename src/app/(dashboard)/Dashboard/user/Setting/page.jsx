"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { User, Phone, Mail, Save, ShieldCheck } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "@/app/store/authSlice";
import { toast } from "react-toastify";

const ProfileSettings = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth?.user);

  const [name, setName] = useState(authUser?.name || "Ebrahim Hossain");
  const [phone, setPhone] = useState(authUser?.phone || "+880 1577147480");
  const [email, setEmail] = useState(authUser?.email || "customer@finora.com");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast.error("Please fill in your name and phone number!");
      return;
    }
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      dispatch(updateProfile({ name: name.trim(), phone: phone.trim() }));
      toast.success("Profile details updated successfully! 🎉");
    }, 400);
  };

  const userAvatar = authUser?.avatar || authUser?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80";

  return (
    <div className="max-w-4xl mx-auto py-4">
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Profile Settings</h2>

        <div className="flex items-center gap-5 mb-8 pb-6 border-b border-gray-100">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 shrink-0">
            <Image
              src={userAvatar}
              fill
              sizes="80px"
              className="object-cover"
              alt="Profile avatar"
            />
          </div>
          <div>
            <h3 className="font-extrabold text-xl text-gray-900">{name}</h3>
            <p className="text-slate-500 text-xs sm:text-sm">
              {authUser?.role === "admin" ? "Store Administrator" : "Finora Verified Customer"}
            </p>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold mt-1">
              <ShieldCheck size={14} /> Verified Account
            </span>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6 max-w-xl">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-2xl bg-gray-50/50 text-gray-900 text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-2xl bg-gray-50/50 text-gray-900 text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                disabled
                className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-2xl bg-gray-100 text-gray-500 text-sm cursor-not-allowed"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition cursor-pointer shadow-md shadow-emerald-100 text-sm"
          >
            <Save size={18} />
            <span>{isLoading ? "Saving..." : "Save Profile Changes"}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;