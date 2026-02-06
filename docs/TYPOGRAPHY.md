# Global Typography System

## Overview

The site uses **Inter** as the only font family. Hierarchy is created with **weight and spacing**, not with different typefaces or heavy color contrast. Typography is calibrated for calm, modern, executive tone and long-form reading without fatigue.

---

## 1. Font selection

### Primary and only font: Inter

- **Source:** Next.js `next/font/google` (Inter), variable `--font-inter`, subsets `latin`, weights 400, 500, 600, 700, `display: "swap"`.
- **Usage:** All UI   hero, section headings, body, captions, header, nav. No secondary or decorative font.
- **Rationale:**
  - Built for systems, products, and serious interfaces.
  - Strong readability at small and large sizes.
  - Neutral and confident, not trendy.
  - Used by enterprise, fintech, and deep-tech.
  - Works in dark and light themes.
  - If users notice the font, it has failed; the goal is clarity and trust.

---

## 2. Typography hierarchy (Inter only)

| Level | Use | Size (token) | Weight | Tracking / line height |
|-------|-----|--------------|--------|-------------------------|
| **1. Hero headline** | Above-the-fold, sparingly | `--text-hero` (clamp 2.5rem → 4.5rem) | Bold (700) | `--text-hero-tracking` (-0.04em), `--leading-tight` |
| **2. Section headings** | H1–H3, section titles | `--text-display`, `--text-h1`–`--text-h3` | Semi-bold (600) or medium (500) | Slight negative tracking, `--leading-snug` |
| **3. Body** | Paragraphs, long-form | `--text-body` (1rem), `--text-body-lg` (1.125rem) | Normal (400) | `--leading-normal`, `--leading-relaxed` |
| **4. Captions / metadata** | Labels, descriptors, secondary | `--text-caption` (0.875rem), `--text-meta` (0.75rem) | Normal (400) or medium (500) | Slightly reduced opacity via `--color-text-muted` / `--color-text-subtle` |

### CSS classes

- **Hero:** `.text-hero`
- **Section:** `.text-display`, `.text-h1`, `.text-h2`, `.text-h3`
- **Body:** `.text-body`, `.text-body-lg`
- **Captions:** `.text-caption`, `.text-meta`

---

## 3. Typography rules

- **Hierarchy:** Use font **weight** and **spacing** (size, letter-spacing, line-height). Avoid relying on color alone for hierarchy.
- **Restraint:** Don’t overuse bold; reserve 600/700 for headlines and key emphasis.
- **Line length:** Keep body and long-form within a comfortable max-width (e.g. 65–75ch) where applicable.
- **3D / visuals:** Type stays readable over complex or 3D backgrounds; contrast and size are tuned so text doesn’t compete with visuals.
- **Theme:** Softer whites (`#fafaf9`) and soft blacks (`#18181b`) in light mode; no pure white or harsh black. Transitions use CSS so theme changes don’t cause layout shift.

---

## 4. Theme compatibility

- **Dark:** Primary text `--color-text` (#fafaf9); muted/subtle for captions.
- **Light:** Primary text `--color-text` (#18181b); muted/subtle for captions.
- **Contrast:** Meets readability requirements in both themes.
- **Transitions:** `body` and theme-dependent tokens transition smoothly on theme switch.

---

## 5. Technical setup

### Font loading (layout)

- **Next.js font:** `Inter` from `next/font/google` with `variable: "--font-inter"`, `subsets: ["latin"]`, `weight: ["400", "500", "600", "700"]`, `display: "swap"`.
- **Global variable:** `--font-sans` in `globals.css` points to `var(--font-inter)` so one token drives all text.
- **Tailwind:** `@theme inline` exposes `--font-sans`; use `font-sans` in Tailwind where needed. Body has `font-sans` in layout.
- **Layout shift:** Next.js font optimization avoids FOUT/FOIT; `display: "swap"` keeps layout stable.

### Tokens in `globals.css`

- **Family:** `--font-sans`
- **Weights:** `--font-weight-normal` (400), `--font-weight-medium` (500), `--font-weight-semibold` (600), `--font-weight-bold` (700)
- **Sizes:** `--text-hero`, `--text-display`, `--text-h1`–`--text-h3`, `--text-body`, `--text-body-lg`, `--text-caption`, `--text-meta`
- **Tracking:** `--text-hero-tracking`, `--text-display-tracking`
- **Line height:** `--leading-tight`, `--leading-snug`, `--leading-normal`, `--leading-relaxed`

### Accessibility

- **Motion:** Respect `prefers-reduced-motion` elsewhere; typography itself doesn’t animate.
- **Contrast:** Colors and sizes are chosen for readability in both themes.

---

## 6. Why this supports a CEO-grade experience

- **Single voice:** One font (Inter) across the product feels consistent and intentional, like a single executive voice.
- **Calm and precise:** Weight and spacing create hierarchy without shouting; the system feels confident and precise.
- **Invisible type:** Inter is built to recede so content and trust stand out, not the font.
- **Scalable:** Same system works for hero, sections, body, and metadata; no extra typefaces to maintain.
- **Global and timeless:** Inter is widely used in serious products and doesn’t date quickly, supporting a global, executive brand.
