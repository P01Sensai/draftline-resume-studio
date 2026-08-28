import Link from "next/link";
import { ArrowRight } from "lucide-react";

const TICKER_WORDS = ["ATS-READY", "LIVE PREVIEW", "FREE FOREVER", "NO SIGN-UP", "INSTANT EXPORT", "TWO TEMPLATES"];

const FEATURES = [
  { n: "01", t: "Live paper preview", d: "See the exact document take shape as you type." },
  { n: "02", t: "ATS-friendly layout", d: "Clean structure that parses well in hiring software." },
  { n: "03", t: "One-click export", d: "Print or save as PDF straight from the browser." },
];

export function Ticker() {
  return (
    <div className="relative z-10 py-3 overflow-hidden" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
      <div className="marquee-track flex whitespace-nowrap w-max font-mono" style={{ fontSize: "12px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.35)" }}>
        {[...TICKER_WORDS, ...TICKER_WORDS, ...TICKER_WORDS, ...TICKER_WORDS].map((w, i) => (
          <span key={i} className="mx-6 flex items-center gap-6">
            {w} <span style={{ color: "rgba(255,255,255,0.15)" }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function FeatureList() {
  return (
    <div className="relative z-10 max-w-3xl mx-auto px-6 py-4 pb-16">
      {FEATURES.map((f) => (
        <div key={f.n} className="feat-row flex items-center justify-between gap-6 px-4 py-6 rounded-lg" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div className="flex items-baseline gap-5">
            <span className="font-mono text-sm" style={{ color: "rgba(255,255,255,0.25)" }}>{f.n}</span>
            <div>
              <div className="font-display font-semibold text-base" style={{ color: "#fff" }}>{f.t}</div>
              <div className="font-body mt-0.5" style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)" }}>{f.d}</div>
            </div>
          </div>
          <ArrowRight size={16} className="feat-arrow shrink-0" style={{ color: "rgba(255,255,255,0.55)" }} />
        </div>
      ))}
    </div>
  );
}
