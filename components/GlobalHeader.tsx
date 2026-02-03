"use client";

import React, { useState, useEffect } from "react";
import logo from "@/public/logo.png"
import Image from "next/image";

const NAV_ITEMS = [
  { label: "Home", href: "/home" },
  { label: "About", href: "/about" },
  { label: "Greyn", href: "/greyn" },
  { label: "Ventures", href: "/ventures" },
  { label: "Research", href: "/research" },
  { label: "Impact", href: "/impact" },
  { label: "Connect", href: "/connect" },
] as const;

const SCROLL_THRESHOLD = 20;

/**
 * Individual Nav Link Component
 * Optimized for the preview environment using standard anchors
 */
function NavLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="relative group px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors cursor-pointer"
      // onClick={(e) => e.preventDefault()}
    >
      <span className="relative z-10">{label}</span>
      {/* Animated Underline Hook */}
      <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-300 group-hover:w-full group-hover:left-0" />
    </a>
  );
}

const GlobalHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled
          ? "py-3 bg-black/80 backdrop-blur-md border-b border-white/5 shadow-2xl"
          : "py-4 bg-cyan-800/10 border-b border-cyan-400/50"
        }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">

        {/* Logo Section */}
        <a href="#home" className="relative z-[110] flex items-center gap-3 group" aria-label="Home">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-400/20 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] group-hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all">

            <Image
              src={logo}
              alt="Meetech"
              className="h-full w-full"
              priority
            />          </div>
         
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2 bg-white/5 px-2 py-1 rounded-full border border-white/10 backdrop-blur-sm" aria-label="Main">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.label} label={item.label} href={item.href} />
          ))}
        </nav>

        {/* Action Button & Mobile Trigger */}
        <div className="flex items-center gap-4 relative z-[110]">
          <a
            href="/connect"
            className="hidden md:flex px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-bold rounded-full hover:scale-105 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
          >
            Work with me
          </a>

          {/* Hamburger Menu Icon */}
          <button
            type="button"
            className="flex flex-col gap-1.5 lg:hidden p-2 group"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2 bg-cyan-400" : ""}`} />
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`w-4 h-0.5 bg-white self-end transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2 w-6 bg-cyan-400" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black z-[105] transition-transform duration-700 ease-in-out lg:hidden ${mobileOpen ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        {/* Background Decorative Gradients */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-400/10 blur-[120px] rounded-full" />

        <nav className="flex flex-col items-center justify-center h-full gap-8 px-6 text-center">
          {NAV_ITEMS.map((item, idx) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-3xl font-bold text-white hover:text-cyan-400 transition-all duration-500 ${mobileOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
              style={{ transitionDelay: `${idx * 50}ms` }}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}

          <a
            href="#connect"
            className="mt-8 px-10 py-4 bg-white text-black font-bold rounded-2xl active:scale-95 transition-transform"
            onClick={() => setMobileOpen(false)}
          >
            Get Started
          </a>
        </nav>
      </div>
    </header>
  );
}

export default GlobalHeader