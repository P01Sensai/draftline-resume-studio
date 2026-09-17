"use client";

import React, { useState, useRef } from 'react';
import { Plus, Trash2, X, Sparkles, Upload, FileText } from 'lucide-react';
import { useResumeStore } from '@/store/useResumeStore';
import { toast } from 'sonner';
import { MinimalField, MinimalTextArea, MonthYearPicker } from '../ui/FormFields';
import { MinimalSection } from '../ui/MinimalSection';
import AIEnhanceButton from './AIEnhanceButton';
import { COMMON_SKILLS, COMMON_TITLES, COMMON_LOCATIONS } from '@/lib/suggestions';

export default function Editor({ activeDoc, setActiveDoc }) {
  const {
    resumes,
    activeResumeId,
    updateActiveResume,
    updatePersonal,
    updateExperience,
    addExperience,
    removeExperience,
    updateBullet,
    addBullet,
    removeBullet,
    updateEducation,
    addEducation,
    removeEducation,
    updateProject,
    addProject,
    removeProject,
    updateProjectBullet,
    addProjectBullet,
    removeProjectBullet,
    updateCertificate,
    addCertificate,
    removeCertificate,
    setSkills,
    updateCoverLetter,
    user,
  } = useResumeStore();

  const resume = resumes.find(r => r.id === activeResumeId);
  const [skillInput, setSkillInput] = useState("");
  const [generatingBulletId, setGeneratingBulletId] = useState(null);
  const [isGeneratingCover, setIsGeneratingCover] = useState(false);
  
  const fileInputRef = useRef(null);
  
  // Cover Letter Modal State
  const [showCoverModal, setShowCoverModal] = useState(false);
  const [coverTargetRole, setCoverTargetRole] = useState("");
  const [coverTargetCompany, setCoverTargetCompany] = useState("");

  const setShowPaywall = useResumeStore(state => state.setShowPaywallModal);

  if (!resume) return <div className="p-8 text-gray-500">No active resume.</div>;

  const { personal, summary, experience, education, projects = [], certificates = [], skills, coverLetter } = resume;

  const handleAutoGenerateCover = async () => {
    if (!user) {
      setShowPaywall(true);
      return;
    }
    
    if (!coverTargetRole || !coverTargetCompany) {
      toast.error("Please fill in both the Role and Company.");
      return;
    }

    setShowCoverModal(false);
    
    if (setActiveDoc) {
      setActiveDoc("cover");
    }

    setIsGeneratingCover(true);
    const loadingToast = toast.loading("Analyzing your resume and generating cover letter...");

    try {
      // Pre-fill the cover letter fields with the targets
      updateCoverLetter({ 
        recipient: "Hiring Manager", 
        company: coverTargetCompany,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      });

      const res = await fetch('/api/ai/generate-cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resume: resume,
          role: coverTargetRole,
          company: coverTargetCompany
        })
      });

      const data = await res.json();
      
      if (data.result) {
        updateCoverLetter({ body: data.result });
        toast.success("Cover letter generated perfectly!", { id: loadingToast });
      } else {
        console.error(data.error);
        toast.error(data.error || "Failed to generate.", { id: loadingToast });
      }
    } catch (e) {
      console.error(e);
      toast.error("Network error. Failed to connect to AI.", { id: loadingToast });
    } finally {
      setIsGeneratingCover(false);
      setCoverTargetRole("");
      setCoverTargetCompany("");
    }
  };

  const handleUploadCoverLetterPDF = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!user) {
      setShowPaywall(true);
      return;
    }

    const toastId = toast.loading("Uploading and parsing your PDF...");
    const formData = new FormData();
    formData.append('file', file);

    try {
      // 1. Parse PDF
      const parseRes = await fetch('/api/ai/parse-resume', { method: 'POST', body: formData });
      const parseData = await parseRes.json();
      
      if (!parseData.success) throw new Error(parseData.error || "Failed to parse PDF");
      
      toast.loading("PDF parsed. Generating cover letter...", { id: toastId });
      setIsGeneratingCover(true);

      // 2. Generate Cover Letter using parsed data
      const genRes = await fetch('/api/ai/generate-cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resume: parseData.data,
          role: "the open position", // Generic fallback
          company: "the company" 
        })
      });

      const genData = await genRes.json();
      
      if (genData.result) {
        updateCoverLetter({ 
          body: genData.result,
          recipient: "Hiring Manager",
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        });
        toast.success("Cover letter generated from PDF!", { id: toastId });
      } else {
        throw new Error(genData.error || "Generation failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "An error occurred.", { id: toastId });
    } finally {
      setIsGeneratingCover(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleAddSkill = () => {
    const v = skillInput.trim();
    if (v && !skills.includes(v)) {
      setSkills([...skills, v]);
    }
    setSkillInput("");
  };

  return (
    <div className="font-body max-w-2xl mx-auto py-8 px-4 text-gray-900 dark:text-gray-100">
      <div className="mb-8">
        <MinimalField 
          label="Document Title" 
          value={resume.title} 
          onChange={(e) => updateActiveResume({ title: e.target.value })} 
          placeholder="e.g. Software Engineer - Google"
        />
      </div>

      {activeDoc === "resume" ? (
        <>
          <MinimalSection title="Personal Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
              <MinimalField 
                label="Full name" 
                value={personal.name} 
                onChange={(e) => updatePersonal({ name: e.target.value })} 
                error={!personal.name.trim() ? "Name is required" : ""}
              />
              <MinimalField label="Title / role" list="titles-list" value={personal.title} onChange={(e) => updatePersonal({ title: e.target.value })} />
              <MinimalField 
                label="Email" 
                value={personal.email} 
                onChange={(e) => updatePersonal({ email: e.target.value })} 
                error={personal.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personal.email) ? "Invalid email format" : ""}
              />
              <MinimalField label="Phone" value={personal.phone} onChange={(e) => updatePersonal({ phone: e.target.value })} />
              <MinimalField label="Location" list="locations-list" value={personal.location} onChange={(e) => updatePersonal({ location: e.target.value })} />
              <MinimalField label="Website / portfolio" value={personal.website} onChange={(e) => updatePersonal({ website: e.target.value })} />
            </div>
          </MinimalSection>

          <MinimalSection title="Professional Summary">
            <div className="flex flex-col">
              <MinimalTextArea label="A short intro about your background" rows={4} value={summary} onChange={(e) => updateActiveResume({ summary: e.target.value })} />
              <div className="flex justify-end mt-[-10px] mb-4">
                <AIEnhanceButton 
                  text={summary} 
                  role={personal.title} 
                  company="" 
                  type="summary"
                  onEnhance={(newText) => updateActiveResume({ summary: newText })} 
                />
              </div>
            </div>
          </MinimalSection>

          <MinimalSection title="Experience">
            {experience.map((exp, idx) => (
              <div key={exp.id} className="p-4 bg-gray-50 dark:bg-[#151621] rounded-xl mb-4 border border-gray-100 dark:border-gray-800 transition-colors">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role {idx + 1}</span>
                  {experience.length > 1 && (
                    <button onClick={() => removeExperience(exp.id)} className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                  <MinimalField label="Job title" list="titles-list" value={exp.role} onChange={(e) => updateExperience(exp.id, { role: e.target.value })} />
                  <MinimalField label="Company" value={exp.company} onChange={(e) => updateExperience(exp.id, { company: e.target.value })} />
                  <MonthYearPicker label="Start Date" value={exp.start} onChange={(val) => updateExperience(exp.id, { start: val })} />
                  
                  <div className="relative">
                    <MonthYearPicker 
                      label="End Date" 
                      value={exp.end} 
                      onChange={(val) => updateExperience(exp.id, { end: val })} 
                      disabled={exp.end === "Present"}
                    />
                    <label className="absolute right-0 top-0 flex items-center gap-1.5 text-[10px] text-gray-500 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={exp.end === "Present"} 
                        onChange={(e) => updateExperience(exp.id, { end: e.target.checked ? "Present" : "" })} 
                        className="w-3 h-3 cursor-pointer"
                      />
                      Current
                    </label>
                  </div>
                </div>
                
                <div className="mt-2">
                  <span className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Highlights & Achievements</span>
                  {exp.bullets.map((b, i) => (
                    <div key={i} className="flex items-start gap-2 mb-2">
                      <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 shrink-0"></div>
                      <textarea
                        value={b}
                        onChange={(e) => updateBullet(exp.id, i, e.target.value)}
                        placeholder="Led redesign of onboarding, lifting activation 18%"
                        rows={2}
                        disabled={generatingBulletId === `${exp.id}-${i}`}
                        className={`flex-1 bg-white dark:bg-[#0a0b14] border rounded-md px-3 py-1.5 text-sm text-gray-900 dark:text-gray-100 outline-none transition-all resize-y ${
                          generatingBulletId === `${exp.id}-${i}`
                            ? 'border-indigo-400 dark:border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.2)] animate-pulse bg-indigo-50/30 dark:bg-indigo-900/10'
                            : 'border-gray-200 dark:border-gray-700 focus:border-[#0066FF] dark:focus:border-[#0066FF]'
                        }`}
                      />
                      <div className="flex flex-col gap-1 mt-1">
                        <AIEnhanceButton 
                          text={b} 
                          role={exp.role} 
                          company={exp.company} 
                          onEnhance={(newText) => updateBullet(exp.id, i, newText)} 
                          onLoadingChange={(isLoading) => setGeneratingBulletId(isLoading ? `${exp.id}-${i}` : null)}
                          isLocked={!user}
                        />
                        {exp.bullets.length > 1 && (
                          <button onClick={() => removeBullet(exp.id, i)} className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 p-1 flex justify-center">
                            <X size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <button onClick={() => addBullet(exp.id)} className="text-xs font-medium text-[#0066FF] dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 mt-2 p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">
                    <Plus size={14} /> Add bullet point
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={addExperience}
              className="text-sm font-medium flex items-center gap-2 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 w-full justify-center text-gray-500 dark:text-gray-400 hover:border-[#0066FF] dark:hover:border-[#0066FF] hover:text-[#0066FF] dark:hover:text-[#0066FF] transition-colors"
            >
              <Plus size={16} /> Add Experience
            </button>
          </MinimalSection>

          <MinimalSection title="Education" defaultOpen={false}>
            {education.map((ed, idx) => (
              <div key={ed.id} className="p-4 bg-gray-50 dark:bg-[#151621] rounded-xl mb-4 border border-gray-100 dark:border-gray-800 transition-colors">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">School {idx + 1}</span>
                  {education.length > 1 && (
                    <button onClick={() => removeEducation(ed.id)} className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                  <MinimalField label="School" value={ed.school} onChange={(e) => updateEducation(ed.id, { school: e.target.value })} />
                  <MinimalField label="Degree" value={ed.degree} onChange={(e) => updateEducation(ed.id, { degree: e.target.value })} />
                  <MonthYearPicker label="Start Date" value={ed.start} onChange={(val) => updateEducation(ed.id, { start: val })} />
                  
                  <div className="relative">
                    <MonthYearPicker 
                      label="End Date" 
                      value={ed.end} 
                      onChange={(val) => updateEducation(ed.id, { end: val })} 
                      disabled={ed.end === "Present"}
                    />
                    <label className="absolute right-0 top-0 flex items-center gap-1.5 text-[10px] text-gray-500 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={ed.end === "Present"} 
                        onChange={(e) => updateEducation(ed.id, { end: e.target.checked ? "Present" : "" })} 
                        className="w-3 h-3 cursor-pointer"
                      />
                      Current
                    </label>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addEducation}
              className="text-sm font-medium flex items-center gap-2 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 w-full justify-center text-gray-500 dark:text-gray-400 hover:border-[#0066FF] dark:hover:border-[#0066FF] hover:text-[#0066FF] dark:hover:text-[#0066FF] transition-colors"
            >
              <Plus size={16} /> Add Education
            </button>
          </MinimalSection>

          <MinimalSection title="Projects" defaultOpen={false}>
            {projects.map((proj, idx) => (
              <div key={proj.id} className="p-4 bg-gray-50 dark:bg-[#151621] rounded-xl mb-4 border border-gray-100 dark:border-gray-800 transition-colors">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Project {idx + 1}</span>
                  <button onClick={() => removeProject(proj.id)} className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                  <MinimalField label="Project Name" value={proj.name} onChange={(e) => updateProject(proj.id, { name: e.target.value })} />
                  <MinimalField label="Link / URL" value={proj.link} onChange={(e) => updateProject(proj.id, { link: e.target.value })} />
                </div>
                <div className="mb-4 mt-2">
                  <MinimalField label="Short Description" value={proj.description} onChange={(e) => updateProject(proj.id, { description: e.target.value })} />
                </div>
                
                <div className="mt-2">
                  <span className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Key Highlights</span>
                  {proj.bullets.map((b, i) => (
                    <div key={i} className="flex items-start gap-2 mb-2">
                      <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 shrink-0"></div>
                      <textarea
                        value={b}
                        onChange={(e) => updateProjectBullet(proj.id, i, e.target.value)}
                        placeholder="Project accomplishment or detail"
                        rows={1}
                        className="flex-1 bg-white dark:bg-[#0a0b14] border border-gray-200 dark:border-gray-700 rounded-md px-3 py-1.5 text-sm text-gray-900 dark:text-gray-100 outline-none focus:border-[#0066FF] dark:focus:border-[#0066FF] transition-colors resize-y"
                      />
                      <div className="flex flex-col gap-1 mt-1">
                        <AIEnhanceButton 
                          text={b} 
                          role={proj.name} 
                          company="Project" 
                          onEnhance={(newText) => updateProjectBullet(proj.id, i, newText)} 
                          isLocked={!user}
                        />
                        <button onClick={() => removeProjectBullet(proj.id, i)} className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 p-1 flex justify-center">
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => addProjectBullet(proj.id)} className="text-xs font-medium text-[#0066FF] dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 mt-2 p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">
                    <Plus size={14} /> Add bullet point
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={addProject}
              className="text-sm font-medium flex items-center gap-2 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 w-full justify-center text-gray-500 dark:text-gray-400 hover:border-[#0066FF] dark:hover:border-[#0066FF] hover:text-[#0066FF] dark:hover:text-[#0066FF] transition-colors"
            >
              <Plus size={16} /> Add Project
            </button>
          </MinimalSection>

          <MinimalSection title="Certificates" defaultOpen={false}>
            {certificates.map((cert, idx) => (
              <div key={cert.id} className="p-4 bg-gray-50 dark:bg-[#151621] rounded-xl mb-4 border border-gray-100 dark:border-gray-800 transition-colors">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Certificate {idx + 1}</span>
                  <button onClick={() => removeCertificate(cert.id)} className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                  <MinimalField label="Certificate Name" value={cert.name} onChange={(e) => updateCertificate(cert.id, { name: e.target.value })} />
                  <MinimalField label="Issuer" value={cert.issuer} onChange={(e) => updateCertificate(cert.id, { issuer: e.target.value })} />
                  <MinimalField label="Date" value={cert.date} onChange={(e) => updateCertificate(cert.id, { date: e.target.value })} />
                  <MinimalField label="Link / ID" value={cert.link} onChange={(e) => updateCertificate(cert.id, { link: e.target.value })} />
                </div>
              </div>
            ))}
            <button
              onClick={addCertificate}
              className="text-sm font-medium flex items-center gap-2 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 w-full justify-center text-gray-500 dark:text-gray-400 hover:border-[#0066FF] dark:hover:border-[#0066FF] hover:text-[#0066FF] dark:hover:text-[#0066FF] transition-colors"
            >
              <Plus size={16} /> Add Certificate
            </button>
          </MinimalSection>

          <MinimalSection title="Skills" defaultOpen={false}>
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((s) => (
                <span key={s} className="flex items-center gap-1.5 bg-[#0066FF]/10 dark:bg-[#0066FF]/20 text-[#0066FF] dark:text-blue-400 font-medium text-xs px-3 py-1.5 rounded-full transition-colors">
                  {s}
                  <button onClick={() => setSkills(skills.filter((x) => x !== s))} className="hover:text-blue-800 dark:hover:text-blue-200 transition-colors">
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                list="skills-list"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
                placeholder="Type a skill, hit Enter"
                className="flex-1 bg-gray-50 dark:bg-[#0a0b14] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-gray-100 outline-none focus:border-[#0066FF] dark:focus:border-[#0066FF] focus:bg-white dark:focus:bg-[#151621] transition-colors"
              />
              <button onClick={handleAddSkill} className="px-4 bg-[#0066FF] text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">Add</button>
            </div>
          </MinimalSection>
          
          <div className="mt-8 mb-4 border-t border-gray-200 dark:border-gray-800 pt-6 px-4">
            <button
              onClick={() => {
                if (!user) {
                  setShowPaywall(true);
                  return;
                }
                setShowCoverModal(true);
              }}
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl font-medium flex items-center justify-center gap-2 shadow-sm shadow-indigo-500/25 transition-all"
            >
              <Sparkles size={18} />
              Generate Cover Letter from this Resume
            </button>
          </div>
        </>
      ) : (
        <>
          <MinimalSection title="Recipient & Date">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <MinimalField label="Recipient Name" value={coverLetter.recipient} onChange={(e) => updateCoverLetter({ recipient: e.target.value })} />
              <MinimalField label="Company" value={coverLetter.company} onChange={(e) => updateCoverLetter({ company: e.target.value })} />
              <MinimalField label="Date" value={coverLetter.date} onChange={(e) => updateCoverLetter({ date: e.target.value })} />
              <MinimalField label="Salutation" value={coverLetter.salutation} onChange={(e) => updateCoverLetter({ salutation: e.target.value })} />
            </div>
          </MinimalSection>
          <MinimalSection title="Letter Body">
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <span className="block text-xs font-medium text-gray-700 dark:text-gray-300">Main paragraphs</span>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isGeneratingCover}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-[#1a1b26] border border-gray-200 dark:border-gray-700 rounded-lg hover:border-[#0066FF] dark:hover:border-[#0066FF] hover:text-[#0066FF] dark:hover:text-[#0066FF] transition-colors shadow-sm disabled:opacity-70"
                >
                  {isGeneratingCover ? (
                    <svg className="animate-spin h-3.5 w-3.5 text-[#0066FF]" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  ) : (
                    <Upload size={14} />
                  )}
                  {isGeneratingCover ? "Generating..." : "Upload Resume PDF"}
                </button>
                <input 
                  type="file" 
                  accept=".pdf" 
                  ref={fileInputRef} 
                  style={{ display: 'none' }} 
                  onChange={handleUploadCoverLetterPDF}
                />
              </div>
              <textarea 
                rows={12} 
                value={coverLetter.body} 
                onChange={(e) => updateCoverLetter({ body: e.target.value })} 
                disabled={isGeneratingCover}
                placeholder="Write your cover letter body here..."
                className={`w-full border rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-gray-100 outline-none transition-all resize-y mb-2 ${
                  isGeneratingCover 
                    ? 'border-indigo-400 dark:border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.2)] animate-pulse bg-indigo-50/30 dark:bg-indigo-900/10'
                    : 'bg-gray-50 dark:bg-[#0a0b14] border-gray-200 dark:border-gray-700 focus:border-[#0066FF] dark:focus:border-[#0066FF]'
                }`}
              />
              <div className="flex justify-end mt-1 mb-4">
                <AIEnhanceButton 
                  text={coverLetter.body} 
                  role={personal.title} 
                  company={coverLetter.company} 
                  type="cover"
                  onEnhance={(newText) => updateCoverLetter({ body: newText })} 
                  isLocked={!user}
                />
              </div>
            </div>
            <MinimalField label="Closing" value={coverLetter.closing} onChange={(e) => updateCoverLetter({ closing: e.target.value })} />
          </MinimalSection>
        </>
      )}

      {/* Datalists for Auto-suggestions */}
      <datalist id="titles-list">
        {COMMON_TITLES.map((t) => (
          <option key={t} value={t} />
        ))}
      </datalist>
      <datalist id="locations-list">
        {COMMON_LOCATIONS.map((l) => (
          <option key={l} value={l} />
        ))}
      </datalist>
      <datalist id="skills-list">
        {COMMON_SKILLS.map((s) => (
          <option key={s} value={s} />
        ))}
      </datalist>

      {/* Target Role & Company Modal */}
      {showCoverModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-[#1a1b26] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Sparkles size={20} className="text-indigo-500" />
                  Generate Cover Letter
                </h2>
                <button onClick={() => setShowCoverModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <X size={20} />
                </button>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Where are you applying? We'll tailor the cover letter specifically for this role using your resume's data.
              </p>
              
              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Role / Job Title</label>
                  <input 
                    type="text"
                    value={coverTargetRole}
                    onChange={(e) => setCoverTargetRole(e.target.value)}
                    placeholder="e.g. Senior Product Designer"
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-[#0a0b14] outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Name</label>
                  <input 
                    type="text"
                    value={coverTargetCompany}
                    onChange={(e) => setCoverTargetCompany(e.target.value)}
                    placeholder="e.g. Google"
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-[#0a0b14] outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowCoverModal(false)}
                  className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAutoGenerateCover}
                  disabled={!coverTargetRole || !coverTargetCompany}
                  className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  Generate Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
