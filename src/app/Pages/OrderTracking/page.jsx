"use client";

import React, { useState, useMemo, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { loadStoredOrders, updateOrderStatus } from "@/app/store/cartSlice";
import {
  Truck,
  MapPin,
  Phone,
  CircleDollarSign,
  CheckCircle2,
  Clock3,
  Search,
  XCircle,
  Printer,
  Loader2,
  AlertTriangle,
  X,
  Package,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import gsap from "gsap";

const CANCEL_REASONS = [
  "Ordered by mistake / wrong items",
  "Need to change delivery address or phone",
  "Found a cheaper alternative",
  "Delivery time is too long",
  "Payment or billing issue",
  "Other reason",
];

function OrderTrackingContent() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get("orderId") || "";

  const [searchInput, setSearchInput] = useState(initialOrderId);
  const [activeOrderId, setActiveOrderId] = useState(initialOrderId);
  const [apiOrder, setApiOrder] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(Boolean(initialOrderId));

  // Cancellation modal state
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState(CANCEL_REASONS[0]);
  const [customReason, setCustomReason] = useState("");
  const [isCancelling, setIsCancelling] = useState(false);

  const trackingCardRef = useRef(null);
  const rawOrders = useSelector((state) => state.cart.orders);
  const reduxOrders = useMemo(() => rawOrders || [], [rawOrders]);

  const fetchLiveOrder = async (idToFind, isUserAction = false) => {
    if (!idToFind) return;
    if (isUserAction) setIsSearching(true);
    else setIsLoading(true);
    try {
      const clean = idToFind.trim().replace(/^#/, "");
      const res = await fetch(`/api/orders/${encodeURIComponent(clean)}`);
      if (res.ok && res.headers.get("content-type")?.includes("application/json")) {
        const data = await res.json();
        if (data.success && data.order) {
          setApiOrder(data.order);
          setActiveOrderId(data.order.id);
          if (isUserAction) toast.success(`Loaded live tracking for order ${data.order.id}! 🚚`);
          return;
        }
      }

      // Try searching by query
      const searchRes = await fetch(`/api/orders?search=${encodeURIComponent(clean)}`);
      if (searchRes.ok && searchRes.headers.get("content-type")?.includes("application/json")) {
        const searchData = await searchRes.json();
        if (searchData.success && searchData.orders && searchData.orders.length > 0) {
          setApiOrder(searchData.orders[0]);
          setActiveOrderId(searchData.orders[0].id);
          if (isUserAction) toast.success(`Found order ${searchData.orders[0].id}! 🚚`);
          return;
        }
      }

      setApiOrder(null);
      if (isUserAction) toast.warning(`Order "${idToFind}" not found in database.`);
    } catch (err) {
      console.error("Order tracking fetch error:", err);
    } finally {
      if (isUserAction) setIsSearching(false);
      else setIsLoading(false);
    }
  };

  useEffect(() => {
    dispatch(loadStoredOrders());
    if (initialOrderId) {
      setIsLoading(true);
      const clean = initialOrderId.trim().replace(/^#/, "");
      fetch(`/api/orders/${encodeURIComponent(clean)}`)
        .then(async (res) => {
          if (!res.ok) return null;
          const contentType = res.headers.get("content-type") || "";
          if (!contentType.includes("application/json")) return null;
          return res.json();
        })
        .then((data) => {
          if (data && data.success && data.order) {
            setApiOrder(data.order);
            setActiveOrderId(data.order.id);
          } else {
            setApiOrder(null);
          }
        })
        .catch((err) => console.error("Initial order tracking fetch error:", err))
        .finally(() => setIsLoading(false));
    }
  }, [initialOrderId, dispatch]);

  // Find target order or default to apiOrder or reduxOrders[0]
  const displayOrder = useMemo(() => {
    if (apiOrder) return apiOrder;

    if (activeOrderId) {
      const clean = activeOrderId.trim().replace(/^#/, "").toLowerCase();
      const foundInRedux = reduxOrders.find(
        (o) => (o?.id || "").replace(/^#/, "").toLowerCase() === clean
      );
      if (foundInRedux) return foundInRedux;
    }

    if (!initialOrderId && reduxOrders.length > 0) return reduxOrders[0];

    return null;
  }, [apiOrder, activeOrderId, reduxOrders, initialOrderId]);

  // GSAP animation when order changes
  useEffect(() => {
    if (displayOrder && trackingCardRef.current) {
      gsap.fromTo(
        trackingCardRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [displayOrder]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) {
      toast.info("Please enter an Order ID or Phone number.");
      return;
    }
    fetchLiveOrder(searchInput.trim(), true);
  };

  const handleCancelOrder = async () => {
    if (!displayOrder?.id) return;
    setIsCancelling(true);

    const orderId = displayOrder.id;
    const finalReason = selectedReason === "Other reason" && customReason.trim() ? customReason.trim() : selectedReason;

    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(orderId)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "Cancelled",
          cancelReason: finalReason,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setApiOrder((prev) => (prev ? { ...prev, status: "Cancelled" } : null));
        dispatch(updateOrderStatus({ orderId, status: "Cancelled" }));
        toast.success(`Order ${orderId} has been cancelled.`);
        setIsCancelModalOpen(false);
      } else {
        toast.error("Failed to cancel order in database.");
      }
    } catch (err) {
      console.error("Cancel order error:", err);
      toast.error("Network error cancelling order.");
    } finally {
      setIsCancelling(false);
    }
  };

  const currentStatus = displayOrder?.status || "Pending";
  const isCancellable = currentStatus === "Pending" || currentStatus === "Confirmed";

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

  const timeline = useMemo(() => {
    if (!displayOrder) return [];
    return [
      {
        step: "Pending",
        title: "1. Order Received",
        desc: "Your order is queued in the database and pending fulfillment.",
        time: `${displayOrder?.date || "Recent"} • Instant`,
        active: getStepActive("Pending"),
      },
      {
        step: "Confirmed",
        title: "2. Order Confirmed & Verified",
        desc: "Payment verified and inventory allocated in warehouse.",
        time: `${displayOrder?.date || "Recent"} • Verified`,
        active: getStepActive("Confirmed"),
      },
      {
        step: "Processing",
        title: "3. Packaging & Courier Dispatch",
        desc: "Quality inspection passed and parcel handed to delivery rider.",
        time: "In Transit with Courier",
        active: getStepActive("Processing"),
      },
      {
        step: "Delivered",
        title: "4. Delivered & Completed",
        desc: "Parcel safely delivered to recipient's doorstep.",
        time: currentStatus === "Delivered" ? "Delivered to Customer" : "Estimated in 1-2 days",
        active: getStepActive("Delivered"),
      },
    ];
  }, [displayOrder, currentStatus]);

  return (
    <section className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header with Search and Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-50 text-emerald-700 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-200">
                Live PostgreSQL Tracker
              </span>
              <span className="text-xs text-gray-400 font-medium">Synced with Admin Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2 tracking-tight">
              Order Tracking: <span className="text-emerald-600 font-mono">{displayOrder?.id || "Lookup"}</span>
            </h1>
            <p className="text-gray-500 mt-1 text-xs sm:text-sm">
              Real-time fulfillment updates direct from Finora database
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter Order ID or Phone..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="pl-10 pr-3 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 text-xs font-mono outline-none focus:bg-white focus:border-emerald-500 w-full sm:w-64"
                />
              </div>
              <button
                type="submit"
                disabled={isSearching}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-2xl text-xs font-bold cursor-pointer transition shadow-xs flex items-center gap-1.5"
              >
                {isSearching && <Loader2 size={14} className="animate-spin" />}
                <span>Track</span>
              </button>
            </form>

            <button
              onClick={() => window.print()}
              className="border border-slate-200 rounded-2xl px-4 py-2.5 flex items-center justify-center gap-2 text-xs font-bold hover:bg-slate-50 bg-white cursor-pointer transition"
            >
              <Printer size={15} />
              Print
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 sm:p-16 text-center max-w-xl mx-auto space-y-4 my-8 shadow-xs">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <Loader2 size={28} className="animate-spin" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Fetching Live Order Tracking...</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              Retrieving latest fulfillment and courier status from Finora database.
            </p>
          </div>
        ) : !displayOrder ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-10 sm:p-16 text-center max-w-xl mx-auto space-y-4 my-8 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <Package size={32} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">No Order Found or Selected</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              Enter your real Order ID or Phone number in the search bar above to track your order in real-time, or check your past orders.
            </p>
            <div className="pt-3 flex justify-center gap-3">
              <Link href="/Pages/AllProduct">
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition cursor-pointer">
                  Browse Products
                </button>
              </Link>
              <Link href="/Dashboard/user/Orders">
                <button className="border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold px-6 py-2.5 rounded-xl text-xs transition cursor-pointer">
                  My Orders
                </button>
              </Link>
            </div>
          </div>
        ) : (
        <div ref={trackingCardRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
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
                    The order was cancelled. Please reach out to customer support if you need further assistance.
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
                    Package was delivered and verified. Thank you for shopping with Finora!
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
                Ordered Products ({displayOrder?.products?.length || 0})
              </h2>

              <div className="space-y-3">
                {displayOrder?.products?.map((prod, idx) => (
                  <div
                    key={prod.id || idx}
                    className="border border-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-slate-200 transition bg-slate-50/30"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 bg-white shrink-0">
                        <Image
                          src={
                            prod.image ||
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
                  <p className="font-semibold text-gray-800">
                    {displayOrder?.customer?.name || displayOrder?.customerName}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {displayOrder?.customer?.address || displayOrder?.customerAddress || "Dhaka, Bangladesh"}
                  </p>
                </div>
              </div>

              <hr className="border-slate-100 my-2" />

              <div className="flex gap-3">
                <Phone className="text-emerald-600 shrink-0 mt-0.5" size={18} />
                <div className="text-xs sm:text-sm">
                  <p className="font-bold text-gray-900 mb-0.5">
                    Contact Phone
                  </p>
                  <p className="text-gray-600 font-mono">
                    {displayOrder?.customer?.phone || displayOrder?.customerPhone || "+880 1577147480"}
                  </p>
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
                <span className="font-bold text-gray-900">
                  ৳{Number(displayOrder?.subtotal || displayOrder?.total || 0).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-gray-600 text-xs">
                <span>Delivery Charge</span>
                <span className="font-bold text-gray-900">৳{displayOrder?.deliveryFee || 60}</span>
              </div>

              <hr className="border-slate-100 my-2" />

              <div className="flex justify-between font-extrabold text-base text-gray-900">
                <span>Grand Total</span>
                <span className="text-emerald-600 text-lg">
                  ৳{Number(displayOrder?.total || 0).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-2 pt-2 text-xs text-gray-500 font-medium">
                <CircleDollarSign className="text-emerald-600" size={16} />
                <span>
                  Payment Method: <strong className="uppercase text-gray-900">{displayOrder?.paymentMethod || "COD"}</strong>
                </span>
              </div>

              {/* Cancel Order Action (if eligible) */}
              {isCancellable && (
                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setIsCancelModalOpen(true);
                      setSelectedReason(CANCEL_REASONS[0]);
                      setCustomReason("");
                    }}
                    className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <XCircle size={15} />
                    <span>Cancel This Order</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        )}
      </div>

      {/* Cancel Order Modal */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl relative">
            <button
              onClick={() => setIsCancelModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-black p-1 rounded-full hover:bg-gray-100 cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-gray-900">Cancel Order {displayOrder?.id}?</h3>
                <p className="text-xs text-gray-500">Please choose why you want to cancel this order</p>
              </div>
            </div>

            <div className="space-y-4 my-6">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-2">Select Reason</label>
                <div className="space-y-2">
                  {CANCEL_REASONS.map((r, idx) => (
                    <label
                      key={idx}
                      className={`flex items-center gap-3 p-3 rounded-2xl border text-xs font-semibold cursor-pointer transition ${
                        selectedReason === r
                          ? "border-rose-500 bg-rose-50/40 text-rose-900"
                          : "border-gray-200 hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <input
                        type="radio"
                        name="cancelReasonTrack"
                        checked={selectedReason === r}
                        onChange={() => setSelectedReason(r)}
                        className="accent-rose-600"
                      />
                      <span>{r}</span>
                    </label>
                  ))}
                </div>
              </div>

              {selectedReason === "Other reason" && (
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Additional details</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us why you want to cancel..."
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-3 text-xs focus:outline-none focus:border-rose-500 resize-none"
                  />
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsCancelModalOpen(false)}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-xs transition cursor-pointer"
              >
                Keep Order
              </button>
              <button
                type="button"
                disabled={isCancelling}
                onClick={handleCancelOrder}
                className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2"
              >
                {isCancelling && <Loader2 size={15} className="animate-spin" />}
                <span>{isCancelling ? "Cancelling..." : "Confirm Cancellation"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
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