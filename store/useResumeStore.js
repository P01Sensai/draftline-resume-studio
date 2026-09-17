import { create } from 'zustand';
import { temporal } from 'zundo';

const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older environments
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const emptyExperience = () => ({ id: generateId(), role: "", company: "", location: "", start: "", end: "", current: false, bullets: [""] });
export const emptyEducation = () => ({ id: generateId(), school: "", degree: "", start: "", end: "" });
export const emptyProject = () => ({ id: generateId(), name: "", description: "", link: "", bullets: [""] });
export const emptyCertificate = () => ({ id: generateId(), name: "", issuer: "", date: "", link: "" });

export const defaultResume = {
  id: generateId(),
  title: "Untitled Resume",
  template: "typewriter",
  personal: {
    name: "Jordan Avery",
    title: "Product Designer",
    email: "jordan.avery@email.com",
    phone: "+1 (555) 019-2231",
    location: "Austin, TX",
    website: "jordanavery.design",
  },
  summary: "Product designer with 6 years shaping B2B dashboards and design systems. I turn messy workflows into interfaces people actually enjoy using.",
  experience: [emptyExperience()],
  education: [emptyEducation()],
  projects: [],
  certificates: [],
  skills: ["Figma", "Design Systems", "User Research"],
  coverLetter: {
    recipient: "Hiring Manager",
    company: "Acme Co.",
    date: "August 27, 2026",
    salutation: "Dear Hiring Manager,",
    body: "I'm writing to apply for the Product Designer role at Acme Co. In my current role I lead the design of our internal analytics suite, and I'd bring that same focus on clarity and craft to your team.\n\nI'd welcome the chance to talk about how my background fits what you're building.",
    closing: "Sincerely,",
  },
  updatedAt: new Date().toISOString(),
};

export const blankResume = {
  id: generateId(),
  title: "Untitled Resume",
  template: "typewriter",
  personal: {
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
  },
  summary: "",
  experience: [],
  education: [],
  projects: [],
  certificates: [],
  skills: [],
  coverLetter: {
    recipient: "",
    company: "",
    date: "",
    salutation: "",
    body: "",
    closing: "",
  },
  updatedAt: new Date().toISOString(),
};

