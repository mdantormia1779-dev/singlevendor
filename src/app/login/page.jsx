"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "@/app/store/authSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import gsap from "gsap";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  User,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

// Validation Schema for Email & Password (allows valid email or 'admin')
const emailSchema = yup.object().shape({
  email: yup
    .string()
    .test("email-or-admin", "Please enter a valid email address", (val) => {
      if (!val) return false;
      const trimmed = val.trim().toLowerCase();
      if (trimmed === "admin") return true;
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    })
    .required("Email is required"),
  password: yup
    .string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth?.user);
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  const cardRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(emailSchema),
  });

  // GSAP Entrance Animation
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" }
      );
    }
  }, []);

  // Quick fill helper for demo accounts
  const handleQuickFill = (email, password) => {
    setValue("email", email, { shouldValidate: true });
    setValue("password", password, { shouldValidate: true });
  };

  // 1. Submit Email & Password (Prisma Database)
  const onEmailSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });
      const result = await res.json();
      setIsLoading(false);

      if (result.success && result.user) {
        dispatch(loginSuccess(result.user));
        toast.success(`Welcome back, ${result.user.name}! 🎉`);

        if (redirectUrl && redirectUrl.startsWith("/")) {
          router.push(redirectUrl);
        } else if (result.user.role === "admin" || result.user.role === "SUPER_ADMIN") {
          router.push("/Dashboard/admin");
        } else {
          router.push("/Dashboard/user");
        }
      } else {
        toast.error(result.error || "Invalid email or password. Please try again.");
      }
    } catch (err) {
      setIsLoading(false);
      toast.error("Connection error. Please try again.");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-emerald-50/20 to-teal-50/30 p-4 py-12">
      <Card
        ref={cardRef}
        className="w-full max-w-md shadow-2xl bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200/80 overflow-hidden"
      >
        {/* Header Branding */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 text-white text-center relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-28 h-28 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-extrabold px-3 py-1 rounded-full mb-3">
            <Sparkles size={13} />
            <span>Secure Database Authentication</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">Welcome Back</h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Sign in to access your orders, track shipments & dashboard
          </p>
        </div>

        <CardContent className="p-6 sm:p-8 space-y-6">
          {/* Active Logged In Notice if already signed in */}
          {isAuthenticated && authUser && (
            <div className="p-3.5 bg-emerald-50/80 border border-emerald-200/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="min-w-0">
                <span className="font-extrabold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-emerald-600" />
                  Currently signed in:
                </span>
                <p className="text-emerald-700 truncate font-semibold mt-0.5">
                  {authUser.name} ({authUser.email})
                </p>
              </div>
              <Button
                size="sm"
                type="button"
                onClick={() =>
                  router.push(
                    authUser.role === "admin" ? "/Dashboard/admin" : "/Dashboard/user"
                  )
                }
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shrink-0 cursor-pointer h-8 px-3"
              >
                Go to Dashboard
              </Button>
            </div>
          )}



          {/* Email / Password Form */}
          <form onSubmit={handleSubmit(onEmailSubmit)} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-700">Email Address</Label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10 h-12 rounded-2xl bg-slate-50/50 border-slate-200 focus:bg-white text-sm"
                />
              </div>
              {errors.email && (
                <p className="text-[11px] font-semibold text-rose-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-bold text-slate-700">Password</Label>
              </div>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10 h-12 rounded-2xl bg-slate-50/50 border-slate-200 focus:bg-white text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[11px] font-semibold text-rose-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm transition-all shadow-md shadow-emerald-600/20 cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={16} />
                </>
              )}
            </Button>
          </form>

          {/* Quick Demo Accounts Helper */}
          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                Demo Accounts (One-Click Fill)
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Click to populate</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  handleQuickFill("admin@finora.com", "admin123");
                  toast.info("Admin credentials filled! Click Sign In 👑");
                }}
                className="flex items-center justify-center gap-1.5 p-2.5 bg-white hover:bg-orange-50/80 border border-slate-200 hover:border-orange-300 rounded-xl text-xs font-bold text-slate-700 hover:text-orange-700 transition cursor-pointer shadow-2xs"
              >
                <ShieldCheck size={14} className="text-orange-500" />
                <span>Admin Demo</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  handleQuickFill("mdantormia1779@gmail.com", "123456");
                  toast.info("Customer credentials filled! Click Sign In 👤");
                }}
                className="flex items-center justify-center gap-1.5 p-2.5 bg-white hover:bg-emerald-50/80 border border-slate-200 hover:border-emerald-300 rounded-xl text-xs font-bold text-slate-700 hover:text-emerald-700 transition cursor-pointer shadow-2xs"
              >
                <User size={14} className="text-emerald-600" />
                <span>Customer Demo</span>
              </button>
            </div>
          </div>

          {/* Registration Link */}
          <div className="text-center pt-2">
            <p className="text-xs text-slate-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/Registration"
                className="font-bold text-emerald-600 hover:text-emerald-700 underline underline-offset-4"
              >
                Create an account
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-bold text-slate-500">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}