import React from 'react';


export default function BentoCard({ className, children, ...props }) {
  return (
    <div
      className={`bg-white rounded-3xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
}
