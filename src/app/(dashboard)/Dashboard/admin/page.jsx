"use client";

import React, { useState, useMemo } from "react";
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
  ArrowDownRight,
} from "lucide-react";
import Image from "next/image";
import productsData from "@/app/data/data.json";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Revenue Timeline Data
const revenueData7d = [
  { name: "Mon", revenue: 14500, orders: 12 },
  { name: "Tue", revenue: 22000, orders: 18 },
  { name: "Wed", revenue: 18500, orders: 15 },
  { name: "Thu", revenue: 29000, orders: 24 },
  { name: "Fri", revenue: 34000, orders: 28 },
  { name: "Sat", revenue: 42500, orders: 36 },
  { name: "Sun", revenue: 38000, orders: 31 },
];

const revenueData30d = [
  { name: "Week 1", revenue: 95000, orders: 82 },
  { name: "Week 2", revenue: 124000, orders: 104 },
  { name: "Week 3", revenue: 148000, orders: 129 },
  { name: "Week 4", revenue: 172000, orders: 145 },
];

const revenueData12m = [
  { name: "Jan", revenue: 240000, orders: 210 },
  { name: "Feb", revenue: 310000, orders: 280 },
  { name: "Mar", revenue: 290000, orders: 260 },
  { name: "Apr", revenue: 420000, orders: 370 },
  { name: "May", revenue: 490000, orders: 430 },
  { name: "Jun", revenue: 530000, orders: 460 },
  { name: "Jul", revenue: 610000, orders: 520 },
  { name: "Aug", revenue: 580000, orders: 490 },
  { name: "Sep", revenue: 650000, orders: 570 },
  { name: "Oct", revenue: 710000, orders: 630 },
  { name: "Nov", revenue: 840000, orders: 740 },
  { name: "Dec", revenue: 980000, orders: 860 },
];

// Category Sales Distribution
const categorySalesData = [
  { name: "Fashion", value: 38, fill: "#10b981" },
  { name: "Electronics", value: 26, fill: "#3b82f6" },
  { name: "Footwear", value: 18, fill: "#f59e0b" },
  { name: "Home & Living", value: 12, fill: "#8b5cf6" },
  { name: "Gadgets", value: 6, fill: "#ec4899" },
];

