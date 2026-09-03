import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/products/[id]/reviews
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
      return NextResponse.json({ success: false, error: "Invalid product ID" }, { status: 400 });
    }

    const reviews = await prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: "desc" },
    });

    const totalReviews = reviews.length;
    let distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let sum = 0;

    reviews.forEach((r) => {
      sum += r.rating;
      if (distribution[r.rating] !== undefined) {
        distribution[r.rating] += 1;
      }
    });

    const averageRating = totalReviews > 0 ? Number((sum / totalReviews).toFixed(1)) : 0;

    const distributionWithPercent = Object.fromEntries(
      [5, 4, 3, 2, 1].map((star) => [
        star,
        {
          count: distribution[star],
          percent: totalReviews > 0 ? Math.round((distribution[star] / totalReviews) * 100) : 0,
        },
      ])
    );

    return NextResponse.json({
      success: true,
      reviews,
      stats: {
        totalReviews,
        averageRating,
        distribution: distributionWithPercent,
      },
    });
  } catch (error) {
    console.error("GET /api/products/[id]/reviews error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch reviews" }, { status: 500 });
  }
}

// POST /api/products/[id]/reviews
export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
      return NextResponse.json({ success: false, error: "Invalid product ID" }, { status: 400 });
    }

    const body = await request.json();
    const { rating, comment, userName, userAvatar, userEmail, userId } = body;

    const ratingNum = parseInt(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return NextResponse.json(
        { success: false, error: "Please select a valid rating between 1 and 5 stars" },
        { status: 400 }
      );
    }

    if (!comment || typeof comment !== "string" || comment.trim().length < 3) {
      return NextResponse.json(
        { success: false, error: "Review comment must be at least 3 characters long" },
        { status: 400 }
      );
    }

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    // Create the review
    const newReview = await prisma.review.create({
      data: {
        productId,
        userId: userId || null,
        userName: userName ? String(userName).trim() : "Verified Buyer",
        userAvatar: userAvatar || null,
        userEmail: userEmail || null,
        rating: ratingNum,
        comment: comment.trim(),
      },
    });

    // Recalculate average rating & review count for the product
    const allReviews = await prisma.review.findMany({
      where: { productId },
      select: { rating: true },
    });

    const totalCount = allReviews.length;
    const newAvg = Number(
      (allReviews.reduce((acc, r) => acc + r.rating, 0) / totalCount).toFixed(1)
    );

    await prisma.product.update({
      where: { id: productId },
      data: {
        rating: newAvg,
        reviews: totalCount,
      },
    });

    return NextResponse.json({
      success: true,
      review: newReview,
      updatedStats: {
        rating: newAvg,
        reviews: totalCount,
      },
    });
  } catch (error) {
    console.error("POST /api/products/[id]/reviews error:", error);
    return NextResponse.json({ success: false, error: "Failed to submit review: " + error.message }, { status: 500 });
  }
}

// DELETE /api/products/[id]/reviews?reviewId=...
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const productId = parseInt(id);
    const { searchParams } = new URL(request.url);
    const reviewId = searchParams.get("reviewId");

    if (!reviewId) {
      return NextResponse.json({ success: false, error: "Missing reviewId" }, { status: 400 });
    }

    await prisma.review.delete({
      where: { id: reviewId },
    });

    // Recalculate product rating
    const allReviews = await prisma.review.findMany({
      where: { productId },
      select: { rating: true },
    });

    const totalCount = allReviews.length;
    const newAvg = totalCount > 0
      ? Number((allReviews.reduce((acc, r) => acc + r.rating, 0) / totalCount).toFixed(1))
      : 4.8;

    await prisma.product.update({
      where: { id: productId },
      data: {
        rating: newAvg,
        reviews: totalCount,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Review deleted successfully",
      updatedStats: {
        rating: newAvg,
        reviews: totalCount,
      },
    });
  } catch (error) {
    console.error("DELETE /api/products/[id]/reviews error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete review: " + error.message }, { status: 500 });
  }
}
