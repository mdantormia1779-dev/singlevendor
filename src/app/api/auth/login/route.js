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

    const cleanEmail = email.toLowerCase().trim();
    const cleanPassword = typeof password === "string" ? password.trim() : "";

    // Support typing 'admin' directly as the email
    const targetEmail = cleanEmail === "admin" ? "admin@finora.com" : cleanEmail;

    let user = await prisma.user.findUnique({
      where: { email: targetEmail },
    });

    if (!user) {
      // Auto-provision demo admin if using standard admin credentials
      if ((targetEmail === "admin@finora.com" || targetEmail.includes("admin")) && cleanPassword === "admin123") {
        user = await prisma.user.create({
          data: {
            name: "Kristin Watson",
            email: targetEmail,
            password: "admin123",
            role: "admin",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
          },
        });
      } else {
        return NextResponse.json(
          { success: false, error: "No account found with this email. Please register or check your email." },
          { status: 401 }
        );
      }
    }

    // Check if account has no password (registered via Google OAuth)
    if (!user.password) {
      return NextResponse.json(
        {
          success: false,
          error: "This account was created with Google Sign-In. Please click 'Continue with Google' above.",
        },
        { status: 400 }
      );
    }

    if (user.password !== cleanPassword) {
      return NextResponse.json(
        { success: false, error: "Incorrect password. Please check your password and try again." },
        { status: 401 }
      );
    }

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar || user.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
      phone: user.phone,
    };

    const response = NextResponse.json({
      success: true,
      user: userData,
    });

    // Also set a secure finora_token cookie for server-side auth checking
    response.cookies.set("finora_user", JSON.stringify(userData), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("POST /api/auth/login error:", error);
    return NextResponse.json(
      { success: false, error: "Login failed due to a server error. Please try again." },
      { status: 500 }
    );
  }
}
