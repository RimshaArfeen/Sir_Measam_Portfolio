"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  BookOpen, Globe, Award, Zap, ArrowUpRight, MessageSquare,
  Lightbulb, User, MoveRight, CheckCircle2, Leaf, ShieldCheck,
  Cpu, Star, Landmark, MapPin
} from "lucide-react";

// Mock Background Component
const AnimatedBeamsBackground = () => (
  <div className="absolute inset-0 opacity-20 pointer-events-none">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,100,255,0.15),transparent)]" />
  </div>
);

// DATA SECTION
const HERO_TAGLINE = "Intellectual Authority — depth and credibility.";

const PHILOSOPHY = [
  "I build systems that solve real-world problems at scale.",
  "Execution-first: teams, products, and go-to-market — shipped, not theorized.",
  "Operating globally, remote-first, founder-led.",
];

const GREYN_STATEMENT = "Scalable technology and climate systems — built for verification, impact, and scale beyond borders.";

const IMPACT_INTRO = "Global recognition, research, and proof of responsibility — without the noise.";

const IMPACT_PROOF = [
  { text: "Oxford, Yale, Google, TKS — programs and scholarships", icon: <Landmark className="w-5 h-5" /> },
  { text: "UNICEF partnerships, global ambassador roles, international conferences", icon: <Globe className="w-5 h-5" /> },
  { text: "Peace and changemaker nominations, youth leadership recognition", icon: <Star className="w-5 h-5" /> },
];

// REUSABLE HOOK
type UseIOOptions = IntersectionObserverInit & {
  once?: boolean;
};

const useIntersectionObserver = <T extends HTMLElement>(
  options: UseIOOptions = {}
) => {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (options.once) observer.disconnect();
      }
    }, options);

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isVisible] as const;
};

/**
 * HOME IMPACT REVIEW SECTION
 * High-credibility section highlighting global achievements.
 */
const HomeImpactPreview = () => {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.2, once: true });

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 md:px-20 bg-black overflow-hidden border-t border-white/5"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">

          {/* Content Column */}
          <div className={`lg:w-1/2 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-5 h-5 text-blue-500" />
              <span className="text-blue-500 font-mono text-xs uppercase tracking-[0.4em]">Recognition</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-none mb-8">
              Global Impact<span className="text-cyan-400">.</span>
            </h2>

            <p className="text-2xl text-gray-400 font-light leading-relaxed mb-10">
              {IMPACT_INTRO}
            </p>

            <div className="space-y-6 mb-12">
              {IMPACT_PROOF.map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-5 items-center p-5 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-blue-500/30 transition-all group"
                >
                  <div className="p-3 rounded-xl bg-black border border-white/10 text-cyan-400 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-gray-300 text-lg font-light leading-snug">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="/impact"
              className="group relative inline-flex items-center gap-4 px-10 py-5 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:bg-cyan-400 active:scale-95"
            >
              <span className="relative z-10 uppercase tracking-widest text-sm">Explore the Full Impact</span>
              <ArrowUpRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>

          {/* Visual Column: Impact Map / Proof points */}
          <div className={`lg:w-1/2 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative p-1 bg-gradient-to-br from-white/10 to-transparent rounded-[2.5rem]">
              <div className="bg-zinc-950 rounded-[2.4rem] p-8 md:p-12 overflow-hidden relative">
                {/* Abstract Data Visualization Grid */}
                <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                  <div className="w-full h-full grid grid-cols-6 grid-rows-6">
                    {[...Array(36)].map((_, i) => (
                      <div key={i} className="border-[0.5px] border-white/20" />
                    ))}
                  </div>
                </div>

                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-20 h-20 mb-8 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                    <MapPin className="w-8 h-8 text-blue-500 animate-pulse" />
                  </div>
                  <div className="text-6xl md:text-8xl font-black text-white/10 mb-2">PROOF</div>
                  <div className="text-sm font-mono text-cyan-400 uppercase tracking-[0.5em] mb-8">Verified Benchmarks</div>

                  {/* Decorative Stat Bars */}
                  <div className="w-full space-y-4 max-w-xs">
                    {[85, 92, 78].map((w, i) => (
                      <div key={i} className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full transition-all duration-[2s] delay-700"
                          style={{ width: isVisible ? `${w}%` : '0%' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// ... Previous components (HomeAboutPreview, HomeGreynPreview, FocusAreas) would be here ...

export default function App() {
  const [heroRef, heroVisible] =
    useIntersectionObserver<HTMLDivElement>({ threshold: 0.1, once: true });

  return (
    <div className="bg-zinc-950 text-gray-300 font-sans selection:bg-cyan-500/30 min-h-screen relative">
      <style>{`
        @keyframes revealText {
          from { clip-path: inset(100% 0 0 0); opacity: 0; transform: translateY(20px); }
          to { clip-path: inset(0 0 0 0); opacity: 1; transform: translateY(0); }
        }
        .animate-reveal { animation: revealText 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>

      {/* Hero */}
      <div ref={heroRef} className="relative z-10 max-w-7xl mx-auto py-24 px-6 md:px-20 pt-36">
        <p className="text-blue-500 font-mono tracking-[0.5em] uppercase text-sm mb-6">Research Portfolio</p>
        <h1 className="text-6xl md:text-[9rem] font-bold tracking-tighter leading-[0.85] mb-12 flex flex-wrap">
          {"Impact".split("").map((char, i) => (
            <span key={i} className="inline-block opacity-0 animate-reveal" style={{ animationDelay: `${0.1 + i * 0.08}s` }}>{char}</span>
          ))}
          <span className="text-cyan-400 opacity-0 animate-reveal" style={{ animationDelay: "0.8s" }}>.</span>
        </h1>
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          <div className={`h-[1px] w-full md:w-48 bg-gradient-to-r from-blue-600 to-transparent origin-left transition-all duration-1000 ${heroVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}`} />
          <p className={`text-xl md:text-3xl text-gray-400 font-light max-w-2xl leading-tight transition-all duration-1000 delay-500 ${heroVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}>
            {IMPACT_INTRO}
          </p>
        </div>
      </div>

      <HomeImpactPreview />

      {/* Footer Placeholder for visual completeness */}
      <footer className="py-20 text-center border-t border-white/5 opacity-50">
        <p className="text-xs tracking-[0.5em] uppercase">Built for Scale & Responsibility</p>
      </footer>
    </div>
  );
}