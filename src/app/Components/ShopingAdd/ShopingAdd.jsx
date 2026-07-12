"use client";

import React from "react";
import Image from "next/image";
import { Trash2, Plus, Minus } from "lucide-react";
import { useDispatch } from "react-redux";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "@/app/store/cartSlice";

const ShopingAdd = ({ item }) => {
  console.log(item)
  const dispatch = useDispatch();

  // যদি item না থাকে, তবে এড়ানোর জন্য
  if (!item) return null;

  // প্রাইস কনভার্ট (যদি কমা থাকে)
  const priceValue = typeof item.price === 'string' ? parseFloat(item.price.replace(/,/g, '')) : item.price;
  const totalPrice = priceValue * item.quantity;

  return (
    <div className="flex items-center gap-4 p-6 border border-gray-200 rounded-2xl shadow-sm bg-white">
      {/* ইমেজ সেকশন */}
      <div className="relative w-36 h-36 shrink-0 overflow-hidden rounded-sm">
        <Image
          src={item.images[0]}
          alt={item.title}
          fill
          className="object-cover rounded-sm"
        />
      </div>

      <div className="grow">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
          {/* ডিলিট বাটন - Redux action কল করা হয়েছে */}
          <button 
            onClick={() => dispatch(removeFromCart(item.id))}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
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
          {/* প্লাস-মাইনাস বাটন সিস্টেম - Redux action কল করা হয়েছে */}
          <div className="flex items-center border border-gray-200 rounded-lg">
            <button 
              onClick={() => dispatch(decreaseQuantity(item.id))}
              className="px-3 py-1 hover:bg-gray-100 transition-colors rounded-l-lg"
            >
              <Minus size={16} />
            </button>
            
            {/* কোয়ান্টিটি এখন Redux থেকে আসছে */}
            <span className="px-4 font-medium w-12 text-center">{item.quantity}</span>
            
            <button 
              onClick={() => dispatch(increaseQuantity(item.id))}
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
          {item.sold}
        </span>
      </div>
    </div>
  );
};

export default ShopingAdd;