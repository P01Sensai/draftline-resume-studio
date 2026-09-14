"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function MinimalSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-6 bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors group"
      >
        <span className="text-sm font-semibold text-gray-900">{title}</span>
        {open ? <ChevronUp size={16} className="text-gray-400 group-hover:text-gray-600" /> : <ChevronDown size={16} className="text-gray-400 group-hover:text-gray-600" />}
      </button>
      {open && <div className="px-5 pb-5 pt-1 border-t border-gray-50">{children}</div>}
    </div>
  );
}
