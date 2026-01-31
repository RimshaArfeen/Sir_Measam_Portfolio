"use client";

import { type ReactNode } from "react";

/**
 * Wrapper for React Three Fiber canvases.
 * Use to keep 3D scenes in correct stacking context and avoid Lenis/scroll conflicts.
 * Canvas stays in document flow; scroll-driven sections can pin or overlay as needed.
 */
type CanvasContainerProps = {
  children: ReactNode;
  className?: string;
};

export function CanvasContainer({ children, className = "" }: CanvasContainerProps) {
  return (
    <div className={className} style={{ position: "relative", width: "100%", height: "100%" }}>
      {children}
    </div>
  );
}
