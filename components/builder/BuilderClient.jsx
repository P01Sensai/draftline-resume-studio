"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Trash2,
  Download,
  FileText,
  Mail,
  Sparkles,
  Lock,
  ChevronDown,
  ChevronUp,
  X,
  MapPin,
  Phone,
  Globe,
  ArrowLeft,
} from "lucide-react";

let idCounter = 1;
const uid = () => idCounter++;
const emptyExperience = () => ({ id: uid(), role: "", company: "", location: "", start: "", end: "", current: false, bullets: [""] });
const emptyEducation = () => ({ id: uid(), school: "", degree: "", start: "", end: "" });

// ---------- retro form atoms ----------
function RField({ label, ...props }) {
  return (
    <label className="block mb-3">
      <span className="block text-[10px] uppercase tracking-[0.12em] font-semibold text-black/60 mb-1 font-mono">
        {label}
      </span>
      <input
        {...props}
        className="w-full border border-black bg-white px-3 py-2 text-sm text-black outline-none focus:bg-black focus:text-white transition placeholder:text-black/35"
      />
    </label>
  );
}

function RTextArea({ label, ...props }) {
  return (
    <label className="block mb-3">
      <span className="block text-[10px] uppercase tracking-[0.12em] font-semibold text-black/60 mb-1 font-mono">
        {label}
      </span>
      <textarea
        {...props}
        className="w-full border border-black bg-white px-3 py-2 text-sm text-black outline-none focus:bg-black focus:text-white transition resize-y placeholder:text-black/35"
      />
    </label>
  );
}

function RSection({ title, index, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-black mb-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-left bg-white hover:bg-black hover:text-white transition group"
      >
        <div>
          <div className="text-[10px] tracking-[0.2em] uppercase font-mono opacity-60">{index}</div>
          <div className="text-[15px] font-bold font-type">{title}</div>
        </div>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && <div className="px-4 pb-4 pt-3 border-t border-black">{children}</div>}
    </div>
  );
}

function ContactLine({ personal }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-black/70 mt-1 font-mono">
      <span className="flex items-center gap-1"><Mail size={11} />{personal.email}</span>
      <span className="flex items-center gap-1"><Phone size={11} />{personal.phone}</span>
      <span className="flex items-center gap-1"><MapPin size={11} />{personal.location}</span>
      {personal.website && <span className="flex items-center gap-1"><Globe size={11} />{personal.website}</span>}
    </div>
  );
}

// ---------- preview templates ----------
function TypewriterResume({ personal, summary, experience, education, skills }) {
  return (
    <div className="text-black font-type">
      <h1 className="text-[26px] leading-tight font-bold uppercase tracking-tight">{personal.name}</h1>
      <p className="text-[12px] tracking-[0.15em] uppercase font-mono mt-0.5">{personal.title}</p>
      <ContactLine personal={personal} />
      <div className="h-[2px] bg-black my-4" />
      <p className="text-[12.5px] leading-relaxed mb-5 font-mono">{summary}</p>

      <h2 className="text-[11px] tracking-[0.2em] uppercase font-bold font-mono mb-2 border-b border-black pb-1">Experience</h2>
      {experience.map((exp) => (
        <div key={exp.id} className="mb-4">
          <div className="flex justify-between items-baseline">
            <span className="text-[13.5px] font-bold">{exp.role || "Role"} <span className="font-normal">— {exp.company || "Company"}</span></span>
            <span className="text-[10.5px] font-mono whitespace-nowrap ml-2">{exp.start} – {exp.end}</span>
          </div>
          <ul className="mt-1 space-y-1">
            {exp.bullets.filter(Boolean).map((b, i) => (
              <li key={i} className="text-[12px] font-mono pl-3 relative before:content-['*'] before:absolute before:left-0">{b}</li>
            ))}
          </ul>
        </div>
      ))}

      <h2 className="text-[11px] tracking-[0.2em] uppercase font-bold font-mono mb-2 mt-4 border-b border-black pb-1">Education</h2>
      {education.map((ed) => (
        <div key={ed.id} className="flex justify-between items-baseline mb-1.5 text-[12.5px]">
          <span>{ed.degree || "Degree"} — {ed.school || "School"}</span>
          <span className="text-[10.5px] font-mono">{ed.start} – {ed.end}</span>
        </div>
      ))}

      <h2 className="text-[11px] tracking-[0.2em] uppercase font-bold font-mono mb-2 mt-4 border-b border-black pb-1">Skills</h2>
      <p className="text-[12px] font-mono">{skills.join("  /  ")}</p>
    </div>
  );
}

