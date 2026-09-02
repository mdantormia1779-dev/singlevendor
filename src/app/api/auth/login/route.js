import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      // Auto register demo admin or check password
      if (email.includes("admin") && password === "admin123") {
        const createdAdmin = await prisma.user.create({
          data: {
            name: "Kristin Watson",
            email: email.toLowerCase().trim(),
            password: "admin123",
            role: "admin",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
          },
        });
        return NextResponse.json({
          success: true,
          user: {
            id: createdAdmin.id,
            name: createdAdmin.name,
            email: createdAdmin.email,
            role: createdAdmin.role,
            avatar: createdAdmin.avatar,
          },
        });
      }

      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    if (user.password !== password) {
      return NextResponse.json(
        { success: false, error: "Invalid password" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error("POST /api/auth/login error:", error);
    return NextResponse.json(
      { success: false, error: "Login failed" },
      { status: 500 }
    );
  }
}
