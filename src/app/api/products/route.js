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

    const parseJsonArray = (val) => {
      if (!val) return [];
      if (Array.isArray(val)) return val;
      if (typeof val === "string") {
        try {
          const parsed = JSON.parse(val);
          return Array.isArray(parsed) ? parsed : [String(parsed)];
        } catch {
          return [val];
        }
      }
      return [];
    };

    const parsedProducts = products.map((p) => ({
      ...p,
      images: parseJsonArray(p.images),
      features: parseJsonArray(p.features),
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

    if (!title || price === undefined || price === null || price === "") {
      return NextResponse.json(
        { success: false, error: "Title and price are required" },
        { status: 400 }
      );
    }

    // Normalize images into array of strings
    let imageList = [];
    if (Array.isArray(images)) {
      imageList = images.filter((img) => typeof img === "string" && img.trim().length > 0);
    } else if (typeof images === "string" && images.trim()) {
      try {
        const parsed = JSON.parse(images);
        imageList = Array.isArray(parsed) ? parsed : [images.trim()];
      } catch {
        imageList = [images.trim()];
      }
    }

    if (imageList.length === 0) {
      imageList = ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80"];
    }

    // Normalize features into array of strings
    let featureList = [];
    if (Array.isArray(features)) {
      featureList = features.filter((f) => typeof f === "string" && f.trim().length > 0);
    } else if (typeof features === "string" && features.trim()) {
      featureList = [features.trim()];
    }

    const productData = {
      title: String(title).trim(),
      price: Number(price),
      oldPrice: oldPrice ? Number(oldPrice) : null,
      category: category || "Fashion",
      images: JSON.stringify(imageList),
      description: description ? String(description).trim() : String(title).trim(),
      features: JSON.stringify(featureList),
      discount: discount || null,
      stockCount: stockCount !== undefined && stockCount !== null && stockCount !== "" ? parseInt(stockCount) : 50,
    };

    let newProduct;
    try {
      newProduct = await prisma.product.create({
        data: productData,
      });
    } catch (createErr) {
      if (createErr.code === "P2002" || createErr.message?.includes("Unique constraint failed")) {
        console.warn("Detected sequence out of sync for Product table. Auto-syncing PostgreSQL sequence...");
        try {
          await prisma.$executeRawUnsafe(
            `SELECT setval(pg_get_serial_sequence('"Product"', 'id'), coalesce(max(id), 1), true) FROM "Product";`
          );
          newProduct = await prisma.product.create({
            data: productData,
          });
        } catch (retryErr) {
          throw retryErr;
        }
      } else {
        throw createErr;
      }
    }

    return NextResponse.json({
      success: true,
      product: {
        ...newProduct,
        images: imageList,
        features: featureList,
      },
    }, { status: 201 });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create product: " + error.message },
      { status: 500 }
    );
  }
}
