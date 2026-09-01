"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Package, CheckCircle2, Clock, Heart, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { loadStoredOrders } from "@/app/store/cartSlice";

export default function DashboardHomePage() {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth?.user);
  const wishlistItems = useSelector((state) => state.wishlist?.items) || [];
  const rawOrders = useSelector((state) => state.cart?.orders);
  const reduxOrders = useMemo(() => rawOrders || [], [rawOrders]);

  const [dbOrders, setDbOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const userName = authUser?.name || "Customer";

  // Fetch real orders from Prisma API
  useEffect(() => {
    dispatch(loadStoredOrders());

    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.orders && data.orders.length > 0) {
          setDbOrders(data.orders);
        } else {
          setDbOrders(reduxOrders);
        }
      })
      .catch(() => setDbOrders(reduxOrders))
      .finally(() => setLoading(false));
  }, [dispatch, reduxOrders]);

  const activeOrdersList = dbOrders.length > 0 ? dbOrders : reduxOrders;

  const totalCount = activeOrdersList.length;
  const deliveredCount = activeOrdersList.filter(
    (o) => o.status?.toLowerCase() === "delivered"
  ).length;
  const activeCount = activeOrdersList.filter(
    (o) => o.status?.toLowerCase() !== "delivered" && o.status?.toLowerCase() !== "cancelled"
  ).length;

  const stats = [
    {
      id: 1,
      title: "Total Orders",
      count: totalCount.toString(),
      icon: Package,
      color: "text-blue-600",
      bg: "bg-blue-50 border border-blue-100",
    },
    {
      id: 2,
      title: "Delivered",
      count: deliveredCount.toString(),
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50 border border-emerald-100",
    },
    {
      id: 3,
      title: "Active In-Transit",
      count: activeCount.toString(),
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50 border border-amber-100",
    },
    {
      id: 4,
      title: "Wishlist Items",
      count: wishlistItems.length.toString(),
      icon: Heart,
      color: "text-rose-600",
      bg: "bg-rose-50 border border-rose-100",
    },
  ];

  const recentOrders = activeOrdersList.slice(0, 5);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200";
      case "Processing":
        return "bg-blue-50 text-blue-700 border border-blue-200";
      case "Pending":
      case "Confirmed":
        return "bg-amber-50 text-amber-700 border border-amber-200";
      case "Cancelled":
        return "bg-rose-50 text-rose-700 border border-rose-200";
      default:
        return "bg-slate-50 text-slate-700 border border-slate-200";
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 md:p-8 rounded-3xl text-white shadow-sm border border-slate-800">
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-400">
          User Dashboard Overview
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1">
          Welcome back, {userName}! 👋
        </h1>
        <p className="text-slate-300 mt-1 text-xs md:text-sm">
          Here is your live shipment progress and purchase history on Finora.
        </p>
      </div>

      {/* Stats KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="bg-white p-5 rounded-3xl shadow-xs border border-gray-100 flex flex-col justify-center"
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-3 ${stat.bg}`}>
                <Icon className={stat.color} size={18} strokeWidth={2.5} />
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900">
                {stat.count}
              </h2>

              <p className="text-slate-400 text-xs font-semibold mt-0.5">
                {stat.title}
              </p>
            </div>
          );
        })}
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xs border border-gray-100 space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">
              Recent Orders
            </h2>
            <p className="text-xs text-gray-500">Live order activity from database</p>
          </div>

          <Link
            href="/Dashboard/user/Orders"
            className="text-xs font-extrabold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <div className="space-y-3">
          {recentOrders.length === 0 ? (
            <div className="text-center py-10 text-gray-400 text-sm">
              No orders placed yet. Start shopping!
            </div>
          ) : (
            recentOrders.map((order, index) => (
              <div
                key={order.id || index}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-2xl transition gap-3"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 overflow-hidden rounded-xl border border-slate-200 shrink-0 bg-white">
                    <Image
                      src={
                        order.products?.[0]?.image ||
                        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80"
                      }
                      alt="Product"
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>

                  <div>
                    <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm font-mono">
                      {order.id}
                    </h3>
                    <p className="text-slate-500 text-xs mt-0.5">
                      {order.products?.[0]?.name || "Item"} • ৳{Number(order.total || 0).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-extrabold ${getStatusBadge(
                      order.status
                    )}`}
                  >
                    {order.status || "Processing"}
                  </span>

                  <Link href={`/Pages/OrderTracking?orderId=${encodeURIComponent(order.id.replace("#", ""))}`}>
                    <button className="text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl transition cursor-pointer">
                      Track
                    </button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}