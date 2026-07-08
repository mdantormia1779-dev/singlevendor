"use client";

import React from "react";
import {
  CheckCircle2,
  Truck,
  Home,
  Package,
  CheckCheck,
} from "lucide-react";

const OrderSucess = () => {
  return (
    <section className="min-h-screen bg-[#fafafa] py-14">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        {/* Main Card */}
        <div className="w-full max-w-155 bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2
                size={58}
                className="text-[#10B981]"
                strokeWidth={2.2}
              />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-center text-[42px] font-bold text-[#10B981] mt-6">
            Order Placed Successfully!
          </h1>

          <p className="text-center text-gray-500 text-lg mt-4 leading-8">
            Thank you for your order. We've received your order and will start
            processing it soon.
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-2xl p-6 mt-8">
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Order Number:</span>
              <span className="font-semibold">BD861964385</span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-gray-500">Estimated Delivery:</span>
              <span className="font-semibold">20/05/2026</span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-gray-500">Payment Method:</span>
              <span className="font-semibold">Cash on Delivery</span>
            </div>
          </div>

          {/* Buttons */}
          <button className="w-full h-14 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-semibold flex items-center justify-center gap-2 mt-7 transition">
            <Truck size={20} />
            Track Your Order
          </button>

          <button className="w-full h-14 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-800 font-semibold flex items-center justify-center gap-2 mt-4 transition">
            <Home size={20} />
            Continue Shopping
          </button>

          <div className="border-t border-gray-200 mt-8 pt-6 text-center">
            <p className="text-gray-500 text-sm">
              A confirmation SMS has been sent to your phone number.
            </p>

            <p className="text-sm mt-2 text-gray-500">
              Need help? Contact us at{" "}
              <span className="text-[#10B981] font-medium">
                +880 1234-567890
              </span>
            </p>
          </div>
        </div>

        {/* Bottom Status Cards */}
        <div className="grid grid-cols-3 gap-5 mt-8 w-full max-w-[620px]">
          <div className="bg-white rounded-2xl border border-gray-200 py-8 px-4 text-center hover:shadow-md transition">
            <Package className="mx-auto text-amber-500" size={34} />
            <h3 className="font-bold text-xl mt-4">Order Confirmed</h3>
            <p className="text-gray-500 text-sm mt-2">We received your order</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 py-8 px-4 text-center hover:shadow-md transition">
            <Truck className="mx-auto text-orange-500" size={34} />
            <h3 className="font-bold text-xl mt-4">Processing</h3>
            <p className="text-gray-500 text-sm mt-2">Preparing for delivery</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 py-8 px-4 text-center hover:shadow-md transition">
            <CheckCheck className="mx-auto text-green-500" size={34} />
            <h3 className="font-bold text-xl mt-4">Delivered</h3>
            <p className="text-gray-500 text-sm mt-2">Enjoy your purchase!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSucess;
