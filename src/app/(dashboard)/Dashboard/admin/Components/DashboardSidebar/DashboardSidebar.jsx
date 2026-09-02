"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  House,
  PackagePlus,
  ShoppingBag,
  Users,
  Settings,
  LogOut,
  Store,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import logo from "../../../../../../../public/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/app/store/authSlice";
import { toast } from "react-toastify";

const menuItems = [
  {
    title: "Overview",
    href: "/Dashboard/admin",
    icon: House,
  },
  {
    title: "Orders",
    href: "/Dashboard/admin/orders",
    icon: ShoppingBag,
  },
  {
    title: "Customers",
    href: "/Dashboard/admin/customers",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/Dashboard/admin/settings",
    icon: Settings,
  },
];

const productSubMenus = [
  { title: "All Products", href: "/Dashboard/admin/product/all-products" },
  { title: "Add Product", href: "/Dashboard/admin/product/add-product" },
  { title: "Edit Product", href: "/Dashboard/admin/product/edit-product" },
  { title: "Product Details", href: "/Dashboard/admin/product/product-details" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(true);

  const authUser = useSelector((state) => state.auth?.user);
  const userName = authUser?.name || authUser?.fullName || "Md Antor Mia (admin)";
  const userEmail = authUser?.email || "superadmin@erp.com";
  const userRole = authUser?.role || "SUPER_ADMIN";
  const userAvatar =
    authUser?.avatar ||
    authUser?.image ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80";

  const handleLogout = () => {
    dispatch(logout());
    toast.info("Logged out from admin panel");
    router.push("/login");
  };

  return (
    <aside
      className={`relative bg-white border-r border-gray-200 min-h-screen transition-all duration-300 flex flex-col justify-between ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div>
        {/* Header */}
        <div className="relative h-20 border-b border-gray-200">
          <div className="flex items-center h-full px-4 justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 shrink-0">
                <Image
                  src={logo}
                  alt="Finora"
                  width={22}
                  height={22}
                  priority
                />
              </div>

              {!collapsed && (
                <div>
                  <h2 className="text-xl font-extrabold tracking-tight text-gray-900 leading-none">Finora</h2>
                  <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Admin Panel</span>
                </div>
              )}
            </Link>

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
            >
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>
        </div>

        {/* Menu */}
        <div className="py-6 px-3 space-y-1">
          {/* Main Dashboard */}
          <Link
            href="/Dashboard/admin"
            className={`flex items-center ${
              collapsed ? "justify-center" : "justify-between"
            } rounded-xl px-3.5 py-3 transition-all ${
              pathname === "/Dashboard/admin"
                ? "bg-emerald-50 text-emerald-600 font-bold"
                : "text-gray-700 hover:bg-gray-100 font-medium"
            }`}
          >
            <div className="flex items-center gap-3">
              <House size={20} />
              {!collapsed && <span className="text-sm">Overview</span>}
            </div>
            {!collapsed && <ChevronRight size={16} className="text-gray-400" />}
          </Link>

          {/* Products Dropdown */}
          <div className="space-y-1">
            <button
              onClick={() => setIsProductOpen(!isProductOpen)}
              className={`w-full flex items-center ${
                collapsed ? "justify-center" : "justify-between"
              } rounded-xl px-3.5 py-3 text-gray-700 hover:bg-gray-100 transition-all font-medium cursor-pointer ${
                pathname.includes("/product") ? "text-emerald-600 font-bold" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <PackagePlus size={20} className={pathname.includes("/product") ? "text-emerald-600" : "text-gray-600"} />
                {!collapsed && <span className="text-sm">Products</span>}
              </div>

              {!collapsed && (
                <ChevronRight
                  size={16}
                  className={`text-gray-400 transition-transform duration-200 ${
                    isProductOpen ? "rotate-90 text-emerald-600" : "rotate-0"
                  }`}
                />
              )}
            </button>

            {isProductOpen && !collapsed && (
              <div className="ml-6 pl-4 border-l-2 border-emerald-100 space-y-1">
                {productSubMenus.map((subItem) => {
                  const isSubActive = pathname === subItem.href;
                  return (
                    <Link
                      key={subItem.title}
                      href={subItem.href}
                      className={`block py-1.5 px-2 rounded-lg text-xs font-semibold transition ${
                        isSubActive
                          ? "text-emerald-600 bg-emerald-50"
                          : "text-gray-600 hover:text-emerald-600 hover:bg-gray-50"
                      }`}
                    >
                      {subItem.title}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Other Menu Items */}
          {menuItems.slice(1).map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center ${
                  collapsed ? "justify-center" : "justify-between"
                } rounded-xl px-3.5 py-3 transition-all ${
                  isActive
                    ? "bg-emerald-50 text-emerald-600 font-bold"
                    : "text-gray-700 hover:bg-gray-100 font-medium"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} />
                  {!collapsed && <span className="text-sm">{item.title}</span>}
                </div>
                {!collapsed && <ChevronRight size={16} className="text-gray-400" />}
              </Link>
            );
          })}

          {/* Return to Store */}
          <Link
            href="/"
            className={`flex items-center ${
              collapsed ? "justify-center" : "justify-between"
            } rounded-xl px-3.5 py-3 text-gray-700 hover:bg-gray-100 transition-all font-medium`}
          >
            <div className="flex items-center gap-3">
              <Store size={20} className="text-emerald-600" />
              {!collapsed && <span className="text-sm text-emerald-700 font-semibold">Storefront</span>}
            </div>
          </Link>
        </div>
      </div>

      {/* User Info Card & Logout at Bottom */}
      <div className="p-3 border-t border-gray-100 space-y-2">
        {!collapsed && (
          <div className="flex items-center gap-3 p-2 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-emerald-100 shrink-0 border border-emerald-200">
              {userAvatar ? (
                <Image src={userAvatar} alt={userName} fill sizes="40px" className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-bold text-emerald-700 text-xs">
                  {userName.charAt(0)}
                </div>
              )}
            </div>
            <div className="min-w-0 grow">
              <p className="text-xs font-bold text-slate-900 truncate">{userName}</p>
              <p className="text-[10px] text-emerald-600 font-extrabold uppercase tracking-wide truncate">{userRole}</p>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className={`w-full flex items-center ${
            collapsed ? "justify-center" : "gap-3"
          } rounded-xl px-3.5 py-2.5 text-rose-500 hover:bg-rose-50 transition cursor-pointer font-semibold text-xs`}
        >
          <LogOut size={16} />
          {!collapsed && <span>Log Out</span>}
        </button>
      </div>
    </aside>
  );
}
