"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, Plus, Lightbulb } from "lucide-react";

// ডেমো প্রোডাক্ট ডাটা (আপনার ডাটাবেজ বা API থেকে ডাটা এনে এখানে ম্যাপ করতে পারেন)
const productsData = [
  {
    id: 1,
    name: "Neptune Long-sleeve",
    productId: "#7712309",
    price: "$1,452.500",
    quantity: 1638,
    sale: 20,
    status: "Out of stock",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Corduroy slim-fit",
    productId: "#7712309",
    price: "$1,452.500",
    quantity: 1638,
    sale: 20,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Turtleneck knitted T-shirt",
    productId: "#7712309",
    price: "$1,452.500",
    quantity: 1638,
    sale: 20,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Wool oversized T-shirt",
    productId: "#7712309",
    price: "$1,452.500",
    quantity: 1638,
    sale: 20,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    name: "Neptune Long-sleeve",
    productId: "#7712309",
    price: "$1,452.500",
    quantity: 1638,
    sale: 20,
    status: "Out of stock",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100&auto=format&fit=crop&q=80",
  },
];

export default function AllProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      
      {/* Top Tip Banner */}
      <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-800 px-4 py-3 rounded-lg mb-6 text-sm">
        <Lightbulb size={18} className="text-orange-500 shrink-0" />
        <span>
          Tip search by Product ID: Each product is provided with a unique ID, which you can rely on to find the exact product you need.
        </span>
      </div>

      {/* Filter & Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        
        {/* Entries & Search */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Showing</span>
            <select className="border border-gray-300 rounded-lg px-2 py-1.5 focus:outline-none focus:border-orange-500">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            <span>entries</span>
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Search here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm w-64 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {/* Dropdowns & Add Button */}
        <div className="flex flex-wrap items-center gap-3">
          <select className="border border-gray-200 bg-white rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-orange-500">
            <option>All Categories</option>
          </select>

          <select className="border border-gray-200 bg-white rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-orange-500">
            <option>All Status</option>
          </select>

          <select className="border border-gray-200 bg-white rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-orange-500">
            <option>Sort by (Defaut)</option>
          </select>

          <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
            <Plus size={18} />
            Add new
          </button>
        </div>
      </div>

      {/* Products Table Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm font-semibold border-b border-gray-200">
              <th className="py-4 px-6">Product</th>
              <th className="py-4 px-4">Product ID</th>
              <th className="py-4 px-4">Price</th>
              <th className="py-4 px-4">Quantity</th>
              <th className="py-4 px-4">Sale</th>
              <th className="py-4 px-6">Stock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {productsData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/80 transition">
                
                {/* Product Info (Image + Name) */}
                <td className="py-3 px-6">
                  <div className="flex items-center gap-3">
                    <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="font-semibold text-gray-900">{item.name}</span>
                  </div>
                </td>

                {/* Product ID */}
                <td className="py-3 px-4 text-gray-600 font-medium">{item.productId}</td>

                {/* Price */}
                <td className="py-3 px-4 font-semibold text-gray-900">{item.price}</td>

                {/* Quantity */}
                <td className="py-3 px-4 text-gray-700">{item.quantity}</td>

                {/* Sale */}
                <td className="py-3 px-4 text-gray-700">{item.sale}</td>

                {/* Stock Status Badge */}
                <td className="py-3 px-6">
                  <span
                    className={`inline-block px-3 py-1 rounded-md text-xs font-semibold ${
                      item.status === "In Stock"
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                        : "bg-orange-50 text-orange-600 border border-orange-200"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}