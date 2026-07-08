"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Truck, CreditCard } from "lucide-react";

const DeleveryPage = () => {
  const [deliveryMethod, setDeliveryMethod] = useState("express");
  const [paymentMethod, setPaymentMethod] = useState("bkash");

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="max-w-5xl space-y-6">
        {/* Delivery Method */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="font-semibold flex items-center gap-2 mb-4">
              <Truck size={18} /> Delivery method
            </h2>
            <RadioGroup
              value={deliveryMethod}
              onValueChange={setDeliveryMethod}
            >
              {/* Standard Delivery */}
              <div
                className={`flex items-center space-x-3 border p-3 rounded-md mb-2 transition-all ${deliveryMethod === "standard" ? "border-green-500 bg-green-50" : "border-gray-200"}`}
              >
                <RadioGroupItem value="standard" id="std" />
                <Label htmlFor="std" className="cursor-pointer font-medium">
                  Standard delivery (2-4 business days) - ৳60
                </Label>
              </div>

              {/* Express Delivery */}
              <div
                className={`flex items-center space-x-3 border-2 p-3 rounded-md transition-all ${deliveryMethod === "express" ? "border-green-500 bg-green-50" : "border-gray-200"}`}
              >
                <RadioGroupItem value="express" id="exp" />
                <Label
                  htmlFor="exp"
                  className={`cursor-pointer font-bold ${deliveryMethod === "express" ? "text-green-700" : ""}`}
                >
                  Express delivery (1-2 business days) - ৳120
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Payment Method Section */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="font-semibold flex items-center gap-2 mb-4">
              <CreditCard size={18} /> Payment Method
            </h2>

            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="space-y-2"
            >
              {/* COD */}
              <div
                className={`border p-4 rounded-md transition-all ${paymentMethod === "cod" ? "border-green-500 bg-green-50" : "border-gray-200"}`}
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="cursor-pointer font-bold">
                    Cash on Delivery (COD)
                  </Label>
                </div>
              </div>

              {/* bKash */}
              <div
                onClick={() => setPaymentMethod("bkash")} // এখানে ক্লিক হ্যান্ডলার যোগ করা হয়েছে
                className={`border-2 p-4 rounded-md transition-all cursor-pointer ${
                  paymentMethod === "bkash"
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <RadioGroupItem value="bkash" id="bkash" />
                  <Label
                    htmlFor="bkash"
                    className="cursor-pointer flex items-center"
                  >
                    <span className="bg-[#e2136e] text-white px-2 py-0.5 rounded font-bold text-[10px] mr-2">
                      bKash
                    </span>
                    <span className="font-bold">বিকাশ পেমেন্ট</span>
                  </Label>
                </div>
                {/* ইনপুট ফিল্ড */}
                {paymentMethod === "bkash" && (
                  <div className="space-y-3 pl-8">
                    <p className="text-xs text-gray-600">
                      Send ৳7,357 from your bKash number to 01577147480
                    </p>
                    <Input placeholder="bKash Number" />
                    <Input placeholder="Transaction ID" />
                  </div>
                )}
              </div>

              {/* Nagad */}
              <div
                onClick={() => setPaymentMethod("nagad")} // এখানে ক্লিক হ্যান্ডলার যোগ করা হয়েছে
                className={`border-2 p-4 rounded-md transition-all cursor-pointer ${
                  paymentMethod === "nagad"
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <RadioGroupItem value="nagad" id="nagad" />
                  <Label
                    htmlFor="nagad"
                    className="cursor-pointer flex items-center"
                  >
                    <span className="bg-[#f04f32] text-white px-2 py-0.5 rounded font-bold text-[10px] mr-2">
                      Nagad
                    </span>
                    <span className="font-bold">Nagad payment</span>
                  </Label>
                </div>
                {/* ইনপুট ফিল্ড */}
                {paymentMethod === "nagad" && (
                  <div className="space-y-3 pl-8">
                    <p className="text-xs text-gray-600">
                      Send ৳7,357 from your Nagad number to 01577147480
                    </p>
                    <Input placeholder="Nagad Number" />
                    <Input placeholder="Transaction ID" />
                  </div>
                )}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeleveryPage;
