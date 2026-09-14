"use client";

import React, { useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import { useResumeStore } from '@/store/useResumeStore';
import { MinimalField, MinimalTextArea, MonthYearPicker } from '../ui/FormFields';
import { MinimalSection } from '../ui/MinimalSection';
import AIEnhanceButton from './AIEnhanceButton';
import { COMMON_SKILLS, COMMON_TITLES, COMMON_LOCATIONS } from '@/lib/suggestions';

export default function Editor({ activeDoc }) {
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
    setSkills,
    updateCoverLetter,
  } = useResumeStore();

  const resume = resumes.find(r => r.id === activeResumeId);
  const [skillInput, setSkillInput] = useState("");

  if (!resume) return <div className="p-8 text-gray-500">No active resume.</div>;

  const { personal, summary, experience, education, skills, coverLetter } = resume;

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <MinimalField label="Full name" value={personal.name} onChange={(e) => updatePersonal({ name: e.target.value })} />
              <MinimalField label="Title / role" list="titles-list" value={personal.title} onChange={(e) => updatePersonal({ title: e.target.value })} />
              <MinimalField label="Email" value={personal.email} onChange={(e) => updatePersonal({ email: e.target.value })} />
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
                        className="flex-1 bg-white dark:bg-[#0a0b14] border border-gray-200 dark:border-gray-700 rounded-md px-3 py-1.5 text-sm text-gray-900 dark:text-gray-100 outline-none focus:border-[#0066FF] dark:focus:border-[#0066FF] transition-colors resize-y"
                      />
                      <div className="flex flex-col gap-1 mt-1">
                        <AIEnhanceButton 
                          text={b} 
                          role={exp.role} 
                          company={exp.company} 
                          onEnhance={(newText) => updateBullet(exp.id, i, newText)} 
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
            <MinimalTextArea label="Main paragraphs" rows={12} value={coverLetter.body} onChange={(e) => updateCoverLetter({ body: e.target.value })} />
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
    </div>
  );
}
