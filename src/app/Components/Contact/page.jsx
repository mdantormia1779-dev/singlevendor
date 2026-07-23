"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearBuyNowItem, addOrder } from "@/app/store/cartSlice";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import DeleveryPage from "../Delevery/page";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const locationData = {
  Dhaka: ["Dhaka", "Gazipur", "Narayanganj", "Faridpur", "Tangail"],
  Sylhet: ["Sylhet", "Sunamganj", "Habiganj", "Moulvibazar"],
  Chittagong: ["Chittagong", "Cox's Bazar", "Comilla", "Noakhali"],
  Rajshahi: ["Rajshahi", "Bogra", "Pabna", "Natore"],
  Khulna: ["Khulna", "Jessore", "Kushtia"],
  Barisal: ["Barisal", "Patuakhali", "Bhola"],
  Rangpur: ["Rangpur", "Dinajpur", "Gaibandha"],
  Mymensingh: ["Mymensingh", "Jamalpur", "Sherpur"],
};

const ContactPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const buyNowItem = useSelector((state) => state.cart.buyNowItem);

  const [selectedDivision, setSelectedDivision] = useState("");
  const [districts, setDistricts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // ❗ no product
  if (!buyNowItem) {
    return (
      <div className="text-center py-20 text-gray-500 font-bold">
        No order found!
      </div>
    );
  }

  const handleDivisionChange = (division) => {
    setSelectedDivision(division);
    setDistricts(locationData[division] || []);
  };

  // ✅ Confirm Order
  const handleConfirmOrder = () => {
    setIsLoading(true);

    const newOrder = {
      id: `#FIN-${Date.now()}`,

      // ✅ better date format
      date: new Date().toLocaleDateString("en-BD", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),

      items: buyNowItem.quantity, // ✅ dynamic

      status: "Confirmed",
      statusColor: "bg-yellow-100 text-yellow-600",

      total: `৳${buyNowItem.totalPrice}`,
      review: false,

      products: [
        {
          name: buyNowItem.title,
          qty: buyNowItem.quantity,
          price: `৳${buyNowItem.totalPrice}`,
          image: buyNowItem.image || buyNowItem.images?.[0],
        },
      ],
    };

    setTimeout(() => {
      dispatch(addOrder(newOrder)); // ✅ save order
      dispatch(clearBuyNowItem());
      router.push("/Pages/OrderSuccess");
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* LEFT */}
      <div className="lg:col-span-2 space-y-6">

        {/* Contact */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h2 className="font-semibold">Contact Information</h2>

            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Full Name *" />
              <Input placeholder="Mobile Number *" />
            </div>
          </CardContent>
        </Card>

        {/* Address */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h2 className="font-semibold">Delivery Address</h2>

            <div className="grid grid-cols-2 gap-4">

              <Select onValueChange={handleDivisionChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Division" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(locationData).map((div) => (
                    <SelectItem key={div} value={div}>
                      {div}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select disabled={!selectedDivision}>
                <SelectTrigger>
                  <SelectValue placeholder="District" />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((dist) => (
                    <SelectItem key={dist} value={dist}>
                      {dist}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                className="col-span-full"
                placeholder="Area / Upazila"
              />

              <textarea
                className="col-span-full p-3 border rounded-md"
                rows={3}
                placeholder="Street Address"
              />
            </div>
          </CardContent>
        </Card>

        <DeleveryPage />
      </div>

      {/* RIGHT */}
      <div>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h2 className="font-bold">Order Summary</h2>

            {/* Product */}
            <div className="flex items-center gap-3">
              <img
                src={buyNowItem.image || buyNowItem.images?.[0]}
                className="w-16 h-16 rounded-lg border"
              />

              <div>
                <p className="font-medium">{buyNowItem.title}</p>
                <p className="text-sm text-gray-500">
                  Qty: {buyNowItem.quantity}
                </p>
              </div>

              <p className="font-bold ml-auto">
                ৳{buyNowItem.totalPrice}
              </p>
            </div>

            {/* Price */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>৳{buyNowItem.totalPrice}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-green-600 font-bold">
                  FREE
                </span>
              </div>

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-green-600">
                  ৳{buyNowItem.totalPrice}
                </span>
              </div>
            </div>

            {/* Button */}
            <Button
              onClick={handleConfirmOrder}
              disabled={isLoading}
              className="w-full bg-green-600 h-12 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" />
                  Processing...
                </>
              ) : (
                `Confirm Order - ৳${buyNowItem.totalPrice}`
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage;