"use client";

import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { TypewriterResume, LedgerResume, CoverLetterPreview } from '../templates/Templates';

export default function Preview({ activeDoc, template }) {
  const { resumes, activeResumeId } = useResumeStore();
  const resume = resumes.find(r => r.id === activeResumeId);

  if (!resume) return null;

  const { personal, summary, experience, education, skills, coverLetter } = resume;

  return (
    <div className="flex justify-center h-full items-start pt-8 lg:pt-0 lg:sticky lg:top-24">
      <div className="print-paper border border-gray-200 dark:border-gray-800 shadow-xl bg-white w-full max-w-[640px] min-h-[880px] px-10 py-10 transition-all duration-300">
        {activeDoc === "resume" ? (
          template === "typewriter" ? (
            <TypewriterResume personal={personal} summary={summary} experience={experience} education={education} skills={skills} />
          ) : (
            <LedgerResume personal={personal} summary={summary} experience={experience} education={education} skills={skills} />
          )
        ) : (
          <CoverLetterPreview personal={personal} cover={coverLetter} />
        )}
      </div>
    </div>
  );
}
