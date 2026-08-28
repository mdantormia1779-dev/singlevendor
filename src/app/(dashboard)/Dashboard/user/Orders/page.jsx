"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { loadStoredOrders } from "@/app/store/cartSlice";
import { Package, Truck, ArrowRight, ShoppingBag } from "lucide-react";

const MyOrders = () => {
  const dispatch = useDispatch();
  const reduxOrders = useSelector((state) => state.cart.orders) || [];

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const displayOrders = orders.length > 0 ? orders : reduxOrders;

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

  if (!displayOrders.length) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-16 px-4 bg-white rounded-3xl border border-gray-100 max-w-xl mx-auto text-center mt-6">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
          <ShoppingBag size={28} />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">No orders placed yet</h2>
        <p className="text-gray-500 text-sm max-w-sm mb-6">
          When you place orders, they will show up here along with live shipping statuses.
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
    <section className="min-h-screen bg-[#F8FAFC] py-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-extrabold text-slate-900">
            My Orders ({displayOrders.length})
          </h1>
        </div>

        <div className="space-y-5">
          {displayOrders.map((order) => (
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyOrders;