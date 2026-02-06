"use client";

import React, { useRef, useEffect, useState } from "react";
import { Award, Globe, Users, Star, ExternalLink, ShieldCheck, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import AnimatedBeamsBackground from "../AnimatedBeamsBackground/AnimatedBeamsBackground";
const HERO_TAGLINE = "Global Recognition & Service, proof of responsibility.";

const AWARDS = [
  {
    title: "Oxford Scholars",
    items: ["Scholarships", "Global programs"],
    desc: "Recognition and support through Oxford-affiliated programs and global scholarship initiatives.",
    icon: <Award className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-cyan-400 flex-shrink-0" />
  },
  {
    title: "Nominations",
    items: ["Peace prizes", "Changemaker awards"],
    desc: "Nominated for peace, changemaking, and youth leadership awards at regional and global levels.",
    icon: <Star className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-500 flex-shrink-0" />
  },
];

const PROGRAMS = [
  { title: "Yale", desc: "Leadership and global affairs programs.", color: "border-blue-600" },
  { title: "Google", desc: "Certifications and innovation programs.", color: "border-cyan-500" },
  { title: "TKS", desc: "The Knowledge Society   innovation and future-building.", color: "border-blue-400" },
  { title: "LaunchX", desc: "Entrepreneurship and venture-building.", color: "border-cyan-600" },
  { title: "LeanGap", desc: "Lean methodology and execution frameworks.", color: "border-blue-500" },
];

const LEADERSHIP = [
  {
    title: "UNICEF",
    body: "Partnerships and initiatives with UNICEF in youth, education, and sustainable development.",
    stat: "Global Youth Advocate"
  },
  {
    title: "Global ambassador roles",
    body: "Representing organizations and causes on global stages   policy, sustainability, and youth.",
    stat: "Diplomatic Representation"
  },
  {
    title: "Conferences",
    body: "Speaking and facilitating at international conferences on entrepreneurship, climate, and impact.",
    stat: "Public Address"
  },
  {
    title: "Bootcamps",
    body: "Designing and leading bootcamps and capacity-building programs for founders and leaders.",
    stat: "Strategic Mentorship"
  },
];

// Custom Hook for Scroll Reveal
interface IntersectionObserverOptionsExtended extends IntersectionObserverInit {
  once?: boolean;
}

function useIntersectionObserver(options: IntersectionObserverOptionsExtended = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (options.once) observer.unobserve(entry.target);
      }
    }, options);

    const currentElement = elementRef.current;
    if (currentElement) observer.observe(currentElement);

    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, [options]);

  return [elementRef, isVisible] as const;
}

