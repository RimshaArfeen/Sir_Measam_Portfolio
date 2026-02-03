// "use client";

// import { useRef, useEffect } from "react";
// import Image from "next/image";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useLenis } from "@/providers";

// gsap.registerPlugin(ScrollTrigger);

// const INTRO = "I build systems that solve real-world problems at scale.";

// const INTRO_PARAS = [
//   "I am a young founder, researcher, and global impact builder leading multi-sector ventures across climate-tech, ESG infrastructure, technology platforms, and digital services.",
//   "I operate remote-first, globally distributed teams, build scalable products, publish research, and launch solutions designed for international adoption and measurable impact.",
//   "My work sits at the intersection of technology, sustainability, and execution — focused on transparency, verification, and systems that scale beyond borders.",
// ];

// const TRAITS = ["Operating globally", "Remote-first", "Founder-led"];

// const ABOUT_ME_PARAS = [
//   "I am the Founder and Executive Lead of Meetech Labs, a parent organization that builds and operates ventures across climate-tech, technology platforms, education, and digital infrastructure.",
//   "My approach has always been execution-first. Instead of focusing on theory, I assemble teams, validate ideas, build real products, and launch to market. Today, I lead international teams, oversee product development, manage partnerships, and design go-to-market strategies fully remotely.",
//   "Alongside entrepreneurship, I am a published researcher, youth policy contributor, and global ambassador working across education, sustainability, and systemic inequality.",
// ];

// const BELIEFS = [
//   "Founder-led companies",
//   "Remote-first global teams",
//   "Transparent and verifiable impact",
//   "Technology that connects systems, not silos",
// ];

// const STATS = [
//   { value: 15, suffix: "+", label: "Countries Impacted" },
//   { value: 1000, suffix: "+", label: "Youth Trained or Mentored" },
//   { value: 10, suffix: "+", label: "Ventures Founded" },
//   { value: 4, suffix: "", label: "World Record Holder" },
// ];

// export function AboutPageContent() {
//   const lenis = useLenis();
//   const heroRef = useRef<HTMLElement>(null);
//   const introCharsRef = useRef<HTMLSpanElement[]>([]);
//   const introParasRef = useRef<(HTMLParagraphElement | null)[]>([]);
//   const traitsRef = useRef<HTMLDivElement>(null);
//   const traitItemsRef = useRef<(HTMLSpanElement | null)[]>([]);
//   const aboutHeadingRef = useRef<HTMLHeadingElement>(null);
//   const aboutParasRef = useRef<(HTMLParagraphElement | null)[]>([]);
//   const beliefsRef = useRef<HTMLUListElement>(null);
//   const beliefItemsRef = useRef<(HTMLLIElement | null)[]>([]);
//   const imagePlaceholderRef = useRef<HTMLDivElement>(null);
//   const statsRef = useRef<HTMLDivElement>(null);
//   const statValuesRef = useRef<(HTMLSpanElement | null)[]>([]);

//   useEffect(() => {
//     if (lenis) {
//       ScrollTrigger.scrollerProxy(document.documentElement, {
//         scrollTop: () => lenis.scroll,
//         getBoundingClientRect: () => ({ top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }),
//       });
//       const onScroll = () => ScrollTrigger.update();
//       lenis.on("scroll", onScroll);
//       ScrollTrigger.refresh();
//       return () => lenis.off("scroll", onScroll);
//     }
//   }, [lenis]);

//   useEffect(() => {
//     const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

//     const setVisible = (el: Element | null) => {
//       if (el) gsap.set(el, { opacity: 1, y: 0, scale: 1 });
//     };

//     if (reducedMotion) {
//       introCharsRef.current.forEach((el) => el && gsap.set(el, { opacity: 1, y: 0 }));
//       [introParasRef.current, traitsRef.current, aboutHeadingRef.current, aboutParasRef.current, beliefsRef.current, imagePlaceholderRef.current, statsRef.current].flat().filter(Boolean).forEach(setVisible);
//       beliefItemsRef.current.forEach((el) => el && gsap.set(el, { opacity: 1, y: 0 }));
//       traitItemsRef.current.forEach((el) => el && gsap.set(el, { opacity: 1, y: 0 }));
//       statValuesRef.current.forEach((el, i) => {
//         if (!el) return;
//         const s = STATS[i];
//         const formatted = s.value >= 1000 ? s.value.toLocaleString() : String(s.value);
//         el.textContent = s.suffix ? formatted + s.suffix : formatted;
//       });
//       return;
//     }

