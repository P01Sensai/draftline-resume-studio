"use client";
import React, { useEffect } from 'react';
import { useResumeStore } from '@/store/useResumeStore';

export default function ThemeProvider({ children }) {
  const theme = useResumeStore((state) => state.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return <>{children}</>;
}
