"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { loadStoredOrders } from "@/app/store/cartSlice";
import {
  Download,
  Truck,
  MapPin,
  Phone,
  CircleDollarSign,
  Package,
  CheckCircle2,
  Clock3,
  Search,
  ArrowRight,
  AlertCircle,
  XCircle,
  Printer,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

function OrderTrackingContent() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get("orderId") || "";

  const [mounted, setMounted] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [activeOrderId, setActiveOrderId] = useState("");

  const reduxOrders = useSelector((state) => state.cart.orders) || [];

  useEffect(() => {
    setMounted(true);
    dispatch(loadStoredOrders());
    if (initialOrderId) {
      setSearchInput(initialOrderId);
      setActiveOrderId(initialOrderId);
    }
  }, [initialOrderId, dispatch]);

  // Find target order or default to the latest order in the system
  const activeOrder = useMemo(() => {
    if (activeOrderId) {
      const clean = activeOrderId.trim().replace(/^#/, "").toLowerCase();
      return (
        reduxOrders.find(
          (o) => o.id?.replace(/^#/, "").toLowerCase() === clean
        ) || null
      );
    }
    return reduxOrders.length > 0 ? reduxOrders[0] : null;
  }, [reduxOrders, activeOrderId]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) {
      toast.info("Please enter an Order ID (e.g. ORD-998241 or 998241)");
      return;
    }
    const clean = searchInput.trim().replace(/^#/, "").toLowerCase();
    const found = reduxOrders.find(
      (o) => o.id?.replace(/^#/, "").toLowerCase() === clean
    );

    if (found) {
      setActiveOrderId(found.id);
      toast.success(`Found order ${found.id}! Live status loaded.`);
    } else {
      setActiveOrderId(searchInput.trim());
      toast.warning(`Order "${searchInput}" not found. Showing sample live preview.`);
    }
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  // Fallback demo order if user hasn't made any purchases yet
  const displayOrder = activeOrder || {
    id: "#ORD-998241",
    date: "May 28, 2026",
    status: "Processing",
    total: 3450,
    subtotal: 3330,
    deliveryFee: 120,
    paymentMethod: "BKASH",
    paymentDetails: { wallet: "01711223344", trxId: "8HJ290X" },
    customer: {
      name: "Tanvir Ahmed",
      phone: "01711223344",
      address: "House 24, Road 7, Banani, Dhaka, Bangladesh",
    },
    deliveryMethod: "Express (1-2 days)",
    products: [
      {
        id: 1,
        name: "Neptune Long-sleeve Shirt",
        qty: 1,
        price: 1450,
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80",
      },
      {
        id: 2,
        name: "Corduroy Slim-fit Pant",
        qty: 1,
        price: 2000,
        image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&q=80",
      },
    ],
  };

  const currentStatus = displayOrder.status || "Pending";

  // Calculate dynamic steps based on current status set by admin
  const getStepActive = (stepName) => {
    if (currentStatus === "Cancelled") return false;
    const orderLevels = {
      Pending: 1,
      Confirmed: 2,
      Processing: 3,
      Delivered: 4,
    };
    const currentLevel = orderLevels[currentStatus] || 1;
    const targetLevel = orderLevels[stepName] || 1;
    return currentLevel >= targetLevel;
  };

  const timeline = [
    {
      step: "Pending",
      title: "1. Order Received",
      desc: "Your order has been placed into the queue and is pending verification.",
      time: `${displayOrder.date || "Recent"} • Instant`,
      active: getStepActive("Pending"),
    },
    {
      step: "Confirmed",
      title: "2. Order Confirmed & Verified",
      desc: "Merchant verified payment and reserved items in the fulfillment center.",
      time: `${displayOrder.date || "Recent"} • Verified`,
      active: getStepActive("Confirmed"),
    },
    {
      step: "Processing",
      title: "3. Packaging & Courier Dispatch",
      desc: "Quality inspection passed and parcel handed to delivery partner.",
      time: "In Transit with Rider",
      active: getStepActive("Processing"),
    },
    {
      step: "Delivered",
      title: "4. Delivered & Completed",
      desc: "Parcel safely delivered to recipient's doorstep.",
      time: currentStatus === "Delivered" ? "Delivered to Customer" : "Expected in 1-2 days",
      active: getStepActive("Delivered"),
    },
  ];

  if (!mounted) {
    return (
      <div className="bg-slate-50 min-h-screen py-16 flex items-center justify-center">
        <div className="text-center text-slate-500 font-medium text-sm">
          Loading live tracking details...
        </div>
      </div>
    );
  }

  return (
    <section className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header with Search and Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-50 text-emerald-700 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-200">
                Live Status Tracker
              </span>
              <span className="text-xs text-gray-400 font-medium">Real-time Admin Sync</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2 tracking-tight">
              Order Tracking: <span className="text-emerald-600 font-mono">{displayOrder.id}</span>
            </h1>
            <p className="text-gray-500 mt-1 text-xs sm:text-sm">
              Live updates direct from Finora fulfillment network
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter Order ID (e.g. ORD-998241)..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="pl-10 pr-3 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-xs font-mono outline-none focus:bg-white focus:border-emerald-500 w-full sm:w-64"
                />
              </div>
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-2xl text-xs font-bold cursor-pointer transition shadow-xs"
              >
                Track
              </button>
            </form>

            <button
              onClick={handlePrintInvoice}
              className="border border-slate-200 rounded-2xl px-4 py-2.5 flex items-center justify-center gap-2 text-xs font-bold hover:bg-slate-50 bg-white cursor-pointer transition"
            >
              <Printer size={15} />
              Print Receipt
            </button>
          </div>
        </div>

        {/* Quick Order Selector (if multiple orders exist) */}
        {reduxOrders.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0">Switch Order:</span>
            {reduxOrders.slice(0, 6).map((ord) => (
              <button
                key={ord.id}
                onClick={() => {
                  setActiveOrderId(ord.id);
                  setSearchInput(ord.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition cursor-pointer shrink-0 border ${
                  displayOrder.id === ord.id
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                    : "bg-white text-gray-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {ord.id} ({ord.status})
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Status Banner & Dynamic Timeline */}
          <div className="lg:col-span-2 space-y-6">
            {/* Dynamic Status Banner */}
            {currentStatus === "Cancelled" ? (
              <div className="bg-rose-50 border border-rose-200 rounded-3xl p-6 text-rose-900 flex items-center gap-4 shadow-xs">
                <div className="w-14 h-14 rounded-2xl bg-rose-500 text-white flex items-center justify-center shrink-0">
                  <XCircle size={28} />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg">This order has been Cancelled</h3>
                  <p className="text-xs text-rose-700 mt-0.5">
                    The order was cancelled by the store administrator. Please reach out to customer support if you need assistance.
                  </p>
                </div>
              </div>
            ) : currentStatus === "Delivered" ? (
              <div className="bg-emerald-600 rounded-3xl p-6 text-white flex items-center gap-4 shadow-lg shadow-emerald-200">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={32} />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg">Delivered Successfully! 🎉</h3>
                  <p className="text-xs text-emerald-100 mt-0.5">
                    Package was delivered and signed by the recipient. Thank you for shopping with Finora!
                  </p>
                  <span className="text-[11px] mt-2 inline-block bg-white/20 font-bold px-3 py-0.5 rounded-full">
                    Status: Delivered
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-6 text-white flex items-center gap-4 shadow-lg shadow-emerald-200">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                  <Truck size={28} />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg">
                    {currentStatus === "Processing" ? "Your package is on its way!" : "Order is being prepared"}
                  </h3>
                  <p className="text-xs text-emerald-100 mt-0.5">
                    Estimated Delivery: 1-2 Business Days across Bangladesh
                  </p>
                  <span className="text-[11px] mt-2 inline-block bg-white/20 font-bold px-3 py-0.5 rounded-full">
                    Current Status: {currentStatus}
                  </span>
                </div>
              </div>
            )}

            {/* Dynamic Timeline */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
                <h2 className="font-extrabold text-lg text-gray-900">
                  Fulfillment Timeline
                </h2>
                <span className="text-xs text-gray-400 font-medium">Updated live by Admin</span>
              </div>

              <div className="space-y-6">
                {timeline.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${
                          item.active
                            ? "bg-emerald-600 text-white shadow-md shadow-emerald-100"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {item.active ? <CheckCircle2 size={18} /> : <Clock3 size={18} />}
                      </div>

                      {index !== timeline.length - 1 && (
                        <div
                          className={`w-0.5 h-14 mt-1 transition-all ${
                            item.active ? "bg-emerald-400" : "bg-slate-200"
                          }`}
                        />
                      )}
                    </div>

                    <div className="pt-0.5 pb-2 grow">
                      <div className="flex items-center justify-between flex-wrap gap-1">
                        <h3
                          className={`text-sm sm:text-base font-bold ${
                            item.active ? "text-gray-900" : "text-gray-400"
                          }`}
                        >
                          {item.title}
                        </h3>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            item.active
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-slate-50 text-slate-400"
                          }`}
                        >
                          {item.time}
                        </span>
                      </div>

                      <p className="text-gray-500 text-xs mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ordered Items List */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs">
              <h2 className="font-extrabold text-lg text-gray-900 mb-4">
                Ordered Products ({displayOrder.products?.length || 0})
              </h2>

              <div className="space-y-3">
                {displayOrder.products?.map((prod, idx) => (
                  <div
                    key={prod.id || idx}
                    className="border border-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-slate-200 transition bg-slate-50/30"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 bg-white shrink-0">
                        <Image
                          src={
                            prod.image ||
                            prod.images?.[0] ||
                            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80"
                          }
                          alt={prod.name || "Product"}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <h3 className="font-bold text-sm text-gray-900 line-clamp-1">
                          {prod.name}
                        </h3>
                        <p className="text-gray-500 text-xs mt-0.5">
                          Quantity: <span className="font-bold text-gray-700">{prod.qty}</span>
                        </p>
                        <p className="font-extrabold text-emerald-600 text-sm mt-1">
                          ৳{(Number(prod.price) * (prod.qty || 1)).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <Link href="/Pages/AllProduct">
                      <button className="border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-gray-700 hover:bg-white transition cursor-pointer">
                        Buy Again
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Customer Info & Payment Summary */}
          <div className="space-y-6">
            {/* Delivery Info */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
              <h2 className="font-extrabold text-base text-gray-900">
                Delivery Details
              </h2>

              <div className="flex gap-3">
                <MapPin className="text-emerald-600 shrink-0 mt-0.5" size={18} />
                <div className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  <p className="font-bold text-gray-900 mb-0.5">
                    Shipping Address
                  </p>
                  <p className="font-semibold text-gray-800">{displayOrder.customer?.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{displayOrder.customer?.address}</p>
                </div>
              </div>

              <hr className="border-slate-100 my-2" />

              <div className="flex gap-3">
                <Phone className="text-emerald-600 shrink-0 mt-0.5" size={18} />
                <div className="text-xs sm:text-sm">
                  <p className="font-bold text-gray-900 mb-0.5">
                    Contact Phone
                  </p>
                  <p className="text-gray-600 font-mono">{displayOrder.customer?.phone || "+880 1577147480"}</p>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-3 text-sm">
              <h2 className="font-extrabold text-base text-gray-900 mb-2">
                Payment Summary
              </h2>

              <div className="flex justify-between text-gray-600 text-xs">
                <span>Subtotal</span>
                <span className="font-bold text-gray-900">৳{displayOrder.subtotal?.toLocaleString() || displayOrder.total?.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-gray-600 text-xs">
                <span>Delivery Charge</span>
                <span className="font-bold text-gray-900">৳{displayOrder.deliveryFee || 60}</span>
              </div>

              <hr className="border-slate-100 my-2" />

              <div className="flex justify-between font-extrabold text-base text-gray-900">
                <span>Grand Total</span>
                <span className="text-emerald-600 text-lg">
                  ৳{displayOrder.total?.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-2 pt-2 text-xs text-gray-500 font-medium">
                <CircleDollarSign className="text-emerald-600" size={16} />
                <span>Payment Method: <strong className="uppercase text-gray-900">{displayOrder.paymentMethod}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function OrderTrackingPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-gray-500">Loading live order tracking...</div>}>
      <OrderTrackingContent />
    </Suspense>
  );
}