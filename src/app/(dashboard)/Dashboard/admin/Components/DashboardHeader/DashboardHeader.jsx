"use client";

import React, { useState } from "react";
import {
  Bell,
  Moon,
  Search,
  MessageSquare,
  Maximize2,
  Settings,
  LogOut,
  Store,
  CheckCircle,
  X,
  ChevronDown,
  ShieldAlert,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/app/store/authSlice";
import { toast } from "react-toastify";

export default function DashboardHeader() {
  const router = useRouter();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth?.user);

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const userName = authUser?.name || authUser?.fullName || "Md Antor Mia (admin)";
  const userEmail = authUser?.email || "superadmin@erp.com";
  const userRole = authUser?.role || "SUPER_ADMIN";
  const userAvatar =
    authUser?.avatar ||
    authUser?.image ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80";

  const notifications = [
    { id: 1, title: "New Order #ORD-998241", desc: "Tanvir Ahmed placed an order for ৳3,450", time: "5 mins ago" },
    { id: 2, title: "Low Stock Warning", desc: "Wireless ANC Headphones is low in stock (8 left)", time: "1 hour ago" },
    { id: 3, title: "New Customer Signup", desc: "Sadia Rahman registered an account", time: "3 hours ago" },
  ];

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.info("Logged out from admin panel");
    router.push("/login");
  };

  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-8 relative z-30">
      {/* Search Left */}
      <div className="relative w-48 sm:w-80">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Quick search products, orders..."
          className="w-full h-11 rounded-2xl bg-gray-50 pl-10 pr-4 outline-none border border-gray-200 text-xs sm:text-sm focus:border-emerald-500 transition-colors"
        />
      </div>

      {/* Action Buttons Right */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Fullscreen Button */}
        <button
          onClick={handleFullscreen}
          className="w-10 h-10 rounded-2xl bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-600 transition cursor-pointer border border-gray-100 hidden sm:flex"
          title="Toggle Fullscreen"
        >
          <Maximize2 size={18} />
        </button>

        {/* Notifications Dropdown Toggle */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative w-10 h-10 rounded-2xl bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-600 transition cursor-pointer border border-gray-100"
            title="Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-3xl shadow-xl border border-gray-100 p-4 z-50">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
                <span className="font-bold text-sm text-gray-900">Notifications</span>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-xs text-emerald-600 hover:underline cursor-pointer"
                >
                  Mark all as read
                </button>
              </div>

              <div className="space-y-2.5">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2.5 rounded-2xl bg-gray-50/70 hover:bg-gray-100 transition">
                    <p className="text-xs font-bold text-gray-900">{n.title}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">{n.desc}</p>
                    <span className="text-[10px] text-gray-400 mt-1 block">{n.time}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/Dashboard/admin/orders"
                onClick={() => setShowNotifications(false)}
                className="block text-center text-xs font-bold text-emerald-600 pt-3 hover:underline"
              >
                View all orders & alerts →
              </Link>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-gray-200 mx-1"></div>

        {/* Profile Menu Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 p-1.5 rounded-2xl hover:bg-gray-50 transition cursor-pointer"
          >
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-gray-200 bg-emerald-50 shrink-0">
              {userAvatar ? (
                <Image
                  src={userAvatar}
                  alt={userName}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-bold text-emerald-700 text-sm">
                  {userName.charAt(0)}
                </div>
              )}
            </div>
            <div className="hidden lg:block text-left">
              <h3 className="font-bold text-xs text-gray-900 leading-tight max-w-[140px] truncate">
                {userName}
              </h3>
              <p className="text-[10px] text-emerald-600 font-extrabold tracking-wide uppercase">
                {userRole}
              </p>
            </div>
            <ChevronDown size={14} className="text-gray-400 hidden sm:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-60 bg-white rounded-3xl shadow-xl border border-gray-100 p-3 z-50">
              <div className="px-3 py-2 border-b border-gray-100 mb-1">
                <p className="text-xs font-bold text-gray-900 truncate">{userName}</p>
                <p className="text-[11px] text-gray-500 truncate font-mono">{userEmail}</p>
                <span className="inline-block text-[9px] font-extrabold uppercase px-2 py-0.5 mt-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {userRole}
                </span>
              </div>

              <Link
                href="/Dashboard/admin/settings"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:text-emerald-600 rounded-xl transition"
              >
                <Settings size={15} /> Store Settings
              </Link>
              <Link
                href="/"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:text-emerald-600 rounded-xl transition"
              >
                <Store size={15} /> View Storefront
              </Link>
              <div className="my-1 border-t border-gray-100"></div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-rose-500 hover:bg-rose-50 rounded-xl transition cursor-pointer"
              >
                <LogOut size={15} /> Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}