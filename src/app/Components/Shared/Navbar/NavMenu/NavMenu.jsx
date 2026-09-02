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
    { name: "Mens Shoes", path: "/Pages/MenShoes" },
    { name: "Home & Living", path: "/Pages/HomeLiving" },
    { name: "Gadgets", path: "/Pages/Gadgets" },
  ];

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {navItems.map((item) => {
        const isActive = pathname === item.path;

        return (
          <Link
            key={item.path}
            href={item.path}
            className={`px-3.5 py-1.5 rounded-lg text-sm md:text-base font-medium transition-all ${
              isActive
                ? "bg-white/20 text-white font-bold shadow-xs"
                : "text-white/90 hover:bg-white/10 hover:text-white"
            }`}
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};

export default NavMenu;