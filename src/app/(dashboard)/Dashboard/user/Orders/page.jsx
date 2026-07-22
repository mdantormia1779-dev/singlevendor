"use client";

import Image from "next/image";

const orders = [
  {
    id: "#FIN-847291",
    date: "Jun 11, 2026",
    items: 1,
    status: "Delivered",
    statusColor: "bg-green-100 text-green-600",
    total: "৳2,559",
    review: true,
    products: [
      {
        name: "Premium Beige Linen Casual Blazer",
        qty: 1,
        price: "৳2,499",
        image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&q=80",
      },
    ],
  },
  {
    id: "#FIN-293847",
    date: "Jun 9, 2024",
    items: 1,
    status: "Out for Delivery",
    statusColor: "bg-orange-100 text-orange-600",
    total: "৳18,999",
    review: false,
    products: [
      {
        name: "Sony WH-1000XM5 Headphones",
        qty: 1,
        price: "৳18,999",
        image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&q=80",
      },
    ],
  },
  {
    id: "#FIN-103948",
    date: "Jun 8, 2026",
    items: 2,
    status: "Confirmed",
    statusColor: "bg-yellow-100 text-yellow-600",
    total: "৳14,498",
    review: false,
    products: [
      {
        name: "High Top Men's Shoes, Trendy Sports And Leisure Mesh",
        qty: 1,
        price: "৳7,999",
        image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&q=80",
      },
      {
        name: "Power Bank Batería Inalámbrica Magnética MagSafe5000",
        qty: 1,
        price: "৳6,499",
        image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&q=80",
      },
    ],
  },
];

const MyOrders = () => {
  return (
    <section className="min-h-screen bg-[#F8FAFC] ">
      <div className="max-w-7xl mx-auto px-5">
        <h1 className="text-2xl font-bold text-slate-900 mb-8">
          My Orders
        </h1>

        <div className="space-y-5">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6"
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-bold text-xl text-slate-900">
                    Order {order.id}
                  </h2>

                  <p className="text-slate-500 text-sm mt-1">
                    Placed on {order.date} • {order.items} item
                    {order.items > 1 && "s"}
                  </p>
                </div>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${order.statusColor}`}
                >
                  {order.status}
                </span>
              </div>

              {/* Products */}
              <div className="mt-6 space-y-4">
                {order.products.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden border">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <h3 className="font-medium text-slate-800">
                        {product.name}
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        Qty: {product.qty} • {product.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-slate-200 mt-6 pt-5 flex items-center justify-between">
                <h3 className="text-xl font-bold">
                  Total: {order.total}
                </h3>

                <div className="flex gap-3">
                  <button className="border border-slate-300 px-6 h-11 rounded-full font-medium hover:bg-slate-50 transition">
                    Track Order
                  </button>

                  {order.review && (
                    <button className="bg-[#10B981] hover:bg-[#059669] text-white px-6 h-11 rounded-full font-medium transition">
                      Rate & Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyOrders;