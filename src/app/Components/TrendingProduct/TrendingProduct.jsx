"use client";
import Image from "next/image";
import { Heart, ShoppingCart, ArrowRight, Star } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import Card from "../Shared/Card/Card";

const products = [
  {
    id: 1,
    title: "Classic Cotton Shirt For Men Trendy Outfit for Men in 2026",
    image:
      "https://i.ibb.co.com/60FwCqVr/f3205722e82695592c3759b56d935eaed785413d.png",
    price: 2499,
    oldPrice: 3999,
    rating: 4.8,
    reviews: 342,
    sold: 1240,
    discount: 30,
  },
  {
    id: 2,
    title: "Luxury Beige Suit Outfit for Men | Billionaire Lifestyle Look",
    image:
      "https://i.ibb.co.com/60FwCqVr/f3205722e82695592c3759b56d935eaed785413d.png",
    price: 2499,
    oldPrice: 3999,
    rating: 4.8,
    reviews: 342,
    sold: 1240,
    discount: 30,
  },
  {
    id: 3,
    title: "Desperte com estilo e boas vibrações! (comente eu quero)",
    image:
      "https://i.ibb.co.com/TxnXgdRg/5df0afe2acf9f2a66088e57fc2503209b37beaea.png",
    price: 2499,
    oldPrice: 3999,
    rating: 4.8,
    reviews: 342,
    sold: 1240,
    discount: 30,
  },
  {
    id: 4,
    title: "Apple AirPods Max Wireless Over-Ear Headphones white",
    image:
      "https://i.ibb.co.com/60FwCqVr/f3205722e82695592c3759b56d935eaed785413d.png",
    price: 2499,
    oldPrice: 3999,
    rating: 4.8,
    reviews: 342,
    sold: 1240,
    discount: 30,
  },
  {
    id: 5,
    title: "Classic Cotton Shirt For Men Trendy Outfit for Men in 2026",
    image:
      "https://i.ibb.co.com/60FwCqVr/f3205722e82695592c3759b56d935eaed785413d.png",
    price: 2499,
    oldPrice: 3999,
    rating: 4.8,
    reviews: 342,
    sold: 1240,
    discount: 30,
  },
  {
    id: 6,
    title: "Luxury Beige Suit Outfit for Men | Billionaire Lifestyle Look",
    image:
      "https://i.ibb.co.com/60FwCqVr/f3205722e82695592c3759b56d935eaed785413d.png",
    price: 2499,
    oldPrice: 3999,
    rating: 4.8,
    reviews: 342,
    sold: 1240,
    discount: 30,
  },
  {
    id: 7,
    title: "Desperte com estilo e boas vibrações! (comente eu quero)",
    image:
      "https://i.ibb.co.com/TxnXgdRg/5df0afe2acf9f2a66088e57fc2503209b37beaea.png",
    price: 2499,
    oldPrice: 3999,
    rating: 4.8,
    reviews: 342,
    sold: 1240,
    discount: 30,
  },
  {
    id: 8,
    title: "Apple AirPods Max Wireless Over-Ear Headphones white",
    image:
      "https://i.ibb.co.com/60FwCqVr/f3205722e82695592c3759b56d935eaed785413d.png",
    price: 2499,
    oldPrice: 3999,
    rating: 4.8,
    reviews: 342,
    sold: 1240,
    discount: 30,
  },
];

const TrendingProduct = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">
              Trending Product
            </h2>
            {/* <p className="text-gray-500 text-lg mt-1">
              Items specially selected for you
            </p> */}
          </div>
          <button className="flex items-center gap-2 px-6 py-2.5 border border-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all">
            View All <ArrowRight size={18} />
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingProduct;
