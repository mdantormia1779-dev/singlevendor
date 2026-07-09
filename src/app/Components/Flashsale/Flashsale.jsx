"use client";

import React, { useEffect, useState } from "react";
import { Flame, Clock3 } from "lucide-react";
import Card from "../Shared/Card/Card";
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    title: "Beige White Jeans with Brown Shirt -Casual Men's Outfit",
    price: "২,৪৯৯",
    oldPrice: "৩,৯৯৯",
    rating: "4.8",
    reviews: "342",
    sold: "1240 sold",
    discount: "30% OFF",
    img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&q=80",
    // শুধুমাত্র ডিটেইলস পেজের জন্য ডাটা
    description:
      "Get maximum comfort and style with the Beige White Jeans with Brown Shirt combo. This outfit is crafted from premium quality fabrics, tailored perfectly for contemporary casual wear and everyday styling.",
    features: [
      "Premium quality comfortable fabric",
      "Trendy and modern casual design",
      "Durable stitching for long-lasting use",
      "Easy to wash and maintain color quality",
    ],
    specifications: {
      category: "Men's Fashion",
      fitType: "Regular/Casual Cool",
      material: "Premium Cotton Blend",
      rating: "4.8 / 5.0",
    },
    reviewsList: [
      {
        user: "Rahat Khan",
        text: "The fitting is perfect and the fabric quality feels very premium. Highly recommended!",
        rating: 5,
        time: "2 days ago",
      },
      {
        user: "Asif Iqbal",
        text: "Great color combination. Looks exactly like the picture.",
        rating: 5,
        time: "3 days ago",
      },
      {
        user: "Tanvir Ahmed",
        text: "Good product according to the price tag. Happy with the purchase.",
        rating: 4,
        time: "1 week ago",
      },
    ],
    questionsList: [
      "Is the size chart accurate for this outfit?",
      "Will the fabric color fade after multiple washes?",
      "Is there a return/exchange policy if it doesn't fit?",
    ],
  },
  {
    id: 2,
    title: "Complete Your Look_ Denim & Sneakers Essentials",
    price: "২,৪৯৯",
    oldPrice: "৩,৯৯৯",
    rating: "4.7",
    reviews: "128",
    sold: "1240 sold",
    discount: "30% OFF",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&q=80",
    description:
      "Upgrade your street style with our Denim & Sneakers Essentials combo. Perfect for weekend hangouts and smart-casual setups.",
    features: [
      "Heavyweight premium denim",
      "Soft inner lining for comfort",
      "Versatile styling options",
    ],
    specifications: {
      category: "Men's Clothing",
      fitType: "Slim Fit",
      material: "100% Cotton Denim",
      rating: "4.7 / 5.0",
    },
    reviewsList: [
      {
        user: "Sajid Hasan",
        text: "Awesome denim quality! Feels rugged yet very comfortable.",
        rating: 5,
        time: "1 day ago",
      },
      {
        user: "Naimur R.",
        text: "Sneakers fit perfectly, denim is slightly long but quality is top notch.",
        rating: 4,
        time: "5 days ago",
      },
    ],
    questionsList: [
      "Are the sneakers slip-resistant?",
      "Can I change the sneaker size separately?",
    ],
  },
  {
    id: 3,
    title: "Combo Complete Your Look_ Denim & Sneakers Essentials",
    price: "২,৪৯৯",
    oldPrice: "৩,৯৯৯",
    rating: "4.8",
    reviews: "342",
    sold: "1240 sold",
    discount: "30% OFF",
    img: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=500&q=80",
    description:
      "The ultimate casual clothing package. Features high durability items that form a perfect baseline for any wardrobe.",
    features: [
      "Curated lifestyle combo",
      "Breathable fabric engineering",
      "Colorfast assurance",
    ],
    specifications: {
      category: "Combo Packs",
      fitType: "Standard Fit",
      material: "Mixed Cotton/Polyester",
      rating: "4.8 / 5.0",
    },
    reviewsList: [
      {
        user: "User 3A",
        text: "Satisfied with this package!",
        rating: 5,
        time: "A week ago",
      },
    ],
    questionsList: [
      "Is cash on delivery available outside Dhaka for this combo?",
    ],
  },
  {
    id: 4,
    title: "Premium Winter Jacket - Waterproof and Stylish",
    price: "২,৪৯৯",
    oldPrice: "৩,৯৯৯",
    rating: "4.9",
    reviews: "512",
    sold: "1240 sold",
    discount: "30% OFF",
    img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80",
    description:
      "Beat the winter cold without sacrificing your style. This premium jacket offers full windproof and waterproof capability.",
    features: [
      "Water-resistant outer shell",
      "Warm quilted inner padding",
      "Detachable hood system",
    ],
    specifications: {
      category: "Outerwear",
      fitType: "Regular Fit",
      material: "Premium Polyester & Fleece",
      rating: "4.9 / 5.0",
    },
    reviewsList: [
      {
        user: "Zeeshan",
        text: "Keeps very warm. Testing it in cold weather and it works beautifully.",
        rating: 5,
        time: "Yesterday",
      },
    ],
    questionsList: ["Is it suitable for heavy rainfall or just light drizzle?"],
  },
  {
    id: 5,
    title: "Manfinity CasualCool Men Solid Color Casual Overcoat,",
    price: "২,৪৯৯",
    oldPrice: "৩,৯৯৯",
    rating: "4.6",
    reviews: "94",
    sold: "1240 sold",
    discount: "30% OFF",
    img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&q=80",
    description:
      "A sleek solid overcoat that brings out a formal yet casual cool demeanor. Best paired with turtle necks or solid tees.",
    features: [
      "Elegant long-line cutting",
      "Dual side functional pockets",
      "Premium button closures",
    ],
    specifications: {
      category: "Overcoats",
      fitType: "Relaxed Fit",
      material: "Woolen Blend",
      rating: "4.6 / 5.0",
    },
    reviewsList: [
      {
        user: "Mahdi",
        text: "Gives a very premium look. Perfect for formal winter nights.",
        rating: 5,
        time: "4 days ago",
      },
    ],
    questionsList: ["Does it require dry cleaning?"],
  },
  {
    id: 6,
    title: "Manfinity CasualCool Men's Casual Button-Front Drop",
    price: "২,৪৯৯",
    oldPrice: "৩,৯৯৯",
    rating: "4.8",
    reviews: "342",
    sold: "1240 sold",
    discount: "30% OFF",
    img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&q=80",
    description:
      "Drop shoulder casual button-front shirt for relaxed vibes. Designed specifically for the youth lifestyle.",
    features: [
      "Drop shoulder relaxed cut",
      "Lightweight breathable design",
      "Trendy street style pattern",
    ],
    specifications: {
      category: "Shirts",
      fitType: "Oversized Fit",
      material: "100% Fine Cotton",
      rating: "4.8 / 5.0",
    },
    reviewsList: [
      {
        user: "Imran",
        text: "The oversized look is superb. The cloth is very soft.",
        rating: 5,
        time: "2 days ago",
      },
    ],
    questionsList: [
      "Should I buy my regular size or size down for this oversized shirt?",
    ],
  },
];

const Flashsale = () => {
  const [time, setTime] = useState({ hours: 12, minutes: 34, seconds: 53 });

  // টাইমার লজিক
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { hours: h, minutes: m, seconds: s } = prev;
        if (s > 0) s--;
        else {
          s = 59;
          if (m > 0) m--;
          else {
            m = 59;
            if (h > 0) h--;
          }
        }
        return { hours: h, minutes: m, seconds: s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto bg-[#FFF5F4] rounded-3xl p-8 overflow-hidden">
        {/* Header Section */}
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

          {/* Timer Section */}
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

        {/* Animated Products Section */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6"
            // শুরুতে X = 0, মাঝখানে X = -50% (পুরো কন্টেন্টের অর্ধেক)
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {/* এখানে কন্টেন্ট দ্বিগুণ করার বদলে তিনগুণ করুন যদি লুপে গ্যাপ মনে হয় */}
            {[...products, ...products, ...products].map((product, index) => (
              <div key={index} className="shrink-0 w-80">
                <Card product={product} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Flashsale;
