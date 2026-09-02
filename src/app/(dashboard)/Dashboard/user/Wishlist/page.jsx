"use client";

import React, { useState, useEffect } from "react";
import { Trash2, Heart, AlertTriangle, ShoppingCart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toggleWishlist } from "@/app/store/wishlistSlice";
import { addToCart } from "@/app/store/cartSlice";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import { useAuthGuard } from "@/lib/useAuthGuard";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { requireAuth } = useAuthGuard();
  const wishlistItems = useSelector((state) => state.wishlist.items) || [];

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    requireAuth("Please login to view and manage your wishlist!", "/Dashboard/user/Wishlist");
  }, [requireAuth]);

  const confirmDelete = (id) => {
    setItemToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    const item = wishlistItems.find((i) => i.id === itemToDelete);
    if (item) {
      dispatch(toggleWishlist(item));
      toast.info("Removed from wishlist");
    }
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleAddToCart = (product) => {
    if (!requireAuth("Please login to add items to your cart!")) {
      return;
    }
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success("Added to cart! 🛍️");
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-6 px-2">
      <div className="max-w-4xl mx-auto">
        {wishlistItems.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                My Wishlist ({wishlistItems.length})
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              {wishlistItems.map((item) => {
                const img = item.images?.[0] || item.image || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80";
                return (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row p-4 sm:p-5 border border-gray-200 rounded-3xl gap-5 bg-white hover:shadow-md transition-shadow"
                  >
                    <div className="w-full sm:w-32 h-32 bg-gray-50 rounded-2xl shrink-0 overflow-hidden relative border border-gray-100">
                      <Image
                        src={img}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 128px"
                      />
                    </div>

                    <div className="flex flex-col grow justify-between gap-3">
                      <div>
                        <div className="flex justify-between items-start gap-4">
                          <Link href={`/Pages/Details/${item.id}`} className="hover:text-emerald-600 transition">
                            <h3 className="font-bold text-slate-800 text-base sm:text-lg leading-tight line-clamp-2">
                              {item.title}
                            </h3>
                          </Link>
                          <button
                            onClick={() => confirmDelete(item.id)}
                            className="text-slate-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="font-bold text-lg text-emerald-600">
                            ৳{item.price}
                          </span>
                          {item.oldPrice && (
                            <span className="text-slate-400 line-through text-sm">
                              ৳{item.oldPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 transition cursor-pointer shadow-xs"
                        >
                          <ShoppingCart size={16} />
                          <span>Add to Cart</span>
                        </button>
                        <Link
                          href={`/Pages/Details/${item.id}`}
                          className="py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm border border-gray-200 hover:bg-gray-50 text-gray-700 transition text-center"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-2xl mx-auto mt-6 text-center px-6">
            <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mb-5">
              <Heart className="text-pink-500" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 text-sm max-w-sm mb-6">
              Explore our wide variety of products and save your favorites to your wishlist!
            </p>
            <Link href="/Pages/AllProduct">
              <button className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl cursor-pointer transition shadow-md shadow-emerald-100">
                Explore All Products
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-sm text-center shadow-2xl">
            <AlertTriangle className="mx-auto text-red-500 mb-4" size={44} />
            <h2 className="text-xl font-bold mb-2 text-gray-900">Remove from Wishlist?</h2>
            <p className="text-slate-500 text-sm mb-6">
              Are you sure you want to remove this item from your wishlist?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-bold text-slate-700 cursor-pointer text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold cursor-pointer text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;

