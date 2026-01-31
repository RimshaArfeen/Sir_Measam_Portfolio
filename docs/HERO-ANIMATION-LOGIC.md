# Hero Section — Animation Logic

## Overview

The hero uses **GSAP** (line-by-line text reveal, scroll-driven dissolve) and **React Three Fiber** (abstract network, slow motion, mouse parallax, bloom). Both themes (light/dark) are supported via `ThemeProvider` and theme-aware colors in the 3D scene.

---

## 1. Text reveal (GSAP)

- **What:** Name, tagline, and traits fade in and move up (y: 24 → 0) with a stagger.
- **How:** On mount, each line ref is set to `opacity: 0`, `y: 24`. GSAP `to()` animates to `opacity: 1`, `y: 0` with:
  - **Delay:** 0.4s + index × 0.2s (so line 2 after line 1, etc.).
  - **Duration:** 0.8s for lines, 0.6s for the CTA.
  - **Ease:** `power3.out` for lines, `power2.out` for CTA.
- **Reduced motion:** If `prefers-reduced-motion: reduce`, all lines and CTA are shown immediately (`opacity: 1`, no animation).

---

## 2. Scroll-driven hero dissolve (ScrollTrigger + Lenis)

- **What:** As the user scrolls, the hero overlay (text + CTA) fades out so the next section takes over.
- **How:**
  - **ScrollTrigger** is synced with **Lenis** via `ScrollTrigger.scrollerProxy(document.documentElement, { scrollTop: () => lenis.scroll })` and `lenis.on('scroll', ScrollTrigger.update)` so scroll position comes from Lenis.
  - A ScrollTrigger is created with:
    - **Trigger:** The hero section.
    - **Start / end:** `start: "top top"`, `end: "bottom top"` (hero from top to when it has left the viewport).
    - **Scrub:** 0.8 (tied to scroll progress).
  - **onUpdate:** Overlay `opacity = 1 - progress * 1.2` (clamped by CSS), so the hero content fades as you scroll.

---

## 3. Three.js scene (Scene.tsx)

- **Network:** ~80 nodes (small spheres) at random positions; lines connect nodes within distance 2.2. One shared `initialPos` array (from `useState(init)`) is used for both nodes and lines so the graph is consistent.
- **Slow ambient motion:** In `useFrame`, each node’s position is `initialPos[i] + sin/cos(time + i * phase)` with low amplitude (~0.05–0.08) so the network gently moves.
- **Mouse parallax:** Pointer position is stored in a ref (normalized -1..1). In `useFrame`, the group’s `rotation.x` and `rotation.y` are lerped toward `mouse * 0.4` so the whole network tilts slightly with the cursor.
- **Lighting:** Ambient + two point lights (main + accent). Intensities and colors come from `useSceneColors()` so the scene fits the current theme.
- **Bloom:** Drei `Effects` + `UnrealBloomPass` (three-stdlib) with strength 0.35, radius 0.4, threshold 0.85 for a subtle glow on the nodes.
- **Theme (white/black):** `useTheme()` returns `'light'` or `'dark'`. `useSceneColors()` maps:
  - **Dark:** Light cyan/gold nodes and cyan-tinted lines on dark background.
  - **Light:** Dark blue/gray nodes and lines on light background so the network stays readable and non-gimmicky.

---

## 4. CTA “Explore the Work”

- **Click:** Calls `lenis?.scrollTo('#work', { offset: 0, duration: 1.2 })` if Lenis is available; otherwise `window.scrollTo` to the next section.
- **Target:** The next section has `id="work"` so the CTA scrolls to it.

---

## File roles

| File | Role |
|------|------|
| `HeroSection.tsx` | Hero layout, GSAP text reveal, ScrollTrigger dissolve, Lenis/ScrollTrigger sync, CTA. |
| `Scene.tsx` | R3F canvas: network nodes + lines, motion, parallax, theme colors, bloom. |
| `ThemeProvider.tsx` | `theme` + `setTheme`; `data-theme` on `<html>`; Scene and CSS both react to light/dark. |
