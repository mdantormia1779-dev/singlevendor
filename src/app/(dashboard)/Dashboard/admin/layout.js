"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import DashboardHeader from "./Components/DashboardHeader/DashboardHeader";
import DashboardSidebar from "./Components/DashboardSidebar/DashboardSidebar";
import { ShieldAlert, Loader2, Store } from "lucide-react";
import Link from "next/link";
import { loadStoredAuth } from "@/app/store/authSlice";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const authUser = useSelector((state) => state.auth?.user);
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);

  useEffect(() => {
    dispatch(loadStoredAuth());
  }, [dispatch]);

  useEffect(() => {
    // Check localStorage fallback while Redux is hydrating
    const storedUserStr =
      typeof window !== "undefined" ? localStorage.getItem("finora_user") : null;
    let currentUser = authUser;
    if (!currentUser && storedUserStr) {
      try {
        currentUser = JSON.parse(storedUserStr);
      } catch (e) {}
    }

    if (!currentUser) {
      router.push("/login?redirect=/Dashboard/admin");
      return;
    }

    setIsChecking(false);
  }, [authUser, router]);

  const isAdmin =
    authUser?.role?.toLowerCase() === "admin" ||
    authUser?.role?.toUpperCase() === "SUPER_ADMIN";

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <Loader2 size={36} className="animate-spin text-emerald-600 mb-3" />
        <p className="text-sm font-semibold text-gray-600">Verifying administrator access...</p>
      </div>
    );
  }

  // If signed in as customer/regular user
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-200 p-6 sm:p-8 text-center">
          <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4 border border-rose-100">
            <ShieldAlert size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Admin Access Restricted</h2>
          <p className="text-sm text-gray-500 mb-6">
            You are signed in as a customer account (
            <span className="font-semibold text-gray-700">{authUser?.email}</span>).
            Administrator permissions are required to access this dashboard.
          </p>
          <div className="space-y-2.5">
            <Link
              href="/Dashboard/user"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-sm flex items-center justify-center gap-2 transition shadow-sm"
            >
              <span>Go to Customer Dashboard</span>
            </Link>
            <Link
              href="/"
              className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl text-sm flex items-center justify-center gap-2 transition"
            >
              <Store size={16} />
              <span>Return to Storefront</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar (Desktop + Mobile Drawer) */}
      <DashboardSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Right Column (Header + Page Content) */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        {/* Dedicated Admin Header */}
        <DashboardHeader onToggleMobileSidebar={() => setMobileOpen((prev) => !prev)} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}