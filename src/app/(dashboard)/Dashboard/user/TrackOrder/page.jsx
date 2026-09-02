"use client";

import React, { useState, useEffect } from "react";
import { Package, Search, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { useSelector } from "react-redux";

const TrackOrder = () => {
  const [searchInput, setSearchInput] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  const authUser = useSelector((state) => state.auth?.user);

  useEffect(() => {
    if (authUser?.id || authUser?.phone || authUser?.email) {
      const params = new URLSearchParams();
      if (authUser.id) params.set("userId", authUser.id);
      if (authUser.phone) params.set("phone", authUser.phone);
      if (authUser.email) params.set("email", authUser.email);
      params.set("limit", "1");

      fetch(`/api/orders?${params.toString()}`)
        .then((res) => {
          if (!res.ok || !res.headers.get("content-type")?.includes("application/json")) {
            return null;
          }
          return res.json();
        })
        .then((data) => {
          if (data && data.success && data.orders && data.orders.length > 0) {
            setOrder(data.orders[0]);
          } else {
            setOrder(null);
          }
        })
        .catch((err) => console.error("Track order initial fetch error:", err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [authUser?.id, authUser?.phone, authUser?.email]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    setIsSearching(true);
    try {
      const clean = searchInput.trim().replace(/^#/, "");
      const res = await fetch(`/api/orders/${encodeURIComponent(clean)}`);
      if (res.ok && res.headers.get("content-type")?.includes("application/json")) {
        const data = await res.json();
        if (data.success && data.order) {
          setOrder(data.order);
          return;
        }
      }

      const searchRes = await fetch(`/api/orders?search=${encodeURIComponent(clean)}`);
      if (searchRes.ok && searchRes.headers.get("content-type")?.includes("application/json")) {
        const searchData = await searchRes.json();
        if (searchData.success && searchData.orders && searchData.orders.length > 0) {
          setOrder(searchData.orders[0]);
          return;
        }
      }

      setOrder(null);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#F8FAFC] py-4 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Track Your Order
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              Real-time updates synced with Finora database
            </p>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
            <input
              type="text"
              placeholder="Enter order ID..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="px-4 py-3 text-xs sm:text-sm text-slate-700 outline-none w-48 sm:w-60"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="bg-[#10B981] hover:bg-[#059669] text-white px-5 flex items-center gap-1.5 transition text-xs font-bold cursor-pointer"
            >
              {isSearching ? <Loader2 size={15} className="animate-spin" /> : <Search size={15} />}
              Track
            </button>
          </form>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            Loading live order information...
          </div>
        ) : order ? (
          <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-gray-100 pb-5">
              <div>
                <span className="text-xs text-gray-500 font-medium">Tracking Number</span>
                <h2 className="text-xl font-extrabold text-gray-900 font-mono">{order.id}</h2>
              </div>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                {order.status || "Processing"}
              </span>
            </div>

            {/* Quick Status Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <span className="text-gray-500 font-medium">Delivery Speed</span>
                <p className="text-sm font-bold text-gray-900 mt-1">{order.deliveryMethod || "Express (1-2 days)"}</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <span className="text-gray-500 font-medium">Recipient Name</span>
                <p className="text-sm font-bold text-gray-900 mt-1">{order.customer?.name || order.customerName}</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <span className="text-gray-500 font-medium">Payment Method</span>
                <p className="text-sm font-bold text-emerald-600 mt-1 uppercase">{order.paymentMethod || "COD"}</p>
              </div>
            </div>

            {/* Product items in this order */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Products in this shipment</h3>
              {order.products?.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white shrink-0 border border-gray-200">
                    <Image
                      src={item.image || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80"}
                      alt={item.name || "Product"}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="grow min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-1">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.qty} • ৳{Number(item.price || 0).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-gray-100 flex justify-end">
              <Link href={`/Pages/OrderTracking?orderId=${encodeURIComponent(order.id.replace("#", ""))}`}>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer shadow-sm">
                  <span>Full Live Timeline & Receipt</span>
                  <ArrowRight size={15} />
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex justify-center mt-12">
            <div className="w-full max-w-xl bg-white rounded-3xl shadow-sm border border-slate-200 px-8 py-14 text-center">
              <div className="w-20 h-20 rounded-full bg-[#ECFDF5] flex items-center justify-center mx-auto">
                <Package size={40} strokeWidth={2} className="text-[#10B981]" />
              </div>
              <h2 className="mt-6 text-2xl font-bold text-slate-900">
                No active order found
              </h2>
              <p className="mt-3 text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                We couldn&apos;t find an order matching that ID in our database.
              </p>
              <Link href="/Pages/AllProduct">
                <button className="mt-8 bg-[#10B981] hover:bg-[#059669] text-white px-8 h-12 rounded-xl font-bold text-sm transition cursor-pointer">
                  Browse Products
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrackOrder;