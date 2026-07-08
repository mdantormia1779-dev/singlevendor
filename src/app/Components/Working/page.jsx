"use client";

import React from "react";
import { motion } from "framer-motion";
import { Construction } from "lucide-react";

const Working = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-50 p-6 overflow-hidden">
      
      {/* Animated Icon: Rotates and Pulses */}
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1] 
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="text-[#19b77a]"
      >
        <Construction size={100} strokeWidth={1} />
      </motion.div>

      {/* Text Animation: Slides up with fade effect */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mt-8"
      >
        <h2 className="text-5xl font-bold text-slate-800">
          We are working on it!
        </h2>
        <p className="text-slate-500 mt-4 text-lg max-w-md">
          This section is currently under development. Our team is building something amazing. Please check back soon!
        </p>
      </motion.div>

      {/* Button Animation: Hover scale effect */}
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.history.back()}
        className="mt-10 px-8 py-3 bg-[#19b77a] text-white rounded-full shadow-lg hover:bg-[#14a06a] transition-colors"
      >
        Go Back
      </motion.button>
    </div>
  );
};

export default Working;