export const useResumeStore = create(
  temporal(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      theme: 'light',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      resumes: [defaultResume],
      activeResumeId: defaultResume.id,
      isCloudSyncing: true,
      
      // Global Modals
      showPaywallModal: false,
      setShowPaywallModal: (show) => set({ showPaywallModal: show }),
      showSessionExpiredModal: false,
      setShowSessionExpiredModal: (show) => set({ showSessionExpiredModal: show }),

      // Dashboard Actions
      setStoreState: (newState) => set(newState),
      setActiveResume: (id) => set({ activeResumeId: id }),
      createResume: () => {
        const newResume = { ...defaultResume, id: generateId(), updatedAt: new Date().toISOString() };
        set((state) => ({
          resumes: [...state.resumes, newResume],
          activeResumeId: newResume.id
        }));
      },
      createBlankResume: () => {
        const newResume = { ...blankResume, id: generateId(), updatedAt: new Date().toISOString() };
        set((state) => ({
          resumes: [...state.resumes, newResume],
          activeResumeId: newResume.id
        }));
      },
      importResume: (parsedData) => {
        const newResume = { 
          ...blankResume, 
          id: generateId(),
          title: `${parsedData.personal?.name || 'Imported'} Resume`,
          ...parsedData,
          updatedAt: new Date().toISOString() 
        };
        set((state) => ({
          resumes: [...state.resumes, newResume],
          activeResumeId: newResume.id
        }));
      },
      deleteResume: (id) => set((state) => {
        const remaining = state.resumes.filter(r => r.id !== id);
        return {
          resumes: remaining,
          activeResumeId: state.activeResumeId === id 
            ? (remaining[0]?.id || null) 
            : state.activeResumeId
        };
      }),

      // Builder Actions (Updates the active resume)
      updateActiveResume: (patch) => set((state) => ({
        resumes: state.resumes.map(r => 
          r.id === state.activeResumeId 
            ? { ...r, ...patch, updatedAt: new Date().toISOString() } 
            : r
        )
      })),
      
      updatePersonal: (patch) => set((state) => ({
        resumes: state.resumes.map(r => 
          r.id === state.activeResumeId 
            ? { ...r, personal: { ...r.personal, ...patch }, updatedAt: new Date().toISOString() } 
            : r
        )
      })),

      updateCoverLetter: (patch) => set((state) => ({
        resumes: state.resumes.map(r => 
          r.id === state.activeResumeId 
            ? { ...r, coverLetter: { ...r.coverLetter, ...patch }, updatedAt: new Date().toISOString() } 
            : r
        )
      })),

      updateExperience: (expId, patch) => set((state) => ({
        resumes: state.resumes.map(r => 
          r.id === state.activeResumeId 
            ? {
                ...r,
                experience: r.experience.map(e => e.id === expId ? { ...e, ...patch } : e),
                updatedAt: new Date().toISOString()
              }
            : r
        )
      })),

      addExperience: () => set((state) => ({
        resumes: state.resumes.map(r => 
          r.id === state.activeResumeId 
            ? { ...r, experience: [...r.experience, emptyExperience()], updatedAt: new Date().toISOString() } 
            : r
        )
      })),

      removeExperience: (expId) => set((state) => ({
        resumes: state.resumes.map(r => 
          r.id === state.activeResumeId 
            ? { ...r, experience: r.experience.filter(e => e.id !== expId), updatedAt: new Date().toISOString() } 
            : r
        )
      })),

      updateBullet: (expId, index, value) => set((state) => ({
        resumes: state.resumes.map(r => 
          r.id === state.activeResumeId 
            ? {
                ...r,
                experience: r.experience.map(e => e.id === expId ? {
                  ...e,
                  bullets: e.bullets.map((b, i) => i === index ? value : b)
                } : e),
                updatedAt: new Date().toISOString()
              }
            : r
        )
      })),

      addBullet: (expId) => set((state) => ({
        resumes: state.resumes.map(r => 
          r.id === state.activeResumeId 
            ? {
                ...r,
                experience: r.experience.map(e => e.id === expId ? { ...e, bullets: [...e.bullets, ""] } : e),
                updatedAt: new Date().toISOString()
              }
            : r
        )
      })),

      removeBullet: (expId, index) => set((state) => ({
        resumes: state.resumes.map(r => 
          r.id === state.activeResumeId 
            ? {
                ...r,
                experience: r.experience.map(e => e.id === expId ? {
                  ...e,
                  bullets: e.bullets.filter((_, i) => i !== index)
                } : e),
                updatedAt: new Date().toISOString()
              }
            : r
        )
      })),

      updateEducation: (eduId, patch) => set((state) => ({
        resumes: state.resumes.map(r => 
          r.id === state.activeResumeId 
            ? {
                ...r,
                education: r.education.map(e => e.id === eduId ? { ...e, ...patch } : e),
                updatedAt: new Date().toISOString()
              }
            : r
        )
      })),

      addEducation: () => set((state) => ({
        resumes: state.resumes.map(r => 
          r.id === state.activeResumeId 
            ? { ...r, education: [...r.education, emptyEducation()], updatedAt: new Date().toISOString() } 
            : r
        )
      })),

      removeEducation: (eduId) => set((state) => ({
        resumes: state.resumes.map(r => 
          r.id === state.activeResumeId 
            ? { ...r, education: r.education.filter(e => e.id !== eduId), updatedAt: new Date().toISOString() } 
            : r
        )
      })),

      // Projects
      updateProject: (projId, patch) => set((state) => ({
        resumes: state.resumes.map(r => 
          r.id === state.activeResumeId 
            ? {
                ...r,
                projects: (r.projects || []).map(p => p.id === projId ? { ...p, ...patch } : p),
                updatedAt: new Date().toISOString()
              }
            : r
        )
      })),
      addProject: () => set((state) => ({
        resumes: state.resumes.map(r => 
          r.id === state.activeResumeId 
            ? { ...r, projects: [...(r.projects || []), emptyProject()], updatedAt: new Date().toISOString() } 
            : r
        )
      })),
      removeProject: (projId) => set((state) => ({
        resumes: state.resumes.map(r => 
          r.id === state.activeResumeId 
            ? { ...r, projects: (r.projects || []).filter(p => p.id !== projId), updatedAt: new Date().toISOString() } 
            : r
        )
      })),
      updateProjectBullet: (projId, index, value) => set((state) => ({
        resumes: state.resumes.map(r => 
          r.id === state.activeResumeId 
            ? {
                ...r,
                projects: (r.projects || []).map(p => p.id === projId ? {
                  ...p,
                  bullets: p.bullets.map((b, i) => i === index ? value : b)
                } : p),
                updatedAt: new Date().toISOString()
              }
            : r
        )
      })),
      addProjectBullet: (projId) => set((state) => ({
        resumes: state.resumes.map(r => 
          r.id === state.activeResumeId 
            ? {
                ...r,
                projects: (r.projects || []).map(p => p.id === projId ? { ...p, bullets: [...p.bullets, ""] } : p),
                updatedAt: new Date().toISOString()
              }
            : r
        )
      })),
      removeProjectBullet: (projId, index) => set((state) => ({
        resumes: state.resumes.map(r => 
          r.id === state.activeResumeId 
            ? {
                ...r,
                projects: (r.projects || []).map(p => p.id === projId ? {
                  ...p,
                  bullets: p.bullets.filter((_, i) => i !== index)
                } : p),
                updatedAt: new Date().toISOString()
              }
            : r
        )
      })),

      // Certificates
      updateCertificate: (certId, patch) => set((state) => ({
        resumes: state.resumes.map(r => 
          r.id === state.activeResumeId 
            ? {
                ...r,
                certificates: (r.certificates || []).map(c => c.id === certId ? { ...c, ...patch } : c),
                updatedAt: new Date().toISOString()
              }
            : r
        )
      })),
      addCertificate: () => set((state) => ({
        resumes: state.resumes.map(r => 
          r.id === state.activeResumeId 
            ? { ...r, certificates: [...(r.certificates || []), emptyCertificate()], updatedAt: new Date().toISOString() } 
            : r
        )
      })),
      removeCertificate: (certId) => set((state) => ({
        resumes: state.resumes.map(r => 
          r.id === state.activeResumeId 
            ? { ...r, certificates: (r.certificates || []).filter(c => c.id !== certId), updatedAt: new Date().toISOString() } 
            : r
        )
      })),
      
      setSkills: (skills) => set((state) => ({
        resumes: state.resumes.map(r => 
          r.id === state.activeResumeId 
            ? { ...r, skills, updatedAt: new Date().toISOString() } 
            : r
        )
      })),
    }),
    {
      partialize: (state) => ({ resumes: state.resumes, activeResumeId: state.activeResumeId }),
      limit: 50,
    }
  )
);
