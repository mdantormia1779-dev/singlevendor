import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const totalOrdersCount = await prisma.order.count();
    const totalProductsCount = await prisma.product.count();
    const totalUsersCount = await prisma.user.count();

    const orders = await prisma.order.findMany({
      select: {
        total: true,
        status: true,
        createdAt: true,
      },
    });

    const totalRevenue = orders.reduce((sum, ord) => sum + (ord.total || 0), 0);

    const statusBreakdown = {
      Delivered: 0,
      Processing: 0,
      Pending: 0,
      Confirmed: 0,
      Cancelled: 0,
    };

    orders.forEach((o) => {
      if (statusBreakdown[o.status] !== undefined) {
        statusBreakdown[o.status]++;
      } else {
        statusBreakdown.Pending++;
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        totalRevenue,
        totalOrders: totalOrdersCount,
        totalProducts: totalProductsCount,
        totalCustomers: totalUsersCount,
        statusBreakdown,
      },
    });
  } catch (error) {
    console.error("GET /api/analytics error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
