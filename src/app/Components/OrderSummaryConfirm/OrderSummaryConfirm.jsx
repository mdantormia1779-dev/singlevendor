"use client";

import React from "react";
import { useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const OrderSummaryConfirm = ({ handleConfirmOrder, isLoading }) => {
  const buyNowItem = useSelector((state) => state.cart.buyNowItem);

  if (!buyNowItem) {
    return <p className="text-center text-gray-500">No item selected</p>;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h2 className="font-bold">Order Summary</h2>

          <div className="flex items-center gap-3">
            <img
              src={buyNowItem.image || buyNowItem.images?.[0]}
              className="w-16 h-16 object-cover rounded-lg border"
            />

            <div className="text-sm">
              <p className="font-medium">{buyNowItem.title}</p>
              <p className="text-gray-500">
                Qty: {buyNowItem.quantity}
              </p>
            </div>

            <p className="font-bold">
              ৳{buyNowItem.totalPrice}
            </p>
          </div>

          <div className="flex gap-2">
            <Input placeholder="Coupon code" />
            <Button variant="outline">Apply</Button>
          </div>

          <div className="space-y-2 text-sm border-t pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>৳{buyNowItem.totalPrice}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="text-green-600">FREE</span>
            </div>

            <div className="flex justify-between pt-2 font-bold text-lg">
              <span>Total</span>
              <span className="text-green-600">
                ৳{buyNowItem.totalPrice}
              </span>
            </div>
          </div>

          <Button
            onClick={handleConfirmOrder}
            disabled={isLoading}
            className="w-full bg-green-600 h-12 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" />
                Processing...
              </>
            ) : (
              `Confirm Order - ৳${buyNowItem.totalPrice}`
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSummaryConfirm;