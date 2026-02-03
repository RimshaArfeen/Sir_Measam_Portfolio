// "use client";

// import { useRef, useEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useLenis } from "@/providers";
// import { PageCTASection } from "@/components/PageCTASection";

// gsap.registerPlugin(ScrollTrigger);

// const HERO_TAGLINE =
//   "Meetech Labs & Ecosystem — scale beyond one project.";

// const OVERVIEW_ITEMS = [
//   { title: "Parent organization", desc: "Meetech Labs builds and operates ventures across sectors, providing structure, capital readiness, and shared infrastructure." },
//   { title: "Multi-sector focus", desc: "Climate-tech, digital platforms, education, and global services — united by execution-first and transparent governance." },
// ];

// const VENTURE_AREAS = [
//   { title: "Climate-tech", desc: "Verified impact, ESG infrastructure, and solutions built for scale and accountability." },
//   { title: "Digital platforms", desc: "Products and systems that connect stakeholders, not silos — designed for international adoption." },
//   { title: "Education & innovation", desc: "Programs, research, and capacity-building for the next generation of builders and leaders." },
//   { title: "Global services", desc: "Remote-first delivery, distributed teams, and operations that work across borders and time zones." },
// ];

// const HOW_BUILT = [
//   { title: "Independent scalability", body: "Each venture is designed to grow on its own — with clear ownership, metrics, and path to sustainability." },
//   { title: "International readiness", body: "From day one, ventures are built for global deployment: compliance, localization, and distributed execution." },
//   { title: "Transparent governance", body: "Reporting, verification, and accountability are built into how we operate and measure impact." },
// ];

// const OPERATING_MODEL = [
//   { title: "Remote-first", desc: "Teams and operations are distributed by design — no single HQ required to deliver at scale." },
//   { title: "Distributed execution", desc: "Work happens where talent and opportunity are; coordination and systems keep everything aligned." },
//   { title: "System-based growth", desc: "Processes, platforms, and governance scale with the portfolio — not ad hoc, but repeatable." },
// ];

// export function VenturesPageContent() {
//   const lenis = useLenis();
//   const heroRef = useRef<HTMLElement>(null);
//   const titleCharsRef = useRef<HTMLSpanElement[]>([]);
//   const taglineRef = useRef<HTMLParagraphElement>(null);
//   const overviewRef = useRef<HTMLDivElement>(null);
//   const overviewCardsRef = useRef<(HTMLDivElement | null)[]>([]);
//   const areasRef = useRef<HTMLDivElement>(null);
//   const areaCardsRef = useRef<(HTMLDivElement | null)[]>([]);
//   const builtRef = useRef<HTMLDivElement>(null);
//   const builtCardsRef = useRef<(HTMLDivElement | null)[]>([]);
//   const modelRef = useRef<HTMLDivElement>(null);
//   const modelCardsRef = useRef<(HTMLDivElement | null)[]>([]);

//   useEffect(() => {
//     if (lenis) {
//       ScrollTrigger.scrollerProxy(document.documentElement, {
//         scrollTop: () => lenis.scroll,
//         getBoundingClientRect: () => ({
//           top: 0,
//           left: 0,
//           width: window.innerWidth,
//           height: window.innerHeight,
//         }),
//       });
//       const onScroll = () => ScrollTrigger.update();
//       lenis.on("scroll", onScroll);
//       ScrollTrigger.refresh();
//       return () => lenis.off("scroll", onScroll);
//     }
//   }, [lenis]);

//   useEffect(() => {
//     const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

//     if (reducedMotion) {
//       gsap.set(
//         [
//           taglineRef.current,
//           ...overviewCardsRef.current,
//           ...areaCardsRef.current,
//           ...builtCardsRef.current,
//           ...modelCardsRef.current,
//         ].filter(Boolean),
//         { opacity: 1, y: 0, scale: 1, x: 0 }
//       );
//       titleCharsRef.current.forEach((el) => el && gsap.set(el, { opacity: 1, y: 0 }));
//       return;
//     }

//     const chars = titleCharsRef.current.filter(Boolean);
//     const tagline = taglineRef.current;
//     const hero = heroRef.current;

//     const runHeroAnimation = () => {
//       if (chars.length) {
//         gsap.set(chars, { opacity: 0, y: 60 });
//         gsap.to(chars, {
//           opacity: 1,
//           y: 0,
//           duration: 0.6,
//           stagger: 0.04,
//           ease: "back.out(1.2)",
//           delay: 0.2,
//         });
//       }
//       if (tagline) {
//         gsap.set(tagline, { opacity: 0, y: 32 });
//         gsap.to(tagline, {
//           opacity: 1,
//           y: 0,
//           duration: 0.9,
//           delay: 0.8,
//           ease: "power3.out",
//         });
//       }
//     };

//     if (chars.length) gsap.set(chars, { opacity: 0, y: 60 });
//     if (tagline) gsap.set(tagline, { opacity: 0, y: 32 });

//     if (hero) {
//       ScrollTrigger.create({
//         trigger: hero,
//         start: "bottom top",
//         onEnter: runHeroAnimation,
//         onEnterBack: runHeroAnimation,
//       });
//       if (hero.getBoundingClientRect().top < window.innerHeight) runHeroAnimation();
//     }

//     const runCardAnimation = (el: HTMLDivElement, i: number) => {
//       gsap.set(el, { opacity: 0, y: 80, scale: 0.92 });
//       gsap.to(el, {
//         opacity: 1,
//         y: 0,
//         scale: 1,
//         duration: 0.9,
//         delay: i * 0.12,
//         ease: "back.out(1.1)",
//       });
//     };

//     overviewCardsRef.current.forEach((el, i) => {
//       if (!el) return;
//       gsap.set(el, { opacity: 0, y: 80, scale: 0.92 });
//       ScrollTrigger.create({
//         trigger: el,
//         start: "top 90%",
//         onEnter: () => runCardAnimation(el, i),
//         onEnterBack: () => runCardAnimation(el, i),
//       });
//     });

//     areaCardsRef.current.forEach((el, i) => {
//       if (!el) return;
//       gsap.set(el, { opacity: 0, y: 80, scale: 0.92 });
//       ScrollTrigger.create({
//         trigger: el,
//         start: "top 90%",
//         onEnter: () => runCardAnimation(el, i),
//         onEnterBack: () => runCardAnimation(el, i),
//       });
//     });

//     const runBuiltAnimation = (el: HTMLDivElement, i: number) => {
//       const fromX = i % 2 === 0 ? -80 : 80;
//       gsap.set(el, { opacity: 0, x: fromX, scale: 0.96 });
//       gsap.to(el, {
//         opacity: 1,
//         x: 0,
//         scale: 1,
//         duration: 0.85,
//         delay: i * 0.1,
//         ease: "power3.out",
//       });
//     };

//     builtCardsRef.current.forEach((el, i) => {
//       if (!el) return;
//       const fromX = i % 2 === 0 ? -80 : 80;
//       gsap.set(el, { opacity: 0, x: fromX, scale: 0.96 });
//       ScrollTrigger.create({
//         trigger: el,
//         start: "top 88%",
//         onEnter: () => runBuiltAnimation(el, i),
//         onEnterBack: () => runBuiltAnimation(el, i),
//       });
//     });

//     modelCardsRef.current.forEach((el, i) => {
//       if (!el) return;
//       gsap.set(el, { opacity: 0, y: 80, scale: 0.92 });
//       ScrollTrigger.create({
//         trigger: el,
//         start: "top 90%",
//         onEnter: () => runCardAnimation(el, i),
//         onEnterBack: () => runCardAnimation(el, i),
//       });
//     });

//     const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 100);
//     return () => {
//       clearTimeout(refreshTimer);
//       ScrollTrigger.getAll().forEach((t) => t.kill());
//     };
//   }, [lenis]);

