"use client"; // যেহেতু হুক ব্যবহার করছি

import React from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import logo from "../../../public/logo.png";

// ১. ভ্যালিডেশন স্কিমা তৈরি
const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
});

const RegistrationPage = () => {
  // ২. react-hook-form সেটআপ
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Registration successful!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f7ff] p-4">
      <Card className="w-full max-w-md shadow-lg bg-white">
        <CardHeader className="text-center space-y-1">
          <div className="flex justify-center mb-2 items-center">
            <div className="bg-emerald-500 p-2 rounded-lg text-white">
              <Image src={logo} alt="Logo" width={24} height={24} />
            </div>
            <span className="text-2xl font-bold ml-2">Finora</span>
          </div>
          <CardTitle className="text-2xl font-semibold">Complete your profile</CardTitle>
          <CardDescription>Just a few details to get you started</CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-1.5">
              <Label htmlFor="fullName">Full Name</Label>
              <Input {...register("fullName")} id="fullName" className="bg-gray-50 border-gray-200" />
              <p className="text-red-500 text-xs">{errors.fullName?.message}</p>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input {...register("email")} id="email" type="email" className="bg-gray-50 border-gray-200" />
              <p className="text-xs text-gray-400">Optional — for order receipts</p>
              <p className="text-red-500 text-xs">{errors.email?.message}</p>
            </div>

            <Button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold h-12">
              Complete Registration
            </Button>

            <div className="text-center pt-2">
              <Button variant="link" className="text-gray-400 hover:text-gray-600 p-0 h-auto">
                ← Back
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationPage;