# GSAP ScrollTrigger Soft Navigation Analysis Report

## Executive Summary
This report analyzes the root causes of the GSAP `ScrollTrigger` and `LineSidebar` active tracking failure during soft navigations from `/` to `/identity` in the SARIV website application, and provides a comprehensive refactoring plan using `@gsap/react` (`useGSAP`).

---

## 1. Direct Observations & Code Audit

### A. Missing Package Dependency
- **File**: `/Users/dhruvalbhinsara/SARIV-Website/package.json`
- **Observation**: `gsap` is installed (`^3.15.0`), but the official `@gsap/react` package containing the `useGSAP` hook is **not installed**.

### B. `SmoothScrolling` Scroller Lifecycle (`src/components/SmoothScrolling.tsx`)
- **Lines 14–28**:
  ```tsx
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1,
      effects: false,
    });
    return () => smoother.kill();
  }, []);
  ```
  - `ScrollSmoother` is created **only once** on initial app mount.
  - On soft navigation, the App Router replaces the inner DOM of `#smooth-content` without unmounting `SmoothScrolling`.
- **Lines 30–35**:
  ```tsx
  useEffect(() => {
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(raf);
  }, [pathname]);
  ```
  - `pathname` changes trigger a `requestAnimationFrame(() => ScrollTrigger.refresh())`.
  - However, scroll restoration / scroll top reset is **not** performed on soft route changes (`window.scrollTo(0,0)` or `smoother.scrollTop(0)` only happens on initial mount).
  - The timing between `SmoothScrolling`'s `useEffect([pathname])` and the mounting page component's `useEffect` is unsynchronized.

### C. `IdentityPage` GSAP Scoping & Lifecycle (`src/app/identity/page.tsx`)
- **Lines 81–96 (Aside Pinning)**:
  ```tsx
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const st = ScrollTrigger.create({
        trigger: columnRef.current,
        pin: asideRef.current,
        start: "top 160",
        end: "bottom bottom",
        pinSpacing: false,
      });
      return () => st.kill();
    });
    return () => mm.revert();
  }, []);
  ```
  - Uses raw React `useEffect` with empty dependency array `[]`.
  - On soft navigation from `/` to `/identity`, `columnRef.current` and `asideRef.current` mount while `ScrollSmoother` still retains old `#smooth-content` scroll bounds and transforms from `/`.
  - `ScrollTrigger.create()` evaluates `start` and `end` bounds against unrefreshed scroller transforms, resulting in invalid scroll positions.

- **Lines 100–122 (Section Spy & Async Context Leak)**:
  ```tsx
  useEffect(() => {
    let ctx = gsap.context(() => {
      const timeout = setTimeout(() => {
        sectionRefs.current.forEach((el, i) => {
          if (!el) return;
          ScrollTrigger.create({
            trigger: el,
            start: `top ${SPY_THRESHOLD}`,
            end: `bottom ${SPY_THRESHOLD}`,
            onEnter: () => setActiveIndex(i),
            onEnterBack: () => setActiveIndex(i),
          });
        });
        ScrollTrigger.refresh();
      }, 150);

      return () => clearTimeout(timeout);
    });

    return () => ctx.revert();
  }, []);
  ```
  - **CRITICAL ASYNC BUG**: In GSAP, `gsap.context()` only captures GSAP instances created **synchronously** inside its callback function. Animations and `ScrollTrigger` instances created inside `setTimeout` callbacks (150ms delay) escape context tracking unless explicitly wrapped in `ctx.add(...)`.
  - When `IdentityPage` unmounts during soft navigation, `ctx.revert()` is called synchronously. The `ScrollTrigger` instances created 150ms later inside `setTimeout` are **never reverted or cleaned up**.
  - These orphaned `ScrollTrigger` instances persist in `ScrollTrigger.getAll()`, pointing to detached DOM nodes or firing callbacks against unmounted state.
  - On subsequent soft navigations back to `/identity`, new triggers are created on top of orphaned triggers, causing active index tracking to fail completely.

### D. `LineSidebar` Component (`src/components/ui/LineSidebar.tsx`)
- **Lines 72–75**:
  ```tsx
  useEffect(() => {
    if (typeof controlledActive === "number") setActiveIndex(controlledActive);
  }, [controlledActive]);
  ```
  - `LineSidebar` correctly consumes `activeIndex` as a controlled prop.
  - When `IdentityPage`'s section spy triggers fail to fire due to miscalculated start/end values or orphaned triggers, `setActiveIndex` is never called, leaving `LineSidebar` frozen on section 0.

---

## 2. Logic Chain & Technical Diagnosis

