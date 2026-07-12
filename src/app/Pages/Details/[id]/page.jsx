"use client";

import React, { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import {
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Minus,
  Plus,
  ShoppingCart,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import productsData from "@/app/data/data.json";
import Deteals from "@/app/Components/Deteals/page";
import { addToCart } from "@/app/store/cartSlice";
import { toast } from "react-toastify";

const DetailsPage = () => {
  const params = useParams();
  const dispatch = useDispatch();

  // ✅ Hook always top level
  const cartItems = useSelector((state) => state.cart.items);

  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const product = useMemo(() => {
    const productId = Number(params?.id);
    return productsData.find((p) => p.id === productId) || null;
  }, [params?.id]);

  if (!product) {
    return (
      <div className="text-center py-20 font-bold text-gray-500">
        Product not found!{" "}
      </div>
    );
  }

  const currentMainImage =
    product.images?.[activeImageIndex] || product.images?.[0];

  const basePrice = Number(product.price || 0);
  const baseOldPrice = Number(product.oldPrice || 0);
  const totalPrice = basePrice * quantity;
  const totalOldPrice = baseOldPrice * quantity;

  // ✅ Add to cart handler
  const handleAddToCart = (e) => {
    e.preventDefault();
    const exists = cartItems.find((item) => item.id === product.id);

    if (exists) {
      toast.error("Already added to cart ❌");
    } else {
      dispatch(addToCart({ ...product, quantity }));
      toast.success("Added to cart ✅");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-10 py-10">
      {" "}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT */}{" "}
        <div className="space-y-4">
          {" "}
          <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-center relative w-full h-100 border border-gray-100 overflow-hidden">
            {currentMainImage && (
              <Image
                fill
                src={currentMainImage}
                alt={product.title}
                sizes="(max-width: 768px) 100vw, 500px"
                priority
                className="w-full h-full rounded-lg object-cover transition-all duration-300"
              />
            )}{" "}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images?.map((imgUrl, i) => (
              <div
                key={i}
                onClick={() => setActiveImageIndex(i)}
                className={`bg-gray-50 p-1 rounded-lg border cursor-pointer overflow-hidden h-20 flex items-center justify-center relative transition-all ${
                  activeImageIndex === i
                    ? "border-emerald-500 ring-2 ring-emerald-100"
                    : "hover:border-gray-400"
                }`}
              >
                <Image
                  fill
                  src={imgUrl}
                  alt={`Thumbnail ${i + 1}`}
                  sizes="80px"
                  className="object-cover h-full w-full rounded"
                />
              </div>
            ))}
          </div>
        </div>
        {/* RIGHT */}
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-1 rounded border border-emerald-200 font-semibold">
              ✓ In stock
            </span>
            <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors duration-200">
              <Heart size={20} />
            </button>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
            {product.title}
          </h1>

          <div className="flex items-center gap-3 text-sm text-gray-500">
            <div className="flex text-amber-400 items-center gap-0.5">
              <Star size={16} fill="currentColor" />
              <span className="text-gray-700 font-semibold ml-0.5">
                {product.rating}
              </span>
            </div>
            <span>•</span>
            <span>({product.reviews} reviews)</span>
            <span>•</span>
            <span>{product.sold}</span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl md:text-4xl font-bold text-emerald-600">
              ৳{totalPrice}
            </span>
            {product.oldPrice && (
              <span className="text-xl text-gray-400 line-through">
                ৳{totalOldPrice}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 py-2">
            <span className="font-medium text-gray-700">Quantity:</span>
            <div className="flex items-center border rounded-xl bg-gray-50 p-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                <Minus size={14} />
              </Button>
              <span className="px-4 font-bold text-sm">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                <Plus size={14} />
              </Button>
            </div>
          </div>

          {/* ✅ ONLY CHANGE HERE */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <Button
              onClick={handleAddToCart}
              className="h-12 border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-bold rounded-xl"
              variant="outline"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to cart
            </Button>

            <Button
              asChild
              className="h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl"
            >
              <Link href="/Pages/OrderConfirm">Buy Now</Link>
            </Button>
          </div>
        </div>
      </div>
      <Deteals product={product} />
    </div>
  );
};

export default DetailsPage;
