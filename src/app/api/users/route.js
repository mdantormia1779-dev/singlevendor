import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/users
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";

    const where = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phone: { contains: search } },
      ];
    }

    const users = await prisma.user.findMany({
      where,
      include: {
        orders: {
          select: {
            id: true,
            total: true,
            status: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const formattedUsers = users.map((u) => {
      const totalSpent = u.orders.reduce((sum, ord) => sum + (ord.total || 0), 0);
      return {
        id: u.id,
        name: u.name,
        email: u.email,
        phone: u.phone || "N/A",
        role: u.role,
        avatar:
          u.avatar ||
          u.image ||
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
        location: "Bangladesh",
        ordersCount: u.orders.length,
        totalSpent,
        status: u.role === "SUPER_ADMIN" ? "Super Admin" : u.role === "admin" ? "Admin" : "Active Member",
        joinedDate: new Date(u.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };
    });

    return NextResponse.json({ success: true, users: formattedUsers });
  } catch (error) {
    console.error("GET /api/users error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch users" }, { status: 500 });
  }
}

// POST /api/users (Add new user by admin)
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, role } = body;

    if (!name || !email) {
      return NextResponse.json({ success: false, error: "Name and email are required" }, { status: 400 });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase().trim(),
        phone: phone || null,
        role: role || "customer",
        password: "defaultPassword123",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
      },
    });

    return NextResponse.json({ success: true, user: newUser }, { status: 201 });
  } catch (error) {
    console.error("POST /api/users error:", error);
    return NextResponse.json({ success: false, error: "Failed to create user" }, { status: 500 });
  }
}

// DELETE /api/users?id=...
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 });
    }

    // Unlink orders or cascade sessions/accounts
    await prisma.order.updateMany({
      where: { userId: id },
      data: { userId: null },
    });

    await prisma.session.deleteMany({
      where: { userId: id },
    });

    await prisma.account.deleteMany({
      where: { userId: id },
    });

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/users error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete user" }, { status: 500 });
  }
}
