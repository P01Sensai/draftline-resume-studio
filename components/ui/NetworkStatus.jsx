'use client';

import { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Only run on client
    if (typeof window !== 'undefined') {
      setIsOnline(navigator.onLine);

      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);

      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        >
          <div className="mt-4 px-4 py-2 bg-red-500/90 backdrop-blur-md text-white shadow-lg rounded-full flex items-center gap-2 border border-red-600">
            <WifiOff size={16} className="text-white" />
            <span className="text-sm font-medium tracking-wide">
              You are offline. Changes will be saved locally.
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
