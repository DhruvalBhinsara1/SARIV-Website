# Detailed GSAP Integration Analysis, Edge Case Diagnosis & Refactoring Checklist

**Target Project**: SARIV-Website (`/Users/dhruvalbhinsara/SARIV-Website`)  
**Track**: Implementation Track (Milestone 2)  
**Agent**: Explorer 3 (`.agents/explorer_impl_3`)  
**Date**: 2026-07-22  

---

## 1. Executive Summary

This report provides a comprehensive architectural and code-level investigation of GSAP (`ScrollTrigger` and `ScrollSmoother`) usage, package dependencies, and soft navigation edge cases in Next.js App Router (React 19 / Next.js 16.2.11).

### Key Findings Summary:
1. **Package Dependency Deficit**: `@gsap/react` is **not installed** in `package.json`. Standard React `useEffect` hooks are currently used to initialize GSAP plugins, `matchMedia`, and `context`.
2. **Orphaned `ScrollTrigger` Leaks via Async `setTimeout`**: In `src/app/identity/page.tsx`, `ScrollTrigger.create()` for section scroll spy is executed inside a `setTimeout(..., 150)`. Async callbacks inside `setTimeout` bypass synchronous `gsap.context()` recording. When navigating away, `ctx.revert()` fails to kill these triggers, resulting in memory leaks and stale callbacks firing on other routes.
3. **Soft Navigation Stale Scroll Bounds in `SmoothScrolling`**: `SmoothScrolling` (wrapping `#smooth-content`) remains mounted in `RootLayout`. Upon soft navigation between `/` and `/identity`, DOM content height changes. `ScrollSmoother` does not automatically reset scroll position (`smoother.scrollTop(0)`) or recalculate bounds after Next.js DOM reconciliation and Framer Motion page transitions (`src/app/template.tsx`), leading to trapped scroll or layout offset.
4. **Sticky Pinning Failure in Transformed Containers**: CSS `position: sticky` fails inside `#smooth-content` because GSAP `ScrollSmoother` applies `transform: translate3d(...)` to the container. GSAP `ScrollTrigger` pinning must be used for `asideRef`, but requires strict lifecycle management to avoid leftover `.pin-spacer` wrappers upon unmounting.

---

## 2. Dependency & Codebase Inventory

### A. Package Dependencies (`package.json`)
- `"gsap"`: `"^3.15.0"` (Installed, contains `ScrollTrigger` and `ScrollSmoother`)
- `"@gsap/react"`: **MISSING** (Must be installed: `npm install @gsap/react`)
- `"next"`: `"16.2.11"`
- `"react"`: `"19.2.4"`
- `"framer-motion"`: `"^12.42.2"` (Used in `src/app/template.tsx` for page transition animations)

### B. GSAP File Map & Usage

| File Path | Component | GSAP Plugins / Methods | Current Purpose |
|---|---|---|---|
| `src/components/SmoothScrolling.tsx` | `SmoothScrolling` | `gsap.registerPlugin(ScrollTrigger, ScrollSmoother)`, `ScrollSmoother.create`, `ScrollTrigger.refresh()` | Global smooth scrolling wrapper in `RootLayout`. |
| `src/app/identity/page.tsx` | `IdentityPage` | `gsap.matchMedia()`, `gsap.context()`, `ScrollTrigger.create({ pin, trigger })`, `ScrollSmoother.get()` | Desktop sidebar pinning (`asideRef`), section scroll spy active index tracking (`sectionRefs`), smooth section jump scrolling (`scrollToSection`). |
| `src/app/template.tsx` | `Template` | Framer Motion `<motion.div>` (Duration: 0.5s / 500ms) | Page transition wrapper wrapping page components. |

---

## 3. Deep-Dive Edge Case Analysis

### Edge Case 1: Asynchronous Trigger Leaks & Context Bypass
- **Observation**: Lines 101-120 of `src/app/identity/page.tsx`:
  ```tsx
  useEffect(() => {
    let ctx = gsap.context(() => {
      const timeout = setTimeout(() => {
        sectionRefs.current.forEach((el, i) => {
          if (!el) return;
          ScrollTrigger.create({ ... });
        });
        ScrollTrigger.refresh();
      }, 150);
      return () => clearTimeout(timeout);
    });
    return () => ctx.revert();
  }, []);
  ```
