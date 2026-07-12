"use client"; // যেহেতু এখানে useState ব্যবহার করছি, তাই এটি ক্লায়েন্ট কম্পোনেন্ট হতে হবে

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Card from "@/app/Components/Shared/Card/Card";
import SidebarFilter from "@/app/Components/SidebarFilter/SidebarFilter";
import NoProducts from "../NoProducts/NoProducts";
import products from "@/app/data/data.json";

const Electronics = () => {
  // ১. প্রয়োজনীয় স্টেটগুলো তৈরি করুন
  const [searchTerm, setSearchTerm] = useState("");
  const [priceDraft, setPriceDraft] = useState(50000); // আপনার সর্বোচ্চ দাম অনুযায়ী সেট করুন
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  const categories = [
    { name: "Fashion", count: 12 },
    { name: "Electronics", count: 12 },
    { name: "Home & Living", count: 12 },
    { name: "Beauty", count: 12 },
    { name: "grocery", count: 12 },
  ];

  // হ্যান্ডলার ফাংশনগুলো
  const handleCategoryToggle = (name) => {
    setSelectedCategories(prev => 
      prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]
    );
  };

  const handleRatingToggle = (rating) => {
    setSelectedRatings(prev => 
      prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      <div className="bg-[#10b981]"></div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-5xl font-bold tracking-tight text-slate-900">Electronics</h1>
            <p className="text-sm text-slate-500 mt-1">12 products found</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ২. সব প্রপস এখানে পাস করুন */}
          <SidebarFilter 
            categories={categories}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            maxPrice={100000} // সর্বোচ্চ দাম
            priceDraft={priceDraft}
            onPriceChange={setPriceDraft}
            onPriceReset={() => setPriceDraft(100000)}
            selectedCategories={selectedCategories}
            onCategoryToggle={handleCategoryToggle}
            selectedRatings={selectedRatings}
            onRatingToggle={handleRatingToggle}
            onApply={() => console.log("Applied")}
            onClear={() => {
                setSearchTerm("");
                setPriceDraft(100000);
                setSelectedCategories([]);
                setSelectedRatings([]);
            }}
          />

          <div className="flex-1">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Card key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <NoProducts />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Electronics;