//   const title = "Ventures";

//   return (
//     <main className="min-h-screen w-full overflow-hidden">
//       <section
//         ref={heroRef}
//         className="flex flex-col justify-center px-[var(--space-page-x)] pt-32 sm:pt-28 md:pt-20 pb-8 md:pb-12"
//         aria-label="Ventures"
//       >
//         <h1
//           className="text-hero md:text-[clamp(3.5rem,12vw,6rem)] font-bold text-[var(--color-text)] tracking-tight mb-6 overflow-hidden"
//           style={{ lineHeight: 1.05 }}
//         >
//           {title.split("").map((char, i) => (
//             <span
//               key={i}
//               ref={(el) => {
//                 if (el) titleCharsRef.current[i] = el;
//               }}
//               className="inline-block"
//               style={{ willChange: "transform" }}
//             >
//               {char === " " ? "\u00A0" : char}
//             </span>
//           ))}
//         </h1>
//         <p
//           ref={taglineRef}
//           className="text-body-lg md:text-xl text-[var(--color-text-muted)] max-w-2xl leading-relaxed"
//         >
//           {HERO_TAGLINE}
//         </p>
//       </section>

//       <section
//         ref={overviewRef}
//         className="px-[var(--space-page-x)] pt-8 md:pt-10 pb-10 md:pb-14 border-t border-[var(--color-border)]"
//         aria-label="Meetech Labs Overview"
//       >
//         <div className="max-w-5xl mx-auto">
//           <p className="text-meta text-[var(--color-accent)] font-semibold tracking-widest uppercase mb-6">
//             Meetech Labs Overview
//           </p>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
//             {OVERVIEW_ITEMS.map((item, i) => (
//               <div
//                 key={item.title}
//                 ref={(el) => {
//                   overviewCardsRef.current[i] = el;
//                 }}
//                 className="p-8 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] transition-colors duration-300"
//               >
//                 <h3 className="text-h2 text-[var(--color-text)] mb-3">
//                   {item.title}
//                 </h3>
//                 <p className="text-body text-[var(--color-text-muted)] leading-relaxed">
//                   {item.desc}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section
//         ref={areasRef}
//         className="px-[var(--space-page-x)] pt-8 md:pt-10 pb-10 md:pb-14 border-t border-[var(--color-border)]"
//         aria-label="Venture Areas"
//       >
//         <div className="max-w-5xl mx-auto">
//           <p className="text-meta text-[var(--color-accent)] font-semibold tracking-widest uppercase mb-6">
//             Venture Areas
//           </p>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
//             {VENTURE_AREAS.map((area, i) => (
//               <div
//                 key={area.title}
//                 ref={(el) => {
//                   areaCardsRef.current[i] = el;
//                 }}
//                 className="p-8 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] transition-colors duration-300"
//               >
//                 <h3 className="text-h2 text-[var(--color-text)] mb-3">
//                   {area.title}
//                 </h3>
//                 <p className="text-body text-[var(--color-text-muted)] leading-relaxed">
//                   {area.desc}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section
//         ref={builtRef}
//         className="px-[var(--space-page-x)] py-10 md:py-14 border-t border-[var(--color-border)]"
//         aria-label="How Ventures Are Built"
//       >
//         <div className="max-w-4xl mx-auto">
//           <p className="text-meta text-[var(--color-accent)] font-semibold tracking-widest uppercase mb-8">
//             How Ventures Are Built
//           </p>
//           <div className="space-y-0">
//             {HOW_BUILT.map((item, i) => (
//               <div
//                 key={item.title}
//                 ref={(el) => {
//                   builtCardsRef.current[i] = el;
//                 }}
//                 className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 py-6 border-b border-[var(--color-border)] last:border-0"
//               >
//                 <h3 className="text-h2 text-[var(--color-accent)] font-semibold md:w-2/5 shrink-0">
//                   {item.title}
//                 </h3>
//                 <p className="text-body-lg text-[var(--color-text-muted)] md:w-3/5 leading-relaxed">
//                   {item.body}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section
//         ref={modelRef}
//         className="px-[var(--space-page-x)] pt-8 md:pt-10 pb-10 md:pb-14 border-t border-[var(--color-border)]"
//         aria-label="Operating Model"
//       >
//         <div className="max-w-5xl mx-auto">
//           <p className="text-meta text-[var(--color-accent)] font-semibold tracking-widest uppercase mb-6">
//             Operating Model
//           </p>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
//             {OPERATING_MODEL.map((item, i) => (
//               <div
//                 key={item.title}
//                 ref={(el) => {
//                   modelCardsRef.current[i] = el;
//                 }}
//                 className="p-8 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] transition-colors duration-300"
//               >
//                 <h3 className="text-h2 text-[var(--color-text)] mb-3">
//                   {item.title}
//                 </h3>
//                 <p className="text-body text-[var(--color-text-muted)] leading-relaxed">
//                   {item.desc}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <PageCTASection
//         heading="Ventures = long-term vision"
//         description="We build companies and ecosystems that scale beyond one project — execution-first, globally distributed, and built for impact."
//         primaryButton={{ label: "Get in touch", href: "/connect" }}
//         secondaryButton={{ label: "View Research", href: "/research" }}
//       />
//     </main>
//   );
// }
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
    icon: <LayoutGrid className="text-cyan-400" />
  },
  {
    title: "Multi-sector focus",
    desc: "Climate-tech, digital platforms, education, and global services — united by execution-first and transparent governance.",
    icon: <Workflow className="text-blue-500" />
  },
];

