"use client";

import { useState, useEffect } from "react";
import {
  Heart,
  ShoppingCart,
  ShoppingBasket,
  Star,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../store/cartSlice";
import { toggleWishlist } from "../../../store/wishlistSlice"; // নিশ্চিত করুন এই পাথটি সঠিক
import { toast } from "react-toastify";
import Image from "next/image";

const Card = ({ product }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();

  // Redux States
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  // চেক করুন এই প্রোডাক্টটি উইশলিস্টে আছে কিনা
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  // Add to cart function
  const handleAddToCart = (e) => {
    e.preventDefault();
    const exists = cartItems.find((item) => item.id === product.id);

    if (exists) {
      toast.error("Already added to cart ❌");
    } else {
      dispatch(addToCart(product));
      toast.success("Added to cart ✅");
    }
  };

  // Wishlist toggle function
  const handleWishlist = (e) => {
    e.preventDefault();
    dispatch(toggleWishlist(product));
  };

  useEffect(() => {
    if (!product.images || product.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % product.images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [product.images]);

  const imagesList =
    product.images && product.images.length > 0
      ? product.images
      : ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80"];

  return (
    <div className="min-w-70 bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl duration-300 flex flex-col justify-between">
      {/* Image Slider Section */}
      <div className="relative overflow-hidden group">
        <div
          className="flex transition-transform duration-500 ease-out h-57.5"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {imagesList.map((imgUrl, index) => (
            <div key={index} className="relative w-full h-full shrink-0">
              <Image
                src={imgUrl}
                alt={`${product.title} - ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>

        {product.discount && (
          <span className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-xl z-10">
            {product.discount}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow duration-200 z-10 ${
            isWishlisted ? "text-red-500" : "text-gray-400 hover:text-red-500"
          }`}
        >
          <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        {imagesList.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-black/20 px-2 py-1 rounded-full backdrop-blur-[2px]">
            {imagesList.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "bg-emerald-500 w-4" : "bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-bold text-sm leading-5 text-gray-800 line-clamp-2 min-h-10">
            {product.title}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-2">
            <div className="flex items-center gap-0.5 text-amber-400 font-medium">
              <Star size={14} className="fill-current text-amber-400" />
              <span>{product.rating}</span>
            </div>
            <span>({product.reviews})</span>
            <span>|</span>
            <span>{product.sold}</span>
          </div>
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
          <button
            onClick={handleAddToCart}
            className="w-12 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 duration-200"
          >
            <ShoppingCart size={18} />
          </button>

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