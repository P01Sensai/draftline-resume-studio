import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

export function ContactLine({ personal }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-black/70 mt-1 font-mono">
      {personal.email && <span className="flex items-center gap-1"><Mail size={11} />{personal.email}</span>}
      {personal.phone && <span className="flex items-center gap-1"><Phone size={11} />{personal.phone}</span>}
      {personal.location && <span className="flex items-center gap-1"><MapPin size={11} />{personal.location}</span>}
      {personal.website && <span className="flex items-center gap-1"><Globe size={11} />{personal.website}</span>}
    </div>
  );
}

export function TypewriterResume({ personal, summary, experience, education, projects = [], certificates = [], skills }) {
  return (
    <div className="text-black font-type">
      <h1 className="text-[22px] leading-tight font-bold uppercase tracking-tight">{personal.name}</h1>
      <p className="text-[11px] tracking-[0.15em] uppercase font-mono mt-0.5">{personal.title}</p>
      <ContactLine personal={personal} />
      <div className="h-[1.5px] bg-black my-2.5" />
      <p className="text-[11.5px] leading-snug mb-3 font-mono">{summary}</p>

      {experience.length > 0 && <h2 className="text-[11px] tracking-[0.2em] uppercase font-bold font-mono mb-1.5 border-b border-black pb-0.5">Experience</h2>}
      {experience.map((exp) => (
        <div key={exp.id} className="mb-2.5">
          <div className="flex justify-between items-baseline">
            <span className="text-[12px] font-bold">{exp.role || "Role"} <span className="font-normal">— {exp.company || "Company"}</span></span>
            <span className="text-[10px] font-mono whitespace-nowrap ml-2">{exp.start} – {exp.end}</span>
          </div>
          <ul className="mt-0.5 space-y-0.5">
            {exp.bullets.filter(Boolean).map((b, i) => (
              <li key={i} className="text-[11px] leading-snug font-mono pl-3 relative before:content-['*'] before:absolute before:left-0">{b}</li>
            ))}
          </ul>
        </div>
      ))}

      {projects.length > 0 && <h2 className="text-[11px] tracking-[0.2em] uppercase font-bold font-mono mb-1.5 mt-2.5 border-b border-black pb-0.5">Projects</h2>}
      {projects.map((proj) => (
        <div key={proj.id} className="mb-2.5">
          <div className="flex justify-between items-baseline">
            <span className="text-[12px] font-bold">{proj.name || "Project Name"} {proj.link && <span className="font-normal">— {proj.link}</span>}</span>
          </div>
          {proj.description && <p className="text-[11px] leading-snug font-mono mt-0.5 mb-0.5">{proj.description}</p>}
          <ul className="mt-0.5 space-y-0.5">
            {proj.bullets.filter(Boolean).map((b, i) => (
              <li key={i} className="text-[11px] leading-snug font-mono pl-3 relative before:content-['*'] before:absolute before:left-0">{b}</li>
            ))}
          </ul>
        </div>
      ))}

      {education.length > 0 && <h2 className="text-[11px] tracking-[0.2em] uppercase font-bold font-mono mb-1.5 mt-2.5 border-b border-black pb-0.5">Education</h2>}
      {education.map((ed) => (
        <div key={ed.id} className="flex justify-between items-baseline mb-1 text-[11.5px]">
          <span>{ed.degree || "Degree"} — {ed.school || "School"}</span>
          <span className="text-[10px] font-mono">{ed.start} – {ed.end}</span>
        </div>
      ))}

      {certificates.length > 0 && <h2 className="text-[11px] tracking-[0.2em] uppercase font-bold font-mono mb-1.5 mt-2.5 border-b border-black pb-0.5">Certificates</h2>}
      {certificates.map((cert) => (
        <div key={cert.id} className="flex justify-between items-baseline mb-1 text-[11.5px]">
          <span>{cert.name || "Certificate"} — {cert.issuer || "Issuer"}</span>
          <span className="text-[10px] font-mono">{cert.date}</span>
        </div>
      ))}

      {skills.length > 0 && <h2 className="text-[11px] tracking-[0.2em] uppercase font-bold font-mono mb-1.5 mt-2.5 border-b border-black pb-0.5">Skills</h2>}
      {skills.length > 0 && <p className="text-[11px] leading-snug font-mono">{skills.join("  /  ")}</p>}
    </div>
  );
}

export function LedgerResume({ personal, summary, experience, education, projects = [], certificates = [], skills }) {
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

      {experience.length > 0 && (
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
      )}

      {projects.length > 0 && (
        <table className="w-full text-[12px] mb-4 border-collapse">
          <thead>
            <tr className="border-b border-black">
              <th className="text-left py-1 font-bold uppercase text-[10px] tracking-wider w-[40%]">Project</th>
              <th className="text-left py-1 font-bold uppercase text-[10px] tracking-wider">Description</th>
              <th className="text-right py-1 font-bold uppercase text-[10px] tracking-wider w-[25%]">Link</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((proj) => (
              <React.Fragment key={proj.id}>
                <tr className="border-b border-black/20">
                  <td className="py-1.5 font-bold align-top">{proj.name || "Project Name"}</td>
                  <td className="py-1.5 align-top">{proj.description}</td>
                  <td className="py-1.5 text-right align-top break-all">{proj.link}</td>
                </tr>
                {proj.bullets.length > 0 && proj.bullets.some(Boolean) && (
                  <tr className="border-b border-black/20">
                    <td colSpan={3} className="pb-2">
                      <ul>
                        {proj.bullets.filter(Boolean).map((b, i) => (
                          <li key={i} className="pl-3 relative before:content-['—'] before:absolute before:left-0">{b}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}

      <div className="grid grid-cols-2 gap-4">
        {education.length > 0 && (
          <div>
            <div className="font-bold uppercase text-[10px] tracking-wider border-b border-black mb-1 pb-1">Education</div>
            {education.map((ed) => (
              <div key={ed.id} className="text-[12px] mb-1">
                <div className="font-bold">{ed.degree || "Degree"}</div>
                <div>{ed.school || "School"} · {ed.start}–{ed.end}</div>
              </div>
            ))}
          </div>
        )}
        
        <div>
          {certificates.length > 0 && (
            <div className="mb-3">
              <div className="font-bold uppercase text-[10px] tracking-wider border-b border-black mb-1 pb-1">Certificates</div>
              {certificates.map((cert) => (
                <div key={cert.id} className="text-[12px] mb-1">
                  <div className="font-bold">{cert.name || "Certificate"}</div>
                  <div>{cert.issuer || "Issuer"} · {cert.date}</div>
                </div>
              ))}
            </div>
          )}

          {skills.length > 0 && (
            <div>
              <div className="font-bold uppercase text-[10px] tracking-wider border-b border-black mb-1 pb-1">Skills</div>
              <div className="text-[12px]">{skills.join(", ")}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function CoverLetterPreview({ personal, cover }) {
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
