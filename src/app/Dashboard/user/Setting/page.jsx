"use client";

import React from "react";

const Setting = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Edit Profile</h2>

      <div className="border border-gray-100 rounded-3xl p-6 shadow-sm bg-white">
        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-8">
          <img
            src="https://via.placeholder.com/60" // আপনার প্রোফাইল ইমেজ লিংক এখানে দিন
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="font-bold text-slate-800 text-lg">ebrahim</h3>
            <p className="text-slate-500 text-sm">Member since 2024</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Full Name
            </label>
            <input
              type="text"
              defaultValue="ebrahim"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#19b77a] transition-all"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Phone Number
            </label>
            <input
              type="text"
              defaultValue="+880 01577147480"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#19b77a] transition-all"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#19b77a] transition-all"
            />
          </div>

          {/* Save Button */}
          <button className="w-full mt-4 py-4 bg-[#19b77a] text-white font-bold rounded-xl hover:bg-[#14a06a] transition-all shadow-md">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setting;