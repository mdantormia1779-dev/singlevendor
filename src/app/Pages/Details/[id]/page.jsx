"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Heart, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import productsData from "@/app/data/data.json";
import Deteals from "@/app/Components/Deteals/page";

import {
  addToCart,
  setBuyNowItem,
} from "@/app/store/cartSlice";

import { toast } from "react-toastify";

const DetailsPage = () => {
  const params = useParams();
  const router = useRouter(); // ✅ correct place
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // ✅ product find
  const product = useMemo(() => {
    const productId = Number(params?.id);
    return productsData.find((p) => p.id === productId) || null;
  }, [params?.id]);

  if (!product) {
    return (
      <div className="text-center py-20 font-bold text-gray-500">
        Product not found!
      </div>
    );
  }

  // ✅ price হিসাব
  const basePrice = Number(product.price || 0);
  const baseOldPrice = Number(product.oldPrice || 0);
  const totalPrice = basePrice * quantity;
  const totalOldPrice = baseOldPrice * quantity;

  const currentMainImage =
    product.images?.[activeImageIndex] || product.images?.[0];

  // ✅ Add to Cart
  const handleAddToCart = () => {
    const exists = cartItems.find((item) => item.id === product.id);

    if (exists) {
      toast.error("Already added to cart ❌");
    } else {
      dispatch(addToCart({ ...product, quantity }));
      toast.success("Added to cart ✅");
    }
  };

  // ✅ Buy Now (Redux)
  const handleBuyNow = () => {
    dispatch(
      setBuyNowItem({
        ...product,
        quantity,
        totalPrice,
      })
    );

    router.push("/Pages/OrderConfirm");
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-10 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* LEFT */}
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-xl relative w-full h-96 border overflow-hidden">
            {currentMainImage && (
              <Image
                fill
                src={currentMainImage}
                alt={product.title}
                className="object-cover rounded-lg"
              />
            )}
          </div>

          <div className="grid grid-cols-4 gap-4">
            {product.images?.map((img, i) => (
              <div
                key={i}
                onClick={() => setActiveImageIndex(i)}
                className={`border rounded-lg cursor-pointer h-20 relative overflow-hidden ${
                  activeImageIndex === i
                    ? "border-emerald-500"
                    : "hover:border-gray-400"
                }`}
              >
                <Image fill src={img} alt="thumb" className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-1 rounded border">
              ✓ In stock
            </span>
            <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border">
              <Heart size={20} />
            </button>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold">
            {product.title}
          </h1>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Star size={16} className="text-yellow-400" />
            <span>{product.rating}</span>
            <span>({product.reviews} reviews)</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-emerald-600">
              ৳{totalPrice}
            </span>
            {product.oldPrice && (
              <span className="line-through text-gray-400">
                ৳{totalOldPrice}
              </span>
            )}
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <span>Quantity:</span>
            <div className="flex items-center border rounded-xl">
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  setQuantity((prev) => Math.max(1, prev - 1))
                }
              >
                <Minus size={14} />
              </Button>

              <span className="px-4">{quantity}</span>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                <Plus size={14} />
              </Button>
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={handleAddToCart}
              variant="outline"
              className="h-12"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to cart
            </Button>

            {/* ✅ FIXED BUY NOW */}
            <Button
              onClick={handleBuyNow}
              className="h-12 bg-emerald-600 text-white"
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      <Deteals product={product} />
    </div>
  );
};

export default DetailsPage;