"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, Star } from "lucide-react";

// 🔥 পরিবর্তন: সরাসরি প্যারেন্ট থেকে একক product অবজেক্ট নেওয়া হচ্ছে
const Deteals = ({ product }) => {
  const [activeTab, setActiveTab] = useState("details");

  // সেফটি চেক
  if (!product) {
    return <div className="text-center py-10 text-gray-500">No details available.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* --- ট্যাব বাটন সেকশন --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => setActiveTab("details")}
          className={`py-4 rounded-lg font-bold transition-all capitalize ${
            activeTab === "details"
              ? "bg-emerald-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Details
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`py-4 rounded-lg font-bold transition-all capitalize ${
            activeTab === "reviews"
              ? "bg-emerald-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Reviews ({product.reviews || 0})
        </button>
        <button
          onClick={() => setActiveTab("questions")}
          className={`py-4 rounded-lg font-bold transition-all capitalize ${
            activeTab === "questions"
              ? "bg-emerald-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Questions and Answers
        </button>
      </div>

      {/* --- কন্টেন্ট এরিয়া --- */}
      <Card>
        <CardContent className="pt-6">
          {/* Details Content */}
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
                    <span>Category</span>
                    <span className="font-bold">{product.specifications?.category || "N/A"}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Fit Type</span>
                    <span className="font-bold">{product.specifications?.fitType || "N/A"}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Material</span>
                    <span className="font-bold">{product.specifications?.material || "N/A"}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Rating</span>
                    <span className="font-bold">{product.specifications?.rating || product.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reviews Content */}
          {activeTab === "reviews" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-b pb-8">
                <div className="text-center">
                  <div className="text-6xl font-bold">{product.rating}</div>
                  <div className="flex justify-center text-yellow-400 my-2">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        size={20}
                        fill={idx < Math.round(Number(product.rating || 0)) ? "currentColor" : "none"}
                        className={idx < Math.round(Number(product.rating || 0)) ? "text-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <div className="text-gray-500">{product.reviews} verified reviews</div>
                </div>
                <div className="space-y-2 w-full">
                  {[5, 4, 3, 2, 1].map((s) => (
                    <div key={s} className="flex items-center gap-3 text-sm">
                      <span className="w-2">{s}</span>
                      <div className="flex-1 h-3 bg-gray-100 rounded-full">
                        <div
                          className="h-full bg-yellow-400 rounded-full"
                          style={{ width: s === 5 ? "80%" : s === 4 ? "15%" : "5%" }}
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
                {product.reviewsList && product.reviewsList.length > 0 ? (
                  product.reviewsList.map((rev, i) => (
                    <div key={i} className="border-b pb-6 last:border-b-0">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500 uppercase">
                            {rev.user ? rev.user[0] : "?"}
                          </div>
                          <div>
                            <p className="font-bold">{rev.user}</p>
                            <div className="flex text-yellow-400">
                              {Array.from({ length: 5 }).map((_, idx) => (
                                <Star
                                  key={idx}
                                  size={12}
                                  fill={idx < rev.rating ? "currentColor" : "none"}
                                  className={idx < rev.rating ? "text-yellow-400" : "text-gray-300"}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-400">{rev.time}</span>
                      </div>
                      <p className="text-gray-600">{rev.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No reviews yet for this product.</p>
                )}
              </div>
            </div>
          )}

          {/* Questions Content */}
          {activeTab === "questions" && (
            <div className="space-y-4">
              {product.questionsList && product.questionsList.length > 0 ? (
                product.questionsList.map((q, i) => (
                  <div
                    key={i}
                    className="p-4 border rounded-lg flex justify-between items-center hover:bg-gray-50 cursor-pointer"
                  >
                    <span className="font-medium text-gray-700">{q}</span>
                    <ChevronDown className="text-gray-400" />
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No questions asked yet.</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Deteals;