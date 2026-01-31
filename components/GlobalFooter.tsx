"use client";

import { useRef, useEffect, type ReactElement } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/providers";

gsap.registerPlugin(ScrollTrigger);

const QUICK_LINKS = [
  { label: "Home", href: "/", icon: "home" },
  { label: "About", href: "/about", icon: "user" },
  { label: "Impact", href: "/impact", icon: "award" },
  { label: "Ventures", href: "/ventures", icon: "briefcase" },
  { label: "Awards", href: "/impact", icon: "star" },
  { label: "Contact", href: "/connect", icon: "mail" },
] as const;

const EMAIL = "contact@muhammadmeasmraza.com";
const PHONE = "+971563756215";

const TAGLINE_1 = "Entrepreneur | Author | Global Youth Leader | Policy Advocate";
const TAGLINE_2 = "Building ventures in AI, education, and ethical innovation to dismantle systemic inequality.";

const SOCIAL = [
  { label: "LinkedIn", href: "https://linkedin.com/in/mesamraza", icon: "linkedin" },
  { label: "Twitter", href: "https://twitter.com/mesamraza", icon: "twitter" },
  { label: "WhatsApp", href: "https://wa.me/971563756215", icon: "whatsapp" },
  { label: "Instagram", href: "https://instagram.com/mesamraza.official", icon: "instagram" },
] as const;

const Icon = ({ name }: { name: string }) => {
  const icons: Record<string, ReactElement> = {
    home: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
    ),
    user: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
    ),
    award: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" /></svg>
    ),
    briefcase: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" /></svg>
    ),
    star: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>
    ),
    mail: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
    ),
  };
  return <span className="flex-shrink-0 text-[var(--color-text-subtle)]">{icons[name] ?? null}</span>;
};

