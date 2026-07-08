"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

const NavMenu = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Fashion", path: "/Pages/Fasion" },
    { name: "Electronics", path: "/Pages/Electronics" },
    { name: "Mens Shoes", path: "/Pages/MenShoes" },
    { name: "Home & Living", path: "/Pages/HomeLiving" },
    { name: "Gadgets", path: "/Pages/Gadgets" },
    // { name: "Shopping Cards", path: "/Pages/ShopingCards" },
    // { name: "Confirm", path: "/Pages/OrderConfirm" },
    // { name: "Success", path: "/Pages/OrderSuccess" },
  ];

  return (
    <div className="flex items-center gap-6">
      {navItems.map((item) => {
        const isActive = pathname === item.path;

        return (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center gap-1 transition-all
              ${
                isActive
                  ? "text-white font-semibold underline underline-offset-4 decoration-2"
                  : "text-white"
              }
            `}
          >
            {item.name}
            <ChevronDown size={18} />
          </Link>
        );
      })}
    </div>
  );
};

export default NavMenu;