"use client";

import React, { useRef, useEffect, useState } from "react";
import { BookOpen, Globe, Award, Zap, ArrowUpRight, MessageSquare, Lightbulb } from "lucide-react";
import AnimatedBeamsBackground from "../AnimatedBeamsBackground/AnimatedBeamsBackground";
import { PUBLICATIONS, BOOK } from "./researchData";

const HERO_TAGLINE = "Intellectual Authority — depth and credibility.";

export const FOCUS_AREAS = [
  {
    title: "Digital transformation of SMEs",
    desc: "How small and medium enterprises adopt technology, scale digitally, and compete in global markets.",
    icon: <Globe className="w-6 h-6 text-cyan-400" />,
  },
  {
    title: "Sustainability ecosystems",
    desc: "Systems thinking for climate, ESG, and impact — from verification to scalable solutions.",
    icon: <Zap className="w-6 h-6 text-blue-500" />,
  },
  {
    title: "Technology adoption",
    desc: "Barriers, enablers, and frameworks for adoption across sectors and geographies.",
    icon: <Lightbulb className="w-6 h-6 text-cyan-400" />,
  },
];

const FocusAreas = () => {
  const refs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("opacity-100", "translate-y-0");
        });
      },
      { threshold: 0.1 }
    );

    refs.current.forEach((el) => el && observer.observe(el));

    return () => refs.current.forEach((el) => el && observer.unobserve(el));
  }, []);

  return (
    <section className="relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="section-header mb-16">
          <h2 className="text-blue-400 text-sm font-bold uppercase tracking-[0.3em] mb-4">
            Core Specialization
          </h2>
          <h3 className="text-4xl md:text-5xl font-semibold text-white">
            Research Focus Areas
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FOCUS_AREAS.map((area, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el && !refs.current.includes(el)) refs.current.push(el);
              }}
              className="group relative p-10 rounded-2xl bg-zinc-900/70 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-500 overflow-hidden shadow-lg shadow-cyan-500/20 opacity-0 translate-y-10"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
              <div className="mb-6 p-3 rounded-lg bg-black/50 w-fit border border-cyan-400/20 group-hover:scale-110 transition-transform">
                {area.icon}
              </div>
              <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                {area.title}
              </h4>
              <p className="text-gray-200 leading-relaxed text-lg">{area.desc}</p>
              <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity flex items-center text-sm text-cyan-400 font-medium">
                Deep Dive <ArrowUpRight className="ml-1 w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit & { once?: boolean } = {}
) {
  const elementRef = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if ((options as any).once) observer.unobserve(entry.target);
      }
    }, options);

    const current = elementRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [options]);

  return [elementRef, isVisible] as const;
}

