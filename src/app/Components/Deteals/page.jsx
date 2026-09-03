"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Star,
  MessageSquare,
  Send,
  CheckCircle2,
  Trash2,
  Filter,
  HelpCircle,
  CornerDownRight,
  ShieldCheck,
  User,
  Sparkles,
  Loader2,
} from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useAuthGuard } from "@/lib/useAuthGuard";

const RATING_LABELS = {
  1: "Poor (খারাপ)",
  2: "Fair (চলনসই)",
  3: "Average (মোটামুটি)",
  4: "Good (ভালো)",
  5: "Excellent (অসাধারণ)",
};

const Deteals = ({ product, onStatsUpdate }) => {
  const [activeTab, setActiveTab] = useState("details");
  const { user } = useSelector((state) => state.auth);
  const { requireAuth } = useAuthGuard();

  const isAdmin =
    user?.role === "admin" ||
    user?.role === "SUPER_ADMIN" ||
    user?.role === "Admin";

  // --- REVIEWS STATE ---
  const [reviews, setReviews] = useState([]);
  const [reviewStats, setReviewStats] = useState({
    totalReviews: product?.reviews || 0,
    averageRating: product?.rating || 4.8,
    distribution: {
      5: { count: 0, percent: 0 },
      4: { count: 0, percent: 0 },
      3: { count: 0, percent: 0 },
      2: { count: 0, percent: 0 },
      1: { count: 0, percent: 0 },
    },
  });
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [filterRating, setFilterRating] = useState("all");

  // Review Form
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedRating, setSelectedRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewerName, setReviewerName] = useState(user?.name || "");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // --- QUESTIONS STATE ---
  const [questions, setQuestions] = useState([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [askerName, setAskerName] = useState(user?.name || "");
  const [isSubmittingQuestion, setIsSubmittingQuestion] = useState(false);

  // Admin reply states
  const [replyingToId, setReplyingToId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  // Reload reviews
  const reloadReviews = async () => {
    if (!product?.id) return;
    try {
      const res = await fetch(`/api/products/${product.id}/reviews`);
      const data = await res.json();
      if (data.success) {
        setReviews(data.reviews || []);
        if (data.stats) {
          setReviewStats(data.stats);
          if (onStatsUpdate && data.stats.totalReviews > 0) {
            onStatsUpdate({
              rating: data.stats.averageRating,
              reviews: data.stats.totalReviews,
            });
          }
        }
      }
    } catch (err) {
      console.error("Failed to load reviews:", err);
    }
  };

  // Reload questions
  const reloadQuestions = async () => {
    if (!product?.id) return;
    try {
      const res = await fetch(`/api/products/${product.id}/questions`);
      const data = await res.json();
      if (data.success) {
        setQuestions(data.questions || []);
      }
    } catch (err) {
      console.error("Failed to load questions:", err);
    }
  };

  useEffect(() => {
    let ignore = false;
    if (product?.id) {
      fetch(`/api/products/${product.id}/reviews`)
        .then((res) => res.json())
        .then((data) => {
          if (ignore) return;
          if (data.success) {
            setReviews(data.reviews || []);
            if (data.stats) setReviewStats(data.stats);
          }
        })
        .catch((err) => console.error("Reviews load error:", err));

      fetch(`/api/products/${product.id}/questions`)
        .then((res) => res.json())
        .then((data) => {
          if (ignore) return;
          if (data.success) setQuestions(data.questions || []);
        })
        .catch((err) => console.error("Questions load error:", err));
    }
    return () => {
      ignore = true;
    };
  }, [product?.id]);

  // Submit Review
  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!user) {
      if (!requireAuth("Please login to submit a review!")) return;
    }

    if (!reviewComment.trim() || reviewComment.trim().length < 3) {
      toast.warning("Please enter at least 3 characters for your review.");
      return;
    }

    setIsSubmittingReview(true);
    try {
      const res = await fetch(`/api/products/${product.id}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating: selectedRating,
          comment: reviewComment,
          userName: user?.name || reviewerName || "Verified Customer",
          userEmail: user?.email || null,
          userAvatar: user?.avatar || user?.image || null,
          userId: user?.id || null,
        }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Thank you! Your review has been published ⭐");
        setReviewComment("");
        setShowReviewForm(false);
        reloadReviews();
      } else {
        toast.error(data.error || "Failed to submit review");
      }
    } catch (err) {
      console.error("Review submission error:", err);
      toast.error("Error submitting review. Please try again.");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  // Delete Review (Admin or Author)
  const handleDeleteReview = async (reviewId) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    try {
      const res = await fetch(`/api/products/${product.id}/reviews?reviewId=${reviewId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Review deleted");
        reloadReviews();
      } else {
        toast.error(data.error || "Could not delete review");
      }
    } catch (err) {
      console.error("Delete review error:", err);
      toast.error("Failed to delete review");
    }
  };

  // Submit Question
  const handleSubmitQuestion = async (e) => {
    e.preventDefault();

    if (!user) {
      if (!requireAuth("Please login to ask a question!")) return;
    }

    if (!questionText.trim() || questionText.trim().length < 5) {
      toast.warning("Please type a question of at least 5 characters.");
      return;
    }

    setIsSubmittingQuestion(true);
    try {
      const res = await fetch(`/api/products/${product.id}/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: questionText,
          userName: user?.name || askerName || "Customer",
          userAvatar: user?.avatar || user?.image || null,
          userId: user?.id || null,
        }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Your question has been posted! The store team will reply soon.");
        setQuestionText("");
        reloadQuestions();
      } else {
        toast.error(data.error || "Failed to post question");
      }
    } catch (err) {
      console.error("Question submission error:", err);
      toast.error("Error posting question");
    } finally {
      setIsSubmittingQuestion(false);
    }
  };

  // Answer Question (Admin)
  const handleSubmitReply = async (questionId) => {
    if (!replyText.trim()) {
      toast.warning("Please enter an answer.");
      return;
    }

    setIsSubmittingReply(true);
    try {
      const res = await fetch(`/api/products/${product.id}/questions`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId,
          answer: replyText,
          answeredBy: user?.name ? `${user.name} (Finora Official)` : "Finora Official Support",
        }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Answer posted successfully! ✅");
        setReplyText("");
        setReplyingToId(null);
        reloadQuestions();
      } else {
        toast.error(data.error || "Failed to post answer");
      }
    } catch (err) {
      console.error("Answer submission error:", err);
      toast.error("Error submitting answer");
    } finally {
      setIsSubmittingReply(false);
    }
  };

  // Delete Question (Admin)
  const handleDeleteQuestion = async (questionId) => {
    if (!confirm("Are you sure you want to delete this question?")) return;

    try {
      const res = await fetch(`/api/products/${product.id}/questions?questionId=${questionId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Question removed");
        reloadQuestions();
      } else {
        toast.error(data.error || "Could not delete question");
      }
    } catch (err) {
      console.error("Delete question error:", err);
      toast.error("Failed to delete question");
    }
  };

  // Filtered reviews
  const filteredReviews = useMemo(() => {
    if (filterRating === "all") return reviews;
    const ratingNum = parseInt(filterRating);
    return reviews.filter((r) => r.rating === ratingNum);
  }, [reviews, filterRating]);

  // Safety check
  if (!product) {
    return <div className="text-center py-10 text-gray-500">No details available.</div>;
  }

  const effectiveAvgRating =
    reviewStats.totalReviews > 0
      ? reviewStats.averageRating
      : Number(product.rating || 4.8);

  const effectiveReviewsCount =
    reviewStats.totalReviews > 0
      ? reviewStats.totalReviews
      : Number(product.reviews || 0);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* --- TAB BUTTONS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200">
        <button
          onClick={() => setActiveTab("details")}
          className={`py-3.5 px-5 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === "details"
              ? "bg-white text-emerald-700 shadow-sm border border-slate-200"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
          }`}
        >
          <span>Product Details</span>
        </button>

        <button
          onClick={() => setActiveTab("reviews")}
          className={`py-3.5 px-5 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === "reviews"
              ? "bg-white text-emerald-700 shadow-sm border border-slate-200"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
          }`}
        >
          <div className="flex items-center gap-1.5">
            <Star size={16} className="text-amber-500 fill-amber-500" />
            <span>Customer Reviews</span>
            <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold">
              {effectiveReviewsCount}
            </span>
          </div>
        </button>

        <button
          onClick={() => setActiveTab("questions")}
          className={`py-3.5 px-5 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === "questions"
              ? "bg-white text-emerald-700 shadow-sm border border-slate-200"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
          }`}
        >
          <div className="flex items-center gap-1.5">
            <HelpCircle size={16} className="text-emerald-600" />
            <span>Questions & Answers</span>
            <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-extrabold">
              {questions.length}
            </span>
          </div>
        </button>
      </div>

      {/* --- TAB CONTENT AREA --- */}
      <Card className="border border-slate-200 shadow-sm rounded-3xl overflow-hidden bg-white">
        <CardContent className="p-6 sm:p-8">
          {/* ================= DETAILS TAB ================= */}
          {activeTab === "details" && (
            <div className="space-y-8">
              <div>
                <h3 className="font-extrabold text-xl text-slate-900 mb-3">Product Description</h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  {product.description}
                </p>

                {product.features && product.features.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <Sparkles size={16} className="text-emerald-600" />
                      <span>Key Highlights & Features:</span>
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-200 pt-6">
                <h3 className="font-extrabold text-xl text-slate-900 mb-4">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 text-sm">
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Category</span>
                    <span className="font-bold text-slate-800">{product.category || "General"}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Availability</span>
                    <span className={`font-bold ${product.inStock ? "text-emerald-600" : "text-rose-600"}`}>
                      {product.inStock ? "In Stock Ready to Ship" : "Out of Stock"}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Stock Count</span>
                    <span className="font-bold text-slate-800">{product.stockCount || 50} units</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Customer Rating</span>
                    <span className="font-bold text-amber-600 flex items-center gap-1">
                      <Star size={13} className="fill-amber-500 text-amber-500" />
                      {effectiveAvgRating} / 5.0 ({effectiveReviewsCount} reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= REVIEWS TAB ================= */}
          {activeTab === "reviews" && (
            <div className="space-y-8">
              {/* Rating Summary Card */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-gradient-to-br from-slate-50 via-emerald-50/20 to-teal-50/20 p-6 sm:p-8 rounded-3xl border border-slate-200/80">
                {/* Score */}
                <div className="md:col-span-4 text-center border-b md:border-b-0 md:border-r border-slate-200/80 pb-6 md:pb-0 md:pr-6">
                  <div className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight">
                    {effectiveAvgRating.toFixed(1)}
                  </div>
                  <div className="flex justify-center text-amber-400 my-3 gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={22}
                        fill={star <= Math.round(effectiveAvgRating) ? "currentColor" : "none"}
                        className={
                          star <= Math.round(effectiveAvgRating)
                            ? "text-amber-400 drop-shadow-xs"
                            : "text-slate-300"
                        }
                      />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-500">
                    Based on <span className="text-slate-800 font-bold">{effectiveReviewsCount}</span> verified ratings
                  </p>

                  <Button
                    onClick={() => {
                      if (!user) {
                        requireAuth("Please login to write a review!");
                        return;
                      }
                      setShowReviewForm((prev) => !prev);
                    }}
                    className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl px-5 py-2.5 text-xs font-bold transition shadow-sm cursor-pointer"
                  >
                    {showReviewForm ? "Close Review Form" : "★ Write a Review"}
                  </Button>
                </div>

                {/* Rating Distribution Bars */}
                <div className="md:col-span-8 space-y-2.5 w-full">
                  {[5, 4, 3, 2, 1].map((s) => {
                    const dist = reviewStats.distribution?.[s] || { count: 0, percent: 0 };
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setFilterRating(filterRating === String(s) ? "all" : String(s))}
                        className={`w-full flex items-center gap-3 text-xs sm:text-sm p-1.5 rounded-xl transition cursor-pointer ${
                          filterRating === String(s) ? "bg-emerald-100/70 ring-1 ring-emerald-400" : "hover:bg-slate-100/70"
                        }`}
                      >
                        <div className="flex items-center gap-1 w-12 font-bold text-slate-700">
                          <span>{s}</span>
                          <Star size={12} className="fill-amber-400 text-amber-400" />
                        </div>
                        <div className="flex-1 h-3 bg-slate-200/80 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-400 rounded-full transition-all duration-500"
                            style={{ width: `${dist.percent}%` }}
                          />
                        </div>
                        <div className="w-14 text-right text-xs font-semibold text-slate-500">
                          {dist.count} ({dist.percent}%)
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* WRITE REVIEW FORM */}
              {showReviewForm && (
                <div className="p-6 bg-slate-50 rounded-3xl border border-emerald-200/80 shadow-xs animate-in fade-in duration-300">
                  <h4 className="font-extrabold text-lg text-slate-900 mb-1 flex items-center gap-2">
                    <Star className="text-amber-500 fill-amber-500" size={18} />
                    <span>Rate & Review this Product</span>
                  </h4>
                  <p className="text-xs text-slate-500 mb-4">
                    Your feedback helps other shoppers make better choices!
                  </p>

                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    {/* Interactive Star Picker */}
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2">
                        Select Rating (স্টার সিলেক্ট করুন)
                      </label>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setSelectedRating(star)}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                              className="p-1 transition-transform hover:scale-125 cursor-pointer focus:outline-hidden"
                            >
                              <Star
                                size={32}
                                className={`transition-colors ${
                                  star <= (hoverRating || selectedRating)
                                    ? "text-amber-400 fill-amber-400 drop-shadow-xs"
                                    : "text-slate-300"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                        <span className="text-sm font-bold text-slate-700 ml-2">
                          {RATING_LABELS[hoverRating || selectedRating]}
                        </span>
                      </div>
                    </div>

                    {/* Reviewer Name */}
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1.5">
                        Your Name (আপনার নাম)
                      </label>
                      <input
                        type="text"
                        value={reviewerName}
                        onChange={(e) => setReviewerName(e.target.value)}
                        placeholder="e.g. Tanvir Ahmed"
                        className="w-full text-sm px-4 py-2.5 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                      />
                    </div>

                    {/* Review Text */}
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1.5">
                        Detailed Review (আপনার মতামত লিখুন)
                      </label>
                      <textarea
                        rows={3}
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="What did you like or dislike about this product? How is the quality, fabric, fitting or delivery?"
                        className="w-full text-sm p-4 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
                      />
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowReviewForm(false)}
                        className="rounded-2xl text-xs font-bold cursor-pointer"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmittingReview}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl px-6 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-200"
                      >
                        {isSubmittingReview ? (
                          <>
                            <Loader2 size={15} className="animate-spin" />
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
                            <Send size={14} />
                            <span>Submit Review</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {/* FILTER BADGES */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <Filter size={14} />
                  <span>Filter by Rating:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {["all", "5", "4", "3", "2", "1"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilterRating(f)}
                      className={`text-xs px-3 py-1.5 rounded-full font-bold transition cursor-pointer ${
                        filterRating === f
                          ? "bg-slate-900 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {f === "all" ? "All Reviews" : `${f} Stars`}
                    </button>
                  ))}
                </div>
              </div>

              {/* REVIEWS LIST */}
              <div className="space-y-4">
                {isLoadingReviews ? (
                  <div className="text-center py-10">
                    <Loader2 size={24} className="animate-spin text-emerald-600 mx-auto mb-2" />
                    <p className="text-xs text-slate-400">Loading reviews...</p>
                  </div>
                ) : filteredReviews.length > 0 ? (
                  filteredReviews.map((rev) => {
                    const isOwner = user?.id && rev.userId === user.id;
                    const canDelete = isAdmin || isOwner;

                    return (
                      <div
                        key={rev.id}
                        className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition space-y-3"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm uppercase">
                              {rev.userName ? rev.userName[0] : "U"}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-bold text-slate-900 text-sm">{rev.userName}</p>
                                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                                  <ShieldCheck size={11} />
                                  <span>Verified Buyer</span>
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-0.5">
                                <div className="flex text-amber-400">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      size={13}
                                      fill={star <= rev.rating ? "currentColor" : "none"}
                                      className={star <= rev.rating ? "text-amber-400" : "text-slate-200"}
                                    />
                                  ))}
                                </div>
                                <span className="text-[11px] text-slate-400">
                                  {new Date(rev.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>

                          {canDelete && (
                            <button
                              onClick={() => handleDeleteReview(rev.id)}
                              title="Delete review"
                              className="text-slate-400 hover:text-rose-600 transition p-1 cursor-pointer"
                            >
                              <Trash2 size={15} />
                            </button>
                          )}
                        </div>

                        <p className="text-slate-700 text-sm leading-relaxed pl-13">
                          {rev.comment}
                        </p>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-12 px-4 rounded-3xl border border-dashed border-slate-200">
                    <MessageSquare size={36} className="text-slate-300 mx-auto mb-3" />
                    <h5 className="font-bold text-slate-800 text-sm mb-1">
                      {filterRating === "all" ? "No Reviews Yet" : `No ${filterRating}-Star Reviews`}
                    </h5>
                    <p className="text-xs text-slate-500 mb-4 max-w-sm mx-auto">
                      Be the first person to share your feedback and experience with this product!
                    </p>
                    <Button
                      onClick={() => {
                        if (!user) {
                          requireAuth("Please login to write a review!");
                          return;
                        }
                        setShowReviewForm(true);
                      }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold px-5 py-2 cursor-pointer"
                    >
                      ★ Rate & Review
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= QUESTIONS TAB ================= */}
          {activeTab === "questions" && (
            <div className="space-y-8">
              {/* ASK QUESTION FORM */}
              <div className="p-6 bg-gradient-to-r from-emerald-50/50 via-teal-50/30 to-slate-50 rounded-3xl border border-emerald-200/70 shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <HelpCircle size={20} className="text-emerald-700" />
                  <h4 className="font-extrabold text-base sm:text-lg text-slate-900">
                    Have a question about this product?
                  </h4>
                </div>
                <p className="text-xs text-slate-600 mb-4">
                  Ask our team about sizes, fabric material, specifications, delivery timeline, or return policy.
                </p>

                <form onSubmit={handleSubmitQuestion} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      value={questionText}
                      onChange={(e) => setQuestionText(e.target.value)}
                      placeholder="Type your question here (e.g. Is size XL available in stock?)..."
                      className="flex-1 text-sm px-4 py-3 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                    <Button
                      type="submit"
                      disabled={isSubmittingQuestion}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl px-6 text-xs font-bold flex items-center justify-center gap-2 h-12 cursor-pointer shadow-md shadow-emerald-200"
                    >
                      {isSubmittingQuestion ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <>
                          <Send size={14} />
                          <span>Ask Question</span>
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>

              {/* QUESTIONS LIST */}
              <div className="space-y-4">
                {isLoadingQuestions ? (
                  <div className="text-center py-10">
                    <Loader2 size={24} className="animate-spin text-emerald-600 mx-auto mb-2" />
                    <p className="text-xs text-slate-400">Loading questions...</p>
                  </div>
                ) : questions.length > 0 ? (
                  questions.map((q) => (
                    <div
                      key={q.id}
                      className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-3 transition hover:border-slate-300"
                    >
                      {/* Customer Question */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                            Q
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-sm leading-snug">
                              {q.question}
                            </p>
                            <p className="text-[11px] text-slate-400 mt-1">
                              Asked by <span className="text-slate-600 font-medium">{q.userName}</span> •{" "}
                              {new Date(q.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                        </div>

                        {isAdmin && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setReplyingToId(replyingToId === q.id ? null : q.id);
                                setReplyText(q.answer || "");
                              }}
                              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl cursor-pointer"
                            >
                              {q.answer ? "Edit Answer" : "Reply"}
                            </button>
                            <button
                              onClick={() => handleDeleteQuestion(q.id)}
                              className="text-slate-400 hover:text-rose-600 transition p-1 cursor-pointer"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Official Store Answer */}
                      {q.answer ? (
                        <div className="ml-5 sm:ml-8 p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-start gap-3">
                          <CornerDownRight size={16} className="text-emerald-600 shrink-0 mt-1" />
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-extrabold text-emerald-900">
                                {q.answeredBy || "Finora Official Support"}
                              </span>
                              <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-200/70 px-2 py-0.5 rounded-full">
                                Verified Seller
                              </span>
                              {q.answeredAt && (
                                <span className="text-[10px] text-slate-400">
                                  {new Date(q.answeredAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </span>
                              )}
                            </div>
                            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                              {q.answer}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="ml-5 sm:ml-8 text-xs text-amber-700 bg-amber-50/80 border border-amber-200/60 px-3 py-2 rounded-xl flex items-center gap-2">
                          <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                          <span>Pending answer from store team. Check back soon!</span>
                        </div>
                      )}

                      {/* Admin Reply Box */}
                      {isAdmin && replyingToId === q.id && (
                        <div className="ml-5 sm:ml-8 mt-2 p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 animate-in fade-in duration-200">
                          <label className="block text-xs font-bold text-slate-700">
                            Provide Official Store Answer:
                          </label>
                          <textarea
                            rows={2}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write your answer clearly..."
                            className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
                          />
                          <div className="flex justify-end gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setReplyingToId(null)}
                              className="rounded-xl text-xs h-8 cursor-pointer"
                            >
                              Cancel
                            </Button>
                            <Button
                              type="button"
                              onClick={() => handleSubmitReply(q.id)}
                              disabled={isSubmittingReply}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs h-8 px-4 font-bold cursor-pointer"
                            >
                              {isSubmittingReply ? "Saving..." : "Save Answer"}
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 px-4 rounded-3xl border border-dashed border-slate-200">
                    <HelpCircle size={36} className="text-slate-300 mx-auto mb-3" />
                    <h5 className="font-bold text-slate-800 text-sm mb-1">No Questions Yet</h5>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Have questions regarding size, fit, fabric or delivery? Be the first to ask!
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Deteals;