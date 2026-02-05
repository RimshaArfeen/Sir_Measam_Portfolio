"use client";

import React, { useRef, useEffect, useState } from "react";
import { BookOpen, Globe, Award, Zap, ArrowUpRight, MessageSquare, Lightbulb } from "lucide-react";
import AnimatedBeamsBackground from "../AnimatedBeamsBackground/AnimatedBeamsBackground";
import Link from "next/link";
// DATA SECTION (Fixed/Integrated)
const HERO_TAGLINE = "Intellectual Authority — depth and credibility.";

const PUBLICATIONS = [
  {
    tag: "Journal Article",
    title: "SME Digital Resilience",
    body: "An empirical study on how digital transformation frameworks enable small enterprises to navigate global supply chain disruptions.",
  },
  {
    tag: "White Paper",
    title: "The ESG Verification Gap",
    body: "Analyzing the trust deficit in sustainability reporting and the role of decentralized verification ecosystems.",
  },
  {
    tag: "Case Study",
    title: "Emerging Tech Adoption",
    body: "Frameworks for integrating AI and automation in traditional manufacturing sectors across Southeast Asia.",
  }
];

const BOOK = {
  title: "The Young Capitalist",
  tagline: "A manifesto for the next generation of value creators and impact-driven entrepreneurs.",
  launch: "Coming Spring 2026"
};

