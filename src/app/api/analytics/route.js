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

    // Category distribution
    const products = await prisma.product.findMany({
      select: { category: true, stockCount: true },
    });

    const categoryCounts = {};
    let lowStockCount = 0;
    products.forEach((p) => {
      const cat = p.category || "Fashion";
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
      if (p.stockCount !== null && p.stockCount < 10) lowStockCount++;
    });

    const categoryShare = Object.entries(categoryCounts).map(([name, count]) => ({
      name,
      value: Math.round((count / (products.length || 1)) * 100),
      count,
    }));

    // Revenue by last 7 days
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const last7DaysMap = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayName = days[d.getDay()];
      last7DaysMap[dayName] = { name: dayName, revenue: 0, orders: 0 };
    }

    orders.forEach((o) => {
      const d = new Date(o.createdAt);
      const dayName = days[d.getDay()];
      if (last7DaysMap[dayName]) {
        last7DaysMap[dayName].revenue += o.total || 0;
        last7DaysMap[dayName].orders += 1;
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        totalRevenue: totalRevenue || 0,
        totalOrders: totalOrdersCount,
        totalProducts: totalProductsCount,
        totalCustomers: totalUsersCount,
        lowStockCount,
        statusBreakdown,
        categoryShare,
        revenueTimeline7d: Object.values(last7DaysMap),
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
