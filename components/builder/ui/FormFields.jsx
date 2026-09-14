import React from 'react';

export function MinimalField({ label, ...props }) {
  return (
    <label className="block mb-4">
      <span className="block text-xs font-medium text-gray-700 mb-1.5">
        {label}
      </span>
      <input
        {...props}
        className="w-full bg-transparent border-b border-gray-200 py-2 text-sm text-gray-900 outline-none focus:border-[#0066FF] transition-colors placeholder:text-gray-300"
      />
    </label>
  );
}

export function MinimalTextArea({ label, ...props }) {
  return (
    <label className="block mb-4">
      <span className="block text-xs font-medium text-gray-700 mb-1.5">
        {label}
      </span>
      <textarea
        {...props}
        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none focus:border-[#0066FF] focus:bg-white transition-colors resize-y placeholder:text-gray-300"
      />
    </label>
  );
}
