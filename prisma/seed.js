const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🌱 Starting Finora Database Seeding with Prisma...");

  // 1. Seed Store Setting
  await prisma.storeSetting.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      storeName: "Finora Ecommerce Platform",
      email: "support@finora.com",
      phone: "+880 1577147480",
      address: "Dhanmondi, Dhaka, Bangladesh",
      bkashNumber: "01577147480",
      nagadNumber: "01577147480",
      standardDeliveryFee: 60,
      expressDeliveryFee: 120,
    },
  });
  console.log("✓ Store Settings initialized");

  // 2. Seed Users (Admin & Customer)
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@finora.com" },
    update: {},
    create: {
      name: "Kristin Watson (Store Admin)",
      email: "admin@finora.com",
      password: "admin123", // in production, hash with bcrypt
      phone: "01577147480",
      role: "admin",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
    },
  });

  const demoCustomer = await prisma.user.upsert({
    where: { email: "ebrahim.google@gmail.com" },
    update: {},
    create: {
      name: "Ebrahim Hossain",
      email: "ebrahim.google@gmail.com",
      password: "password123",
      phone: "01577147480",
      role: "customer",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
    },
  });
  console.log("✓ Users seeded: admin@finora.com & ebrahim.google@gmail.com");

  // 3. Seed Categories
  const categories = [
    { name: "Fashion", slug: "fashion", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80", itemCount: 24 },
    { name: "Electronics", slug: "electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", itemCount: 18 },
    { name: "Men's Shoes", slug: "mens-shoes", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", itemCount: 14 },
    { name: "Home & Living", slug: "home-living", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&q=80", itemCount: 9 },
    { name: "Gadgets", slug: "gadgets", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80", itemCount: 12 },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { itemCount: cat.itemCount, image: cat.image },
      create: cat,
    });
  }
  console.log("✓ Categories seeded");

  // 4. Seed Products from data.json
  const dataPath = path.join(__dirname, "../src/app/data/data.json");
  if (fs.existsSync(dataPath)) {
    const rawProducts = JSON.parse(fs.readFileSync(dataPath, "utf8"));

    for (const p of rawProducts) {
      const priceNum = typeof p.price === "string" ? parseFloat(p.price.replace(/,/g, "")) : Number(p.price);
      const oldPriceNum = p.oldPrice ? (typeof p.oldPrice === "string" ? parseFloat(p.oldPrice.replace(/,/g, "")) : Number(p.oldPrice)) : null;

      await prisma.product.upsert({
        where: { id: p.id },
        update: {
          title: p.title,
          price: priceNum,
          oldPrice: oldPriceNum,
          rating: p.rating ? parseFloat(p.rating) : 4.8,
          reviews: p.reviews ? parseInt(p.reviews) : 100,
          sold: p.sold || "100+ sold",
          discount: p.discount || null,
          images: JSON.stringify(p.images || []),
          description: p.description || p.title,
          features: JSON.stringify(p.features || []),
        },
        create: {
          id: p.id,
          title: p.title,
          price: priceNum,
          oldPrice: oldPriceNum,
          rating: p.rating ? parseFloat(p.rating) : 4.8,
          reviews: p.reviews ? parseInt(p.reviews) : 100,
          sold: p.sold || "100+ sold",
          discount: p.discount || null,
          images: JSON.stringify(p.images || []),
          description: p.description || p.title,
          features: JSON.stringify(p.features || []),
          category: p.specifications?.category || "Fashion",
          inStock: true,
          stockCount: 45,
        },
      });
    }
    console.log(`✓ Products seeded (${rawProducts.length} items from data.json)`);
  }

  // 5. Seed Orders
  const initialOrders = [
    {
      id: "#ORD-998241",
      customerName: "Tanvir Ahmed",
      customerPhone: "01711223344",
      customerAddress: "House 24, Road 7, Banani, Dhaka",
      total: 3450,
      subtotal: 3330,
      deliveryFee: 120,
      status: "Delivered",
      paymentMethod: "BKASH",
      paymentWallet: "01711223344",
      paymentTrxId: "8HJ290X",
      deliveryMethod: "Express (1-2 days)",
      items: [
        { name: "Neptune Long-sleeve Shirt", price: 1450, qty: 1, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100&q=80" },
        { name: "Corduroy Slim-fit Pant", price: 2000, qty: 1, image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=100&q=80" },
      ],
    },
    {
      id: "#ORD-887123",
      customerName: "Sadia Rahman",
      customerPhone: "01819876543",
      customerAddress: "GEC Circle, Nasirabad, Chittagong",
      total: 1890,
      subtotal: 1830,
      deliveryFee: 60,
      status: "Processing",
      paymentMethod: "NAGAD",
      paymentWallet: "01819876543",
      paymentTrxId: "99PX81A",
      deliveryMethod: "Standard (2-4 days)",
      items: [
        { name: "Turtleneck Knitted Top", price: 1830, qty: 1, image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=100&q=80" },
      ],
    },
    {
      id: "#ORD-776109",
      customerName: "Arif Khan",
      customerPhone: "01912345678",
      customerAddress: "Sector 4, Uttara, Dhaka",
      total: 5200,
      subtotal: 5080,
      deliveryFee: 120,
      status: "Pending",
      paymentMethod: "COD",
      paymentWallet: null,
      paymentTrxId: null,
      deliveryMethod: "Express (1-2 days)",
      items: [
        { name: "Wool Oversized Sweater", price: 2540, qty: 2, image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=100&q=80" },
      ],
    },
  ];

  for (const ord of initialOrders) {
    const existing = await prisma.order.findUnique({ where: { id: ord.id } });
    if (!existing) {
      await prisma.order.create({
        data: {
          id: ord.id,
          customerName: ord.customerName,
          customerPhone: ord.customerPhone,
          customerAddress: ord.customerAddress,
          total: ord.total,
          subtotal: ord.subtotal,
          deliveryFee: ord.deliveryFee,
          status: ord.status,
          paymentMethod: ord.paymentMethod,
          paymentWallet: ord.paymentWallet,
          paymentTrxId: ord.paymentTrxId,
          deliveryMethod: ord.deliveryMethod,
          products: {
            create: ord.items.map((it) => ({
              name: it.name,
              price: it.price,
              qty: it.qty,
              image: it.image,
            })),
          },
        },
      });
    }
  }
  console.log("✓ Initial orders seeded");
  console.log("🚀 Prisma database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
