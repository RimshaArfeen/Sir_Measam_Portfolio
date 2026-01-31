"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/providers";
import { PageCTASection } from "@/components/PageCTASection";

gsap.registerPlugin(ScrollTrigger);

const HERO_TAGLINE =
  "Meetech Labs & Ecosystem — scale beyond one project.";

const OVERVIEW_ITEMS = [
  { title: "Parent organization", desc: "Meetech Labs builds and operates ventures across sectors, providing structure, capital readiness, and shared infrastructure." },
  { title: "Multi-sector focus", desc: "Climate-tech, digital platforms, education, and global services — united by execution-first and transparent governance." },
];

const VENTURE_AREAS = [
  { title: "Climate-tech", desc: "Verified impact, ESG infrastructure, and solutions built for scale and accountability." },
  { title: "Digital platforms", desc: "Products and systems that connect stakeholders, not silos — designed for international adoption." },
  { title: "Education & innovation", desc: "Programs, research, and capacity-building for the next generation of builders and leaders." },
  { title: "Global services", desc: "Remote-first delivery, distributed teams, and operations that work across borders and time zones." },
];

const HOW_BUILT = [
  { title: "Independent scalability", body: "Each venture is designed to grow on its own — with clear ownership, metrics, and path to sustainability." },
  { title: "International readiness", body: "From day one, ventures are built for global deployment: compliance, localization, and distributed execution." },
  { title: "Transparent governance", body: "Reporting, verification, and accountability are built into how we operate and measure impact." },
];

const OPERATING_MODEL = [
  { title: "Remote-first", desc: "Teams and operations are distributed by design — no single HQ required to deliver at scale." },
  { title: "Distributed execution", desc: "Work happens where talent and opportunity are; coordination and systems keep everything aligned." },
  { title: "System-based growth", desc: "Processes, platforms, and governance scale with the portfolio — not ad hoc, but repeatable." },
];

