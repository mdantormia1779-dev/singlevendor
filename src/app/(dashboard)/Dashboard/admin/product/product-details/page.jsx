"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Star, 
  Flame, 
  Plus, 
  Minus, 
  Check, 
  RefreshCw, 
  Heart, 
  Truck, 
  HelpCircle, 
  Share2, 
  MapPin 
} from "lucide-react";

const productImages = [
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=400&auto=format&fit=crop"
];

const colorsList = [
  { name: "Orange", class: "bg-orange-500" },
  { name: "Gray", class: "bg-gray-400" },
  { name: "Purple", class: "bg-indigo-500" },
];

const sizesList = ["S", "M", "L", "XL", "XXL"];

export default function ProductDetailsPage() {
  const [mainImage, setMainImage] = useState(productImages[0]);
  const [selectedColor, setSelectedColor] = useState("Gray");
  const [selectedSize, setSelectedSize] = useState("L");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Description");

  const handleQuantity = (type) => {
    setQuantity((prev) => (type === "plus" ? prev + 1 : prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      
      {/* Top Header & Breadcrumb */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Product Details</h1>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Dashboard</span>
          <span>{">"}</span>
          <span>Product</span>
          <span>{">"}</span>
          <span className="text-orange-600 font-medium">Product Details</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Thumbnails & Main Image */}
          <div className="flex gap-6">
            {/* Thumbnails list */}
            <div className="flex flex-col gap-4 w-24 shrink-0">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(img)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    mainImage === img ? "border-orange-500" : "border-transparent hover:border-gray-200"
                  }`}
                >
                  <Image src={img} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>

            {/* Main Preview */}
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
              <Image src={mainImage} alt="Stretch strap top" fill className="object-cover" />
            </div>
          </div>

          {/* Right Column: Details & Actions */}
          <div className="space-y-6">
            
            <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">CLOTHING</span>

            <h2 className="text-3xl font-bold text-gray-900">Stretch strap top</h2>

            {/* Reviews & Sales Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-1 text-black">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" className="text-black" />
                ))}
                <span className="text-gray-500 font-medium ml-1.5">(134 reviews)</span>
              </div>
              
              <div className="flex items-center gap-1.5 text-orange-600 font-medium bg-orange-50 px-3 py-1 rounded-full text-xs">
                <Flame size={15} />
                <span>18 sold in last 32 hours</span>
              </div>
            </div>

            {/* Price section */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-gray-900">$79.99</span>
              <span className="text-lg text-gray-400 line-through">$98.99</span>
              <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md">-25%</span>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed border-t border-b border-gray-100 py-4">
              The garments labelled as Committed are products that have been produced using sustainable fibres or processes, reducing their environmental impact.
            </p>

            <div className="text-sm text-gray-600">
              <span className="text-gray-400">👁</span> <strong className="text-gray-900">28 people</strong> are viewing this right now
            </div>

            {/* Timer & Stock info */}
            <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-100 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold text-gray-900">Hurry Up! Offer Ends in:</span>
                <div className="flex items-center gap-1.5 font-semibold text-gray-900 text-xs">
                  <span className="bg-white px-2 py-1 rounded border border-gray-200">7 <span className="text-[10px] text-gray-500 font-normal">Days</span></span> :
                  <span className="bg-white px-2 py-1 rounded border border-gray-200">00 <span className="text-[10px] text-gray-500 font-normal">Hours</span></span> :
                  <span className="bg-white px-2 py-1 rounded border border-gray-200">44 <span className="text-[10px] text-gray-500 font-normal">Mins</span></span> :
                  <span className="bg-white px-2 py-1 rounded border border-gray-200">54 <span className="text-[10px] text-gray-500 font-normal">Secs</span></span>
                </div>
              </div>

              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full rounded-full w-[84%]"></div>
              </div>

              <span className="text-xs font-semibold text-gray-700 block">
                <span className="text-orange-600">84% Sold</span> - Only 24 item(s) left in stock!
              </span>
            </div>

            {/* Colors */}
            <div>
              <span className="text-sm font-semibold text-gray-900 block mb-2.5">
                Colors: <span className="font-normal text-gray-600">{selectedColor}</span>
              </span>
              <div className="flex items-center gap-3">
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

            {/* Sizes */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-sm font-semibold text-gray-900">Size: <span className="font-normal text-gray-600">{selectedSize}</span></span>
                <span className="text-xs text-gray-500 underline cursor-pointer">Size Guide</span>
              </div>
              <div className="flex gap-3">
                {sizesList.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[48px] h-10 rounded-xl text-sm font-semibold transition border ${
                      selectedSize === size
                        ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                        : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Action Buttons */}
            <div className="space-y-4 pt-2">
              <span className="text-sm font-semibold text-gray-900 block">Quantity:</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-xl w-36 h-12 bg-white">
                  <button
                    onClick={() => handleQuantity("minus")}
                    className="flex-1 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-l-xl h-full"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="flex-1 text-center font-bold text-gray-900 border-x border-gray-200 h-full flex items-center justify-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantity("plus")}
                    className="flex-1 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-r-xl h-full"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button className="flex-1 bg-black hover:bg-gray-900 text-white font-semibold h-12 rounded-xl shadow-sm transition text-sm">
                  ADD TO CART – ${79.99 * quantity}
                </button>

                <button className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition">
                  <RefreshCw size={18} />
                </button>
                <button className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition">
                  <Heart size={18} />
                </button>
              </div>

              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold h-12 rounded-xl shadow-sm transition text-sm">
                BUY IT NOW
              </button>
            </div>

            {/* Delivery Links */}
            <div className="flex flex-wrap items-center gap-6 text-xs text-gray-600 pt-2 border-t border-gray-100">
              <div className="flex items-center gap-1.5 cursor-pointer hover:text-orange-500">
                <Truck size={16} />
                <span>Delivery & Return</span>
              </div>
              <div className="flex items-center gap-1.5 cursor-pointer hover:text-orange-500">
                <HelpCircle size={16} />
                <span>Ask A Question</span>
              </div>
              <div className="flex items-center gap-1.5 cursor-pointer hover:text-orange-500">
                <Share2 size={16} />
                <span>Share</span>
              </div>
            </div>

            {/* Delivery Details */}
            <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-100 space-y-2 text-xs text-gray-600">
              <p>⏱ <strong>Estimated Delivery:</strong> 12-26 days (International), 3-6 days (United States)</p>
              <p>🔄 <strong>Return within:</strong> 45 days of purchase. Duties & taxes are non-refundable.</p>
              <p className="flex items-center gap-1 text-orange-600 font-medium cursor-pointer pt-1">
                <MapPin size={14} /> View Store Information
              </p>
            </div>

            {/* Meta info */}
            <div className="space-y-1.5 text-xs text-gray-500 pt-2 border-t border-gray-100">
              <p>SKU: <strong className="text-gray-800">53453412</strong></p>
              <p>Vendor: <strong className="text-gray-800">Dataflow</strong></p>
              <p>Available: <strong className="text-green-600">Instock</strong></p>
              <p>Categories: <strong className="text-gray-800">Clothes, women, T-shirt</strong></p>
            </div>

          </div>
        </div>

        {/* Bottom Tabs Section (Description, Reviews, Shipping, etc.) */}
        <div className="border-t border-gray-100 pt-10">
          <div className="flex flex-wrap gap-8 border-b border-gray-200 pb-4">
            {["Description", "Customer Reviews", "Shipping & Returns", "Return Policies"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-lg font-bold pb-4 relative transition ${
                  activeTab === tab ? "text-gray-950" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900">Stretch strap top</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Nodding to retro styles, this Hyperbola T-shirt is defined by its off-the-shoulder design. It&apos;s spun from a green stretch cotton jersey and adorned with an embroidered AC logo on the front, a brand&apos;s signature.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Thick knitted fabric. Short design. Straight design. Rounded neck. Sleeveless. Straps. Unclosed. Cable knit finish. Co-ord.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-gray-900">COMPOSITION, ORIGIN AND CARE GUIDELINES</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Composition: 55% polyester, 30% acrylic, 13% polyamide, 2% elastane</li>
                <li>• Designed in Barcelona</li>
                <li>• Origin</li>
                <li>• Manufacture: USA</li>
              </ul>
              <div className="flex items-center gap-4 pt-4 text-gray-400">
                <span className="border px-2 py-1 rounded text-xs">30°</span>
                <span className="border px-2 py-1 rounded text-xs">⊗</span>
                <span className="border px-2 py-1 rounded text-xs">⎓</span>
                <span className="border px-2 py-1 rounded text-xs">⊗</span>
                <span className="border px-2 py-1 rounded text-xs">⊗</span>
              </div>
              <p className="text-[11px] text-gray-400">MACHINE WASHING MAX 30°C / 85°F SHORT SPIN DRY</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}