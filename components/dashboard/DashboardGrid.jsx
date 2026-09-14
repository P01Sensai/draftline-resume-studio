"use client";

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Plus, Target, Sparkles, TrendingUp, Moon, Sun } from 'lucide-react';
import BentoCard from './BentoCard';
import { useResumeStore } from '@/store/useResumeStore';

// Adapted cursor tracking for a subtle spotlight effect
function useMousePct(ref) {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };
  return [pos, onMove];
}

export default function DashboardGrid() {
  const router = useRouter();
  const resumes = useResumeStore((state) => state.resumes);
  const setActiveResume = useResumeStore((state) => state.setActiveResume);
  const createResume = useResumeStore((state) => state.createResume);
  const createBlankResume = useResumeStore((state) => state.createBlankResume);
  const deleteResume = useResumeStore((state) => state.deleteResume);
  const theme = useResumeStore((state) => state.theme);
  const toggleTheme = useResumeStore((state) => state.toggleTheme);

  const containerRef = useRef(null);
  const [pos, onMove] = useMousePct(containerRef);

  const handleCreateBlank = () => {
    createBlankResume();
    router.push('/builder');
  };

  const handleCreateExample = () => {
    createResume();
    router.push('/builder');
  };

  const handleOpenResume = (id) => {
    setActiveResume(id);
    router.push('/builder');
  };

  return (
    <div 
      ref={containerRef} 
      onMouseMove={onMove} 
      className="relative min-h-screen bg-[#f8f9fc] dark:bg-[#0a0b14] text-gray-900 dark:text-gray-100 font-body p-8 md:p-12 lg:p-16 overflow-hidden transition-colors"
    >
      {/* Animated Subtle Aurora Blobs for Clean Slate Theme */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }} aria-hidden="true">
        <div className="blob absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] rounded-full bg-blue-200 dark:bg-[#203a70] opacity-50 dark:opacity-40 blur-[100px]" />
        <div className="blob absolute top-[20%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-blue-300 dark:bg-[#1a4a6b] opacity-60 dark:opacity-30 blur-[120px]" style={{ animationDelay: "-6s" }} />
        <div className="blob absolute bottom-[-20%] left-[25%] w-[55vw] h-[55vw] rounded-full bg-purple-200 dark:bg-[#381a4a] opacity-40 dark:opacity-30 blur-[140px]" style={{ animationDelay: "-11s" }} />
      </div>

      {/* Subtle Cursor Spotlight */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `radial-gradient(400px circle at ${pos.x}% ${pos.y}%, ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.6)'}, transparent 80%)`,
          zIndex: 0
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">My Workspace</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage your resumes and cover letters.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-white dark:bg-[#1a1b26] text-gray-700 dark:text-gray-300 shadow-sm border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => router.push('/login')}
              className="bg-white dark:bg-[#1a1b26] border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 px-5 py-2.5 rounded-full font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition shadow-sm"
            >
              Sign In
            </button>
            <button
              onClick={handleCreateBlank}
              onMouseEnter={() => router.prefetch('/builder')}
              className="bg-white dark:bg-[#1a1b26] border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 px-5 py-2.5 rounded-full font-medium flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition shadow-sm"
            >
              <Plus size={18} />
              Blank Canvas
            </button>
            <button
              onClick={handleCreateExample}
              onMouseEnter={() => router.prefetch('/builder')}
              className="bg-[#0066FF] text-white px-5 py-2.5 rounded-full font-medium flex items-center gap-2 hover:bg-blue-700 transition shadow-sm"
            >
              <Sparkles size={18} />
              Example Data
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(180px,_auto)]">
          
          {/* Main Resumes List - takes up 8 columns */}
          <BentoCard className="md:col-span-8 md:row-span-2 flex flex-col bg-white/80 dark:bg-[#1a1b26]/80 backdrop-blur-sm border-gray-100 dark:border-gray-800/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FileText size={20} className="text-[#0066FF]" />
                Recent Resumes
              </h2>
            </div>
            
            {resumes.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400 dark:text-gray-500 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl p-8 bg-white/50 dark:bg-transparent">
                <FileText size={48} className="mb-3 opacity-20" />
                <p>No resumes yet. Create one to get started.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 content-start">
                {resumes.map(resume => (
                  <div 
                    key={resume.id} 
                    className="group relative border border-gray-200 dark:border-gray-800/80 rounded-2xl p-4 hover:border-[#0066FF] dark:hover:border-[#0066FF] transition cursor-pointer bg-white dark:bg-[#1a1b26] shadow-sm hover:shadow-md" 
                    onClick={() => handleOpenResume(resume.id)}
                    onMouseEnter={() => router.prefetch('/builder')}
                  >
                    <div className="aspect-[1/1.4] w-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg mb-4 p-2 overflow-hidden flex flex-col text-[4px] relative">
                       <div className="absolute inset-0 bg-gradient-to-t from-white/80 dark:from-[#1a1b26]/90 to-transparent z-10"></div>
                       <div className="font-bold mb-1 text-black dark:text-gray-300">{resume.personal.name || "Name"}</div>
                       <div className="h-[1px] bg-gray-200 dark:bg-gray-700 mb-2 w-full"></div>
                       <div className="h-1 bg-gray-200 dark:bg-gray-700 w-full mb-1"></div>
                       <div className="h-1 bg-gray-200 dark:bg-gray-700 w-3/4 mb-1"></div>
                       <div className="h-1 bg-gray-200 dark:bg-gray-700 w-5/6 mb-1"></div>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-sm truncate w-32 text-gray-900 dark:text-gray-100">{resume.title || 'Untitled'}</h3>
                        <p className="text-xs text-gray-400 mt-1">Edited {new Date(resume.updatedAt).toLocaleDateString()}</p>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); deleteResume(resume.id); }}
                        className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition p-1 bg-red-50 dark:bg-red-500/10 rounded-md"
                        title="Delete resume"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </BentoCard>

          {/* Profile Completeness - 4 columns */}
          <BentoCard className="md:col-span-4 bg-gradient-to-br from-[#f8faff] dark:from-[#0f1b3b] to-white dark:to-[#1a1b26] border-blue-100/50 dark:border-blue-900/30 flex flex-col justify-center items-center text-center shadow-[0_4px_20px_rgba(0,102,255,0.05)]">
             <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/30 shadow-sm flex items-center justify-center mb-4 text-[#0066FF] dark:text-blue-400 border border-blue-100 dark:border-blue-800">
               <Target size={28} />
             </div>
             <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">Profile Health</h3>
             <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 px-4">Complete your master profile to generate tailored resumes faster.</p>
             <div className="w-full max-w-[200px] bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 mb-2 overflow-hidden shadow-inner">
                <div className="bg-[#0066FF] h-full rounded-full transition-all duration-1000 ease-out" style={{ width: '60%' }}></div>
             </div>
             <span className="text-xs font-semibold text-[#0066FF] dark:text-blue-400 tracking-wide uppercase">60% Complete</span>
          </BentoCard>

          {/* Career Tips - 4 columns */}
          <BentoCard className="md:col-span-4 flex flex-col bg-white/80 dark:bg-[#1a1b26]/80 backdrop-blur-sm border-gray-100 dark:border-gray-800/50">
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <Sparkles size={18} className="text-yellow-500" />
              Pro Tips
            </h3>
            <div className="bg-gradient-to-br from-yellow-50 dark:from-yellow-900/20 to-orange-50/30 dark:to-orange-900/10 rounded-2xl p-5 flex-1 border border-yellow-100/50 dark:border-yellow-900/30 shadow-sm">
               <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                 Tailor your resume for each job application by matching keywords from the job description. Draftline's AI matcher is coming soon!
               </p>
            </div>
          </BentoCard>
          
          {/* Stats - 4 columns, can be hidden on smaller screens or span differently */}
          <BentoCard className="md:col-span-8 lg:col-span-4 flex flex-col justify-center bg-white/80 dark:bg-[#1a1b26]/80 backdrop-blur-sm border-gray-100 dark:border-gray-800/50">
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <TrendingUp size={18} className="text-green-500" />
              Activity
            </h3>
            <div className="flex items-end justify-center gap-6 h-full pb-2">
               <div className="flex flex-col items-center gap-2 group">
                 <div className="h-16 w-8 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-900/50 rounded-t-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-800/50 transition-colors"></div>
                 <span className="text-xs text-gray-400 font-medium">Mon</span>
               </div>
               <div className="flex flex-col items-center gap-2 group">
                 <div className="h-24 w-8 bg-[#0066FF] rounded-t-lg shadow-[0_-2px_10px_rgba(0,102,255,0.2)]"></div>
                 <span className="text-xs font-bold text-gray-900 dark:text-gray-100">Tue</span>
               </div>
               <div className="flex flex-col items-center gap-2 group">
                 <div className="h-12 w-8 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-900/50 rounded-t-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-800/50 transition-colors"></div>
                 <span className="text-xs text-gray-400 font-medium">Wed</span>
               </div>
               <div className="flex flex-col items-center gap-2 group">
                 <div className="h-20 w-8 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-900/50 rounded-t-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-800/50 transition-colors"></div>
                 <span className="text-xs text-gray-400 font-medium">Thu</span>
               </div>
            </div>
          </BentoCard>

        </div>
      </div>
    </div>
  );
}
