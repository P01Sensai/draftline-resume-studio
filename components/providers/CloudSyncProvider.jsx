"use client";

import { useEffect, useRef, useState, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { useResumeStore, defaultResume } from '@/store/useResumeStore';

export default function CloudSyncProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = useMemo(() => createClient(), []);
  
  const resumes = useResumeStore((state) => state.resumes);
  const activeResumeId = useResumeStore((state) => state.activeResumeId);
  const setStoreState = useResumeStore((state) => state.setStoreState);
  const setUser = useResumeStore((state) => state.setUser);
  
  const [isInitializing, setIsInitializing] = useState(true);
  const prevResumesRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    async function initializeCloud() {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session && pathname !== '/login') {
        router.push('/login');
        return;
      }
      
      if (session && pathname === '/login') {
        router.push('/');
      }

      if (session) {
        const { data, error } = await supabase
          .from('resumes')
          .select('*')
          .order('updated_at', { ascending: false });

        if (!error && data && isMounted) {
          setUser(session.user);
          if (data.length > 0) {
            const mappedResumes = data.map(r => ({
              id: r.id,
              title: r.title,
              updatedAt: r.updated_at,
              ...r.resume_data
            }));
            
            setStoreState({ 
              resumes: mappedResumes, 
              activeResumeId: mappedResumes[0].id 
            });
            prevResumesRef.current = mappedResumes;
          } else {
            prevResumesRef.current = [];
          }
        }
      }
      
      if (isMounted) setIsInitializing(false);
    }

    initializeCloud();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setIsInitializing(true);
        initializeCloud();
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setStoreState({ resumes: [defaultResume], activeResumeId: defaultResume.id });
        prevResumesRef.current = null;
        if (pathname !== '/login') router.push('/login');
      }
    });

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, [pathname, router, supabase, setStoreState]);

  useEffect(() => {
    if (isInitializing || !prevResumesRef.current) return;

    const syncToCloud = async () => {
       const { data: { session } } = await supabase.auth.getSession();
       if (!session) return;
       
       const prev = prevResumesRef.current || [];
       
       for (const resume of resumes) {
          const oldResume = prev.find(r => r.id === resume.id);
          if (!oldResume || oldResume.updatedAt !== resume.updatedAt) {
             const { id, title, updatedAt, ...resume_data } = resume;
             await supabase.from('resumes').upsert({
               id,
               user_id: session.user.id,
               title: title || 'Untitled Resume',
               resume_data,
               updated_at: updatedAt
             });
          }
       }
       
       for (const old of prev) {
          if (!resumes.find(r => r.id === old.id)) {
            await supabase.from('resumes').delete().eq('id', old.id);
          }
       }
       
       prevResumesRef.current = resumes;
    };

    const timeoutId = setTimeout(syncToCloud, 1000);
    return () => clearTimeout(timeoutId);
  }, [resumes, isInitializing, supabase]);

  if (isInitializing && pathname !== '/login') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fc] dark:bg-[#0a0b14]">
         <div className="h-8 w-8 border-4 border-[#0066FF] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return <>{children}</>;
}
