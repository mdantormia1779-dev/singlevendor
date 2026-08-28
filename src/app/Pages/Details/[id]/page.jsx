"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Heart, Minus, Plus, ShoppingCart, ShoppingBag, Star, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import productsData from "@/app/data/data.json";
import Deteals from "@/app/Components/Deteals/page";

import {
  addToCart,
  setBuyNowItem,
} from "@/app/store/cartSlice";
import { toggleWishlist } from "@/app/store/wishlistSlice";

import { toast } from "react-toastify";

const DetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [apiProduct, setApiProduct] = useState(null);

  const productId = Number(params?.id);

  // Fetch real product details from Prisma API
  useEffect(() => {
    if (params?.id) {
      fetch(`/api/products/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.product) {
            setApiProduct(data.product);
          }
        })
        .catch((err) => console.error("Prisma product detail fetch:", err));
    }
  }, [params?.id]);

  const product = useMemo(() => {
    if (apiProduct) return apiProduct;
    return productsData.find((p) => p.id === productId) || null;
  }, [apiProduct, productId]);

  const isWishlisted = product
    ? wishlistItems.some((item) => item.id === product.id)
    : false;

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto py-24 text-center px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found!</h2>
        <p className="text-gray-500 mb-6">The item you are looking for may have been removed or is unavailable.</p>
        <Link href="/Pages/AllProduct">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
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
    dispatch(
      setBuyNowItem({
        ...product,
        quantity,
      })
    );
    router.push("/Pages/OrderConfirm");
  };

  const images = product.images && product.images.length > 0
    ? product.images
    : ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-emerald-600 transition"
        >
          <ArrowLeft size={18} />
          <span>Back to Products</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-xs">
            <Image
              src={images[activeImageIndex] || images[0]}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-cover transition duration-300"
            />
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 shrink-0 transition ${
                    activeImageIndex === index
                      ? "border-emerald-600 shadow-md"
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
              <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                {product.category || product.specifications?.category || "Men's Fashion"}
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
                {product.reviews || "342"} Customer Reviews
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="p-4 rounded-2xl bg-gray-50/80 border border-gray-100 flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-emerald-600 font-mono">
              ৳{totalPrice.toLocaleString()}
            </span>
            {totalOldPrice > 0 && (
              <span className="text-base text-gray-400 line-through font-mono">
                ৳{totalOldPrice.toLocaleString()}
              </span>
            )}
            {product.discount && (
              <span className="text-xs font-extrabold text-rose-600 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
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
                className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-gray-100 disabled:opacity-40 transition"
              >
                <Minus size={15} />
              </button>
              <span className="w-10 text-center font-bold text-sm text-gray-900">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-gray-100 transition"
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
              onClick={() => dispatch(toggleWishlist(product))}
              className={`h-13 w-13 rounded-2xl border flex items-center justify-center shrink-0 transition cursor-pointer ${
                isWishlisted
                  ? "bg-rose-50 border-rose-200 text-rose-600"
                  : "bg-white border-gray-200 text-gray-600 hover:text-rose-600 hover:border-rose-200"
              }`}
            >
              <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
            </button>
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