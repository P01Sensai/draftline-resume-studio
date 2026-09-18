"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, ClipboardList, Link as LinkIcon, Trash2, RefreshCw, Sparkles, ArrowRight, Sliders, BarChart2, CheckCircle2, AlertCircle, Bot, Zap, Info } from 'lucide-react';

export default function ATSDashboard({ onAnalyze, isAnalyzing, results }) {
  const [jobDescription, setJobDescription] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const text = jobDescription.trim();
    setCharCount(text.length);
    setWordCount(text ? text.split(/\s+/).filter(Boolean).length : 0);
  }, [jobDescription]);

  const handleClear = () => setJobDescription("");

  const handleLoadDemo = () => {
    setJobDescription(`Senior Staff Product Designer (AI Platforms)
Location: San Francisco, CA / Remote

About The Role:
We are seeking an experienced Design Systems Lead to define conversational canvas paradigms and enterprise workflow orchestration tools. You will establish token synchronization architectures with engineers using Figma, Tailwind, and React.

Key Requirements:
• 6+ years designing complex developer products or enterprise infrastructure software.
• Deep understanding of design tokens, design system versioning, and accessible components (WCAG 2.1 AAA).
• Experience integrating GraphQL schemas and API data representations.
• Stellar track record leading cross-functional alignment with engineering executives.`);
  };

  const handleRunMatch = () => {
    if (!jobDescription.trim()) {
      alert("Please enter a job description first.");
      return;
    }
    onAnalyze(jobDescription);
  };

  const score = results?.score || 0;
  // Dashboard circle calculates stroke-dasharray based on score. Total length is approx 427.25 for r=68
  const strokeDashoffset = 427.25 - (427.25 * score) / 100;

  return (
    <div className="flex flex-col w-full min-h-full font-body">
      {/* Subtle decorative ambient glow backdrops */}
      <div className="relative w-full overflow-hidden px-6 lg:px-12 py-8">
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-1/2 -right-24 w-[30rem] h-[30rem] bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        
        {/* Top Section Header & Metadata Bar */}
        <section className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 pb-8">
          <div className="space-y-2 max-w-3xl">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2 pt-1 tracking-tight">
              ATS Job Matcher
              <Sparkles className="text-[#0066FF] dark:text-blue-400" size={24} />
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-2xl">
              Paste the target job description or import directly from job boards. Our contextual AI parses role requirements against your active CV schema to uncover keyword gaps, seniority alignment, and pass-through probabilities.
            </p>
          </div>

          {/* Quick Action Controls */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto shrink-0 mt-4 lg:mt-0">
            <div className="flex items-center gap-3 bg-white dark:bg-[#151621] border border-gray-200 dark:border-gray-800 px-4 py-2 rounded-xl shadow-sm">
              <FileText size={20} className="text-[#0066FF] dark:text-blue-400" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400 leading-none">Target File</span>
                <span className="text-sm text-gray-900 dark:text-white font-medium leading-tight mt-0.5">Current Resume</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Split Workspace Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: Job Input & Analysis Trigger */}
          <div className="xl:col-span-6 flex flex-col gap-6">
            <div className="bg-white dark:bg-[#1a1b26] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm flex flex-col gap-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-500"></div>
              
              {/* Section Controls Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <ClipboardList size={20} className="text-[#0066FF] dark:text-blue-400" />
                  <span className="text-sm tracking-wider uppercase font-bold">Job Description Input</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={handleLoadDemo} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800/50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium transition-colors border border-gray-200 dark:border-gray-700" type="button">
                    <LinkIcon size={14} />
                    <span>Load Demo JD</span>
                  </button>
                </div>
              </div>

              {/* Textarea Input Module */}
              <div className="relative group mt-2">
                <textarea 
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-[#0f111a] border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-sm rounded-xl p-4 transition-all duration-200 outline-none resize-y placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 shadow-inner min-h-[300px]" 
                  placeholder="e.g. We are seeking a Lead Product Designer with 5+ years of proven expertise in enterprise design systems..." 
                />
              </div>

              {/* Text Metas & Actions */}
              <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 text-xs pt-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{wordCount.toLocaleString()} words</span>
                  <span className="text-gray-300 dark:text-gray-700">•</span>
                  <span>{charCount.toLocaleString()} chars</span>
                </div>
                <button onClick={handleClear} className="hover:text-red-500 transition-colors flex items-center gap-1 font-medium" type="button">
                  <Trash2 size={14} />
                  Clear
                </button>
              </div>

              {/* Calculation Trigger */}
              <button 
                onClick={handleRunMatch}
                disabled={isAnalyzing}
                className="mt-4 w-full group relative overflow-hidden py-3.5 px-6 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white disabled:opacity-70 disabled:cursor-wait text-sm font-semibold transition-all shadow-[0_4px_14px_0_rgba(0,102,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,102,255,0.23)] hover:-translate-y-0.5 flex items-center justify-center gap-2" 
                type="button"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw size={18} className="animate-spin" />
                    <span>Analyzing Resume against JD...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={18} className="transition-transform group-hover:scale-110" />
                    <span>Recalculate ATS Match Score</span>
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>

            {/* Matching Settings Card */}
            <div className="bg-white dark:bg-[#1a1b26] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 border border-indigo-100 dark:border-indigo-800/50">
                  <Sliders size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">Context Weighting</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Prioritize Hard Skills over Exact Keyword Phrasing</span>
                </div>
              </div>
              <div className="flex items-center w-full md:w-auto justify-end">
                <span className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-semibold border border-gray-200 dark:border-gray-700">Smart Mode</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Real-Time ATS Match Breakdown & Insights */}
          <div className="xl:col-span-6 flex flex-col gap-6">
            
            {!results ? (
              <div className="bg-white dark:bg-[#1a1b26] border border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-10 shadow-sm flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                <BarChart2 size={48} className="text-gray-300 dark:text-gray-700 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Ready for Analysis</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">Paste a job description on the left and hit calculate to unlock deep semantic ATS insights and keyword matching.</p>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6 w-full">
                {/* Top Overview Score Bento Card */}
                <div className="bg-white dark:bg-[#1a1b26] border border-gray-200 dark:border-gray-800 rounded-xl p-6 md:p-8 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="absolute -right-16 -top-16 w-56 h-56 bg-[#0066FF]/10 dark:bg-[#0066FF]/20 rounded-full blur-3xl pointer-events-none"></div>
                  
                  {/* Circular Radial Progress Indicator */}
                  <div className="relative w-40 h-40 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
                      <circle className="text-gray-100 dark:text-gray-800/50" cx="80" cy="80" fill="transparent" r="68" stroke="currentColor" strokeWidth="12"></circle>
                      <motion.circle 
                        initial={{ strokeDashoffset: 427.25 }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className={score >= 80 ? "text-emerald-500" : score >= 60 ? "text-amber-500" : "text-red-500"} cx="80" cy="80" fill="transparent" r="68" stroke="currentColor" strokeDasharray="427.25" strokeLinecap="round" strokeWidth="12" style={{ filter: 'drop-shadow(0 0 8px rgba(0, 0, 0, 0.1))' }}
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center text-center">
                      <span className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tighter leading-none">{score}<span className="text-2xl text-gray-400 ml-0.5">%</span></span>
                      <span className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mt-2">
                        {score >= 80 ? 'High Match' : score >= 60 ? 'Good Match' : 'Low Match'}
                      </span>
                    </div>
                  </div>

                  {/* Score Metadata & ATS Summary */}
                  <div className="flex flex-col gap-2 text-left w-full z-10">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5 ${score >= 80 ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50'}`}>
                        {score >= 80 ? <Zap size={12} /> : <Info size={12} />}
                        {score >= 80 ? 'Top Tier Alignment' : 'Needs Optimization'}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                      {score >= 80 ? 'Strong ATS Candidate Alignment' : 'Average ATS Alignment'}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      Your resume exhibits {score >= 80 ? 'exceptional synergy' : 'moderate synergy'} with core role requirements. Addressing the missing technical tokens can advance your profile.
                    </p>
                    <div className="grid grid-cols-3 gap-2 pt-3">
                      <div className="px-3 py-2 bg-gray-50 dark:bg-[#0f111a] border border-gray-100 dark:border-gray-800/60 rounded-lg text-center flex flex-col justify-center">
                        <span className="text-[10px] uppercase font-semibold text-gray-500 dark:text-gray-400 block mb-0.5">Odds</span>
                        <span className={`text-sm font-bold ${score >= 80 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>{score >= 80 ? 'Very High' : 'Average'}</span>
                      </div>
                      <div className="px-3 py-2 bg-gray-50 dark:bg-[#0f111a] border border-gray-100 dark:border-gray-800/60 rounded-lg text-center flex flex-col justify-center">
                        <span className="text-[10px] uppercase font-semibold text-gray-500 dark:text-gray-400 block mb-0.5">Matched</span>
                        <span className="text-sm text-gray-900 dark:text-white font-bold">{results.foundKeywords?.length || 0}</span>
                      </div>
                      <div className="px-3 py-2 bg-gray-50 dark:bg-[#0f111a] border border-gray-100 dark:border-gray-800/60 rounded-lg text-center flex flex-col justify-center">
                        <span className="text-[10px] uppercase font-semibold text-gray-500 dark:text-gray-400 block mb-0.5">Parse Risk</span>
                        <span className="text-sm text-[#0066FF] dark:text-blue-400 font-bold">0.0%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Keyword Radar & Tag Grid */}
                <div className="bg-white dark:bg-[#1a1b26] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-[#0066FF] dark:text-blue-400 border border-blue-100 dark:border-blue-800/50">
                        <BarChart2 size={16} />
                      </div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white">Target Keyword Extraction</h3>
                    </div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 px-2.5 py-1 rounded-md border border-gray-200 dark:border-gray-700">
                      {(results.foundKeywords?.length || 0)} Matched • {(results.missingKeywords?.length || 0)} Missing
                    </span>
                  </div>
                  
                  {/* Matched Tags */}
                  <div className="flex flex-col gap-2.5">
                    <span className="text-[11px] uppercase text-gray-500 dark:text-gray-400 tracking-wider font-bold">Matched in your resume</span>
                    <div className="flex flex-wrap gap-2">
                      {results.foundKeywords?.length > 0 ? results.foundKeywords.map((kw, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/30 text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm transition-transform hover:-translate-y-0.5">
                          <CheckCircle2 size={14} />
                          {kw}
                        </span>
                      )) : (
                        <span className="text-sm text-gray-400 italic">No exact matches found.</span>
                      )}
                    </div>
                  </div>

                  <div className="h-px w-full bg-gray-100 dark:bg-gray-800 my-1"></div>

                  {/* Missing Tags */}
                  <div className="flex flex-col gap-2.5">
                    <span className="text-[11px] uppercase text-red-500 dark:text-red-400 tracking-wider font-bold">Missing from your resume</span>
                    <div className="flex flex-wrap gap-2">
                      {results.missingKeywords?.length > 0 ? results.missingKeywords.map((kw, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800/30 text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm transition-transform hover:-translate-y-0.5">
                          <AlertCircle size={14} />
                          {kw}
                        </span>
                      )) : (
                        <span className="text-sm text-gray-400 italic">None missing! Great job.</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                {results.recommendations?.length > 0 && (
                  <div className="bg-white dark:bg-[#1a1b26] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm flex flex-col gap-5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/50">
                        <Bot size={16} />
                      </div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white">AI Targeted Modifications</h3>
                    </div>
                    <div className="space-y-3">
                      {results.recommendations.map((rec, i) => (
                        <div key={i} className="bg-gray-50 dark:bg-[#0f111a] border border-gray-100 dark:border-gray-800/60 p-4 rounded-xl flex items-start gap-3 transition-colors hover:border-blue-200 dark:hover:border-blue-800/50">
                          <div className="w-6 h-6 rounded-md bg-[#0066FF]/10 dark:bg-[#0066FF]/20 text-[#0066FF] dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5 border border-[#0066FF]/20">
                            <span className="text-xs font-bold">{i + 1}</span>
                          </div>
                          <div className="flex flex-col gap-1 w-full pt-0.5">
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                              {rec}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
