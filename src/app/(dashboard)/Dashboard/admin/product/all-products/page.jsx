"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Plus, Lightbulb, Trash2, Edit2, Eye, AlertTriangle, RefreshCw } from "lucide-react";
import { toast } from "react-toastify";
import gsap from "gsap";

export default function AllProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [productToDelete, setProductToDelete] = useState(null);
  const tableRef = useRef(null);

  const fetchProducts = (showLoader = false) => {
    if (showLoader) setLoading(true);
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.products) {
          setProducts(data.products);
        }
      })
      .catch((err) => console.error("Admin products fetch error:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.products) {
          setProducts(data.products);
        }
      })
      .catch((err) => console.error("Admin products fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  // GSAP animation
  useEffect(() => {
    if (!loading && tableRef.current && tableRef.current.children.length > 0) {
      gsap.fromTo(
        tableRef.current.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: "power2.out" }
      );
    }
  }, [loading, products]);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category || "Fashion"));
    return ["All", ...Array.from(set)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const idMatch = String(p.id).includes(searchTerm.replace("#", ""));
      const titleMatch = (p.title || "").toLowerCase().includes(searchTerm.toLowerCase());
      const catMatch = (p.category || "").toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSearch = !searchTerm || idMatch || titleMatch || catMatch;
      const matchesCat = categoryFilter === "All" || (p.category || "").toLowerCase() === categoryFilter.toLowerCase();
      
      const inStock = (p.stockCount !== null ? p.stockCount > 0 : p.inStock);
      const matchesStat =
        statusFilter === "All" ||
        (statusFilter === "In Stock" && inStock) ||
        (statusFilter === "Out of stock" && !inStock);

      return matchesSearch && matchesCat && matchesStat;
    });
  }, [products, searchTerm, categoryFilter, statusFilter]);

  const handleDelete = async () => {
    if (!productToDelete) return;

    try {
      const res = await fetch(`/api/products/${productToDelete.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
        toast.success(`Product "${productToDelete.title}" deleted.`);
      } else {
        toast.error("Failed to delete product from database.");
      }
    } catch (err) {
      console.error("Delete product error:", err);
      toast.error("Network error deleting product.");
    } finally {
      setProductToDelete(null);
    }
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen font-sans">
      {/* Top Banner Tip */}
      <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl mb-6 text-xs sm:text-sm">
        <Lightbulb size={18} className="text-emerald-600 shrink-0" />
        <span>
          <strong>Live Database Inventory:</strong> Manage all products directly synced with your PostgreSQL database.
        </span>
      </div>

      {/* Filter & Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white p-4 sm:p-5 rounded-3xl shadow-xs border border-gray-100">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title, ID or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Dropdowns & Add Button */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-200 bg-gray-50 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>
            ))}
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

          <button
            onClick={fetchProducts}
            className="p-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-xl transition cursor-pointer"
            title="Refresh Products"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>

          <Link href="/Dashboard/admin/product/add-product">
            <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition shadow-sm cursor-pointer">
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
            <tbody ref={tableRef} className="divide-y divide-gray-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-500">
                    Loading products from database...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-500">
                    No products found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((item) => {
                  const inStock = item.stockCount !== null ? item.stockCount > 0 : item.inStock;
                  return (
                    <tr key={item.id} className="hover:bg-gray-50/60 transition">
                      {/* Product Info (Image + Name) */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                            <Image
                              src={item.images?.[0] || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80"}
                              alt={item.title}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                          <span className="font-bold text-gray-900 line-clamp-1 max-w-xs">{item.title}</span>
                        </div>
                      </td>

                      {/* Product ID */}
                      <td className="py-4 px-4 text-gray-600 font-mono text-xs font-semibold">
                        #{item.id}
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4 text-xs font-semibold text-gray-700">
                        {item.category || "Fashion"}
                      </td>

                      {/* Price */}
                      <td className="py-4 px-4 font-bold text-emerald-700">
                        ৳{Number(item.price).toLocaleString()}
                      </td>

                      {/* Quantity */}
                      <td className="py-4 px-4 text-center font-bold text-gray-800">
                        {item.stockCount ?? 50}
                      </td>

                      {/* Stock Status Badge */}
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                            inStock
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-orange-50 text-orange-700 border border-orange-200"
                          }`}
                        >
                          {inStock ? "In Stock" : "Out of stock"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/Pages/Details/${item.id}`}
                            className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </Link>
                          <Link
                            href={`/Dashboard/admin/product/edit-product?id=${item.id}`}
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
                  );
                })
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
              Are you sure you want to remove <strong>{productToDelete.title}</strong> from your PostgreSQL database?
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