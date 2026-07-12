"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ContactPage from "@/app/Components/Contact/page";
import OrderSummaryConfirm from "@/app/Components/OrderSummaryConfirm/OrderSummaryConfirm";
import DeleveryPage from "@/app/Components/Delevery/page";

const OrderConfirmPage = () => {
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [districts, setDistricts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleConfirmOrder = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/Pages/OrderSuccess");
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column: Contact Form Div */}
      <div className="lg:col-span-2">
        <ContactPage
          selectedDivision={selectedDivision}
          setSelectedDivision={setSelectedDivision}
          selectedDistrict={selectedDistrict}
          setSelectedDistrict={setSelectedDistrict}
          districts={districts}
          setDistricts={setDistricts}
        />
      </div>

      {/* Right Column: Order Summary Div */}
      <div>
        <OrderSummaryConfirm
          handleConfirmOrder={handleConfirmOrder}
          isLoading={isLoading}
        />
      </div>
      <div className="lg:col-span-2 col-span-1">
        <DeleveryPage />
      </div>
    </div>
  );
};

export default OrderConfirmPage;
