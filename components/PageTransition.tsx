"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";

type PageTransitionProps = {
  children: ReactNode;
};

/**
 * Page transition: content enters from top and stops (slide down + fade in).
 * Respects prefers-reduced-motion (no transition when set).
 * Only runs on route change, not on initial mount.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const prevPathnameRef = useRef<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const isRouteChange = prevPathnameRef.current !== null && prevPathnameRef.current !== pathname;
    prevPathnameRef.current = pathname;
    if (!isRouteChange || reducedMotion) return;
    setIsVisible(false);
    const t = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    return () => clearTimeout(t);
  }, [pathname, reducedMotion]);

  return (
    <div
      ref={wrapperRef}
      style={{
        opacity: reducedMotion ? 1 : isVisible ? 1 : 0,
        transform: reducedMotion ? "none" : isVisible ? "translateY(0)" : "translateY(-32px)",
        transition: reducedMotion
          ? "none"
          : "opacity 0.45s var(--ease-out-expo, ease-out), transform 0.45s var(--ease-out-expo, ease-out)",
      }}
    >
      {children}
    </div>
  );
}
