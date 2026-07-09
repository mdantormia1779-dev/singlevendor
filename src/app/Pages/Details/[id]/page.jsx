"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Minus,
  Plus,
  ShoppingCart,
  Star,
} from "lucide-react";
import Deteals from "@/app/Components/Deteals/page";
import Image from "next/image";
import Link from "next/link";
import products from "@/app/data/data.json";


const DetailsPage = () => {
  const params = useParams();

  // URL এর ID অনুযায়ী ডাটা ম্যাচিং
  const product =
    products.find((p) => p.id === Number(params.id)) || productsData[0];

  const [activeTab, setActiveTab] = useState("details");
  const [quantity, setQuantity] = useState(1);

  const tabs = [
    { id: "details", label: "details" },
    { id: "reviews", label: `Reviews (${product.reviews})` },
    { id: "questions", label: "Questions and answers" },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-10 py-10">
      {/* --- TOP SECTION: Product Info --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side: Main Image and Gallery Thumbnails */}
        <div className="space-y-4">
          <div className="bg-gray-100 p-8 rounded-xl flex items-center justify-center relative w-full h-[400px]">
            {/* নোটিফিকেশন: প্যারেন্ট ডিভে একটি নির্দিষ্ট হাইট (যেমন h-[400px] বা h-96) দেওয়া জরুরি, নাহলে fill কাজ করবে না */}

            <Image
              fill
              src={product.img}
              alt={product.title}
              sizes="(max-width: 768px) 100vw, 350px"
              priority
              className="w-full h-full rounded-lg object-cover"
            />
          </div>

          {/* Thumbnails (ডিজাইন অক্ষুণ্ণ রাখতে প্রথম কোডের মতো গ্রিড ফিরিয়ে আনা হয়েছে) */}
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-gray-100 p-2 rounded-lg border hover:border-green-500 cursor-pointer overflow-hidden h-20 flex items-center justify-center"
              >
                <img
                  src={product.img}
                  alt="Thumbnail"
                  className="object-cover h-full w-full rounded"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Product Details Text */}
        <div className="space-y-5">
          <div className="flex justify-between">
            <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded border border-green-200 font-semibold">
              ✓ In stock
            </span>
            <Heart className="text-gray-400 cursor-pointer hover:text-red-500 transition-colors" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 leading-tight">
            {product.title}
          </h1>

          <div className="flex items-center gap-3 text-sm text-gray-500">
            <div className="flex text-yellow-400 items-center">
              <Star size={16} fill="currentColor" />
              <span className="text-gray-700 font-semibold ml-1">
                {product.rating}
              </span>
            </div>
            <span>
              ({product.reviews} reviews) | {product.sold} |{" "}
              <button className="text-gray-600 underline">Share</button>
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-green-600">
              ৳{product.price}
            </span>
            <span className="text-xl text-gray-400 line-through">
              ৳{product.oldPrice}
            </span>
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold">
              {product.discount}
            </span>
          </div>

          <div className="border border-green-100 bg-green-50/50 p-4 rounded-lg space-y-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Truck size={18} className="text-green-600" /> Delivery in Dhaka:
              24-48 hours
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-green-600" /> 100% Original
              Product Guarantee
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw size={18} className="text-green-600" /> 7-day return
              policy
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span>Quantity:</span>
            <div className="flex items-center border rounded-full bg-white">
              <Button
                variant="ghost"
                className="rounded-full"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                <Minus size={16} />
              </Button>
              <span className="px-4 font-bold">{quantity}</span>
              <Button
                variant="ghost"
                className="rounded-full"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                <Plus size={16} />
              </Button>
            </div>
            <span className="text-gray-500 text-sm">(123 in stock)</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              asChild
              variant="outline"
              className="h-12 border-green-600 text-green-600 hover:bg-green-50 font-bold"
            >
              <Link href="/Pages/ShopingCards">
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to cart
              </Link>
            </Button>
            <Button
              asChild
              className="h-12 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl"
            >
              <Link href="/Pages/OrderConfirm">Buy Now</Link>
            </Button>
          </div>
        </div>
      </div>
      <Deteals></Deteals>
    </div>
  );
};

export default DetailsPage;