// Daily conversion data
const conversionData = [
  { day: "Mon", visitors: 1200, sales: 48 },
  { day: "Tue", visitors: 1450, sales: 62 },
  { day: "Wed", visitors: 1300, sales: 55 },
  { day: "Thu", visitors: 1800, sales: 84 },
  { day: "Fri", visitors: 2200, sales: 110 },
  { day: "Sat", visitors: 2800, sales: 142 },
  { day: "Sun", visitors: 2400, sales: 125 },
];

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899"];

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("7d");
  const reduxOrders = useSelector((state) => state.cart.orders) || [];

  const defaultRecentOrders = [
    {
      id: "#ORD-998241",
      customer: "Tanvir Ahmed",
      date: "May 28, 2026",
      total: 3450,
      status: "Delivered",
      paymentMethod: "BKASH",
    },
    {
      id: "#ORD-887123",
      customer: "Sadia Rahman",
      date: "May 27, 2026",
      total: 1890,
      status: "Processing",
      paymentMethod: "NAGAD",
    },
    {
      id: "#ORD-776109",
      customer: "Arif Khan",
      date: "May 26, 2026",
      total: 5200,
      status: "Pending",
      paymentMethod: "COD",
    },
  ];

  const recentOrders = useMemo(() => {
    const list = reduxOrders.map((ord) => ({
      id: ord.id,
      customer: ord.customer?.name || "Customer",
      date: ord.date,
      total: ord.total,
      status: ord.status,
      paymentMethod: ord.paymentMethod,
    }));
    return [...list, ...defaultRecentOrders].slice(0, 5);
  }, [reduxOrders]);

  const activeChartData = useMemo(() => {
    if (timeRange === "30d") return revenueData30d;
    if (timeRange === "12m") return revenueData12m;
    return revenueData7d;
  }, [timeRange]);

  // Dynamic order status count from real redux store
  const orderStatusSummary = useMemo(() => {
    const counts = { Delivered: 0, Processing: 0, Pending: 0, Cancelled: 0 };
    reduxOrders.forEach((o) => {
      if (counts[o.status] !== undefined) counts[o.status]++;
      else counts.Pending++;
    });
    return [
      { name: "Delivered", value: counts.Delivered || 1, fill: "#10b981" },
      { name: "Processing", value: counts.Processing || 1, fill: "#3b82f6" },
      { name: "Pending", value: counts.Pending || 1, fill: "#f59e0b" },
      { name: "Cancelled", value: counts.Cancelled || 0, fill: "#f43f5e" },
    ].filter((item) => item.value > 0);
  }, [reduxOrders]);

  const authUser = useSelector((state) => state.auth?.user);
  const adminName = authUser?.name || "Kristin Watson";
  const topProducts = productsData.slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
              Production Admin Hub
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-300 font-medium">
              <Activity size={13} className="text-emerald-400 animate-pulse" /> Live Store Activity
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
            Welcome back, {adminName} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Finora storefront revenue increased by <strong className="text-emerald-400">+18.4%</strong> this week.
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
        <div className="lg:col-span-2 bg-white p-6 sm:p-7 rounded-3xl shadow-xs border border-slate-100 space-y-6">
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
                Gross sales volume in BDT across selected periods
              </p>
            </div>

            {/* Time Filter Pills */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl">
              {[
                { label: "7 Days", val: "7d" },
                { label: "30 Days", val: "30d" },
                { label: "12 Months", val: "12m" },
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
                  tickFormatter={(v) => `৳${(v / 1000).toFixed(0)}k`}
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
                  formatter={(val) => [`৳${val.toLocaleString()}`, "Revenue"]}
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
        <div className="bg-white p-6 sm:p-7 rounded-3xl shadow-xs border border-slate-100 space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
              <PieIcon size={18} />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                Sales by Category
              </h2>
              <p className="text-xs text-slate-400">Distribution %</p>
            </div>
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categorySalesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categorySalesData.map((entry, index) => (
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
            {categorySalesData.map((c, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.fill }} />
                <span className="text-slate-600 truncate">{c.name}</span>
                <span className="font-bold text-slate-900 ml-auto">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid: Conversion Weekly Traffic & Live Orders Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left 2 Cols: Recent Customer Orders Table */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-7 rounded-3xl shadow-xs border border-slate-100 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-gray-900">Live Customer Orders Feed</h2>
              <p className="text-xs text-gray-500">Real-time order statuses synced across storefront</p>
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
                {recentOrders.map((ord, i) => (
                  <tr key={i} className="hover:bg-slate-50/60 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-gray-900">{ord.id}</td>
                    <td className="py-3.5 px-4 font-semibold text-gray-800">{ord.customer}</td>
                    <td className="py-3.5 px-4 font-extrabold text-emerald-700">৳{ord.total?.toLocaleString()}</td>
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
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Top Products & Quick Links */}
        <div className="space-y-6">
          {/* Top Products */}
          <div className="bg-white p-6 rounded-3xl shadow-xs border border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-gray-900">Featured Products</h2>
              <Link
                href="/Dashboard/admin/product/all-products"
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
              >
                All Products
              </Link>
            </div>

            <div className="space-y-3">
              {topProducts.map((p) => (
                <div key={p.id} className="flex items-center gap-3 p-2 rounded-2xl hover:bg-slate-50 transition">
                  <div className="relative w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                    <Image src={p.images?.[0]} alt={p.title} fill sizes="48px" className="object-cover" />
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
          <div className="bg-white p-6 rounded-3xl shadow-xs border border-slate-100 space-y-3">
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