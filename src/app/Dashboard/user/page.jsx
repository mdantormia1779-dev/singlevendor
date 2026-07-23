"use client";

import React from "react";
import { Package, CheckCircle2, Clock, Heart } from "lucide-react";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function DashboardHomePage() {

  // ✅ Redux data
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const orders = useSelector((state) => state.cart.orders);

  // ✅ Stats (Dynamic)
  const stats = [
    {
      id: 1,
      title: "Total Orders",
      count: orders.length.toString(),
      icon: Package,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      id: 2,
      title: "Delivered",
      count: orders.filter(o => o.status === "Delivered").length.toString(),
      icon: CheckCircle2,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
    {
      id: 3,
      title: "Active Orders",
      count: orders.filter(o => o.status !== "Delivered").length.toString(),
      icon: Clock,
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      id: 4,
      title: "Wishlist",
      count: wishlistItems.length.toString(),
      icon: Heart,
      color: "text-red-500",
      bg: "bg-red-50",
    },
  ];

  // ✅ Recent Orders (Latest 5)
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">

      {/* Welcome */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-slate-900">
          Welcome back! 👋
        </h1>
        <p className="text-slate-500 mt-1 text-sm">
          Here's what's happening with your account
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${stat.bg}`}>
                <Icon className={stat.color} size={20} strokeWidth={2.5} />
              </div>

              <h2 className="text-2xl font-bold text-slate-900">
                {stat.count}
              </h2>

              <p className="text-slate-500 text-sm mt-1">
                {stat.title}
              </p>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            Recent Orders
          </h2>

          <button className="text-[#19b77a] font-medium text-sm hover:underline">
            View All
          </button>
        </div>

        <div className="space-y-4">

          {recentOrders.length === 0 ? (
            <p className="text-center text-gray-400 py-10">
              No Orders Yet
            </p>
          ) : (
            recentOrders.map((order, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50/50 border border-gray-100 rounded-2xl"
              >
                <div className="flex items-center gap-4">

                  {/* Product Image */}
                  <div className="relative w-14 h-14 overflow-hidden rounded-xl border border-gray-100 shrink-0">
                    <Image
                      src={order.products?.[0]?.image}
                      alt="Product"
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800 text-sm md:text-base">
                      Order {order.id}
                    </h3>

                    <p className="text-slate-500 text-xs md:text-sm mt-0.5">
                      {order.date} - {order.total}
                    </p>
                  </div>
                </div>

                <div>
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold ${order.statusColor}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
}