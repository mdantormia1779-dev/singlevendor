"use client";

import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(11, "Must be at least 11 digits")
    .required("Phone number is required"),
});

const LoginPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Login Data:", data);

    // OTP Page
    router.push("/Otp");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-md border border-gray-100 rounded-xl">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-500 p-2 rounded-lg">
                <Image src={logo} alt="Logo" width={24} height={24} />
              </div>

              <CardTitle className="text-xl font-bold">
                Finora
              </CardTitle>
            </div>
          </div>

          <CardTitle className="text-xl font-bold">
            Welcome to Finora
          </CardTitle>

          <CardDescription className="text-sm text-gray-500">
            Sign in or create an account to continue
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Phone */}
            <div className="space-y-1.5">
              <Label htmlFor="phoneNumber">
                Phone Number
              </Label>

              <div className="relative">
                <Input
                  id="phoneNumber"
                  placeholder="01XXXXXXXXX"
                  className="bg-gray-100 border-none pl-10 h-11"
                  {...register("phoneNumber")}
                />

                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              </div>

              {errors.phoneNumber && (
                <p className="text-red-500 text-xs">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-11 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
            >
              Send OTP Code
            </Button>

            {/* Divider */}
            <div className="relative py-2 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>

              <span className="relative bg-white px-2 text-xs text-gray-400">
                Or continue with
              </span>
            </div>

            {/* Google */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-11 font-medium"
            >
              Google
            </Button>

            {/* Back */}
            <div className="text-center pt-2">
              <Button
                type="button"
                variant="link"
                onClick={() => router.push("/Registration")}
                className="text-gray-400 hover:text-gray-600 p-0 h-auto text-sm"
              >
                ← Back
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;