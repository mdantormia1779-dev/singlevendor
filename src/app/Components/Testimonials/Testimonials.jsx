"use client";

import Image from "next/image";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Ebrahim",
    city: "Chittagong",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
    rating: 5,
    review:
      "Amazing service! Got my order in just 2 days. Product was exactly as described. Will definitely shop again!",
  },
  {
    id: 2,
    name: "Arif Ahmed",
    city: "Sylhet",
    image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80",
    rating: 4,
    review:
      "Fast delivery and excellent packaging. The bKash payment option is super convenient for me.",
  },
  {
    id: 3,
    name: "Fatema Khatun",
    city: "Chittagong",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    rating: 5,
    review:
      "Trusted platform. I've been buying from Finora for 2 years. Never had a bad experience. Great prices.",
  },
];


export default function Testimonials() {
  return (
    <section className="py-10 md:py-12 bg-slate-50/70 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Real Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 tracking-tight">
            Loved by 50,000+ Happy Shoppers
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Real reviews and verified purchases from customers nationwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={15}
                        className={
                          star <= item.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-200"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/70">
                    Verified Buyer ✓
                  </span>
                </div>

                {/* Review */}
                <p className="text-sm text-slate-600 leading-relaxed italic">
                  &ldquo;{item.review}&rdquo;
                </p>
              </div>

              {/* User Info */}
              <div className="flex items-center gap-3.5 mt-6 pt-5 border-t border-slate-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={44}
                  height={44}
                  className="rounded-full object-cover w-11 h-11 ring-2 ring-emerald-500/20"
                />

                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {item.name}
                  </h3>
                  <p className="text-slate-400 text-xs font-medium">
                    {item.city}, Bangladesh
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}