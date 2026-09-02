"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Heart, Minus, Plus, ShoppingCart, ShoppingBag, Star, ArrowLeft, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Deteals from "@/app/Components/Deteals/page";

import {
  addToCart,
  setBuyNowItem,
} from "@/app/store/cartSlice";
import { toggleWishlist } from "@/app/store/wishlistSlice";

import { toast } from "react-toastify";
import gsap from "gsap";
import { useAuthGuard } from "@/lib/useAuthGuard";

const DetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { requireAuth } = useAuthGuard();

  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const detailsContainerRef = useRef(null);

  // Fetch real product details from Prisma API
  useEffect(() => {
    if (params?.id) {
      fetch(`/api/products/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.product) {
            setProduct(data.product);
          }
        })
        .catch((err) => console.error("Prisma product detail fetch error:", err))
        .finally(() => setIsLoading(false));
    }
  }, [params?.id]);

  // GSAP animation when product loads
  useEffect(() => {
    if (product && detailsContainerRef.current) {
      gsap.fromTo(
        detailsContainerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [product]);

  const isWishlisted = product
    ? wishlistItems.some((item) => item.id === product.id)
    : false;

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 animate-pulse">
        <div className="h-6 w-32 bg-gray-200 rounded-md mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="aspect-square bg-gray-200 rounded-3xl w-full" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded-xl w-3/4" />
            <div className="h-4 bg-gray-200 rounded-md w-1/3" />
            <div className="h-16 bg-gray-200 rounded-2xl w-full" />
            <div className="h-24 bg-gray-200 rounded-2xl w-full" />
            <div className="h-12 bg-gray-200 rounded-2xl w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto py-24 text-center px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
        <p className="text-gray-500 mb-6 text-sm">
          The item you are looking for may have been removed or is unavailable in our database.
        </p>
        <Link href="/Pages/AllProduct">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl px-6 font-bold cursor-pointer">
            Browse All Products
          </Button>
        </Link>
      </div>
    );
  }

  const basePrice = Number(product.price || 0);
  const baseOldPrice = Number(product.oldPrice || 0);
  const totalPrice = basePrice * quantity;
  const totalOldPrice = baseOldPrice * quantity;

  // Add to Cart handler
  const handleAddToCart = () => {
    if (!requireAuth("Please login to add items to your cart!")) {
      return;
    }

    dispatch(
      addToCart({
        ...product,
        quantity,
      })
    );
    toast.success(`${quantity}x ${product.title} added to cart! 🛍️`);
  };

  // Buy Now handler
  const handleBuyNow = () => {
    if (!requireAuth("Please login to proceed to checkout!", "/Pages/OrderConfirm")) {
      return;
    }

    dispatch(
      setBuyNowItem({
        ...product,
        quantity,
      })
    );
    router.push("/Pages/OrderConfirm");
  };

  const images =
    product.images && product.images.length > 0
      ? product.images
      : ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80"];

  return (
    <div ref={detailsContainerRef} className="max-w-7xl mx-auto px-4 sm:px-6 py-8 font-sans">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-600 hover:text-emerald-600 transition cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Back to Products</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
            <Image
              src={images[activeImageIndex] || images[0]}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-cover transition-all duration-500"
            />
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 shrink-0 transition cursor-pointer ${
                    activeImageIndex === index
                      ? "border-emerald-600 shadow-md scale-105"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${index}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info & Actions */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-emerald-50 text-emerald-700 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-200">
                {product.category || "Fashion"}
              </span>
              <span className="text-xs text-gray-500 font-semibold">{product.sold || "100+ sold"}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-amber-500">
                <Star size={16} fill="currentColor" />
                <span className="ml-1 text-sm font-bold text-gray-900">{product.rating || "4.8"}</span>
              </div>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-500 font-medium">
                {product.reviews || "120"} Customer Reviews
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200/80 flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-emerald-600 font-mono">
              ৳{totalPrice.toLocaleString()}
            </span>
            {totalOldPrice > 0 && (
              <span className="text-base text-gray-400 line-through font-mono">
                ৳{totalOldPrice.toLocaleString()}
              </span>
            )}
            {product.discount && (
              <span className="text-xs font-extrabold text-rose-600 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
                {product.discount}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 pt-2">
            <span className="text-sm font-bold text-gray-800">Quantity:</span>
            <div className="flex items-center border border-gray-200 rounded-2xl bg-white p-1">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
                className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-gray-100 disabled:opacity-40 transition cursor-pointer"
              >
                <Minus size={15} />
              </button>
              <span className="w-10 text-center font-bold text-sm text-gray-900">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-gray-100 transition cursor-pointer"
              >
                <Plus size={15} />
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
            <Button
              onClick={handleAddToCart}
              className="flex-1 bg-gray-900 hover:bg-black text-white h-13 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <ShoppingCart size={18} />
              <span>Add to Cart</span>
            </Button>

            <Button
              onClick={handleBuyNow}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white h-13 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-emerald-200"
            >
              <ShoppingBag size={18} />
              <span>Buy Now</span>
            </Button>

            <button
              onClick={() => {
                if (!requireAuth("Please login to save items to your wishlist!")) return;
                dispatch(toggleWishlist(product));
              }}
              className={`h-13 w-13 rounded-2xl border flex items-center justify-center shrink-0 transition cursor-pointer ${
                isWishlisted
                  ? "bg-rose-50 border-rose-200 text-rose-600"
                  : "bg-white border-gray-200 text-gray-600 hover:text-rose-600 hover:border-rose-200"
              }`}
            >
              <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
            </button>
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-slate-500 text-[11px] font-bold">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-emerald-600" />
              <span>100% Authentic</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck size={16} className="text-emerald-600" />
              <span>Fast Shipping</span>
            </div>
            <div className="flex items-center gap-1.5">
              <RotateCcw size={16} className="text-emerald-600" />
              <span>7 Days Return</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs & Product Details */}
      <div className="mt-14">
        <Deteals product={product} />
      </div>
    </div>
  );
};

export default DetailsPage;