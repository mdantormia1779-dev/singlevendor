"use client";
import EmptyCard from "@/app/Components/EmptyCard/EmptyCard";
import OrderSummery from "@/app/Components/OrderSummery/OrderSummery";
import ShopingAdd from "@/app/Components/ShopingAdd/ShopingAdd";
import { useSelector } from "react-redux";

const ShopingCardsPage = () => {
  // state.cart.items নিশ্চিত করুন আপনার Slice-এর সাথে মিল আছে কিনা
  const cartItems = useSelector((state) => state.cart.items) || [];

  return (
    <section className="min-h-screen bg-[#FAFAFA] py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="mt-3 text-lg text-gray-500">
            {cartItems.length} items in your cart
          </p>
        </div>

        {!cartItems || cartItems.length === 0 ? (
          <EmptyCard />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <ShopingAdd key={item.id} item={item} />
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <OrderSummery items={cartItems} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopingCardsPage;