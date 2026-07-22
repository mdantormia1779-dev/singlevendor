"use client";

import React from "react";
import { LayoutDashboard, ShoppingBag, Truck, Heart, MapPin, Settings, LogOut } from "lucide-react";

const ProfileSettings = () => {
  return (
    <div className="flex gap-8  max-w-6xl mx-auto bg-gray-50">
    
   

      {/* ডান পাশের এডিট প্রোফাইল ফর্ম */}
      <div className="flex-1 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
        <div className="flex items-center gap-4 mb-8">
          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100" className="w-16 h-16 rounded-full" alt="Profile" />
          <div>
            <h3 className="font-bold text-lg">ebrahim</h3>
            <p className="text-slate-500 text-sm">Member since 2024</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Full Name</label>
            <input type="text" defaultValue="ebrahim" className="w-full p-4 border border-gray-100 rounded-xl bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Phone Number</label>
            <input type="text" defaultValue="+880 01577147480" className="w-full p-4 border border-gray-100 rounded-xl bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Email Address</label>
            <input type="email" placeholder="example@gmail.com" className="w-full p-4 border border-gray-100 rounded-xl bg-gray-50" />
          </div>
          <button className="w-full py-4 bg-[#19b77a] text-white font-bold rounded-xl">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;