//     const hero = heroRef.current;
//     const chars = introCharsRef.current.filter(Boolean);
//     const introParas = introParasRef.current.filter(Boolean);
//     const traits = traitItemsRef.current.filter(Boolean);
//     const aboutHeading = aboutHeadingRef.current;
//     const aboutParas = aboutParasRef.current.filter(Boolean);
//     const beliefItems = beliefItemsRef.current.filter(Boolean);
//     const imageEl = imagePlaceholderRef.current;
//     const statsEl = statsRef.current;

//     const runHeroAnimation = () => {
//       if (chars.length) {
//         gsap.set(chars, { opacity: 0, y: 56 });
//         gsap.to(chars, {
//           opacity: 1,
//           y: 0,
//           duration: 0.55,
//           stagger: 0.03,
//           ease: "back.out(1.2)",
//           delay: 0.15,
//         });
//       }
//       introParas.forEach((el, i) => {
//         gsap.set(el, { opacity: 0, y: 32 });
//         gsap.to(el, { opacity: 1, y: 0, duration: 0.8, delay: 0.6 + i * 0.1, ease: "power3.out" });
//       });
//       if (traits.length) {
//         gsap.set(traits, { opacity: 0, y: 24 });
//         gsap.to(traits, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, delay: 1, ease: "power3.out" });
//       }
//     };

//     if (chars.length) gsap.set(chars, { opacity: 0, y: 56 });
//     introParas.forEach((el) => gsap.set(el, { opacity: 0, y: 32 }));
//     if (traits.length) gsap.set(traits, { opacity: 0, y: 24 });

//     if (hero) {
//       ScrollTrigger.create({
//         trigger: hero,
//         start: "bottom top",
//         onEnter: runHeroAnimation,
//         onEnterBack: runHeroAnimation,
//       });
//       if (hero.getBoundingClientRect().top < window.innerHeight) runHeroAnimation();
//     }

//     const runAboutBlock = () => {
//       if (aboutHeading) {
//         gsap.set(aboutHeading, { opacity: 0, y: 48 });
//         gsap.to(aboutHeading, { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.1)" });
//       }
//       aboutParas.forEach((el, i) => {
//         gsap.set(el, { opacity: 0, y: 32 });
//         gsap.to(el, { opacity: 1, y: 0, duration: 0.75, delay: 0.2 + i * 0.1, ease: "power3.out" });
//       });
//       beliefItems.forEach((el, i) => {
//         gsap.set(el, { opacity: 0, y: 24 });
//         gsap.to(el, { opacity: 1, y: 0, duration: 0.55, delay: 0.5 + i * 0.07, ease: "power3.out" });
//       });
//     };

//     if (aboutHeading) {
//       gsap.set(aboutHeading, { opacity: 0, y: 48 });
//       ScrollTrigger.create({
//         trigger: aboutHeading,
//         start: "top 88%",
//         onEnter: runAboutBlock,
//         onEnterBack: runAboutBlock,
//       });
//     }

//     const runImageAnimation = () => {
//       if (!imageEl) return;
//       gsap.set(imageEl, { opacity: 0, y: 56, scale: 0.9 });
//       gsap.to(imageEl, {
//         opacity: 1,
//         y: 0,
//         scale: 1,
//         duration: 1,
//         ease: "power3.out",
//         overwrite: "auto",
//       });
//     };

//     if (imageEl) {
//       gsap.set(imageEl, { opacity: 0, y: 56, scale: 0.9 });
//       ScrollTrigger.create({
//         trigger: imageEl,
//         start: "top 85%",
//         onEnter: runImageAnimation,
//         onEnterBack: runImageAnimation,
//       });
//     }

//     const runStatsAnimation = () => {
//       if (!statsEl) return;
//       gsap.set(statsEl, { opacity: 0, y: 40 });
//       gsap.to(statsEl, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
//       STATS.forEach((stat, i) => {
//         const el = statValuesRef.current[i];
//         if (!el) return;
//         el.textContent = "0";
//         const obj = { n: 0 };
//         gsap.to(obj, {
//           n: stat.value,
//           duration: 1.8,
//           delay: 0.3 + i * 0.12,
//           ease: "power2.out",
//           onUpdate: () => {
//             const v = Math.round(obj.n);
//             const formatted = stat.value >= 1000 ? v.toLocaleString() : String(v);
//             el.textContent = stat.suffix ? `${formatted}${stat.suffix}` : formatted;
//           },
//         });
//       });
//     };

