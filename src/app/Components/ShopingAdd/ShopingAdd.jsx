"use client"; // যেহেতু স্টেট ব্যবহার করছি, তাই এটি ক্লায়েন্ট কম্পোনেন্ট হতে হবে

import React, { useState } from "react";
import Image from "next/image";
import { Trash2, Plus, Minus } from "lucide-react";

const ShopingAdd = ({ item }) => {
  // কোয়ান্টিটি ম্যানেজ করার জন্য স্টেট
  const [quantity, setQuantity] = useState(1);

  // ইনক্রিমেন্ট ফাংশন
  const handleIncrease = () => setQuantity((prev) => prev + 1);

  // ডিক্রিমেন্ট ফাংশন (১ এর নিচে যাবে না)
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // টোটাল প্রাইস হিসেব করা (যদি দাম সংখ্যায় থাকে)
  const numericPrice = parseInt(item.price.replace(/,/g, ''));
  const totalPrice = numericPrice * quantity;

  return (
    <div className="flex items-center gap-4 p-6 border border-gray-200 rounded-2xl shadow-sm bg-white">
      <div className="relative w-[145px] h-[145px] flex-shrink-0 overflow-hidden rounded-sm">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover rounded-sm"
        />
      </div>

      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
          <button className="text-gray-400 hover:text-red-500 transition-colors">
            <Trash2 size={20} />
          </button>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <div className="self-center font-bold text-lg text-gray-900">
            ৳{item.price}
          </div>
          <span className="text-sm text-gray-400 line-through">
            ৳{item.oldPrice}
          </span>
        </div>

        <div className="flex justify-between items-center mt-3 mb-3">
          {/* প্লাস-মাইনাস বাটন সিস্টেম */}
          <div className="flex items-center border border-gray-200 rounded-lg">
            <button 
              onClick={handleDecrease}
              className="px-3 py-1 hover:bg-gray-100 transition-colors rounded-l-lg"
            >
              <Minus size={16} />
            </button>
            <span className="px-4 font-medium w-12 text-center">{quantity}</span>
            <button 
              onClick={handleIncrease}
              className="px-3 py-1 hover:bg-gray-100 transition-colors rounded-r-lg"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* ডাইনামিক টোটাল প্রাইস */}
          <div className="self-center font-bold text-lg text-gray-900">
            ৳{totalPrice.toLocaleString()}
          </div>
        </div>

        <span className="text-sm text-gray-500 font-medium">
          {item.sold} sold
        </span>
      </div>
    </div>
  );
};

export default ShopingAdd;