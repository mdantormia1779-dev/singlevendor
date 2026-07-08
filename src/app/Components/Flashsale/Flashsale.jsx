"use client";

import React, { useEffect, useState } from "react";
import { Flame, Clock3 } from "lucide-react";
import Card from "../Shared/Card/Card";

const products = [
  {
    id: 1,
    title: "Premium Winter Jacket - Waterproof and Stylish",
    image:
      "https://i.ibb.co.com/TxnXgdRg/5df0afe2acf9f2a66088e57fc2503209b37beaea.png",
  },
  {
    id: 2,
    title: "Complete Your Look_ Denim & Sneakers Essentials",
    image:
      "https://i.ibb.co.com/60FwCqVr/f3205722e82695592c3759b56d935eaed785413d.png",
  },
  {
    id: 3,
    title: "Men Office Suit Style 2026 | Business Formal Outfit",
    image:
      "https://i.ibb.co.com/nTFvSVt/6d84311d02f16e5311c381a0244133893fd0a3a2.jpg",
  },
  {
    id: 4,
    title: "Apple AirPods Max Wireless Over-Ear Headphones",
    image: "https://i.ibb.co.com/nTFvSVt/6d84311d02f16e5311c381a0244133893fd0a3a2.jpg",
  },
];

const Flashsale = () => {
  const [time, setTime] = useState({
    hours: 12,
    minutes: 34,
    seconds: 53,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let h = prev.hours;
        let m = prev.minutes;
        let s = prev.seconds;

        if (s > 0) {
          s--;
        } else {
          s = 59;
          if (m > 0) {
            m--;
          } else {
            m = 59;
            if (h > 0) h--;
          }
        }

        return {
          hours: h,
          minutes: m,
          seconds: s,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto bg-[#FFF5F4] rounded-3xl p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
              <Flame className="text-red-500" />
            </div>

            <div>
              <h2 className="text-4xl font-bold">Flash sale 🔥</h2>

              <p className="text-gray-500">Buy before time runs out!</p>
            </div>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-3">
            <Clock3 className="text-red-500" />

            {[
              { value: time.hours, label: "Hours" },
              { value: time.minutes, label: "Mins" },
              { value: time.seconds, label: "Secs" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-red-500 text-white rounded-xl px-4 py-2 text-center"
              >
                <h3 className="text-3xl font-bold">
                  {String(item.value).padStart(2, "0")}
                </h3>

                <p className="text-xs">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-2">
          {products.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Flashsale;
