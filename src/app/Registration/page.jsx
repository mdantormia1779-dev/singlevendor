"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/app/store/authSlice";
import { signIn } from "@/lib/auth-client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import gsap from "gsap";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

// Validation Schema
const registrationSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(3, "Full name must be at least 3 characters")
    .required("Full name is required"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .min(11, "Phone number must be at least 11 digits")
    .required("Phone number is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

export default function RegistrationPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cardRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registrationSchema),
  });

  // Entrance animation
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" }
      );
    }
  }, []);

  const onRegistrationSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.fullName,
          email: data.email,
          password: data.password,
          phone: data.phoneNumber,
        }),
      });
      const result = await res.json();
      setIsLoading(false);

      if (result.success && result.user) {
        dispatch(loginSuccess(result.user));
        toast.success(`Account created successfully! Welcome, ${data.fullName}! 🎉`);
        router.push("/Dashboard/user");
      } else {
        toast.error(result.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      setIsLoading(false);
      toast.error("Registration failed. Please check connection.");
    }
  };

  const handleGoogleSignup = async () => {
    setIsGoogleLoading(true);
    try {
      if (signIn?.social) {
        await signIn.social({
          provider: "google",
          callbackURL: "/Dashboard/user",
        });
      } else {
        window.location.href = "/api/auth/sign-in/social?provider=google&callbackURL=/Dashboard/user";
      }
    } catch (err) {
      console.error("Google registration error:", err);
      setIsGoogleLoading(false);
      toast.error("Google sign-up failed. Please verify Google OAuth credentials in .env");
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
            <span>Create New Account</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">Join Finora Store</h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Register to enjoy express checkout, order tracking & discounts
          </p>
        </div>

        <CardContent className="p-6 sm:p-8 space-y-6">
          {/* Google Sign-up */}
          <Button
            type="button"
            variant="outline"
            disabled={isGoogleLoading}
            onClick={handleGoogleSignup}
            className="w-full h-12 rounded-2xl border border-slate-200 hover:bg-slate-50/80 font-bold text-slate-800 flex items-center justify-center gap-3 transition-all cursor-pointer shadow-xs"
          >
            {isGoogleLoading ? (
              <div className="w-5 h-5 border-2 border-slate-400 border-t-emerald-600 rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24Z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15Z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
                />
              </svg>
            )}
            <span>{isGoogleLoading ? "Connecting with Google..." : "Sign up with Google"}</span>
          </Button>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-xs uppercase font-extrabold tracking-wider text-slate-400 shrink-0">
              Or register with email
            </span>
            <div className="border-t border-slate-200 w-full" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onRegistrationSubmit)} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-700">Full Name</Label>
              <div className="relative">
                <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  {...register("fullName")}
                  placeholder="e.g. Mahfuz Rahman"
                  className="pl-10 h-12 rounded-2xl bg-slate-50/50 border-slate-200 focus:bg-white text-sm"
                />
              </div>
              {errors.fullName && (
                <p className="text-[11px] font-semibold text-rose-500">{errors.fullName.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-700">Email Address</Label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
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

            {/* Phone */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-700">Phone Number</Label>
              <div className="relative">
                <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  {...register("phoneNumber")}
                  placeholder="017XXXXXXXX"
                  className="pl-10 h-12 rounded-2xl bg-slate-50/50 border-slate-200 focus:bg-white text-sm"
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-[11px] font-semibold text-rose-500">{errors.phoneNumber.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-700">Password</Label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
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
                <p className="text-[11px] font-semibold text-rose-500">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-700">Confirm Password</Label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10 h-12 rounded-2xl bg-slate-50/50 border-slate-200 focus:bg-white text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-[11px] font-semibold text-rose-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm transition-all shadow-md shadow-emerald-600/20 cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight size={16} />
                </>
              )}
            </Button>
          </form>

          {/* Login Link */}
          <div className="text-center pt-2">
            <p className="text-xs text-slate-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-emerald-600 hover:text-emerald-700 underline underline-offset-4"
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}