- **Mechanism Failure**: `gsap.context` only records GSAP animations/triggers created *synchronously* during context execution. Callbacks inside `setTimeout` run after `gsap.context` has finished executing its setup block.
- **Consequence**: When the user soft-navigates away from `/identity`, `ctx.revert()` is called. It clears the timeout handle, but any `ScrollTrigger` created after 150ms remains **alive** in GSAP's global registry. These orphaned triggers continue to listen to scroll events, attempt to invoke `setActiveIndex` on unmounted React state, and corrupt global layout bounds during `ScrollTrigger.refresh()`.

### Edge Case 2: Race Condition with Next.js & Framer Motion Page Transitions
- **Observation**: `src/app/template.tsx` animates page entrances:
  ```tsx
  <motion.div
    initial={{ opacity: 0, filter: "blur(4px)" }}
    animate={{ opacity: 1, filter: "blur(0px)" }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
  >
  ```
- **Mechanism Failure**: Next.js App Router soft navigation mounts `/identity` inside `template.tsx`. During the initial 500ms (0.5s), Framer Motion is actively applying CSS filters, opacities, or layout transforms.
- **Consequence**: If `ScrollTrigger.create()` or `ScrollTrigger.refresh()` calculates trigger positions (`start`, `end`) while `motion.div` is animating or before font loading and image layout have settled, the calculated vertical positions will be offset or completely invalid. Hardcoding `setTimeout(..., 150)` fails because 150ms is less than the 500ms transition duration.

### Edge Case 3: Stale Scroll Bounds & Trapped Scroll in `SmoothScrolling`
- **Observation**: `src/components/SmoothScrolling.tsx` (Lines 14-35):
  ```tsx
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    const smoother = ScrollSmoother.create({ ... });
    return () => smoother.kill();
  }, []); // Mounted ONCE in RootLayout

  useEffect(() => {
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(raf);
  }, [pathname]);
  ```
- **Mechanism Failure**: `SmoothScrolling` sits in `RootLayout` (`src/app/layout.tsx:96`) and never unmounts during soft navigation. When navigating from `/` (e.g. height 3500px, scroll position 2000px) to `/identity` (height 1800px):
  1. The DOM contents of `#smooth-content` swap instantly.
  2. The scroll position is NOT reset to 0 by `ScrollSmoother`.
  3. `ScrollTrigger.refresh()` is called in a single `requestAnimationFrame` before Next.js DOM render completes.
- **Consequence**: The viewport remains stuck at Y = 2000px on a 1800px page, trapping scroll or displaying a blank screen.

### Edge Case 4: Pin Spacers & Sticky Pinning Layout Shifts
- **Observation**: CSS `position: sticky` cannot work inside `#smooth-content` because GSAP `ScrollSmoother` applies `transform: translate3d(0px, -Ypx, 0px)` to `#smooth-content`. CSS transforms establish a new containing block, breaking standard CSS sticky positioning.
- **Mechanism Failure**: `asideRef.current` (the `LineSidebar`) is pinned via GSAP `ScrollTrigger.create({ pin: asideRef.current, ... })`. GSAP pinning works by creating a `.pin-spacer` wrapper element in the DOM and dynamically calculating fixed/absolute offsets.
- **Consequence**: If pinning `ScrollTrigger` instances are not cleanly reverted upon route unmount using `useGSAP` scoping, `.pin-spacer` DOM elements linger, creating cumulative padding, broken flex layouts, or overlapping sidebar elements upon navigating back to `/identity`.

### Edge Case 5: DOM Element Attachment Timings & Manual Ref Arrays
- **Observation**: `sectionRefs.current[i] = el` is assigned via inline callback refs: `<section id="..." ref={(el) => { sectionRefs.current[i] = el; }}>`.
- **Mechanism Failure**: Ref callbacks fire asynchronously during React's commit phase. In React 19 concurrent mode, ref callbacks may re-run during re-renders or unmounts, populating `sectionRefs.current` with `null` or stale elements.
- **Consequence**: Iterating over `sectionRefs.current` can produce skipped triggers or unattached `ScrollTrigger` instances. Using `@gsap/react` container scoping allows selector-based target queries (e.g., `gsap.utils.toArray("section[id]")`), eliminating manual ref arrays completely.

