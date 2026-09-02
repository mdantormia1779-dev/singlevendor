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
  X,
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

export default function DashboardSidebar({ mobileOpen, setMobileOpen }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(true);

  const authUser = useSelector((state) => state.auth?.user);
  const userName = authUser?.name || authUser?.fullName || "Administrator";
  const userEmail = authUser?.email || "admin@finora.com";
  const userRole = authUser?.role || "ADMIN";
  const userAvatar = authUser?.avatar || authUser?.image;

  const handleLogout = () => {
    dispatch(logout());
    toast.info("Logged out from admin panel");
    router.push("/login");
  };

  const renderNavList = (isMobile = false) => (
    <div className="py-4 px-3 space-y-1">
      {/* Main Dashboard */}
      <Link
        href="/Dashboard/admin"
        onClick={() => isMobile && setMobileOpen?.(false)}
        className={`flex items-center ${
          !isMobile && collapsed ? "justify-center" : "justify-between"
        } rounded-xl px-3.5 py-3 transition-all ${
          pathname === "/Dashboard/admin"
            ? "bg-emerald-50 text-emerald-600 font-bold"
            : "text-gray-700 hover:bg-gray-100 font-medium"
        }`}
      >
        <div className="flex items-center gap-3">
          <House size={20} />
          {(isMobile || !collapsed) && <span className="text-sm">Overview</span>}
        </div>
        {(isMobile || !collapsed) && <ChevronRight size={16} className="text-gray-400" />}
      </Link>

      {/* Products Dropdown */}
      <div className="space-y-1">
        <button
          onClick={() => setIsProductOpen(!isProductOpen)}
          className={`w-full flex items-center ${
            !isMobile && collapsed ? "justify-center" : "justify-between"
          } rounded-xl px-3.5 py-3 text-gray-700 hover:bg-gray-100 transition-all font-medium cursor-pointer ${
            pathname.includes("/product") ? "text-emerald-600 font-bold" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <PackagePlus
              size={20}
              className={pathname.includes("/product") ? "text-emerald-600" : "text-gray-600"}
            />
            {(isMobile || !collapsed) && <span className="text-sm">Products</span>}
          </div>

          {(isMobile || !collapsed) && (
            <ChevronRight
              size={16}
              className={`text-gray-400 transition-transform duration-200 ${
                isProductOpen ? "rotate-90 text-emerald-600" : "rotate-0"
              }`}
            />
          )}
        </button>

        {isProductOpen && (isMobile || !collapsed) && (
          <div className="ml-6 pl-4 border-l-2 border-emerald-100 space-y-1">
            {productSubMenus.map((subItem) => {
              const isSubActive = pathname === subItem.href;
              return (
                <Link
                  key={subItem.title}
                  href={subItem.href}
                  onClick={() => isMobile && setMobileOpen?.(false)}
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
            onClick={() => isMobile && setMobileOpen?.(false)}
            className={`flex items-center ${
              !isMobile && collapsed ? "justify-center" : "justify-between"
            } rounded-xl px-3.5 py-3 transition-all ${
              isActive
                ? "bg-emerald-50 text-emerald-600 font-bold"
                : "text-gray-700 hover:bg-gray-100 font-medium"
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon size={20} />
              {(isMobile || !collapsed) && <span className="text-sm">{item.title}</span>}
            </div>
            {(isMobile || !collapsed) && <ChevronRight size={16} className="text-gray-400" />}
          </Link>
        );
      })}

      {/* Return to Store */}
      <Link
        href="/"
        onClick={() => isMobile && setMobileOpen?.(false)}
        className={`flex items-center ${
          !isMobile && collapsed ? "justify-center" : "justify-between"
        } rounded-xl px-3.5 py-3 text-gray-700 hover:bg-gray-100 transition-all font-medium`}
      >
        <div className="flex items-center gap-3">
          <Store size={20} className="text-emerald-600" />
          {(isMobile || !collapsed) && (
            <span className="text-sm text-emerald-700 font-semibold">Storefront</span>
          )}
        </div>
      </Link>
    </div>
  );

  const renderUserInfo = (isMobile = false) => (
    <div className="p-3 border-t border-gray-100 space-y-2">
      {(isMobile || !collapsed) && (
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
            <p className="text-[10px] text-emerald-600 font-extrabold uppercase tracking-wide truncate">
              {userRole}
            </p>
          </div>
        </div>
      )}

      <button
        onClick={handleLogout}
        className={`w-full flex items-center ${
          !isMobile && collapsed ? "justify-center" : "gap-3"
        } rounded-xl px-3.5 py-2.5 text-rose-500 hover:bg-rose-50 transition cursor-pointer font-semibold text-xs`}
      >
        <LogOut size={16} />
        {(isMobile || !collapsed) && <span>Log Out</span>}
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed / Collapsible) */}
      <aside
        className={`hidden lg:flex relative bg-white border-r border-gray-200 h-screen transition-all duration-300 flex-col justify-between shrink-0 overflow-y-auto ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <div>
          {/* Header */}
          <div className="relative h-20 border-b border-gray-200 shrink-0">
            <div className="flex items-center h-full px-4 justify-between">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 shrink-0 shadow-sm shadow-emerald-100">
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
                type="button"
                onClick={() => setCollapsed(!collapsed)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
                title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
              </button>
            </div>
          </div>

          {/* Navigation Menu */}
          {renderNavList(false)}
        </div>

        {/* Bottom User Info & Logout */}
        {renderUserInfo(false)}
      </aside>

      {/* Mobile Sidebar Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen?.(false)}
          />

          {/* Slide-out Drawer */}
          <aside className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-white shadow-2xl z-50 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-200">
            <div>
              {/* Mobile Drawer Header */}
              <div className="h-20 border-b border-gray-200 flex items-center justify-between px-5">
                <Link
                  href="/"
                  onClick={() => setMobileOpen?.(false)}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 shrink-0 shadow-sm shadow-emerald-100">
                    <Image src={logo} alt="Finora" width={22} height={22} priority />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold tracking-tight text-gray-900 leading-none">Finora</h2>
                    <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Admin Panel</span>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileOpen?.(false)}
                  className="p-2 rounded-xl bg-gray-100 text-gray-500 hover:text-black hover:bg-gray-200 transition cursor-pointer"
                  title="Close Menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Mobile Nav List */}
              {renderNavList(true)}
            </div>

            {/* Mobile User Info & Logout */}
            {renderUserInfo(true)}
          </aside>
        </div>
      )}
    </>
  );
}
