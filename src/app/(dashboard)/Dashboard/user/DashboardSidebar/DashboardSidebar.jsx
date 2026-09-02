"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Truck,
  Heart,
  MapPin,
  Settings,
  LogOut,
  ChevronRight,
  User,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/app/store/authSlice";
import { clearOrders } from "@/app/store/cartSlice";
import { toast } from "react-toastify";

const DashboardSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.auth?.user);
  const rawOrders = useSelector((state) => state.cart.orders) || [];
  const wishlistItems = useSelector((state) => state.wishlist.items) || [];

  const [dbOrdersCount, setDbOrdersCount] = React.useState(null);

  React.useEffect(() => {
    if (authUser?.id) {
      fetch(`/api/orders?userId=${encodeURIComponent(authUser.id)}`)
        .then((res) => {
          if (!res.ok || !res.headers.get("content-type")?.includes("application/json")) {
            return null;
          }
          return res.json();
        })
        .then((data) => {
          if (data && data.success && Array.isArray(data.orders)) {
            setDbOrdersCount(data.orders.length);
          }
        })
        .catch(() => {});
    }
  }, [authUser?.id]);

  const userOrders = React.useMemo(() => {
    if (!rawOrders || !authUser?.id) return [];
    return rawOrders.filter((o) => o?.userId === authUser.id);
  }, [rawOrders, authUser?.id]);

  const totalOrdersCount = dbOrdersCount !== null ? dbOrdersCount : userOrders.length;

  const userName = authUser?.name || "Customer";
  const userContact = authUser?.email || authUser?.phone || "customer@finora.com";
  const userAvatar = authUser?.avatar || authUser?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80";

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/Dashboard/user" },
    { name: "My Orders", icon: ShoppingBag, path: "/Dashboard/user/Orders" },
    { name: "Track Order", icon: Truck, path: "/Dashboard/user/TrackOrder" },
    { name: "Wishlist", icon: Heart, path: "/Dashboard/user/Wishlist" },
    { name: "Addresses", icon: MapPin, path: "/Dashboard/user/Address" },
    { name: "Profile Settings", icon: Settings, path: "/Dashboard/user/Setting" },
  ];

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearOrders());
    toast.info("Logged out from your account");
    router.push("/login");
  };

  return (
    <aside className="w-full lg:w-80 space-y-6">
      {/* Dynamic Profile Card */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border border-emerald-100 bg-slate-50 shrink-0">
            {userAvatar ? (
              <Image
                src={userAvatar}
                alt={userName}
                fill
                sizes="64px"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-emerald-50 text-emerald-600 font-bold text-xl">
                {userName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <h2 className="text-lg font-extrabold text-gray-900 truncate">{userName}</h2>
            <p className="text-xs text-gray-500 truncate font-mono">{userContact}</p>
            <span className="inline-block mt-1 text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
              {authUser?.role === "admin" ? "Store Admin" : "Active Member"}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="flex-1 bg-gray-50 py-3 rounded-2xl text-center">
            <p className="text-lg font-bold text-gray-900">{totalOrdersCount}</p>
            <p className="text-xs text-gray-500 font-medium">Orders</p>
          </div>
          <div className="flex-1 bg-gray-50 py-3 rounded-2xl text-center">
            <p className="text-lg font-bold text-gray-900">{wishlistItems.length}</p>
            <p className="text-xs text-gray-500 font-medium">Wishlist</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-white p-3 rounded-3xl border border-gray-100 shadow-sm">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center justify-between p-3.5 rounded-2xl transition ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700 font-bold"
                    : "text-gray-600 hover:bg-gray-50 font-medium"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={18} className={isActive ? "text-emerald-600" : "text-gray-400"} />
                  <span className="text-sm">{item.name}</span>
                </div>
                <ChevronRight size={16} className={isActive ? "text-emerald-600" : "text-gray-300"} />
              </Link>
            );
          })}
        </nav>

        {/* Logout button */}
        <div className="border-t border-gray-100 mt-2 pt-2">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-3.5 text-rose-600 font-bold w-full hover:bg-rose-50 rounded-2xl transition cursor-pointer text-sm"
          >
            <LogOut size={18} /> Logout Account
          </button>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;