//     if (statsEl) {
//       gsap.set(statsEl, { opacity: 0, y: 40 });
//       ScrollTrigger.create({
//         trigger: statsEl,
//         start: "top 85%",
//         onEnter: runStatsAnimation,
//         onEnterBack: runStatsAnimation,
//       });
//     }

//     const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 100);
//     return () => {
//       clearTimeout(refreshTimer);
//       ScrollTrigger.getAll().forEach((t) => t.kill());
//     };
//   }, [lenis]);

//   return (
//     <main className="min-h-screen w-full">
//       <section
//         ref={heroRef}
//         className="px-[var(--space-page-x)] pt-32 sm:pt-28 md:pt-20 pb-10 md:pb-14 max-w-5xl mx-auto"
//         aria-label="Introduction"
//       >
//         <h1
//           className="text-display md:text-hero text-[var(--color-text)] mb-8 overflow-hidden"
//           style={{ lineHeight: 1.1 }}
//         >
//           {INTRO.split("").map((char, i) => (
//             <span
//               key={i}
//               ref={(el) => { if (el) introCharsRef.current[i] = el; }}
//               className="inline-block"
//               style={{ willChange: "transform" }}
//             >
//               {char === " " ? "\u00A0" : char}
//             </span>
//           ))}
//         </h1>
//         <div className="space-y-6 max-w-3xl">
//           {INTRO_PARAS.map((text, i) => (
//             <p
//               key={i}
//               ref={(el) => { introParasRef.current[i] = el; }}
//               className="text-body-lg text-[var(--color-text-muted)] leading-relaxed"
//             >
//               {text}
//             </p>
//           ))}
//         </div>
//         <div
//           ref={traitsRef}
//           className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-caption text-[var(--color-text-subtle)] font-medium tracking-wide uppercase"
//         >
//           {TRAITS.map((t, i) => (
//             <span
//               key={t}
//               ref={(el) => { traitItemsRef.current[i] = el; }}
//             >
//               {t}
//             </span>
//           ))}
//         </div>
//       </section>

//       <section
//         className="px-[var(--space-page-x)] py-10 md:py-14 border-t border-[var(--color-border)]"
//         aria-label="About Me"
//       >
//         <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
//           <div className="lg:col-span-7">
//             <h2
//               ref={aboutHeadingRef}
//               className="text-h1 text-[var(--color-text)] mb-8"
//             >
//               About Me
//             </h2>
//             <div className="space-y-6">
//               {ABOUT_ME_PARAS.map((text, i) => (
//                 <p
//                   key={i}
//                   ref={(el) => { aboutParasRef.current[i] = el; }}
//                   className="text-body-lg text-[var(--color-text-muted)] leading-relaxed"
//                 >
//                   {text}
//                 </p>
//               ))}
//             </div>
//             <p className="mt-8 text-body font-medium text-[var(--color-text)]">
//               I believe the future belongs to:
//             </p>
//             <ul
//               ref={beliefsRef}
//               className="mt-4 space-y-3 text-body-lg text-[var(--color-text-muted)] list-none"
//             >
//               {BELIEFS.map((item, i) => (
//                 <li
//                   key={item}
//                   ref={(el) => { beliefItemsRef.current[i] = el; }}
//                   className="flex gap-3"
//                 >
//                   <span className="text-[var(--color-accent)] mt-1.5">•</span>
//                   <span>{item}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div
//             ref={imagePlaceholderRef}
//             className="lg:col-span-5 relative rounded-lg overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)] aspect-[4/5] min-h-[320px]"
//           >
//             <Image
//               src="/mesam.jpg"
//               alt="Muhammad Measm Raza, Founder and Executive Lead of Meetech Labs"
//               fill
//               sizes="(max-width: 1024px) 100vw, 42vw"
//               className="object-cover object-top"
//               priority
//             />
//           </div>
//         </div>
//       </section>

