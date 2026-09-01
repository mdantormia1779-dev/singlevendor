import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/orders/[id]
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const rawId = decodeURIComponent(id);
    const cleanId = rawId.startsWith("#") ? rawId : `#${rawId}`;

    const order = await prisma.order.findFirst({
      where: {
        OR: [
          { id: cleanId },
          { id: rawId },
          { id: rawId.replace(/^#/, "") },
        ],
      },
      include: {
        products: true,
      },
    });

    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }

    const mappedOrder = {
      ...order,
      customer: {
        name: order.customerName,
        phone: order.customerPhone,
        address: order.customerAddress,
      },
      date: new Date(order.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      paymentDetails: order.paymentTrxId
        ? { wallet: order.paymentWallet, trxId: order.paymentTrxId }
        : null,
    };

    return NextResponse.json({ success: true, order: mappedOrder });
  } catch (error) {
    console.error("GET /api/orders/[id] error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch order" }, { status: 500 });
  }
}

// PATCH /api/orders/[id] (Update status or cancel)
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const rawId = decodeURIComponent(id);
    const cleanId = rawId.startsWith("#") ? rawId : `#${rawId}`;

    const existing = await prisma.order.findFirst({
      where: {
        OR: [
          { id: cleanId },
          { id: rawId },
          { id: rawId.replace(/^#/, "") },
        ],
      },
    });

    if (!existing) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }

    const updated = await prisma.order.update({
      where: { id: existing.id },
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

// DELETE /api/orders/[id]
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const rawId = decodeURIComponent(id);
    const cleanId = rawId.startsWith("#") ? rawId : `#${rawId}`;

    const existing = await prisma.order.findFirst({
      where: {
        OR: [
          { id: cleanId },
          { id: rawId },
        ],
      },
    });

    if (existing) {
      await prisma.order.delete({
        where: { id: existing.id },
      });
    }

    return NextResponse.json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/orders/[id] error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete order" }, { status: 500 });
  }
}