export function GlobalFooter() {
  const lenis = useLenis();
  const footerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);
  const col4Ref = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const socialRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const ctaRef = useRef<HTMLAnchorElement>(null);

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
    if (!footerRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const allEls = [
      lineRef.current,
      col1Ref.current,
      col2Ref.current,
      col3Ref.current,
      col4Ref.current,
      ctaRef.current,
      ...linkRefs.current,
      ...socialRefs.current,
    ].filter(Boolean);

    if (reduced) {
      gsap.set(allEls, { opacity: 1, y: 0, x: 0, scaleX: 1 });
      return () => {};
    }

    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });
    gsap.set([col1Ref.current, col2Ref.current, col3Ref.current, col4Ref.current].filter(Boolean), { opacity: 0, y: 24 });
    linkRefs.current.forEach((el, i) => el && gsap.set(el, { opacity: 0, y: 12 }));
    socialRefs.current.forEach((el) => el && gsap.set(el, { opacity: 0, scale: 0.85 }));
    gsap.set(ctaRef.current, { opacity: 0, y: 16 });

    const run = () => {
      gsap.to(lineRef.current, { scaleX: 1, duration: 0.7, ease: "power3.inOut" });
      gsap.to(col1Ref.current, { opacity: 1, y: 0, duration: 0.55, delay: 0.1, ease: "power3.out" });
      gsap.to(col2Ref.current, { opacity: 1, y: 0, duration: 0.55, delay: 0.18, ease: "power3.out" });
      gsap.to(col3Ref.current, { opacity: 1, y: 0, duration: 0.55, delay: 0.26, ease: "power3.out" });
      gsap.to(col4Ref.current, { opacity: 1, y: 0, duration: 0.55, delay: 0.34, ease: "power3.out" });
      linkRefs.current.forEach((el, i) => {
        if (el) gsap.to(el, { opacity: 1, y: 0, duration: 0.4, delay: 0.4 + i * 0.04, ease: "power2.out" });
      });
      socialRefs.current.forEach((el, i) => {
        if (el) gsap.to(el, { opacity: 1, scale: 1, duration: 0.45, delay: 0.55 + i * 0.05, ease: "back.out(1.15)" });
      });
      gsap.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5, delay: 0.85, ease: "power2.out" });
    };

    ScrollTrigger.create({
      trigger: footerRef.current,
      start: "top 92%",
      onEnter: run,
      onEnterBack: run,
    });

    const t = setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => {
      clearTimeout(t);
      ScrollTrigger.getAll().forEach((s) => { if (s.trigger === footerRef.current) s.kill(); });
    };
  }, [lenis]);

  const SocialIcon = ({ s, i }: { s: (typeof SOCIAL)[number]; i: number }) => {
    const paths: Record<string, ReactElement> = {
      linkedin: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />,
      twitter: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />,
      whatsapp: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.865 9.865 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />,
      instagram: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />,
    };
    return (
      <a
        ref={(el) => { socialRefs.current[i] = el; }}
        href={s.href}
        target="_blank"
        rel="noopener noreferrer"
        className="footer-social flex items-center justify-center w-10 h-10 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-accent)]/5 transition-all duration-300"
        aria-label={s.label}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>{paths[s.icon]}</svg>
      </a>
    );
  };

  return (
    <footer
      ref={footerRef}
      className="global-footer relative bg-[var(--color-bg)] text-[var(--color-text)] overflow-hidden border-t border-[var(--color-border)]"
      role="contentinfo"
    >
      <div ref={lineRef} className="h-px w-full bg-gradient-to-r from-transparent via-[var(--color-accent)]/60 to-transparent" style={{ transformOrigin: "left center" }} aria-hidden />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 px-[var(--space-page-x)] py-12 md:py-14 max-w-6xl mx-auto">
        {/* Column 1: Brand */}
        <div ref={col1Ref} className="flex flex-col">
          <Link href="/" className="inline-flex items-baseline gap-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded">
            <span className="text-h1 font-bold text-[#ea580c]">M</span>
            <span className="text-h1 font-bold text-[var(--color-text)]">esam</span>
          </Link>
          <p className="mt-3 text-caption text-[var(--color-text-muted)] leading-relaxed max-w-xs">
            {TAGLINE_1}
          </p>
          <p className="mt-2 text-caption text-[var(--color-text-subtle)] leading-relaxed max-w-xs">
            {TAGLINE_2}
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div ref={col2Ref}>
          <h3 className="text-caption font-semibold text-[var(--color-text-subtle)] tracking-wider uppercase mb-5">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-3">
            {QUICK_LINKS.map((item, i) => (
              <li key={item.label}>
                <Link
                  ref={(el) => { linkRefs.current[i] = el; }}
                  href={item.href}
                  className="footer-quick-link flex items-center gap-3 text-body text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-300 w-fit group"
                >
                  <Icon name={item.icon} />
                  <span className="border-b border-transparent group-hover:border-[var(--color-text)]">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact Details */}
        <div ref={col3Ref}>
          <h3 className="text-caption font-semibold text-[var(--color-text-subtle)] tracking-wider uppercase mb-5">
            Contact Details
          </h3>
          <div className="flex flex-col gap-4">
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-body text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
              <span className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-subtle)]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
              </span>
              <span className="truncate">{EMAIL}</span>
            </a>
            <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="flex items-center gap-3 text-body text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
              <span className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-subtle)]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
              </span>
              <span>{PHONE}</span>
            </a>
          </div>
        </div>

        {/* Column 4: Social + Get Started */}
        <div ref={col4Ref} className="flex flex-col">
          <h3 className="text-caption font-semibold text-[var(--color-text-subtle)] tracking-wider uppercase mb-5">
            Follow Me
          </h3>
          <div className="flex items-center gap-3 mb-6">
            {SOCIAL.map((s, i) => (
              <SocialIcon key={s.label} s={s} i={i} />
            ))}
          </div>
          <Link
            ref={ctaRef}
            href="/connect"
            className="footer-cta-btn inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-semibold text-caption tracking-widest uppercase hover:bg-neutral-100 transition-all duration-300 w-fit"
          >
            Get Started
            <svg className="footer-cta-arrow w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
