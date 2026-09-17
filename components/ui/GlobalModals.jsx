'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Lock, LogIn, X, Clock, AlertTriangle } from 'lucide-react';
import { useResumeStore } from '@/store/useResumeStore';

export default function GlobalModals() {
  const router = useRouter();
  
  const showPaywall = useResumeStore(state => state.showPaywallModal);
  const setShowPaywall = useResumeStore(state => state.setShowPaywallModal);
  
  const showSession = useResumeStore(state => state.showSessionExpiredModal);
  const setShowSession = useResumeStore(state => state.setShowSessionExpiredModal);

  return (
    <AnimatePresence>
      {/* Paywall (Premium Locked) Modal */}
      {showPaywall && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-md bg-white dark:bg-[#1a1b26] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl relative overflow-hidden"
          >
            {/* Header pattern */}
            <div className="h-24 bg-gradient-to-br from-indigo-500 to-purple-600 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-white/10 dark:bg-black/10 mix-blend-overlay"></div>
              <Lock size={40} className="text-white drop-shadow-md z-10" />
            </div>
            
            <button 
              onClick={() => setShowPaywall(false)}
              className="absolute top-4 right-4 z-20 p-1.5 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors"
            >
              <X size={16} />
            </button>
            
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Sign in to unlock AI</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                Create a 100% free account to instantly unlock AI-powered resume enhancements and advanced ATS matching. We just need to save your edits to the cloud!
              </p>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => {
                    setShowPaywall(false);
                    router.push('/login');
                  }}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <LogIn size={18} />
                  Log in to Unlock
                </button>
                <button 
                  onClick={() => setShowPaywall(false)}
                  className="w-full py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-colors"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Session Expired Modal */}
      {showSession && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm bg-white dark:bg-[#1a1b26] border-2 border-red-500/20 rounded-2xl shadow-2xl p-6 text-center relative"
          >
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-200 dark:border-red-800">
              <Clock size={28} className="text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Session Expired</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
              For your security, we've logged you out due to inactivity. Don't worry—your current edits are safe on your device. Please log back in to save them to the cloud.
            </p>
            <button 
              onClick={() => {
                setShowSession(false);
                router.push('/login');
              }}
              className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-500/20"
            >
              <LogIn size={18} />
              Log Back In
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
