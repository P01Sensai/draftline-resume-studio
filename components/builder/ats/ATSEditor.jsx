import React, { useState } from 'react';
import { Target, Sparkles } from 'lucide-react';

export default function ATSEditor({ onAnalyze, isAnalyzing }) {
  const [jd, setJd] = useState('');

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#1a1b26] text-gray-900 dark:text-gray-100 p-6 lg:p-10 transition-colors">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Target className="text-[#0066FF]" />
          ATS Job Matcher
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Paste the description of the job you are applying for. Our AI will analyze your resume against the requirements and tell you exactly how to improve your score.
        </p>
      </div>

      <div className="flex-1 flex flex-col min-h-[400px]">
        <label className="text-sm font-semibold mb-2 block uppercase tracking-wider text-gray-400">Job Description</label>
        <textarea
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          placeholder="e.g. We are looking for a Senior Product Designer with 5+ years of experience in Figma, design systems, and B2B SaaS..."
          className="flex-1 w-full bg-gray-50 dark:bg-[#0a0b14] border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-sm focus:outline-none focus:border-[#0066FF] dark:focus:border-[#0066FF] transition-colors resize-none mb-6"
        />
        
        <button
          onClick={() => onAnalyze(jd)}
          disabled={!jd.trim() || isAnalyzing}
          className="w-full bg-[#0066FF] text-white py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-sm hover:shadow-[0_4px_14px_0_rgba(0,102,255,0.39)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Calculate Match Score
            </>
          )}
        </button>
      </div>
    </div>
  );
}
