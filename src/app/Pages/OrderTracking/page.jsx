"use client";

import React from "react";
import {
  Download,
  Truck,
  MapPin,
  Phone,
  CircleDollarSign,
  Package,
  CheckCircle2,
  Clock3,
} from "lucide-react";

const timeline = [
  {
    title: "Order placed",
    desc: "Your order has been placed successfully.",
    time: "May 20, 2026 • 02:30 PM",
    active: true,
  },
  {
    title: "Order confirmed.",
    desc: "Order confirmed and processing has begun.",
    time: "May 20, 2026 • 03:15 PM",
    active: true,
  },
  {
    title: "Packaging",
    desc: "Product packaging",
    time: "May 21, 2026 • 10:00 AM",
    active: true,
  },
  {
    title: "Shipped",
    desc: "Product sent for delivery",
    time: "May 21, 2026 • 04:30 PM",
    active: true,
  },
  {
    title: "On delivery",
    desc: "The product has arrived in your area.",
    time: "May 22, 2026 • 09:45 AM",
    active: true,
  },
  {
    title: "Delivered",
    desc: "Product delivered successfully.",
    time: "Estimated: May 22, 2026",
    active: false,
  },
];

const OrderTrackingPage = () => {
  return (
    <section className="bg-[#fafafa] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold">Order Tracking</h1>
            <p className="text-gray-500 mt-2">
              Order number: #ORD123456
            </p>
          </div>

          <button className="border rounded-xl px-5 py-3 flex items-center gap-2 text-sm hover:bg-gray-100">
            <Download size={18} />
            Invoice download
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Left */}
          <div className="lg:col-span-2 space-y-6">

            {/* Green Banner */}
            <div className="bg-[#18B779] rounded-2xl p-6 text-white flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                <Truck />
              </div>

              <div>
                <h3 className="font-bold text-lg">
                  Your product is on its way!
                </h3>

                <p className="text-sm text-green-100">
                  Estimated delivery: Today, 02:00 PM - 06:00 PM
                </p>

                <span className="text-xs mt-2 inline-block">
                  On delivery
                </span>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl border p-6">
              <h2 className="font-bold text-xl mb-8">
                Delivery status
              </h2>

              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div key={index} className="flex gap-5">

                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          item.active
                            ? "bg-[#18B779] text-white"
                            : "bg-gray-300 text-white"
                        }`}
                      >
                        <CheckCircle2 size={18} />
                      </div>

                      {index !== timeline.length - 1 && (
                        <div className="w-[2px] h-12 bg-gray-300 mt-1"></div>
                      )}
                    </div>

                    <div>
                      <h3
                        className={`font-semibold ${
                          item.active
                            ? "text-[#18B779]"
                            : "text-gray-700"
                        }`}
                      >
                        {item.title}
                      </h3>

                      <p className="text-gray-500 text-sm mt-1">
                        {item.desc}
                      </p>

                      <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                        <Clock3 size={12} />
                        {item.time}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Product */}
            <div className="bg-white border rounded-2xl p-6">
              <h2 className="font-bold mb-5">Order Item</h2>

              <div className="border rounded-xl p-4 flex items-center justify-between">

                <div className="flex items-center gap-4">
                  <img
                    src="/products/airpods.jpg"
                    alt=""
                    className="w-16 h-16 object-cover rounded-lg"
                  />

                  <div>
                    <h3 className="font-semibold">
                      Apple AirPods Max Wireless
                    </h3>

                    <p className="text-gray-500 text-sm">
                      Quantity: 1
                    </p>

                    <p className="font-bold mt-1">
                      ৳2,499
                    </p>
                  </div>
                </div>

                <button className="border rounded-full px-4 py-2 text-sm hover:bg-gray-100">
                  Buy Again
                </button>

              </div>
            </div>

          </div>

          {/* Right */}
          <div className="space-y-6">

            <div className="bg-white border rounded-2xl p-6">
              <h2 className="font-bold mb-5">
                Delivery Information
              </h2>

              <div className="flex gap-3 mb-5">
                <MapPin className="text-[#18B779]" size={18} />

                <div className="text-sm text-gray-600">
                  <p className="font-medium text-black">
                    Delivery address
                  </p>

                  Rahim Ahmed
                  <br />
                  House No. 123, Road No. 7
                  <br />
                  Mirpur-10, Dhaka-1216
                  <br />
                  Bangladesh
                </div>
              </div>

              <hr />

              <div className="flex gap-3 mt-5">
                <Phone className="text-[#18B779]" size={18} />

                <div>
                  <p className="font-medium">
                    Communication
                  </p>

                  <p className="text-sm text-gray-500">
                    +880 1577147480
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-2xl p-6">
              <h2 className="font-bold mb-5">
                Payment Summary
              </h2>

              <div className="flex justify-between py-2">
                <span>Subtotal</span>
                <span>৳2,499</span>
              </div>

              <div className="flex justify-between py-2">
                <span>Delivery charges</span>
                <span>৳60</span>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between font-bold text-xl text-[#18B779]">
                <span>Total</span>
                <span>৳2,559</span>
              </div>

              <div className="flex items-center gap-2 mt-6 text-sm">
                <CircleDollarSign
                  className="text-[#18B779]"
                  size={18}
                />
                Payment Method: Cash on Delivery
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default OrderTrackingPage;