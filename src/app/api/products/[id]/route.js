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

    let updateData = {
      ...(body.title && { title: String(body.title).trim() }),
      ...(body.price !== undefined && { price: Number(body.price) }),
      ...(body.oldPrice !== undefined && { oldPrice: body.oldPrice ? Number(body.oldPrice) : null }),
      ...(body.discount !== undefined && { discount: body.discount || null }),
      ...(body.category && { category: body.category }),
      ...(body.description !== undefined && { description: String(body.description).trim() }),
      ...(body.stockCount !== undefined && { stockCount: parseInt(body.stockCount) }),
    };

    if (body.images !== undefined) {
      let imageList = [];
      if (Array.isArray(body.images)) {
        imageList = body.images.filter((img) => typeof img === "string" && img.trim().length > 0);
      } else if (typeof body.images === "string" && body.images.trim()) {
        try {
          const parsed = JSON.parse(body.images);
          imageList = Array.isArray(parsed) ? parsed : [body.images.trim()];
        } catch {
          imageList = [body.images.trim()];
        }
      }
      updateData.images = JSON.stringify(imageList);
    }

    if (body.features !== undefined) {
      const featureList = Array.isArray(body.features) ? body.features : [String(body.features)];
      updateData.features = JSON.stringify(featureList);
    }

    const updated = await prisma.product.update({
      where: { id: productId },
      data: updateData,
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (error) {
    console.error("PUT /api/products/[id] error:", error);
    return NextResponse.json({ success: false, error: "Failed to update product: " + error.message }, { status: 500 });
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

    const existing = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existing) {
      return NextResponse.json({ success: false, error: "Product does not exist or already deleted" }, { status: 404 });
    }

    // Disconnect product from any historic order items first to prevent FK constraint error
    try {
      await prisma.orderItem.updateMany({
        where: { productId },
        data: { productId: null },
      });
    } catch (orderItemErr) {
      console.warn("Could not unbind order items (may not exist):", orderItemErr.message);
    }

    await prisma.product.delete({
      where: { id: productId },
    });

    return NextResponse.json({ success: true, message: `Product #${productId} deleted successfully` });
  } catch (error) {
    console.error("DELETE /api/products/[id] error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete product: " + error.message }, { status: 500 });
  }
}