const FOCUS_AREAS = [
  {
    title: "Digital transformation of SMEs",
    desc: "How small and medium enterprises adopt technology, scale digitally, and compete in global markets.",
    icon: <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 flex-shrink-0" />,
  },
  {
    title: "Sustainability ecosystems",
    desc: "Systems thinking for climate, ESG, and impact — from verification to scalable solutions.",
    icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 flex-shrink-0" />,
  },
  {
    title: "Technology adoption",
    desc: "Barriers, enablers, and frameworks for adoption across sectors and geographies.",
    icon: <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 flex-shrink-0" />,
  },
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




const FocusAreas = () => {
  const [containerRef, isVisible] = useIntersectionObserver({ threshold: 0.1, once: true });

  return (
    <section ref={containerRef} className="relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-blue-400 text-xs sm:text-sm font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-3 sm:mb-4">
            Core Specialization
          </h2>
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
            Research Focus Areas
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
          {FOCUS_AREAS.map((area, i) => (
            <div
              key={i}
              style={{ transitionDelay: `${i * 150}ms` }}
              className={`group relative p-6 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl bg-zinc-900/70 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-700 overflow-hidden shadow-lg shadow-cyan-500/10
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="mb-5 sm:mb-6 p-2.5 sm:p-3 rounded-lg bg-black/50 w-fit border border-cyan-400/20 group-hover:scale-110 transition-transform">
                {area.icon}
              </div>
              <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-cyan-400 transition-colors">
                {area.title}
              </h4>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base md:text-lg group-hover:text-gray-200 transition-colors">{area.desc}</p>
              <div className="mt-6 sm:mt-7 md:mt-8 opacity-0 group-hover:opacity-100 transition-all flex items-center text-xs sm:text-sm text-cyan-400 font-medium translate-y-2 group-hover:translate-y-0">
                Deep Dive <ArrowUpRight className="ml-1 w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [heroRef, heroVisible] =
    useIntersectionObserver<HTMLDivElement>({ threshold: 0.1, once: true });

  return (
    <div className="bg-zinc-950/40 text-gray-300 font-sans selection:bg-cyan-500/30 min-h-screen relative px-4 sm:px-6 md:px-12 lg:px-20 py-16 sm:py-20 md:py-24">
      {/* Styles for the text animation */}
      <style>{`
        @keyframes revealText {
          from { clip-path: inset(100% 0 0 0); opacity: 0; transform: translateY(20px); }
          to { clip-path: inset(0 0 0 0); opacity: 1; transform: translateY(0); }
        }
        .animate-reveal {
          animation: revealText 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full" />
        <AnimatedBeamsBackground />
      </div>

      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative z-10 max-w-7xl mx-auto py-16 sm:py-20 md:py-24 pt-24 sm:pt-28 md:pt-32 lg:pt-36"
      >
        <p className="text-blue-500 font-mono tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.5em] uppercase text-xs sm:text-sm mb-4 sm:mb-5 md:mb-6">
          Research Portfolio
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[11rem] font-bold tracking-tighter leading-[0.85] mb-8 sm:mb-10 md:mb-12 flex flex-wrap">
          {"Research".split("").map((char, i) => (
            <span
              key={i}
              className="inline-block opacity-0 animate-reveal"
              style={{ animationDelay: `${0.1 + i * 0.08}s` }}
            >
              {char}
            </span>
          ))}

        </h1>

        <div className="flex flex-col md:flex-row md:items-center gap-4 sm:gap-6 md:gap-8">
          <div
            className={`h-[1px] w-24 sm:w-32 md:w-48 bg-gradient-to-r from-blue-600 to-transparent origin-left transition-all duration-1000 ${heroVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
              }`}
          />
          <p
            className={`text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-400 font-light max-w-2xl leading-tight transition-all duration-1000 delay-500 ${heroVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              }`}
          >
            {HERO_TAGLINE}
          </p>
        </div>
      </div>

      {/* Focus Areas Section */}
      <section className="py-16 sm:py-20 md:py-24 relative z-10">
        <FocusAreas />
      </section>

      {/* Publications Section */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-20 py-16 sm:py-20 md:py-24 bg-zinc-900/40 relative z-10 border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-cyan-400 text-xs sm:text-sm font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-3 sm:mb-4">Scholarly Impact</h2>
            <h3 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white">Publications</h3>
          </div>

          <div className="divide-y divide-white/10">
            {PUBLICATIONS.map((pub, i) => (
              <div
                key={i}
                className="group flex flex-col md:flex-row gap-6 sm:gap-7 md:gap-8 py-8 sm:py-10 md:py-12 hover:bg-white/[0.03] transition-colors px-3 sm:px-4 rounded-lg"
              >
                <div className="md:w-1/3">
                  <span className="inline-block px-2.5 sm:px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] sm:text-xs font-bold uppercase mb-3 sm:mb-4 tracking-wider">
                    {pub.tag}
                  </span>
                  <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {pub.title}
                  </h4>
                </div>
                <div className="md:w-2/3">
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 leading-relaxed font-light">
                    {pub.body}
                  </p>
                  {/* <button className="mt-6 flex items-center text-white/50 hover:text-cyan-400 transition-colors group/btn">
                    <BookOpen className="w-5 h-5 mr-2 group-hover/btn:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Request Full Text</span>
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Book Section */}
      <section className="py-20 sm:py-24 md:py-32 relative z-10 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="relative p-8 sm:p-12 md:p-16 lg:p-20 xl:p-24 rounded-[1.5rem] sm:rounded-[2rem] bg-gradient-to-br from-zinc-900 to-black border border-white/10 overflow-hidden shadow-2xl">
            <div className="absolute -top-24 -right-24 w-80 sm:w-96 h-80 sm:h-96 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 sm:gap-12 md:gap-14 lg:gap-16">
              <div className="md:w-1/2">
                <h2 className="text-cyan-400 text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-4 sm:mb-5 md:mb-6">Literary Debut</h2>
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 sm:mb-7 md:mb-8 tracking-tight leading-tight">
                  {BOOK.title}
                </h3>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-light mb-6 sm:mb-7 md:mb-8 leading-relaxed">
                  {BOOK.tagline}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6">
                  <Link href="/connect" className="w-full sm:w-auto px-6 sm:px-7 md:px-8 py-3.5 sm:py-4 text-sm sm:text-base bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all shadow-lg shadow-blue-900/20 active:scale-95 text-center">
                    Pre-order Interest
                  </Link>
                  <div className="flex items-center justify-center text-gray-500 px-4 text-xs sm:text-sm font-medium sm:border-l border-white/10">
                    {BOOK.launch}
                  </div>
                </div>
              </div>

              <div className="md:w-1/2 flex justify-center">
                <div className="relative w-40 sm:w-48 md:w-56 lg:w-64 h-56 sm:h-64 md:h-72 lg:h-80 bg-zinc-800 rounded-r-lg shadow-2xl shadow-blue-500/20 transform rotate-6 hover:rotate-0 transition-transform duration-700 group cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 md:p-6 border-r-4 border-blue-500/50">
                    <Award className="text-cyan-400 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex-shrink-0 mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
                    <div className="h-1 w-10 sm:w-12 bg-white/20 mb-3 sm:mb-4" />
                    <span className="text-white font-black text-xs sm:text-sm md:text-base lg:text-xl leading-tight uppercase tracking-tight">THE YOUNG CAPITALIST</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-24 md:py-32 bg-black/80 relative z-10 border-t border-white/5 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 sm:mb-7 md:mb-8 tracking-tight">
            Research = depth + credibility
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-400 mb-8 sm:mb-10 md:mb-12 font-light leading-relaxed">
            Academic and thought leadership built on published work, ongoing research, and a commitment to rigor and impact.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-5 md:gap-6">
            <Link href="/connect" className="w-full sm:w-auto text-sm sm:text-base md:text-lg group px-6 sm:px-8 md:px-10 py-4 sm:py-4.5 md:py-5 bg-white text-black font-bold rounded-full hover:bg-cyan-400 transition-all flex items-center justify-center gap-2">
              Get in touch
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/impact" className="w-full sm:w-auto text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-4 sm:py-4.5 md:py-5 border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-all text-center">
              View Impact
            </Link>
          </div>
        </div>
      </section>

     
    </div>
  );
}