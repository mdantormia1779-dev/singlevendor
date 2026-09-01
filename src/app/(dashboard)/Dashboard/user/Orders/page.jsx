"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { loadStoredOrders, updateOrderStatus } from "@/app/store/cartSlice";
import { Truck, ArrowRight, ShoppingBag, XCircle, AlertTriangle, Loader2, X } from "lucide-react";
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

const MyOrders = () => {
  const dispatch = useDispatch();
  const rawOrders = useSelector((state) => state.cart.orders);
  const reduxOrders = useMemo(() => rawOrders || [], [rawOrders]);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelModalOrder, setCancelModalOrder] = useState(null);
  const [selectedReason, setSelectedReason] = useState(CANCEL_REASONS[0]);
  const [customReason, setCustomReason] = useState("");
  const [isCancelling, setIsCancelling] = useState(false);

  const ordersContainerRef = useRef(null);

  useEffect(() => {
    dispatch(loadStoredOrders());

    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.orders && data.orders.length > 0) {
          setOrders(data.orders);
        } else {
          setOrders(reduxOrders);
        }
      })
      .catch(() => setOrders(reduxOrders))
      .finally(() => setLoading(false));
  }, [dispatch, reduxOrders]);

  useEffect(() => {
    if (!loading && ordersContainerRef.current && ordersContainerRef.current.children.length > 0) {
      gsap.fromTo(
        ordersContainerRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: "power2.out" }
      );
    }
  }, [loading, orders]);

  const displayOrders = orders.length > 0 ? orders : reduxOrders;

  const handleCancelOrder = async () => {
    if (!cancelModalOrder) return;
    setIsCancelling(true);

    const orderId = cancelModalOrder.id;
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
        // Update local state
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: "Cancelled" } : o))
        );
        // Update Redux state
        dispatch(updateOrderStatus({ orderId, status: "Cancelled" }));

        toast.success(`Order ${orderId} has been cancelled successfully.`);
        setCancelModalOrder(null);
      } else {
        toast.error("Failed to cancel order in database.");
      }
    } catch (err) {
      console.error("Cancel order error:", err);
      toast.error("Network error while cancelling order.");
    } finally {
      setIsCancelling(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Processing":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Pending":
      case "Confirmed":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Cancelled":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-500 font-medium">
        Loading your orders from database...
      </div>
    );
  }

  if (!displayOrders.length) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-16 px-4 bg-white rounded-3xl border border-gray-100 max-w-xl mx-auto text-center mt-6">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
          <ShoppingBag size={28} />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">No orders placed yet</h2>
        <p className="text-gray-500 text-sm max-w-sm mb-6">
          When you place orders, they will show up here along with live shipping statuses and cancellation options.
        </p>
        <Link href="/Pages/AllProduct">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition shadow-md shadow-emerald-100 cursor-pointer">
            Start Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#F8FAFC] py-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-extrabold text-slate-900">
            My Orders ({displayOrders.length})
          </h1>
        </div>

        <div ref={ordersContainerRef} className="space-y-5">
          {displayOrders.map((order) => {
            const isCancellable = order.status === "Pending" || order.status === "Confirmed";

            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs hover:shadow-md transition"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                  <div>
                    <h2 className="font-extrabold text-lg sm:text-xl text-gray-900 font-mono">
                      {order.id}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                      Placed on {order.date || new Date(order.createdAt).toLocaleDateString()} • {order.products?.length || 1} items
                    </p>
                  </div>

                  <span className={`self-start sm:self-auto px-3.5 py-1.5 rounded-full text-xs font-bold border ${getStatusBadge(order.status)}`}>
                    {order.status || "Confirmed"}
                  </span>
                </div>

                {/* Products */}
                <div className="py-4 space-y-3">
                  {order.products?.map((product, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="relative w-14 h-14 rounded-xl border border-gray-100 overflow-hidden bg-gray-50 shrink-0">
                        <Image
                          src={product.image || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80"}
                          alt={product.name || "Product"}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>

                      <div className="grow min-w-0">
                        <h3 className="font-semibold text-sm text-gray-900 line-clamp-1">{product.name}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Qty: {product.qty} • ৳{Number(product.price).toLocaleString()}
                        </p>
                      </div>

                      <p className="font-bold text-sm text-gray-900 shrink-0">
                        ৳{(Number(product.price) * (product.qty || 1)).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-100 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <span className="text-xs text-gray-500 block">Total Amount:</span>
                    <span className="font-extrabold text-lg text-emerald-600 font-mono">
                      ৳{Number(order.total).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {isCancellable && (
                      <button
                        onClick={() => {
                          setCancelModalOrder(order);
                          setSelectedReason(CANCEL_REASONS[0]);
                          setCustomReason("");
                        }}
                        className="border border-rose-200 text-rose-600 hover:bg-rose-50 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <XCircle size={15} />
                        <span>Cancel Order</span>
                      </button>
                    )}

                    <Link
                      href={`/Pages/OrderTracking?orderId=${encodeURIComponent(order.id.replace("#", ""))}`}
                    >
                      <button className="border border-gray-200 hover:border-emerald-500 hover:text-emerald-600 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer bg-white">
                        <Truck size={16} />
                        <span>Track Order</span>
                        <ArrowRight size={14} />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cancel Order Confirmation Modal */}
      {cancelModalOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl relative">
            <button
              onClick={() => setCancelModalOrder(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-black p-1 rounded-full hover:bg-gray-100 cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-gray-900">Cancel Order {cancelModalOrder.id}?</h3>
                <p className="text-xs text-gray-500">Please let us know the reason for cancellation</p>
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
                        name="cancelReason"
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
                onClick={() => setCancelModalOrder(null)}
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
};

export default MyOrders;