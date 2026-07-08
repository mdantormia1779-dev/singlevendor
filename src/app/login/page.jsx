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
import { Phone, Mail } from "lucide-react"; // Mail আইকন পরিবর্তন করে Phone আইকন নিচ্ছি
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
    router.push("/Otp");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      {/* কার্ড স্টাইল ইমেজ অনুযায়ী আপডেট করা হয়েছে */}
      <Card className="w-full max-w-md shadow-md border border-gray-100 rounded-xl">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <div className="flex justify-center items-center gap-4">
              <div className="bg-emerald-500 p-2 rounded-lg text-white">
                <Image src={logo} alt="Logo" width={24} height={24} />
              </div>
              <CardTitle className="text-xl font-bold">Finora</CardTitle>
            </div>
          </div>
          <CardTitle className="text-xl font-bold">Welcome to Finora</CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Sign in or create an account to continue
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="phoneNumber" className="text-sm font-medium">
                Phone Number
              </Label>
              <div className="relative">
                <Input
                  {...register("phoneNumber")}
                  id="phoneNumber"
                  placeholder="01XXXXXXXXX"
                  className="bg-gray-100 border-none pl-10 h-11"
                />
                {/* Mail আইকনের বদলে Phone আইকন ব্যবহার করা হয়েছে */}
                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              </div>
              <p className="text-red-500 text-xs">
                {errors.phoneNumber?.message}
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold h-11"
            >
              Send OTP Code
            </Button>

            <div className="relative text-center py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <span className="relative bg-white px-2 text-xs text-gray-400">
                Or continue with
              </span>
            </div>

            <Button variant="outline" className="w-full font-medium h-11">
              Google
            </Button>

            <div className="text-center pt-2">
              <Button
                variant="link"
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
