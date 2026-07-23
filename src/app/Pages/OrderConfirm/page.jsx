"use client";

import React, { useState } from "react";
import ContactPage from "@/app/Components/Contact/page";
import OrderSummaryConfirm from "@/app/Components/OrderSummaryConfirm/OrderSummaryConfirm";
import DeleveryPage from "@/app/Components/Delevery/page";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, clearBuyNowItem } from "@/app/store/cartSlice";

const OrderConfirmPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const buyNowItem = useSelector((state) => state.cart.buyNowItem);

  const handleConfirmOrder = () => {
    if (!buyNowItem) {
      alert("No product selected!");
      return;
    }

    setIsLoading(true);

    const newOrder = {
      id: `#ORD-${Date.now()}`,
      date: new Date().toLocaleDateString("en-BD"),
      status: "Confirmed",
      total: buyNowItem.totalPrice,
      items: buyNowItem.quantity,

      products: [
        {
          name: buyNowItem.title,
          qty: buyNowItem.quantity,
          price: buyNowItem.totalPrice,
          image: buyNowItem.image || buyNowItem.images?.[0],
        },
      ],
    };

    setTimeout(() => {
      dispatch(addOrder(newOrder)); // ✅ ORDER SAVE
      dispatch(clearBuyNowItem()); // ✅ CLEAR BUY NOW

      console.log("ORDER SAVED:", newOrder);

      router.push("/Pages/OrderSuccess");
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* LEFT */}
      <div className="lg:col-span-2 space-y-6">
        <ContactPage />
        <DeleveryPage />
      </div>

      {/* RIGHT */}
      <div>
        <OrderSummaryConfirm
          handleConfirmOrder={handleConfirmOrder}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default OrderConfirmPage;
