"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/providers";

gsap.registerPlugin(ScrollTrigger);

const INTRO = "Global recognition, research, and proof of responsibility — without the noise.";

const PROOF = [
  "Oxford, Yale, Google, TKS — programs and scholarships",
  "UNICEF partnerships, global ambassador roles, international conferences",
  "Peace and changemaker nominations, youth leadership recognition",
];

export function HomeImpactPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);
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
    const itemEls = itemsRef.current.filter(Boolean);
    if (reducedMotion) {
      gsap.set([contentRef.current, lineRef.current, headingRef.current, introRef.current, ...itemEls, ctaRef.current].filter(Boolean), { opacity: 1, y: 0, x: 0, scaleX: 1 });
      return () => {};
    }
    gsap.set(contentRef.current, { opacity: 0, x: 24, scale: 0.98 });
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(headingRef.current, { opacity: 0, y: 20 });
    gsap.set(introRef.current, { opacity: 0, y: 16 });
    gsap.set(itemEls, { opacity: 0, x: -20 });
    gsap.set(ctaRef.current, { opacity: 0, y: 12 });
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 78%",
        end: "top 15%",
        onEnter: () => {
          gsap.to(lineRef.current, { scaleX: 1, duration: 0.55, ease: "power3.out" });
          gsap.to(contentRef.current, { opacity: 1, x: 0, scale: 1, duration: 0.7, ease: "power3.out" });
          gsap.to(headingRef.current, { opacity: 1, y: 0, duration: 0.6, delay: 0.1, ease: "back.out(1.1)" });
          gsap.to(introRef.current, { opacity: 1, y: 0, duration: 0.55, delay: 0.2, ease: "power3.out" });
          gsap.to(itemEls, { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, delay: 0.35, ease: "back.out(1.05)" });
          gsap.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5, delay: 0.75, ease: "power2.out" });
        },
        onEnterBack: () => {
          gsap.to([contentRef.current, lineRef.current, headingRef.current, introRef.current, ...itemEls, ctaRef.current].filter(Boolean), {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            scaleX: 1,
            duration: 0.4,
            stagger: 0.03,
            ease: "power2.out",
          });
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen min-h-[100dvh] w-full flex flex-col justify-center bg-transparent px-[var(--space-page-x)] py-[var(--space-page-y)] border-t border-[var(--color-border)] overflow-hidden"
      aria-labelledby="impact-preview-heading"
    >
      <div ref={contentRef} className="max-w-2xl mx-auto">
        <div ref={lineRef} className="h-0.5 w-12 mb-6 bg-[var(--color-accent)]" style={{ transformOrigin: "left center" }} aria-hidden />
        <h2
          id="impact-preview-heading"
          ref={headingRef}
          className="text-display font-bold text-[var(--color-text)] tracking-[var(--text-display-tracking)] mb-6"
        >
          Global Impact
        </h2>
        <p
          ref={introRef}
          className="text-body-lg text-[var(--color-text-muted)] leading-relaxed mb-8"
        >
          {INTRO}
        </p>
        <ul className="space-y-3 mb-10">
          {PROOF.map((text, i) => (
            <li
              key={i}
              ref={(el) => { itemsRef.current[i] = el; }}
              className="text-body text-[var(--color-text)] flex items-center gap-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] shrink-0" aria-hidden />
              {text}
            </li>
          ))}
        </ul>
        <Link
          ref={ctaRef}
          href="/impact"
          className="hero-cta-btn inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-hero-tags font-semibold tracking-widest uppercase hover:bg-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300 ease-out group"
        >
          <span>View Global Impact</span>
          <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
