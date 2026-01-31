"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/providers";

gsap.registerPlugin(ScrollTrigger);

const INTRO = "I build systems that solve real-world problems at scale.";

const INTRO_PARAS = [
  "I am a young founder, researcher, and global impact builder leading multi-sector ventures across climate-tech, ESG infrastructure, technology platforms, and digital services.",
  "I operate remote-first, globally distributed teams, build scalable products, publish research, and launch solutions designed for international adoption and measurable impact.",
  "My work sits at the intersection of technology, sustainability, and execution — focused on transparency, verification, and systems that scale beyond borders.",
];

const TRAITS = ["Operating globally", "Remote-first", "Founder-led"];

const ABOUT_ME_PARAS = [
  "I am the Founder and Executive Lead of Meetech Labs, a parent organization that builds and operates ventures across climate-tech, technology platforms, education, and digital infrastructure.",
  "My approach has always been execution-first. Instead of focusing on theory, I assemble teams, validate ideas, build real products, and launch to market. Today, I lead international teams, oversee product development, manage partnerships, and design go-to-market strategies fully remotely.",
  "Alongside entrepreneurship, I am a published researcher, youth policy contributor, and global ambassador working across education, sustainability, and systemic inequality.",
];

const BELIEFS = [
  "Founder-led companies",
  "Remote-first global teams",
  "Transparent and verifiable impact",
  "Technology that connects systems, not silos",
];

const STATS = [
  { value: 15, suffix: "+", label: "Countries Impacted" },
  { value: 1000, suffix: "+", label: "Youth Trained or Mentored" },
  { value: 10, suffix: "+", label: "Ventures Founded" },
  { value: 4, suffix: "", label: "World Record Holder" },
];

export function AboutPageContent() {
  const lenis = useLenis();
  const heroRef = useRef<HTMLElement>(null);
  const introCharsRef = useRef<HTMLSpanElement[]>([]);
  const introParasRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const traitsRef = useRef<HTMLDivElement>(null);
  const traitItemsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const aboutHeadingRef = useRef<HTMLHeadingElement>(null);
  const aboutParasRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const beliefsRef = useRef<HTMLUListElement>(null);
  const beliefItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const imagePlaceholderRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statValuesRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (lenis) {
      ScrollTrigger.scrollerProxy(document.documentElement, {
        scrollTop: () => lenis.scroll,
        getBoundingClientRect: () => ({ top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }),
      });
      const onScroll = () => ScrollTrigger.update();
      lenis.on("scroll", onScroll);
      ScrollTrigger.refresh();
      return () => lenis.off("scroll", onScroll);
    }
  }, [lenis]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const setVisible = (el: Element | null) => {
      if (el) gsap.set(el, { opacity: 1, y: 0, scale: 1 });
    };

    if (reducedMotion) {
      introCharsRef.current.forEach((el) => el && gsap.set(el, { opacity: 1, y: 0 }));
      [introParasRef.current, traitsRef.current, aboutHeadingRef.current, aboutParasRef.current, beliefsRef.current, imagePlaceholderRef.current, statsRef.current].flat().filter(Boolean).forEach(setVisible);
      beliefItemsRef.current.forEach((el) => el && gsap.set(el, { opacity: 1, y: 0 }));
      traitItemsRef.current.forEach((el) => el && gsap.set(el, { opacity: 1, y: 0 }));
      statValuesRef.current.forEach((el, i) => {
        if (!el) return;
        const s = STATS[i];
        const formatted = s.value >= 1000 ? s.value.toLocaleString() : String(s.value);
        el.textContent = s.suffix ? formatted + s.suffix : formatted;
      });
      return;
    }

    const hero = heroRef.current;
    const chars = introCharsRef.current.filter(Boolean);
    const introParas = introParasRef.current.filter(Boolean);
    const traits = traitItemsRef.current.filter(Boolean);
    const aboutHeading = aboutHeadingRef.current;
    const aboutParas = aboutParasRef.current.filter(Boolean);
    const beliefItems = beliefItemsRef.current.filter(Boolean);
    const imageEl = imagePlaceholderRef.current;
    const statsEl = statsRef.current;

    const runHeroAnimation = () => {
      if (chars.length) {
        gsap.set(chars, { opacity: 0, y: 56 });
        gsap.to(chars, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.03,
          ease: "back.out(1.2)",
          delay: 0.15,
        });
      }
      introParas.forEach((el, i) => {
        gsap.set(el, { opacity: 0, y: 32 });
        gsap.to(el, { opacity: 1, y: 0, duration: 0.8, delay: 0.6 + i * 0.1, ease: "power3.out" });
      });
      if (traits.length) {
        gsap.set(traits, { opacity: 0, y: 24 });
        gsap.to(traits, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, delay: 1, ease: "power3.out" });
      }
    };

    if (chars.length) gsap.set(chars, { opacity: 0, y: 56 });
    introParas.forEach((el) => gsap.set(el, { opacity: 0, y: 32 }));
    if (traits.length) gsap.set(traits, { opacity: 0, y: 24 });

    if (hero) {
      ScrollTrigger.create({
        trigger: hero,
        start: "bottom top",
        onEnter: runHeroAnimation,
        onEnterBack: runHeroAnimation,
      });
      if (hero.getBoundingClientRect().top < window.innerHeight) runHeroAnimation();
    }

    const runAboutBlock = () => {
      if (aboutHeading) {
        gsap.set(aboutHeading, { opacity: 0, y: 48 });
        gsap.to(aboutHeading, { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.1)" });
      }
      aboutParas.forEach((el, i) => {
        gsap.set(el, { opacity: 0, y: 32 });
        gsap.to(el, { opacity: 1, y: 0, duration: 0.75, delay: 0.2 + i * 0.1, ease: "power3.out" });
      });
      beliefItems.forEach((el, i) => {
        gsap.set(el, { opacity: 0, y: 24 });
        gsap.to(el, { opacity: 1, y: 0, duration: 0.55, delay: 0.5 + i * 0.07, ease: "power3.out" });
      });
    };

    if (aboutHeading) {
      gsap.set(aboutHeading, { opacity: 0, y: 48 });
      ScrollTrigger.create({
        trigger: aboutHeading,
        start: "top 88%",
        onEnter: runAboutBlock,
        onEnterBack: runAboutBlock,
      });
    }

    const runImageAnimation = () => {
      if (!imageEl) return;
      gsap.set(imageEl, { opacity: 0, y: 56, scale: 0.9 });
      gsap.to(imageEl, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    if (imageEl) {
      gsap.set(imageEl, { opacity: 0, y: 56, scale: 0.9 });
      ScrollTrigger.create({
        trigger: imageEl,
        start: "top 85%",
        onEnter: runImageAnimation,
        onEnterBack: runImageAnimation,
      });
    }

    const runStatsAnimation = () => {
      if (!statsEl) return;
      gsap.set(statsEl, { opacity: 0, y: 40 });
      gsap.to(statsEl, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
      STATS.forEach((stat, i) => {
        const el = statValuesRef.current[i];
        if (!el) return;
        el.textContent = "0";
        const obj = { n: 0 };
        gsap.to(obj, {
          n: stat.value,
          duration: 1.8,
          delay: 0.3 + i * 0.12,
          ease: "power2.out",
          onUpdate: () => {
            const v = Math.round(obj.n);
            const formatted = stat.value >= 1000 ? v.toLocaleString() : String(v);
            el.textContent = stat.suffix ? `${formatted}${stat.suffix}` : formatted;
          },
        });
      });
    };

    if (statsEl) {
      gsap.set(statsEl, { opacity: 0, y: 40 });
      ScrollTrigger.create({
        trigger: statsEl,
        start: "top 85%",
        onEnter: runStatsAnimation,
        onEnterBack: runStatsAnimation,
      });
    }

    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => {
      clearTimeout(refreshTimer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [lenis]);

  return (
    <main className="min-h-screen w-full">
      <section
        ref={heroRef}
        className="px-[var(--space-page-x)] pt-32 sm:pt-28 md:pt-20 pb-10 md:pb-14 max-w-5xl mx-auto"
        aria-label="Introduction"
      >
        <h1
          className="text-display md:text-hero text-[var(--color-text)] mb-8 overflow-hidden"
          style={{ lineHeight: 1.1 }}
        >
          {INTRO.split("").map((char, i) => (
            <span
              key={i}
              ref={(el) => { if (el) introCharsRef.current[i] = el; }}
              className="inline-block"
              style={{ willChange: "transform" }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
        <div className="space-y-6 max-w-3xl">
          {INTRO_PARAS.map((text, i) => (
            <p
              key={i}
              ref={(el) => { introParasRef.current[i] = el; }}
              className="text-body-lg text-[var(--color-text-muted)] leading-relaxed"
            >
              {text}
            </p>
          ))}
        </div>
        <div
          ref={traitsRef}
          className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-caption text-[var(--color-text-subtle)] font-medium tracking-wide uppercase"
        >
          {TRAITS.map((t, i) => (
            <span
              key={t}
              ref={(el) => { traitItemsRef.current[i] = el; }}
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      <section
        className="px-[var(--space-page-x)] py-10 md:py-14 border-t border-[var(--color-border)]"
        aria-label="About Me"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <h2
              ref={aboutHeadingRef}
              className="text-h1 text-[var(--color-text)] mb-8"
            >
              About Me
            </h2>
            <div className="space-y-6">
              {ABOUT_ME_PARAS.map((text, i) => (
                <p
                  key={i}
                  ref={(el) => { aboutParasRef.current[i] = el; }}
                  className="text-body-lg text-[var(--color-text-muted)] leading-relaxed"
                >
                  {text}
                </p>
              ))}
            </div>
            <p className="mt-8 text-body font-medium text-[var(--color-text)]">
              I believe the future belongs to:
            </p>
            <ul
              ref={beliefsRef}
              className="mt-4 space-y-3 text-body-lg text-[var(--color-text-muted)] list-none"
            >
              {BELIEFS.map((item, i) => (
                <li
                  key={item}
                  ref={(el) => { beliefItemsRef.current[i] = el; }}
                  className="flex gap-3"
                >
                  <span className="text-[var(--color-accent)] mt-1.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div
            ref={imagePlaceholderRef}
            className="lg:col-span-5 relative rounded-lg overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)] aspect-[4/5] min-h-[320px]"
          >
            <Image
              src="/mesam.jpg"
              alt="Muhammad Measm Raza, Founder and Executive Lead of Meetech Labs"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-top"
              priority
            />
          </div>
        </div>
      </section>

      <section
        ref={statsRef}
        className="px-[var(--space-page-x)] py-10 md:py-14 border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)]"
        aria-label="Impact stats"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center"
            >
              <p className="text-display text-[var(--color-accent)] font-semibold tabular-nums">
                <span ref={(el) => { statValuesRef.current[i] = el; }}>0</span>
              </p>
              <p className="mt-2 text-caption text-[var(--color-text-muted)] font-medium tracking-wide uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
