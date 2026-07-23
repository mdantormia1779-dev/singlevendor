"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";

import Navbar from "./Components/Shared/Navbar/Navbar";
import Footer from "./Components/Shared/Fotter/Fotter";
import ReduxProvider from "./Components/ReduxProvider";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Dashboard এর সব route এ Navbar/Footer hide হবে
  const hideLayout = pathname.startsWith("/Dashboard/admin");

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ReduxProvider>
          {!hideLayout && <Navbar />}

          <main className="flex-1">{children}</main>

          {!hideLayout && <Footer />}

          <ToastContainer />
        </ReduxProvider>
      </body>
    </html>
  );
}