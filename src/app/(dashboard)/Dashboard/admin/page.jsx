"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import StateCard from "./Components/StateCard/StateCard";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  ShoppingBag,
  Package,
  Users,
  TrendingUp,
  Plus,
  ArrowUpRight,
  Eye,
  Store,
  Settings,
  DollarSign,
  BarChart3,
  PieChart as PieIcon,
  Activity,
} from "lucide-react";
import Image from "next/image";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import gsap from "gsap";

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899", "#14b8a6"];

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("7d");
  const [analytics, setAnalytics] = useState(null);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const dashboardRef = useRef(null);
  const authUser = useSelector((state) => state.auth?.user);
  const adminName = authUser?.name || "Admin";

  // Fetch real data from APIs
  useEffect(() => {
    Promise.all([
      fetch("/api/analytics").then((r) => r.json()),
      fetch("/api/orders?limit=6").then((r) => r.json()),
      fetch("/api/products?limit=4").then((r) => r.json()),
    ])
      .then(([analyticsRes, ordersRes, productsRes]) => {
        if (analyticsRes.success) setAnalytics(analyticsRes.data);
        if (ordersRes.success && ordersRes.orders) setOrders(ordersRes.orders);
        if (productsRes.success && productsRes.products) setProducts(productsRes.products);
      })
      .catch((err) => console.error("Admin dashboard fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  // GSAP animation
  useEffect(() => {
    if (!loading && dashboardRef.current) {
      gsap.fromTo(
        dashboardRef.current.querySelectorAll(".dash-card"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }
      );
    }
  }, [loading]);

  const activeChartData = useMemo(() => {
    if (analytics?.revenueTimeline7d && analytics.revenueTimeline7d.length > 0) {
      return analytics.revenueTimeline7d;
    }
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days.map((day) => ({ name: day, revenue: 0, orders: 0 }));
  }, [analytics]);

  const categoryShareData = useMemo(() => {
    if (analytics?.categoryShare && analytics.categoryShare.length > 0) {
      return analytics.categoryShare;
    }
    return [];
  }, [analytics]);

  return (
    <div ref={dashboardRef} className="space-y-8 font-sans">
      {/* Top Banner & Quick Actions */}
      <div className="dash-card flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
              Production Admin Hub
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-300 font-medium">
              <Activity size={13} className="text-emerald-400 animate-pulse" /> Live Neon DB Sync
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
            Welcome back, {adminName} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Storefront revenue, product catalog, and customer orders synced live with PostgreSQL.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link href="/Dashboard/admin/product/add-product">
            <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-4 py-2.5 rounded-2xl text-xs sm:text-sm transition shadow-md shadow-emerald-900/30 cursor-pointer">
              <Plus size={16} /> Add Product
            </button>
          </Link>
          <Link href="/Dashboard/admin/orders">
            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2.5 rounded-2xl text-xs sm:text-sm transition backdrop-blur-xs cursor-pointer border border-white/10">
              <ShoppingBag size={16} /> Manage Orders
            </button>
          </Link>
        </div>
      </div>

      {/* Metric KPI Cards */}
      <StateCard />

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Revenue Trend Chart (2 Cols) */}
        <div className="dash-card lg:col-span-2 bg-white p-6 sm:p-7 rounded-3xl shadow-xs border border-slate-100 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                  <BarChart3 size={18} />
                </div>
                <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
                  Revenue & Sales Analytics
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Gross sales volume in BDT synced from PostgreSQL orders
              </p>
            </div>

            {/* Time Filter Pills */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl">
              {[
                { label: "7 Days", val: "7d" },
                { label: "30 Days", val: "30d" },
              ].map((pill) => (
                <button
                  key={pill.val}
                  onClick={() => setTimeRange(pill.val)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    timeRange === pill.val
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Area Chart */}
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `৳${v}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "none",
                    borderRadius: "16px",
                    color: "#fff",
                    fontSize: "12px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                  }}
                  formatter={(val) => [`৳${Number(val).toLocaleString()}`, "Revenue"]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Share Donut Chart (1 Col) */}
        <div className="dash-card bg-white p-6 sm:p-7 rounded-3xl shadow-xs border border-slate-100 space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
              <PieIcon size={18} />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                Products by Category
              </h2>
              <p className="text-xs text-slate-400">Database Inventory %</p>
            </div>
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryShareData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryShareData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "none",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "11px",
                  }}
                  formatter={(v) => [`${v}%`, "Share"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Category Legend */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            {categoryShareData.map((c, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                />
                <span className="text-slate-600 truncate">{c.name}</span>
                <span className="font-bold text-slate-900 ml-auto">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid: Live Customer Orders Feed & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left 2 Cols: Recent Customer Orders Table */}
        <div className="dash-card lg:col-span-2 bg-white p-6 sm:p-7 rounded-3xl shadow-xs border border-slate-100 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-gray-900">Live Customer Orders Feed</h2>
              <p className="text-xs text-gray-500">Real-time orders from PostgreSQL database</p>
            </div>
            <Link
              href="/Dashboard/admin/orders"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              Manage All <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-600 uppercase font-bold border-b border-slate-100">
                  <th className="py-3.5 px-4">Order ID</th>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Amount</th>
                  <th className="py-3.5 px-4">Payment</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      No orders placed yet.
                    </td>
                  </tr>
                ) : (
                  orders.map((ord, i) => (
                    <tr key={i} className="hover:bg-slate-50/60 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-gray-900">{ord.id}</td>
                      <td className="py-3.5 px-4 font-semibold text-gray-800">{ord.customer?.name || ord.customerName}</td>
                      <td className="py-3.5 px-4 font-extrabold text-emerald-700">৳{Number(ord.total || 0).toLocaleString()}</td>
                      <td className="py-3.5 px-4">
                        <span className="bg-slate-100 px-2 py-0.5 rounded-lg font-mono uppercase font-bold text-[10px] text-slate-700">
                          {ord.paymentMethod || "COD"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                            ord.status === "Delivered"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : ord.status === "Processing"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-amber-50 text-amber-700 border-amber-200"
                          }`}
                        >
                          {ord.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href="/Dashboard/admin/orders"
                          className="inline-flex items-center gap-1 text-slate-500 hover:text-emerald-600 font-bold p-1.5 rounded-xl hover:bg-slate-100"
                        >
                          <Eye size={14} />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Top Products & Quick Links */}
        <div className="space-y-6">
          {/* Top Products */}
          <div className="dash-card bg-white p-6 rounded-3xl shadow-xs border border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-gray-900">Live Inventory Picks</h2>
              <Link
                href="/Dashboard/admin/product/all-products"
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
              >
                All Products
              </Link>
            </div>

            <div className="space-y-3">
              {products.map((p) => (
                <div key={p.id} className="flex items-center gap-3 p-2 rounded-2xl hover:bg-slate-50 transition">
                  <div className="relative w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                    <Image
                      src={p.images?.[0] || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80"}
                      alt={p.title}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="grow min-w-0">
                    <p className="text-xs font-bold text-gray-900 truncate">{p.title}</p>
                    <p className="text-[11px] text-emerald-600 font-bold">৳{Number(p.price).toLocaleString()}</p>
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-md">
                    {p.sold || "In stock"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Hub */}
          <div className="dash-card bg-white p-6 rounded-3xl shadow-xs border border-slate-100 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Admin Quick Hub</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/Dashboard/admin/customers"
                className="p-3 bg-slate-50 hover:bg-emerald-50/50 hover:border-emerald-200 border border-transparent rounded-2xl transition text-center"
              >
                <Users className="mx-auto text-emerald-600 mb-1" size={20} />
                <span className="text-xs font-bold text-gray-800 block">Customers</span>
              </Link>

              <Link
                href="/Dashboard/admin/settings"
                className="p-3 bg-slate-50 hover:bg-emerald-50/50 hover:border-emerald-200 border border-transparent rounded-2xl transition text-center"
              >
                <Settings className="mx-auto text-emerald-600 mb-1" size={20} />
                <span className="text-xs font-bold text-gray-800 block">Settings</span>
              </Link>

              <Link
                href="/Pages/AllProduct"
                className="p-3 bg-slate-50 hover:bg-emerald-50/50 hover:border-emerald-200 border border-transparent rounded-2xl transition text-center col-span-full"
              >
                <Store className="mx-auto text-emerald-600 mb-1" size={20} />
                <span className="text-xs font-bold text-gray-800 block">Open Live Storefront</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}