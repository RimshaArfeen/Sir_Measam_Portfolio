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
const HERO_TAGLINE = "Intellectual Authority   depth and credibility.";

const PHILOSOPHY = [
  "I build systems that solve real-world problems at scale.",
  "Execution-first: teams, products, and go-to-market   shipped, not theorized.",
  "Operating globally, remote-first, founder-led.",
];

const GREYN_STATEMENT = "Scalable technology and climate systems   built for verification, impact, and scale beyond borders.";

const IMPACT_INTRO = "Global recognition, research, and proof of responsibility   without the noise.";

const IMPACT_PROOF = [
  { text: "Oxford, Yale, Google, TKS   programs and scholarships", icon: <Landmark className="w-5 h-5" /> },
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
      className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 bg-black/40 overflow-hidden border-t border-white/5"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row-reverse gap-10 sm:gap-12 md:gap-16 lg:gap-20 items-center">

          {/* Content Column */}
          <div className={`lg:w-1/2 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
              <span className="text-blue-500 font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em]">Recognition</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tighter leading-tight sm:leading-none mb-6 sm:mb-8">
              Global Impact<span className="text-cyan-400">.</span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 font-light leading-relaxed mb-8 sm:mb-10">
              {IMPACT_INTRO}
            </p>

            <div className="space-y-3 sm:space-y-4 md:space-y-6 mb-8 sm:mb-12">
              {IMPACT_PROOF.map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-3 sm:gap-4 md:gap-5 items-start sm:items-center p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-blue-500/30 transition-all group"
                >
                  <div className="p-1  md:p-3 rounded-lg sm:rounded-xl bg-black border border-white/10 text-cyan-400 group-hover:scale-110 transition-transform flex-shrink-0">
                    {React.cloneElement(item.icon, { className: "w-4 h-4 sm:w-5 sm:h-5" })}
                  </div>
                  <span className="text-gray-300 text-xs sm:text-base md:text-lg font-light leading-snug">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="/impact"
              className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 md:gap-4 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:bg-cyan-400 active:scale-95 w-full sm:w-auto text-center"
            >
              <span className="relative z-10 uppercase tracking-wider sm:tracking-widest text-xs sm:text-sm">Explore the Full Impact</span>
              <ArrowUpRight className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>

          {/* Visual Column: Impact Map / Proof points */}
          <div
            className={`w-full lg:w-1/2 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <div className="relative p-1 bg-gradient-to-br from-white/10 to-transparent rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem]">
              <div className="bg-zinc-950 rounded-[1.9rem] sm:rounded-[1.9rem] md:rounded-[2.4rem] p-6 sm:p-8 md:p-10 lg:p-12 overflow-hidden relative min-h-[350px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px]">

                {/* Abstract Data Visualization Grid */}
                <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                  <div className="w-full h-full grid grid-cols-6 grid-rows-6">
                    {[...Array(36)].map((_, i) => (
                      <div key={i} className="border-[0.5px] border-white/20" />
                    ))}
                  </div>
                </div>

                {/* Background Image - Updated to a Global Connectivity Tech Image */}
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2006&auto=format&fit=crop"
                    alt="Global Network Connectivity"
                    className="w-full h-full object-cover"
                  />
                  {/* Dark overlay maintained for text legibility */}
                  <div className="absolute inset-0 bg-black/80"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center justify-center h-full">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mb-6 sm:mb-8 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                    <MapPin className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-500 animate-pulse" />
                  </div>

                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white/10 mb-2">
                    PROOF
                  </div>

                  <div className="text-[10px] sm:text-xs font-mono text-cyan-200 bg-blue-900/40 px-2 sm:px-3 py-1 rounded-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-6 sm:mb-8 border border-blue-500/30">
                    Verified Benchmarks
                  </div>

                  <div className="w-full space-y-3 sm:space-y-4 max-w-[250px] sm:max-w-xs">
                    {[85, 92, 78].map((w, i) => (
                      <div key={i} className="h-1 sm:h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full transition-all duration-[2s] delay-700"
                          style={{ width: isVisible ? `${w}%` : "0%" }}
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

export default HomeImpactPreview