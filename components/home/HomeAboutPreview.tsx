"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/providers";

gsap.registerPlugin(ScrollTrigger);

const PHILOSOPHY = [
  "I build systems that solve real-world problems at scale.",
  "Execution-first: teams, products, and go-to-market — shipped, not theorized.",
  "Operating globally, remote-first, founder-led.",
];

export function HomeAboutPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentWrapRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linesRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop: () => lenis.scroll,
      getBoundingClientRect: () => ({ top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }),
    });
    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);
    ScrollTrigger.refresh();
    return () => lenis.off("scroll", onScroll);
  }, [lenis]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = [contentWrapRef.current, lineRef.current, headingRef.current, ...linesRef.current, ctaRef.current].filter(Boolean);
    if (reducedMotion) {
      gsap.set(els, { opacity: 1, y: 0, scale: 1, scaleX: 1 });
      return () => {};
    }
    gsap.set(contentWrapRef.current, { opacity: 0, y: 36, scale: 0.97 });
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "center center" });
    gsap.set(headingRef.current, { opacity: 0, y: 20 });
    linesRef.current.forEach((el) => el && gsap.set(el, { opacity: 0, y: 20 }));
    gsap.set(ctaRef.current, { opacity: 0, y: 16 });
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 78%",
        end: "top 15%",
        onEnter: () => {
          gsap.to(lineRef.current, { scaleX: 1, duration: 0.6, ease: "power3.out" });
          gsap.to(headingRef.current, { opacity: 1, y: 0, duration: 0.65, delay: 0.08, ease: "power3.out" });
          linesRef.current.forEach((el, i) => {
            if (el) gsap.to(el, { opacity: 1, y: 0, duration: 0.55, delay: 0.15 + i * 0.1, ease: "back.out(1.1)" });
          });
          gsap.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5, delay: 0.5, ease: "power2.out" });
          gsap.to(contentWrapRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" });
        },
        onEnterBack: () => {
          gsap.to(els, { opacity: 1, y: 0, scale: 1, scaleX: 1, duration: 0.4, stagger: 0.03, ease: "power2.out" });
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative min-h-screen min-h-[100dvh] w-full flex flex-col justify-center bg-transparent px-[var(--space-page-x)] py-[var(--space-page-y)] overflow-hidden"
      aria-labelledby="about-preview-heading"
    >
      <div ref={contentWrapRef} className="max-w-2xl mx-auto text-center">
        <div ref={lineRef} className="h-0.5 w-16 mx-auto mb-6 bg-[var(--color-accent)]" style={{ transformOrigin: "center center" }} aria-hidden />
        <h2
          id="about-preview-heading"
          ref={headingRef}
          className="text-display font-bold text-[var(--color-text)] tracking-[var(--text-display-tracking)] mb-8"
        >
          About the Founder
        </h2>
        <div className="space-y-4 mb-10">
          {PHILOSOPHY.map((line, i) => (
            <p
              key={i}
              ref={(el) => { linesRef.current[i] = el; }}
              className="text-body-lg text-[var(--color-text-muted)] leading-relaxed"
            >
              {line}
            </p>
          ))}
        </div>
        <Link
          ref={ctaRef}
          href="/about"
          className="hero-cta-btn inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-hero-tags font-semibold tracking-widest uppercase hover:bg-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300 ease-out group"
        >
          <span>About the Founder</span>
          <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

