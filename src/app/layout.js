"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";

import Navbar from "./Components/Shared/Navbar/Navbar";
import Footer from "./Components/Shared/Fotter/Fotter";
import ReduxProvider from "./Components/ReduxProvider";
import SessionSync from "./Components/SessionSync";
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

  // Hide Navbar/Footer on Admin Dashboard
  const hideLayout = pathname?.startsWith("/Dashboard/admin");

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ReduxProvider>
          <SessionSync>
            {!hideLayout && <Navbar />}

            <main className="flex-1">{children}</main>

            {!hideLayout && <Footer />}

            <ToastContainer position="bottom-right" autoClose={2500} />
          </SessionSync>
        </ReduxProvider>
      </body>
    </html>
  );
}