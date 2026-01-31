"use client";

import { useEffect, useState, useRef } from "react";


function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.min(t, 1);
}

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!visible) setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [visible]);

  useEffect(() => {
    if (reducedMotion) return;

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      pos.current.x = lerp(pos.current.x, target.current.x, 0.2);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.2);

      if (containerRef.current) {
        containerRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
    };
    animate();
    return () => cancelAnimationFrame(rafRef.current);
  }, [reducedMotion]);

  useEffect(() => {
    if (visible && !reducedMotion) {
      document.body.style.cursor = "none";
    } else {
      document.body.style.cursor = "";
    }
    return () => {
      document.body.style.cursor = "";
    };
  }, [visible, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      ref={containerRef}
      className="fixed pointer-events-none z-[9999] w-10 h-10 -translate-x-1/2 -translate-y-1/2"
      style={{
        left: 0,
        top: 0,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.2s ease",
      }}
      aria-hidden
    >
      {/* Circular cursor with subtle glow */}
      <div
        className="absolute inset-0 rounded-full bg-white/90 ring-2 ring-white/50"
        style={{
          boxShadow: "0 0 12px rgba(255,255,255,0.5), 0 0 24px rgba(201,169,98,0.3)",
        }}
      />
    </div>
  );
}
