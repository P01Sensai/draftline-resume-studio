"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useStore } from 'zustand';
import { ArrowLeft, FileText, Mail, Download, Moon, Sun, Save, Check, Undo2, Redo2 } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import { PDFTypewriterResume, PDFLedgerResume, PDFCoverLetter } from './pdf/PDFTemplates';
import Editor from './Editor/Editor';
import Preview from './Preview/Preview';
import { useResumeStore } from '@/store/useResumeStore';

export default function WorkspaceLayout() {
  const [activeDoc, setActiveDoc] = useState("resume");
  const [isPrinting, setIsPrinting] = useState(false);
  const [saveStatus, setSaveStatus] = useState("idle"); // idle | saving | saved
  const { resumes, activeResumeId, updateActiveResume, theme, toggleTheme } = useResumeStore();
  const { undo, redo, pastStates, futureStates } = useStore(useResumeStore.temporal, (state) => state);
  const resume = resumes.find(r => r.id === activeResumeId);

  const printRef = useRef(null);
  
  const handleExportPDF = async () => {
    if (!resume) return;
    setIsPrinting(true);
    
    // Give UI a tiny tick to show the "Preparing..." state
    await new Promise(resolve => setTimeout(resolve, 50));
    
    try {
      let doc;
      if (activeDoc === "resume") {
        if (resume.template === "typewriter" || !resume.template) {
          doc = <PDFTypewriterResume personal={resume.personal} summary={resume.summary} experience={resume.experience} education={resume.education} skills={resume.skills} />;
        } else {
          doc = <PDFLedgerResume personal={resume.personal} summary={resume.summary} experience={resume.experience} education={resume.education} skills={resume.skills} />;
        }
      } else {
        doc = <PDFCoverLetter personal={resume.personal} cover={resume.coverLetter} />;
      }
      
      const blob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      const prefix = activeDoc === "resume" ? "Resume" : "CoverLetter";
      const fileName = resume.title ? resume.title.replace(/\s+/g, '_') : prefix;
      link.download = `${fileName}.pdf`;
      
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsPrinting(false);
    }
  };

  if (!resume) return <div className="p-8">Loading workspace...</div>;

  const handleManualSave = () => {
    if (saveStatus !== "idle") return;
    updateActiveResume({ updatedAt: new Date().toISOString() });
    setSaveStatus("saving");
    setTimeout(() => setSaveStatus("saved"), 400);
    setTimeout(() => setSaveStatus("idle"), 2500);
  };

  return (
    <div className="min-h-screen w-full bg-[#f8f9fc] dark:bg-[#0a0b14] text-gray-900 dark:text-gray-100 font-body flex flex-col transition-colors">
      {/* Top Navigation Bar - Clean and Minimal */}
      <div className="no-print sticky top-0 z-20 bg-white dark:bg-[#1a1b26] border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors">
        <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
              <ArrowLeft size={16} /> Dashboard
            </Link>
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-700"></div>
            <div className="flex bg-gray-100 dark:bg-[#0a0b14] p-1 rounded-lg border border-transparent dark:border-gray-800">
              <button
                onClick={() => setActiveDoc("resume")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${activeDoc === "resume" ? "bg-white dark:bg-[#1a1b26] text-gray-900 dark:text-gray-100 shadow-sm border border-transparent dark:border-gray-700" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"}`}
              >
                <FileText size={14} /> Resume
              </button>
              <button
                onClick={() => setActiveDoc("cover")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${activeDoc === "cover" ? "bg-white dark:bg-[#1a1b26] text-gray-900 dark:text-gray-100 shadow-sm border border-transparent dark:border-gray-700" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"}`}
              >
                <Mail size={14} /> Cover Letter
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            
            <div className="flex items-center gap-1">
              <button
                onClick={() => undo()}
                disabled={pastStates.length === 0}
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Undo"
              >
                <Undo2 size={16} />
              </button>
              <button
                onClick={() => redo()}
                disabled={futureStates.length === 0}
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Redo"
              >
                <Redo2 size={16} />
              </button>
            </div>

            <div className="h-4 w-px bg-gray-300 dark:bg-gray-700"></div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Template:</span>
              <select
                value={resume.template || 'typewriter'}
                onChange={(e) => updateActiveResume({ template: e.target.value })}
                className="bg-gray-50 dark:bg-[#0a0b14] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm rounded-md px-3 py-1.5 outline-none focus:border-[#0066FF] dark:focus:border-[#0066FF] transition-colors cursor-pointer"
              >
                <option value="typewriter">Typewriter</option>
                <option value="ledger">Ledger</option>
              </select>
            </div>
            
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-700"></div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button
              onClick={handleManualSave}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-colors border shadow-sm ${
                saveStatus === 'saved' 
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800'
                  : 'bg-white dark:bg-[#1a1b26] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {saveStatus === 'saving' ? (
                <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              ) : saveStatus === 'saved' ? (
                <Check size={16} />
              ) : (
                <Save size={16} />
              )}
              {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved' : 'Save'}
            </button>
            
            <button
              onClick={handleExportPDF}
              disabled={isPrinting}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-[#0066FF] text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-wait"
            >
              {isPrinting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Preparing...
                </>
              ) : (
                <>
                  <Download size={16} /> Export PDF
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace Area */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-0 lg:gap-8 bg-[#f8f9fc] dark:bg-[#0a0b14] transition-colors">
        {/* Editor Side */}
        <div className="no-print bg-white dark:bg-[#1a1b26] border-r border-gray-200 dark:border-gray-800 overflow-y-auto transition-colors custom-scrollbar" style={{ height: 'calc(100vh - 61px)' }}>
          <Editor activeDoc={activeDoc} />
        </div>

        {/* Preview Side */}
        <div className="bg-[#f8f9fc] dark:bg-[#0a0b14] overflow-y-auto p-4 lg:p-8 custom-scrollbar transition-colors" style={{ height: 'calc(100vh - 61px)' }}>
          <Preview ref={printRef} activeDoc={activeDoc} template={resume.template || 'typewriter'} />
        </div>
      </div>
    </div>
  );
}
