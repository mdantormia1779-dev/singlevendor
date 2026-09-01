"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Card from "@/app/Components/Shared/Card/Card";
import SidebarFilter from "@/app/Components/SidebarFilter/SidebarFilter";
import NoProducts from "../NoProducts/NoProducts";
import gsap from "gsap";

const GADGET_KEYWORDS = ["Gadget", "Smart", "Watch", "AirPods", "Earphone", "Headphone", "Speaker", "Camera", "Electronic"];

export default function GadgetsPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const gridRef = useRef(null);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.products) {
          setAllProducts(data.products);
        }
      })
      .catch((err) => console.error("Gadgets products fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  const baseList = useMemo(() => {
    const matched = allProducts.filter((p) => {
      const cat = (p.category || "").toLowerCase();
      const title = (p.title || "").toLowerCase();
      return GADGET_KEYWORDS.some(
        (kw) => cat.includes(kw.toLowerCase()) || title.includes(kw.toLowerCase())
      );
    });
    return matched.length > 0 ? matched : allProducts.slice(0, 6);
  }, [allProducts]);

  // GSAP animation
  useEffect(() => {
    if (!loading && gridRef.current && gridRef.current.children.length > 0) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 25, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.06, ease: "power3.out" }
      );
    }
  }, [loading, baseList]);

  const MAX_PRICE = useMemo(() => {
    if (baseList.length === 0) return 10000;
    const prices = baseList.map((p) => Number(p.price));
    return Math.max(...prices, 10000);
  }, [baseList]);

  const categories = useMemo(() => {
    const counts = {};
    baseList.forEach((p) => {
      const cat = p.category || "Gadgets";
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [baseList]);

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
    return baseList.filter((p) => {
      const price = Number(p.price);
      const rating = parseFloat(p.rating || 0);

      const matchesSearch =
        !searchTerm.trim() ||
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesPrice = price <= priceDraft;
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(p.category);
      const matchesRating =
        selectedRatings.length === 0 ||
        selectedRatings.some((minRating) => rating >= minRating);

      return matchesSearch && matchesPrice && matchesCategory && matchesRating;
    });
  }, [baseList, searchTerm, priceDraft, selectedCategories, selectedRatings]);

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
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Smart Gadgets
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {loading ? "Loading gadgets catalog..." : `${sortedProducts.length} items found`}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 font-medium">Sort by:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold shadow-xs focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="popular">Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:w-72 shrink-0">
            <SidebarFilter
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoryToggle={handleCategoryToggle}
              priceValue={priceDraft}
              onPriceChange={setPriceDraft}
              maxPrice={MAX_PRICE}
              selectedRatings={selectedRatings}
              onRatingToggle={handleRatingToggle}
              onClearAll={handleClearAll}
            />
          </div>

          <div className="grow w-full">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 animate-pulse space-y-4">
                    <div className="bg-gray-200 h-56 rounded-xl w-full" />
                    <div className="h-4 bg-gray-200 rounded-md w-3/4" />
                    <div className="h-8 bg-gray-200 rounded-xl w-full" />
                  </div>
                ))}
              </div>
            ) : sortedProducts.length > 0 ? (
              <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
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