---

## 4. Worker Refactoring Checklist

The Worker agent must execute the following step-by-step refactoring plan:

### Task 1: Install `@gsap/react`
- [ ] Execute `npm install @gsap/react` in workspace.
- [ ] Confirm `@gsap/react` is added to `package.json` under `dependencies`.

### Task 2: Refactor `src/components/SmoothScrolling.tsx`
- [ ] Import `useGSAP` from `@gsap/react`.
- [ ] Register `useGSAP` plugin: `gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP)`.
- [ ] Attach `wrapperRef` to `<div id="smooth-wrapper">` and `contentRef` to `<div id="smooth-content">`.
- [ ] Replace `useEffect` smoother initialization with `useGSAP` scoped to `wrapperRef`.
- [ ] Update `pathname` transition effect to:
  1. Synchronously reset window scroll: `window.scrollTo(0, 0)`.
  2. Reset smoother position: `smoother.scrollTop(0)`.
  3. Schedule a delayed refresh post-DOM paint / Framer Motion transition completion:
     ```tsx
     const timer = setTimeout(() => {
       if (smootherRef.current) smootherRef.current.refresh();
       ScrollTrigger.refresh();
     }, 100);
     ```

### Task 3: Refactor `src/app/identity/page.tsx`
- [ ] Import `useGSAP` from `@gsap/react`.
- [ ] Add `containerRef` to main element: `<main ref={containerRef} ...>`.
- [ ] Remove `useEffect` hooks and manual `setTimeout(..., 150)`.
- [ ] Implement a single `useGSAP` hook scoped to `containerRef`:
  - **Desktop Pinning**:
    ```tsx
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      if (columnRef.current && asideRef.current) {
        ScrollTrigger.create({
          trigger: columnRef.current,
          pin: asideRef.current,
          start: "top 160",
          end: "bottom bottom",
          pinSpacing: false,
        });
      }
    });
    ```
  - **Scroll Spy Triggers (Synchronous Query)**:
    ```tsx
    const sections = gsap.utils.toArray<HTMLElement>("section[id]", containerRef.current);
    sections.forEach((el, i) => {
      ScrollTrigger.create({
        trigger: el,
        start: `top ${SPY_THRESHOLD}`,
        end: `bottom ${SPY_THRESHOLD}`,
        onEnter: () => setActiveIndex(i),
        onEnterBack: () => setActiveIndex(i),
      });
    });
    ```
  - **Synchronous Cleanup Guarantee**: Because all triggers are created synchronously within `useGSAP`, `@gsap/react` automatically reverts all `matchMedia` bindings and `ScrollTrigger` instances when `IdentityPage` unmounts.
- [ ] Refactor `scrollToSection(id)` helper:
  - Query element by `id`.
  - Use `ScrollSmoother.get()` offset calculation: `smoother.scrollTo(smoother.offset(el, "top top") - HEADER_OFFSET, true)`.
  - Provide safe fallback for standard window scrolling.

---

## 5. Comprehensive Build & Test Strategy

### Phase 1: Static Build & Lint Validation
1. **Compilation Check**:
   ```bash
   npm run build
   ```
   Must complete with zero TypeScript or Next.js build errors.
2. **Linter Check**:
   ```bash
   npm run lint
   ```
   Must complete with zero ESLint warnings/errors.

### Phase 2: Manual Soft Navigation Test Matrix

