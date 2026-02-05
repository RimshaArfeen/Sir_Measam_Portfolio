
"use client"
import React, { useEffect, useRef, useState, ReactNode } from 'react';
import {
  Globe,
  Zap,
  ShieldCheck,
  ArrowUpRight,
  LayoutGrid,
  Cpu,
  GraduationCap,
  Network,
  Scale,
  Settings,
  Mail,
  FileText,
  Workflow
} from 'lucide-react';
import AnimatedBeamsBackground from '../AnimatedBeamsBackground/AnimatedBeamsBackground';
import Link from 'next/link';
/**
 * Ventures (A Project) Page Redesign
 * Role: Senior UI/UX Designer & Developer
 * Aesthetic: Industrial Tech, High-contrast, Bento-architecture.
 */

const HERO_TAGLINE = "Meetech Labs & Ecosystem — scale beyond one project.";

const OVERVIEW_ITEMS = [
  {
    title: "Parent organization",
    desc: "Meetech Labs builds and operates ventures across sectors, providing structure, capital readiness, and shared infrastructure.",
    icon: <LayoutGrid className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-cyan-400 flex-shrink-0" />
  },
  {
    title: "Multi-sector focus",
    desc: "Climate-tech, digital platforms, education, and global services — united by execution-first and transparent governance.",
    icon: <Workflow className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-500 flex-shrink-0" />
  },
];

const VENTURE_AREAS = [
  {
    title: "Climate-tech",
    desc: "Verified impact, ESG infrastructure, and solutions built for scale and accountability.",
    icon: <Globe className="text-cyan-400 flex-shrink-0" size={18} />
  },
  {
    title: "Digital platforms",
    desc: "Products and systems that connect stakeholders, not silos — designed for international adoption.",
    icon: <Cpu className="text-blue-500 flex-shrink-0" size={18} />
  },
  {
    title: "Education & innovation",
    desc: "Programs, research, and capacity-building for the next generation of builders and leaders.",
    icon: <GraduationCap className="text-cyan-400 flex-shrink-0" size={18} />
  },
  {
    title: "Global services",
    desc: "Remote-first delivery, distributed teams, and operations that work across borders and time zones.",
    icon: <Network className="text-blue-500 flex-shrink-0" size={18} />
  },
];

const HOW_BUILT = [
  { title: "Independent scalability", body: "Each venture is designed to grow on its own — with clear ownership, metrics, and path to sustainability." },
  { title: "International readiness", body: "From day one, ventures are built for global deployment: compliance, localization, and distributed execution." },
  { title: "Transparent governance", body: "Reporting, verification, and accountability are built into how we operate and measure impact." },
];

const OPERATING_MODEL = [
  {
    title: "Remote-first",
    desc: "Teams and operations are distributed by design — no single HQ required to deliver at scale.",
    icon: <Globe className="flex-shrink-0" size={18} />
  },
  {
    title: "Distributed execution",
    desc: "Work happens where talent and opportunity are; coordination and systems keep everything aligned.",
    icon: <Settings className="flex-shrink-0" size={18} />
  },
  {
    title: "System-based growth",
    desc: "Processes, platforms, and governance scale with the portfolio — not ad hoc, but repeatable.",
    icon: <Scale className="flex-shrink-0" size={18} />
  },
];

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  direction = "up",
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const directions = {
    up: "translate-y-12",
    down: "-translate-y-12",
    left: "translate-x-12",
    right: "-translate-x-12",
    none: "",
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className} ${isVisible
        ? "opacity-100 translate-y-0 translate-x-0"
        : `opacity-0 ${directions[direction]}`
        }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export function useIntersectionObserver<T extends HTMLElement>(options = {}) {
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

  return [elementRef, isVisible] as const; // <-- TS infers tuple
}


