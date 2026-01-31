# Global Header & Dark/Light Theme System

## Overview

The global header is a sticky, minimal bar that stays present without dominating. The theme system is system-aware, persists across sessions, and avoids flash on load. Both work with Lenis smooth scrolling, GSAP/ScrollTrigger, and React Three Fiber.

---

## 1. Header

### Structure

- **Position:** Fixed top, full width. Z-index above content (`--z-header: 15`).
- **Layout:** Left = logo/name (“Mesam”), center/right = nav (About, Greyn, Ventures, Research, Impact, Connect), right = theme toggle + mobile trigger.
- **Desktop:** Nav visible; no hamburger.
- **Mobile:** Nav hidden; hamburger opens a full-screen overlay menu with the same links.

### Scroll behavior

- **Default:** Transparent background, no blur, height `4.5rem`.
- **Scrolled (scroll > 24px):** Class `global-header--scrolled`:
  - Height `3.5rem`
  - Background: 85% `--color-bg` + blur (`backdrop-filter: saturate(180%) blur(12px)`).
- Scroll position comes from **Lenis** when available (`lenis.scroll`), otherwise `window.scrollY`. Updates on scroll via `lenis.on('scroll')` or `window scroll` listener with `requestAnimationFrame`.

### Hover (nav links)

- **Default:** Muted text color.
- **Hover / focus-visible:** Full text color + **animated underline**:
  - `::after` with `transform: scaleX(0)` → `scaleX(1)`, `transform-origin: center`, ~0.3s ease-out-expo.
- No aggressive motion; respects `prefers-reduced-motion` for theme icon rotation.

### Theme toggle (in header)

- **Icon only:** Sun (light mode) / moon (dark mode). No label.
- **Interaction:** Click toggles theme. Hover: slight background + icon rotation (12deg); reduced-motion removes rotation.
- **Accessibility:** `aria-label`, `title`, keyboard focusable, visible focus ring.

### CSS tokens (globals.css)

- `--header-height`, `--header-height-scrolled`
- `--header-transition-duration`, `--header-transition-ease`
- `--z-header`

---

## 2. Theme system

### Architecture

- **Source of truth:** React state in `ThemeProvider` (`theme`, `setTheme`).
- **Sync to DOM:** `data-theme="light"|"dark"` and class `.light` / `.dark` on `<html>`.
- **Persistence:** `localStorage` key `theme`. Set on every theme change.
- **Initial value (no flash):**
  1. Blocking script in `<head>` (Next.js `Script strategy="beforeInteractive"`) runs before paint.
  2. Script reads `localStorage.getItem('theme')`; if invalid, uses `prefers-color-scheme: light` → `"light"` else `"dark"`.
  3. Script sets `document.documentElement.setAttribute('data-theme', t)` and `classList.add(t)`.
  4. `ThemeProvider` initial state uses `getInitialTheme()`: reads `data-theme` from document first, then `localStorage`, then system preference. SSR falls back to `"dark"`.

### Design

- **Dark (primary):** Deep charcoal bg, soft white text, muted accent, low-contrast borders (see `globals.css` `@theme` and `[data-theme="light"]` overrides).
- **Light:** Warm off-white bg, dark neutral text, same accent with adjusted contrast. No pure white.
- **Transition:** Body and header use CSS transitions on background/color (~0.35s ease-out-expo) so theme change is smooth and no layout shift.

### Accessibility

- **System preference:** Default (when no stored theme) follows `prefers-color-scheme`.
- **Reduced motion:** Theme icon does not rotate on hover when `prefers-reduced-motion: reduce`.
- **No flash:** Script + `getInitialTheme()` ensure first paint matches stored or system theme.

### Scaling

- **3D / GSAP / Lenis:** Header and theme are layout/context only; no direct dependency. Scene and GSAP read theme via `useTheme()` and CSS variables.
- **New pages:** Header is in root layout; theme applies site-wide via `data-theme` and CSS variables.
- **SEO:** No theme in initial HTML beyond script-set attribute; content is the same for crawlers.

---

## 3. File roles

| File | Role |
|------|------|
| `components/GlobalHeader.tsx` | Header JSX, scroll state, nav, theme toggle, mobile menu. |
| `app/globals.css` | Header and theme tokens; `.global-header`, `.global-header--scrolled`, nav link underline, theme toggle, mobile menu. |
| `providers/ThemeProvider.tsx` | Theme context, `getInitialTheme()`, sync to `data-theme` and `localStorage`. |
| `app/layout.tsx` | Theme init script (`beforeInteractive`), `GlobalHeader`, `ThemeProvider`. |

---

## 4. Summary

- **Header:** Sticky, transparent → blurred on scroll, nav with animated underline hover, icon-only theme toggle, clean mobile menu.
- **Theme:** System-aware default, manual override, `localStorage`, no flash (blocking script + `getInitialTheme()`), smooth transition, accessible and compatible with R3F/GSAP/Lenis.
