"use client";

import {
  Bell,
  Moon,
  Search,
  MessageSquare,
  Maximize2,
  Grid2x2,
  Settings,
} from "lucide-react";

import Image from "next/image";

export default function DashboardHeader() {
  return (
    <header className="h-20 bg-white border-b flex items-center justify-between px-8">
      {/* Left */}
      <div className="relative w-[320px]">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
        />

        <input
          type="text"
          placeholder="Search"
          className="w-full h-12 rounded-xl bg-gray-100 pl-12 pr-4 outline-none border-0 placeholder:text-gray-500"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Language */}
        <button className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
          🇬🇧
        </button>

        {/* Dark */}
        <button className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
          <Moon size={20} />
        </button>

        {/* Notification */}
        <button className="relative w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
          <Bell size={20} />

          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></span>
        </button>

        {/* Message */}
        <button className="relative w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
          <MessageSquare size={20} />

          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></span>
        </button>

        {/* Fullscreen */}
        <button className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
          <Maximize2 size={20} />
        </button>

        {/* Apps */}
        <button className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
          <Grid2x2 size={20} />
        </button>

        {/* Divider */}
        <div className="w-px h-10 bg-gray-200"></div>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer">
          <Image
            src="https://i.pravatar.cc/150?img=12"
            alt="user"
            width={48}
            height={48}
            className="rounded-full"
          />

          <div className="hidden lg:block">
            <h3 className="font-semibold text-gray-900">
              Kristin Watson
            </h3>

            <p className="text-sm text-gray-500">
              Sale Administrator
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-10 bg-gray-200"></div>

        {/* Setting */}
        <button className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
          <Settings size={20} />
        </button>
      </div>
    </header>
  );
}