export default function App() {
  const [heroRef, heroVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.1, once: true });

  return (
    <div className="bg-black/70 text-white h-full md:min-h-screen selection:bg-cyan-500/30 font-sans">
      <style>
        {`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
      body { font-family: 'Inter', sans-serif; background-color: black; }
    `}
      </style>

      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] -mr-48 -mt-48" />
        <AnimatedBeamsBackground />
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-[85vh] flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-20 py-16 sm:py-20 md:py-24 pt-24 sm:pt-28 md:pt-32 text-white">

          {/* Background Glows */}
          <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-cyan-600/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-blue-600/10 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
          </div>

          {/* Small Tagline */}
          <div className="mb-4 sm:mb-5 md:mb-6 overflow-hidden">
            <p className={`text-cyan-400 font-mono tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.5em] uppercase text-xs sm:text-sm transform transition-all duration-1000 delay-100 ${heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
              Strategic Ecosystem
            </p>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[11rem] font-bold tracking-tighter leading-[0.85] mb-8 sm:mb-10 md:mb-12 flex flex-wrap overflow-hidden">
            {"Ventures".split("").map((char, i) => (
              <span
                key={i}
                className="inline-block transform opacity-100 translate-y-0 transition-all duration-[1200ms]"
              >
                {char}
              </span>

            ))}
            <span className="text-cyan-400 opacity-0 translate-y-full transition-all" style={{ transitionDelay: '0.6s' }}>.</span>
          </h1>


          {/* Tagline */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 sm:gap-6 md:gap-8">
            <div className={`animate-line h-[1px] w-24 sm:w-32 md:w-48 bg-gradient-to-r from-cyan-400 to-transparent origin-left opacity-0 ${heroVisible ? 'opacity-100 scale-x-100' : 'scale-x-0'}`} />
            <p className={`text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-400 font-light max-w-2xl leading-tight transition-all duration-1000 delay-1000 ${heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
              {HERO_TAGLINE}
            </p>
          </div>
        </section>

        {/* OVERVIEW BENTO SECTION */}
        <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 md:gap-8">
            {OVERVIEW_ITEMS.map((item, i) => (
              <FadeIn key={i} delay={i * 200} direction={i === 0 ? "left" : "right"}>
                <div className="p-8 sm:p-9 md:p-10 rounded-[2rem] sm:rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-cyan-500/20 transition-all group h-full">
                  <div className="mb-6 sm:mb-7 md:mb-8 p-3 sm:p-4 w-fit rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">{item.title}</h3>
                  <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* VENTURE AREAS GRID */}
        <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto border-t border-white/5">
          <FadeIn>
            <div className="mb-10 sm:mb-12 md:mb-16">
              <h2 className="text-xs sm:text-sm font-mono uppercase tracking-[0.4em] sm:tracking-[0.5em] text-blue-500 mb-3 sm:mb-4">02 / Vertical Focus</h2>
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Venture Areas</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {VENTURE_AREAS.map((area, i) => (
              <FadeIn key={i} delay={i * 100} className="h-full">
                <div className="p-6 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl bg-white/[0.05] border border-white/5 hover:bg-white/[0.03] transition-all h-full group">
                  <div className="mb-5 sm:mb-6 text-gray-500 group-hover:text-cyan-400 transition-colors">
                    {area.icon}
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{area.title}</h4>
                  <p className="text-sm sm:text-base text-gray-500 group-hover:text-gray-400 transition-colors leading-relaxed">
                    {area.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* METHODOLOGY SECTION */}
        <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 md:gap-16">
            <div className="lg:col-span-5">
              <FadeIn direction="left">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-7 md:mb-8">How Ventures Are Built</h2>
                <div className="space-y-3 sm:space-y-4">
                  <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full" />
                  <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed">
                    Our process is designed to turn high-impact theories into sustainable, market-ready realities through three foundational layers.
                  </p>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-7 space-y-3 sm:space-y-4">
              {HOW_BUILT.map((item, i) => (
                <FadeIn key={i} delay={i * 150} direction="right">
                  <div className="p-6 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl border border-white/5 bg-white/[0.04] flex items-start gap-4 sm:gap-6 md:gap-8 group hover:border-blue-500/30 transition-all">
                    <span className="text-blue-500 font-mono text-lg sm:text-xl font-bold opacity-30 group-hover:opacity-100 transition-opacity flex-shrink-0">0{i + 1}</span>
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold mb-1.5 sm:mb-2">{item.title}</h4>
                      <p className="text-sm sm:text-base text-gray-400 leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* OPERATING MODEL SECTION */}
        <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto border-t border-white/5">
          <FadeIn>
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Operating Model</h2>
              <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto">A framework for repeatable success across borders.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 md:gap-8 items-stretch">
            {OPERATING_MODEL.map((model, i) => (
              <FadeIn key={i} delay={i * 150} direction="up">
                <div className="h-full flex flex-col text-center p-8 sm:p-9 md:p-10 rounded-[2.5rem] sm:rounded-[3rem] border border-white/5 bg-white/[0.0] hover:border-cyan-500/30 transition-all">
                  <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 mb-5 sm:mb-6">
                    {model.icon}
                  </div>

                  <h4 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">
                    {model.title}
                  </h4>

                  <p className="text-sm sm:text-base text-gray-500 leading-relaxed flex-grow">
                    {model.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

        </section>

        {/* CTA SECTION */}
        <section className="py-20 sm:py-24 md:py-32 px-4 sm:px-6">
          <FadeIn direction="up">
            <div className="max-w-6xl mx-auto relative rounded-[2.5rem] sm:rounded-[3rem] md:rounded-[3.5rem] lg:rounded-[4rem] overflow-hidden bg-white/5 border border-white/10 p-8 sm:p-12 md:p-16 lg:p-20 xl:p-24 text-center">
              <div className="absolute inset-0 bg-dots opacity-20" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_20px_rgba(34,211,238,0.5)]" />

              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-extrabold mb-6 sm:mb-7 md:mb-8 tracking-tighter">
                  Ventures = long-term vision
                </h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 leading-relaxed font-light">
                  We build companies and ecosystems that scale beyond one project, execution-first, globally distributed, and built for impact.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6 justify-center">
                  <Link href="/connect" className="w-full sm:w-auto px-8 sm:px-9 md:px-10 py-4 sm:py-4.5 md:py-5 text-sm sm:text-base md:text-lg bg-cyan-500 text-black rounded-full font-bold hover:bg-white transition-all flex items-center justify-center gap-2 group">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    Get in touch
                    <ArrowUpRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 flex-shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                  <Link href="/research" className="w-full sm:w-auto px-8 sm:px-9 md:px-10 py-4 sm:py-4.5 md:py-5 text-sm sm:text-base md:text-lg bg-white/5 border border-white/10 text-white rounded-full font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    View Research
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>


      </main>
    </div>
  );
}