function LedgerResume({ personal, summary, experience, education, skills }) {
  return (
    <div className="text-black font-mono">
      <div className="flex justify-between items-end border-b-2 border-black pb-2 mb-4">
        <div>
          <h1 className="text-[24px] font-bold font-type uppercase">{personal.name}</h1>
          <p className="text-[11px] uppercase tracking-[0.15em]">{personal.title}</p>
        </div>
        <div className="text-right text-[10.5px] leading-tight">
          <div>{personal.email}</div>
          <div>{personal.phone}</div>
          <div>{personal.location}</div>
        </div>
      </div>

      <p className="text-[12px] leading-relaxed mb-4 italic">{summary}</p>

      <table className="w-full text-[12px] mb-4 border-collapse">
        <thead>
          <tr className="border-b border-black">
            <th className="text-left py-1 font-bold uppercase text-[10px] tracking-wider">Role</th>
            <th className="text-left py-1 font-bold uppercase text-[10px] tracking-wider">Company</th>
            <th className="text-right py-1 font-bold uppercase text-[10px] tracking-wider">Dates</th>
          </tr>
        </thead>
        <tbody>
          {experience.map((exp) => (
            <React.Fragment key={exp.id}>
              <tr className="border-b border-black/20">
                <td className="py-1.5 font-bold align-top">{exp.role || "Role"}</td>
                <td className="py-1.5 align-top">{exp.company || "Company"}</td>
                <td className="py-1.5 text-right align-top whitespace-nowrap">{exp.start}–{exp.end}</td>
              </tr>
              <tr className="border-b border-black/20">
                <td colSpan={3} className="pb-2">
                  <ul>
                    {exp.bullets.filter(Boolean).map((b, i) => (
                      <li key={i} className="pl-3 relative before:content-['—'] before:absolute before:left-0">{b}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="font-bold uppercase text-[10px] tracking-wider border-b border-black mb-1 pb-1">Education</div>
          {education.map((ed) => (
            <div key={ed.id} className="text-[12px] mb-1">
              <div className="font-bold">{ed.degree || "Degree"}</div>
              <div>{ed.school || "School"} · {ed.start}–{ed.end}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="font-bold uppercase text-[10px] tracking-wider border-b border-black mb-1 pb-1">Skills</div>
          <div className="text-[12px]">{skills.join(", ")}</div>
        </div>
      </div>
    </div>
  );
}

function CoverLetterPreview({ personal, cover }) {
  return (
    <div className="text-black font-mono">
      <h1 className="text-[20px] font-type font-bold uppercase">{personal.name}</h1>
      <ContactLine personal={personal} />
      <div className="h-[2px] bg-black my-5" />
      <p className="text-[11.5px] mb-4">{cover.date}</p>
      <p className="text-[12.5px] mb-1">{cover.recipient}</p>
      <p className="text-[12.5px] mb-4">{cover.company}</p>
      <p className="text-[12.5px] mb-4">{cover.salutation}</p>
      <div className="text-[12.5px] leading-relaxed whitespace-pre-line mb-4">{cover.body}</div>
      <p className="text-[12.5px]">{cover.closing}</p>
      <p className="text-[12.5px] mt-6 font-type font-bold">{personal.name}</p>
    </div>
  );
}

// ---------- main builder ----------
export default function BuilderClient() {
  const [activeDoc, setActiveDoc] = useState("resume");
  const [template, setTemplate] = useState("typewriter");
  const [showFuture, setShowFuture] = useState(false);

  const [personal, setPersonal] = useState({
    name: "Jordan Avery",
    title: "Product Designer",
    email: "jordan.avery@email.com",
    phone: "+1 (555) 019-2231",
    location: "Austin, TX",
    website: "jordanavery.design",
  });
  const [summary, setSummary] = useState(
    "Product designer with 6 years shaping B2B dashboards and design systems. I turn messy workflows into interfaces people actually enjoy using."
  );
  const [experience, setExperience] = useState([emptyExperience()]);
  const [education, setEducation] = useState([emptyEducation()]);
  const [skills, setSkills] = useState(["Figma", "Design Systems", "User Research"]);
  const [skillInput, setSkillInput] = useState("");
  const [cover, setCover] = useState({
    recipient: "Hiring Manager",
    company: "Acme Co.",
    date: "August 27, 2026",
    salutation: "Dear Hiring Manager,",
    body:
      "I'm writing to apply for the Product Designer role at Acme Co. In my current role I lead the design of our internal analytics suite, and I'd bring that same focus on clarity and craft to your team.\n\nI'd welcome the chance to talk about how my background fits what you're building.",
    closing: "Sincerely,",
  });

  const updateExperience = (id, patch) => setExperience((l) => l.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  const updateBullet = (expId, i, v) => setExperience((l) => l.map((e) => (e.id === expId ? { ...e, bullets: e.bullets.map((b, idx) => (idx === i ? v : b)) } : e)));
  const addBullet = (expId) => setExperience((l) => l.map((e) => (e.id === expId ? { ...e, bullets: [...e.bullets, ""] } : e)));
  const removeBullet = (expId, i) => setExperience((l) => l.map((e) => (e.id === expId ? { ...e, bullets: e.bullets.filter((_, idx) => idx !== i) } : e)));
  const updateEducation = (id, patch) => setEducation((l) => l.map((ed) => (ed.id === id ? { ...ed, ...patch } : ed)));
  const addSkill = () => {
    const v = skillInput.trim();
    if (v && !skills.includes(v)) setSkills((s) => [...s, v]);
    setSkillInput("");
  };
  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen w-full bg-white font-body">
      {/* top bar */}
      <div className="no-print sticky top-0 z-20 bg-black text-white border-b border-black">
        <div className="max-w-[1400px] mx-auto px-5 py-3 flex items-center justify-between gap-4 flex-wrap font-mono">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition">
            <ArrowLeft size={14} /> Home
          </Link>

          <div className="flex items-center gap-1 border border-white/30 p-1">
            <button
              onClick={() => setActiveDoc("resume")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition ${activeDoc === "resume" ? "bg-white text-black" : "text-white/70 hover:text-white"}`}
            >
              <FileText size={14} /> Resume
            </button>
            <button
              onClick={() => setActiveDoc("cover")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition ${activeDoc === "cover" ? "bg-white text-black" : "text-white/70 hover:text-white"}`}
            >
              <Mail size={14} /> Cover Letter
            </button>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="bg-black border border-white/30 text-white text-sm px-2 py-1.5 outline-none"
            >
              <option className="text-black" value="typewriter">Typewriter</option>
              <option className="text-black" value="ledger">Ledger</option>
            </select>
            <button
              onClick={() => setShowFuture((s) => !s)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium border border-white/30 hover:bg-white hover:text-black transition"
            >
              <Sparkles size={14} /> What's next
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold bg-white text-black hover:bg-white/85 transition"
            >
              <Download size={14} /> Download PDF
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 px-5 py-6">
        {/* editor */}
        <div className="no-print font-body">
          {activeDoc === "resume" ? (
            <>
              <RSection index="01 / BASICS" title="Personal details">
                <div className="grid grid-cols-2 gap-x-3">
                  <RField label="Full name" value={personal.name} onChange={(e) => setPersonal({ ...personal, name: e.target.value })} />
                  <RField label="Title / role" value={personal.title} onChange={(e) => setPersonal({ ...personal, title: e.target.value })} />
                  <RField label="Email" value={personal.email} onChange={(e) => setPersonal({ ...personal, email: e.target.value })} />
                  <RField label="Phone" value={personal.phone} onChange={(e) => setPersonal({ ...personal, phone: e.target.value })} />
                  <RField label="Location" value={personal.location} onChange={(e) => setPersonal({ ...personal, location: e.target.value })} />
                  <RField label="Website / portfolio" value={personal.website} onChange={(e) => setPersonal({ ...personal, website: e.target.value })} />
                </div>
              </RSection>

              <RSection index="02 / PITCH" title="Summary">
                <RTextArea label="A 2–3 sentence intro" rows={4} value={summary} onChange={(e) => setSummary(e.target.value)} />
              </RSection>

              <RSection index="03 / HISTORY" title="Experience">
                {experience.map((exp, idx) => (
                  <div key={exp.id} className="border border-black/30 p-3 mb-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold font-mono">ROLE {idx + 1}</span>
                      {experience.length > 1 && (
                        <button onClick={() => setExperience((l) => l.filter((e) => e.id !== exp.id))} className="hover:opacity-60">
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-x-3">
                      <RField label="Job title" value={exp.role} onChange={(e) => updateExperience(exp.id, { role: e.target.value })} />
                      <RField label="Company" value={exp.company} onChange={(e) => updateExperience(exp.id, { company: e.target.value })} />
                      <RField label="Start" placeholder="Jan 2022" value={exp.start} onChange={(e) => updateExperience(exp.id, { start: e.target.value })} />
                      <RField label="End" placeholder="Present" value={exp.end} onChange={(e) => updateExperience(exp.id, { end: e.target.value })} />
                    </div>
                    <span className="block text-[10px] uppercase tracking-[0.12em] font-semibold font-mono mb-1 mt-1">Highlights</span>
                    {exp.bullets.map((b, i) => (
                      <div key={i} className="flex items-start gap-2 mb-1.5">
                        <span className="mt-2 text-xs font-mono">*</span>
                        <input
                          value={b}
                          onChange={(e) => updateBullet(exp.id, i, e.target.value)}
                          placeholder="Led redesign of onboarding, lifting activation 18%"
                          className="flex-1 border border-black px-3 py-1.5 text-sm outline-none focus:bg-black focus:text-white"
                        />
                        {exp.bullets.length > 1 && (
                          <button onClick={() => removeBullet(exp.id, i)} className="mt-1.5 hover:opacity-60">
                            <X size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button onClick={() => addBullet(exp.id)} className="text-xs font-bold font-mono flex items-center gap-1 mt-1">
                      <Plus size={12} /> Add highlight
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => setExperience((l) => [...l, emptyExperience()])}
                  className="text-sm font-medium flex items-center gap-1.5 border border-dashed border-black px-3 py-2 w-full justify-center hover:bg-black hover:text-white transition font-mono"
                >
                  <Plus size={14} /> Add another role
                </button>
              </RSection>

              <RSection index="04 / SCHOOL" title="Education" defaultOpen={false}>
                {education.map((ed, idx) => (
                  <div key={ed.id} className="border border-black/30 p-3 mb-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold font-mono">SCHOOL {idx + 1}</span>
                      {education.length > 1 && (
                        <button onClick={() => setEducation((l) => l.filter((e) => e.id !== ed.id))} className="hover:opacity-60">
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-x-3">
                      <RField label="School" value={ed.school} onChange={(e) => updateEducation(ed.id, { school: e.target.value })} />
                      <RField label="Degree" value={ed.degree} onChange={(e) => updateEducation(ed.id, { degree: e.target.value })} />
                      <RField label="Start" value={ed.start} onChange={(e) => updateEducation(ed.id, { start: e.target.value })} />
                      <RField label="End" value={ed.end} onChange={(e) => updateEducation(ed.id, { end: e.target.value })} />
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => setEducation((l) => [...l, emptyEducation()])}
                  className="text-sm font-medium flex items-center gap-1.5 border border-dashed border-black px-3 py-2 w-full justify-center hover:bg-black hover:text-white transition font-mono"
                >
                  <Plus size={14} /> Add another school
                </button>
              </RSection>

              <RSection index="05 / SKILLS" title="Skills" defaultOpen={false}>
                <div className="flex flex-wrap gap-2 mb-2">
                  {skills.map((s) => (
                    <span key={s} className="flex items-center gap-1 bg-black text-white text-xs px-2.5 py-1 font-mono">
                      {s}
                      <button onClick={() => setSkills((k) => k.filter((x) => x !== s))}>
                        <X size={11} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                    placeholder="Type a skill, hit Enter"
                    className="flex-1 border border-black px-3 py-2 text-sm outline-none focus:bg-black focus:text-white"
                  />
                  <button onClick={addSkill} className="px-3 bg-black text-white text-sm font-medium font-mono">Add</button>
                </div>
              </RSection>
            </>
          ) : (
            <>
              <RSection index="01 / TO" title="Recipient & date">
                <div className="grid grid-cols-2 gap-x-3">
                  <RField label="Recipient" value={cover.recipient} onChange={(e) => setCover({ ...cover, recipient: e.target.value })} />
                  <RField label="Company" value={cover.company} onChange={(e) => setCover({ ...cover, company: e.target.value })} />
                  <RField label="Date" value={cover.date} onChange={(e) => setCover({ ...cover, date: e.target.value })} />
                  <RField label="Salutation" value={cover.salutation} onChange={(e) => setCover({ ...cover, salutation: e.target.value })} />
                </div>
              </RSection>
              <RSection index="02 / LETTER" title="Body">
                <RTextArea label="Main paragraphs" rows={10} value={cover.body} onChange={(e) => setCover({ ...cover, body: e.target.value })} />
                <RField label="Closing" value={cover.closing} onChange={(e) => setCover({ ...cover, closing: e.target.value })} />
              </RSection>
            </>
          )}

          {showFuture && (
            <div className="border border-dashed border-black p-4 mt-2">
              <div className="text-[10px] tracking-[0.2em] uppercase font-bold font-mono mb-2">
                On the roadmap — not built yet
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "AI bullet-point rewriting",
                  "Job description keyword matcher",
                  "Multiple saved profiles",
                  "More templates",
                  "AI-drafted cover letters",
                  "Account sync across devices",
                ].map((f) => (
                  <div key={f} className="flex items-center gap-2 px-3 py-2 border border-black/30 text-sm font-mono">
                    <Lock size={13} className="shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* preview */}
        <div className="flex justify-center lg:sticky lg:top-20 self-start">
          <div className="print-paper border-2 border-black bg-white w-full max-w-[640px] min-h-[880px] px-10 py-10">
            {activeDoc === "resume" ? (
              template === "typewriter" ? (
                <TypewriterResume personal={personal} summary={summary} experience={experience} education={education} skills={skills} />
              ) : (
                <LedgerResume personal={personal} summary={summary} experience={experience} education={education} skills={skills} />
              )
            ) : (
              <CoverLetterPreview personal={personal} cover={cover} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
