"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  BookOpen, Globe, Award, Zap, ArrowUpRight, MessageSquare,
  Lightbulb, User, MoveRight, CheckCircle2, Leaf, ShieldCheck, Cpu
} from "lucide-react";
import AnimatedBeamsBackground from "../AnimatedBeamsBackground/AnimatedBeamsBackground";

const GREYN_STATEMENT = "Scalable technology and climate systems, built for verification, impact, and scale beyond borders.";

const GREYN_HIGHLIGHTS = [
  { text: "Verified climate impact & ESG infrastructure", icon: <ShieldCheck className="w-5 h-5 text-cyan-400" /> },
  { text: "Platforms that connect systems, not silos", icon: <Cpu className="w-5 h-5 text-blue-500" /> },
  { text: "Global deployment, remote-first execution", icon: <Globe className="w-5 h-5 text-cyan-400" /> },
  { text: "Transparent, execution-first, built for borders", icon: <CheckCircle2 className="w-5 h-5 text-blue-500" /> },
];

const HIGHLIGHTS = [
  "Verified climate impact & ESG infrastructure",
  "Platforms that connect systems, not silos",
  "Global deployment, remote-first execution",
  "Transparent, execution-first, built for borders",
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





const HomeGreynPreview = () => {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.2, once: true });

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 md:px-20 bg-blue/40 overflow-hidden border-t border-white/5"
    >
      {/* Structural Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-center">

          {/* Left Column: Context & Highlights */}
          <div className={`lg:w-1/2 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="flex items-center gap-3 mb-8">
              <Leaf className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-400 font-mono text-xs uppercase tracking-[0.4em]">Project Spotlight</span>
            </div>

            <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tighter leading-none mb-8">
              Greyn<span className="text-blue-600">.</span>
            </h2>

            <p className="text-2xl text-gray-300 font-light leading-relaxed mb-12 max-w-xl">
              {GREYN_STATEMENT}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {GREYN_HIGHLIGHTS.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start group">
                  <div className="mt-1 p-2 rounded-lg bg-zinc-900 border border-white/5 group-hover:border-cyan-500/30 transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-gray-400 text-sm leading-snug group-hover:text-white transition-colors">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-6">
              <a
                href="/greyn"
                className="group flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-cyan-400 transition-all"
              >
                Explore Greyn
                <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/about"
                className="flex items-center gap-3 px-8 py-4 border border-white/10 text-white font-medium rounded-full hover:bg-white/5 transition-all"
              >
                About the Methodology
              </a>
            </div>
          </div>

          {/* Right Column: Abstract Tech Visualization */}
          <div className={`lg:w-1/2 relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="relative aspect-square w-full max-w-md mx-auto">
              {/* Outer Ring */}
              <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
              {/* Middle Ring */}
              <div className="absolute inset-10 border border-cyan-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
              {/* Center Piece */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-white/10 flex items-center justify-center shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 text-center">
                    <Zap className="w-12 h-12 text-cyan-400 mx-auto mb-2" />
                    <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500">Infrastructure</div>
                  </div>
                </div>
              </div>
              {/* Floating Orbitals */}
              <div className="absolute top-1/4 -left-4 w-12 h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center animate-bounce">
                <Globe className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeGreynPreview