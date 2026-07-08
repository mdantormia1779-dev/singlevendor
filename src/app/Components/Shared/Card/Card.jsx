"use client";

import {
  Heart,
  ShoppingCart,
  ShoppingBasket,
  Star,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

const Card = ({ product }) => {
  return (
    <div className="min-w-[280px] bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl duration-300 flex flex-col justify-between">
      {/* Image Section */}
      <div className="relative">
        <img
          src={product.img} // ডাইনামিক ইমেজ (img কী অনুসারে)
          alt={product.title}
          className="w-full h-[230px] object-cover"
        />

        {/* Discount Tag */}
        {product.discount && (
          <span className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-xl">
            {product.discount}
          </span>
        )}

        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow text-gray-400 hover:text-red-500 duration-200">
          <Heart size={20} />
        </button>

        {/* Slider Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="w-2 h-2 rounded-full bg-gray-300"></span>
          <span className="w-2 h-2 rounded-full bg-gray-300"></span>
          <span className="w-2 h-2 rounded-full bg-gray-300"></span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Title */}
          <h3 className="font-bold text-sm leading-5 text-gray-800 line-clamp-2 min-h-[40px]">
            {product.title}
          </h3>

          {/* Rating, Reviews & Sold Info */}
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-2">
            <div className="flex items-center gap-0.5 text-amber-400 font-medium">
              <Star size={14} className="fill-current text-amber-400" />
              <span>{product.rating}</span>
            </div>
            <span>({product.reviews})</span>
            <span>|</span>
            <span>{product.sold}</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-3">
            <span className="text-base font-bold text-emerald-500">
              ৳{product.price}
            </span>
            {product.oldPrice && (
              <span className="line-through text-xs text-gray-400">
                ৳{product.oldPrice}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <Link href={"/Pages/ShopingCards"}>
            <button className="w-12 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 duration-200">
              <ShoppingCart size={18} />
            </button>
          </Link>

          <Link
            href={`/Pages/Details/${product.id}`}
            className="flex-1 bg-emerald-500 text-white rounded-xl flex items-center justify-between px-4 py-2.5 text-xs font-semibold hover:bg-emerald-600 duration-200"
          >
            <div className="flex items-center gap-1.5">
              <ShoppingBasket size={16} />
              <span>Buy Now</span>
            </div>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
