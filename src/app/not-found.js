"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl text-center max-w-lg w-full"
      >
        {/* Floating Animation for Icon */}
        <motion.div 
          animate={{ y: [0, -15, 0] }} 
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner"
        >
          <AlertTriangle size={48} />
        </motion.div>

        <h1 className="text-7xl font-extrabold text-slate-900 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Page Not Found</h2>
        <p className="text-slate-500 mb-10 leading-relaxed text-lg">
          Oops! The page you are looking for does not exist or has been moved.
        </p>

        <Link href="/">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-3 w-full py-4 bg-[#19b77a] text-white font-bold text-lg rounded-2xl shadow-lg hover:bg-[#159f6a] transition-all duration-300"
          >
            <ArrowLeft size={22} /> Back to Home
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}