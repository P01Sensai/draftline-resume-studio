"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { ArrowLeft, Mail, Lock, AlertCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useResumeStore } from '@/store/useResumeStore';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  
  const router = useRouter();
  const supabase = createClient();
  const theme = useResumeStore((state) => state.theme);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Please enter both email and password.'); return; }
    setLoading(true); setError(null); setMessage(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setError(error.message); } else { router.push('/'); router.refresh(); }
    setLoading(false);
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Please enter both email and password to sign up.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters long.'); return; }
    setLoading(true); setError(null); setMessage(null);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) { 
      setError(error.message); 
    } else { 
      if (data?.session) {
        router.push('/'); 
        router.refresh();
      } else {
        setMessage('Check your email for the confirmation link!'); 
      }
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true); setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/` },
    });
    if (error) { setError(error.message); setLoading(false); }
  };

  const springTransition = { type: "spring", stiffness: 400, damping: 30 };

  return (
    <div className={`relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#f8f9fc] dark:bg-[#0a0b14] text-gray-900 dark:text-gray-100 transition-colors ${theme}`}>
      
      {/* Immersive Animated Background - Matches Dashboard */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.7, 0.5], x: [0, 50, 0], y: [0, -50, 0] }} 
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] rounded-full bg-blue-200 dark:bg-[#203a70] opacity-50 dark:opacity-40 blur-[100px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0.8, 0.6], x: [0, -50, 0], y: [0, 50, 0] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[20%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-blue-300 dark:bg-[#1a4a6b] opacity-60 dark:opacity-30 blur-[120px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute bottom-[-20%] left-[25%] w-[55vw] h-[55vw] rounded-full bg-purple-200 dark:bg-[#381a4a] opacity-40 dark:opacity-30 blur-[140px]"
        />
      </div>

      <Link href="/" className="absolute top-8 left-8 z-20 inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-colors">
        <ArrowLeft size={16} /> Back to home
      </Link>

      {/* Glassmorphic Centered Card */}
      <div className="relative z-10 w-full max-w-[420px] px-6">
        
        <div className="text-center mb-8 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={springTransition}
            className="w-12 h-12 bg-white/50 dark:bg-white/10 rounded-2xl border border-white/60 dark:border-white/20 backdrop-blur-md flex items-center justify-center mb-6 shadow-[0_4px_20px_rgba(0,102,255,0.1)] dark:shadow-2xl"
          >
            <Sparkles size={24} className="text-[#0066FF] dark:text-blue-400" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springTransition, delay: 0.1 }}
            className="text-3xl font-bold tracking-tight mb-2 text-gray-900 dark:text-white"
          >
            Draftline
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springTransition, delay: 0.2 }}
            className="text-gray-500 dark:text-white/50 text-sm"
          >
            Sign in to access your workspace
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.3 }}
          className="bg-white/60 dark:bg-white/5 backdrop-blur-2xl p-8 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/50 dark:border-white/10"
        >
          {error && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-6 p-4 bg-red-500/10 text-red-400 rounded-xl text-sm flex items-start gap-3 border border-red-500/20">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          {message && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-6 p-4 bg-green-500/10 text-green-400 rounded-xl text-sm flex items-start gap-3 border border-green-500/20">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <span>{message}</span>
            </motion.div>
          )}

          <form className="space-y-5" onSubmit={handleEmailLogin}>
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-white/60 uppercase tracking-wider mb-2 ml-1">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 dark:text-white/30 group-focus-within:text-[#0066FF] dark:group-focus-within:text-blue-400 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-[#0066FF] dark:focus:border-blue-500/50 focus:bg-white dark:focus:bg-black/40 transition-all text-sm placeholder:text-gray-400 dark:placeholder:text-white/20 text-gray-900 dark:text-white focus:ring-4 focus:ring-[#0066FF]/10 dark:focus:ring-transparent"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-white/60 uppercase tracking-wider mb-2 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 dark:text-white/30 group-focus-within:text-[#0066FF] dark:group-focus-within:text-blue-400 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-[#0066FF] dark:focus:border-blue-500/50 focus:bg-white dark:focus:bg-black/40 transition-all text-sm placeholder:text-gray-400 dark:placeholder:text-white/20 text-gray-900 dark:text-white focus:ring-4 focus:ring-[#0066FF]/10 dark:focus:ring-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-3">
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-[#0066FF] hover:bg-blue-700 text-white py-3.5 rounded-xl font-medium transition-colors shadow-[0_4px_14px_0_rgba(0,102,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,102,255,0.23)] disabled:opacity-70 disabled:shadow-none flex justify-center items-center h-12"
              >
                {loading ? <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Sign In'}
              </motion.button>
              
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleEmailSignup}
                disabled={loading}
                className="w-full bg-white/40 hover:bg-white/60 dark:bg-white/5 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white py-3.5 rounded-xl font-medium transition-colors disabled:opacity-70 h-12"
              >
                Create Account
              </motion.button>
            </div>
          </form>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-semibold">
              <span className="px-4 bg-transparent text-gray-400 dark:text-white/30 backdrop-blur-2xl">Or continue with</span>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleLogin}
            disabled={loading}
            className="mt-6 w-full flex justify-center items-center gap-3 bg-white dark:bg-white border border-gray-200 dark:border-transparent text-gray-700 dark:text-black py-3.5 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-100 transition-colors shadow-sm disabled:opacity-70 h-12"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
