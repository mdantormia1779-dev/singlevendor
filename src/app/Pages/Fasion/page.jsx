"use client";

import React, { useState, useMemo } from "react";
import Card from "@/app/Components/Shared/Card/Card";
import SidebarFilter from "@/app/Components/SidebarFilter/SidebarFilter";
import NoProducts from "../NoProducts/NoProducts";
import productsData from "@/app/data/data.json";

// Fashion keywords/categories
const FASHION_KEYWORDS = ["Fashion", "Clothing", "Outerwear", "Winterwear", "Jeans", "Shirt", "Dress", "Outfit"];

export default function FashionPage() {
  const fashionProducts = useMemo(() => {
    return productsData.filter((p) => {
      const cat = p.specifications?.category || "";
      return FASHION_KEYWORDS.some((kw) => cat.toLowerCase().includes(kw.toLowerCase()) || p.title.toLowerCase().includes(kw.toLowerCase()));
    });
  }, []);

  const MAX_PRICE = useMemo(() => {
    const prices = fashionProducts.map((p) => Number(p.price));
    return Math.max(...prices, 10000);
  }, [fashionProducts]);

  const categories = useMemo(() => {
    const counts = {};
    fashionProducts.forEach((p) => {
      const cat = p.specifications?.category || "Fashion";
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [fashionProducts]);

  const [searchTerm, setSearchTerm] = useState("");
  const [priceDraft, setPriceDraft] = useState(MAX_PRICE);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [sortOption, setSortOption] = useState("popular");

  const handleCategoryToggle = (name) => {
    setSelectedCategories((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

  const handleRatingToggle = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    );
  };

  const handleClearAll = () => {
    setSearchTerm("");
    setPriceDraft(MAX_PRICE);
    setSelectedCategories([]);
    setSelectedRatings([]);
    setSortOption("popular");
  };

  const filteredProducts = useMemo(() => {
    return fashionProducts.filter((p) => {
      const price = Number(p.price);
      const rating = parseFloat(p.rating || 0);

      const matchesSearch =
        !searchTerm.trim() ||
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPrice = price <= priceDraft;
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(p.specifications?.category);
      const matchesRating =
        selectedRatings.length === 0 ||
        selectedRatings.some((minRating) => rating >= minRating);

      return matchesSearch && matchesPrice && matchesCategory && matchesRating;
    });
  }, [fashionProducts, searchTerm, priceDraft, selectedCategories, selectedRatings]);

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortOption === "price-low") return list.sort((a, b) => Number(a.price) - Number(b.price));
    if (sortOption === "price-high") return list.sort((a, b) => Number(b.price) - Number(a.price));
    if (sortOption === "rating") return list.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    return list;
  }, [filteredProducts, sortOption]);

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
              Fashion Collection
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {sortedProducts.length} {sortedProducts.length === 1 ? "product" : "products"} found
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 font-medium">Sort by:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium shadow-xs focus:outline-none focus:ring-2 focus:ring-[#10b981] cursor-pointer"
            >
              <option value="popular">Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <SidebarFilter
            categories={categories}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            maxPrice={MAX_PRICE}
            priceDraft={priceDraft}
            onPriceChange={setPriceDraft}
            onPriceReset={() => setPriceDraft(MAX_PRICE)}
            selectedCategories={selectedCategories}
            onCategoryToggle={handleCategoryToggle}
            selectedRatings={selectedRatings}
            onRatingToggle={handleRatingToggle}
            onApply={() => {}}
            onClear={handleClearAll}
          />

          <div className="flex-1 w-full">
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <Card key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <NoProducts onReset={handleClearAll} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}