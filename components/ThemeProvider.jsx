"use client";

import React, { useEffect, useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';

export default function ThemeProvider({ children }) {
  const theme = useResumeStore((state) => state.theme);
  const setTheme = useResumeStore((state) => state.setTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Determine initial theme on mount
    const savedTheme = localStorage.getItem('draftline-theme');
    
    if (savedTheme) {
      if (theme !== savedTheme) {
        setTheme(savedTheme);
      }
    } else {
      // Default time-based logic (6 AM to 6 PM is light, otherwise dark)
      const hour = new Date().getHours();
      const isDaytime = hour >= 6 && hour < 18;
      const defaultTheme = isDaytime ? 'light' : 'dark';
      
      if (theme !== defaultTheme) {
        setTheme(defaultTheme);
      }
    }
    
    setMounted(true);
  }, []);

  // Sync theme changes to DOM and localStorage
  useEffect(() => {
    if (mounted && theme) {
      localStorage.setItem('draftline-theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme, mounted]);

  // To prevent hydration mismatch, we might render invisible or empty until mounted
  // But returning children directly is usually fine if children don't rely heavily on theme string in render.
  return <>{children}</>;
}
