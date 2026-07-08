"use client";

import React from "react";
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

// ১. ভ্যালিডেশন স্কিমা
const schema = yup.object().shape({
  otp: yup
    .string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .length(6, "Must be exactly 6 digits")
    .required("OTP is required"),
});

export default function OTPVerification() {
    const router = useRouter();
  // ২. useForm সেটআপ
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { otp: "" },
  });

  // ৩. সাবমিট হ্যান্ডলার
  const onSubmit = (data) => {
    console.log("Submitted OTP:", data.otp);
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f7ff] p-4">
      <Card className="w-full max-w-md shadow-lg bg-white">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2 items-center">
            <div className="bg-emerald-500 p-2 rounded-lg text-white">
              <Image src={logo} alt="Logo" width={24} height={24} />
            </div>
            <span className="text-2xl font-bold ml-2">Finora</span>
          </div>
          <CardTitle>Verify your number</CardTitle>
          <CardDescription>
            We sent a 6-digit code to +8801xxxxxxxxx
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
                          className="w-12 h-12 text-lg font-semibold text-center border border-gray-300 rounded-sm first:rounded-sm! last:rounded-sm!
                          focus:border-[#16b77a] focus:ring-2 focus:ring-[#16b77a]/30 transition-all duration-200"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                )}
              />
              {errors.otp && (
                <p className="text-red-500 text-xs">{errors.otp.message}</p>
              )}
            </div>

            <p className="text-center text-sm text-gray-500">
              Resend code in 00:59
            </p>

            <Button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600"
            >
              Verify & Proceed
            </Button>
          </form>

          <div className="relative text-center text-sm py-2">
            <span className="bg-white px-2 text-gray-500">
              Or continue with
            </span>
          </div>

          <Button variant="outline" className="w-full">
            Google
          </Button>

          <div className="text-center text-sm text-gray-500 cursor-pointer hover:underline">
            ← Back
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSlot,
// } from "@/components/ui/input-otp";
// import Image from "next/image";
// import logo from "../../../public/logo.png";

// export default function OTPVerification() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#f0f7ff] p-4">
//       <Card className="w-full max-w-md shadow-lg bg-white">
//         <CardHeader className="text-center">
//           <div className="flex justify-center mb-2 items-center">
//             <div className="bg-emerald-500 p-2 rounded-lg text-white">
//               <Image src={logo} alt="Logo" width={24} height={24} />
//             </div>
//             <span className="text-2xl font-bold ml-2">Finora</span>
//           </div>
//           <CardTitle>Verify your number</CardTitle>
//           <CardDescription>
//             We sent a 6-digit code to +8801xxxxxxxxx
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="flex justify-center">
//             <InputOTP maxLength={6}>
//               <InputOTPGroup className="flex gap-2">
//                 {[0, 1, 2, 3, 4, 5].map((i) => (
//                   <InputOTPSlot
//                     key={i}
//                     index={i}
//             className="
//     w-12 h-12
//     text-lg font-semibold text-center
//     border border-gray-300
//     rounded-sm
//     first:rounded-sm!
//     last:rounded-sm!

//     focus:border-[#16b77a]
//     focus:ring-2 focus:ring-[#16b77a]/30
//     transition-all duration-200
//   "
//                   />
//                 ))}
//               </InputOTPGroup>
//             </InputOTP>
//           </div>
//           <p className="text-center text-sm text-gray-500">
//             Resend code in 00:59
//           </p>
//           <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
//             Verify & Proceed
//           </Button>
//           <div className="relative text-center text-sm py-2">
//             <span className="bg-white px-2 text-gray-500">
//               Or continue with
//             </span>
//           </div>
//           <Button variant="outline" className="w-full">
//             Google
//           </Button>
//           <div className="text-center text-sm text-gray-500 cursor-pointer hover:underline">
//             ← Back
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
