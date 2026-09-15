import React, { useState, useRef } from 'react';
import { Target, Sparkles, Upload } from 'lucide-react';

export default function ATSEditor({ onAnalyze, isAnalyzing }) {
  const [jd, setJd] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsExtracting(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/ai/extract-text', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      
      if (data.success && data.text) {
        setJd(data.text);
      } else {
        alert(data.error || 'Failed to extract text from PDF');
      }
    } catch (error) {
      console.error('Extract Error:', error);
      alert('An error occurred while reading the PDF');
    } finally {
      setIsExtracting(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

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
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold uppercase tracking-wider text-gray-400">Job Description</label>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isExtracting}
            className="flex items-center gap-1.5 text-xs font-medium text-[#0066FF] hover:text-blue-700 disabled:opacity-50 transition-colors"
          >
            {isExtracting ? (
              <svg className="animate-spin h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : (
              <Upload size={14} />
            )}
            Upload PDF
          </button>
          <input 
            type="file" 
            accept=".pdf" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            className="hidden" 
          />
        </div>
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
