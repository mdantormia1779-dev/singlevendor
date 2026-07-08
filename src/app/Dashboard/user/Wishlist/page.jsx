"use client";

import React, { useState } from "react";
import { Trash2, Heart, X, AlertTriangle } from "lucide-react";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      title: "Apple AirPods Max Wireless Over",
      price: "2,499",
      originalPrice: "3,999",
      sold: 1240,
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=300&auto=format&fit=crop",
      inStock: true,
    },
    {
      id: 2,
      title: "Modern Desk Lamp with Soft Light",
      price: "2,499",
      originalPrice: "3,999",
      sold: 0,
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=300&auto=format&fit=crop",
      inStock: false,
    },
  ]);

  // ডিলিট মোডালের জন্য স্টেট
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // ডিলিট কনফার্মেশন ওপেন করা
  const confirmDelete = (id) => {
    setItemToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // ডিলিট ফাংশন
  const handleDelete = () => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== itemToDelete));
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 ">
      <div className="max-w-4xl mx-auto px-4">
        {wishlistItems.length > 0 ? (
          <>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">My wishlist</h2>
            <div className="flex flex-col gap-4">
              {wishlistItems.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row p-4 border border-gray-200 rounded-2xl gap-6 bg-white hover:shadow-sm transition-shadow">
                  <div className="w-full sm:w-36 h-36 bg-gray-100 rounded-xl flex-shrink-0 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col flex-grow justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="font-semibold text-slate-800 text-lg leading-tight">{item.title}</h3>
                        {/* ডিলিট বাটন ক্লিক করলে মোডাল খুলবে */}
                        <button onClick={() => confirmDelete(item.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                          <Trash2 size={20} />
                        </button>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="font-bold text-lg text-slate-900">৳{item.price}</span>
                        {item.originalPrice && <span className="text-slate-400 line-through text-sm">৳{item.originalPrice}</span>}
                      </div>
                    </div>
                    <button disabled={!item.inStock} className={`mt-4 sm:mt-0 w-full py-2.5 rounded-lg font-semibold text-sm ${item.inStock ? "bg-[#19b77a] text-white" : "bg-[#86dcb8] text-white"}`}>
                      {item.inStock ? "Add to cart" : "out of stock"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-2xl mx-auto mt-10">
            <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mb-6">
              <Heart className="text-pink-500" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Your wishlist is empty</h2>
            <button className="px-8 py-3 bg-[#19b77a] text-white font-semibold rounded-xl">Explore Best Sellers</button>
          </div>
        )}
      </div>

      {/* ডিলিট কনফার্মেশন মোডাল */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl">
            <AlertTriangle className="mx-auto text-red-500 mb-4" size={48} />
            <h2 className="text-2xl font-bold mb-2">Are you sure?</h2>
            <p className="text-slate-500 mb-8">Do you want to delete this item from your wishlist?</p>
            <div className="flex gap-3">
              <button onClick={() => setIsDeleteModalOpen(false)} className="w-full py-3 bg-gray-100 rounded-xl font-bold text-slate-600">Cancel</button>
              <button onClick={handleDelete} className="w-full py-3 bg-red-500 text-white rounded-xl font-bold">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;