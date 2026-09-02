import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/products/[id]
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
      return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      product: {
        ...product,
        images: product.images ? JSON.parse(product.images) : [],
        features: product.features ? JSON.parse(product.features) : [],
      },
    });
  } catch (error) {
    console.error("GET /api/products/[id] error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch product" }, { status: 500 });
  }
}

// PUT /api/products/[id]
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const productId = parseInt(id);
    const body = await request.json();

    const updated = await prisma.product.update({
      where: { id: productId },
      data: {
        ...(body.title && { title: body.title }),
        ...(body.price !== undefined && { price: Number(body.price) }),
        ...(body.oldPrice !== undefined && { oldPrice: body.oldPrice ? Number(body.oldPrice) : null }),
        ...(body.category && { category: body.category }),
        ...(body.images && { images: JSON.stringify(body.images) }),
        ...(body.description && { description: body.description }),
        ...(body.features && { features: JSON.stringify(body.features) }),
        ...(body.stockCount !== undefined && { stockCount: parseInt(body.stockCount) }),
      },
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (error) {
    console.error("PUT /api/products/[id] error:", error);
    return NextResponse.json({ success: false, error: "Failed to update product" }, { status: 500 });
  }
}

// DELETE /api/products/[id]
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
      return NextResponse.json({ success: false, error: "Invalid product ID" }, { status: 400 });
    }

    // Disconnect product from any historic order items first to prevent FK constraint error
    await prisma.orderItem.updateMany({
      where: { productId },
      data: { productId: null },
    });

    await prisma.product.delete({
      where: { id: productId },
    });

    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/products/[id] error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete product" }, { status: 500 });
  }
}
