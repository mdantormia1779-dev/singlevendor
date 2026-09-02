"use client";

import { Poppins } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";

import Navbar from "./Components/Shared/Navbar/Navbar";
import Footer from "./Components/Shared/Fotter/Fotter";
import ReduxProvider from "./Components/ReduxProvider";
import SessionSync from "./Components/SessionSync";
import { ToastContainer } from "react-toastify";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Hide Navbar/Footer on Admin Dashboard
  const hideLayout = pathname?.toLowerCase()?.startsWith("/dashboard/admin");

  return (
    <html
      lang="en"
      className={`${poppins.variable} font-sans h-full antialiased`}
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