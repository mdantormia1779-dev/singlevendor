"use client";

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Heart, Truck, ShieldCheck, RotateCcw, Minus, Plus, 
  ShoppingCart, Star, Share2, ChevronDown 
} from "lucide-react";
import Deteals from '@/app/Components/Deteals/page';

const DetailsPage = () => {
  const [activeTab, setActiveTab] = useState("details");

  const tabs = [
    { id: "details", label: "details" },
    { id: "reviews", label: "Reviews (3)" },
    { id: "questions", label: "Questions and answers" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-10">
      
      {/* --- TOP SECTION: Product Info --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="bg-gray-100 p-8 rounded-xl flex items-center justify-center relative">
            <img src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-silver-202011?wid=940&hei=1112&fmt=png-alpha&qlt=95&.v=1603925964000" alt="Product" className="w-full max-w-sm" />
            <Heart className="absolute top-4 right-4 text-gray-400 cursor-pointer" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1,2,3,4].map(i => <div key={i} className="bg-gray-100 p-2 rounded-lg border hover:border-green-500 cursor-pointer"><img src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-silver-202011?wid=940&hei=1112&fmt=png-alpha&qlt=95&.v=1603925964000" alt="Thumbnail" /></div>)}
          </div>
        </div>

        <div className="space-y-5">
          <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded border border-green-200 font-semibold">✓ In stock</span>
          <h1 className="text-3xl font-bold">Premium Wireless Headphones - Noise Cancelling</h1>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <div className="flex text-yellow-400"><Star size={16} fill="currentColor"/>...</div>
            <span>4.5 (892 reviews) | 4,120 sold | <button className="text-gray-600 underline">Share</button></span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-green-600">৳2,499</span>
            <span className="text-xl text-gray-400 line-through">৳4,999</span>
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold">50% discount</span>
          </div>
          
          <div className="border border-green-100 bg-green-50/50 p-4 rounded-lg space-y-3 text-sm">
            <div className="flex items-center gap-2"><Truck size={18} className="text-green-600"/> Delivery in Dhaka: 24-48 hours</div>
            <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-green-600"/> 100% Original Product Guarantee</div>
            <div className="flex items-center gap-2"><RotateCcw size={18} className="text-green-600"/> 7-day return policy</div>
          </div>

          <div className="flex items-center gap-4">
            <span>Quantity:</span>
            <div className="flex items-center border rounded-full">
              <Button variant="ghost" className="rounded-full"><Minus size={16}/></Button>
              <span className="px-4 font-bold">1</span>
              <Button variant="ghost" className="rounded-full"><Plus size={16}/></Button>
            </div>
            <span className="text-gray-500 text-sm">(123 in stock)</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-12 border-green-600 text-green-600 hover:bg-green-50"><ShoppingCart className="mr-2"/> Add to cart</Button>
            <Button className="h-12 bg-green-600 hover:bg-green-700 text-white">Buy Now</Button>
          </div>
        </div>
      </div>

      <Deteals/>
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-4 rounded-lg font-bold transition-all ${
              activeTab === tab.id ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <Card>
        <CardContent className="pt-6">
          {activeTab === "details" && <p className="text-gray-600">Product details and specifications content goes here...</p>}
          {activeTab === "reviews" && <p className="text-gray-600">Customer reviews list goes here...</p>}
          {activeTab === "questions" && (
            <div className="space-y-3">
              {["Is this product original?", "How long will it take to receive delivery?", "Do you have warranty?"].map((q, i) => (
                <div key={i} className="flex justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <span className="font-medium">{q}</span>
                  <ChevronDown className="text-gray-400" />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card> */}
    </div>
  );
};

export default DetailsPage;