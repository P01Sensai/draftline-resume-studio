"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Plus, Target, Sparkles, TrendingUp } from 'lucide-react';
import BentoCard from './BentoCard';
import { useResumeStore } from '@/store/useResumeStore';

export default function DashboardGrid() {
  const router = useRouter();
  const resumes = useResumeStore((state) => state.resumes);
  const setActiveResume = useResumeStore((state) => state.setActiveResume);
  const createResume = useResumeStore((state) => state.createResume);
  const deleteResume = useResumeStore((state) => state.deleteResume);

  const handleCreateNew = () => {
    createResume();
    router.push('/builder');
  };

  const handleOpenResume = (id) => {
    setActiveResume(id);
    router.push('/builder');
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-gray-900 font-body p-8 md:p-12 lg:p-16">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">My Workspace</h1>
            <p className="text-gray-500">Manage your resumes and cover letters.</p>
          </div>
          <button
            onClick={handleCreateNew}
            className="bg-[#0066FF] text-white px-5 py-2.5 rounded-full font-medium flex items-center gap-2 hover:bg-blue-700 transition shadow-sm"
          >
            <Plus size={18} />
            Create new
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(180px,_auto)]">
          
          {/* Main Resumes List - takes up 8 columns */}
          <BentoCard className="md:col-span-8 md:row-span-2 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FileText size={20} className="text-[#0066FF]" />
                Recent Resumes
              </h2>
            </div>
            
            {resumes.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400 border-2 border-dashed border-gray-100 rounded-xl p-8">
                <FileText size={48} className="mb-3 opacity-20" />
                <p>No resumes yet. Create one to get started.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 content-start">
                {resumes.map(resume => (
                  <div key={resume.id} className="group relative border border-gray-200 rounded-2xl p-4 hover:border-[#0066FF] transition cursor-pointer bg-gray-50/50 hover:bg-white" onClick={() => handleOpenResume(resume.id)}>
                    <div className="aspect-[1/1.4] w-full bg-white border border-gray-100 shadow-sm rounded-lg mb-4 p-2 overflow-hidden flex flex-col text-[4px]">
                       <div className="font-bold mb-1">{resume.personal.name || "Name"}</div>
                       <div className="h-[1px] bg-gray-200 mb-2 w-full"></div>
                       <div className="h-1 bg-gray-100 w-full mb-1"></div>
                       <div className="h-1 bg-gray-100 w-3/4 mb-1"></div>
                       <div className="h-1 bg-gray-100 w-5/6 mb-1"></div>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-sm truncate w-32">{resume.title || 'Untitled'}</h3>
                        <p className="text-xs text-gray-400 mt-1">Edited {new Date(resume.updatedAt).toLocaleDateString()}</p>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); deleteResume(resume.id); }}
                        className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition p-1"
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
          <BentoCard className="md:col-span-4 bg-gradient-to-br from-blue-50 to-[#f8f9fc] border-blue-100 flex flex-col justify-center items-center text-center">
             <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 text-[#0066FF]">
               <Target size={28} />
             </div>
             <h3 className="font-semibold text-lg mb-2">Profile Health</h3>
             <p className="text-sm text-gray-500 mb-6">Complete your master profile to generate tailored resumes faster.</p>
             <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-[#0066FF] h-2 rounded-full" style={{ width: '60%' }}></div>
             </div>
             <span className="text-xs font-medium text-[#0066FF]">60% Complete</span>
          </BentoCard>

          {/* Career Tips - 4 columns */}
          <BentoCard className="md:col-span-4 flex flex-col">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Sparkles size={18} className="text-yellow-500" />
              Pro Tips
            </h3>
            <div className="bg-yellow-50/50 rounded-2xl p-4 flex-1 border border-yellow-100">
               <p className="text-sm text-gray-700 leading-relaxed">
                 Tailor your resume for each job application by matching keywords from the job description. Draftline's AI matcher is coming soon!
               </p>
            </div>
          </BentoCard>
          
          {/* Stats - 4 columns, can be hidden on smaller screens or span differently */}
          <BentoCard className="md:col-span-8 lg:col-span-4 flex flex-col justify-center">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-green-500" />
              Activity
            </h3>
            <div className="flex items-end gap-6 h-full pb-2">
               <div className="flex flex-col items-center gap-2">
                 <div className="h-16 w-8 bg-blue-100 rounded-t-md"></div>
                 <span className="text-xs text-gray-400">Mon</span>
               </div>
               <div className="flex flex-col items-center gap-2">
                 <div className="h-24 w-8 bg-[#0066FF] rounded-t-md"></div>
                 <span className="text-xs font-medium">Tue</span>
               </div>
               <div className="flex flex-col items-center gap-2">
                 <div className="h-12 w-8 bg-blue-100 rounded-t-md"></div>
                 <span className="text-xs text-gray-400">Wed</span>
               </div>
               <div className="flex flex-col items-center gap-2">
                 <div className="h-20 w-8 bg-blue-100 rounded-t-md"></div>
                 <span className="text-xs text-gray-400">Thu</span>
               </div>
            </div>
          </BentoCard>

        </div>
      </div>
    </div>
  );
}
