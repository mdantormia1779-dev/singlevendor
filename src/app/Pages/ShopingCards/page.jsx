"use client";
import OrderSummery from "@/app/Components/OrderSummery/OrderSummery";
import ShopingAdd from "@/app/Components/ShopingAdd/ShopingAdd";

const ShopingCardsPage = () => {
  // আপনার ডাটা এখানে থাকবে
  const cartItems = [
    { id: 1, name: "Apple AirPods Max Wireless Over-Ear Headphones white", price: "2,499", oldPrice: "3,999", sold: "1240", image: "https://i.ibb.co.com/TxnXgdRg/5df0afe2acf9f2a66088e57fc2503209b37beaea.png" },
    { id: 2, name: "Premium Wireless Headphones - Noise Cancelling", price: "2,499", oldPrice: "3,999", sold: "850", image: "https://i.ibb.co.com/TxnXgdRg/5df0afe2acf9f2a66088e57fc2503209b37beaea.png" },
    { id: 3, name: "Apple AirPods Max Sky Blue Edition", price: "2,499", oldPrice: "3,999", sold: "670", image: "https://i.ibb.co.com/TxnXgdRg/5df0afe2acf9f2a66088e57fc2503209b37beaea.png" },
    { id: 4, name: "Apple AirPods Max Sky Blue Edition", price: "2,499", oldPrice: "3,999", sold: "670", image: "https://i.ibb.co.com/TxnXgdRg/5df0afe2acf9f2a66088e57fc2503209b37beaea.png" },
  ];

  return (
    <section className="min-h-screen bg-[#FAFAFA] py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="mt-3 text-lg text-gray-500">{cartItems.length} items in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            {/* ডাটা ম্যাপ করে কম্পোনেন্টে পাঠানো হচ্ছে */}
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
      </div>
    </section>
  );
};

export default ShopingCardsPage;