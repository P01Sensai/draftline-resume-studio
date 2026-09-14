"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ChevronDown, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AIEnhanceButton({ text, role, company, type = 'bullet', onEnhance, isLocked = false }) {
  const [isLoading, setIsLoading] = useState(false);
  const [tone, setTone] = useState("Action-Oriented");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  
  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEnhance = async (selectedTone = tone) => {
    if (isLocked) {
      alert("Sign in to unlock AI features for this section!");
      router.push('/login');
      return;
    }
    if (!text || text.trim() === '') return;
    
    setIsLoading(true);
    setShowDropdown(false);
    
    try {
      const res = await fetch('/api/ai/improve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, role, company, tone: selectedTone, type })
      });
      const data = await res.json();
      
      if (data.result) {
        onEnhance(data.result);
      } else {
        console.error(data.error);
        alert(data.error || "Failed to enhance");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to connect to AI");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex items-center shrink-0" ref={dropdownRef}>
      <div className={`flex border rounded-md shadow-sm transition-colors ${isLocked ? 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700' : 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800/60'}`}>
        <button 
          onClick={() => handleEnhance(tone)}
          disabled={!isLocked && (isLoading || !text)}
          className={`p-1.5 transition-colors flex items-center gap-1 border-r rounded-l-md ${isLocked ? 'text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-700 cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700' : 'text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 disabled:opacity-50 border-indigo-100 dark:border-indigo-800/60'}`}
          title={isLocked ? "Sign in to unlock!" : `Enhance with AI (${tone})`}
        >
          {isLocked ? (
            <Lock size={16} />
          ) : isLoading ? (
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          ) : (
            <Sparkles size={16} />
          )}
        </button>
        <button 
          onClick={() => !isLocked && setShowDropdown(!showDropdown)}
          disabled={isLocked || isLoading}
          className={`p-1.5 transition-colors rounded-r-md ${isLocked ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50' : 'text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 disabled:opacity-50'}`}
        >
          <ChevronDown size={14} />
        </button>
      </div>

      {showDropdown && (
        <div className="absolute top-full right-0 mt-1 z-50 w-40 bg-white dark:bg-[#1a1b26] border border-gray-200 dark:border-gray-800 rounded-md shadow-lg overflow-hidden flex flex-col text-xs font-medium">
           <div className="px-3 py-1.5 text-[10px] uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-[#0a0b14] border-b border-gray-100 dark:border-gray-800">
             Select AI Tone
           </div>
           {['Professional', 'Concise', 'Action-Oriented', 'Creative'].map(t => (
             <button 
               key={t}
               onClick={() => {
                 setTone(t);
                 handleEnhance(t);
               }}
               className={`text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${tone === t ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/10' : 'text-gray-700 dark:text-gray-300'}`}
             >
               {t}
             </button>
           ))}
        </div>
      )}
    </div>
  );
}
