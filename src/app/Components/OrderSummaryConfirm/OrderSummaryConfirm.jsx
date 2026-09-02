"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Tag, ShieldCheck, ShoppingBag, Lock, Sparkles, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

const OrderSummaryConfirm = ({
  handleConfirmOrder,
  isLoading,
  deliveryFee = 120,
  orderItems = [],
  subtotal = 0,
  total = 0,
  couponDiscount = 0,
  onApplyCoupon,
}) => {
  const [couponCode, setCouponCode] = useState("");

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) {
      toast.error("Please enter a valid coupon code!");
      return;
    }
    const clean = couponCode.trim().toUpperCase();
    if (clean === "FINORA20" || clean === "DISCOUNT10") {
      onApplyCoupon && onApplyCoupon(clean);
      toast.success(`Coupon "${clean}" applied successfully! 🎉`);
    } else {
      toast.error("Invalid coupon code! Use 'FINORA20' for 20% off");
    }
  };

  const handlePresetCoupon = (code) => {
    setCouponCode(code);
    onApplyCoupon && onApplyCoupon(code);
    toast.success(`Coupon "${code}" applied! 🎉`);
  };

  if (orderItems.length === 0) {
    return (
      <Card className="rounded-3xl border border-slate-200 p-8 text-center bg-white shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
          <ShoppingBag size={28} />
        </div>
        <h3 className="font-extrabold text-gray-900 text-lg mb-1">Your cart is empty</h3>
        <p className="text-gray-500 text-xs mb-5">Please add products before proceeding to checkout</p>
        <Link href="/Pages/AllProduct">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold px-6 py-2.5">
            Browse Catalogue
          </Button>
        </Link>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="rounded-3xl border border-slate-200/80 shadow-md bg-white overflow-hidden sticky top-28">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={20} className="text-emerald-400" />
            <h2 className="font-extrabold text-base">Order Summary</h2>
          </div>
          <span className="text-xs bg-white/20 text-white font-extrabold px-3 py-1 rounded-full backdrop-blur-xs">
            {orderItems.length} {orderItems.length === 1 ? "Product" : "Products"}
          </span>
        </div>

        <CardContent className="p-6 space-y-5">
          {/* Items List */}
          <div className="space-y-3.5 max-h-64 overflow-y-auto pr-1 divide-y divide-slate-100">
            {orderItems.map((item, idx) => {
              const price = typeof item.price === "string" ? parseFloat(item.price.replace(/,/g, "")) : Number(item.price || 0);
              const qty = item.quantity || 1;
              const img = item.images?.[0] || item.image || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80";

              return (
                <div key={item.id || idx} className="flex items-center gap-3 pt-3 first:pt-0">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-slate-200 shrink-0 bg-slate-50">
                    <Image
                      src={img}
                      alt={item.title || "Product"}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>

                  <div className="grow min-w-0">
                    <p className="font-bold text-xs sm:text-sm text-gray-900 line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Qty: <span className="font-bold text-gray-700">{qty}</span> × ৳{price.toLocaleString()}
                    </p>
                  </div>

                  <p className="font-extrabold text-xs sm:text-sm text-gray-900 shrink-0">
                    ৳{(price * qty).toLocaleString()}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Coupon Code Section */}
          <div className="pt-2">
            <form onSubmit={handleCouponSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <Tag size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Promo code (e.g. FINORA20)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="pl-10 h-11 text-xs rounded-xl bg-slate-50 border-slate-200 font-mono uppercase focus:bg-white focus:border-emerald-500"
                />
              </div>
              <Button
                type="submit"
                variant="outline"
                className="h-11 rounded-xl text-xs font-bold border-slate-200 hover:bg-slate-100 px-4 cursor-pointer"
              >
                Apply
              </Button>
            </form>

            {/* Preset Coupons */}
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-[11px] text-gray-400 font-medium">Offers:</span>
              <button
                type="button"
                onClick={() => handlePresetCoupon("FINORA20")}
                className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-md cursor-pointer transition"
              >
                <Sparkles size={10} /> FINORA20 (-20%)
              </button>
              <button
                type="button"
                onClick={() => handlePresetCoupon("DISCOUNT10")}
                className="inline-flex items-center gap-1 text-[10px] font-extrabold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-2 py-0.5 rounded-md cursor-pointer transition"
              >
                <Sparkles size={10} /> DISCOUNT10 (-10%)
              </button>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2.5 text-xs sm:text-sm border-t border-slate-100 pt-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-bold text-gray-900">৳{subtotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Shipping Fee</span>
              <span className="font-bold text-gray-900">
                {deliveryFee === 0 ? <span className="text-emerald-600 font-extrabold">FREE</span> : `৳${deliveryFee}`}
              </span>
            </div>

            {couponDiscount > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold bg-emerald-50/70 p-2 rounded-xl border border-emerald-100">
                <span>Discount Applied</span>
                <span>-৳{couponDiscount.toLocaleString()}</span>
              </div>
            )}

            <div className="flex justify-between items-baseline pt-3 border-t border-slate-100">
              <div>
                <span className="font-extrabold text-base text-gray-900 block">Total Payable</span>
                <span className="text-[10px] text-gray-400">Includes VAT & Delivery</span>
              </div>
              <span className="font-extrabold text-emerald-600 text-2xl">
                ৳{total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Confirm Button */}
          <Button
            onClick={handleConfirmOrder}
            disabled={isLoading || orderItems.length === 0}
            className="w-full bg-emerald-600 hover:bg-emerald-700 h-13 rounded-2xl font-extrabold text-white shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 cursor-pointer transition-all hover:shadow-xl hover:-translate-y-0.5 text-sm"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                <span>Processing Order...</span>
              </>
            ) : (
              <>
                <Lock size={16} />
                <span>Place Order • ৳{total.toLocaleString()}</span>
              </>
            )}
          </Button>

          {/* Guarantee Badges */}
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center space-y-1">
            <div className="flex justify-center items-center gap-1.5 text-xs text-slate-700 font-bold">
              <ShieldCheck size={16} className="text-emerald-600" />
              <span>100% Secure Checkout Guarantee</span>
            </div>
            <p className="text-[10px] text-slate-400">
              Your personal data is encrypted & processed securely.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSummaryConfirm;