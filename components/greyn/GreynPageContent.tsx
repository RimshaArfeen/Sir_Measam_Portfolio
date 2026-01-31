"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/providers";
import { PageCTASection } from "@/components/PageCTASection";

gsap.registerPlugin(ScrollTrigger);

const HERO_TAGLINE =
  "Scalable technology and climate systems — built for verification, impact, and scale beyond borders.";

const PILLARS = [
  { title: "Climate", desc: "Verified impact and ESG infrastructure." },
  { title: "Technology", desc: "Platforms that connect systems, not silos." },
  { title: "Scale", desc: "Global deployment, remote-first execution." },
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

export function GreynPageContent() {
  const lenis = useLenis();
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleCharsRef = useRef<HTMLSpanElement[]>([]);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const pillarCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const featuresRef = useRef<HTMLDivElement>(null);
  const featureCardsRef = useRef<(HTMLDivElement | null)[]>([]);
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
          titleRef.current,
          taglineRef.current,
          ...pillarCardsRef.current,
          ...featureCardsRef.current,
        ].filter(Boolean),
        { opacity: 1, y: 0, scale: 1, x: 0 }
      );
      titleCharsRef.current.forEach((el) => el && gsap.set(el, { opacity: 1, y: 0 }));
      return;
    }

    const title = titleRef.current;
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

    const runPillarAnimation = (el: HTMLDivElement, i: number) => {
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

    pillarCardsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: 0, y: 80, scale: 0.92 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        onEnter: () => runPillarAnimation(el, i),
        onEnterBack: () => runPillarAnimation(el, i),
      });
    });

    const runFeatureAnimation = (el: HTMLDivElement, i: number) => {
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

    featureCardsRef.current.forEach((el, i) => {
      if (!el) return;
      const fromX = i % 2 === 0 ? -80 : 80;
      gsap.set(el, { opacity: 0, x: fromX, scale: 0.96 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        onEnter: () => runFeatureAnimation(el, i),
        onEnterBack: () => runFeatureAnimation(el, i),
      });
    });

    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => {
      clearTimeout(refreshTimer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [lenis]);

  const title = "Greyn";

  return (
    <main className="min-h-screen w-full overflow-hidden">
      <section
        ref={heroRef}
        className="flex flex-col justify-center px-[var(--space-page-x)] pt-32 sm:pt-28 md:pt-20 pb-8 md:pb-12"
        aria-label="Greyn"
      >
        <h1
          ref={titleRef}
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
        ref={pillarsRef}
        className="px-[var(--space-page-x)] pt-8 md:pt-10 pb-10 md:pb-14 border-t border-[var(--color-border)]"
        aria-label="Pillars"
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-meta text-[var(--color-accent)] font-semibold tracking-widest uppercase mb-6">
            What we stand for
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {PILLARS.map((pillar, i) => (
              <div
                key={pillar.title}
                ref={(el) => {
                  pillarCardsRef.current[i] = el;
                }}
                className="p-8 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] transition-colors duration-300"
              >
                <h3 className="text-h2 text-[var(--color-text)] mb-3">
                  {pillar.title}
                </h3>
                <p className="text-body text-[var(--color-text-muted)] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={featuresRef}
        className="px-[var(--space-page-x)] py-10 md:py-14 border-t border-[var(--color-border)]"
        aria-label="Features"
      >
        <div className="max-w-4xl mx-auto space-y-12">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              ref={(el) => {
                featureCardsRef.current[i] = el;
              }}
              className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 py-6 border-b border-[var(--color-border)] last:border-0"
            >
              <h3 className="text-h2 text-[var(--color-accent)] font-semibold md:w-2/5 shrink-0">
                {feature.title}
              </h3>
              <p className="text-body-lg text-[var(--color-text-muted)] md:w-3/5 leading-relaxed">
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <PageCTASection
        heading="Built for impact at scale."
        description="Greyn powers ventures across climate-tech, platforms, and digital infrastructure — execution-first, globally."
        primaryButton={{ label: "Get in touch", href: "/connect" }}
        secondaryButton={{ label: "View Research", href: "/research" }}
      />
    </main>
  );
}
