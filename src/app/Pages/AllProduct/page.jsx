"use client";

import React, { useState, useMemo, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Card from "@/app/Components/Shared/Card/Card";
import SidebarFilter from "@/app/Components/SidebarFilter/SidebarFilter";
import NoProducts from "../NoProducts/NoProducts";
import gsap from "gsap";

function AllProductsContent() {
  const searchParams = useSearchParams();
  const urlSearch = searchParams.get("search") || "";
  const urlCategory = searchParams.get("category") || "";

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const gridRef = useRef(null);

  // Fetch real products from Prisma API
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.products) {
          setProducts(data.products);
        }
      })
      .catch((err) => console.error("Prisma products fetch error:", err))
      .finally(() => setIsLoading(false));
  }, []);

  // GSAP animations when products or filters change
  useEffect(() => {
    if (!isLoading && gridRef.current && gridRef.current.children.length > 0) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 25, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "power3.out",
        }
      );
    }
  }, [isLoading, products]);

  // Dynamic max price
  const MAX_PRICE = useMemo(() => {
    if (products.length === 0) return 10000;
    const prices = products.map((p) => Number(p.price));
    return Math.max(...prices, 10000);
  }, [products]);

  // Dynamic categories with live count
  const categories = useMemo(() => {
    const counts = {};
    products.forEach((p) => {
      const cat = p.category || "Fashion";
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [products]);

  // Filter states
  const [searchTerm, setSearchTerm] = useState(urlSearch);
  const [priceDraft, setPriceDraft] = useState(MAX_PRICE);
  const [selectedCategories, setSelectedCategories] = useState(
    urlCategory ? [urlCategory] : []
  );
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [sortOption, setSortOption] = useState("popular");

  // Handlers
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

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const price = Number(p.price);
      const rating = parseFloat(p.rating || 0);
      const prodCategory = p.category || "Fashion";

      // Search match
      const matchesSearch =
        !searchTerm.trim() ||
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        prodCategory.toLowerCase().includes(searchTerm.toLowerCase());

      // Price match
      const matchesPrice = price <= priceDraft;

      // Category match
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(prodCategory);

      // Rating match
      const matchesRating =
        selectedRatings.length === 0 ||
        selectedRatings.some((minRating) => rating >= minRating);

      return matchesSearch && matchesPrice && matchesCategory && matchesRating;
    });
  }, [products, searchTerm, priceDraft, selectedCategories, selectedRatings]);

  // Sorted products
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
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              All Products
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {isLoading
                ? "Loading products from database..."
                : `${sortedProducts.length} ${sortedProducts.length === 1 ? "product" : "products"} available`}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              Sort by:
            </span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-emerald-500 shadow-xs cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Sidebar Filter */}
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

          {/* Product Grid Area */}
          <div className="grow w-full">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="bg-white rounded-2xl p-4 border border-gray-100 animate-pulse space-y-4">
                    <div className="bg-gray-200 h-56 rounded-xl w-full" />
                    <div className="h-4 bg-gray-200 rounded-md w-3/4" />
                    <div className="h-4 bg-gray-200 rounded-md w-1/2" />
                    <div className="h-8 bg-gray-200 rounded-xl w-full" />
                  </div>
                ))}
              </div>
            ) : sortedProducts.length === 0 ? (
              <NoProducts onReset={handleClearAll} />
            ) : (
              <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <Card key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AllProductPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading catalog...</div>}>
      <AllProductsContent />
    </Suspense>
  );
}