const VENTURE_AREAS = [
  {
    title: "Climate-tech",
    desc: "Verified impact, ESG infrastructure, and solutions built for scale and accountability.",
    icon: <Globe className="text-cyan-400" size={20} />
  },
  {
    title: "Digital platforms",
    desc: "Products and systems that connect stakeholders, not silos — designed for international adoption.",
    icon: <Cpu className="text-blue-500" size={20} />
  },
  {
    title: "Education & innovation",
    desc: "Programs, research, and capacity-building for the next generation of builders and leaders.",
    icon: <GraduationCap className="text-cyan-400" size={20} />
  },
  {
    title: "Global services",
    desc: "Remote-first delivery, distributed teams, and operations that work across borders and time zones.",
    icon: <Network className="text-blue-500" size={20} />
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
    icon: <Globe size={18} />
  },
  {
    title: "Distributed execution",
    desc: "Work happens where talent and opportunity are; coordination and systems keep everything aligned.",
    icon: <Settings size={18} />
  },
  {
    title: "System-based growth",
    desc: "Processes, platforms, and governance scale with the portfolio — not ad hoc, but repeatable.",
    icon: <Scale size={18} />
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
        <section ref={heroRef} className="relative min-h-[85vh] flex flex-col justify-center px-6 md:px-24 pt-32 pb-16 text-white">

          {/* Background Glows */}
          <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-cyan-600/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-blue-600/10 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
          </div>

          {/* Small Tagline */}
          <div className="mb-6 overflow-hidden">
            <p className={`text-cyan-400 font-mono tracking-[0.5em] uppercase text-sm transform transition-all duration-1000 delay-100 ${heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
              Strategic Ecosystem
            </p>
          </div>

          {/* Main Title */}
          <h1 className="text-7xl md:text-[11rem] font-bold tracking-tighter leading-[0.85] mb-12 flex flex-wrap overflow-hidden">
            {"Ventures".split("").map((char, i) => (
              <span
                className="inline-block transform opacity-100 translate-y-0 transition-all duration-[1200ms]"
              >
                {char}
              </span>
             
            ))}
            <span className="text-cyan-400 opacity-0 translate-y-full transition-all" style={{ transitionDelay: '0.6s' }}>.</span>
          </h1>


          {/* Tagline */}
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className={`animate-line h-[1px] w-full md:w-48 bg-gradient-to-r from-cyan-400 to-transparent origin-left opacity-0 ${heroVisible ? 'opacity-100 scale-x-100' : 'scale-x-0'}`} />
            <p className={`text-xl md:text-3xl text-gray-400 font-light max-w-2xl leading-tight transition-all duration-1000 delay-1000 ${heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
              {HERO_TAGLINE}
            </p>
          </div>
        </section>

        {/* OVERVIEW BENTO SECTION */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {OVERVIEW_ITEMS.map((item, i) => (
              <FadeIn key={i} delay={i * 200} direction={i === 0 ? "left" : "right"}>
                <div className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-cyan-500/20 transition-all group h-full">
                  <div className="mb-8 p-4 w-fit rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                    {React.cloneElement(item.icon, { size: 32 })}
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* VENTURE AREAS GRID */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
          <FadeIn>
            <div className="mb-16">
              <h2 className="text-sm font-mono uppercase tracking-[0.5em] text-blue-500 mb-4">02 / Vertical Focus</h2>
              <p className="text-3xl md:text-5xl font-bold">Venture Areas</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VENTURE_AREAS.map((area, i) => (
              <FadeIn key={i} delay={i * 100} className="h-full">
                <div className="p-8 rounded-3xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] transition-all h-full group">
                  <div className="mb-6 text-gray-500 group-hover:text-cyan-400 transition-colors">
                    {area.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-3">{area.title}</h4>
                  <p className="text-gray-500 group-hover:text-gray-400 transition-colors leading-relaxed">
                    {area.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* METHODOLOGY SECTION */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <FadeIn direction="left">
                <h2 className="text-3xl md:text-5xl font-bold mb-8">How Ventures Are Built</h2>
                <div className="space-y-4">
                  <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full" />
                  <p className="text-gray-400 text-lg leading-relaxed">
                    Our process is designed to turn high-impact theories into sustainable, market-ready realities through three foundational layers.
                  </p>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {HOW_BUILT.map((item, i) => (
                <FadeIn key={i} delay={i * 150} direction="right">
                  <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] flex items-start gap-8 group hover:border-blue-500/30 transition-all">
                    <span className="text-blue-500 font-mono text-xl font-bold opacity-30 group-hover:opacity-100 transition-opacity">0{i + 1}</span>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-gray-400 leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* OPERATING MODEL SECTION */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Operating Model</h2>
              <p className="text-gray-500 max-w-xl mx-auto">A framework for repeatable success across borders.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {OPERATING_MODEL.map((model, i) => (
              <FadeIn key={i} delay={i * 150} direction="up">
                <div className="text-center p-10 rounded-[3rem] border border-white/5 bg-white/[0.01] hover:border-cyan-500/30 transition-all">
                  <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 mb-6">
                    {model.icon}
                  </div>
                  <h4 className="text-2xl font-bold mb-4">{model.title}</h4>
                  <p className="text-gray-500 leading-relaxed">{model.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-32 px-6">
          <FadeIn direction="up">
            <div className="max-w-6xl mx-auto relative rounded-[4rem] overflow-hidden bg-white/5 border border-white/10 p-12 md:p-24 text-center">
              <div className="absolute inset-0 bg-dots opacity-20" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_20px_rgba(34,211,238,0.5)]" />

              <div className="relative z-10">
                <h2 className="text-4xl md:text-7xl font-extrabold mb-8 tracking-tighter">
                  Ventures = long-term vision
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
                  We build companies and ecosystems that scale beyond one project — execution-first, globally distributed, and built for impact.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button className="px-10 py-5 bg-cyan-500 text-black rounded-full font-bold text-lg hover:bg-white transition-all flex items-center justify-center gap-2 group">
                    <Mail size={20} />
                    Get in touch
                    <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                  <button className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2">
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