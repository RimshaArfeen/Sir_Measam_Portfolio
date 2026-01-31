"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/providers";
import { PageCTASection } from "@/components/PageCTASection";

gsap.registerPlugin(ScrollTrigger);

const HERO_TAGLINE =
  "Global Recognition & Service — proof of responsibility.";

const AWARDS = [
  {
    title: "Oxford Scholars",
    items: ["Scholarships", "Global programs"],
    desc: "Recognition and support through Oxford-affiliated programs and global scholarship initiatives.",
  },
  {
    title: "Nominations",
    items: ["Peace prizes", "Changemaker awards"],
    desc: "Nominated for peace, changemaking, and youth leadership awards at regional and global levels.",
  },
];

const PROGRAMS = [
  { title: "Yale", desc: "Leadership and global affairs programs." },
  { title: "Google", desc: "Certifications and innovation programs." },
  { title: "TKS", desc: "The Knowledge Society — innovation and future-building." },
  { title: "LaunchX", desc: "Entrepreneurship and venture-building." },
  { title: "LeanGap", desc: "Lean methodology and execution frameworks." },
];

const LEADERSHIP = [
  { title: "UNICEF", body: "Partnerships and initiatives with UNICEF in youth, education, and sustainable development." },
  { title: "Global ambassador roles", body: "Representing organizations and causes on global stages — policy, sustainability, and youth." },
  { title: "Conferences", body: "Speaking and facilitating at international conferences on entrepreneurship, climate, and impact." },
  { title: "Bootcamps", body: "Designing and leading bootcamps and capacity-building programs for founders and leaders." },
];

export function ImpactPageContent() {
  const lenis = useLenis();
  const heroRef = useRef<HTMLElement>(null);
  const titleCharsRef = useRef<HTMLSpanElement[]>([]);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const awardsCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const programCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const leadershipCardsRef = useRef<(HTMLDivElement | null)[]>([]);
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
          ...awardsCardsRef.current,
          ...programCardsRef.current,
          ...leadershipCardsRef.current,
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

    awardsCardsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: 0, y: 80, scale: 0.92 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        onEnter: () => runCardAnimation(el, i),
        onEnterBack: () => runCardAnimation(el, i),
      });
    });

    programCardsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: 0, y: 80, scale: 0.92 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        onEnter: () => runCardAnimation(el, i),
        onEnterBack: () => runCardAnimation(el, i),
      });
    });

    const runLeadershipAnimation = (el: HTMLDivElement, i: number) => {
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

    leadershipCardsRef.current.forEach((el, i) => {
      if (!el) return;
      const fromX = i % 2 === 0 ? -80 : 80;
      gsap.set(el, { opacity: 0, x: fromX, scale: 0.96 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        onEnter: () => runLeadershipAnimation(el, i),
        onEnterBack: () => runLeadershipAnimation(el, i),
      });
    });

    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => {
      clearTimeout(refreshTimer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [lenis]);

  const title = "Impact";

  return (
    <main className="min-h-screen w-full overflow-hidden">
      <section
        ref={heroRef}
        className="flex flex-col justify-center px-[var(--space-page-x)] pt-32 sm:pt-28 md:pt-20 pb-8 md:pb-12"
        aria-label="Impact"
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
        className="px-[var(--space-page-x)] pt-8 md:pt-10 pb-10 md:pb-14 border-t border-[var(--color-border)]"
        aria-label="Awards & Recognition"
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-meta text-[var(--color-accent)] font-semibold tracking-widest uppercase mb-6">
            Awards & Recognition
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {AWARDS.map((award, i) => (
              <div
                key={award.title}
                ref={(el) => {
                  awardsCardsRef.current[i] = el;
                }}
                className="p-8 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] transition-colors duration-300"
              >
                <h3 className="text-h2 text-[var(--color-text)] mb-3">
                  {award.title}
                </h3>
                <ul className="list-none space-y-1 mb-4">
                  {award.items.map((item) => (
                    <li key={item} className="flex gap-2 text-body text-[var(--color-text-muted)]">
                      <span className="text-[var(--color-accent)]">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-body text-[var(--color-text-subtle)] leading-relaxed">
                  {award.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="px-[var(--space-page-x)] pt-8 md:pt-10 pb-10 md:pb-14 border-t border-[var(--color-border)]"
        aria-label="Global Programs & Certifications"
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-meta text-[var(--color-accent)] font-semibold tracking-widest uppercase mb-6">
            Global Programs & Certifications
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {PROGRAMS.map((program, i) => (
              <div
                key={program.title}
                ref={(el) => {
                  programCardsRef.current[i] = el;
                }}
                className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] transition-colors duration-300"
              >
                <h3 className="text-h2 text-[var(--color-text)] mb-2">
                  {program.title}
                </h3>
                <p className="text-body text-[var(--color-text-muted)] leading-relaxed text-sm">
                  {program.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="px-[var(--space-page-x)] py-10 md:py-14 border-t border-[var(--color-border)]"
        aria-label="Leadership & Service"
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-meta text-[var(--color-accent)] font-semibold tracking-widest uppercase mb-8">
            Leadership & Service
          </p>
          <div className="space-y-0">
            {LEADERSHIP.map((item, i) => (
              <div
                key={item.title}
                ref={(el) => {
                  leadershipCardsRef.current[i] = el;
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

      <PageCTASection
        heading="Impact = proof of responsibility"
        description="Real-world influence beyond business — awards, programs, and service that demonstrate commitment to global impact."
        primaryButton={{ label: "Get in touch", href: "/connect" }}
        secondaryButton={{ label: "View Research", href: "/research" }}
      />
    </main>
  );
}
