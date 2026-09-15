"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Mail, Lock, AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  
  const router = useRouter();
  const supabase = createClient();

  const handleEmailLogin = async (e) => {
    if (e) e.preventDefault();
    if (!email || !password) { setError('Please enter both email and password.'); return; }
    setLoading(true); setError(null); setMessage(null);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) { setError(error.message); } else { router.push('/'); router.refresh(); }
    setLoading(false);
  };

  const handleEmailSignup = async (e) => {
    if (e) e.preventDefault();
    if (!email || !password || !confirmPassword) { setError('Please fill out all fields to sign up.'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters long.'); return; }
    setLoading(true); setError(null); setMessage(null);
    const { data, error } = await supabase.auth.signUp({ email: email.trim(), password });
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
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) { setError(error.message); setLoading(false); }
  };

  return (
    <main className="w-full min-h-screen bg-[#f8f9fc] dark:bg-[#0a0b14] text-gray-900 dark:text-gray-100 transition-colors font-body overflow-hidden">
      <div className="flex flex-col lg:flex-row w-full min-h-screen">
        
        {/* LEFT COLUMN: Visual Branding & Resume Showcase */}
        <div className="relative w-full lg:w-[54%] bg-white dark:bg-[#0b0c10] flex flex-col justify-between p-8 lg:p-14 overflow-hidden border-b border-gray-200 dark:border-gray-800 lg:border-b-0 lg:border-r transition-colors">
          
          {/* Immersive Animated Background */}
          <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], x: [0, 50, 0], y: [0, -50, 0] }} 
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-blue-300 dark:bg-[#203a70] blur-[100px]"
            />
            <motion.div 
              animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2], x: [0, -50, 0], y: [0, 50, 0] }} 
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-10 right-0 w-[600px] h-[600px] rounded-full bg-purple-300 dark:bg-[#381a4a] blur-[120px]"
            />
            <div className="absolute inset-0 bg-[radial-gradient(#0066FF_1px,transparent_1px)] dark:bg-[radial-gradient(#4338ca_1px,transparent_1px)] [background-size:24px_24px] opacity-10 dark:opacity-15"></div>
          </div>

          {/* Top Brand Bar */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-[#0066FF] to-blue-400 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30">
                D
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                  Draftline
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0066FF]/10 dark:bg-blue-500/20 text-[#0066FF] dark:text-blue-400 uppercase font-semibold tracking-wider">AI Resume Studio</span>
                </span>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              ATS Engine v4.2 Active
            </div>
          </div>

          {/* Central Hero Showcase */}
          <div className="relative z-10 my-8 lg:my-auto flex flex-col gap-6">
            <div className="max-w-xl">
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-gray-900 dark:text-white">
                Craft your perfect resume.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-purple-600 dark:from-blue-400 dark:to-purple-400">
                  Land your dream job.
                </span>
              </h1>
              <p className="mt-4 text-base text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
                Create ATS-optimized, designer-grade resumes in minutes powered by intelligent contextual AI suggestions and real-time layout formatting.
              </p>
            </div>

            {/* Tilted Resume Cards Playground */}
            <div className="relative mt-8 h-[360px] w-full max-w-xl mx-auto lg:mx-0">
              {/* Background Resume (Tilted Back) */}
              <div className="absolute top-6 left-12 w-[85%] h-[300px] rounded-2xl bg-white/80 dark:bg-[#151621]/80 backdrop-blur-md p-6 transform -rotate-3 scale-95 opacity-50 shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-start">
                  <div className="space-y-1.5">
                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-3 w-48 bg-gray-100 dark:bg-gray-800 rounded"></div>
                  </div>
                  <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </div>
                <div className="mt-8 space-y-3">
                  <div className="h-2.5 w-full bg-gray-100 dark:bg-gray-800 rounded"></div>
                  <div className="h-2.5 w-4/5 bg-gray-100 dark:bg-gray-800 rounded"></div>
                  <div className="h-2.5 w-3/5 bg-gray-100 dark:bg-gray-800 rounded"></div>
                </div>
              </div>

              {/* Main Interactive CV Mockup Card */}
              <div className="absolute top-0 left-0 w-[92%] sm:w-[88%] rounded-2xl bg-white dark:bg-[#151621] p-6 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300 border border-gray-100 dark:border-gray-800">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#0066FF] to-purple-500 flex items-center justify-center text-lg text-white font-bold shadow-inner">
                      EV
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-1.5">
                        Elena Vance
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Lead Product Designer • San Francisco</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-semibold border border-green-100 dark:border-green-500/20">
                    ATS Score: 98%
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-gray-50 dark:bg-[#0f111a] border border-gray-100 dark:border-gray-800">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">Senior UI/UX Architect</span>
                    <span className="text-gray-500">2021 — Present</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                    Synthetix Core • Spearheaded global design system overhaul scaling 40+ products.
                  </p>
                </div>

                {/* Floating Micro Notification */}
                <div className="absolute -bottom-5 right-4 px-4 py-2.5 rounded-xl bg-white dark:bg-[#1a1b26] shadow-xl flex items-center gap-3 text-xs border border-gray-100 dark:border-gray-800 animate-bounce [animation-duration:3s]">
                  <span className="flex h-6 w-6 rounded-full bg-[#0066FF]/10 text-[#0066FF] dark:bg-blue-500/20 dark:text-blue-400 items-center justify-center font-bold">✦</span>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">AI Action Verb Applied</p>
                    <p className="text-green-600 dark:text-green-400 font-medium">+14% readability boost</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Social Credibility Banner */}
          <div className="relative z-10 pt-6 mt-4 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Trusted by <strong className="text-gray-900 dark:text-gray-200 font-semibold">140,000+ candidates</strong> hired globally
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-[#151621] border border-gray-200 dark:border-gray-800">
              <div className="flex text-yellow-400 text-sm">
                ★ ★ ★ ★ ★
              </div>
              <span className="text-xs text-gray-900 dark:text-gray-100 font-bold">4.9 / 5</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Elegant Authentication Form Deck */}
        <div className="relative w-full lg:w-[46%] bg-gray-50 dark:bg-[#0a0b14] flex flex-col justify-center items-center p-6 sm:p-10 lg:p-16 transition-colors">
          
          <div className="relative z-10 w-full max-w-md">
            
            {/* Mode Toggle Switcher Tabs */}
            <div className="mb-8 p-1.5 rounded-xl bg-gray-200/50 dark:bg-[#151621] flex items-center border border-gray-200 dark:border-gray-800">
              <button 
                onClick={() => { setIsSignUp(false); setError(null); setMessage(null); }}
                className={`flex-1 py-2 text-center rounded-lg text-sm transition-all duration-200 ${!isSignUp ? 'bg-white dark:bg-[#222330] text-gray-900 dark:text-white font-semibold shadow-sm border border-gray-200/50 dark:border-gray-700' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 font-medium'}`}
              >
                Sign In
              </button>
              <button 
                onClick={() => { setIsSignUp(true); setError(null); setMessage(null); }}
                className={`flex-1 py-2 text-center rounded-lg text-sm transition-all duration-200 ${isSignUp ? 'bg-white dark:bg-[#222330] text-gray-900 dark:text-white font-semibold shadow-sm border border-gray-200/50 dark:border-gray-700' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 font-medium'}`}
              >
                Create Account
              </button>
            </div>

            {/* Auth Form Card */}
            <div className="rounded-2xl bg-white dark:bg-[#151621] p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-gray-800 transition-colors">
              
              <div className="mb-8 text-left">
                <h2 className="text-2xl text-gray-900 dark:text-white font-bold tracking-tight">
                  {isSignUp ? "Create your account" : "Welcome back"}
                </h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {isSignUp ? "Start generating intelligent, ATS-optimized resumes in seconds." : "Enter your credentials to continue building your career narrative."}
                </p>
              </div>

              {error && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-xl text-sm flex items-start gap-3 border border-red-100 dark:border-red-500/20">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <span>{error}</span>
                </motion.div>
              )}

              {message && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 rounded-xl text-sm flex items-start gap-3 border border-green-100 dark:border-green-500/20">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <span>{message}</span>
                </motion.div>
              )}

              <button 
                onClick={handleGoogleLogin}
                className="w-full py-3 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 dark:bg-[#1a1b26] dark:hover:bg-[#222330] text-gray-900 dark:text-white text-sm font-medium flex items-center justify-center gap-3 transition-all duration-200 border border-gray-200 dark:border-gray-800 mb-6"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" fill="#4285F4"></path>
                  <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" fill="#34A853"></path>
                  <path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z" fill="#FBBC05"></path>
                  <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335"></path>
                </svg>
                Continue with Google
              </button>

              <div className="relative my-6 flex items-center justify-center">
                <div className="w-full h-px bg-gray-200 dark:bg-gray-800"></div>
                <span className="absolute px-4 bg-white dark:bg-[#151621] text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-medium">
                  or continue with email
                </span>
              </div>

              <form className="space-y-4" onSubmit={isSignUp ? handleEmailSignup : handleEmailLogin}>
                
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
                  <div className="relative group rounded-xl bg-gray-50 dark:bg-[#0a0b14] border border-gray-200 dark:border-gray-800 focus-within:border-[#0066FF] dark:focus-within:border-blue-500 transition-colors">
                    <Mail className="absolute left-3.5 top-3 text-gray-400 dark:text-gray-500 group-focus-within:text-[#0066FF] dark:group-focus-within:text-blue-500" size={18} />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent pl-11 pr-4 py-3 rounded-xl text-gray-900 dark:text-white text-sm placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none" 
                      placeholder="name@company.com" 
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between ml-1">
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">Password</label>
                    {!isSignUp && (
                      <a href="#" className="text-xs text-[#0066FF] dark:text-blue-400 hover:underline">Forgot password?</a>
                    )}
                  </div>
                  <div className="relative group rounded-xl bg-gray-50 dark:bg-[#0a0b14] border border-gray-200 dark:border-gray-800 focus-within:border-[#0066FF] dark:focus-within:border-blue-500 transition-colors">
                    <Lock className="absolute left-3.5 top-3 text-gray-400 dark:text-gray-500 group-focus-within:text-[#0066FF] dark:group-focus-within:text-blue-500" size={18} />
                    <input 
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-transparent pl-11 pr-10 py-3 rounded-xl text-gray-900 dark:text-white text-sm placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none" 
                      placeholder="••••••••••••" 
                      required
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {isSignUp && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-1.5 overflow-hidden"
                    >
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 ml-1 mt-4">Confirm Password</label>
                      <div className="relative group rounded-xl bg-gray-50 dark:bg-[#0a0b14] border border-gray-200 dark:border-gray-800 focus-within:border-[#0066FF] dark:focus-within:border-blue-500 transition-colors">
                        <Lock className="absolute left-3.5 top-3 text-gray-400 dark:text-gray-500 group-focus-within:text-[#0066FF] dark:group-focus-within:text-blue-500" size={18} />
                        <input 
                          type={showPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full bg-transparent pl-11 pr-10 py-3 rounded-xl text-gray-900 dark:text-white text-sm placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none" 
                          placeholder="••••••••••••" 
                          required={isSignUp}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full mt-6 py-3.5 px-6 rounded-xl bg-[#0066FF] hover:bg-blue-700 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 transition-all duration-200 disabled:opacity-70 disabled:shadow-none"
                >
                  {loading ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>{isSignUp ? "Create Account" : "Sign In to Draftline"}</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>

            </div>

            <p className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
              By continuing, you agree to Draftline's <a href="#" className="underline hover:text-gray-900 dark:hover:text-white">Terms of Service</a> and <a href="#" className="underline hover:text-gray-900 dark:hover:text-white">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
