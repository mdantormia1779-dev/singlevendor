import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/auth/google
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, avatar } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required for Google Sign-In" },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if user already exists or create new Google user in Prisma
    const user = await prisma.user.upsert({
      where: { email: cleanEmail },
      update: {
        ...(name && { name }),
        ...(avatar && { avatar }),
      },
      create: {
        name: name || cleanEmail.split("@")[0],
        email: cleanEmail,
        password: "google_oauth_authenticated",
        role: cleanEmail.includes("admin") ? "admin" : "customer",
        avatar:
          avatar ||
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        phone: user.phone,
        provider: "google",
      },
    });
  } catch (error) {
    console.error("POST /api/auth/google error:", error);
    return NextResponse.json(
      { success: false, error: "Google authentication failed" },
      { status: 500 }
    );
  }
}
