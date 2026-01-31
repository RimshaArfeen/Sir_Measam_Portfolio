"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/providers";

gsap.registerPlugin(ScrollTrigger);

export type PageCTASectionProps = {
  heading: string;
  description: string;
  primaryButton: { label: string; href: string };
  secondaryButton?: { label: string; href: string };
};

export function PageCTASection({
  heading,
  description,
  primaryButton,
  secondaryButton,
}: PageCTASectionProps) {
  const lenis = useLenis();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLAnchorElement>(null);
  const secondaryRef = useRef<HTMLAnchorElement | null>(null);

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
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = [headingRef.current, descRef.current, lineRef.current, primaryRef.current, secondaryRef.current].filter(Boolean);
    if (reduced) {
      gsap.set(els, { opacity: 1, y: 0, scaleX: 1 });
      return () => {};
    }
    gsap.set([headingRef.current, descRef.current], { opacity: 0, y: 28 });
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "center center" });
    gsap.set([primaryRef.current, secondaryRef.current].filter(Boolean), { opacity: 0, y: 20 });

    const run = () => {
      gsap.to(headingRef.current, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" });
      gsap.to(descRef.current, { opacity: 1, y: 0, duration: 0.6, delay: 0.1, ease: "power3.out" });
      gsap.to(lineRef.current, { scaleX: 1, duration: 0.6, delay: 0.2, ease: "power3.out" });
      gsap.to(primaryRef.current, { opacity: 1, y: 0, duration: 0.5, delay: 0.35, ease: "power2.out" });
      if (secondaryRef.current) {
        gsap.to(secondaryRef.current, { opacity: 1, y: 0, duration: 0.5, delay: 0.45, ease: "power2.out" });
      }
    };

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 85%",
      onEnter: run,
      onEnterBack: run,
    });

    const t = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => {
      clearTimeout(t);
      ScrollTrigger.getAll().forEach((s) => { if (s.trigger === sectionRef.current) s.kill(); });
    };
  }, [lenis]);

  return (
    <section
      ref={sectionRef}
      className="px-[var(--space-page-x)] py-12 md:py-16 border-t border-[var(--color-border)] bg-[var(--color-bg)]"
      aria-labelledby="page-cta-heading"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2
          id="page-cta-heading"
          ref={headingRef}
          className="text-display text-[var(--color-text)] font-bold mb-4"
        >
          {heading}
        </h2>
        <p
          ref={descRef}
          className="text-body-lg text-[var(--color-text-muted)] mb-10 leading-relaxed"
        >
          {description}
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <Link
            ref={primaryRef}
            href={primaryButton.href}
            className="page-cta-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-accent)] border border-[var(--color-accent)] text-white font-semibold tracking-wide hover:bg-[var(--color-accent-muted)] hover:border-[var(--color-accent-muted)] hover:shadow-[0_8px_24px_rgba(201,169,98,0.2)] transition-all duration-300"
          >
            {primaryButton.label}
          </Link>
          {secondaryButton && (
            <Link
              ref={secondaryRef}
              href={secondaryButton.href}
              className="page-cta-secondary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border-strong)] text-[var(--color-text)] font-medium tracking-wide hover:bg-[var(--color-bg-elevated)] hover:border-[var(--color-text-subtle)] transition-all duration-300"
            >
              {secondaryButton.label}
            </Link>
          )}
        </div>
        <div
          ref={lineRef}
          className="h-0.5 w-full max-w-md mx-auto bg-[var(--color-accent)]/60"
          style={{ transformOrigin: "center center" }}
          aria-hidden
        />
      </div>
    </section>
  );
}
