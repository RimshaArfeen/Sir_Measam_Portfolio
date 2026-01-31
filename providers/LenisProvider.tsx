"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";

type LenisContextValue = Lenis | null;

const LenisContext = createContext<LenisContextValue>(null);

type LenisProviderProps = {
  children: ReactNode;
  options?: ConstructorParameters<typeof Lenis>[0];
};

/**
 * Global smooth scroll via Lenis.
 * Respects prefers-reduced-motion: Lenis is not initialized when user prefers reduced motion.
 * Does not block or interfere with Three.js canvases (Lenis scrolls the document, not canvas).
 */
export function LenisProvider({ children, options = {} }: LenisProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      touchMultiplier: 2,
      smoothWheel: true,
      wheelMultiplier: 1,
      ...options,
    });

    setLenis(instance);

    function raf(time: number) {
      instance.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafRef.current);
      instance.destroy();
      setLenis(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- options intentionally stable at mount
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}

export function useLenis(): LenisContextValue {
  return useContext(LenisContext);
}
