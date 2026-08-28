"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Plus, Lightbulb, Trash2, Edit2, Eye, AlertTriangle, X } from "lucide-react";
import { toast } from "react-toastify";
import productsJson from "@/app/data/data.json";

const initialProducts = [
  {
    id: 1,
    name: "Neptune Long-sleeve Shirt",
    productId: "#7712309",
    category: "Fashion",
    price: 1450,
    quantity: 1638,
    sale: 20,
    status: "Out of stock",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100&q=80",
  },
  {
    id: 2,
    name: "Corduroy Slim-fit Trouser",
    productId: "#7712310",
    category: "Fashion",
    price: 2000,
    quantity: 450,
    sale: 15,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=100&q=80",
  },
  {
    id: 3,
    name: "Turtleneck Knitted T-shirt",
    productId: "#7712311",
    category: "Fashion",
    price: 1830,
    quantity: 320,
    sale: 10,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=100&q=80",
  },
  {
    id: 4,
    name: "Wool Oversized Sweater",
    productId: "#7712312",
    category: "Fashion",
    price: 2600,
    quantity: 120,
    sale: 25,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=100&q=80",
  },
  {
    id: 5,
    name: "Wireless ANC Headphones",
    productId: "#7712313",
    category: "Electronics",
    price: 4500,
    quantity: 80,
    sale: 5,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80",
  },
  {
    id: 6,
    name: "Smart Fitness Watch",
    productId: "#7712314",
    category: "Electronics",
    price: 3200,
    quantity: 0,
    sale: 30,
    status: "Out of stock",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80",
  },
];

export default function AllProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [productToDelete, setProductToDelete] = useState(null);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.productId.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCat = categoryFilter === "All" || p.category === categoryFilter;
      const matchesStat = statusFilter === "All" || p.status === statusFilter;

      return matchesSearch && matchesCat && matchesStat;
    });
  }, [products, searchTerm, categoryFilter, statusFilter]);

  const handleDelete = () => {
    if (productToDelete) {
      setProducts(products.filter((p) => p.id !== productToDelete.id));
      toast.info(`Product "${productToDelete.name}" deleted.`);
      setProductToDelete(null);
    }
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      {/* Top Banner Tip */}
      <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl mb-6 text-xs sm:text-sm">
        <Lightbulb size={18} className="text-emerald-600 shrink-0" />
        <span>
          <strong>Pro-tip:</strong> Search by exact Product ID (e.g. <em>#7712309</em>) or title to quickly manage stock, pricing, and catalogue listings.
        </span>
      </div>

      {/* Filter & Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white p-4 sm:p-5 rounded-3xl shadow-xs border border-gray-100">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Dropdowns & Add Button */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-200 bg-gray-50 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="Fashion">Fashion</option>
            <option value="Electronics">Electronics</option>
            <option value="Home & Living">Home & Living</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-200 bg-gray-50 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="All">All Status</option>
            <option value="In Stock">In Stock</option>
            <option value="Out of stock">Out of stock</option>
          </select>

          <Link href="/Dashboard/admin/product/add-product">
            <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shadow-sm cursor-pointer">
              <Plus size={16} /> Add Product
            </button>
          </Link>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl shadow-xs border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 text-gray-700 text-xs font-bold uppercase tracking-wider border-b border-gray-200">
                <th className="py-4 px-6">Product</th>
                <th className="py-4 px-4">Product ID</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Price</th>
                <th className="py-4 px-4 text-center">Stock Qty</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-500">
                    No products found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/60 transition">
                    {/* Product Info (Image + Name) */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <span className="font-bold text-gray-900">{item.name}</span>
                      </div>
                    </td>

                    {/* Product ID */}
                    <td className="py-4 px-4 text-gray-600 font-mono text-xs font-semibold">
                      {item.productId}
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4 text-xs font-semibold text-gray-700">
                      {item.category}
                    </td>

                    {/* Price */}
                    <td className="py-4 px-4 font-bold text-emerald-700">
                      ৳{item.price.toLocaleString()}
                    </td>

                    {/* Quantity */}
                    <td className="py-4 px-4 text-center font-bold text-gray-800">
                      {item.quantity}
                    </td>

                    {/* Stock Status Badge */}
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          item.status === "In Stock"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-orange-50 text-orange-700 border border-orange-200"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href="/Dashboard/admin/product/product-details"
                          className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </Link>
                        <Link
                          href="/Dashboard/admin/product/edit-product"
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition"
                          title="Edit Product"
                        >
                          <Edit2 size={16} />
                        </Link>
                        <button
                          onClick={() => setProductToDelete(item)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-sm text-center shadow-2xl">
            <AlertTriangle className="mx-auto text-red-500 mb-4" size={44} />
            <h2 className="text-xl font-bold mb-2 text-gray-900">Delete Product?</h2>
            <p className="text-slate-500 text-sm mb-6">
              Are you sure you want to remove <strong>{productToDelete.name}</strong> from your catalogue?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setProductToDelete(null)}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-bold text-slate-700 cursor-pointer text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold cursor-pointer text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}