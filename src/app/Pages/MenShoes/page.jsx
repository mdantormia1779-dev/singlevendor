import React from "react";
import { ChevronDown } from "lucide-react";
import Card from "@/app/Components/Shared/Card/Card";
import SidebarFilter from "@/app/Components/SidebarFilter/SidebarFilter";
import NoProducts from "../NoProducts/NoProducts";
import products from "@/app/data/data.json";

const AllPages = () => {
  const categories = [
    { name: "Fashion", count: 12 },
    { name: "Electronics", count: 12 },
    { name: "Home & Living", count: 12 },
    { name: "Beauty", count: 12 },
    { name: "grocery", count: 12 },
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      {/* Top Green Border */}
      <div className="h-2 bg-[#10b981]"></div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-5xl font-bold tracking-tight text-slate-900">
              Men's Shoes
            </h1>
            <p className="text-sm text-slate-500 mt-1">12 products found</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="flex items-center justify-between w-32 px-3 py-2 bg-white border border-slate-200 rounded-md text-sm shadow-sm hover:bg-slate-50 transition-colors">
              <span>popular</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Reusable Sidebar Component */}
          <SidebarFilter categories={categories} />

          {/* Products Grid */}
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

export default AllPages;
