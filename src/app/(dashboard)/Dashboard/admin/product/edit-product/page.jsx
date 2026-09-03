"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Loader2,
  ArrowLeft,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import { toast } from "react-toastify";
import Link from "next/link";
import ProductImageUploader from "@/components/ProductImageUploader";

function EditProductContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [fetching, setFetching] = useState(Boolean(productId));
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Fashion");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [stockCount, setStockCount] = useState("50");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (productId) {
      fetch(`/api/products/${productId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.product) {
            const p = data.product;
            setTitle(p.title || "");
            setCategory(p.category || "Fashion");
            setPrice(p.price !== undefined && p.price !== null ? String(p.price) : "");
            setOldPrice(p.oldPrice !== undefined && p.oldPrice !== null ? String(p.oldPrice) : "");
            setDiscount(p.discount || "");
            setStockCount(p.stockCount !== null && p.stockCount !== undefined ? String(p.stockCount) : "50");
            setDescription(p.description || "");

            const parsedImgs = Array.isArray(p.images)
              ? p.images
              : typeof p.images === "string"
              ? [p.images]
              : [];
            setImages(parsedImgs);
          } else {
            toast.error("Product not found in database.");
          }
        })
        .catch((err) => console.error("Edit product fetch error:", err))
        .finally(() => setFetching(false));
    }
  }, [productId]);

  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = "Product title is required.";
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      errs.price = "Enter a valid positive price.";
    }
    if (!description.trim()) errs.description = "Description is required.";
    if (images.length === 0) {
      errs.images = "Product must have at least one image.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill in required fields correctly.");
      return;
    }

    if (!productId) {
      toast.error("No product ID specified.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          category,
          price: Number(price),
          oldPrice: oldPrice ? Number(oldPrice) : null,
          discount: discount || null,
          stockCount: parseInt(stockCount) || 50,
          description: description.trim(),
          images,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(`Product "${title}" updated successfully! ✅`);
        router.push("/Dashboard/admin/product/all-products");
      } else {
        toast.error(data.error || "Failed to update product in database.");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Network error updating product.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!productId) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        toast.success(`Product "${title}" removed from catalog.`);
        router.push("/Dashboard/admin/product/all-products");
      } else {
        toast.error(data.error || "Failed to delete product from database.");
      }
    } catch (err) {
      console.error("Delete product error:", err);
      toast.error("Network error deleting product.");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-slate-500 font-medium">
        <div className="flex items-center gap-2">
          <Loader2 className="animate-spin text-emerald-600" size={24} />
          <span>Loading product details from database...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Edit Product #{productId}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Update product info, manage photos, or adjust stock levels
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3.5 py-2 rounded-xl transition cursor-pointer"
          >
            <Trash2 size={16} /> Delete Product
          </button>
          <Link
            href="/Dashboard/admin/product/all-products"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-600 hover:text-emerald-600 transition"
          >
            <ArrowLeft size={16} /> Back to Catalog
          </Link>
        </div>
      </div>

      <form
        onSubmit={handleUpdate}
        className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-gray-100 space-y-6 max-w-4xl"
      >
        {/* Title */}
        <div>
          <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-1.5">
            Product Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full bg-gray-50 border rounded-2xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-emerald-500 ${
              errors.title ? "border-red-500" : "border-gray-200"
            }`}
          />
          {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
        </div>

        {/* Category & Stock */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="Fashion">Fashion</option>
              <option value="Electronics">Electronics</option>
              <option value="Home & Living">Home & Living</option>
              <option value="Footwear">Men&apos;s &amp; Women&apos;s Shoes</option>
              <option value="Gadgets">Gadgets</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-1.5">
              Available Stock Quantity
            </label>
            <input
              type="number"
              value={stockCount}
              onChange={(e) => setStockCount(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Price, Old Price, Discount */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-1.5">
              Price (৳) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={`w-full bg-gray-50 border rounded-2xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-emerald-500 ${
                errors.price ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
          </div>

          <div>
            <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-1.5">
              Original / Old Price (৳)
            </label>
            <input
              type="number"
              value={oldPrice}
              onChange={(e) => setOldPrice(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-1.5">
              Discount Badge
            </label>
            <input
              type="text"
              placeholder="e.g. 20% OFF"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Photo Upload Section */}
        <ProductImageUploader
          images={images}
          setImages={setImages}
          error={errors.images}
          folder="products"
          onUploadingChange={setIsUploading}
        />

        {/* Description */}
        <div>
          <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-1.5">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full bg-gray-50 border rounded-2xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-emerald-500 resize-none ${
              errors.description ? "border-red-500" : "border-gray-200"
            }`}
          />
          {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={isLoading || isUploading}
            className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold px-8 py-3.5 rounded-2xl shadow-sm transition text-xs sm:text-sm cursor-pointer flex items-center gap-2"
          >
            {isLoading && <Loader2 className="animate-spin" size={16} />}
            <span>{isLoading ? "Saving Changes..." : "Save Changes"}</span>
          </button>
          <Link href="/Dashboard/admin/product/all-products">
            <button
              type="button"
              className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-semibold px-6 py-3.5 rounded-2xl transition text-xs sm:text-sm cursor-pointer"
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-sm text-center shadow-2xl">
            <AlertTriangle className="mx-auto text-red-500 mb-4" size={44} />
            <h2 className="text-xl font-bold mb-2 text-gray-900">Delete Product?</h2>
            <p className="text-slate-500 text-sm mb-6">
              Are you sure you want to permanently remove <strong>{title || `#${productId}`}</strong> from your database?
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-bold text-slate-700 cursor-pointer text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDelete}
                className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold cursor-pointer text-sm flex items-center justify-center gap-1.5"
              >
                {isDeleting && <Loader2 size={16} className="animate-spin" />}
                <span>{isDeleting ? "Deleting..." : "Delete"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function EditProductPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-slate-500">
          Loading product editor...
        </div>
      }
    >
      <EditProductContent />
    </Suspense>
  );
}
