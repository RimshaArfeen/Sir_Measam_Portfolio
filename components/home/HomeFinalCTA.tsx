
"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  BookOpen, Globe, Award, Zap, ArrowUpRight, MessageSquare,
  Lightbulb, User, MoveRight, CheckCircle2, Leaf, ShieldCheck,
  Cpu, Star, Landmark, MapPin, Sparkles, Send
} from "lucide-react";

const CLOSING = "Partnerships, collaboration, and systems that scale responsibly. If that aligns with what you're building, let's connect.";

// REUSABLE HOOK
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
 * HOME FINAL CTA SECTION
 * A cinematic, high-impact conclusion to the scroll journey.
 */
const HomeFinalCTA = () => {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.3, once: true });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 md:px-12 lg:px-20 py-16 sm:py-24 md:py-32 bg-black/40 overflow-hidden border-white/10"
    >
      {/* Dynamic Background Elements */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 blur-[160px] rounded-full transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.03)_0%,transparent_70%)]" />

      <div className="w-full max-w-4xl mx-auto relative z-10 text-center">
        {/* Animated Line Component */}
        <div className="flex justify-center mb-8 sm:mb-10 md:mb-12">
          <div className={`h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent transition-all duration-1000 ease-in-out ${isVisible ? 'w-24 sm:w-32 opacity-100' : 'w-0 opacity-0'}`} />
        </div>

        <div className={`w-full transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[7rem] font-black text-white tracking-tighter leading-tight sm:leading-none mb-6 sm:mb-8 md:mb-10 selection:bg-blue-600">
            Let's build <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 animate-gradient-x">
              together.
            </span>
          </h2>
        </div>

        <p className={`text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-400 font-light leading-relaxed mb-10 sm:mb-12 md:mb-14 lg:mb-16 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {CLOSING}
        </p>

        <div className={`flex flex-col items-center gap-6 sm:gap-7 md:gap-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <a
            href="/connect"
            className="group relative flex items-center justify-center gap-3 sm:gap-4 px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.15)] w-full sm:w-auto"
          >
            <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 text-xs sm:text-sm md:text-base lg:text-lg uppercase tracking-[0.15em] sm:tracking-[0.2em]">Start a Conversation</span>
            <Send className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform flex-shrink-0" />
          </a>

          <div className="flex items-center gap-4 sm:gap-5 md:gap-6 opacity-40 hover:opacity-100 transition-opacity">
            <div className="w-8 sm:w-10 md:w-12 h-[1px] bg-white/30" />
            <span className="text-[9px] sm:text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] sm:tracking-[0.4em]">Global Connectivity</span>
            <div className="w-8 sm:w-10 md:w-12 h-[1px] bg-white/30" />
          </div>
        </div>
      </div>

      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
};

export default HomeFinalCTA