```
[User Soft Navigates '/' -> '/identity']
                │
                ▼
[Next.js App Router updates DOM inside '#smooth-content']
                │
                ├─────────────────────────────────────────────────────────────────┐
                ▼                                                                 ▼
[SmoothScrolling remains mounted]                              [IdentityPage component mounts]
  • No scroll-top reset (retains stale scrollY)                 • columnRef, asideRef, sectionRefs attached
  • ScrollSmoother height not yet refreshed                      • Standard useEffect() runs immediately
                │                                                                 │
                │                                                                 ▼
                │                                              [Pinning & Spy triggers initialized]
                │                                               • Trigger bounds calculated using
                │                                                 stale scroller transforms
                │                                               • Spy triggers created inside setTimeout
                │                                                 ESCAPE gsap.context tracking!
                │                                                                 │
                ▼                                                                 ▼
[SmoothScrolling calls rAF ScrollTrigger.refresh()]        [Orphaned triggers persist in GSAP global state]
  • Runs after page triggers initialized with stale bounds   • Section callbacks fail to fire
  • Leaves triggers out of alignment                         • LineSidebar activeIndex stuck at 0
                                                             • Aside pinning fails to stick
```

---

## 3. Caveats & Edge Cases

1. **Next.js App Router Soft Nav Lifecycle**: Soft navigations replace DOM nodes without full page reload. DOM measurement must happen after React layout paints and `ScrollSmoother` scroller dimensions are updated.
2. **Async Trigger Creation**: Never create `ScrollTrigger` or GSAP animations inside `setTimeout` or asynchronous promises without registering them with `ctx.add()` or using `useGSAP` layout dependencies.
3. **React 18 / 19 StrictMode Double-Mounting**: Raw `useEffect` hooks run twice in development, creating duplicate `ScrollTrigger` instances if proper cleanup (`revert()`) is not implemented. `useGSAP` handles double mounting cleanly.
4. **Window Scroll Offset**: Navigating from a scrolled home page (`/`) to `/identity` must reset scroll position to 0 (`smoother.scrollTop(0)`) to ensure calculations start from origin.

---

## 4. Proposed Refactoring Strategy

### Step 1: Install `@gsap/react`
Add `@gsap/react` package to `package.json`:
```bash
npm install @gsap/react
```

### Step 2: Refactor `src/components/SmoothScrolling.tsx`
Utilize `useGSAP` in `SmoothScrolling` to manage `ScrollSmoother` lifecycle and handle route transitions cleanly:

```tsx
"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function SmoothScrolling({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const mainRef = useRef<HTMLDivElement>(null);
  const smootherRef = useRef<ScrollSmoother | null>(null);

  // Initialize ScrollSmoother once scoped to wrapper
  useGSAP(
    () => {
      if ("scrollRestoration" in history) history.scrollRestoration = "manual";

      smootherRef.current = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1,
        effects: false,
      });

      return () => {
        smootherRef.current?.kill();
        smootherRef.current = null;
      };
    },
    { scope: mainRef }
  );

  // Handle route changes: scroll to top and refresh ScrollTrigger
  useGSAP(
    () => {
      if (smootherRef.current) {
        smootherRef.current.scrollTop(0);
      } else {
        window.scrollTo(0, 0);
      }
      // Allow DOM update & browser repaint, then refresh scroller
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    },
    { dependencies: [pathname], scope: mainRef }
  );

  return (
    <div id="smooth-wrapper" ref={mainRef}>
      <div id="smooth-content">{children}</div>
    </div>
  );
}
```

### Step 3: Refactor `src/app/identity/page.tsx`
Unify pinning and section spy logic into a single `useGSAP` hook scoped to a container ref (`containerRef`):

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
  const containerRef = useRef<HTMLDivElement>(null);
  const columnRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      // 1. Aside sticky pinning via matchMedia
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: columnRef.current,
          pin: asideRef.current,
          start: "top 160",
          end: "bottom bottom",
          pinSpacing: false,
        });
      });

      // 2. Synchronous Section Spy Triggers
      sectionRefs.current.forEach((el, i) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: `top ${SPY_THRESHOLD}`,
          end: `bottom ${SPY_THRESHOLD}`,
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });
      });

      // 3. Force instant refresh to align with ScrollSmoother height
      ScrollTrigger.refresh();
    },
    { scope: containerRef }
  );

  return (
    <main ref={containerRef} className="flex-1 w-full bg-background pt-32 pb-24">
      {/* Rest of UI structure remains unchanged */}
    </main>
  );
}
```

---

## 5. Verification Method

1. **Dependency Verification**:
   - Run `npm install @gsap/react` and verify package insertion in `package.json`.
   - Run `npm run build` to confirm zero TypeScript compilation or linting errors.

2. **Functional E2E Verification**:
   - Start local dev server (`npm run dev`).
   - Navigate to `/`. Scroll down 800px.
   - Click navigation link to `/identity` (soft navigation).
   - Verify page scrolls to top (0,0).
   - Inspect console using `ScrollTrigger.getAll()`: verify active triggers belong exclusively to current DOM elements.
   - Scroll down `/identity`:
     - Confirm `asideRef` sidebar pins smoothly at `top 160` when scrolling past threshold.
     - Confirm `LineSidebar` active section index updates dynamically (00 -> 01 -> 02 -> 03 -> 04 -> 05).
   - Click a sidebar item (e.g. "Typography"): confirm smooth scroll to section with offset.
   - Navigate back to `/` and back to `/identity` multiple times: confirm no duplicate triggers or memory leaks exist in `ScrollTrigger.getAll()`.
