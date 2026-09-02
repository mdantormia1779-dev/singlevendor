"use client";

import { useState, useEffect } from "react";
import {
  Heart,
  ShoppingCart,
  ShoppingBag,
  Star,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, setBuyNowItem } from "../../../store/cartSlice";
import { toggleWishlist } from "../../../store/wishlistSlice";
import { toast } from "react-toastify";
import Image from "next/image";
import { useAuthGuard } from "@/lib/useAuthGuard";

const Card = ({ product }) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const { requireAuth } = useAuthGuard();

  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  // Add to cart function
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!requireAuth("Please login to add items to your cart!")) {
      return;
    }

    const exists = cartItems.find((item) => item.id === product.id);

    if (exists) {
      toast.info("Item already in cart 🛒");
    } else {
      dispatch(addToCart({ ...product, quantity: 1 }));
      toast.success("Added to cart! 🛍️");
    }
  };

  // Buy Now function
  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!requireAuth("Please login to proceed to checkout!", "/Pages/OrderConfirm")) {
      return;
    }

    const priceNum = typeof product.price === "string" ? parseFloat(product.price.replace(/,/g, "")) : Number(product.price);
    dispatch(
      setBuyNowItem({
        ...product,
        quantity: 1,
        totalPrice: priceNum,
      })
    );
    router.push("/Pages/OrderConfirm");
  };

  // Wishlist toggle function
  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!requireAuth("Please login to save items to your wishlist!")) {
      return;
    }

    dispatch(toggleWishlist(product));
    if (isWishlisted) {
      toast.info("Removed from wishlist");
    } else {
      toast.success("Added to wishlist! ❤️");
    }
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
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group">
      {/* Image Slider Section */}
      <div className="relative overflow-hidden group">
        <Link href={`/Pages/Details/${product.id}`} className="block">
          <div
            className="flex transition-transform duration-500 ease-out h-60"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {imagesList.map((imgUrl, index) => (
              <div key={index} className="relative w-full h-full shrink-0">
                <Image
                  src={imgUrl}
                  alt={`${product.title} - ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </Link>

        {product.discount && (
          <span className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-xl z-10 shadow-xs">
            {product.discount}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-md duration-200 z-10 cursor-pointer ${
            isWishlisted ? "text-red-500" : "text-gray-400 hover:text-red-500"
          }`}
          aria-label="Toggle Wishlist"
        >
          <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        {imagesList.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-black/30 px-2 py-1 rounded-full backdrop-blur-xs">
            {imagesList.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentIndex(index);
                }}
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
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          <Link href={`/Pages/Details/${product.id}`}>
            <h3 className="font-bold text-sm sm:text-base leading-5 text-gray-800 line-clamp-2 hover:text-emerald-600 transition-colors min-h-10">
              {product.title}
            </h3>
          </Link>

          <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-2">
            <div className="flex items-center gap-0.5 text-amber-400 font-medium">
              <Star size={14} className="fill-current text-amber-400" />
              <span>{product.rating}</span>
            </div>
            <span>({product.reviews})</span>
            <span>|</span>
            <span>{product.sold}</span>
          </div>

          <div className="flex items-baseline gap-2 mt-2.5">
            <span className="text-lg font-bold text-emerald-600">
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
        <div className="flex gap-2 pt-2 border-t border-gray-100">
          <button
            onClick={handleAddToCart}
            className="w-11 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-300 duration-200 cursor-pointer"
            title="Add to Cart"
            aria-label="Add to cart"
          >
            <ShoppingCart size={18} />
          </button>

          <button
            onClick={handleBuyNow}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl flex items-center justify-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold duration-200 cursor-pointer shadow-xs"
          >
            <ShoppingBag size={16} />
            <span>Buy Now</span>
          </button>

          <Link
            href={`/Pages/Details/${product.id}`}
            className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 duration-200"
            title="View Details"
            aria-label="View Details"
          >
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;