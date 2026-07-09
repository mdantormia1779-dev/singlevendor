"use client";

import React, { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import Card from "@/app/Components/Shared/Card/Card";
import SidebarFilter from "@/app/Components/SidebarFilter/SidebarFilter";
import NoProducts from "../NoProducts/NoProducts";
import products from "@/app/data/data.json";

const AllPages = () => {
  // data.json থেকে real max price বের করা হচ্ছে (dynamic)
  const MAX_PRICE = useMemo(() => {
    const prices = products.map((p) => Number(p.price));
    return Math.max(...prices, 0);
  }, []);

  // data.json থেকে real category + count বের করা হচ্ছে (dynamic)
  const categories = useMemo(() => {
    const counts = {};
    products.forEach((p) => {
      const cat = p.specifications?.category || "Others";
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, []);

  // ---- Search: live (Apply এর দরকার নাই) ----
  const [searchTerm, setSearchTerm] = useState("");

  // ---- DRAFT states: sidebar এ click করলে এগুলা বদলায় (UI তে দেখা যায়) ----
  const [priceDraft, setPriceDraft] = useState(MAX_PRICE);
  const [categoryDraft, setCategoryDraft] = useState(null); // single-select
  const [ratingDraft, setRatingDraft] = useState(null); // single-select

  // ---- APPLIED states: শুধু "Apply Filter" চাপলে draft থেকে এখানে কপি হয়, actual filtering এগুলা দিয়েই হয় ----
  const [appliedPrice, setAppliedPrice] = useState(MAX_PRICE);
  const [appliedCategory, setAppliedCategory] = useState(null);
  const [appliedRating, setAppliedRating] = useState(null);

  const [sortOption, setSortOption] = useState("popular");

  // Draft toggle: একই জিনিসে ২য়বার click করলে unselect, নতুনটাতে click করলে replace (single-select)
  const toggleCategoryDraft = (name) => {
    setCategoryDraft((prev) => (prev === name ? null : name));
  };

  const toggleRatingDraft = (star) => {
    setRatingDraft((prev) => (prev === star ? null : star));
  };

  const handlePriceReset = () => setPriceDraft(MAX_PRICE);

  // Apply Filter বাটনে চাপ দিলেই draft → applied এ কপি হবে, তখনই product list filter হবে
  const handleApply = () => {
    setAppliedPrice(priceDraft);
    setAppliedCategory(categoryDraft);
    setAppliedRating(ratingDraft);
  };

  // Clear করলে draft + applied দুইটাই reset হবে
  const handleClear = () => {
    setSearchTerm("");
    setPriceDraft(MAX_PRICE);
    setCategoryDraft(null);
    setRatingDraft(null);
    setAppliedPrice(MAX_PRICE);
    setAppliedCategory(null);
    setAppliedRating(null);
  };

  // ---- Filtering: শুধু applied states ব্যবহার হচ্ছে (search বাদে) ----
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const price = Number(p.price);
      const rating = parseFloat(p.rating);

      const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = price <= appliedPrice;
      const matchesCategory =
        !appliedCategory || p.specifications?.category === appliedCategory;
      const matchesRating = !appliedRating || rating >= appliedRating;

      return matchesSearch && matchesPrice && matchesCategory && matchesRating;
    });
  }, [searchTerm, appliedPrice, appliedCategory, appliedRating]);

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortOption === "price-low") return list.sort((a, b) => Number(a.price) - Number(b.price));
    if (sortOption === "price-high") return list.sort((a, b) => Number(b.price) - Number(a.price));
    if (sortOption === "rating") return list.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    return list; // popular = default order
  }, [filteredProducts, sortOption]);

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      {/* Top Green Border */}
      <div className="h-2 bg-[#10b981]"></div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-5xl font-bold tracking-tight text-slate-900">
              Fashion
            </h1>
            <p className="text-sm text-slate-500 mt-1">{sortedProducts.length} products found</p>
          </div>
          <div className="mt-4 md:mt-0">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none flex items-center justify-between w-32 px-3 py-2 bg-white border border-slate-200 rounded-md text-sm shadow-sm hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <option value="popular">popular</option>
              <option value="price-low">Price: Low</option>
              <option value="price-high">Price: High</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Reusable Sidebar Component */}
          <SidebarFilter
            categories={categories}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            maxPrice={MAX_PRICE}
            priceDraft={priceDraft}
            onPriceChange={setPriceDraft}
            onPriceReset={handlePriceReset}
            selectedCategories={categoryDraft ? [categoryDraft] : []}
            onCategoryToggle={toggleCategoryDraft}
            selectedRatings={ratingDraft ? [ratingDraft] : []}
            onRatingToggle={toggleRatingDraft}
            onApply={handleApply}
            onClear={handleClear}
          />

          {/* Products Grid */}
          <div className="flex-1">
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
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

export default AllPages;