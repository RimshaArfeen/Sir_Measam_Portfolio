"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/providers";
import { PageCTASection } from "@/components/PageCTASection";

gsap.registerPlugin(ScrollTrigger);

const HERO_TAGLINE =
  "Intellectual Authority — depth and credibility.";

const FOCUS_AREAS = [
  { title: "Digital transformation of SMEs", desc: "How small and medium enterprises adopt technology, scale digitally, and compete in global markets." },
  { title: "Sustainability ecosystems", desc: "Systems thinking for climate, ESG, and impact — from verification to scalable solutions." },
  { title: "Technology adoption", desc: "Barriers, enablers, and frameworks for adoption across sectors and geographies." },
];

const PUBLICATIONS = [
  { title: "European journals", body: "Peer-reviewed work in European academic and policy outlets on entrepreneurship, sustainability, and digital economy." },
  { title: "American journals", body: "Publications in US-based journals and conferences on technology, innovation, and global impact." },
  { title: "Academic usage", body: "Research cited and used in curricula, dissertations, and policy work — building lasting intellectual footprint." },
];

const BOOK = {
  title: "The Young Capitalist",
  tagline: "Upcoming book on building capital, ventures, and impact from a young founder's perspective.",
  launch: "Launch details and pre-order information coming soon — global release planned.",
};

export function ResearchPageContent() {
  const lenis = useLenis();
  const heroRef = useRef<HTMLElement>(null);
  const titleCharsRef = useRef<HTMLSpanElement[]>([]);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const focusCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const pubCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bookRef = useRef<HTMLDivElement>(null);
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
          ...focusCardsRef.current,
          ...pubCardsRef.current,
          bookRef.current,
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

    focusCardsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: 0, y: 80, scale: 0.92 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        onEnter: () => runCardAnimation(el, i),
        onEnterBack: () => runCardAnimation(el, i),
      });
    });

    const runPubAnimation = (el: HTMLDivElement, i: number) => {
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

    pubCardsRef.current.forEach((el, i) => {
      if (!el) return;
      const fromX = i % 2 === 0 ? -80 : 80;
      gsap.set(el, { opacity: 0, x: fromX, scale: 0.96 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        onEnter: () => runPubAnimation(el, i),
        onEnterBack: () => runPubAnimation(el, i),
      });
    });

    const runBookAnimation = () => {
      if (!bookRef.current) return;
      const el = bookRef.current;
      gsap.set(el, { opacity: 0, y: 72, scale: 0.94 });
      gsap.to(el, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "back.out(1.1)" });
    };

    if (bookRef.current) {
      gsap.set(bookRef.current, { opacity: 0, y: 72, scale: 0.94 });
      ScrollTrigger.create({
        trigger: bookRef.current,
        start: "top 88%",
        onEnter: runBookAnimation,
        onEnterBack: runBookAnimation,
      });
    }

    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => {
      clearTimeout(refreshTimer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [lenis]);

  const title = "Research";

  return (
    <main className="min-h-screen w-full overflow-hidden">
      <section
        ref={heroRef}
        className="flex flex-col justify-center px-[var(--space-page-x)] pt-32 sm:pt-28 md:pt-20 pb-8 md:pb-12"
        aria-label="Research"
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
        aria-label="Research Focus Areas"
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-meta text-[var(--color-accent)] font-semibold tracking-widest uppercase mb-6">
            Research Focus Areas
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {FOCUS_AREAS.map((area, i) => (
              <div
                key={area.title}
                ref={(el) => {
                  focusCardsRef.current[i] = el;
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
        className="px-[var(--space-page-x)] py-10 md:py-14 border-t border-[var(--color-border)]"
        aria-label="Publications"
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-meta text-[var(--color-accent)] font-semibold tracking-widest uppercase mb-8">
            Publications
          </p>
          <div className="space-y-0">
            {PUBLICATIONS.map((item, i) => (
              <div
                key={item.title}
                ref={(el) => {
                  pubCardsRef.current[i] = el;
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
        className="px-[var(--space-page-x)] pt-8 md:pt-10 pb-10 md:pb-14 border-t border-[var(--color-border)]"
        aria-label="Upcoming Book"
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-meta text-[var(--color-accent)] font-semibold tracking-widest uppercase mb-6">
            Upcoming Book
          </p>
          <div
            ref={bookRef}
            className="p-8 md:p-10 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] transition-colors duration-300"
          >
            <h3 className="text-h1 text-[var(--color-text)] mb-3">
              {BOOK.title}
            </h3>
            <p className="text-body-lg text-[var(--color-text-muted)] leading-relaxed mb-4">
              {BOOK.tagline}
            </p>
            <p className="text-body text-[var(--color-text-subtle)]">
              {BOOK.launch}
            </p>
          </div>
        </div>
      </section>

      <PageCTASection
        heading="Research = depth + credibility"
        description="Academic and thought leadership built on published work, ongoing research, and a commitment to rigor and impact."
        primaryButton={{ label: "Get in touch", href: "/connect" }}
        secondaryButton={{ label: "View Impact", href: "/impact" }}
      />
    </main>
  );
}
