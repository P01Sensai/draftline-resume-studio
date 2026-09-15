"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="flex flex-col w-full text-on-surface bg-background font-body-md min-h-full">
      {/* Subtle decorative ambient glow backdrops */}
      <div className="relative w-full overflow-hidden px-space-lg lg:px-margin py-space-lg">
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-primary-container/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-1/2 -right-24 w-[30rem] h-[30rem] bg-tertiary-container/15 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        
        {/* Top Section Header & Metadata Bar */}
        <section className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-space-lg pb-space-lg">
          <div className="space-y-space-xs max-w-3xl">
            <div className="flex items-center gap-space-sm">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high border-none font-caption text-caption text-tertiary shadow-sm">
                <span className="w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
                ATS Neural Engine v4.2 Active
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-container-low font-caption text-caption text-on-surface-variant">Real-time Semantic Parsing</span>
            </div>
            <h1 className="font-headline-xl text-headline-xl tracking-tight text-on-surface flex items-center gap-space-sm pt-1">
              ATS Job Matcher
              <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Paste the target job description or import directly from job boards. Our contextual AI parses role requirements against your active CV schema to uncover keyword gaps, seniority alignment, and pass-through probabilities.
            </p>
          </div>

          {/* Quick Action Controls */}
          <div className="flex flex-wrap items-center gap-space-sm w-full lg:w-auto shrink-0">
            <div className="flex items-center gap-space-xs bg-surface-container-low px-space-md py-2 rounded-lg shadow-sm">
              <span className="material-symbols-outlined text-[18px] text-tertiary">description</span>
              <div className="flex flex-col text-left">
                <span className="font-caption text-caption text-on-surface-variant leading-none">Target File</span>
                <span className="font-label-md text-label-md text-on-surface font-medium leading-tight">Current Resume</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Split Workspace Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter items-start">
          
          {/* LEFT COLUMN: Job Input & Analysis Trigger */}
          <div className="xl:col-span-6 flex flex-col gap-space-md">
            <div className="bg-surface-container-low rounded-xl p-space-lg shadow-md flex flex-col gap-space-md relative overflow-hidden">
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary-container via-tertiary to-secondary-container"></div>
              
              {/* Section Controls Bar */}
              <div className="flex flex-wrap items-center justify-between gap-space-sm">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-[20px]">assignment</span>
                  <span className="font-label-md text-label-md tracking-wider uppercase text-on-surface font-semibold">Job Description Input</span>
                </div>
                <div className="flex items-center gap-space-xs">
                  <button onClick={handleLoadDemo} className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors" title="Load demo JD" type="button">
                    <span className="material-symbols-outlined text-[16px] text-secondary">link</span>
                    <span>Load Demo JD</span>
                  </button>
                </div>
              </div>

              {/* Textarea Input Module */}
              <div className="relative group">
                <textarea 
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-lg p-space-md transition-all duration-200 outline-none resize-y placeholder:text-outline/70 focus:bg-surface-container-lowest/90 selection:bg-primary-container selection:text-on-primary-container shadow-inner" 
                  placeholder="e.g. We are seeking a Lead Product Designer with 5+ years of proven expertise in enterprise design systems..." 
                  rows="12"
                />
              </div>

              {/* Text Metas & Actions */}
              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm pt-space-xs">
                <div className="flex items-center gap-space-sm">
                  <span className="font-medium text-on-surface">{wordCount.toLocaleString()} words</span>
                  <span className="text-outline-variant">•</span>
                  <span>{charCount.toLocaleString()} chars</span>
                </div>
                <button onClick={handleClear} className="hover:text-error transition-colors flex items-center gap-1" type="button">
                  <span className="material-symbols-outlined text-[16px]">clear_all</span>
                  Clear
                </button>
              </div>

              {/* Calculation Trigger */}
              <button 
                onClick={handleRunMatch}
                disabled={isAnalyzing}
                className="w-full group relative overflow-hidden py-3 px-space-lg rounded-lg bg-primary-container hover:bg-inverse-primary text-on-primary-container disabled:opacity-50 disabled:cursor-wait font-label-md text-label-md font-semibold transition-all duration-300 shadow-[0_0_24px_rgba(67,56,202,0.45)] flex items-center justify-center gap-space-sm" 
                type="button"
              >
                {isAnalyzing ? (
                  <>
                    <span className="material-symbols-outlined text-[20px] animate-spin">refresh</span>
                    <span>Analyzing Resume against JD...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px] transition-transform group-hover:rotate-12">auto_awesome</span>
                    <span>Recalculate ATS Match Score</span>
                    <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                  </>
                )}
              </button>
            </div>

            {/* Matching Settings Card */}
            <div className="bg-surface-container-low rounded-xl p-space-md shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-md">
              <div className="flex items-center gap-space-sm">
                <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-tertiary shrink-0">
                  <span className="material-symbols-outlined text-[20px]">tune</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-title-sm text-title-sm text-on-surface">Context Weighting</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Prioritize Hard Skills over Exact Keyword Phrasing</span>
                </div>
              </div>
              <div className="flex items-center gap-space-xs w-full md:w-auto justify-end">
                <span className="px-2.5 py-1 rounded-full bg-surface-container-high font-label-sm text-label-sm text-tertiary">Smart Mode</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Real-Time ATS Match Breakdown & Insights */}
          <div className="xl:col-span-6 flex flex-col gap-space-md">
            
            {!results ? (
              <div className="bg-surface-container-low rounded-xl p-10 shadow-xl flex flex-col items-center justify-center text-center h-full min-h-[400px] border border-dashed border-outline-variant/30">
                <span className="material-symbols-outlined text-[48px] text-tertiary mb-4 opacity-50">analytics</span>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Ready for Analysis</h3>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">Paste a job description on the left and hit calculate to unlock deep semantic ATS insights and keyword matching.</p>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-space-md w-full">
                {/* Top Overview Score Bento Card */}
                <div className="bg-surface-container-low rounded-xl p-space-lg shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-space-lg">
                  <div className="absolute -right-16 -top-16 w-56 h-56 bg-primary-container/20 rounded-full blur-2xl pointer-events-none"></div>
                  
                  {/* Circular Radial Progress Indicator */}
                  <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
                      <circle className="text-surface-container-highest" cx="80" cy="80" fill="transparent" r="68" stroke="currentColor" strokeWidth="12"></circle>
                      <motion.circle 
                        initial={{ strokeDashoffset: 427.25 }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="text-tertiary" cx="80" cy="80" fill="transparent" r="68" stroke="currentColor" strokeDasharray="427.25" strokeLinecap="round" strokeWidth="12" style={{ filter: 'drop-shadow(0 0 8px rgba(76, 215, 246, 0.6))' }}
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center text-center">
                      <span className="font-display-lg text-display-lg font-bold text-on-surface tracking-tighter leading-none">{score}<span className="text-tertiary text-[28px]">%</span></span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-medium uppercase tracking-wider mt-1">
                        {score >= 80 ? 'High Match' : score >= 60 ? 'Good Match' : 'Low Match'}
                      </span>
                    </div>
                  </div>

                  {/* Score Metadata & ATS Summary */}
                  <div className="flex flex-col gap-space-xs text-left w-full">
                    <div className="flex items-center gap-space-xs">
                      <span className="px-2.5 py-0.5 rounded-full bg-tertiary-container/40 text-tertiary font-label-sm text-label-sm font-semibold inline-flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">{score >= 80 ? 'bolt' : 'info'}</span>
                        {score >= 80 ? 'Top Tier Alignment' : 'Needs Optimization'}
                      </span>
                    </div>
                    <h2 className="font-headline-md text-headline-md text-on-surface">
                      {score >= 80 ? 'Strong ATS Candidate Alignment' : 'Average ATS Alignment'}
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Your resume exhibits {score >= 80 ? 'exceptional synergy' : 'moderate synergy'} with core role requirements. Addressing the missing technical tokens can advance your profile.
                    </p>
                    <div className="grid grid-cols-3 gap-space-xs pt-space-xs">
                      <div className="p-space-xs bg-surface-container rounded-lg text-center flex flex-col">
                        <span className="font-caption text-caption text-on-surface-variant block">Interview Odds</span>
                        <span className="font-label-md text-label-md text-tertiary font-bold">{score >= 80 ? 'Very High' : 'Average'}</span>
                      </div>
                      <div className="p-space-xs bg-surface-container rounded-lg text-center flex flex-col">
                        <span className="font-caption text-caption text-on-surface-variant block">Matched</span>
                        <span className="font-label-md text-label-md text-on-surface font-bold">{results.foundKeywords?.length || 0}</span>
                      </div>
                      <div className="p-space-xs bg-surface-container rounded-lg text-center flex flex-col">
                        <span className="font-caption text-caption text-on-surface-variant block">Parse Risk</span>
                        <span className="font-label-md text-label-md text-primary font-bold">0.0% Clean</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Keyword Radar & Tag Grid */}
                <div className="bg-surface-container-low rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-tertiary text-[20px]">filter_alt</span>
                      <h3 className="font-title-sm text-title-sm text-on-surface">Target Keyword Extraction</h3>
                    </div>
                    <span className="font-caption text-caption text-on-surface-variant">{(results.foundKeywords?.length || 0)} Matched • {(results.missingKeywords?.length || 0)} Missing</span>
                  </div>
                  
                  {/* Matched Tags */}
                  <div className="flex flex-col gap-space-xs">
                    <span className="font-caption text-caption uppercase text-on-surface-variant tracking-wider font-semibold">Matched in your resume</span>
                    <div className="flex flex-wrap gap-1.5">
                      {results.foundKeywords?.length > 0 ? results.foundKeywords.map((kw, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-md bg-surface-container-high text-tertiary font-label-sm text-label-sm inline-flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">check_circle</span>
                          {kw}
                        </span>
                      )) : (
                        <span className="text-sm text-outline-variant">No exact matches found.</span>
                      )}
                    </div>
                  </div>

                  {/* Missing Tags */}
                  <div className="flex flex-col gap-space-xs pt-space-xs">
                    <span className="font-caption text-caption uppercase text-error tracking-wider font-semibold">Missing from your resume</span>
                    <div className="flex flex-wrap gap-1.5">
                      {results.missingKeywords?.length > 0 ? results.missingKeywords.map((kw, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-md bg-error-container/30 text-error font-label-sm text-label-sm inline-flex items-center gap-1.5 shadow-sm">
                          <span className="material-symbols-outlined text-[14px]">error</span>
                          {kw}
                        </span>
                      )) : (
                        <span className="text-sm text-outline-variant">None missing!</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                {results.recommendations?.length > 0 && (
                  <div className="bg-surface-container-low rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-space-xs">
                        <span className="material-symbols-outlined text-primary text-[20px]">smart_toy</span>
                        <h3 className="font-title-sm text-title-sm text-on-surface">AI Targeted Modifications</h3>
                      </div>
                    </div>
                    <div className="space-y-space-sm">
                      {results.recommendations.map((rec, i) => (
                        <div key={i} className="bg-surface-container p-space-md rounded-lg flex items-start gap-space-sm">
                          <div className="w-7 h-7 rounded bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 mt-0.5">
                            <span className="font-label-sm text-label-sm font-bold">{i + 1}</span>
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
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
