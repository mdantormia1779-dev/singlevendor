"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const OrderSummaryConfirm = ({ handleConfirmOrder, isLoading }) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h2 className="font-bold">Order Summary</h2>
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-gray-100 rounded-lg border" />
            <div className="text-sm">
              <p className="font-medium">Premium Wireless Headphones</p>
              <p className="text-gray-500">Qty: 1</p>
            </div>
            <p className="font-bold">৳2,499</p>
          </div>

          <div className="flex gap-2">
            <Input placeholder="Coupon code" />
            <Button variant="outline">Apply</Button>
          </div>

          <div className="space-y-2 text-sm border-t pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span> <span>৳2,499</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery charges</span>{" "}
              <span className="text-green-600 font-bold">FREE</span>
            </div>
            <div className="flex justify-between pt-2 font-bold text-lg">
              <span>Total</span>{" "}
              <span className="text-green-600">৳2,499</span>
            </div>
          </div>

          <Button
            onClick={handleConfirmOrder}
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 h-12 text-base flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              "Confirm Order - ৳2,499"
            )}
          </Button>

          <div className="flex justify-center mt-4 gap-4 text-xs text-gray-400">
            <span>🛡️ Secure</span> <span>🚚 Fast Delivery</span>
          </div>
        </CardContent>
      </Card>

      <div className="bg-green-50 p-4 rounded-lg text-sm text-green-900 border border-green-100">
        <strong>Note:</strong> You will receive a confirmation call. Please provide the correct number.
      </div>
    </div>
  );
};

export default OrderSummaryConfirm;