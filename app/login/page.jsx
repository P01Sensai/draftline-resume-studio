'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  
  // Auth state
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Deck state
  const totalCards = 3;
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [cyclingCardIndex, setCyclingCardIndex] = useState(null);
  const timerRef = useRef(null);
  const activeIdxRef = useRef(0);
  const isCyclingRef = useRef(false);

  useEffect(() => {
    activeIdxRef.current = activeCardIndex;
  }, [activeCardIndex]);

  useEffect(() => {
    startDeckAnimation();
    return () => pauseDeckAnimation();
  }, []);

  const getCardClass = (index) => {
    if (cyclingCardIndex === index) {
      return 'card-pos-cycling';
    }
    const relativeIndex = (index - activeCardIndex + totalCards) % totalCards;
    return `card-pos-${relativeIndex}`;
  };

  const cycleDeck = () => {
    if (isCyclingRef.current) return;
    isCyclingRef.current = true;
    
    setCyclingCardIndex(activeIdxRef.current);

    setTimeout(() => {
      setActiveCardIndex((prev) => (prev + 1) % totalCards);
      setTimeout(() => {
        setCyclingCardIndex(null);
        isCyclingRef.current = false;
      }, 450);
    }, 220);
  };

  const goToSlide = (targetIdx) => {
    if (isCyclingRef.current || targetIdx === activeIdxRef.current) return;
    isCyclingRef.current = true;
    
    setCyclingCardIndex(activeIdxRef.current);
    setTimeout(() => {
      setActiveCardIndex(targetIdx);
      setTimeout(() => {
        setCyclingCardIndex(null);
        isCyclingRef.current = false;
      }, 450);
    }, 220);
  };

  const startDeckAnimation = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        cycleDeck();
      }, 1500);
    }
  };

  const pauseDeckAnimation = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            }
          }
        });
        if (error) throw error;
        if (data.user) {
          router.push('/');
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        if (data.session) {
          router.push('/');
        }
      }
    } catch (err) {
      setError(err.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });
      if (error) throw error;
    } catch (err) {
      setError(err.message || 'An error occurred during Google authentication');
    }
  };

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-[#f8f9ff] via-[#f0f4ff] to-[#e6efff] dark:from-[#0a0b14] dark:via-[#0e0f1a] dark:to-[#131422] flex flex-col justify-center relative overflow-hidden transition-colors duration-500">
      {/* Global Radial Glows & Grid Mesh Backdrop */}
      <div className="absolute -top-28 -left-28 w-96 h-96 rounded-full bg-blue-400/15 dark:bg-blue-600/10 blur-3xl pointer-events-none transition-colors duration-500"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-indigo-400/15 dark:bg-indigo-600/10 blur-3xl pointer-events-none transition-colors duration-500"></div>
      <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-blue-200/30 dark:bg-blue-900/20 blur-3xl pointer-events-none transition-colors duration-500"></div>
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] dark:bg-[radial-gradient(#60a5fa_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.07] dark:opacity-[0.04] pointer-events-none transition-opacity duration-500"></div>

      <div className="w-full max-w-[1360px] mx-auto min-h-screen flex flex-col lg:flex-row items-stretch justify-center relative z-10">
        
        {/* LEFT COLUMN: Visual Branding & Interactive Resume Showcase */}
        <div className="relative w-full lg:w-[54%] xl:w-[55%] flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-14">
          
          {/* Top Brand Bar */}
          <div className="relative z-10 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 drop-shadow-sm">
                <defs>
                  <linearGradient id="bg-grad-login" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#EFF6FF"/>
                    <stop offset="50%" stopColor="#EEF2FF"/>
                    <stop offset="100%" stopColor="#E0E7FF"/>
                  </linearGradient>
                  <linearGradient id="stroke-grad-login" x1="8" y1="10" x2="32" y2="30" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#4F46E5"/>
                    <stop offset="60%" stopColor="#6366F1"/>
                    <stop offset="100%" stopColor="#38BDF8"/>
                  </linearGradient>
                  <linearGradient id="accent-grad-login" x1="16" y1="28" x2="30" y2="28" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#38BDF8"/>
                    <stop offset="100%" stopColor="#818CF8"/>
                  </linearGradient>
                  <filter id="soft-glow-login" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
                    <feGaussianBlur stdDeviation="1.2" result="blur"/>
                    <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                  </filter>
                  <linearGradient id="inner-glow-border-login" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9"/>
                      <stop offset="100%" stopColor="#C7D2FE" stopOpacity="0.4"/>
                    </linearGradient>
                  </defs>
                  <rect width="40" height="40" rx="12" fill="url(#bg-grad-login)"/>
                  <rect x="0.5" y="0.5" width="39" height="39" rx="11.5" stroke="url(#inner-glow-border-login)" strokeWidth="1"/>
                <g filter="url(#soft-glow-login)" opacity="0.15">
                  <path d="M12 14C12 13.4477 12.4477 13 13 13H23C26.866 13 30 16.134 30 20C30 23.866 26.866 27 23 27H16" stroke="#4F46E5" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 13V28" stroke="#4F46E5" strokeWidth="3.2" strokeLinecap="round"/>
                </g>
                <path d="M12 14C12 13.4477 12.4477 13 13 13H23C26.866 13 30 16.134 30 20C30 23.866 26.866 27 23 27H16" stroke="url(#stroke-grad-login)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 13V28" stroke="url(#stroke-grad-login)" strokeWidth="3" strokeLinecap="round"/>
                <path d="M12.5 20H21C21.8284 20 22.5 19.3284 22.5 18.5C22.5 17.6716 21.8284 17 21 17H12.5" stroke="url(#stroke-grad-login)" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
                <rect x="17" y="27" width="12" height="3" rx="1.5" fill="url(#accent-grad-login)"/>
              </svg>
              <div className="flex flex-col">
                <span className="font-headline-lg text-headline-lg tracking-tight text-slate-900 dark:text-white font-bold flex items-center gap-2 transition-colors">
                  Draftline
                  <span className="font-caption text-caption px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 uppercase font-semibold tracking-wider border border-blue-200 dark:border-blue-800/60 transition-colors">AI Resume Studio</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Central Hero Showcase & Mockup Stacks */}
          <div className="relative z-10 my-8 lg:my-auto flex flex-col gap-6">
            <div className="max-w-xl">
              <h1 className="font-display-lg text-display-lg-mobile lg:text-display-lg text-slate-900 dark:text-white font-bold tracking-tight leading-tight transition-colors">
                Craft your perfect resume.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 dark:from-blue-400 dark:via-indigo-400 dark:to-sky-400">
                  Land your dream job.
                </span>
              </h1>
              <p className="mt-4 font-body-lg text-body-lg text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed transition-colors">
                Create ATS-optimized, designer-grade resumes in minutes powered by intelligent contextual AI suggestions and real-time layout formatting.
              </p>
            </div>

            {/* Fluid Animated Resume Stack Deck */}
            <div 
              className="relative mt-8 lg:mt-2 h-[280px] sm:h-[320px] lg:h-[375px] w-[120%] -ml-[10%] sm:w-full sm:ml-0 max-w-lg mx-auto lg:mx-0 perspective-container group/deck transform scale-[0.75] sm:scale-90 lg:scale-100 origin-top"
              onMouseEnter={pauseDeckAnimation}
              onMouseLeave={startDeckAnimation}
            >
              {/* Smooth Animated Pagination Indicators */}
              <div className="absolute -top-7 left-1 z-40 flex items-center gap-2">
                {[0, 1, 2].map((idx) => (
                  <button 
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-500 ease-out ${activeCardIndex === idx ? 'bg-blue-600 dark:bg-blue-500 w-6' : 'bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600 w-2'}`}
                  ></button>
                ))}
              </div>

              {/* CARD 1: Pramanshu Prajapati */}
              <div onClick={cycleDeck} className={`card-stack-item ${getCardClass(0)} absolute top-0 left-0 w-[92%] sm:w-[88%] rounded-2xl bg-white dark:bg-[#151621] border border-slate-200/90 dark:border-slate-800/90 p-5 sm:p-6 cursor-pointer hover:border-blue-300 dark:hover:border-blue-500/50 transition-all`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center font-headline-md text-headline-md text-white shadow-md font-bold">
                      PP
                    </div>
                    <div>
                      <h3 className="font-title-sm text-title-sm text-slate-900 dark:text-white font-semibold flex items-center gap-1.5 transition-colors">
                        Pramanshu Prajapati
                        <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-base" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
                      </h3>
                      <p className="font-label-sm text-label-sm text-slate-500 dark:text-slate-400 transition-colors">Lead UI/UX Designer • Orai</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-label-sm text-label-sm font-semibold border border-blue-200 dark:border-blue-800/50 transition-colors">
                    <span className="material-symbols-outlined text-sm">bolt</span>
                    <span>ATS Score: 99%</span>
                  </div>
                </div>
                <div className="mt-4 p-3 rounded-lg bg-slate-50 dark:bg-[#1a1c29] border border-slate-200/80 dark:border-slate-800/80 transition-colors">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-900 dark:text-slate-200 transition-colors">Principal UX & Product Designer</span>
                    <span className="font-caption text-caption text-slate-500 dark:text-slate-400 font-medium transition-colors">2020 — Present</span>
                  </div>
                  <p className="mt-1 font-body-sm text-body-sm text-slate-600 dark:text-slate-400 line-clamp-1 transition-colors">
                    Veloce Systems • Built scalable enterprise design systems & frictionless multi-platform design interactions.
                  </p>
                </div>
                <div className="mt-4 space-y-2">
                  <div>
                    <div className="flex justify-between font-caption text-caption text-slate-600 dark:text-slate-400 mb-1 transition-colors">
                      <span className="font-medium">Design Systems & Token Architecture</span>
                      <span className="text-blue-600 dark:text-blue-400 font-semibold transition-colors">99%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden transition-colors">
                      <div className="h-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-full" style={{width: '99%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-caption text-caption text-slate-600 dark:text-slate-400 mb-1 transition-colors">
                      <span className="font-medium">Interaction Design & UX Prototyping</span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-semibold transition-colors">97%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden transition-colors">
                      <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" style={{width: '97%'}}></div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 right-4 sm:-right-4 px-3.5 py-2 rounded-xl bg-white dark:bg-[#1a1c29] text-slate-800 dark:text-slate-200 shadow-xl flex items-center gap-2.5 text-xs border border-slate-200 dark:border-slate-700/80 transition-colors">
                  <span className="flex h-5 w-5 rounded-full bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700/50 items-center justify-center text-amber-600 dark:text-amber-400 text-xs font-bold transition-colors">⚡</span>
                  <div>
                    <p className="font-semibold text-[11px] text-amber-700 dark:text-amber-400 transition-colors">Portfolio Match Verified</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 transition-colors">Keywords matched design rubric</p>
                  </div>
                </div>
                <div className="absolute -top-3.5 -left-3 sm:-left-5 px-3 py-1.5 rounded-lg bg-white dark:bg-[#1a1c29] text-slate-800 dark:text-slate-200 shadow-xl flex items-center gap-2 text-xs border border-slate-200 dark:border-slate-700/80 transition-colors">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 transition-colors"></span>
                  <span className="font-label-sm text-label-sm font-medium text-slate-700 dark:text-slate-300 transition-colors">Google Recruiter contacted Pramanshu</span>
                </div>
              </div>

              {/* CARD 2: Aditya Bhardwaj */}
              <div onClick={cycleDeck} className={`card-stack-item ${getCardClass(1)} absolute top-0 left-0 w-[92%] sm:w-[88%] rounded-2xl bg-white dark:bg-[#151621] border border-slate-200/90 dark:border-slate-800/90 p-5 sm:p-6 cursor-pointer hover:border-blue-300 dark:hover:border-blue-500/50 transition-all`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-headline-md text-headline-md text-white shadow-md font-bold">
                      AB
                    </div>
                    <div>
                      <h3 className="font-title-sm text-title-sm text-slate-900 dark:text-white font-semibold flex items-center gap-1.5 transition-colors">
                        Aditya Bhardwaj
                        <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-base" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
                      </h3>
                      <p className="font-label-sm text-label-sm text-slate-500 dark:text-slate-400 transition-colors">Senior Full-Stack Engineer • Gurgaon</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-label-sm text-label-sm font-semibold border border-emerald-200 dark:border-emerald-800/50 transition-colors">
                    <span className="material-symbols-outlined text-sm">bolt</span>
                    <span>ATS Score: 98%</span>
                  </div>
                </div>
                <div className="mt-4 p-3 rounded-lg bg-slate-50 dark:bg-[#1a1c29] border border-slate-200/80 dark:border-slate-800/80 transition-colors">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-900 dark:text-slate-200 transition-colors">Staff Full-Stack & Core Systems</span>
                    <span className="font-caption text-caption text-slate-500 dark:text-slate-400 font-medium transition-colors">2021 — Present</span>
                  </div>
                  <p className="mt-1 font-body-sm text-body-sm text-slate-600 dark:text-slate-400 line-clamp-1 transition-colors">
                    Synthetix Core • Engineered high-throughput distributed microservices & real-time web applications.
                  </p>
                </div>
                <div className="mt-4 space-y-2">
                  <div>
                    <div className="flex justify-between font-caption text-caption text-slate-600 dark:text-slate-400 mb-1 transition-colors">
                      <span className="font-medium">Full-Stack Architecture & TypeScript</span>
                      <span className="text-blue-600 dark:text-blue-400 font-semibold transition-colors">98%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden transition-colors">
                      <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" style={{width: '98%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-caption text-caption text-slate-600 dark:text-slate-400 mb-1 transition-colors">
                      <span className="font-medium">Distributed Systems & Backend Pipelines</span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-semibold transition-colors">95%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden transition-colors">
                      <div className="h-full bg-gradient-to-r from-indigo-500 to-sky-500 rounded-full" style={{width: '95%'}}></div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 right-4 sm:-right-4 px-3.5 py-2 rounded-xl bg-white dark:bg-[#1a1c29] text-slate-800 dark:text-slate-200 shadow-xl flex items-center gap-2.5 text-xs border border-slate-200 dark:border-slate-700/80 transition-colors">
                  <span className="flex h-5 w-5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700/50 items-center justify-center text-blue-600 dark:text-blue-400 text-xs font-bold transition-colors">✦</span>
                  <div>
                    <p className="font-semibold text-[11px] text-blue-700 dark:text-blue-400 transition-colors">AI Action Verb Applied</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 transition-colors">+16% readability boost</p>
                  </div>
                </div>
                <div className="absolute -top-3.5 -left-3 sm:-left-5 px-3 py-1.5 rounded-lg bg-white dark:bg-[#1a1c29] text-slate-800 dark:text-slate-200 shadow-xl flex items-center gap-2 text-xs border border-slate-200 dark:border-slate-700/80 transition-colors">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 transition-colors"></span>
                  <span className="font-label-sm text-label-sm font-medium text-slate-700 dark:text-slate-300 transition-colors">Stripe invited Aditya to interview</span>
                </div>
              </div>

              {/* CARD 3: Sophia Patel */}
              <div onClick={cycleDeck} className={`card-stack-item ${getCardClass(2)} absolute top-0 left-0 w-[92%] sm:w-[88%] rounded-2xl bg-white dark:bg-[#151621] border border-slate-200/90 dark:border-slate-800/90 p-5 sm:p-6 cursor-pointer hover:border-blue-300 dark:hover:border-blue-500/50 transition-all`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-headline-md text-headline-md text-white shadow-md font-bold">
                      SP
                    </div>
                    <div>
                      <h3 className="font-title-sm text-title-sm text-slate-900 dark:text-white font-semibold flex items-center gap-1.5 transition-colors">
                        Sophia Patel
                        <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-base" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
                      </h3>
                      <p className="font-label-sm text-label-sm text-slate-500 dark:text-slate-400 transition-colors">Principal Product Manager • Bangalore</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-label-sm text-label-sm font-semibold border border-emerald-200 dark:border-emerald-800/50 transition-colors">
                    <span className="material-symbols-outlined text-sm">bolt</span>
                    <span>ATS Score: 96%</span>
                  </div>
                </div>
                <div className="mt-4 p-3 rounded-lg bg-slate-50 dark:bg-[#1a1c29] border border-slate-200/80 dark:border-slate-800/80 transition-colors">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-900 dark:text-slate-200 transition-colors">Director of Product & AI Systems</span>
                    <span className="font-caption text-caption text-slate-500 dark:text-slate-400 font-medium transition-colors">2022 — Present</span>
                  </div>
                  <p className="mt-1 font-body-sm text-body-sm text-slate-600 dark:text-slate-400 line-clamp-1 transition-colors">
                    Nexus Platforms • Scaled high-impact multi-modal workflow platform from $0 to $18M ARR in 14 months.
                  </p>
                </div>
                <div className="mt-4 space-y-2">
                  <div>
                    <div className="flex justify-between font-caption text-caption text-slate-600 dark:text-slate-400 mb-1 transition-colors">
                      <span className="font-medium">AI Product Strategy & Systems Architecture</span>
                      <span className="text-blue-600 dark:text-blue-400 font-semibold transition-colors">97%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden transition-colors">
                      <div className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full" style={{width: '97%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-caption text-caption text-slate-600 dark:text-slate-400 mb-1 transition-colors">
                      <span className="font-medium">Product Growth & Lifecycle Strategy</span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-semibold transition-colors">94%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden transition-colors">
                      <div className="h-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-full" style={{width: '94%'}}></div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 right-4 sm:-right-4 px-3.5 py-2 rounded-xl bg-white dark:bg-[#1a1c29] text-slate-800 dark:text-slate-200 shadow-xl flex items-center gap-2.5 text-xs border border-slate-200 dark:border-slate-700/80 transition-colors">
                  <span className="flex h-5 w-5 rounded-full bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800/50 items-center justify-center text-purple-600 dark:text-purple-400 text-xs font-bold transition-colors">★</span>
                  <div>
                    <p className="font-semibold text-[11px] text-purple-700 dark:text-purple-400 transition-colors">Enterprise Interview Callback</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 transition-colors">Role matched: Staff Product Lead</p>
                  </div>
                </div>
                <div className="absolute -top-3.5 -left-3 sm:-left-5 px-3 py-1.5 rounded-lg bg-white dark:bg-[#1a1c29] text-slate-800 dark:text-slate-200 shadow-xl flex items-center gap-2 text-xs border border-slate-200 dark:border-slate-700/80 transition-colors">
                  <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-500 transition-colors"></span>
                  <span className="font-label-sm text-label-sm font-medium text-slate-700 dark:text-slate-300 transition-colors">98% match for Tier-1 Tech Companies</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Elegant Authentication Form Deck */}
        <div className="relative w-full lg:w-[46%] xl:w-[45%] flex flex-col justify-center items-center p-6 sm:p-10 lg:p-12 xl:p-14">
          
          <div className="relative z-10 w-full max-w-[440px]">
            {/* Mode Toggle Switcher Tabs */}
            <div className="mb-6 p-1 rounded-xl bg-slate-200/70 dark:bg-slate-800/80 border border-slate-300/60 dark:border-slate-700/60 flex items-center transition-colors">
              <button 
                onClick={() => setIsSignUp(false)}
                type="button"
                className={`flex-1 py-2 text-center rounded-lg font-label-md text-label-md transition-all duration-200 ${!isSignUp ? 'font-semibold text-slate-900 dark:text-white bg-white dark:bg-[#1a1c29] shadow-sm border border-slate-200/60 dark:border-slate-700/60' : 'font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                Log In
              </button>
              <button 
                onClick={() => setIsSignUp(true)}
                type="button"
                className={`flex-1 py-2 text-center rounded-lg font-label-md text-label-md transition-all duration-200 ${isSignUp ? 'font-semibold text-slate-900 dark:text-white bg-white dark:bg-[#1a1c29] shadow-sm border border-slate-200/60 dark:border-slate-700/60' : 'font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                Sign Up
              </button>
            </div>

            {/* Auth Form Card */}
            <div className="rounded-2xl bg-white dark:bg-[#151621] border border-slate-200/90 dark:border-slate-800/90 p-6 sm:p-8 shadow-xl min-h-[580px] transition-colors">
              <div className="mb-6 text-left">
                <h2 className="font-headline-lg text-headline-lg text-slate-900 dark:text-white font-bold tracking-tight transition-colors">
                  {isSignUp ? "Create your account" : "Welcome back"}
                </h2>
                <p className="mt-1.5 font-body-md text-body-md text-slate-500 dark:text-slate-400 transition-colors">
                  {isSignUp ? "Start building ATS-ready resumes in minutes with AI." : "Enter your credentials to continue building your career narrative."}
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 rounded-lg text-sm flex items-start gap-2 transition-colors">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  <p>{error}</p>
                </div>
              )}

              {/* Social SSO Button */}
              <button 
                onClick={handleGoogleLogin}
                type="button" 
                className="w-full py-2.5 px-4 rounded-lg bg-white dark:bg-[#1a1c29] hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-label-md text-label-md font-medium flex items-center justify-center gap-3 transition-all duration-200 shadow-sm active:scale-[0.99] group"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" fill="#4285F4"></path>
                  <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" fill="#34A853"></path>
                  <path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z" fill="#FBBC05"></path>
                  <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335"></path>
                </svg>
                <span className="font-medium">Continue with Google</span>
              </button>

              <div className="relative my-5 flex items-center justify-center">
                <div className="w-full h-px bg-slate-200 dark:bg-slate-800 transition-colors"></div>
                <span className="absolute px-3 bg-white dark:bg-[#151621] font-caption text-caption text-slate-500 dark:text-slate-400 uppercase tracking-wider transition-colors">
                  or continue with email
                </span>
              </div>

              <form onSubmit={handleEmailAuth} className="space-y-4">
                {/* Full Name */}
                <div className={`space-y-1.5 transition-all duration-300 ease-in-out overflow-hidden ${isSignUp ? 'max-h-[100px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <label className="block font-label-sm text-label-sm text-slate-700 dark:text-slate-300 font-medium transition-colors">Full Name</label>
                  <div className="relative rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0a0b14] focus-within:border-blue-600 dark:focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-blue-900/50 transition-all">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 dark:text-slate-500 text-lg transition-colors">person</span>
                    <input 
                      type="text" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required={isSignUp}
                      className="w-full bg-transparent pl-10 pr-4 py-2.5 rounded-lg text-slate-900 dark:text-white font-body-md text-body-md placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none transition-colors" 
                      placeholder="Pramanshu Prajapati" 
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="block font-label-sm text-label-sm text-slate-700 dark:text-slate-300 font-medium transition-colors">Email Address</label>
                  <div className="relative rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0a0b14] focus-within:border-blue-600 dark:focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-blue-900/50 transition-all">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 dark:text-slate-500 text-lg transition-colors">mail</span>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-transparent pl-10 pr-4 py-2.5 rounded-lg text-slate-900 dark:text-white font-body-md text-body-md placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none transition-colors" 
                      placeholder="name@company.com" 
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block font-label-sm text-label-sm text-slate-700 dark:text-slate-300 font-medium transition-colors">Password</label>
                    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${!isSignUp ? 'max-h-[30px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      <a href="#" className="font-label-sm text-label-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors">
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="relative rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0a0b14] focus-within:border-blue-600 dark:focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-blue-900/50 transition-all">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 dark:text-slate-500 text-lg transition-colors">lock</span>
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full bg-transparent pl-10 pr-10 py-2.5 rounded-lg text-slate-900 dark:text-white font-body-md text-body-md placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none transition-colors" 
                      placeholder="••••••••••••" 
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">{showPassword ? 'visibility_off' : 'visibility'}</span>
                    </button>
                  </div>
                  <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isSignUp ? 'max-h-[30px] opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 flex-1">
                        <div className={`h-1.5 flex-1 rounded-full ${password.length > 0 ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
                        <div className={`h-1.5 flex-1 rounded-full ${password.length >= 6 ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
                        <div className={`h-1.5 flex-1 rounded-full ${password.length >= 8 ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
                      </div>
                      <span className="font-caption text-caption text-slate-500 ml-3">Must be at least 8 characters</span>
                    </div>
                  </div>
                </div>

                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isSignUp ? 'max-h-[50px] opacity-100 mt-1' : 'max-h-0 opacity-0 mt-0'}`}>
                  <div className="flex items-center justify-between">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input type="checkbox" required={isSignUp} className="w-4 h-4 mt-0.5 rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-blue-600 focus:ring-blue-500 cursor-pointer transition-colors"/>
                      <span className="font-caption text-caption text-slate-600 dark:text-slate-400 leading-tight transition-colors">
                        I agree to the <a href="#" className="underline text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Terms of Service</a> and <a href="#" className="underline text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Privacy Policy</a>
                      </span>
                    </label>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full mt-2 py-3 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-label-md text-label-md font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 transition-all duration-200 disabled:opacity-70"
                >
                  <span>{loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Log In to Draftline'}</span>
                  {!loading && <span className="material-symbols-outlined text-base">arrow_forward</span>}
                </button>
              </form>

              <p className="mt-4 text-center font-caption text-caption text-slate-500 dark:text-slate-400 transition-colors">
                By continuing, you agree to Draftline's <a href="#" className="underline hover:text-slate-800 dark:hover:text-slate-200 transition-colors">Terms of Service</a> and <a href="#" className="underline hover:text-slate-800 dark:hover:text-slate-200 transition-colors">Privacy Policy</a>.
              </p>
            </div>

            {/* Quick Switch */}
            <div className="mt-5 text-center">
              <p className="font-body-sm text-body-sm text-slate-600 dark:text-slate-400 transition-colors">
                <span>{isSignUp ? "Already have an account?" : "Don't have an account?"}</span>
                <button 
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="ml-1 font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline transition-colors"
                >
                  {isSignUp ? "Log In" : "Sign Up for free"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
