"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const HERO_LETTERS = "RESUMECOVERLETTERDRAFTAPPLYHIREDOFFER";
const ROTATING_WORDS = ["résumé.", "cover letter.", "next offer.", "job title."];

function useMousePct(ref) {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };
  return [pos, onMove];
}

function FloatingLetters({ pos }) {
  const letters = useMemo(
    () =>
      Array.from(HERO_LETTERS).map((ch, i) => {
        const left = (Math.sin(i * 12.9) * 0.5 + 0.5) * 94 + 3;
        const top = (Math.cos(i * 7.3) * 0.5 + 0.5) * 90 + 5;
        const size = 26 + ((i * 41) % 46);
        const duration = 9 + ((i * 13) % 11);
        const delay = (i * 0.41) % 7;
        const outline = i % 3 === 0;
        const depth = (i % 3) + 1;
        return { ch, left, top, size, duration, delay, outline, depth, key: i };
      }),
    []
  );
  const dx = (pos.x - 50) / 50;
  const dy = (pos.y - 50) / 50;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }} aria-hidden="true">
      {letters.map((l) => (
        <div
          key={l.key}
          className="font-display font-bold"
          style={{
            position: "absolute",
            left: `${l.left}%`,
            top: `${l.top}%`,
            fontSize: `${l.size}px`,
            userSelect: "none",
            color: l.outline ? "transparent" : "rgba(255,255,255,0.9)",
            WebkitTextStroke: l.outline ? "1px rgba(255,255,255,0.35)" : undefined,
            opacity: 0.1 + l.depth * 0.07,
            transform: `translate3d(${dx * l.depth * 10}px, ${dy * l.depth * 10}px, 0)`,
            transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
            animation: `driftLetter ${l.duration}s ease-in-out ${l.delay}s infinite`,
          }}
        >
          {l.ch}
        </div>
      ))}
    </div>
  );
}

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % ROTATING_WORDS.length), 2000);
    return () => clearInterval(t);
  }, []);
  return (
    <span style={{ position: "relative", display: "inline-block", height: "1.1em", overflow: "hidden", verticalAlign: "bottom" }}>
      <span
        key={i}
        style={{
          display: "inline-block",
          backgroundImage: "linear-gradient(90deg, #9ecbff, #c9a7ff, #ffb0d4)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          animation: "wordIn 0.55s cubic-bezier(0.16,1,0.3,1) both",
        }}
      >
        {ROTATING_WORDS[i]}
      </span>
    </span>
  );
}

export default function Hero() {
  const heroRef = useRef(null);
  const [pos, onMove] = useMousePct(heroRef);

  return (
    <div ref={heroRef} onMouseMove={onMove} className="relative">
      {/* aurora blobs */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }} aria-hidden="true">
        <div className="blob" style={{ position: "absolute", top: "-160px", left: "-128px", width: "520px", height: "520px", borderRadius: "9999px", background: "#4b3a8f", opacity: 0.3, filter: "blur(110px)" }} />
        <div className="blob" style={{ position: "absolute", top: "40px", right: "-10%", width: "480px", height: "480px", borderRadius: "9999px", background: "#1f5f6b", opacity: 0.3, filter: "blur(110px)", animationDelay: "-6s" }} />
        <div className="blob" style={{ position: "absolute", bottom: "-15%", left: "30%", width: "420px", height: "420px", borderRadius: "9999px", background: "#6b2f5a", opacity: 0.2, filter: "blur(110px)", animationDelay: "-11s" }} />
      </div>

      {/* cursor spotlight */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `radial-gradient(320px circle at ${pos.x}% ${pos.y}%, rgba(255,255,255,0.06), transparent 70%)`,
        }}
      />
      <FloatingLetters pos={pos} />

      {/* nav */}
      <div className="relative z-10 max-w-6xl mx-auto flex items-center justify-between px-6 py-6">
        <div style={{ color: "#fff" }} className="flex items-center gap-2">
          <span style={{ width: 8, height: 20, borderRadius: 2, background: "linear-gradient(180deg,#9ecbff,#ffb0d4)" }} />
          <span className="font-display font-semibold text-lg tracking-tight">Draftline</span>
        </div>
        <Link href="/builder" style={{ color: "rgba(255,255,255,0.6)" }} className="text-sm font-medium hover:text-white transition">
          Open builder →
        </Link>
      </div>

      {/* hero copy */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-20 pb-16 text-center flex flex-col items-center">
        <span
          className="fade-up font-mono uppercase mb-6 rounded-full px-3 py-1"
          style={{
            animationDelay: "0.05s",
            fontSize: "11px",
            letterSpacing: "0.25em",
            color: "rgba(255,255,255,0.45)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          Free · No sign-up · Export instantly
        </span>
        <h1
          className="fade-up font-display font-semibold tracking-tight"
          style={{ animationDelay: "0.12s", fontSize: "clamp(36px, 7vw, 68px)", lineHeight: 1.06, color: "#fff" }}
        >
          Write your <RotatingWord />
        </h1>
        <p
          className="fade-up font-body mt-6 max-w-lg"
          style={{ animationDelay: "0.22s", fontSize: "clamp(15px, 2vw, 18px)", color: "rgba(255,255,255,0.55)" }}
        >
          A live, side-by-side builder for resumes and cover letters —
          clean enough for ATS, sharp enough to get read.
        </p>

        <div className="fade-up mt-10" style={{ animationDelay: "0.32s" }}>
          <Link
            href="/builder"
            className="cta-btn group inline-flex items-center gap-2 font-semibold text-sm px-6 py-3.5 rounded-full"
            style={{ background: "#ffffff", color: "#0a0b14" }}
          >
            Start building
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition" />
          </Link>
        </div>
      </div>
    </div>
  );
}
