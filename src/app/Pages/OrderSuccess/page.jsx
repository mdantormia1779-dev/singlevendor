"use client";

import React, { useEffect, useRef } from "react";
import { CheckCircle2, Truck, Home, Package, CheckCheck, Printer, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import gsap from "gsap";

const OrderSuccess = () => {
  const containerRef = useRef(null);
  const iconRef = useRef(null);
  const detailsRef = useRef(null);

  const orders = useSelector((state) => state.cart.orders) || [];
  const latestOrder = orders.length > 0 ? orders[0] : null;

  const orderNumber = latestOrder?.id || "#ORD-861964";
  const orderTotal = latestOrder?.total || 0;
  const paymentMethod = latestOrder?.paymentMethod || "Cash on Delivery";
  const orderDate = latestOrder?.date || new Date().toLocaleDateString();
  const customer = latestOrder?.customer || null;
  const products = latestOrder?.products || [];

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        iconRef.current,
        { scale: 0, rotate: -45, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" }
      );

      gsap.fromTo(
        detailsRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, delay: 0.3, ease: "power3.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="min-h-screen bg-slate-50/80 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {/* Main Card */}
        <div
          ref={detailsRef}
          className="w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-10"
        >
          {/* Success Icon */}
          <div className="flex justify-center">
            <div
              ref={iconRef}
              className="w-24 h-24 rounded-3xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center shadow-lg shadow-emerald-100"
            >
              <CheckCircle2 size={54} className="text-emerald-600" strokeWidth={2.5} />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-center text-2xl sm:text-3xl font-extrabold text-gray-900 mt-6 tracking-tight">
            Order Confirmed & Placed! 🎉
          </h1>

          <p className="text-center text-gray-500 text-xs sm:text-sm mt-2 max-w-md mx-auto leading-relaxed">
            Thank you for shopping with Finora! Your order has been placed and is currently being processed by our fulfillment team.
          </p>

          {/* Order Metadata Box */}
          <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 mt-6 space-y-3.5 text-xs sm:text-sm border border-slate-200/70">
            <div className="flex justify-between items-center py-1">
              <span className="text-gray-500 font-medium">Order Reference:</span>
              <span className="font-bold text-gray-900 font-mono text-sm bg-white px-2.5 py-1 rounded-lg border border-gray-200">
                {orderNumber}
              </span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-gray-500 font-medium">Order Date:</span>
              <span className="font-semibold text-gray-900">{orderDate}</span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-gray-500 font-medium">Payment Method:</span>
              <span className="font-bold text-gray-900 uppercase bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-md text-xs">
                {paymentMethod}
              </span>
            </div>

            {customer && (
              <div className="pt-2 border-t border-gray-200/80">
                <span className="text-gray-500 font-medium block mb-1">Delivering to:</span>
                <p className="font-bold text-gray-900">{customer.name} ({customer.phone})</p>
                <p className="text-xs text-gray-600 mt-0.5">{customer.address}</p>
              </div>
            )}

            {orderTotal > 0 && (
              <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                <span className="text-gray-800 font-extrabold text-sm">Total Paid / Payable:</span>
                <span className="font-extrabold text-emerald-600 text-xl">
                  ৳{orderTotal.toLocaleString()}
                </span>
              </div>
            )}
          </div>

          {/* Ordered Products summary if available */}
          {products.length > 0 && (
            <div className="mt-6 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
                Items in this order ({products.length})
              </span>
              <div className="divide-y divide-gray-100 max-h-48 overflow-y-auto pr-1">
                {products.map((p, i) => (
                  <div key={i} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                        <Image src={p.image} alt={p.name} fill sizes="40px" className="object-cover" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900 truncate max-w-xs">{p.name}</p>
                        <p className="text-[11px] text-gray-500">Qty: {p.qty} × ৳{p.price?.toLocaleString()}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-gray-900">
                      ৳{((p.price || 0) * (p.qty || 1)).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action CTA Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
            <Link
              href={`/Pages/OrderTracking?orderId=${encodeURIComponent(orderNumber.replace("#", ""))}`}
              className="w-full"
            >
              <button className="w-full h-12 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-md shadow-emerald-200">
                <Truck size={18} />
                Track Live Order
              </button>
            </Link>

            <button
              onClick={() => window.print()}
              className="w-full h-12 rounded-2xl border border-gray-200 hover:bg-gray-50 text-gray-800 font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Printer size={18} />
              Print Receipt
            </button>
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/Pages/AllProduct"
              className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-emerald-600 font-bold transition-colors"
            >
              <Home size={14} /> Continue Shopping at Finora <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Live Delivery Stepper Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 w-full">
          <div className="bg-white rounded-2xl border border-emerald-200 p-4 text-center shadow-xs">
            <Package className="mx-auto text-emerald-600" size={24} />
            <h3 className="font-bold text-xs mt-2 text-gray-900">1. Order Placed</h3>
            <p className="text-gray-500 text-[11px] mt-0.5">Payment Verified</p>
          </div>

          <div className="bg-white rounded-2xl border border-amber-200 p-4 text-center shadow-xs">
            <Truck className="mx-auto text-amber-500" size={24} />
            <h3 className="font-bold text-xs mt-2 text-gray-900">2. Processing</h3>
            <p className="text-gray-500 text-[11px] mt-0.5">Quality check & Packing</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-4 text-center shadow-xs">
            <CheckCheck className="mx-auto text-gray-400" size={24} />
            <h3 className="font-bold text-xs mt-2 text-gray-600">3. Out for Delivery</h3>
            <p className="text-gray-400 text-[11px] mt-0.5">Estimated 1-3 days</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSuccess;
