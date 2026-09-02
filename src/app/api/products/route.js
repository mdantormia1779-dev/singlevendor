import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/products
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const sort = searchParams.get("sort") || "";
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")) : undefined;
    const featured = searchParams.get("featured");

    const where = {};
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { category: { contains: search, mode: "insensitive" } },
      ];
    }
    if (category && category !== "All") {
      where.category = { contains: category, mode: "insensitive" };
    }

    let orderBy = { id: "asc" };
    if (sort === "price-low") orderBy = { price: "asc" };
    else if (sort === "price-high") orderBy = { price: "desc" };
    else if (sort === "rating") orderBy = { rating: "desc" };
    else if (sort === "newest") orderBy = { createdAt: "desc" };

    const products = await prisma.product.findMany({
      where,
      orderBy,
      take: limit,
    });

    const parsedProducts = products.map((p) => ({
      ...p,
      images: p.images ? (typeof p.images === "string" ? JSON.parse(p.images) : p.images) : [],
      features: p.features ? (typeof p.features === "string" ? JSON.parse(p.features) : p.features) : [],
    }));

    return NextResponse.json({ success: true, count: parsedProducts.length, products: parsedProducts });
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST /api/products
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      title,
      price,
      oldPrice,
      category,
      images,
      description,
      features,
      discount,
      stockCount,
    } = body;

    if (!title || !price) {
      return NextResponse.json(
        { success: false, error: "Title and price are required" },
        { status: 400 }
      );
    }

    const newProduct = await prisma.product.create({
      data: {
        title,
        price: Number(price),
        oldPrice: oldPrice ? Number(oldPrice) : null,
        category: category || "Fashion",
        images: JSON.stringify(images || []),
        description: description || title,
        features: JSON.stringify(features || []),
        discount: discount || null,
        stockCount: stockCount ? parseInt(stockCount) : 50,
      },
    });

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 500 }
    );
  }
}
