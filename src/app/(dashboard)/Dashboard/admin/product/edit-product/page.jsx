"use client";

import React, { useState } from "react";
import Image from "next/image";
import { UploadCloud, X, Calendar, ChevronDown, Check } from "lucide-react";

const colorsList = [
  { name: "Orange", class: "bg-orange-500" },
  { name: "Blue", class: "bg-blue-500" },
  { name: "Yellow", class: "bg-amber-400" },
  { name: "Black", class: "bg-black" },
];

const sizesList = ["S", "M", "L", "XL"];

export default function EditProductPage() {
  const [selectedColor, setSelectedColor] = useState("Orange");
  const [selectedSize, setSelectedSize] = useState("M");

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      
      {/* Top Header & Breadcrumb */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Edit Product</h1>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Dashboard</span>
          <span>{">"}</span>
          <span>Product</span>
          <span>{">"}</span>
          <span className="text-orange-600 font-medium">Edit Product</span>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-8">
        
        {/* Upload Images Section */}
        <div>
          <label className="text-sm font-semibold text-gray-900 block mb-2">Upload images</label>
          <div className="border-2 border-dashed border-orange-300 bg-orange-50/30 rounded-2xl p-12 text-center cursor-pointer hover:bg-orange-50/50 transition">
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                <UploadCloud size={24} />
              </div>
              <p className="text-sm text-gray-600">
                Drop your images here or select <span className="text-orange-500 font-medium underline">click to browse</span>
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            You need to add at least 4 images. Pay attention to the quality of the pictures you add, comply with the background color standards. Pictures must be in certain dimensions. Notice that the product shows all the details
          </p>
        </div>

        {/* Product Title */}
        <div>
          <label className="text-sm font-semibold text-gray-900 block mb-2">
            Product title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            defaultValue="Wool oversized T-shirt"
            className="w-full bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-orange-500 font-medium text-sm"
          />
          <span className="text-xs text-gray-400 mt-1.5 block">Do not exceed 20 characters when entering the product name.</span>
        </div>

        {/* Category */}
        <div>
          <label className="text-sm font-semibold text-gray-900 block mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="w-full bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-2.5 flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <span className="bg-orange-50 text-orange-600 border border-orange-200 px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                  Women <X size={13} className="cursor-pointer" />
                </span>
                <span className="bg-orange-50 text-orange-600 border border-orange-200 px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                  Dress <X size={13} className="cursor-pointer" />
                </span>
                <span className="bg-orange-50 text-orange-600 border border-orange-200 px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                  Clothing <X size={13} className="cursor-pointer" />
                </span>
              </div>
              <ChevronDown size={18} className="text-gray-400 shrink-0" />
            </div>
          </div>
        </div>

        {/* Price, Sale Price, Schedule Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-semibold text-gray-900 block mb-2">
              Price <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">$</span>
              <input
                type="text"
                defaultValue="98.99"
                className="w-full bg-gray-50/80 border border-gray-200 rounded-xl pl-8 pr-4 py-3 text-gray-900 focus:outline-none focus:border-orange-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-900 block mb-2">Sale Price</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">$</span>
              <input
                type="text"
                defaultValue="79.99"
                className="w-full bg-gray-50/80 border border-gray-200 rounded-xl pl-8 pr-4 py-3 text-gray-900 focus:outline-none focus:border-orange-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-900 block mb-2">Schedule</label>
            <div className="relative">
              <input
                type="text"
                defaultValue="01/01/2026"
                className="w-full bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-orange-500 text-sm"
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 pointer-events-none">
                <Calendar size={18} />
              </span>
            </div>
          </div>
        </div>

        {/* Brand, Color, Size Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-semibold text-gray-900 block mb-2">
              Brand <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              defaultValue="Nike"
              className="w-full bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-orange-500 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-900 block mb-2">
              Color: <span className="font-normal text-gray-600">{selectedColor}</span>
            </label>
            <div className="flex items-center gap-3 pt-1">
              {colorsList.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-8 h-8 rounded-full ${color.class} flex items-center justify-center transition ring-offset-2 ${
                    selectedColor === color.name ? "ring-2 ring-orange-500 scale-110" : "hover:scale-105"
                  }`}
                >
                  {selectedColor === color.name && <Check size={14} className="text-white" />}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-900 block mb-2">
              Size: <span className="font-normal text-gray-600">{selectedSize}</span>
            </label>
            <div className="flex gap-2">
              {sizesList.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-11 h-10 rounded-xl text-sm font-semibold transition border ${
                    selectedSize === size
                      ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                      : "bg-gray-50/80 text-gray-700 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SKU, Stock, Tags Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-semibold text-gray-900 block mb-2">SKU</label>
            <input
              type="text"
              defaultValue="53453412"
              className="w-full bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-orange-500 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-900 block mb-2">
              Stock <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              defaultValue="Instock"
              className="w-full bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-orange-500 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-900 block mb-2">Tags</label>
            <input
              type="text"
              defaultValue="Clothes"
              className="w-full bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-orange-500 text-sm"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-semibold text-gray-900 block mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={5}
            defaultValue="Nodding to retro styles, this Hyperbola T-shirt is defined by its off-the-shoulder design. It's spun from a green stretch cotton jersey and adorned with an embroidered AC logo on the front, a brand's signature. Thick knitted fabric. Short design. Straight design. Rounded neck. Sleeveless. Straps. Unclosed. Cable knit finish. Co-ord."
            className="w-full bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-orange-500 text-sm resize-none"
          />
          <span className="text-xs text-gray-400 mt-1.5 block">Do not exceed 1000 characters when entering the product description .</span>
        </div>

      </div>

      {/* Bottom Save & Cancel Buttons */}
      <div className="flex items-center gap-4 mt-8">
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-8 py-3.5 rounded-xl shadow-sm transition text-sm">
          Save Changes
        </button>
        <button className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 font-medium px-8 py-3.5 rounded-xl transition text-sm">
          Cancel
        </button>
      </div>

    </div>
  );
}