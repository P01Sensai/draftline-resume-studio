"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, Mail, Download } from 'lucide-react';
import Editor from './Editor/Editor';
import Preview from './Preview/Preview';
import { useResumeStore } from '@/store/useResumeStore';

export default function WorkspaceLayout() {
  const [activeDoc, setActiveDoc] = useState("resume");
  const { resumes, activeResumeId, updateActiveResume } = useResumeStore();
  const resume = resumes.find(r => r.id === activeResumeId);

  const handlePrint = () => window.print();

  if (!resume) return <div className="p-8">Loading workspace...</div>;

  return (
    <div className="min-h-screen w-full bg-[#f8f9fc] font-body flex flex-col">
      {/* Top Navigation Bar - Clean and Minimal */}
      <div className="no-print sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors">
              <ArrowLeft size={16} /> Dashboard
            </Link>
            <div className="h-4 w-px bg-gray-300"></div>
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveDoc("resume")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${activeDoc === "resume" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
              >
                <FileText size={14} /> Resume
              </button>
              <button
                onClick={() => setActiveDoc("cover")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${activeDoc === "cover" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
              >
                <Mail size={14} /> Cover Letter
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 mr-2">
              <span className="text-sm text-gray-500 font-medium">Template:</span>
              <select
                value={resume.template || 'typewriter'}
                onChange={(e) => updateActiveResume({ template: e.target.value })}
                className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-md px-3 py-1.5 outline-none focus:border-[#0066FF] transition-colors cursor-pointer"
              >
                <option value="typewriter">Typewriter</option>
                <option value="ledger">Ledger</option>
              </select>
            </div>
            
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-[#0066FF] text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Download size={16} /> Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace Area */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-0 lg:gap-8 bg-[#f8f9fc]">
        {/* Editor Side */}
        <div className="no-print bg-white border-r border-gray-200 overflow-y-auto" style={{ height: 'calc(100vh - 61px)' }}>
          <Editor activeDoc={activeDoc} />
        </div>

        {/* Preview Side */}
        <div className="bg-[#f8f9fc] overflow-y-auto p-4 lg:p-8" style={{ height: 'calc(100vh - 61px)' }}>
          <Preview activeDoc={activeDoc} template={resume.template || 'typewriter'} />
        </div>
      </div>
    </div>
  );
}
