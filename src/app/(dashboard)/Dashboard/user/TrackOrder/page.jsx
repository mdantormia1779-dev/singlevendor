"use client";

import React, { useState } from "react";
import { Package, Search, Truck, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";

const TrackOrder = () => {
  const orders = useSelector((state) => state.cart.orders) || [];
  const [searchInput, setSearchInput] = useState("");
  const [queriedId, setQueriedId] = useState("");

  const searchedOrder = queriedId
    ? orders.find(
        (o) =>
          o.id?.replace(/^#/, "").toLowerCase() ===
          queriedId.trim().replace(/^#/, "").toLowerCase()
      )
    : orders[0] || null;

  const handleSearch = (e) => {
    e.preventDefault();
    setQueriedId(searchInput.trim());
  };

  return (
    <section className="min-h-screen bg-[#F8FAFC] py-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Track Your Order
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Real-time updates on your shipment progress
            </p>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
            <input
              type="text"
              placeholder="Enter order ID..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="px-4 py-3 text-sm text-slate-700 outline-none w-48 sm:w-60"
            />
            <button type="submit" className="bg-[#10B981] hover:bg-[#059669] text-white px-5 flex items-center gap-1.5 transition text-xs font-bold cursor-pointer">
              <Search size={16} />
              Track
            </button>
          </form>
        </div>

        {searchedOrder ? (
          <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-gray-100 pb-5">
              <div>
                <span className="text-xs text-gray-500 font-medium">Tracking Number</span>
                <h2 className="text-xl font-extrabold text-gray-900 font-mono">{searchedOrder.id}</h2>
              </div>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                {searchedOrder.status || "In Transit"}
              </span>
            </div>

            {/* Quick Status Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <span className="text-xs text-gray-500">Estimated Delivery</span>
                <p className="text-sm font-bold text-gray-900 mt-1">Today (2:00 - 6:00 PM)</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <span className="text-xs text-gray-500">Courier Service</span>
                <p className="text-sm font-bold text-gray-900 mt-1">Steadfast Express</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <span className="text-xs text-gray-500">Payment Status</span>
                <p className="text-sm font-bold text-emerald-600 mt-1">{searchedOrder.paymentMethod || "COD"}</p>
              </div>
            </div>

            {/* Product items in this order */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-gray-800">Products in this shipment</h3>
              {searchedOrder.products?.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white shrink-0 border border-gray-200">
                    <Image
                      src={item.image || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80"}
                      alt={item.name || "Product"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="grow min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-1">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.qty} • ৳{Number(item.price).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-gray-100 flex justify-end">
              <Link href={`/Pages/OrderTracking?orderId=${encodeURIComponent(searchedOrder.id.replace("#", ""))}`}>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer shadow-sm">
                  <span>Full Live Map & Timeline</span>
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
                We couldn't find an order matching that ID. Check your ID from My Orders or place a new order.
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