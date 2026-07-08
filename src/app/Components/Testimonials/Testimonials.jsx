"use client";

import Image from "next/image";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Ebrahim",
    city: "Chittagong",
    image: "/users/user1.jpg",
    rating: 5,
    review:
      "Amazing service! Got my order in just 2 days. Product was exactly as described. Will definitely shop again!",
  },
  {
    id: 2,
    name: "Arif Ahmed",
    city: "Sylhet",
    image: "/users/user2.jpg",
    rating: 4,
    review:
      "Fast delivery and excellent packaging. The bKash payment option is super convenient for me.",
  },
  {
    id: 3,
    name: "Fatema Khatun",
    city: "Chittagong",
    image: "/users/user3.jpg",
    rating: 5,
    review:
      "Trusted platform. I've been buying from ShopyBD for 2 years. Never had a bad experience. Great prices.",
  },

];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex gap-8 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth snap-x snap-mandatory pb-4">

          {reviews.map((item) => (
            <div
              key={item.id}
              className="min-w-[380px] max-w-[380px] snap-start flex-shrink-0 bg-white border border-gray-200 rounded-[28px] p-6 hover:shadow-lg duration-300"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={
                      star <= item.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

              {/* Review */}
              <p className="text-[16px] text-gray-700 leading-8 h-[95px]">
                "{item.review}"
              </p>

              {/* User */}
              <div className="flex items-center gap-4 mt-7">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={44}
                  height={44}
                  className="rounded-full object-cover w-11 h-11"
                />

                <div>
                  <h3 className="text-[24px] font-semibold text-gray-900">
                    {item.name}
                  </h3>

                  <p className="text-gray-400 text-[18px]">
                    {item.city}
                  </p>
                </div>
              </div>
            </div>
          ))}

        </div>

        {/* Dots */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <span className="w-3 h-3 rounded-full bg-[#19b77a]"></span>
          <span className="w-3 h-3 rounded-full border border-[#19b77a]"></span>
          <span className="w-3 h-3 rounded-full border border-[#19b77a]"></span>
          <span className="w-3 h-3 rounded-full border border-[#19b77a]"></span>
        </div>

      </div>
    </section>
  );
}