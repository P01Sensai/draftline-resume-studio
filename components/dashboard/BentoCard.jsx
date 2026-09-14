"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function BentoCard({ className, children, ...props }) {
  return (
    <motion.div
      className={`bg-white rounded-3xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 dark:border-gray-800/60 transition-colors ${className || ''}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
