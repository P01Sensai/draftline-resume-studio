import React from 'react';

export function MinimalField({ label, ...props }) {
  return (
    <label className="block mb-4">
      <span className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        {label}
      </span>
      <input
        {...props}
        className="w-full bg-transparent border-b border-gray-200 dark:border-gray-700 py-2 text-sm text-gray-900 dark:text-gray-100 outline-none focus:border-[#0066FF] transition-colors placeholder:text-gray-300 dark:placeholder:text-gray-600"
      />
    </label>
  );
}

export function MinimalTextArea({ label, ...props }) {
  return (
    <label className="block mb-4">
      <span className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        {label}
      </span>
      <textarea
        {...props}
        className="w-full bg-gray-50 dark:bg-[#0a0b14] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-gray-100 outline-none focus:border-[#0066FF] dark:focus:border-[#0066FF] focus:bg-white dark:focus:bg-[#151621] transition-colors resize-y placeholder:text-gray-300 dark:placeholder:text-gray-600"
      />
    </label>
  );
}