//       <section
//         ref={statsRef}
//         className="px-[var(--space-page-x)] py-10 md:py-14 border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)]"
//         aria-label="Impact stats"
//       >
//         <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
//           {STATS.map((stat, i) => (
//             <div
//               key={stat.label}
//               className="text-center"
//             >
//               <p className="text-display text-[var(--color-accent)] font-semibold tabular-nums">
//                 <span ref={(el) => { statValuesRef.current[i] = el; }}>0</span>
//               </p>
//               <p className="mt-2 text-caption text-[var(--color-text-muted)] font-medium tracking-wide uppercase">
//                 {stat.label}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// }

"use client"
import React, { useEffect, useRef, useState, ReactNode } from 'react';
import {
  Globe,
  Zap,
  Target,
  ShieldCheck,
  Users,
  Briefcase,
  MapPin,
  ArrowUpRight
} from 'lucide-react';
import AnimatedBeamsBackground from '../AnimatedBeamsBackground/AnimatedBeamsBackground';
import Link from 'next/link';
/**
 * Redesigned About Page
 * Focus: High-end UI/UX, Bento-grid layouts, and responsive interaction.
 * Color Palette: Black (bg), Cyan/Electric Blue (accents), White/Gray (text).
 */

const INTRO = "I build systems that solve real-world problems at scale.";

const INTRO_PARAS = [
  "I am a young founder, researcher, and global impact builder leading multi-sector ventures across climate-tech, ESG infrastructure, technology platforms, and digital services.",
  "I operate remote-first, globally distributed teams, build scalable products, publish research, and launch solutions designed for international adoption and measurable impact.",
  "My work sits at the intersection of technology, sustainability, and execution — focused on transparency, verification, and systems that scale beyond borders.",
];

const TRAITS = [
  { text: "Operating globally", icon: <Globe size={14} /> },
  { text: "Remote-first", icon: <MapPin size={14} /> },
  { text: "Founder-led", icon: <Zap size={14} /> }
];

const ABOUT_ME_PARAS = [
  "I am the Founder and Executive Lead of Meetech Labs, a parent organization that builds and operates ventures across climate-tech, technology platforms, education, and digital infrastructure.",
  "My approach has always been execution-first. Instead of focusing on theory, I assemble teams, validate ideas, build real products, and launch to market. Today, I lead international teams, oversee product development, manage partnerships, and design go-to-market strategies fully remotely.",
  "Alongside entrepreneurship, I am a published researcher, youth policy contributor, and global ambassador working across education, sustainability, and systemic inequality.",
];

const BELIEFS = [
  { title: "Founder-led companies", icon: <Briefcase className="text-cyan-400" /> },
  { title: "Remote-first global teams", icon: <Users className="text-blue-500" /> },
  { title: "Transparent and verifiable impact", icon: <ShieldCheck className="text-cyan-400" /> },
  { title: "Technology that connects systems, not silos", icon: <Target className="text-blue-500" /> },
];

const STATS = [
  { value: 15, suffix: "+", label: "Countries Impacted" },
  { value: 1000, suffix: "+", label: "Youth Trained" },
  { value: 10, suffix: "+", label: "Ventures Founded" },
  { value: 4, suffix: "", label: "World Records" },
];


type FadeInProps = {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
};


const FadeIn = ({
  children,
  delay = 0,
  direction = "up",
}: FadeInProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const directions = {
    up: "translate-y-10",
    down: "-translate-y-10",
    left: "translate-x-10",
    right: "-translate-x-10",
    none: "",
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`
        transition-all duration-700 ease-out
        ${isVisible ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0"}
        ${!isVisible ? directions[direction] : ""}
      `}
    >
      {children}
    </div>
  );
};