| Test ID | Scenario | Procedure | Expected Result | Pass Criteria |
|---|---|---|---|---|
| **TC-01** | Direct Page Load (`/identity`) | Open `/identity` directly in browser. | `LineSidebar` pins on desktop at 160px clearance. Active section highlights on load. | Pinning active, no console errors. |
| **TC-02** | Soft Navigation (`/` -> `/identity`) | Start at `/`, scroll to bottom (Y > 2000px), click "Identity" in header. | Page immediately scrolls to top (Y=0). `ScrollSmoother` transform resets to 0. `LineSidebar` pins correctly. | Scroll top = 0, no trapped scroll, active index = 0 ("Overview"). |
| **TC-03** | Scroll Spy Section Tracking | On `/identity`, scroll down through all 6 sections ("Overview" -> "Geometry"). | `LineSidebar` active index updates dynamically as each section enters top threshold. | Active index updates smoothly from 0 to 5. |
| **TC-04** | Sidebar Click Navigation | Click "Typography" (index 3) in `LineSidebar`. | Viewport smoothly scrolls to Typography section, accounting for 128px header clearance. | Smooth scroll lands accurately at section top - 128px. |
| **TC-05** | Soft Navigation Teardown (`/identity` -> `/`) | Navigate from `/identity` to `/` via logo/header link. | `useGSAP` automatically kills pinning and section triggers. No lingering `.pin-spacer` DOM wrappers. | `ScrollTrigger.getAll().length === 0` (or only root smoother triggers remain). No state updates on unmounted component. |
| **TC-06** | Rapid Route Toggling | Rapidly alternate clicking between `/` and `/identity` 5 times in succession. | No memory leaks, duplicate smoother instances, or broken layout transforms. | App remains smooth, stable, and error-free. |

---

## 6. Target Code Blueprint for Worker

### Proposed `src/components/SmoothScrolling.tsx`
```tsx
"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);

export function SmoothScrolling({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useGSAP(
    () => {
      if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }

      let smoother = ScrollSmoother.get();
      if (!smoother && wrapperRef.current && contentRef.current) {
        smoother = ScrollSmoother.create({
          wrapper: wrapperRef.current,
          content: contentRef.current,
          smooth: 1,
          effects: false,
        });
      }
      smootherRef.current = smoother;

      return () => {
        if (smootherRef.current) {
          smootherRef.current.kill();
          smootherRef.current = null;
        }
      };
    },
    { scope: wrapperRef }
  );

  useEffect(() => {
    // Reset scroll position immediately on soft navigation
    window.scrollTo(0, 0);
    if (smootherRef.current) {
      smootherRef.current.scrollTop(0);
    }

    // Schedule recalculation after DOM paint and page transition animation
    const timer = setTimeout(() => {
      if (smootherRef.current) {
        smootherRef.current.refresh();
      }
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
```

### Proposed `src/app/identity/page.tsx`
```tsx
"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";
import { Typography } from "@/components/ui/Typography";
import { Mark } from "@/components/Mark";
import LineSidebar from "@/components/ui/LineSidebar";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);

const SECTIONS = [
  { label: "Identity System", id: "Overview" },
  { label: "Logomark", id: "Logomark" },
  { label: "Principles", id: "Principles" },
  { label: "Typography", id: "Typography" },
  { label: "Color", id: "Color" },
  { label: "Geometry", id: "Geometry" },
];

const HEADER_OFFSET = 128;
const SPY_THRESHOLD = 160;

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const smoother = ScrollSmoother.get();
  if (smoother) {
    smoother.scrollTo(smoother.offset(el, "top top") - HEADER_OFFSET, true);
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export default function IdentityPage() {
  const containerRef = useRef<HTMLElement>(null);
  const columnRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      // 1. Sidebar Pinning (Desktop)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        if (columnRef.current && asideRef.current) {
          ScrollTrigger.create({
            trigger: columnRef.current,
            pin: asideRef.current,
            start: "top 160",
            end: "bottom bottom",
            pinSpacing: false,
          });
        }
      });

      // 2. Scroll Spy Section Triggers (Synchronous Registration)
      if (containerRef.current) {
        const sections = gsap.utils.toArray<HTMLElement>("section[id]", containerRef.current);
        sections.forEach((el, i) => {
          ScrollTrigger.create({
            trigger: el,
            start: `top ${SPY_THRESHOLD}`,
            end: `bottom ${SPY_THRESHOLD}`,
            onEnter: () => setActiveIndex(i),
            onEnterBack: () => setActiveIndex(i),
          });
        });
      }

      // 3. Force calculation refresh
      ScrollTrigger.refresh();
    },
    { scope: containerRef }
  );

  return (
    <main ref={containerRef} className="flex-1 w-full bg-background pt-32 pb-24">
      {/* JSX Content remains unchanged */}
    </main>
  );
}
```
