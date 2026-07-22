"use client";

import React, { useState } from "react";
import { Trash2, Heart, AlertTriangle } from "lucide-react";
import { useSelector, useDispatch } from "react-redux"; // Redux Hooks
import { toggleWishlist } from "../../../../store/wishlistSlice"; // আপনার পাথ অনুযায়ী ঠিক করে নিন
import { addToCart } from "../../../../store/cartSlice"; // Add to cart এর জন্য
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";

const Wishlist = () => {
  const dispatch = useDispatch();
  // Redux থেকে উইশলিস্ট ডেটা নেওয়া
  const wishlistItems = useSelector((state) => state.wishlist.items);

  // ডিলিট মোডালের জন্য স্টেট
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const confirmDelete = (id) => {
    setItemToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    // Redux থেকে রিমুভ করার জন্য toggleWishlist কল করছি
    const item = wishlistItems.find((i) => i.id === itemToDelete);
    dispatch(toggleWishlist(item));
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
    toast.info("Removed from wishlist");
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Added to cart ✅");
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-10">
      <div className="max-w-4xl mx-auto px-4">
        {wishlistItems.length > 0 ? (
          <>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              My wishlist ({wishlistItems.length})
            </h2>
            <div className="flex flex-col gap-4">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row p-4 border border-gray-200 rounded-2xl gap-6 bg-white hover:shadow-sm transition-shadow"
                >
                  <div className="w-full sm:w-36 h-36 bg-gray-100 rounded-xl shrink-0 overflow-hidden relative">
                    <div className="w-full sm:w-36 h-36 bg-gray-100 rounded-xl shrink-0 overflow-hidden relative">
                      <Image
                        src={
                          item.images?.[0] ||
                          item.image ||
                          "/fallback-image.jpg"
                        } // fallback ইমেজ দিতে পারেন
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 144px"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col grow justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="font-semibold text-slate-800 text-lg leading-tight">
                          {item.title}
                        </h3>
                        <button
                          onClick={() => confirmDelete(item.id)}
                          className="text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="font-bold text-lg text-slate-900">
                          ৳{item.price}
                        </span>
                        {item.oldPrice && (
                          <span className="text-slate-400 line-through text-sm">
                            ৳{item.oldPrice}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className={`mt-4 sm:mt-0 w-full py-2.5 rounded-lg font-semibold text-sm ${item.inStock !== false ? "bg-[#19b77a] text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                      disabled={item.inStock === false}
                    >
                      {item.inStock !== false ? "Add to cart" : "Out of stock"}
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
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Your wishlist is empty
            </h2>
            <Link href={"/"}>
              <button className="px-8 py-3 bg-[#19b77a] text-white font-semibold rounded-xl">
                Explore Best Sellers
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* ডিলিট কনফার্মেশন মোডাল */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl">
            <AlertTriangle className="mx-auto text-red-500 mb-4" size={48} />
            <h2 className="text-2xl font-bold mb-2">Are you sure?</h2>
            <p className="text-slate-500 mb-8">
              Do you want to delete this item from your wishlist?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="w-full py-3 bg-gray-100 rounded-xl font-bold text-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="w-full py-3 bg-red-500 text-white rounded-xl font-bold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
