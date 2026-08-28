"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { ArrowLeft, Loader2 } from "lucide-react";

const schema = yup.object().shape({
  otp: yup
    .string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .length(6, "Must be exactly 6 digits")
    .required("OTP is required"),
});

export default function OTPVerification() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { otp: "" },
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Phone verified successfully! Welcome back 👋");
      router.push("/Dashboard/user");
    }, 600);
  };

  const handleResend = () => {
    toast.info("A new OTP code has been sent to your phone! 📩");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/70 p-4">
      <Card className="w-full max-w-md shadow-lg bg-white rounded-3xl border border-gray-100 p-2">
        <CardHeader className="text-center space-y-2 pb-4">
          <div className="flex justify-center mb-1">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-emerald-500 p-2.5 rounded-xl shadow-xs">
                <Image src={logo} alt="Finora" width={26} height={26} />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-gray-900">
                Finora
              </span>
            </Link>
          </div>
          <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">
            Verify your phone
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm text-gray-500">
            We sent a 6-digit code to your phone number
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col items-center gap-2">
              <Controller
                name="otp"
                control={control}
                render={({ field }) => (
                  <InputOTP
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                    {...field}
                  >
                    <InputOTPGroup className="flex gap-2">
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <InputOTPSlot
                          key={i}
                          index={i}
                          className="w-11 h-12 text-lg font-bold text-center border border-gray-200 rounded-xl
                          focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                )}
              />
              {errors.otp && (
                <p className="text-red-500 text-xs mt-1">{errors.otp.message}</p>
              )}
            </div>

            <div className="text-center text-xs text-gray-500 flex items-center justify-center gap-1">
              <span>Didn't receive the code?</span>
              <button
                type="button"
                onClick={handleResend}
                className="text-emerald-600 font-bold hover:underline cursor-pointer"
              >
                Resend code
              </button>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md shadow-emerald-100 text-sm cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={18} />
                  Verifying...
                </>
              ) : (
                "Verify & Continue"
              )}
            </Button>
          </form>

          <div className="pt-2 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-emerald-600 font-medium"
            >
              <ArrowLeft size={14} /> Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

