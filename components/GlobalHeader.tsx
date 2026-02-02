"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLenis } from "@/providers";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Greyn", href: "/greyn" },
  { label: "Ventures", href: "/ventures" },
  { label: "Research", href: "/research" },
  { label: "Impact", href: "/impact" },
  { label: "Connect", href: "/connect" },
] as const;

const SCROLL_THRESHOLD = 24;
const HEADER_HEIGHT_DEFAULT = 4.5; /* rem */
const HEADER_HEIGHT_SCROLLED = 3.5;

function NavLink({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="header-nav-link"
    >
      <span className="header-nav-link-inner">{label}</span>
    </Link>
  );
}

export function GlobalHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lenis = useLenis();
  const rafRef = useRef<number>(0);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    const update = (y: number) => {
      lastScrollRef.current = y;
      setScrolled(y > SCROLL_THRESHOLD);
    };

    if (lenis) {
      const onScroll = () => {
        rafRef.current = requestAnimationFrame(() => update(lenis!.scroll));
      };
      lenis.on("scroll", onScroll);
      update(lenis.scroll);
      return () => {
        lenis.off("scroll", onScroll);
        cancelAnimationFrame(rafRef.current);
      };
    }

    const onScroll = () =>
      requestAnimationFrame(() => update(window.scrollY ?? 0));
    window.addEventListener("scroll", onScroll, { passive: true });
    update(typeof window !== "undefined" ? window.scrollY : 0);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lenis]);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`global-header ${scrolled ? "global-header--scrolled" : ""} ${mobileOpen ? "global-header--mobile-open" : ""}`}
      role="banner"
    >
      <div className="global-header-inner">
        <Link href="/" className="header-logo flex items-center gap-2" aria-label="Home">
          <Image
            src="/LOGO%20MEETECH%20%20(1).png"
            alt="Meetech Dev"
            width={440}
            height={138}
            className="h-[5rem] md:h-[5.5rem] w-auto object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]"
            priority
          />
        </Link>

        <nav className="header-nav" aria-label="Main">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} label={item.label} href={item.href} />
          ))}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="header-mobile-trigger"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="header-mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <span className="header-mobile-trigger-bar" />
            <span className="header-mobile-trigger-bar" />
            <span className="header-mobile-trigger-bar" />
          </button>
        </div>
      </div>

      <div
        id="header-mobile-menu"
        className={`header-mobile-menu ${mobileOpen ? "header-mobile-menu--open" : ""}`}
        aria-hidden={!mobileOpen}
      >
        <nav className="header-mobile-nav" aria-label="Main mobile">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="header-mobile-link"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
