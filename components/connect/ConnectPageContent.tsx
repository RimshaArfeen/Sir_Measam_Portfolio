"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/providers";
import { PageCTASection } from "@/components/PageCTASection";

gsap.registerPlugin(ScrollTrigger);

const HERO_TAGLINE =
  "Collaboration & Contact — clear, professional, direct.";

const LOOKING_FOR = [
  { title: "Partnerships", desc: "Strategic partnerships across climate-tech, platforms, and impact — execution-first, globally." },
  { title: "Investors", desc: "Aligned capital for ventures that scale beyond borders with transparent governance and measurable impact." },
  { title: "Accelerators", desc: "Programs and cohorts focused on venture building, climate, and digital transformation." },
  { title: "Policy & research collaborators", desc: "Academic, policy, and research institutions working on sustainability, technology adoption, and youth." },
];

const CONTACT_LIST = [
  {
    id: "email",
    label: "Email",
    href: "mailto:contact@muhammadmeasmraza.com",
    value: "contact@muhammadmeasmraza.com",
    desc: "Primary for collaborations, interviews, and speaking.",
    icon: "email",
  },
  {
    id: "whatsapp",
    label: "WhatsApp (Direct)",
    href: "https://wa.me/971563756215",
    value: "+971563756215",
    desc: "For urgent project communication.",
    icon: "whatsapp",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://instagram.com/mesamraza.official",
    value: "@mesamraza.official",
    desc: "Behind-the-scenes & ventures.",
    icon: "instagram",
  },
];

export function ConnectPageContent() {
  const lenis = useLenis();
  const heroRef = useRef<HTMLElement>(null);
  const titleCharsRef = useRef<HTMLSpanElement[]>([]);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const lookingCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const contactRef = useRef<HTMLElement>(null);

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
          ...lookingCardsRef.current,
          contactRef.current,
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

    lookingCardsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: 0, y: 80, scale: 0.92 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        onEnter: () => runCardAnimation(el, i),
        onEnterBack: () => runCardAnimation(el, i),
      });
    });

    const runContactAnimation = () => {
      if (!contactRef.current) return;
      const el = contactRef.current;
      gsap.set(el, { opacity: 0, y: 32 });
      gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
    };

    if (contactRef.current) {
      gsap.set(contactRef.current, { opacity: 0, y: 32 });
      ScrollTrigger.create({
        trigger: contactRef.current,
        start: "top 88%",
        onEnter: runContactAnimation,
        onEnterBack: runContactAnimation,
      });
    }

    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => {
      clearTimeout(refreshTimer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [lenis]);

  const title = "Connect";

  return (
    <main className="min-h-screen w-full overflow-hidden">
      <section
        ref={heroRef}
        className="flex flex-col justify-center px-[var(--space-page-x)] pt-32 sm:pt-28 md:pt-20 pb-8 md:pb-12"
        aria-label="Connect"
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
        aria-label="Currently Looking For"
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-meta text-[var(--color-accent)] font-semibold tracking-widest uppercase mb-6">
            Currently Looking For
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {LOOKING_FOR.map((item, i) => (
              <div
                key={item.title}
                ref={(el) => {
                  lookingCardsRef.current[i] = el;
                }}
                className="p-8 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] transition-colors duration-300"
              >
                <h3 className="text-h2 text-[var(--color-text)] mb-3">
                  {item.title}
                </h3>
                <p className="text-body text-[var(--color-text-muted)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={contactRef}
        className="px-[var(--space-page-x)] py-12 md:py-16 border-t border-[var(--color-border)] bg-[var(--color-bg)] min-h-[60vh]"
        aria-label="Contact Information"
      >
        <div className="max-w-5xl mx-auto">
          {/* Quote above both columns */}
          <p className="text-display md:text-[clamp(1.75rem,3.5vw,2.5rem)] text-[var(--color-text)] font-medium leading-tight mb-10 md:mb-12">
            &ldquo;Let&apos;s build systems that scale responsibly.&rdquo;
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-14 lg:items-stretch">
            {/* Left: Three equal-height contact cards */}
            <div className="flex flex-col gap-6 lg:min-h-0">
            {CONTACT_LIST.map((item) => {
              const isExternal = item.href.startsWith("http");
              const wrapperProps = isExternal
                ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
                : { href: item.href };
              return (
                <a
                  key={item.id}
                  {...wrapperProps}
                  className="flex-1 min-h-[7.5rem] flex p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] transition-colors duration-300"
                >
                  <div className="flex gap-4 items-start flex-1">
                    <span className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-[var(--color-bg)]/50 text-[var(--color-text-muted)]">
                      {item.icon === "email" && (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                      )}
                      {item.icon === "whatsapp" && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.865 9.865 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      )}
                      {item.icon === "instagram" && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                      )}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-body font-semibold text-[var(--color-text)] mb-1">{item.label}</h3>
                      <p className="text-caption text-[var(--color-text-muted)] truncate">{item.value}</p>
                      <p className="text-caption text-[var(--color-text-subtle)] mt-1">{item.desc}</p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Right: Form */}
          <div className="rounded-2xl p-8 bg-[var(--color-surface)] border border-[var(--color-border)] w-full">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-5"
            >
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30 focus:border-[var(--color-border-strong)]"
                />
              </div>
              <div>
                <label htmlFor="contact-email-1" className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                  Email
                </label>
                <input
                  id="contact-email-1"
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30 focus:border-[var(--color-border-strong)]"
                />
              </div>
              <div>
                <label htmlFor="contact-subject" className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="Subject"
                  className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30 focus:border-[var(--color-border-strong)]"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  placeholder="Message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30 focus:border-[var(--color-border-strong)] resize-y min-h-[100px]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-lg bg-[var(--color-text)] text-[var(--color-bg)] font-semibold text-base hover:opacity-90 transition-opacity"
              >
                Send Message
              </button>
            </form>
          </div>
          </div>
        </div>
      </section>

      <PageCTASection
        heading="No clutter. No forms overload. Just intent."
        description="Reach out directly — partnerships, investment, accelerators, or research collaboration. Clear and professional."
        primaryButton={{ label: "Get in touch", href: "mailto:contact@muhammadmeasmraza.com" }}
        secondaryButton={{ label: "View Impact", href: "/impact" }}
      />
    </main>
  );
}
