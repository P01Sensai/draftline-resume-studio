"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function MinimalSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-6 bg-white dark:bg-[#1a1b26] border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm transition-colors">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 dark:hover:bg-[#151621] transition-colors group"
      >
        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</span>
        {open ? <ChevronUp size={16} className="text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300" /> : <ChevronDown size={16} className="text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300" />}
      </button>
      {open && <div className="px-5 pb-5 pt-1 border-t border-gray-50 dark:border-gray-800/50">{children}</div>}
    </div>
  );
}
