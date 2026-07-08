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

// প্রোডাক্ট ডেটা অ্যারে
const productsData = [
  {
    id: 1,
    title: "Beige White Jeans with Brown Shirt -Casual Men's Outfit",
    price: "২,৪৯৯",
    oldPrice: "৩,৯৯৯",
    rating: "4.8",
    reviews: "342",
    sold: "1240 sold",
    discount: "30% OFF",
    img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&q=80",
    // শুধুমাত্র ডিটেইলস পেজের জন্য ডাটা
    description:
      "Get maximum comfort and style with the Beige White Jeans with Brown Shirt combo. This outfit is crafted from premium quality fabrics, tailored perfectly for contemporary casual wear and everyday styling.",
    features: [
      "Premium quality comfortable fabric",
      "Trendy and modern casual design",
      "Durable stitching for long-lasting use",
      "Easy to wash and maintain color quality",
    ],
    specifications: {
      category: "Men's Fashion",
      fitType: "Regular/Casual Cool",
      material: "Premium Cotton Blend",
      rating: "4.8 / 5.0",
    },
    reviewsList: [
      {
        user: "Rahat Khan",
        text: "The fitting is perfect and the fabric quality feels very premium. Highly recommended!",
        rating: 5,
        time: "2 days ago",
      },
      {
        user: "Asif Iqbal",
        text: "Great color combination. Looks exactly like the picture.",
        rating: 5,
        time: "3 days ago",
      },
      {
        user: "Tanvir Ahmed",
        text: "Good product according to the price tag. Happy with the purchase.",
        rating: 4,
        time: "1 week ago",
      },
    ],
    questionsList: [
      "Is the size chart accurate for this outfit?",
      "Will the fabric color fade after multiple washes?",
      "Is there a return/exchange policy if it doesn't fit?",
    ],
  },
  {
    id: 2,
    title: "Complete Your Look_ Denim & Sneakers Essentials",
    price: "২,৪৯৯",
    oldPrice: "৩,৯৯৯",
    rating: "4.7",
    reviews: "128",
    sold: "1240 sold",
    discount: "30% OFF",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&q=80",
    description:
      "Upgrade your street style with our Denim & Sneakers Essentials combo. Perfect for weekend hangouts and smart-casual setups.",
    features: [
      "Heavyweight premium denim",
      "Soft inner lining for comfort",
      "Versatile styling options",
    ],
    specifications: {
      category: "Men's Clothing",
      fitType: "Slim Fit",
      material: "100% Cotton Denim",
      rating: "4.7 / 5.0",
    },
    reviewsList: [
      {
        user: "Sajid Hasan",
        text: "Awesome denim quality! Feels rugged yet very comfortable.",
        rating: 5,
        time: "1 day ago",
      },
      {
        user: "Naimur R.",
        text: "Sneakers fit perfectly, denim is slightly long but quality is top notch.",
        rating: 4,
        time: "5 days ago",
      },
    ],
    questionsList: [
      "Are the sneakers slip-resistant?",
      "Can I change the sneaker size separately?",
    ],
  },
  {
    id: 3,
    title: "Combo Complete Your Look_ Denim & Sneakers Essentials",
    price: "২,৪৯৯",
    oldPrice: "৩,৯৯৯",
    rating: "4.8",
    reviews: "342",
    sold: "1240 sold",
    discount: "30% OFF",
    img: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=500&q=80",
    description:
      "The ultimate casual clothing package. Features high durability items that form a perfect baseline for any wardrobe.",
    features: [
      "Curated lifestyle combo",
      "Breathable fabric engineering",
      "Colorfast assurance",
    ],
    specifications: {
      category: "Combo Packs",
      fitType: "Standard Fit",
      material: "Mixed Cotton/Polyester",
      rating: "4.8 / 5.0",
    },
    reviewsList: [
      {
        user: "User 3A",
        text: "Satisfied with this package!",
        rating: 5,
        time: "A week ago",
      },
    ],
    questionsList: [
      "Is cash on delivery available outside Dhaka for this combo?",
    ],
  },
  {
    id: 4,
    title: "Premium Winter Jacket - Waterproof and Stylish",
    price: "২,৪৯৯",
    oldPrice: "৩,৯৯৯",
    rating: "4.9",
    reviews: "512",
    sold: "1240 sold",
    discount: "30% OFF",
    img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80",
    description:
      "Beat the winter cold without sacrificing your style. This premium jacket offers full windproof and waterproof capability.",
    features: [
      "Water-resistant outer shell",
      "Warm quilted inner padding",
      "Detachable hood system",
    ],
    specifications: {
      category: "Outerwear",
      fitType: "Regular Fit",
      material: "Premium Polyester & Fleece",
      rating: "4.9 / 5.0",
    },
    reviewsList: [
      {
        user: "Zeeshan",
        text: "Keeps very warm. Testing it in cold weather and it works beautifully.",
        rating: 5,
        time: "Yesterday",
      },
    ],
    questionsList: ["Is it suitable for heavy rainfall or just light drizzle?"],
  },
  {
    id: 5,
    title: "Manfinity CasualCool Men Solid Color Casual Overcoat,",
    price: "২,৪৯৯",
    oldPrice: "৩,৯৯৯",
    rating: "4.6",
    reviews: "94",
    sold: "1240 sold",
    discount: "30% OFF",
    img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&q=80",
    description:
      "A sleek solid overcoat that brings out a formal yet casual cool demeanor. Best paired with turtle necks or solid tees.",
    features: [
      "Elegant long-line cutting",
      "Dual side functional pockets",
      "Premium button closures",
    ],
    specifications: {
      category: "Overcoats",
      fitType: "Relaxed Fit",
      material: "Woolen Blend",
      rating: "4.6 / 5.0",
    },
    reviewsList: [
      {
        user: "Mahdi",
        text: "Gives a very premium look. Perfect for formal winter nights.",
        rating: 5,
        time: "4 days ago",
      },
    ],
    questionsList: ["Does it require dry cleaning?"],
  },
  {
    id: 6,
    title: "Manfinity CasualCool Men's Casual Button-Front Drop",
    price: "২,৪৯৯",
    oldPrice: "৩,৯৯৯",
    rating: "4.8",
    reviews: "342",
    sold: "1240 sold",
    discount: "30% OFF",
    img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&q=80",
    description:
      "Drop shoulder casual button-front shirt for relaxed vibes. Designed specifically for the youth lifestyle.",
    features: [
      "Drop shoulder relaxed cut",
      "Lightweight breathable design",
      "Trendy street style pattern",
    ],
    specifications: {
      category: "Shirts",
      fitType: "Oversized Fit",
      material: "100% Fine Cotton",
      rating: "4.8 / 5.0",
    },
    reviewsList: [
      {
        user: "Imran",
        text: "The oversized look is superb. The cloth is very soft.",
        rating: 5,
        time: "2 days ago",
      },
    ],
    questionsList: [
      "Should I buy my regular size or size down for this oversized shirt?",
    ],
  },
];

const DetailsPage = () => {
  const params = useParams();

  // URL এর ID অনুযায়ী ডাটা ম্যাচিং
  const product =
    productsData.find((p) => p.id === Number(params.id)) || productsData[0];

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
