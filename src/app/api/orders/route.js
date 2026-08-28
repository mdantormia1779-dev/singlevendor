import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/orders
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";

    const where = {};
    if (search) {
      where.OR = [
        { id: { contains: search } },
        { customerName: { contains: search } },
        { customerPhone: { contains: search } },
      ];
    }
    if (status && status !== "All") {
      where.status = status;
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        products: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("GET /api/orders error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch orders" }, { status: 500 });
  }
}

// POST /api/orders (Create Order during checkout)
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      id,
      customer,
      total,
      subtotal,
      deliveryFee,
      paymentMethod,
      paymentDetails,
      deliveryMethod,
      deliveryNotes,
      products,
      userId,
    } = body;

    const orderId = id || `#ORD-${Date.now().toString().slice(-6)}`;

    const newOrder = await prisma.order.create({
      data: {
        id: orderId,
        customerName: customer?.name || "Customer",
        customerPhone: customer?.phone || "",
        customerAddress: customer?.address || "",
        total: Number(total || 0),
        subtotal: Number(subtotal || 0),
        deliveryFee: Number(deliveryFee || 60),
        status: "Confirmed",
        paymentMethod: (paymentMethod || "COD").toUpperCase(),
        paymentWallet: paymentDetails?.wallet || null,
        paymentTrxId: paymentDetails?.trxId || null,
        deliveryMethod: deliveryMethod || "Express (1-2 days)",
        deliveryNotes: deliveryNotes || null,
        userId: userId || null,
        products: {
          create: (products || []).map((p) => ({
            productId: p.id ? Number(p.id) : null,
            name: p.name || "Product",
            price: Number(p.price || 0),
            qty: p.qty ? parseInt(p.qty) : 1,
            image: p.image || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80",
          })),
        },
      },
      include: {
        products: true,
      },
    });

    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
  } catch (error) {
    console.error("POST /api/orders error:", error);
    return NextResponse.json({ success: false, error: "Failed to create order" }, { status: 500 });
  }
}
