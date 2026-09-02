"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Truck, CreditCard, Banknote, ShieldCheck, Zap, Copy, Check, Hash, Phone, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";

const DeleveryPage = ({
  deliveryMethod = "express",
  setDeliveryMethod,
  paymentMethod = "cod",
  setPaymentMethod,
  totalAmount = 0,
  paymentData = {},
  setPaymentData,
  errors = {},
  setErrors,
  onFieldBlur,
}) => {
  const [copied, setCopied] = useState(false);
  const merchantNumber = "01318964063";

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(merchantNumber);
    setCopied(true);
    toast.success("Merchant number copied to clipboard! 📋");
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaymentFieldChange = (field, value) => {
    if (setPaymentData) {
      setPaymentData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
    if (setErrors && errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* 3. Delivery Method Selection */}
      <Card className="rounded-3xl border border-slate-200/80 shadow-sm bg-white overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50/30 px-6 py-4 border-b border-emerald-100/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-xs">
              <Truck size={18} />
            </div>
            <div>
              <h2 className="font-extrabold text-gray-900 text-base">
                3. Delivery Method & Speed
              </h2>
              <p className="text-xs text-gray-500">Choose your preferred shipping timeframe</p>
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Express Delivery Card */}
            <div
              onClick={() => setDeliveryMethod && setDeliveryMethod("express")}
              className={`relative border-2 rounded-2xl p-4.5 cursor-pointer transition-all ${
                deliveryMethod === "express"
                  ? "border-emerald-500 bg-emerald-50/40 shadow-xs ring-2 ring-emerald-500/10"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    deliveryMethod === "express" ? "border-emerald-500 bg-emerald-500" : "border-slate-300"
                  }`}>
                    {deliveryMethod === "express" && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <span className="font-bold text-sm text-gray-900">Express Delivery</span>
                </div>
                <span className="font-extrabold text-emerald-700 text-sm">৳120</span>
              </div>
              <div className="mt-2.5 pl-7">
                <span className="inline-flex items-center gap-1 bg-emerald-100/80 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md mb-1">
                  <Zap size={12} className="text-emerald-600 fill-current" /> FAST DISPATCH (1-2 Days)
                </span>
                <p className="text-xs text-gray-500">Priority fulfillment & express courier dispatch to your doorstep.</p>
              </div>
            </div>

            {/* Standard Delivery Card */}
            <div
              onClick={() => setDeliveryMethod && setDeliveryMethod("standard")}
              className={`relative border-2 rounded-2xl p-4.5 cursor-pointer transition-all ${
                deliveryMethod === "standard"
                  ? "border-emerald-500 bg-emerald-50/40 shadow-xs ring-2 ring-emerald-500/10"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    deliveryMethod === "standard" ? "border-emerald-500 bg-emerald-500" : "border-slate-300"
                  }`}>
                    {deliveryMethod === "standard" && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <span className="font-bold text-sm text-gray-900">Standard Delivery</span>
                </div>
                <span className="font-extrabold text-emerald-700 text-sm">৳60</span>
              </div>
              <div className="mt-2.5 pl-7">
                <span className="inline-block bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md mb-1">
                  REGULAR (2-4 Business Days)
                </span>
                <p className="text-xs text-gray-500">Standard home delivery across all 64 districts in Bangladesh.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4. Payment Method Selection */}
      <Card className="rounded-3xl border border-slate-200/80 shadow-sm bg-white overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50/30 px-6 py-4 border-b border-emerald-100/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-xs">
              <CreditCard size={18} />
            </div>
            <div>
              <h2 className="font-extrabold text-gray-900 text-base">
                4. Payment Method
              </h2>
              <p className="text-xs text-gray-500">Select Cash on Delivery or Online Payment (bKash / Nagad)</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-emerald-600 font-bold">
            <ShieldCheck size={16} /> 100% Safe Checkout
          </div>
        </div>

        <CardContent className="p-6 space-y-4">
          {/* Option 1: Cash on Delivery (COD) */}
          <div
            onClick={() => setPaymentMethod && setPaymentMethod("cod")}
            className={`border-2 rounded-2xl p-5 transition-all cursor-pointer ${
              paymentMethod === "cod"
                ? "border-emerald-500 bg-emerald-50/50 shadow-md ring-2 ring-emerald-500/20"
                : "border-slate-200 hover:border-slate-300 bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === "cod" ? "border-emerald-500 bg-emerald-500" : "border-slate-300"
                }`}>
                  {paymentMethod === "cod" && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-gray-900">Cash on Delivery (ক্যাশ অন ডেলিভারি)</span>
                    <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Most Popular
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 mt-0.5 block">
                    কোনো অগ্রিম পেমেন্ট ছাড়া পণ্য হাতে পেয়ে চেক করে সম্পূর্ণ মূল্য পরিশোধ করুন।
                  </span>
                </div>
              </div>
              <Banknote size={24} className="text-emerald-600 shrink-0" />
            </div>

            {paymentMethod === "cod" && (
              <div className="mt-3.5 pt-3.5 border-t border-emerald-200/60 pl-8 flex items-center gap-2 text-xs text-emerald-800 font-medium animate-in fade-in duration-200">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>Zero advance payment required. Pay ৳{totalAmount.toLocaleString()} to the courier person upon parcel delivery.</span>
              </div>
            )}
          </div>

          {/* Option 2: bKash Online Payment */}
          <div
            onClick={() => setPaymentMethod && setPaymentMethod("bkash")}
            className={`border-2 rounded-2xl p-5 transition-all cursor-pointer ${
              paymentMethod === "bkash"
                ? "border-[#e2136e] bg-pink-50/30 shadow-xs ring-2 ring-[#e2136e]/10"
                : "border-slate-200 hover:border-slate-300 bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === "bkash" ? "border-[#e2136e] bg-[#e2136e]" : "border-slate-300"
                }`}>
                  {paymentMethod === "bkash" && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-[#e2136e] text-white px-2.5 py-0.5 rounded-lg font-extrabold text-xs">
                    bKash
                  </span>
                  <span className="font-bold text-sm text-gray-900">bKash Online Payment</span>
                </div>
              </div>
              <span className="text-xs font-bold text-[#e2136e] bg-pink-100/80 px-2.5 py-1 rounded-full">
                Instant Verification
              </span>
            </div>

            {paymentMethod === "bkash" && (
              <div className="mt-4 pt-4 border-t border-pink-100 space-y-3.5 animate-in fade-in duration-300" onClick={(e) => e.stopPropagation()}>
                {/* Instruction Banner */}
                <div className="p-3.5 bg-white rounded-2xl border border-pink-200/80 flex items-center justify-between flex-wrap gap-2 text-xs text-gray-700 shadow-xs">
                  <div>
                    <span>Send <strong className="text-[#e2136e] font-extrabold text-sm">৳{totalAmount.toLocaleString()}</strong> to merchant number: </span>
                    <span className="font-mono bg-pink-50 text-[#e2136e] px-2 py-0.5 rounded-md font-bold text-xs">
                      {merchantNumber}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 bg-pink-50 hover:bg-pink-100 text-[#e2136e] font-bold px-3 py-1.5 rounded-xl transition cursor-pointer text-xs"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied ? "Copied!" : "Copy Number"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <Label htmlFor="field-walletNumber" className="text-xs font-bold text-gray-700 block mb-1">
                      Your bKash Number / বিকাশ নম্বর <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="field-walletNumber"
                        placeholder="01XXXXXXXXX"
                        value={paymentData.walletNumber || ""}
                        onChange={(e) => handlePaymentFieldChange("walletNumber", e.target.value)}
                        onBlur={() => onFieldBlur && onFieldBlur("walletNumber", paymentData.walletNumber)}
                        className={`bg-white pl-10 pr-10 h-11 rounded-xl text-sm font-mono focus:border-[#e2136e] ${
                          errors.walletNumber ? "border-red-500 ring-2 ring-red-500/10 bg-red-50/20" : "border-slate-200"
                        }`}
                      />
                      <Phone size={15} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${errors.walletNumber ? "text-red-400" : "text-gray-400"}`} />
                      {paymentData.walletNumber && !errors.walletNumber && /^01[3-9]\d{8}$/.test(paymentData.walletNumber.replace(/[^\d+]/g, "").replace(/^\+?88/, "")) && (
                        <CheckCircle2 size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-500" />
                      )}
                    </div>
                    {errors.walletNumber && (
                      <p className="text-xs text-red-500 font-semibold flex items-center gap-1 mt-1">
                        <AlertCircle size={13} className="shrink-0" />
                        <span>{errors.walletNumber}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="field-trxId" className="text-xs font-bold text-gray-700 block mb-1">
                      bKash Transaction ID (TrxID) <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="field-trxId"
                        placeholder="e.g. 9HJ28X0A"
                        value={paymentData.trxId || ""}
                        onChange={(e) => handlePaymentFieldChange("trxId", e.target.value)}
                        onBlur={() => onFieldBlur && onFieldBlur("trxId", paymentData.trxId)}
                        className={`bg-white pl-10 pr-10 h-11 rounded-xl text-sm font-mono uppercase focus:border-[#e2136e] ${
                          errors.trxId ? "border-red-500 ring-2 ring-red-500/10 bg-red-50/20" : "border-slate-200"
                        }`}
                      />
                      <Hash size={15} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${errors.trxId ? "text-red-400" : "text-gray-400"}`} />
                      {paymentData.trxId && !errors.trxId && paymentData.trxId.trim().length >= 6 && (
                        <CheckCircle2 size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-500" />
                      )}
                    </div>
                    {errors.trxId && (
                      <p className="text-xs text-red-500 font-semibold flex items-center gap-1 mt-1">
                        <AlertCircle size={13} className="shrink-0" />
                        <span>{errors.trxId}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Option 3: Nagad Online Payment */}
          <div
            onClick={() => setPaymentMethod && setPaymentMethod("nagad")}
            className={`border-2 rounded-2xl p-5 transition-all cursor-pointer ${
              paymentMethod === "nagad"
                ? "border-[#f04f32] bg-orange-50/30 shadow-xs ring-2 ring-[#f04f32]/10"
                : "border-slate-200 hover:border-slate-300 bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === "nagad" ? "border-[#f04f32] bg-[#f04f32]" : "border-slate-300"
                }`}>
                  {paymentMethod === "nagad" && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-[#f04f32] text-white px-2.5 py-0.5 rounded-lg font-extrabold text-xs">
                    Nagad
                  </span>
                  <span className="font-bold text-sm text-gray-900">Nagad Online Payment</span>
                </div>
              </div>
              <span className="text-xs font-bold text-[#f04f32] bg-orange-100/80 px-2.5 py-1 rounded-full">
                Instant Verification
              </span>
            </div>

            {paymentMethod === "nagad" && (
              <div className="mt-4 pt-4 border-t border-orange-100 space-y-3.5 animate-in fade-in duration-300" onClick={(e) => e.stopPropagation()}>
                {/* Instruction Banner */}
                <div className="p-3.5 bg-white rounded-2xl border border-orange-200/80 flex items-center justify-between flex-wrap gap-2 text-xs text-gray-700 shadow-xs">
                  <div>
                    <span>Send <strong className="text-[#f04f32] font-extrabold text-sm">৳{totalAmount.toLocaleString()}</strong> to merchant number: </span>
                    <span className="font-mono bg-orange-50 text-[#f04f32] px-2 py-0.5 rounded-md font-bold text-xs">
                      {merchantNumber}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 bg-orange-50 hover:bg-orange-100 text-[#f04f32] font-bold px-3 py-1.5 rounded-xl transition cursor-pointer text-xs"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied ? "Copied!" : "Copy Number"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <Label htmlFor="field-walletNumber" className="text-xs font-bold text-gray-700 block mb-1">
                      Your Nagad Number / নগদ নম্বর <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="field-walletNumber"
                        placeholder="01XXXXXXXXX"
                        value={paymentData.walletNumber || ""}
                        onChange={(e) => handlePaymentFieldChange("walletNumber", e.target.value)}
                        onBlur={() => onFieldBlur && onFieldBlur("walletNumber", paymentData.walletNumber)}
                        className={`bg-white pl-10 pr-10 h-11 rounded-xl text-sm font-mono focus:border-[#f04f32] ${
                          errors.walletNumber ? "border-red-500 ring-2 ring-red-500/10 bg-red-50/20" : "border-slate-200"
                        }`}
                      />
                      <Phone size={15} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${errors.walletNumber ? "text-red-400" : "text-gray-400"}`} />
                      {paymentData.walletNumber && !errors.walletNumber && /^01[3-9]\d{8}$/.test(paymentData.walletNumber.replace(/[^\d+]/g, "").replace(/^\+?88/, "")) && (
                        <CheckCircle2 size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-500" />
                      )}
                    </div>
                    {errors.walletNumber && (
                      <p className="text-xs text-red-500 font-semibold flex items-center gap-1 mt-1">
                        <AlertCircle size={13} className="shrink-0" />
                        <span>{errors.walletNumber}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="field-trxId" className="text-xs font-bold text-gray-700 block mb-1">
                      Nagad Transaction ID (TrxID) <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="field-trxId"
                        placeholder="e.g. 8KL23M9Q"
                        value={paymentData.trxId || ""}
                        onChange={(e) => handlePaymentFieldChange("trxId", e.target.value)}
                        onBlur={() => onFieldBlur && onFieldBlur("trxId", paymentData.trxId)}
                        className={`bg-white pl-10 pr-10 h-11 rounded-xl text-sm font-mono uppercase focus:border-[#f04f32] ${
                          errors.trxId ? "border-red-500 ring-2 ring-red-500/10 bg-red-50/20" : "border-slate-200"
                        }`}
                      />
                      <Hash size={15} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${errors.trxId ? "text-red-400" : "text-gray-400"}`} />
                      {paymentData.trxId && !errors.trxId && paymentData.trxId.trim().length >= 6 && (
                        <CheckCircle2 size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-500" />
                      )}
                    </div>
                    {errors.trxId && (
                      <p className="text-xs text-red-500 font-semibold flex items-center gap-1 mt-1">
                        <AlertCircle size={13} className="shrink-0" />
                        <span>{errors.trxId}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeleveryPage;
