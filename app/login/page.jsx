"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  
  // 3D Deck State
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    if (isHovered || isFlipping) return;
    const timer = setInterval(() => {
      cycleDeck();
    }, 3800);
    return () => clearInterval(timer);
  }, [activeCardIndex, isHovered, isFlipping]);

  const cycleDeck = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => {
      setActiveCardIndex((prev) => (prev + 1) % 3);
      setTimeout(() => {
        setIsFlipping(false);
      }, 400);
    }, 280);
  };

  const goToSlide = (idx) => {
    if (isFlipping || idx === activeCardIndex) return;
    setActiveCardIndex(idx);
  };

  const getCardClass = (i) => {
    if (isFlipping && i === activeCardIndex) {
      return "card-pos-flipping";
    }
    const relativeIndex = (i - activeCardIndex + 3) % 3;
    return `card-pos-${relativeIndex}`;
  };

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
    if (!email || !password || !name) { setError('Please fill out all fields to sign up.'); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters long.'); return; }
    setLoading(true); setError(null); setMessage(null);
    const { data, error } = await supabase.auth.signUp({ 
      email: email.trim(), 
      password,
      options: {
        data: {
          full_name: name
        }
      }
    });
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
    <main className="w-full min-h-screen bg-background">
      <div className="flex flex-col w-full min-h-screen lg:flex-row bg-background overflow-hidden select-none">
        
        {/* LEFT COLUMN: Visual Branding & Interactive Resume Showcase */}
        <div className="relative w-full lg:w-[54%] bg-surface-container-lowest flex flex-col justify-between p-8 lg:p-14 overflow-hidden border-b lg:border-b-0">
          
          {/* Radial Glows & Grid Mesh Backdrop */}
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary-container/25 blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-10 right-0 w-[30rem] h-[30rem] rounded-full bg-tertiary-container/20 blur-3xl pointer-events-none"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#4338ca_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none"></div>
          
          {/* Top Brand Bar */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img alt="Draftline Logo" className="w-10 h-10 rounded-lg object-contain shadow-lg shadow-primary-container/30" src="https://lh3.googleusercontent.com/aida/AEtjO1WO6m6Kx6tK3KTYsEEefxRdEl6qxHjy_6DctEDa2glKoSDG29h4HWRxKZYOPmwvjPp5zPi-unFwOwKie_tZOCshG0ML69Czyb6t7N_owklmDR2T47LjGJ4q3EwlW8PQIOuXXEBrcIDHEyDqzEUKu_MZ--vf5nspb6ANp00GubgAZ5goXNzFmCePPFw5XxsE4EO6BqoURb_q1SK5xrGWCq67mZGw48fW1GuA8zaXecV8FKXDUGkNH7-6KcM"/>
              <div className="flex flex-col">
                <span className="font-headline-lg text-headline-lg tracking-tight text-on-surface flex items-center gap-2">
                  Draftline
                  <span className="font-caption text-caption px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase font-semibold tracking-wider">AI Resume Studio</span>
                </span>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              <span className="">ATS Engine v4.2 Active</span>
            </div>
          </div>
          
          {/* Central Hero Showcase & Mockup Stacks */}
          <div className="relative z-10 my-8 lg:my-auto flex flex-col gap-6">
            <div className="max-w-xl">
              <h1 className="font-display-lg text-display-lg-mobile lg:text-display-lg text-on-surface font-bold tracking-tight leading-tight">
                Craft your perfect resume.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary">
                  Land your dream job.
                </span>
              </h1>
              <p className="mt-4 font-body-lg text-body-lg text-on-surface-variant max-w-lg leading-relaxed">
                Create ATS-optimized, designer-grade resumes in minutes powered by intelligent contextual AI suggestions and real-time layout formatting.
              </p>
            </div>
            
            {/* 3D Flipping Animated Resume Stack Deck */}
            <div 
              className="relative mt-4 h-[380px] w-full max-w-xl mx-auto lg:mx-0 perspective-1000 group/deck" 
              onMouseEnter={() => setIsHovered(true)} 
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Pill Badge Indicator & Controls */}
              <div className="absolute -top-7 left-1 z-40 flex items-center gap-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high border border-surface-variant/40 shadow-sm whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                  <span className="font-caption text-caption text-on-surface-variant font-medium whitespace-nowrap">Auto-switching templates • 3 styles</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => goToSlide(0)} className={`h-2 rounded-full transition-all duration-300 ${activeCardIndex === 0 ? 'bg-primary w-4' : 'w-2 bg-surface-variant hover:bg-on-surface-variant'}`}></button>
                  <button onClick={() => goToSlide(1)} className={`h-2 rounded-full transition-all duration-300 ${activeCardIndex === 1 ? 'bg-primary w-4' : 'w-2 bg-surface-variant hover:bg-on-surface-variant'}`}></button>
                  <button onClick={() => goToSlide(2)} className={`h-2 rounded-full transition-all duration-300 ${activeCardIndex === 2 ? 'bg-primary w-4' : 'w-2 bg-surface-variant hover:bg-on-surface-variant'}`}></button>
                </div>
              </div>
              
              {/* CARD 1: Aditya Bhardwaj */}
              <div className={`card-stack-item ${getCardClass(0)} absolute top-0 left-0 w-[92%] sm:w-[88%] rounded-2xl bg-surface-container border border-surface-variant/40 p-5 sm:p-6 shadow-2xl cursor-pointer`} onClick={cycleDeck}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary-container to-secondary-container flex items-center justify-center font-headline-md text-headline-md text-on-primary shadow-inner font-bold">AB</div>
                    <div>
                      <h3 className="font-title-sm text-title-sm text-on-surface font-semibold flex items-center gap-1.5">
                        Aditya Bhardwaj
                        <span className="material-symbols-outlined text-tertiary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                      </h3>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">Senior Full-Stack Engineer • Gurgaon</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-container/30 text-tertiary font-label-sm text-label-sm font-semibold border border-tertiary/20">
                    <span className="material-symbols-outlined text-sm">bolt</span>
                    <span>ATS Score: 98%</span>
                  </div>
                </div>
                <div className="mt-4 p-3 rounded-lg bg-surface-container-high/70 border border-surface-variant/30">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium text-on-surface">Staff Full-Stack &amp; Core Systems</span>
                    <span className="font-caption text-caption text-on-surface-variant">2021 — Present</span>
                  </div>
                  <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant/90 line-clamp-1">Synthetix Core • Engineered high-throughput distributed microservices.</p>
                </div>
                <div className="mt-4 space-y-2">
                  <div>
                    <div className="flex justify-between font-caption text-caption text-on-surface-variant mb-1">
                      <span>Full-Stack Architecture &amp; TypeScript</span>
                      <span className="text-primary font-semibold">98%</span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-variant rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: '98%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-caption text-caption text-on-surface-variant mb-1">
                      <span>Distributed Systems &amp; Backend Pipelines</span>
                      <span className="text-tertiary font-semibold">95%</span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-variant rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-secondary to-tertiary rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 right-4 sm:-right-4 px-3.5 py-2 rounded-xl bg-surface-bright/95 text-on-surface shadow-xl flex items-center gap-2.5 text-xs backdrop-blur-md border border-surface-variant/40">
                  <span className="flex h-5 w-5 rounded-full bg-primary-container items-center justify-center text-primary text-xs font-bold">✦</span>
                  <div>
                    <p className="font-semibold text-[11px] text-primary">AI Action Verb Applied</p>
                    <p className="text-[10px] text-on-surface-variant">+16% readability boost</p>
                  </div>
                </div>
                <div className="absolute -top-3.5 -left-3 sm:-left-5 px-3 py-1.5 rounded-lg bg-surface-container-highest/95 text-on-surface shadow-xl flex items-center gap-2 text-xs backdrop-blur-md border border-surface-variant/40">
                  <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                  <span className="font-label-sm text-label-sm font-medium">Stripe invited Aditya to interview</span>
                </div>
              </div>
              
              {/* CARD 2: Pramanshu Prajapati */}
              <div className={`card-stack-item ${getCardClass(1)} absolute top-0 left-0 w-[92%] sm:w-[88%] rounded-2xl bg-surface-container border border-surface-variant/40 p-5 sm:p-6 shadow-2xl cursor-pointer`} onClick={cycleDeck}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-secondary-container to-tertiary-container flex items-center justify-center font-headline-md text-headline-md text-tertiary shadow-inner font-bold">PP</div>
                    <div>
                      <h3 className="font-title-sm text-title-sm text-on-surface font-semibold flex items-center gap-1.5">
                        Pramanshu Prajapati
                        <span className="material-symbols-outlined text-primary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                      </h3>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">Lead UI/UX Designer • Orai</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container/40 text-primary font-label-sm text-label-sm font-semibold border border-primary/25">
                    <span className="material-symbols-outlined text-sm">bolt</span>
                    <span>ATS Score: 99%</span>
                  </div>
                </div>
                <div className="mt-4 p-3 rounded-lg bg-surface-container-high/70 border border-surface-variant/30">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium text-on-surface">Principal UX &amp; Product Designer</span>
                    <span className="font-caption text-caption text-on-surface-variant">2020 — Present</span>
                  </div>
                  <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant/90 line-clamp-1">Veloce Systems • Built scalable enterprise design systems.</p>
                </div>
                <div className="mt-4 space-y-2">
                  <div>
                    <div className="flex justify-between font-caption text-caption text-on-surface-variant mb-1">
                      <span>Design Systems &amp; Token Architecture</span>
                      <span className="text-tertiary font-semibold">99%</span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-variant rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-tertiary to-primary rounded-full" style={{ width: '99%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-caption text-caption text-on-surface-variant mb-1">
                      <span>Interaction Design &amp; UX Prototyping</span>
                      <span className="text-secondary font-semibold">97%</span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-variant rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: '97%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 right-4 sm:-right-4 px-3.5 py-2 rounded-xl bg-surface-bright/95 text-on-surface shadow-xl flex items-center gap-2.5 text-xs backdrop-blur-md border border-surface-variant/40">
                  <span className="flex h-5 w-5 rounded-full bg-tertiary-container items-center justify-center text-tertiary text-xs font-bold">⚡</span>
                  <div>
                    <p className="font-semibold text-[11px] text-tertiary">Portfolio Match Verified</p>
                    <p className="text-[10px] text-on-surface-variant">Keywords matched Figma rubric</p>
                  </div>
                </div>
                <div className="absolute -top-3.5 -left-3 sm:-left-5 px-3 py-1.5 rounded-lg bg-surface-container-highest/95 text-on-surface shadow-xl flex items-center gap-2 text-xs backdrop-blur-md border border-surface-variant/40">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="font-label-sm text-label-sm font-medium">Google Recruiter contacted Pramanshu</span>
                </div>
              </div>
              
              {/* CARD 3: Sophia Patel */}
              <div className={`card-stack-item ${getCardClass(2)} absolute top-0 left-0 w-[92%] sm:w-[88%] rounded-2xl bg-surface-container border border-surface-variant/40 p-5 sm:p-6 shadow-2xl cursor-pointer`} onClick={cycleDeck}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-tertiary flex items-center justify-center font-headline-md text-headline-md text-on-primary-fixed shadow-inner font-bold">SP</div>
                    <div>
                      <h3 className="font-title-sm text-title-sm text-on-surface font-semibold flex items-center gap-1.5">
                        Sophia Patel
                        <span className="material-symbols-outlined text-tertiary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                      </h3>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">Principal AI Product Manager • Bangalore</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-container/30 text-tertiary font-label-sm text-label-sm font-semibold border border-tertiary/20">
                    <span className="material-symbols-outlined text-sm">bolt</span>
                    <span>ATS Score: 96%</span>
                  </div>
                </div>
                <div className="mt-4 p-3 rounded-lg bg-surface-container-high/70 border border-surface-variant/30">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium text-on-surface">Director of Product, GenAI</span>
                    <span className="font-caption text-caption text-on-surface-variant">2022 — Present</span>
                  </div>
                  <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant/90 line-clamp-1">Nexus AI • Grew multi-modal workflow platform from 0 to $18M ARR.</p>
                </div>
                <div className="mt-4 space-y-2">
                  <div>
                    <div className="flex justify-between font-caption text-caption text-on-surface-variant mb-1">
                      <span>LLM Agents &amp; Fine-Tuning</span>
                      <span className="text-tertiary font-semibold">97%</span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-variant rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary via-secondary to-tertiary rounded-full" style={{ width: '97%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-caption text-caption text-on-surface-variant mb-1">
                      <span>Product Growth Strategy</span>
                      <span className="text-primary font-semibold">94%</span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-variant rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-secondary to-primary rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 right-4 sm:-right-4 px-3.5 py-2 rounded-xl bg-surface-bright/95 text-on-surface shadow-xl flex items-center gap-2.5 text-xs backdrop-blur-md border border-surface-variant/40">
                  <span className="flex h-5 w-5 rounded-full bg-secondary-container items-center justify-center text-secondary text-xs font-bold">★</span>
                  <div>
                    <p className="font-semibold text-[11px] text-secondary">OpenAI Interview Callback</p>
                    <p className="text-[10px] text-on-surface-variant">Role matched: Staff AI PM</p>
                  </div>
                </div>
                <div className="absolute -top-3.5 -left-3 sm:-left-5 px-3 py-1.5 rounded-lg bg-surface-container-highest/95 text-on-surface shadow-xl flex items-center gap-2 text-xs backdrop-blur-md border border-surface-variant/40">
                  <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                  <span className="font-label-sm text-label-sm font-medium">98% match for OpenAI &amp; Anthropic</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Social Credibility Banner */}
          <div className="relative z-10 pt-6 mt-4 border-t border-surface-variant/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                Trusted by <strong className="text-on-surface font-semibold">140,000+ candidates</strong> hired globally:
              </p>
              <div className="mt-2 flex items-center gap-4 text-on-surface-variant/70 font-semibold text-xs tracking-wider uppercase">
                <span className="hover:text-on-surface transition-colors">Google</span>
                <span className="">•</span>
                <span className="hover:text-on-surface transition-colors">Airbnb</span>
                <span className="">•</span>
                <span className="hover:text-on-surface transition-colors">Figma</span>
                <span className="">•</span>
                <span className="hover:text-on-surface transition-colors">Meta</span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high/80">
              <div className="flex text-tertiary">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
              </div>
              <span className="font-caption text-caption text-on-surface font-bold">4.9 / 5</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Elegant Authentication Form Deck */}
        <div className="relative w-full lg:w-[46%] bg-surface-container-low flex flex-col justify-center items-center p-6 sm:p-10 lg:p-16">
          
          {/* Subtle Ambient Backing */}
          <div className="absolute top-1/4 right-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 w-full max-w-md">
            
            {/* Mode Toggle Switcher Tabs */}
            <div className="mb-8 p-1 rounded-xl bg-surface-container flex items-center">
              <button 
                onClick={() => { setIsSignUp(false); setError(null); setMessage(null); }}
                className={`flex-1 py-2 text-center rounded-lg font-label-md text-label-md transition-all duration-200 ${!isSignUp ? 'font-semibold text-on-surface bg-surface-container-high shadow' : 'font-medium text-on-surface-variant hover:text-on-surface'}`}
              >
                Sign In
              </button>
              <button 
                onClick={() => { setIsSignUp(true); setError(null); setMessage(null); }}
                className={`flex-1 py-2 text-center rounded-lg font-label-md text-label-md transition-all duration-200 ${isSignUp ? 'font-semibold text-on-surface bg-surface-container-high shadow' : 'font-medium text-on-surface-variant hover:text-on-surface'}`}
              >
                Create Account
              </button>
            </div>
            
            {/* Auth Form Card */}
            <div className="rounded-2xl bg-surface-container p-6 sm:p-8 shadow-xl">
              
              {/* Form Header */}
              <div className="mb-6 text-left">
                <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                  {isSignUp ? "Create your account" : "Welcome back"}
                </h2>
                <p className="mt-1.5 font-body-md text-body-md text-on-surface-variant">
                  {isSignUp ? "Start building ATS-ready resumes in minutes with AI." : "Enter your credentials to continue building your career narrative."}
                </p>
              </div>
              
              {error && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-error-container/30 text-error rounded-xl text-sm flex items-start gap-3 border border-error-container/50">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <span>{error}</span>
                </motion.div>
              )}

              {message && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-primary-container/30 text-primary rounded-xl text-sm flex items-start gap-3 border border-primary-container/50">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <span>{message}</span>
                </motion.div>
              )}

              {/* Social SSO Button (Google) */}
              <button onClick={handleGoogleLogin} className="w-full py-2.5 px-4 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md font-medium flex items-center justify-center gap-3 transition-all duration-200 shadow-sm active:scale-[0.99] group mb-6">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" fill="#4285F4"></path>
                  <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" fill="#34A853"></path>
                  <path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z" fill="#FBBC05"></path>
                  <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335"></path>
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Divider */}
              <div className="relative my-6 flex items-center justify-center">
                <div className="w-full h-px bg-surface-variant"></div>
                <span className="absolute px-3 bg-surface-container font-caption text-caption text-on-surface-variant uppercase tracking-wider">
                  or continue with email
                </span>
              </div>

              {/* Dynamic Inputs Form */}
              <form className="space-y-4" onSubmit={isSignUp ? handleEmailSignup : handleEmailLogin}>
                
                <AnimatePresence>
                  {isSignUp && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-1.5 overflow-hidden"
                    >
                      <label className="block font-label-sm text-label-sm text-on-surface font-medium">Full Name</label>
                      <div className="relative rounded-lg bg-surface-container-lowest focus-within:bg-surface-container-high transition-colors">
                        <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-lg">person</span>
                        <input 
                          type="text" 
                          value={name}
                          onChange={e => setName(e.target.value)}
                          className="w-full bg-transparent pl-10 pr-4 py-2.5 rounded-lg text-on-surface font-body-md text-body-md placeholder-outline focus:outline-none focus:ring-0 border-none" 
                          placeholder="Elena Vance" 
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Email Input */}
                <div className="space-y-1.5">
                  <label className="block font-label-sm text-label-sm text-on-surface font-medium">Email Address</label>
                  <div className="relative rounded-lg bg-surface-container-lowest focus-within:bg-surface-container-high transition-colors">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-lg">mail</span>
                    <input 
                      type="email" 
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-transparent pl-10 pr-4 py-2.5 rounded-lg text-on-surface font-body-md text-body-md placeholder-outline focus:outline-none focus:ring-0 border-none" 
                      placeholder="name@company.com" 
                      required 
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block font-label-sm text-label-sm text-on-surface font-medium">Password</label>
                    {!isSignUp && (
                      <a href="#" className="font-label-sm text-label-sm text-primary hover:text-primary-fixed transition-colors">
                        Forgot password?
                      </a>
                    )}
                  </div>
                  <div className="relative rounded-lg bg-surface-container-lowest focus-within:bg-surface-container-high transition-colors">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-lg">lock</span>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full bg-transparent pl-10 pr-10 py-2.5 rounded-lg text-on-surface font-body-md text-body-md placeholder-outline focus:outline-none focus:ring-0 border-none" 
                      placeholder="••••••••••••" 
                      required 
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-on-surface-variant hover:text-on-surface transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">{showPassword ? 'visibility_off' : 'visibility'}</span>
                    </button>
                  </div>
                  {isSignUp && (
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1.5 flex-1">
                        <div className={`h-1 flex-1 rounded-full ${password.length > 0 ? 'bg-tertiary' : 'bg-surface-variant'}`}></div>
                        <div className={`h-1 flex-1 rounded-full ${password.length >= 6 ? 'bg-tertiary' : 'bg-surface-variant'}`}></div>
                        <div className={`h-1 flex-1 rounded-full ${password.length >= 8 ? 'bg-tertiary' : 'bg-surface-variant'}`}></div>
                      </div>
                      <span className="font-caption text-caption text-on-surface-variant ml-3">Must be at least 8 characters</span>
                    </div>
                  )}
                </div>

                {/* Checkbox */}
                {isSignUp && (
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 mt-0.5 rounded accent-primary-container bg-surface-container-lowest border-none" />
                      <span className="font-caption text-caption text-on-surface-variant leading-tight">
                        I agree to the <a href="#" className="underline text-on-surface hover:text-primary transition-colors">Terms of Service</a> and <a href="#" className="underline text-on-surface hover:text-primary transition-colors">Privacy Policy</a>
                      </span>
                    </label>
                  </div>
                )}

                {/* Primary Submit Button */}
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full mt-2 py-3 px-6 rounded-lg bg-primary-container hover:bg-primary-container/90 active:bg-secondary-container text-white font-label-md text-label-md font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary-container/30 transition-all duration-200 disabled:opacity-70 disabled:cursor-wait"
                >
                  {loading ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>{isSignUp ? "Create Account" : "Sign In to Draftline"}</span>
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </>
                  )}
                </button>
              </form>
              
              {/* Terms / Privacy Note */}
              <p className="mt-5 text-center font-caption text-caption text-on-surface-variant">
                By continuing, you agree to Draftline's
                <a href="#" className="underline hover:text-on-surface transition-colors ml-1">Terms of Service</a>
                {" "}and{" "}
                <a href="#" className="underline hover:text-on-surface transition-colors">Privacy Policy</a>.
              </p>
            </div>
            
            {/* Quick Switch footer prompt */}
            <div className="mt-6 text-center">
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                <span>{isSignUp ? "Already have an account?" : "Don't have an account?"}</span>
                <button 
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="ml-1 font-semibold text-primary hover:text-primary-fixed transition-colors" 
                  type="button"
                >
                  {isSignUp ? "Sign in" : "Create one free"}
                </button>
              </p>
            </div>
            
            {/* Trust Indicator Quote */}
            <div className="mt-8 p-4 rounded-xl bg-surface-container/60 text-center">
              <p className="font-body-sm text-body-sm text-on-surface-variant italic">
                "Draftline's AI suggestions boosted my interview callback rate from 3% to over 34% within two weeks."
              </p>
              <span className="block mt-1 font-caption text-caption text-primary font-medium">— Marcus Chen, Staff Engineer</span>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
