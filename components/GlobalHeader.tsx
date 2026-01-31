"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/providers";
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

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="header-theme-toggle"
        style={{ width: "2.5rem", height: "2.5rem" }}
        aria-hidden
      >
        <span className="header-theme-icon">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden
          >
            <circle cx="12" cy="12" r="5" />
          </svg>
        </span>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="header-theme-toggle"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <span className="header-theme-icon" aria-hidden>
        {theme === "dark" ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </span>
    </button>
  );
}

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
        <Link href="/" className="header-logo flex items-center" aria-label="Home">
          <Image
            src="/LOGO%20MEETECH%20%20(1).png"
            alt="Meetech Dev"
            width={440}
            height={138}
            className="h-[7.25rem] w-auto object-contain mix-blend-multiply"
            priority
          />
        </Link>

        <nav className="header-nav" aria-label="Main">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} label={item.label} href={item.href} />
          ))}
        </nav>

        <div className="header-actions">
          <ThemeToggle />
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
