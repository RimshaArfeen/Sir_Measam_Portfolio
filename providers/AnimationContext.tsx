"use client";

import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
} from "react";

/**
 * Global animation context — ready for GSAP / ScrollTrigger / Framer Motion.
 * Exposes refs and flags so scroll-driven sections, pinning, and page transitions
 * can be coordinated without blocking or conflicting with Three.js.
 *
 * Usage (when you add GSAP):
 * - ScrollTrigger can use scrollRef or document
 * - Lenis scroll position can be synced via useLenis()
 * - reducedMotion ref allows gsap.globalTimeline to respect prefers-reduced-motion
 */
type AnimationContextValue = {
  /** Ref to the main scroll container (e.g. document or #__next). Used by ScrollTrigger. */
  scrollRef: React.RefObject<HTMLElement | null>;
  /** Whether user prefers reduced motion. Animations should be minimal or disabled. */
  reducedMotion: boolean;
};

const AnimationContext = createContext<AnimationContextValue | null>(null);

type AnimationProviderProps = {
  children: ReactNode;
};

export function AnimationProvider({ children }: AnimationProviderProps) {
  const scrollRef = useRef<HTMLElement | null>(null);

  return (
    <AnimationContext.Provider
      value={{
        scrollRef,
        reducedMotion: false, // Set via useEffect + matchMedia in consumer or layout
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimationContext(): AnimationContextValue | null {
  return useContext(AnimationContext);
}