export default function App() {
  return (
    <div className="bg-black/40 text-white min-h-screen selection:bg-cyan-500/30 overflow-x-hidden">
     <AnimatedBeamsBackground />
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
          
          body {
            font-family: 'Inter', sans-serif;
            background-color: black;
            margin: 0;
          }

          /* Custom Scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }
          ::-webkit-scrollbar-track {
            background: #000;
          }
          ::-webkit-scrollbar-thumb {
            background: #1e1e1e;
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #2d2d2d;
          }
        `}
      </style>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/10 rounded-full blur-[120px]" />
      </div>

      <main className="relative z-10 py-24">
        {/* HERO SECTION */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-12">
              {INTRO.split(" ").map((word, i) => (
                <span key={i} className="inline-block mr-[0.25em]">
                  <FadeIn delay={i * 50} direction="up">
                    {word}
                  </FadeIn>
                </span>
              ))}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              <div className="space-y-6">
                {INTRO_PARAS.slice(0, 2).map((p, i) => (
                  <FadeIn key={i} delay={400 + (i * 100)}>
                    <p className="text-gray-400 text-lg leading-relaxed">
                      {p}
                    </p>
                  </FadeIn>
                ))}
              </div>
              <div className="space-y-6">
                <FadeIn delay={600}>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    {INTRO_PARAS[2]}
                  </p>
                </FadeIn>
                <div className="flex flex-wrap gap-3 pt-4">
                  {TRAITS.map((t, i) => (
                    <FadeIn key={i} delay={700 + (i * 100)}>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs uppercase tracking-widest font-medium text-cyan-400 hover:border-cyan-500/50 transition-colors cursor-default">
                        {t.icon}
                        {t.text}
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS STRIP */}
        <section className=" w-full border-y border-white/5 bg-white/[0.02] backdrop-blur-md flex justify-around">
          <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <FadeIn key={i} delay={i * 100} direction="none">
                <div className="text-center md:text-left group">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-1">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold group-hover:text-gray-300 transition-colors">
                    {stat.label}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ABOUT CONTENT & IMAGE */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* Left Content */}
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-6">
                <FadeIn direction="left">
                  <h2 className="text-3xl md:text-5xl font-bold flex items-center gap-4">
                    The Mission
                    <div className="h-[2px] w-24 bg-gradient-to-r from-cyan-500 to-transparent rounded-full" />
                  </h2>
                </FadeIn>
                {ABOUT_ME_PARAS.map((p, i) => (
                  <FadeIn key={i} delay={i * 150} direction="up">
                    <p className="text-gray-400 text-lg leading-relaxed first-letter:text-3xl first-letter:font-bold first-letter:text-white first-letter:mr-2">
                      {p}
                    </p>
                  </FadeIn>
                ))}
              </div>

              {/* Beliefs Grid */}
              <div className="pt-8">
                <FadeIn>
                  <h3 className="text-xl font-semibold mb-8 text-white flex items-center gap-3">
                    <div className="w-1 h-6 bg-blue-500" />
                    Core Philosophies
                  </h3>
                </FadeIn>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {BELIEFS.map((belief, i) => (
                    <FadeIn key={i} delay={i * 100} direction="up">
                      <div className="p-6 h-full rounded-2xl bg-white/[0.03] border border-white/5 hover:border-cyan-500/30 transition-all duration-500 group">
                        <div className="mb-4 transform group-hover:scale-110 group-hover:text-cyan-400 transition-all duration-300">
                          {React.cloneElement(belief.icon, { size: 24 })}
                        </div>
                        <p className="text-gray-300 font-medium leading-snug">
                          {belief.title}
                        </p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Image Container */}
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <FadeIn direction="right" delay={200}>
                <div className="relative group">
                  {/* Decorative Frame */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative rounded-3xl overflow-hidden aspect-[4/5] border border-white/10 shadow-2xl">
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60" />

                    {/* Interactive Border Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <img
                      src="/mesam.jpg"
                      alt="Muhammad Measm Raza"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        const img = e.currentTarget;
                        img.src =
                          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop";
                      }}
                    />

                    <div className="absolute bottom-8 left-8 right-8 z-20 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="backdrop-blur-xl bg-white/10 p-4 rounded-2xl border border-white/20">
                        <p className="text-sm font-medium text-white">Founder & Executive Lead</p>
                        <p className="text-xs text-cyan-400 font-mono mt-1">@ Meetech Labs</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Secondary CTA */}
                <div className="mt-8 p-8 rounded-3xl border border-dashed border-white/10 flex items-center justify-between group hover:border-blue-500/50 transition-colors cursor-pointer">
                  <span className="text-gray-500 text-sm font-medium uppercase tracking-widest">Global Operations</span>
                  <Link href="/connect" className="flex items-center gap-2 text-white font-semibold group-hover:text-cyan-400 transition-colors">
                    Contact
                    <ArrowUpRight size={18} />
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* FOOTER DECOR */}
        <section className="py-20 flex justify-center opacity-20">
          <div className="flex gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-12 h-[1px] bg-white" />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}