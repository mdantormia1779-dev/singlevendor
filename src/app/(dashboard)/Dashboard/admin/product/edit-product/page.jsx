"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import Link from "next/link";

function EditProductContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const [isLoading, setIsLoading] = useState(false);
  const [fetching, setFetching] = useState(Boolean(productId));

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Fashion");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [stockCount, setStockCount] = useState("50");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (productId) {
      fetch(`/api/products/${productId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.product) {
            const p = data.product;
            setTitle(p.title || "");
            setCategory(p.category || "Fashion");
            setPrice(p.price ? String(p.price) : "");
            setOldPrice(p.oldPrice ? String(p.oldPrice) : "");
            setDiscount(p.discount || "");
            setStockCount(p.stockCount !== null ? String(p.stockCount) : "50");
            setDescription(p.description || "");
            setImageUrl(p.images?.[0] || "");
          } else {
            toast.error("Product not found in database.");
          }
        })
        .catch((err) => console.error("Edit product fetch error:", err))
        .finally(() => setFetching(false));
    }
  }, [productId]);

  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = "Product title is required.";
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      errs.price = "Enter a valid positive price.";
    }
    if (!description.trim()) errs.description = "Description is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill in required fields correctly.");
      return;
    }

    if (!productId) {
      toast.error("No product ID specified.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          price: Number(price),
          oldPrice: oldPrice ? Number(oldPrice) : null,
          discount: discount || null,
          stockCount: parseInt(stockCount) || 50,
          description,
          images: imageUrl ? [imageUrl] : undefined,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(`Product "${title}" updated successfully! ✅`);
        router.push("/Dashboard/admin/product/all-products");
      } else {
        toast.error("Failed to update product in database.");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Network error updating product.");
    } finally {
      setIsLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="p-8 text-center text-slate-500 font-medium">
        Loading product details from database...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Edit Product {productId ? `(#${productId})` : ""}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Modify product details, pricing, and live inventory
          </p>
        </div>
        <Link
          href="/Dashboard/admin/product/all-products"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-600 hover:text-emerald-600 transition"
        >
          <ArrowLeft size={16} /> Back to Catalog
        </Link>
      </div>

      <form
        onSubmit={handleUpdate}
        className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6 max-w-4xl"
      >
        {/* Title */}
        <div>
          <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-1.5">
            Product Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full bg-gray-50 border rounded-2xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-emerald-500 ${
              errors.title ? "border-red-500" : "border-gray-200"
            }`}
          />
          {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
        </div>

        {/* Category & Stock Count */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="Fashion">Fashion</option>
              <option value="Electronics">Electronics</option>
              <option value="Home & Living">Home & Living</option>
              <option value="Men's Shoes">Men&apos;s Shoes</option>
              <option value="Gadgets">Gadgets</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-1.5">
              Stock Quantity
            </label>
            <input
              type="number"
              value={stockCount}
              onChange={(e) => setStockCount(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Price, Old Price, Discount */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-1.5">
              Price (৳) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={`w-full bg-gray-50 border rounded-2xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-emerald-500 ${
                errors.price ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
          </div>

          <div>
            <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-1.5">
              Original Price (৳)
            </label>
            <input
              type="number"
              value={oldPrice}
              onChange={(e) => setOldPrice(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-1.5">
              Discount Badge (e.g. 20% OFF)
            </label>
            <input
              type="text"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="20% OFF"
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-1.5">
            Main Image URL
          </label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-1.5">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full bg-gray-50 border rounded-2xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-emerald-500 resize-none ${
              errors.description ? "border-red-500" : "border-gray-200"
            }`}
          />
          {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3.5 rounded-2xl shadow-sm transition text-xs sm:text-sm cursor-pointer flex items-center gap-2"
          >
            {isLoading && <Loader2 className="animate-spin" size={16} />}
            <span>{isLoading ? "Saving..." : "Save Changes"}</span>
          </button>
          <Link href="/Dashboard/admin/product/all-products">
            <button
              type="button"
              className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-semibold px-6 py-3.5 rounded-2xl transition text-xs sm:text-sm cursor-pointer"
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default function EditProductPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading form...</div>}>
      <EditProductContent />
    </Suspense>
  );
}