export default function App() {
  const containerRef = useRef(null);
  const [heroRef, heroVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    once: true,
  });

  return (
    <div
      ref={containerRef}
      className="bg-black/40 text-gray-300 font-sans selection:bg-cyan-500/30 min-h-screen"
    >
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full" />
        <AnimatedBeamsBackground />
      </div>

      {/* Hero */}
      <div
        ref={heroRef}
        className={`relative z-10 max-w-7xl py-24 px-20 pt-36 transition-all duration-1000 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        <p className="text-blue-500 font-mono tracking-[0.5em] uppercase text-sm mb-6 transform transition-all duration-1000">
          Research Portfolio
        </p>

        <h1 className="text-7xl md:text-[11rem] font-bold tracking-tighter leading-[0.85] mb-12 flex flex-wrap">
          {"Research".split("").map((char, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden opacity-0 animate-[revealText_1.2s_cubic-bezier(0.16,1,0.3,1)_forwards]"
              style={{ animationDelay: `${0.1 + i * 0.08}s` }}
            >
              {char}
            </span>
          ))}
          <span
            className="text-cyan-400 opacity-0 animate-[revealText_1.2s_cubic-bezier(0.16,1,0.3,1)_forwards]"
            style={{ animationDelay: "0.6s" }}
          >
            .
          </span>
        </h1>

        <div className="flex flex-col md:flex-row md:items-center gap-8">
          <div
            className={`h-[1px] w-full md:w-48 bg-gradient-to-r from-blue-600 to-transparent origin-left transition-all duration-1000 ${heroVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
              }`}
          />
          <p
            className={`text-xl md:text-3xl text-gray-400 font-light max-w-2xl leading-tight transition-all duration-1000 delay-500 ${heroVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              }`}
          >
            {HERO_TAGLINE}
          </p>
        </div>
      </div>

      {/* Focus Areas */}
      <section className="px-6 md:px-20 py-24 relative z-10">
        <FocusAreas />
      </section>


      {/* Publications */}
      <section className="px-6 md:px-20 py-24 bg-zinc-950/50">
        <div className="max-w-5xl mx-auto pub-container">
          <div className="section-header mb-16">
            <h2 className="text-cyan-400 text-sm font-bold uppercase tracking-[0.3em] mb-4">Scholarly Impact</h2>
            <h3 className="text-4xl md:text-5xl font-semibold text-white">Publications</h3>
          </div>

          <div className="space-y-0">
            {PUBLICATIONS.map((pub, i) => (
              <div
                key={i}
                className="pub-row group flex flex-col md:flex-row gap-8 py-12 border-b border-white/10 hover:bg-white/[0.02] transition-colors px-4 rounded-lg"
              >
                <div className="md:w-1/3">
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase mb-4 tracking-wider">
                    {pub.tag}
                  </span>
                  <h4 className="text-3xl font-bold text-white group-hover:translate-x-2 transition-transform duration-300">
                    {pub.title}
                  </h4>
                </div>
                <div className="md:w-2/3">
                  <p className="text-xl text-gray-400 leading-relaxed font-light">
                    {pub.body}
                  </p>
                  <button className="mt-6 flex items-center text-white/50 hover:text-cyan-400 transition-colors">
                    <BookOpen className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">Request Full Text</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Book Section */}
      <section className="px-6 md:px-20 py-32 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="relative p-12 md:p-24 rounded-[2rem] bg-gradient-to-br from-zinc-900 to-black border border-white/10 overflow-hidden shadow-2xl">
            {/* Animated Glow */}
            <div className="book-glow absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-16">
              <div className="md:w-1/2">
                <h2 className="text-cyan-400 text-sm font-bold uppercase tracking-[0.3em] mb-6">Literary Debut</h2>
                <h3 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
                  {BOOK.title}
                </h3>
                <p className="text-2xl text-gray-300 font-light mb-8 leading-relaxed">
                  {BOOK.tagline}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all shadow-lg shadow-blue-900/20 active:scale-95">
                    Pre-order Interest
                  </button>
                  <div className="flex items-center text-gray-500 px-4 text-sm font-medium border-l border-white/10">
                    {BOOK.launch}
                  </div>
                </div>
              </div>

              {/* Visual Metaphor for Book */}
              <div className="md:w-1/2 flex justify-center">
                <div className="relative w-64 h-80 bg-zinc-800 rounded-r-lg shadow-2xl shadow-blue-500/20 transform rotate-12 hover:rotate-0 transition-transform duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 border-r-4 border-blue-500/50">
                    <Award className="text-cyan-400 w-10 h-10 mb-4" />
                    <div className="h-1 w-12 bg-white/20 mb-4" />
                    <span className="text-white font-black text-xl leading-tight uppercase tracking-tight">THE YOUNG CAPITALIST</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-20 py-32 bg-black border-t border-white/5 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
            Research = depth + credibility
          </h2>
          <p className="text-xl text-gray-400 mb-12 font-light leading-relaxed">
            Academic and thought leadership built on published work, ongoing research, and a commitment to rigor and impact.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="group px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-cyan-400 transition-all flex items-center">
              Get in touch
              <MessageSquare className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-10 py-5 border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-all">
              View Impact
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="py-10 text-center border-t border-white/5 text-xs tracking-widest text-gray-600 uppercase">
        © 2024 Intellectual Property & Ventures
      </div>
    </div>
  );
}