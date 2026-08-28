"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck, Truck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearBuyNowItem } from "@/app/store/cartSlice";

const OrderSummery = ({ items = [] }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const subtotal = items.reduce((acc, item) => {
    const price = typeof item.price === "string" ? parseFloat(item.price.replace(/,/g, "")) : Number(item.price || 0);
    const quantity = item.quantity || 1;
    return acc + price * quantity;
  }, 0);

  const savings = items.reduce((acc, item) => {
    const price = typeof item.price === "string" ? parseFloat(item.price.replace(/,/g, "")) : Number(item.price || 0);
    const oldPrice = item.oldPrice ? (typeof item.oldPrice === "string" ? parseFloat(item.oldPrice.replace(/,/g, "")) : Number(item.oldPrice)) : price;
    const quantity = item.quantity || 1;
    const diff = Math.max(0, oldPrice - price);
    return acc + diff * quantity;
  }, 0);

  const deliveryFee = subtotal > 1000 || subtotal === 0 ? 0 : 60;
  const grandTotal = subtotal + deliveryFee;

  const handleCheckout = () => {
    // Clear any leftover direct buy now item so OrderConfirm processes the entire cart
    dispatch(clearBuyNowItem());
    router.push("/Pages/OrderConfirm");
  };

  return (
    <div className="w-full space-y-4">
      <Card className="rounded-2xl border border-gray-200 shadow-sm bg-white overflow-hidden">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-5 text-gray-900">Order Summary</h2>

          {/* Dynamic Items List */}
          <div className="space-y-4 mb-6 max-h-72 overflow-y-auto pr-1">
            {items.map((item, i) => {
              const price = typeof item.price === "string" ? parseFloat(item.price.replace(/,/g, "")) : Number(item.price || 0);
              const quantity = item.quantity || 1;
              const itemTotal = price * quantity;

              return (
                <div key={item.id || i} className="flex gap-3 items-center">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-gray-100 shrink-0 bg-gray-50">
                    <Image
                      src={item.images?.[0] || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80"}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="grow min-w-0">
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-800 leading-tight line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">Qty: {quantity}</p>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-gray-900 shrink-0">৳{itemTotal.toLocaleString()}</div>
                </div>
              );
            })}
          </div>

          <Separator className="my-4" />

          {/* Pricing Details */}
          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">
                ৳{subtotal.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Charges</span>
              <span className="font-semibold text-emerald-600">
                {deliveryFee === 0 ? "Free (Over ৳1,000)" : `৳${deliveryFee}`}
              </span>
            </div>
            {savings > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>Discount Savings</span>
                <span className="font-semibold text-emerald-600">
                  -৳{savings.toLocaleString()}
                </span>
              </div>
            )}
          </div>

          <Separator className="my-4" />

          {/* Total Price */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-base font-bold text-gray-900">Estimated Total</span>
            <span className="text-2xl font-extrabold text-emerald-600">
              ৳{grandTotal.toLocaleString()}
            </span>
          </div>

          <Button
            onClick={handleCheckout}
            disabled={items.length === 0}
            className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 text-white font-bold rounded-xl cursor-pointer shadow-md shadow-emerald-100 text-sm"
          >
            Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <div className="flex justify-center items-center gap-6 mt-4 text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-emerald-500" /> 100% Secure
            </div>
            <div className="flex items-center gap-1.5">
              <Truck size={16} className="text-emerald-500" /> Fast Delivery
            </div>
          </div>
        </CardContent>
      </Card>

      <Link href={"/Pages/AllProduct"} className="block">
        <Button
          variant="outline"
          className="w-full h-12 rounded-xl font-semibold border-gray-200 hover:bg-gray-50 text-gray-700"
        >
          Continue Shopping
        </Button>
      </Link>
    </div>
  );
};

export default OrderSummery;