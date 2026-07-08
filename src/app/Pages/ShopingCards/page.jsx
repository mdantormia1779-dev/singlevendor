"use client";

import EmptyCard from "@/app/Components/EmptyCard/EmptyCard";
import { ShoppingBag, ArrowRight } from "lucide-react";

const ShopingCardsPage = () => {
  return (
    <section className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h1 className="text-5xl font-bold text-gray-900">Shopping Cart</h1>

          <p className="mt-3 text-xl text-gray-500">0 items in your cart</p>
        </div>
      </div>

      <EmptyCard></EmptyCard>
    </section>
  );
};

export default ShopingCardsPage;
