import React from 'react';
import Image from 'next/image'; // Image ইমপোর্ট করা হয়েছে
import { LayoutDashboard, ShoppingBag, Truck, Heart, MapPin, Settings, LogOut } from 'lucide-react';
import DashboardSidebar from './DashboardSidebar/DashboardSidebar';

export default function DashboardLayout({ children }) {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'My Orders', icon: ShoppingBag, path: '/dashboard/orders' },
    { name: 'Track Order', icon: Truck, path: '/dashboard/track' },
    { name: 'Wishlist', icon: Heart, path: '/dashboard/wishlist' },
    { name: 'Addresses', icon: MapPin, path: '/dashboard/addresses' },
    { name: 'Profile Settings', icon: Settings, path: '/dashboard/settings' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 p-6 gap-6">
      <DashboardSidebar></DashboardSidebar>
      {/* ২. ডাইনামিক কন্টেন্ট */}
      <main className="grow">
        {children}
      </main>
    </div>
  );
}