export function VenturesPageContent() {
  const lenis = useLenis();
  const heroRef = useRef<HTMLElement>(null);
  const titleCharsRef = useRef<HTMLSpanElement[]>([]);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const overviewCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const areasRef = useRef<HTMLDivElement>(null);
  const areaCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const builtRef = useRef<HTMLDivElement>(null);
  const builtCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const modelRef = useRef<HTMLDivElement>(null);
  const modelCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (lenis) {
      ScrollTrigger.scrollerProxy(document.documentElement, {
        scrollTop: () => lenis.scroll,
        getBoundingClientRect: () => ({
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }),
      });
      const onScroll = () => ScrollTrigger.update();
      lenis.on("scroll", onScroll);
      ScrollTrigger.refresh();
      return () => lenis.off("scroll", onScroll);
    }
  }, [lenis]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      gsap.set(
        [
          taglineRef.current,
          ...overviewCardsRef.current,
          ...areaCardsRef.current,
          ...builtCardsRef.current,
          ...modelCardsRef.current,
        ].filter(Boolean),
        { opacity: 1, y: 0, scale: 1, x: 0 }
      );
      titleCharsRef.current.forEach((el) => el && gsap.set(el, { opacity: 1, y: 0 }));
      return;
    }

    const chars = titleCharsRef.current.filter(Boolean);
    const tagline = taglineRef.current;
    const hero = heroRef.current;

    const runHeroAnimation = () => {
      if (chars.length) {
        gsap.set(chars, { opacity: 0, y: 60 });
        gsap.to(chars, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.04,
          ease: "back.out(1.2)",
          delay: 0.2,
        });
      }
      if (tagline) {
        gsap.set(tagline, { opacity: 0, y: 32 });
        gsap.to(tagline, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.8,
          ease: "power3.out",
        });
      }
    };

    if (chars.length) gsap.set(chars, { opacity: 0, y: 60 });
    if (tagline) gsap.set(tagline, { opacity: 0, y: 32 });

    if (hero) {
      ScrollTrigger.create({
        trigger: hero,
        start: "bottom top",
        onEnter: runHeroAnimation,
        onEnterBack: runHeroAnimation,
      });
      if (hero.getBoundingClientRect().top < window.innerHeight) runHeroAnimation();
    }

    const runCardAnimation = (el: HTMLDivElement, i: number) => {
      gsap.set(el, { opacity: 0, y: 80, scale: 0.92 });
      gsap.to(el, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        delay: i * 0.12,
        ease: "back.out(1.1)",
      });
    };

    overviewCardsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: 0, y: 80, scale: 0.92 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        onEnter: () => runCardAnimation(el, i),
        onEnterBack: () => runCardAnimation(el, i),
      });
    });

    areaCardsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: 0, y: 80, scale: 0.92 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        onEnter: () => runCardAnimation(el, i),
        onEnterBack: () => runCardAnimation(el, i),
      });
    });

    const runBuiltAnimation = (el: HTMLDivElement, i: number) => {
      const fromX = i % 2 === 0 ? -80 : 80;
      gsap.set(el, { opacity: 0, x: fromX, scale: 0.96 });
      gsap.to(el, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.85,
        delay: i * 0.1,
        ease: "power3.out",
      });
    };

    builtCardsRef.current.forEach((el, i) => {
      if (!el) return;
      const fromX = i % 2 === 0 ? -80 : 80;
      gsap.set(el, { opacity: 0, x: fromX, scale: 0.96 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        onEnter: () => runBuiltAnimation(el, i),
        onEnterBack: () => runBuiltAnimation(el, i),
      });
    });

    modelCardsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: 0, y: 80, scale: 0.92 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        onEnter: () => runCardAnimation(el, i),
        onEnterBack: () => runCardAnimation(el, i),
      });
    });

    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => {
      clearTimeout(refreshTimer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [lenis]);

  const title = "Ventures";

  return (
    <main className="min-h-screen w-full overflow-hidden">
      <section
        ref={heroRef}
        className="flex flex-col justify-center px-[var(--space-page-x)] pt-32 sm:pt-28 md:pt-20 pb-8 md:pb-12"
        aria-label="Ventures"
      >
        <h1
          className="text-hero md:text-[clamp(3.5rem,12vw,6rem)] font-bold text-[var(--color-text)] tracking-tight mb-6 overflow-hidden"
          style={{ lineHeight: 1.05 }}
        >
          {title.split("").map((char, i) => (
            <span
              key={i}
              ref={(el) => {
                if (el) titleCharsRef.current[i] = el;
              }}
              className="inline-block"
              style={{ willChange: "transform" }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
        <p
          ref={taglineRef}
          className="text-body-lg md:text-xl text-[var(--color-text-muted)] max-w-2xl leading-relaxed"
        >
          {HERO_TAGLINE}
        </p>
      </section>

      <section
        ref={overviewRef}
        className="px-[var(--space-page-x)] pt-8 md:pt-10 pb-10 md:pb-14 border-t border-[var(--color-border)]"
        aria-label="Meetech Labs Overview"
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-meta text-[var(--color-accent)] font-semibold tracking-widest uppercase mb-6">
            Meetech Labs Overview
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {OVERVIEW_ITEMS.map((item, i) => (
              <div
                key={item.title}
                ref={(el) => {
                  overviewCardsRef.current[i] = el;
                }}
                className="p-8 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] transition-colors duration-300"
              >
                <h3 className="text-h2 text-[var(--color-text)] mb-3">
                  {item.title}
                </h3>
                <p className="text-body text-[var(--color-text-muted)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={areasRef}
        className="px-[var(--space-page-x)] pt-8 md:pt-10 pb-10 md:pb-14 border-t border-[var(--color-border)]"
        aria-label="Venture Areas"
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-meta text-[var(--color-accent)] font-semibold tracking-widest uppercase mb-6">
            Venture Areas
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {VENTURE_AREAS.map((area, i) => (
              <div
                key={area.title}
                ref={(el) => {
                  areaCardsRef.current[i] = el;
                }}
                className="p-8 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] transition-colors duration-300"
              >
                <h3 className="text-h2 text-[var(--color-text)] mb-3">
                  {area.title}
                </h3>
                <p className="text-body text-[var(--color-text-muted)] leading-relaxed">
                  {area.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={builtRef}
        className="px-[var(--space-page-x)] py-10 md:py-14 border-t border-[var(--color-border)]"
        aria-label="How Ventures Are Built"
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-meta text-[var(--color-accent)] font-semibold tracking-widest uppercase mb-8">
            How Ventures Are Built
          </p>
          <div className="space-y-0">
            {HOW_BUILT.map((item, i) => (
              <div
                key={item.title}
                ref={(el) => {
                  builtCardsRef.current[i] = el;
                }}
                className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 py-6 border-b border-[var(--color-border)] last:border-0"
              >
                <h3 className="text-h2 text-[var(--color-accent)] font-semibold md:w-2/5 shrink-0">
                  {item.title}
                </h3>
                <p className="text-body-lg text-[var(--color-text-muted)] md:w-3/5 leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={modelRef}
        className="px-[var(--space-page-x)] pt-8 md:pt-10 pb-10 md:pb-14 border-t border-[var(--color-border)]"
        aria-label="Operating Model"
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-meta text-[var(--color-accent)] font-semibold tracking-widest uppercase mb-6">
            Operating Model
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {OPERATING_MODEL.map((item, i) => (
              <div
                key={item.title}
                ref={(el) => {
                  modelCardsRef.current[i] = el;
                }}
                className="p-8 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] transition-colors duration-300"
              >
                <h3 className="text-h2 text-[var(--color-text)] mb-3">
                  {item.title}
                </h3>
                <p className="text-body text-[var(--color-text-muted)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageCTASection
        heading="Ventures = long-term vision"
        description="We build companies and ecosystems that scale beyond one project — execution-first, globally distributed, and built for impact."
        primaryButton={{ label: "Get in touch", href: "/connect" }}
        secondaryButton={{ label: "View Research", href: "/research" }}
      />
    </main>
  );
}
