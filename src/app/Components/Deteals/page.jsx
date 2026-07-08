"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, Star } from "lucide-react";

// আপডেট করা প্রোডাক্ট ডেটা অ্যারে (সব ডাটা এর ভেতরেই ইনক্লুড করা হয়েছে)
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

const Deteals = () => {
  const params = useParams();
  const [activeTab, setActiveTab] = useState("details");

  // URL আইডি থেকে কারেন্ট প্রোডাক্ট অবজেক্ট ফিল্টার করা (ডাটা না মিললে ডিফল্ট ১ম প্রোডাক্ট)
  const product =
    productsData.find((p) => p.id === Number(params?.id)) || productsData[0];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* --- ট্যাব বাটন সেকশন --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => setActiveTab("details")}
          className={`py-4 rounded-lg font-bold transition-all ${activeTab === "details" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
        >
          details
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`py-4 rounded-lg font-bold transition-all ${activeTab === "reviews" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
        >
          Reviews ({product.reviews})
        </button>
        <button
          onClick={() => setActiveTab("questions")}
          className={`py-4 rounded-lg font-bold transition-all ${activeTab === "questions" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
        >
          Questions and answers
        </button>
      </div>

      {/* --- কন্টেন্ট এরিয়া --- */}
      <Card>
        <CardContent className="pt-6">
          {/* Details Content (Fully Dynamic) */}
          {activeTab === "details" && (
            <div className="space-y-8">
              <div>
                <h3 className="font-bold text-xl mb-4">Product Description</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>

                <h4 className="font-bold mb-2">Key Features:</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  {product.features?.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-bold text-xl mb-4">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span>Category</span>{" "}
                    <span className="font-bold">
                      {product.specifications?.category}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Fit Type</span>{" "}
                    <span className="font-bold">
                      {product.specifications?.fitType}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Material</span>{" "}
                    <span className="font-bold">
                      {product.specifications?.material}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Rating</span>{" "}
                    <span className="font-bold">
                      {product.specifications?.rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reviews Content (Fully Dynamic) */}
          {activeTab === "reviews" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-b pb-8">
                <div className="text-center">
                  <div className="text-6xl font-bold">{product.rating}</div>
                  <div className="flex justify-center text-yellow-400 my-2">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} size={20} fill="currentColor" />
                    ))}
                  </div>
                  <div className="text-gray-500">
                    {product.reviews} verified reviews
                  </div>
                </div>
                <div className="space-y-2 w-full">
                  {[5, 4, 3, 2, 1].map((s) => (
                    <div key={s} className="flex items-center gap-3 text-sm">
                      <span className="w-2">{s}</span>
                      <div className="flex-1 h-3 bg-gray-100 rounded-full">
                        <div
                          className="h-full bg-yellow-400 rounded-full"
                          style={{
                            width: s === 5 ? "80%" : s === 4 ? "15%" : "5%",
                          }}
                        ></div>
                      </div>
                      <span className="w-12 text-right text-gray-500">
                        {s === 5 ? "80%" : s === 4 ? "15%" : "5%"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Reviews List */}
              <div className="space-y-6">
                {product.reviewsList?.map((rev, i) => (
                  <div key={i} className="border-b pb-6">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                          {rev.user[0]}
                        </div>
                        <div>
                          <p className="font-bold">{rev.user}</p>
                          <div className="flex text-yellow-400">
                            {Array.from({ length: rev.rating }).map(
                              (_, idx) => (
                                <Star key={idx} size={12} fill="currentColor" />
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">{rev.time}</span>
                    </div>
                    <p className="text-gray-600">{rev.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Questions Content (Fully Dynamic) */}
          {activeTab === "questions" && (
            <div className="space-y-4">
              {product.questionsList?.map((q, i) => (
                <div
                  key={i}
                  className="p-4 border rounded-lg flex justify-between items-center hover:bg-gray-50 cursor-pointer"
                >
                  <span className="font-medium text-gray-700">{q}</span>
                  <ChevronDown className="text-gray-400" />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Deteals;
