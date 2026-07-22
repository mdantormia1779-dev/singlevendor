"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, Truck, Heart, MapPin, Settings, LogOut, ChevronRight } from 'lucide-react';

const DashboardSidebar = () => {
  const pathname = usePathname();
const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/Dashboard/admin" },
  { name: "Products", icon: ShoppingBag, path: "/Dashboard/admin/products" },
  { name: "Orders", icon: Truck, path: "/Dashboard/admin/orders" },
  { name: "Customers", icon: Heart, path: "/Dashboard/admin/customers" },
  { name: "Analytics", icon: MapPin, path: "/Dashboard/admin/analytics" },
  { name: "Settings", icon: Settings, path: "/Dashboard/admin/setting" },
];

  return (
    <aside className="w-80 space-y-6">
      {/* প্রোফাইল কার্ড - ডিজাইনের সাথে সামঞ্জস্যপূর্ণ */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-16 h-16 rounded-full overflow-hidden">
            <Image 
              src="https://i.pravatar.cc/150" 
              alt="Profile" 
              fill 
              className="object-cover" 
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Ebrahim</h2>
            <p className="text-sm text-gray-500">+8801577147480</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <div className="flex-1 bg-gray-50 py-3 rounded-2xl text-center">
            <p className="text-lg font-bold">3</p>
            <p className="text-xs text-gray-500">Orders</p>
          </div>
          <div className="flex-1 bg-gray-50 py-3 rounded-2xl text-center">
            <p className="text-lg font-bold">2</p>
            <p className="text-xs text-gray-500">Wishlist</p>
          </div>
        </div>
      </div>

      {/* মেনু আইটেমস - ডাইনামিক অ্যাক্টিভ স্টেট সহ */}
      <div className="bg-white p-3 rounded-3xl border border-gray-100 shadow-sm">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center justify-between p-4 rounded-2xl transition ${
                  isActive 
                    ? 'bg-green-50 text-green-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </div>
                <ChevronRight size={18} />
              </Link>
            );
          })}
        </nav>
        
        {/* লগআউট বাটন */}
        <div className="border-t border-gray-100 mt-2 pt-2">
          <button className="flex items-center gap-3 p-4 text-red-500 font-medium w-full hover:bg-red-50 rounded-2xl transition">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;