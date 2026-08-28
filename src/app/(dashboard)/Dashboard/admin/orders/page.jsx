"use client";

import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateOrderStatus } from "@/app/store/cartSlice";
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  Printer,
  ChevronDown,
  Download,
  AlertCircle,
  X,
} from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";

export default function AdminOrdersPage() {
  const dispatch = useDispatch();
  const reduxOrders = useSelector((state) => state.cart.orders) || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return reduxOrders.filter((ord) => {
      const matchesSearch =
        ord.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (ord.customer?.name && ord.customer.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (ord.customer?.phone && ord.customer.phone.includes(searchTerm));

      const matchesStatus = statusFilter === "All" || ord.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [reduxOrders, searchTerm, statusFilter]);

  const handleUpdateStatus = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ orderId, status: newStatus }));

    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
    }

    // Persist to Prisma Database
    fetch(`/api/orders/${encodeURIComponent(orderId)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    }).catch((err) => console.error("Prisma status update error:", err));

    toast.success(`Order ${orderId} updated to "${newStatus}"! Status is now live on tracking.`);
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
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Order Management & Live Tracking Sync
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Status changes made here instantly reflect on the customer's live Order Tracking page
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-emerald-50 text-emerald-700 font-bold px-3.5 py-1.5 rounded-full text-xs border border-emerald-200">
            Total Orders: {reduxOrders.length}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl shadow-xs border border-gray-100 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Order ID, Name, or Phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {["All", "Pending", "Confirmed", "Processing", "Delivered", "Cancelled"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                statusFilter === st
                  ? "bg-gray-900 text-white shadow-xs"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl shadow-xs border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 text-gray-700 text-xs font-bold uppercase tracking-wider border-b border-gray-200">
                <th className="py-4 px-6">Order ID</th>
                <th className="py-4 px-6">Customer</th>
                <th className="py-4 px-4">Date</th>
                <th className="py-4 px-4">Total</th>
                <th className="py-4 px-4">Payment</th>
                <th className="py-4 px-4">Live Status Switcher</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-500">
                    No orders found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-gray-50/60 transition">
                    <td className="py-4 px-6 font-mono font-bold text-gray-900">
                      {ord.id}
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900">{ord.customer?.name || "Customer"}</div>
                      <div className="text-xs text-gray-500 font-mono">{ord.customer?.phone || "N/A"}</div>
                    </td>
                    <td className="py-4 px-4 text-xs text-gray-600">{ord.date}</td>
                    <td className="py-4 px-4 font-bold text-emerald-700">
                      ৳{ord.total?.toLocaleString()}
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-xs font-semibold uppercase bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md">
                        {ord.paymentMethod || "COD"}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <select
                        value={ord.status}
                        onChange={(e) => handleUpdateStatus(ord.id, e.target.value)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-xl border cursor-pointer outline-none transition ${getStatusBadge(
                          ord.status
                        )}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-emerald-50 hover:text-emerald-700 text-gray-700 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer"
                      >
                        <Eye size={15} /> View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-black p-1 rounded-full hover:bg-gray-100 cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Invoice Details</span>
                <h2 className="text-xl font-extrabold text-gray-900">{selectedOrder.id}</h2>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(
                  selectedOrder.status
                )}`}
              >
                {selectedOrder.status}
              </span>
            </div>

            {/* Customer & Delivery Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl mb-6 text-xs">
              <div>
                <p className="text-gray-500 font-medium">Customer Name</p>
                <p className="font-bold text-gray-900 text-sm mt-0.5">{selectedOrder.customer?.name}</p>
                <p className="text-gray-600 mt-1 font-mono">{selectedOrder.customer?.phone}</p>
              </div>
              <div>
                <p className="text-gray-500 font-medium">Shipping Address</p>
                <p className="font-semibold text-gray-800 mt-0.5 leading-relaxed">
                  {selectedOrder.customer?.address || "Address details"}
                </p>
              </div>
              <div>
                <p className="text-gray-500 font-medium">Payment Method</p>
                <p className="font-bold text-gray-900 uppercase mt-0.5">
                  {selectedOrder.paymentMethod}
                  {selectedOrder.paymentDetails && (
                    <span className="block font-mono text-[11px] text-gray-600 font-normal mt-0.5">
                      TrxID: {selectedOrder.paymentDetails.trxId} (from {selectedOrder.paymentDetails.wallet})
                    </span>
                  )}
                </p>
              </div>
              <div>
                <p className="text-gray-500 font-medium">Delivery Method</p>
                <p className="font-bold text-gray-900 mt-0.5">{selectedOrder.deliveryMethod || "Express"}</p>
              </div>
            </div>

            {/* Product List */}
            <div className="space-y-3 mb-6">
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Ordered Items</h3>
              {selectedOrder.products?.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                      <Image src={item.image} alt={item.name} fill sizes="48px" className="object-cover" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">{item.name}</p>
                      <p className="text-[11px] text-gray-500">Qty: {item.qty} × ৳{item.price?.toLocaleString()}</p>
                    </div>
                  </div>
                  <span className="font-bold text-xs text-gray-900">
                    ৳{((item.price || 0) * (item.qty || 1)).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Total and Actions */}
            <div className="border-t border-gray-100 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-gray-500">Grand Total Amount</span>
                <p className="text-2xl font-extrabold text-emerald-700">৳{selectedOrder.total?.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => window.print()}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-4 py-2.5 rounded-xl text-xs transition cursor-pointer"
                >
                  <Printer size={15} /> Print Invoice
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
