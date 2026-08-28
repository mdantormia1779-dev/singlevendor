import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/orders/[id]
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const cleanId = id.startsWith("%23") ? decodeURIComponent(id) : id.startsWith("#") ? id : `#${id}`;

    const order = await prisma.order.findFirst({
      where: {
        OR: [
          { id: cleanId },
          { id: id },
          { id: `#${id.replace(/^#/, "")}` },
        ],
      },
      include: {
        products: true,
      },
    });

    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("GET /api/orders/[id] error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch order" }, { status: 500 });
  }
}

// PATCH /api/orders/[id] (Update status)
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const cleanId = id.startsWith("%23") ? decodeURIComponent(id) : id.startsWith("#") ? id : `#${id}`;

    const updated = await prisma.order.update({
      where: { id: cleanId },
      data: {
        ...(status && { status }),
      },
      include: {
        products: true,
      },
    });

    return NextResponse.json({ success: true, order: updated });
  } catch (error) {
    console.error("PATCH /api/orders/[id] error:", error);
    return NextResponse.json({ success: false, error: "Failed to update order status" }, { status: 500 });
  }
}
