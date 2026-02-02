"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/providers";

gsap.registerPlugin(ScrollTrigger);

const HERO_LINES = [
  "Muhammad Measm Raza",
  "Founder | Climate-Tech Entrepreneur | Global Impact Builder",
  "Building verified climate impact, scalable technology, and globally distributed companies from day one.",
  "Operating globally · Remote-first · Founder-led",
] as const;

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
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
    return () => {
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) {
        gsap.set(lineRefs.current.filter(Boolean), { opacity: 1, y: 0 });
        gsap.set(ctaRef.current, { opacity: 1, y: 0 });
        return;
      }

      lineRefs.current.forEach((el, i) => {
        if (!el) return;
        if (i === 0) return;
        gsap.set(el, { opacity: 0, y: 24 });
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4 + i * 0.2,
          ease: "power3.out",
          overwrite: "auto",
        });
      });
      if (ctaRef.current) {
        gsap.set(ctaRef.current, { opacity: 0, y: 12 });
        gsap.to(ctaRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 1.8,
          ease: "power2.out",
        });
      }

      if (sectionRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
          onUpdate: (self) => {
            if (overlayRef.current) {
              overlayRef.current.style.opacity = String(1 - self.progress * 1.2);
            }
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToWork = () => {
    const next = document.getElementById("work");
    if (next) {
      lenis?.scrollTo(next, { offset: 0, duration: 1.2 });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative  w-full min-h-[100dvh] flex flex-col justify-end overflow-hidden"
      aria-label="Hero"
     
    >
      {/* Gradient overlay for text readability */}
      <div
        className="absolute inset-0 z-0 bg-gradient-to-t from-[var(--color-bg)]/50 via-transparent to-transparent pointer-events-none"
        aria-hidden
      />

      <div
        ref={overlayRef}
        className="relative z-10 flex flex-col justify-end min-h-full px-[var(--space-page-x)] py-[var(--space-page-y)] pt-[20vh] pb-[var(--space-page-y)]"
      >
        <div className="max-w-3xl">
          {HERO_LINES.map((text, i) => (
            <p
              key={i}
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
              className={
                i === 0 ? "text-hero text-white mb-3 [content-visibility:visible]" :
                i === 1
                    ? "text-hero-role text-white/90 font-medium tracking-wide uppercase mb-4"
                    : i === 2
                      ? "text-hero-body text-white/85 mb-3 max-w-2xl"
                      : "text-hero-tags text-white/80 mb-8"
              }
            >
              {text}
            </p>
          ))}

          <a
            ref={ctaRef}
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              scrollToWork();
            }}
            className="hero-cta-btn inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-hero-tags font-semibold tracking-widest uppercase hover:bg-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300 ease-out group"
          >
            <span>Explore the Work</span>
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
