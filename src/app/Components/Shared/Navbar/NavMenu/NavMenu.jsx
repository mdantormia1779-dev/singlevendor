"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavMenu = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "All Products", path: "/Pages/AllProduct" },
    { name: "Fashion", path: "/Pages/Fasion" },
    { name: "Electronics", path: "/Pages/Electronics" },
    { name: "Men's Shoes", path: "/Pages/MenShoes" },
    { name: "Home & Living", path: "/Pages/HomeLiving" },
    { name: "Gadgets", path: "/Pages/Gadgets" },
  ];

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-1.5 sm:gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`px-3.5 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-white text-emerald-800 shadow-xs font-bold"
                  : "text-white/90 hover:bg-white/15 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/#popular-categories"
          className="text-xs font-semibold text-white/90 hover:text-white transition-colors hidden xl:inline-flex items-center gap-1"
        >
          <span>Categories</span>
        </Link>
        <Link
          href="/Pages/AllProduct?sort=popular"
          className="bg-emerald-900/40 hover:bg-emerald-900/60 text-emerald-100 text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/30 transition-all flex items-center gap-1.5 shadow-2xs"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          <span>Hot Deals</span>
        </Link>
      </div>
    </div>
  );
};

export default NavMenu;