export default function App() {
  const [heroRef, heroVisible] = useIntersectionObserver({ threshold: 0.1, once: true });

  return (
    <div className="bg-black/70 text-white font-sans selection:bg-blue-500/30 min-h-screen overflow-x-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes revealText {
          0% { transform: translateY(100%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes scaleLine {
          0% { transform: scaleX(0); opacity: 0; }
          100% { transform: scaleX(1); opacity: 1; }
        }
        .animate-reveal { animation: revealText 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-line { animation: scaleLine 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .reveal-on-scroll { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal-visible { opacity: 1; transform: translateY(0); }
      `}} />

      {/* Dynamic Background Blur */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-blue-600/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-cyan-600/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
        <AnimatedBeamsBackground />
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[85vh] flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-20 py-16 sm:py-20 md:py-24 pt-24 sm:pt-28 md:pt-32">
        <div className="max-w-7xl">
          <div className="mb-4 sm:mb-5 md:mb-6 overflow-hidden">
            <p className={`text-blue-500 font-mono tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.5em] uppercase text-xs sm:text-sm transform transition-all duration-1000 delay-100 ${heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
              Responsibility Portfolio
            </p>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[11rem] font-bold tracking-tighter leading-[0.85] mb-8 sm:mb-10 md:mb-12 flex flex-wrap">
            {"Impact".split("").map((char, i) => (
              <span key={i} className="inline-block overflow-hidden">
                <span
                  className={`inline-block animate-reveal opacity-0`}
                  style={{ animationDelay: `${0.1 + i * 0.08}s` }}
                >
                  {char}
                </span>
              </span>
            ))}

          </h1>

          <div className="flex flex-col md:flex-row md:items-center gap-4 sm:gap-6 md:gap-8">
            <div className="animate-line h-[1px] w-24 sm:w-32 md:w-48 bg-gradient-to-r from-blue-600 to-transparent origin-left opacity-0" style={{ animationDelay: '0.8s' }} />
            <p className={`text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-400 font-light max-w-2xl leading-tight transition-all duration-1000 delay-1000 ${heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
              {HERO_TAGLINE}
            </p>
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <ScrollSection title="Recognition" subtitle="Awards & Recognition" icon={<ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />} accent="text-blue-500">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {AWARDS.map((award, i) => (
            <div
              key={i}
              style={{ transitionDelay: `${i * 150}ms` }}
              className="group relative p-6 sm:p-8 md:p-10 rounded-[2rem] sm:rounded-[2.5rem] bg-zinc-900/40 border border-white/5 hover:border-blue-500/30 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="mb-6 sm:mb-8 md:mb-10 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-black w-fit border border-white/10 group-hover:scale-110 transition-transform duration-500">
                  {award.icon}
                </div>
                <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-5 md:mb-6 group-hover:text-cyan-400 transition-colors">
                  {award.title}
                </h4>
                <div className="flex flex-wrap gap-2 mb-6 sm:mb-7 md:mb-8">
                  {award.items.map((item, idx) => (
                    <span key={idx} className="px-2.5 sm:px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] sm:text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                      {item}
                    </span>
                  ))}
                </div>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 leading-relaxed font-light">
                  {award.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollSection>

      {/* Global Programs */}
      <section className="relative z-10 px-4 sm:px-6 md:px-12 lg:px-20 py-20 sm:py-24 md:py-32 bg-zinc-950/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeader accent="text-cyan-400" title="Academic & Corporate Path" subtitle="Global Programs" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {PROGRAMS.map((program, i) => (
              <div
                key={i}
                style={{ transitionDelay: `${i * 100}ms` }}
                className={`p-6 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl bg-zinc-900/50 border-t-4 ${program.color} hover:bg-zinc-800 transition-all cursor-default group`}
              >
                <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 group-hover:translate-x-1 transition-transform">{program.title}</h4>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{program.desc}</p>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Service */}
      <ScrollSection title="Global Citizenship" subtitle="Leadership & Service" icon={<Users className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />} accent="text-blue-500">
        <div className="space-y-3 sm:space-y-4">
          {LEADERSHIP.map((item, i) => (
            <div
              key={i}
              style={{ transitionDelay: `${i * 150}ms` }}
              className="group flex flex-col md:flex-row md:items-center gap-4 sm:gap-6 md:gap-8 p-6 sm:p-8 md:p-10 rounded-[1.5rem] sm:rounded-[2rem] hover:bg-white/[0.03] transition-all border border-transparent hover:border-white/5"
            >
              <div className="md:w-1/3">
                <p className="text-cyan-500 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest mb-1 sm:mb-2">{item.stat}</p>
                <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-white group-hover:text-blue-500 transition-colors">
                  {item.title}
                </h4>
              </div>
              <div className="md:w-2/3">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 font-light leading-relaxed">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollSection>

      {/* High-Impact CTA */}
      <section className="relative z-10 px-4 sm:px-6 md:px-12 lg:px-20 py-20 sm:py-24 md:py-32">
        <div className="w-full md:max-w-6xl mx-auto">
          <div className="relative rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] lg:rounded-[3.5rem] p-8 sm:p-10 md:p-16 lg:p-20 xl:p-24 bg-gradient-to-br from-blue-900/20 to-black border border-white/10 overflow-hidden group text-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[500px] md:w-[600px] h-[400px] sm:h-[500px] md:h-[600px] bg-blue-600/10 blur-[100px] sm:blur-[120px] rounded-full group-hover:scale-125 transition-transform duration-1000" />

            <h2 className="relative z-10 text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-7xl font-bold text-white mb-6 sm:mb-7 md:mb-8 tracking-tighter leading-none">
              Impact = proof of responsibility
            </h2>
            <p className="relative z-10 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-400 font-light mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed">
              Real-world influence beyond business   awards, programs, and service that demonstrate commitment to global impact.
            </p>

            <div className="relative z-10 flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6 justify-center">
              <Link
                href="/connect"
                className="w-full sm:w-auto px-8 sm:px-9 md:px-10 py-4 sm:py-4.5 md:py-5 text-sm sm:text-base md:text-lg bg-white text-black font-bold rounded-full hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 sm:gap-2.5 md:gap-3 group">
                Get in touch <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
              </Link>
              <Link
                href="/research"
                className="w-full sm:w-auto px-8 sm:px-9 md:px-10 py-4 sm:py-4.5 md:py-5 text-sm sm:text-base md:text-lg border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-all flex items-center justify-center gap-2 sm:gap-2.5 md:gap-3 group">
                View Research <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}

// SectionHeader Props
interface SectionHeaderProps {
  accent: string;
  title: string;
  subtitle: string;
}

function SectionHeader({ accent, title, subtitle }: SectionHeaderProps) {
  const [ref, visible] = useIntersectionObserver({ threshold: 0.2, once: true });
  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      className={`mb-10 sm:mb-12 md:mb-16 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
    >
      <h2 className={`${accent} text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-3 sm:mb-4`}>{title}</h2>
      <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">{subtitle}</h3>
    </div>
  );
}

// ScrollSection Props
interface ScrollSectionProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  accent: string;
  children: React.ReactNode;
}

function ScrollSection({ title, subtitle, icon, accent, children }: ScrollSectionProps) {
  const [ref, visible] = useIntersectionObserver({ threshold: 0.1, once: true });
  return (
    <section
      ref={ref as React.Ref<HTMLDivElement>}
      className="relative z-10 px-4 sm:px-6 md:px-12 lg:px-20 py-16 sm:py-20 md:py-24"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`mb-12 sm:mb-16 md:mb-20 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <h2 className={`${accent} text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3`}>
            {icon} {title}
          </h2>
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">{subtitle}</h3>
        </div>
        <div
          className={`transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
