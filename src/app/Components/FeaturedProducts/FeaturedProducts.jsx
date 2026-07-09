import { Heart, ShoppingCart, ArrowRight, Star } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import Card from "../Shared/Card/Card";
import Link from "next/link";
import products from "@/app/data/data.json";

const FeaturedProducts = async () => {
  return (
    <section className="pb-15 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">
              Featured products
            </h2>
            <p className="text-gray-500 text-lg mt-1">
              Items specially selected for you
            </p>
          </div>
          <Link href="/Pages/AllProduct">
            <button className="flex items-center gap-2 px-6 py-2.5 border border-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all">
              View All <ArrowRight size={18} />
            </button>
          </Link>
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

export default FeaturedProducts;
