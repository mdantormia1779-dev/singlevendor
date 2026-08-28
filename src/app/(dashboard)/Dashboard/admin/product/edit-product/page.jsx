"use client";

import React, { useState } from "react";
import Image from "next/image";
import { UploadCloud, X, Calendar, ChevronDown, Check, Loader2 } from "lucide-react";
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

export default function EditProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [title, setTitle] = useState("Wool oversized T-shirt");
  const [category, setCategory] = useState("Fashion");
  const [price, setPrice] = useState("1450");
  const [salePrice, setSalePrice] = useState("1200");
  const [brand, setBrand] = useState("Nike");
  const [sku, setSku] = useState("SKU-53453412");
  const [stock, setStock] = useState("In Stock");
  const [quantity, setQuantity] = useState("1638");
  const [description, setDescription] = useState(
    "Nodding to retro styles, this Hyperbola T-shirt is defined by its off-the-shoulder design. It's spun from a green stretch cotton jersey and adorned with an embroidered AC logo on the front, a brand's signature. Thick knitted fabric. Short design. Straight design."
  );
  const [selectedColor, setSelectedColor] = useState("Orange");
  const [selectedSize, setSelectedSize] = useState("M");

  // Errors State
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};

    if (!title.trim()) {
      errs.title = "Product title is required.";
    } else if (title.trim().length < 3) {
      errs.title = "Product title must be at least 3 characters.";
    }

    if (!category.trim()) {
      errs.category = "Please select or enter a category.";
    }

    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      errs.price = "Enter a valid positive price.";
    }

    if (salePrice && (isNaN(Number(salePrice)) || Number(salePrice) >= Number(price))) {
      errs.salePrice = "Sale price must be a valid number less than regular price.";
    }

    if (!brand.trim()) {
      errs.brand = "Brand name is required.";
    }

    if (!quantity || isNaN(Number(quantity)) || Number(quantity) < 0) {
      errs.quantity = "Enter a valid stock quantity.";
    }

    if (!description.trim()) {
      errs.description = "Product description is required.";
    } else if (description.trim().length < 10) {
      errs.description = "Description must be at least 10 characters.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix all form validation errors before saving! ⚠️");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Product "${title}" updated successfully! ✅`);
      router.push("/Dashboard/admin/product/all-products");
    }, 700);
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Edit Product</h1>
          <p className="text-xs text-gray-500 mt-1">Modify product details, inventory, and pricing</p>
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
          <Link href="/Dashboard/admin" className="hover:text-orange-500">Dashboard</Link>
          <span>{">"}</span>
          <Link href="/Dashboard/admin/product/all-products" className="hover:text-orange-500">Product</Link>
          <span>{">"}</span>
          <span className="text-orange-600 font-medium">Edit Product</span>
        </div>
      </div>

      {/* Form Container */}
      <form onSubmit={handleUpdate} className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 space-y-8">
        {/* Upload Images Section */}
        <div>
          <label className="text-sm font-bold text-gray-900 block mb-2">Upload images</label>
          <div className="border-2 border-dashed border-orange-300 bg-orange-50/30 rounded-2xl p-8 sm:p-12 text-center cursor-pointer hover:bg-orange-50/50 transition">
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                <UploadCloud size={24} />
              </div>
              <p className="text-sm text-gray-600">
                Drop your images here or <span className="text-orange-500 font-medium underline">browse files</span>
              </p>
            </div>
          </div>
        </div>

        {/* Product Title */}
        <div>
          <label className="text-sm font-bold text-gray-900 block mb-1.5">
            Product Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full bg-gray-50/80 border rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-orange-500 text-sm ${
              errors.title ? "border-red-500 ring-1 ring-red-500/20" : "border-gray-200"
            }`}
          />
          {errors.title && <p className="text-xs text-red-500 mt-1 font-medium">{errors.title}</p>}
        </div>

        {/* Category & Brand Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-bold text-gray-900 block mb-1.5">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-orange-500 text-sm"
            >
              <option value="Fashion">Fashion & Apparel</option>
              <option value="Electronics">Electronics & Gadgets</option>
              <option value="Home & Living">Home & Living</option>
              <option value="Footwear">Men's & Women's Shoes</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-bold text-gray-900 block mb-1.5">
              Brand <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className={`w-full bg-gray-50/80 border rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-orange-500 text-sm ${
                errors.brand ? "border-red-500 ring-1 ring-red-500/20" : "border-gray-200"
              }`}
            />
            {errors.brand && <p className="text-xs text-red-500 mt-1 font-medium">{errors.brand}</p>}
          </div>
        </div>

        {/* Price, Sale Price, Stock Quantity Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-bold text-gray-900 block mb-1.5">
              Regular Price (৳) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 font-bold">৳</span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={`w-full bg-gray-50/80 border rounded-xl pl-8 pr-4 py-3 text-gray-900 focus:outline-none focus:border-orange-500 text-sm ${
                  errors.price ? "border-red-500 ring-1 ring-red-500/20" : "border-gray-200"
                }`}
              />
            </div>
            {errors.price && <p className="text-xs text-red-500 mt-1 font-medium">{errors.price}</p>}
          </div>

          <div>
            <label className="text-sm font-bold text-gray-900 block mb-1.5">
              Discount Price (৳)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 font-bold">৳</span>
              <input
                type="number"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
                className={`w-full bg-gray-50/80 border rounded-xl pl-8 pr-4 py-3 text-gray-900 focus:outline-none focus:border-orange-500 text-sm ${
                  errors.salePrice ? "border-red-500 ring-1 ring-red-500/20" : "border-gray-200"
                }`}
              />
            </div>
            {errors.salePrice && <p className="text-xs text-red-500 mt-1 font-medium">{errors.salePrice}</p>}
          </div>

          <div>
            <label className="text-sm font-bold text-gray-900 block mb-1.5">
              Stock Quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className={`w-full bg-gray-50/80 border rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-orange-500 text-sm ${
                errors.quantity ? "border-red-500 ring-1 ring-red-500/20" : "border-gray-200"
              }`}
            />
            {errors.quantity && <p className="text-xs text-red-500 mt-1 font-medium">{errors.quantity}</p>}
          </div>
        </div>

        {/* Color and Size Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-bold text-gray-900 block mb-2">
              Color: <span className="font-normal text-gray-600">{selectedColor}</span>
            </label>
            <div className="flex items-center gap-3 pt-1">
              {colorsList.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-8 h-8 rounded-full ${color.class} flex items-center justify-center transition ring-offset-2 cursor-pointer ${
                    selectedColor === color.name ? "ring-2 ring-orange-500 scale-110" : "hover:scale-105"
                  }`}
                >
                  {selectedColor === color.name && <Check size={14} className="text-white" />}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-gray-900 block mb-2">
              Size: <span className="font-normal text-gray-600">{selectedSize}</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {sizesList.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`w-11 h-10 rounded-xl text-sm font-semibold transition border cursor-pointer ${
                    selectedSize === size
                      ? "bg-orange-500 text-white border-orange-500 shadow-xs"
                      : "bg-gray-50/80 text-gray-700 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SKU & Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-bold text-gray-900 block mb-1.5">SKU Code</label>
            <input
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="w-full bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-orange-500 text-sm font-mono"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-900 block mb-1.5">Stock Status</label>
            <select
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-orange-500 text-sm"
            >
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Pre-order">Pre-order</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-bold text-gray-900 block mb-1.5">
            Product Description <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full bg-gray-50/80 border rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-orange-500 text-sm resize-none ${
              errors.description ? "border-red-500 ring-1 ring-red-500/20" : "border-gray-200"
            }`}
          />
          {errors.description && <p className="text-xs text-red-500 mt-1 font-medium">{errors.description}</p>}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-xl shadow-sm transition text-sm cursor-pointer flex items-center gap-2"
          >
            {isLoading && <Loader2 className="animate-spin" size={16} />}
            <span>{isLoading ? "Updating..." : "Save Changes"}</span>
          </button>
          <Link href="/Dashboard/admin/product/all-products">
            <button
              type="button"
              className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-semibold px-8 py-3.5 rounded-xl transition text-sm cursor-pointer"
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}