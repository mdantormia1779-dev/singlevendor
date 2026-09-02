import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/orders
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const userId = searchParams.get("userId") || "";
    const phone = searchParams.get("phone") || "";
    const email = searchParams.get("email") || "";
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")) : undefined;

    const andConditions = [];

    if (search) {
      andConditions.push({
        OR: [
          { id: { contains: search, mode: "insensitive" } },
          { customerName: { contains: search, mode: "insensitive" } },
          { customerPhone: { contains: search, mode: "insensitive" } },
        ],
      });
    }

    if (status && status !== "All") {
      andConditions.push({
        status: { equals: status, mode: "insensitive" },
      });
    }

    // Filter by user if userId, email, or phone is specified
    if (userId || phone || email) {
      const userFilters = [];

      if (userId) {
        userFilters.push({ userId: userId });

        // Also check if user has a registered phone number in User table
        try {
          const userRecord = await prisma.user.findUnique({
            where: { id: userId },
            select: { phone: true, email: true },
          });
          if (userRecord?.phone) {
            const cleanUserPhone = userRecord.phone.replace(/[^\d]/g, "").slice(-11);
            if (cleanUserPhone) {
              userFilters.push({ customerPhone: { contains: cleanUserPhone } });
            }
          }
        } catch (e) {}
      }

      if (phone) {
        const cleanPhone = phone.replace(/[^\d]/g, "").slice(-11);
        if (cleanPhone) {
          userFilters.push({ customerPhone: { contains: cleanPhone } });
        }
      }

      if (userFilters.length > 0) {
        andConditions.push({ OR: userFilters });
      }
    }

    const where = andConditions.length > 0 ? { AND: andConditions } : {};

    const orders = await prisma.order.findMany({
      where,
      include: {
        products: true,
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    const mappedOrders = orders.map((o) => ({
      ...o,
      customer: {
        name: o.customerName,
        phone: o.customerPhone,
        address: o.customerAddress,
      },
      date: new Date(o.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      paymentDetails: o.paymentTrxId
        ? { wallet: o.paymentWallet, trxId: o.paymentTrxId }
        : null,
    }));

    return NextResponse.json({ success: true, count: mappedOrders.length, orders: mappedOrders });
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

    // Verify or find valid user in database
    let validUserId = null;
    if (userId) {
      const userExists = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true },
      });
      if (userExists) {
        validUserId = userExists.id;
      }
    }

    if (!validUserId) {
      const cleanPhone = customer?.phone ? customer.phone.replace(/[^\d]/g, "").slice(-11) : "";
      const cleanEmail = customer?.email ? customer.email.toLowerCase().trim() : "";

      if (cleanEmail || cleanPhone) {
        const matched = await prisma.user.findFirst({
          where: {
            OR: [
              ...(cleanEmail ? [{ email: cleanEmail }] : []),
              ...(cleanPhone ? [{ phone: { contains: cleanPhone } }] : []),
            ],
          },
          select: { id: true },
        });
        if (matched) {
          validUserId = matched.id;
        }
      }
    }

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
        userId: validUserId,
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
