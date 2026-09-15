import React from 'react';
import { Target, CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ATSResults({ results }) {
  if (!results) {
    return (
      <div className="flex justify-center h-full items-start pt-8 lg:pt-0 lg:sticky lg:top-24">
        <div className="w-full max-w-[640px] min-h-[600px] bg-white dark:bg-[#1a1b26] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-10 flex flex-col items-center justify-center text-center transition-colors">
          <div className="w-20 h-20 bg-blue-50 dark:bg-[#0a0b14] rounded-full flex items-center justify-center mb-6 border border-blue-100 dark:border-gray-800">
            <Target size={32} className="text-[#0066FF]" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Ready to scan</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm">
            Paste a job description on the left and hit calculate to see how your resume stacks up against the ATS algorithms.
          </p>
        </div>
      </div>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="flex justify-center h-full items-start pt-8 lg:pt-0 lg:sticky lg:top-24 pb-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[640px] bg-white dark:bg-[#1a1b26] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-8 transition-colors"
      >
        {/* Score Header */}
        <div className="flex flex-col items-center text-center border-b border-gray-100 dark:border-gray-800 pb-8 mb-8">
          <div className="relative w-32 h-32 flex items-center justify-center mb-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-gray-100 dark:text-gray-800" />
              <motion.circle 
                initial={{ strokeDasharray: "0 1000" }}
                animate={{ strokeDasharray: `${(results.score / 100) * 283} 1000` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" 
                className={`${getScoreColor(results.score)}`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-4xl font-bold ${getScoreColor(results.score)}`}>{results.score}</span>
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Match Score</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Based on keywords and experience requirements</p>
        </div>

        {/* Keywords */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h4 className="flex items-center gap-2 font-semibold text-sm mb-4 text-gray-900 dark:text-gray-100">
              <CheckCircle2 size={16} className="text-green-500" />
              Keywords Found
            </h4>
            <div className="flex flex-wrap gap-2">
              {results.foundKeywords?.length > 0 ? (
                results.foundKeywords.map((kw, i) => (
                  <span key={i} className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800/50 rounded-full text-xs font-medium">
                    {kw}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-400">None found</span>
              )}
            </div>
          </div>

          <div>
            <h4 className="flex items-center gap-2 font-semibold text-sm mb-4 text-gray-900 dark:text-gray-100">
              <XCircle size={16} className="text-red-500" />
              Missing Keywords
            </h4>
            <div className="flex flex-wrap gap-2">
              {results.missingKeywords?.length > 0 ? (
                results.missingKeywords.map((kw, i) => (
                  <span key={i} className="px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800/50 rounded-full text-xs font-medium">
                    {kw}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-400">None missing!</span>
              )}
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-blue-50/50 dark:bg-[#0a0b14] border border-blue-100 dark:border-gray-800 rounded-xl p-5">
          <h4 className="flex items-center gap-2 font-semibold text-sm mb-4 text-gray-900 dark:text-gray-100">
            <Lightbulb size={16} className="text-[#0066FF]" />
            AI Recommendations
          </h4>
          <ul className="space-y-3">
            {results.recommendations?.map((rec, i) => (
              <li key={i} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] mt-1.5 shrink-0"></span>
                <span className="leading-relaxed">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
