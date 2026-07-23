"use client";

import Image from "next/image";
import { useSelector } from "react-redux";

const MyOrders = () => {
  const orders = useSelector((state) => state.cart.orders);

  if (!orders.length) {
    return (
      <div className="text-center py-20 text-gray-500 font-bold">
        No orders yet!
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-5">
        <h1 className="text-2xl font-bold mb-8">
          My Orders
        </h1>

        <div className="space-y-5">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-3xl border p-6"
            >
              {/* Header */}
              <div className="flex justify-between">
                <div>
                  <h2 className="font-bold text-xl">
                    Order {order.id}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {order.date} • {order.items} item
                  </p>
                </div>

                <span className={`px-4 py-2 rounded-full ${order.statusColor}`}>
                  {order.status}
                </span>
              </div>

              {/* Products */}
              <div className="mt-6 space-y-4">
                {order.products.map((product, i) => (
                  <div key={i} className="flex gap-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={64}
                      height={64}
                      className="rounded-lg border"
                    />

                    <div>
                      <h3>{product.name}</h3>
                      <p className="text-sm text-gray-500">
                        Qty: {product.qty} • {product.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-6 flex justify-between border-t pt-4">
                <h3 className="font-bold text-lg">
                  Total: {order.total}
                </h3>

                <button className="border px-5 h-10 rounded-full">
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyOrders;