"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const INTRO =
  "I build systems that solve real-world problems at scale.";

const PARAGRAPHS = [
  "I am a young founder, researcher, and global impact builder leading multi-sector ventures across climate-tech, ESG infrastructure, technology platforms, and digital services.",
  "I operate remote-first, globally distributed teams, build scalable products, publish research, and launch solutions designed for international adoption and measurable impact.",
  "My work sits at the intersection of technology, sustainability, and execution — focused on transparency, verification, and systems that scale beyond borders.",
] as const;

const TRAITS = [
  "Operating globally",
  "Remote-first",
  "Founder-led",
] as const;

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphsRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const traitsRef = useRef<HTMLDivElement>(null);
  const traitItemsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) {
        gsap.set([headlineRef.current, ...paragraphsRef.current, ...traitItemsRef.current].filter(Boolean), {
          opacity: 1,
          y: 0,
        });
        return;
      }

      const els = [
        headlineRef.current,
        ...paragraphsRef.current,
        traitsRef.current,
      ].filter(
        (el): el is HTMLHeadingElement | HTMLParagraphElement | HTMLDivElement => el != null
      );

      gsap.set(els, { opacity: 0, y: 32 });
      gsap.set(traitItemsRef.current.filter(Boolean), { opacity: 0, y: 16 });

      ScrollTrigger.batch(els, {
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
          }),
        start: "top 85%",
      });

      if (traitsRef.current) {
        ScrollTrigger.create({
          trigger: traitsRef.current,
          start: "top 88%",
          onEnter: () => {
            gsap.to(traitItemsRef.current.filter(Boolean), {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out",
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-spacing min-h-screen w-full px-[var(--space-page-x)] flex flex-col justify-center"
      aria-label="About"
    >
      <div className="max-w-3xl mx-auto w-full">
        <h2
          ref={headlineRef}
          className="text-display text-[var(--color-text)] mb-10"
        >
          {INTRO}
        </h2>

        <div className="space-y-6">
          {PARAGRAPHS.map((text, i) => (
            <p
              key={i}
              ref={(el) => {
                paragraphsRef.current[i] = el;
              }}
              className="text-body-lg text-[var(--color-text-muted)] leading-relaxed"
            >
              {text}
            </p>
          ))}
        </div>

        <div
          ref={traitsRef}
          className="mt-12 pt-8 border-t border-[var(--color-border)] flex flex-wrap gap-x-8 gap-y-3"
        >
          {TRAITS.map((label, i) => (
            <span
              key={i}
              ref={(el) => {
                traitItemsRef.current[i] = el;
              }}
              className="text-caption text-[var(--color-text-subtle)] font-medium tracking-wide uppercase"
            >
              {label}
            </span>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/about"
            className="inline-block text-[var(--color-accent)] text-caption font-medium tracking-wide uppercase border-b border-[var(--color-accent)] pb-1 hover:opacity-80 transition-opacity"
          >
            Learn more
          </Link>
        </div>
      </div>
    </section>
  );
}
