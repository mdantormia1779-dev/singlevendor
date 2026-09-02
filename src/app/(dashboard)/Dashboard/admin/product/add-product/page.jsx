"use client";

import React, { useState } from "react";
import { UploadCloud, Check, Loader2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

const colorsList = [
  { name: "Orange", class: "bg-orange-500" },
  { name: "Blue", class: "bg-blue-500" },
  { name: "Yellow", class: "bg-amber-400" },
  { name: "Black", class: "bg-black" },
];

const sizesList = ["S", "M", "L", "XL", "XXL"];

export default function AddProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Fashion");
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState("50");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedColor, setSelectedColor] = useState("Orange");
  const [selectedSize, setSelectedSize] = useState("M");

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};

    if (!title.trim()) {
      errs.title = "Product title is required.";
    } else if (title.trim().length < 3) {
      errs.title = "Product title must be at least 3 characters.";
    }

    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      errs.price = "Enter a valid positive price.";
    }

    if (!quantity || isNaN(Number(quantity)) || Number(quantity) < 0) {
      errs.quantity = "Enter a valid stock quantity.";
    }

    if (!description.trim()) {
      errs.description = "Product description is required.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix all form validation errors before saving! ⚠️");
      return;
    }

    setIsLoading(true);

    const defaultImg =
      imageUrl.trim() ||
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80";

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          category,
          price: Number(price),
          oldPrice: salePrice ? Number(salePrice) : null,
          discount: discount || (salePrice ? "Sale" : null),
          stockCount: parseInt(quantity) || 50,
          description: description.trim(),
          images: [defaultImg],
          features: [
            `Brand: ${brand || "Finora"}`,
            `Color: ${selectedColor}`,
            `Size: ${selectedSize}`,
            "100% Genuine Quality Guarantee",
          ],
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(`Product "${title}" saved to database successfully! 🎉`);
        router.push("/Dashboard/admin/product/all-products");
      } else {
        toast.error(data.error || "Failed to save product in database.");
      }
    } catch (err) {
      console.error("Save product error:", err);
      toast.error("Network error while creating product.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Add New Product
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Create and list a new item in your PostgreSQL database catalog
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
        onSubmit={handleSave}
        className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6 max-w-4xl"
      >
        {/* Product Title */}
        <div>
          <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-1.5">
            Product Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Wool oversized knitted T-shirt"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full bg-gray-50 border rounded-2xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-emerald-500 ${
              errors.title ? "border-red-500" : "border-gray-200"
            }`}
          />
          {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
        </div>

        {/* Category & Brand */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-1.5">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="Fashion">Fashion</option>
              <option value="Electronics">Electronics</option>
              <option value="Home & Living">Home & Living</option>
              <option value="Footwear">Men&apos;s &amp; Women&apos;s Shoes</option>
              <option value="Gadgets">Gadgets</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-1.5">
              Brand / Manufacturer
            </label>
            <input
              type="text"
              placeholder="e.g. Finora Original, Nike, Apple"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Price, Old Price, Stock */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-1.5">
              Price (৳) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="1500"
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
              Original / Old Price (৳)
            </label>
            <input
              type="number"
              placeholder="1800"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-1.5">
              Initial Stock Qty <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Image URL & Discount Tag */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-1.5">
              Product Image URL
            </label>
            <input
              type="text"
              placeholder="https://images.unsplash.com/photo-..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-1.5">
              Discount Badge (e.g. 15% OFF)
            </label>
            <input
              type="text"
              placeholder="15% OFF"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Color and Size */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-2">
              Color: <span className="text-slate-500">{selectedColor}</span>
            </label>
            <div className="flex items-center gap-3">
              {colorsList.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-8 h-8 rounded-full ${color.class} flex items-center justify-center transition cursor-pointer ${
                    selectedColor === color.name ? "ring-2 ring-emerald-500 scale-110" : "hover:scale-105"
                  }`}
                >
                  {selectedColor === color.name && <Check size={14} className="text-white" />}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-2">
              Size: <span className="text-slate-500">{selectedSize}</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {sizesList.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-9 rounded-xl text-xs font-bold transition border cursor-pointer ${
                    selectedSize === size
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-1.5">
            Product Description <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={4}
            placeholder="Write key details, material composition, sizing information, and product features..."
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
            <span>{isLoading ? "Saving to Database..." : "Save & Publish Product"}</span>
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