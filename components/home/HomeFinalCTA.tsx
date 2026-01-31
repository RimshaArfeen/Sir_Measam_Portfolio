"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/providers";

gsap.registerPlugin(ScrollTrigger);

const CLOSING =
  "Partnerships, collaboration, and systems that scale responsibly. If that aligns with what you're building, let's connect.";

export function HomeFinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
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
    const els = [contentRef.current, lineRef.current, headingRef.current, textRef.current, ctaRef.current].filter(Boolean);
    if (reducedMotion) {
      gsap.set(els, { opacity: 1, y: 0, scale: 1, scaleX: 1 });
      return () => {};
    }
    gsap.set(contentRef.current, { opacity: 0, scale: 0.96 });
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "center center" });
    gsap.set(headingRef.current, { opacity: 0, y: 28 });
    gsap.set(textRef.current, { opacity: 0, y: 20 });
    gsap.set(ctaRef.current, { opacity: 0, y: 16 });
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 78%",
        end: "top 15%",
        onEnter: () => {
          gsap.to(lineRef.current, { scaleX: 1, duration: 0.6, ease: "power3.out" });
          gsap.to(contentRef.current, { opacity: 1, scale: 1, duration: 0.75, ease: "power3.out" });
          gsap.to(headingRef.current, { opacity: 1, y: 0, duration: 0.7, delay: 0.12, ease: "back.out(1.1)" });
          gsap.to(textRef.current, { opacity: 1, y: 0, duration: 0.6, delay: 0.25, ease: "power3.out" });
          gsap.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5, delay: 0.45, ease: "power2.out" });
        },
        onEnterBack: () => {
          gsap.to(els, { opacity: 1, y: 0, scale: 1, scaleX: 1, duration: 0.4, stagger: 0.04, ease: "power2.out" });
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen min-h-[100dvh] w-full flex flex-col justify-center bg-transparent px-[var(--space-page-x)] py-[var(--space-page-y)] border-t border-[var(--color-border)] overflow-hidden"
      aria-labelledby="final-cta-heading"
    >
      <div ref={contentRef} className="max-w-xl mx-auto text-center">
        <div ref={lineRef} className="h-0.5 w-20 mx-auto mb-6 bg-[var(--color-accent-cyan)]" style={{ transformOrigin: "center center" }} aria-hidden />
        <h2
          id="final-cta-heading"
          ref={headingRef}
          className="text-display font-bold text-[var(--color-text)] tracking-[var(--text-display-tracking)] mb-6"
        >
          Let&apos;s build together
        </h2>
        <p
          ref={textRef}
          className="text-body-lg text-[var(--color-text-muted)] leading-relaxed mb-10"
        >
          {CLOSING}
        </p>
        <Link
          ref={ctaRef}
          href="/connect"
          className="hero-cta-btn inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-hero-tags font-semibold tracking-widest uppercase hover:bg-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300 ease-out group"
        >
          <span>Connect</span>
          <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
