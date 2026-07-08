import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck, Truck, ArrowRight } from "lucide-react";
import Link from "next/link";

const OrderSummery = ({ items = [] }) => {
  // সাবটোটাল হিসেব করা (যদি প্রাইস স্ট্রিং হিসেবে থাকে তবে parseInt ব্যবহার করুন)
  const subtotal = items.reduce(
    (acc, item) => acc + parseInt(item.price.replace(/,/g, "")),
    0,
  );
  const savings = 1500; // আপনি চাইলে এটিও ডায়নামিক করতে পারেন
  const total = subtotal - savings;

  return (
    <div className="w-full space-y-4">
      <Card className="rounded-2xl border border-gray-100 shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>

          {/* Dynamic Items List */}
          <div className="space-y-4 mb-6">
            {items.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden border">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h4 className="text-sm font-medium leading-tight line-clamp-2">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">Qty: 1</p>
                </div>
                <div className="text-sm font-bold">৳{item.price}</div>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          {/* Pricing Details */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-medium text-gray-900">
                ৳{subtotal.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery charges</span>
              <span className="font-medium text-gray-900">free</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Savings</span>
              <span className="font-medium text-red-600">
                -৳{savings.toLocaleString()}
              </span>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Total Price */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-bold">Total</span>
            <span className="text-lg font-bold text-emerald-600">
              ৳{total.toLocaleString()}
            </span>
          </div>

          <Button className="w-full bg-emerald-500 hover:bg-emerald-600 h-12 text-white font-semibold rounded-xl">
            checkout <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <div className="flex justify-center gap-6 mt-4 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <ShieldCheck size={14} /> Secure
            </div>
            <div className="flex items-center gap-1">
              <Truck size={14} /> Fast Delivery
            </div>
          </div>
        </CardContent>
      </Card>

      <Link href={"/Pages/AllProduct"}>
        <Button
          variant="outline"
          className="w-full h-12 rounded-xl font-semibold border-gray-200"
        >
          Continue shopping
        </Button>
      </Link>
    </div>
  );
};

export default OrderSummery;
