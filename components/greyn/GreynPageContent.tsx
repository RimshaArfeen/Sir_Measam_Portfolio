"use client"
import React, { useEffect, useRef, useState, ReactNode } from 'react';
import {
  Globe,
  Zap,
  Target,
  ShieldCheck,
  ArrowUpRight,
  TrendingUp,
  Layers,
  CheckCircle2,
  Mail,
  FileText
} from 'lucide-react';
import AnimatedBeamsBackground from '../AnimatedBeamsBackground/AnimatedBeamsBackground';
import { useIntersectionObserver } from '../research/ResearchPageContent';
/**
 * Greyn (A Project) Page Redesign
 * Role: Senior UI/UX Designer & Developer
 * Theme: Black background, Cyan/Electric Blue accents.
 * Focus: High-end animation feel using native Intersection Observer.
 */

const HERO_TAGLINE =
  "Scalable technology and climate systems — built for verification, impact, and scale beyond borders.";

const PILLARS = [
  {
    title: "Climate",
    desc: "Verified impact and ESG infrastructure.",
    icon: <Globe className="text-cyan-400" size={24} />
  },
  {
    title: "Technology",
    desc: "Platforms that connect systems, not silos.",
    icon: <Layers className="text-blue-500" size={24} />
  },
  {
    title: "Scale",
    desc: "Global deployment, remote-first execution.",
    icon: <TrendingUp className="text-cyan-400" size={24} />
  },
];

const FEATURES = [
  {
    title: "Transparent & verifiable",
    body: "Every outcome tracked and reported for real accountability.",
  },
  {
    title: "Execution-first",
    body: "Teams, products, and go-to-market — shipped, not theorized.",
  },
  {
    title: "Built for borders",
    body: "Designed for international adoption and measurable impact.",
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



export default function App() {
    const [heroRef, heroVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.1, once: true });
  
  return (
    <div className="bg-black text-white min-h-screen selection:bg-cyan-500/30 overflow-x-hidden font-sans">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
          
          body {
            font-family: 'Inter', sans-serif;
            background-color: black;
          }

          .text-glow-cyan {
            text-shadow: 0 0 20px rgba(34, 211, 238, 0.3);
          }
          
          .bg-grid-white {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.04)'%3E%3Cpath d='M0 .5H31.5V32'/%3E%3C/svg%3E");
          }
        `}
      </style>

      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-600/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-cyan-600/5 rounded-full blur-[140px]" />
        <AnimatedBeamsBackground />
        {/* <div className="absolute inset-0 bg-grid-white [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" /> */}
      </div>

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section
          ref={heroRef}
          className="relative min-h-[100vh] flex flex-col justify-center px-6 md:px-24 pt-32 pb-16 bg-black/40 text-white overflow-hidden"
        >
          {/* Background blur spots */}
          <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-cyan-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-blue-600/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 w-fit bg-white/5 backdrop-blur-sm text-[10px] uppercase tracking-[0.3em] font-bold text-cyan-400 mb-8 transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <Zap size={12} fill="currentColor" /> Research Spotlight
          </div>

          {/* Heading */}
          <h1 className="text-6xl md:text-9xl font-extrabold tracking-tighter mb-8 leading-[0.9] flex flex-wrap overflow-hidden">
            {"Greyn".split("").map((char, i) => (
              <span key={i} className="inline-block overflow-hidden">
                <span
                  className={`inline-block transition-transform duration-700 ease-out`}
                  style={{
                    transform: heroVisible ? "translateY(0)" : "translateY(100%)",
                    opacity: heroVisible ? 1 : 0,
                    transitionDelay: `${i * 80}ms`,
                  }}
                >
                  {char}
                </span>
              </span>
            ))}
          </h1>


          {/* Tagline */}
          <p className={`text-xl md:text-3xl text-gray-400 max-w-3xl leading-relaxed font-light transition-all duration-1000 delay-500 ${heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
            {HERO_TAGLINE}
          </p>

          {/* Divider line */}
          <div className={`h-[1px] w-48 bg-gradient-to-r from-cyan-400 to-transparent mt-8 transition-all duration-1000 ${heroVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} />
        </section>

        {/* PILLARS / BENTO SECTION */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <FadeIn direction="left">
              <div>
                <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-2">01 // Foundations</p>
                <h2 className="text-3xl md:text-5xl font-bold">What we stand for</h2>
              </div>
            </FadeIn>
            <FadeIn direction="right" delay={200}>
              <div className="h-[1px] w-full md:w-64 bg-gradient-to-r from-cyan-500/50 to-transparent hidden md:block" />
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map((pillar, i) => (
              <FadeIn key={i} delay={i * 150} direction="up">
                <div className="group relative p-8 h-full rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-cyan-500/30 transition-all duration-500">
                  <div className="mb-12 p-3 w-fit rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/20 transition-all duration-500">
                    {pillar.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-cyan-400 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    {pillar.desc}
                  </p>

                  {/* Decorative corner accent */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight size={20} className="text-cyan-500/50" />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* FEATURES / LIST SECTION */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <FadeIn direction="left">
                <p className="text-blue-500 font-mono text-sm tracking-widest uppercase mb-2">02 // Methodology</p>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Core Features</h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Greyn is architected to eliminate friction in verification and deployment, ensuring that global impact is as measurable as it is scalable.
                </p>
              </FadeIn>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {FEATURES.map((feature, i) => (
                <FadeIn key={i} delay={i * 100} direction="right">
                  <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 flex gap-6 items-start group">
                    <div className="mt-1 text-cyan-400 group-hover:scale-125 transition-transform duration-300">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">{feature.title}</h4>
                      <p className="text-gray-400 text-lg leading-relaxed">{feature.body}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-32 px-6">
          <FadeIn direction="up">
            <div className="max-w-5xl mx-auto relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-white/10 p-12 md:p-24 text-center">
              <div className="absolute inset-0 bg-grid-white opacity-10" />

              <div className="relative z-10">
                <h2 className="text-4xl md:text-7xl font-extrabold mb-8 tracking-tighter">
                  Built for impact at scale.
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
                  Greyn powers ventures across climate-tech, platforms, and digital infrastructure — execution-first, globally.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2 group">
                    <Mail size={20} />
                    Get in touch
                    <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                  <button className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                    <FileText size={20} />
                    View Research
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        
      </main>
    </div>
  );
}