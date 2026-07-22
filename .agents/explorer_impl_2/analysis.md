# GSAP ScrollSmoother & ScrollTrigger Lifecycle Analysis & Refactoring Strategy

## Executive Summary
This report analyzes the GSAP `ScrollSmoother` and `ScrollTrigger` lifecycle issues during Next.js App Router soft navigations (e.g., navigating between `/` and `/identity` via `<Link>`). 

The primary root causes identified are:
1. **Untracked Asynchronous Trigger Leaks in `IdentityPage`**: The use of `setTimeout(..., 150)` inside `gsap.context(...)` causes `ScrollTrigger.create(...)` calls to execute outside the synchronous recording scope of `gsap.context`. Consequently, `ctx.revert()` on component unmount fails to kill these triggers, leaking them across route transitions.
2. **Missing Scroll Reset and Stale Scroll Bounds in `SmoothScrolling`**: `SmoothScrolling` stays mounted in `RootLayout`. Upon soft navigation, Next.js replaces DOM content, altering document height. Because `SmoothScrolling` does not reset scroll position (`smoother.scrollTop(0)`) or recalculate wrapper bounds immediately after DOM paint, scroll position becomes trapped or offset.
3. **Absence of `@gsap/react` (`useGSAP` Hook)**: Manual management of `gsap.context` and `gsap.matchMedia` inside React standard `useEffect` hooks bypasses React 18/19 layout & render lifecycle synchronization.

---

## 1. Direct Observations

### A. `src/components/SmoothScrolling.tsx` (Lines 1-43)
```tsx
11: export function SmoothScrolling({ children }: { children: React.ReactNode }) {
12:   const pathname = usePathname();
13: 
14:   useEffect(() => {
15:     if ("scrollRestoration" in history) history.scrollRestoration = "manual";
16:     window.scrollTo(0, 0);
17: 
18:     const smoother = ScrollSmoother.create({
19:       wrapper: "#smooth-wrapper",
20:       content: "#smooth-content",
21:       smooth: 1,
22:       effects: false,
23:     });
24:     return () => smoother.kill();
25:   }, []); // Mounted once in RootLayout, never unmounts on soft nav
26: 
27:   useEffect(() => {
28:     const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
29:     return () => cancelAnimationFrame(raf);
30:   }, [pathname]); // Refreshes ScrollTrigger on route change, but does not reset scroll top or smoother content height
```

**Key Findings in `SmoothScrolling.tsx`**:
- `SmoothScrolling` is rendered inside `RootLayout` (`src/app/layout.tsx:96`), so it remains mounted during soft page transitions.
- `useEffect` at line 14 initializes `ScrollSmoother.create` on initial page load, but scroll restoration (`window.scrollTo(0,0)`) is ONLY run on initial mount (line 19).
- When navigating from `/identity` to `/` (or vice versa), `pathname` changes, triggering `useEffect` at line 30. However, `ScrollTrigger.refresh()` is called via `requestAnimationFrame` WITHOUT resetting `smoother.scrollTop(0)` or notifying `ScrollSmoother` to re-measure `#smooth-content` scroll height.

### B. `src/app/identity/page.tsx` (Lines 81-122)
```tsx
81:   useEffect(() => {
82:     // ScrollSmoother scrolls #smooth-content via a transform, so native
83:     // position:sticky has no real scroll to track — pin via ScrollTrigger instead.
84:     const mm = gsap.matchMedia();
85:     mm.add("(min-width: 1024px)", () => {
86:       const st = ScrollTrigger.create({
87:         trigger: columnRef.current,
88:         pin: asideRef.current,
89:         start: "top 160",
90:         end: "bottom bottom",
91:         pinSpacing: false,
92:       });
93:       return () => st.kill();
94:     });
95:     return () => mm.revert();
96:   }, []);
97: 
98:   const sectionRefs = useRef<(HTMLElement | null)[]>([]);
99: 
100:   useEffect(() => {
101:     let ctx = gsap.context(() => {
102:       // Small delay to ensure any layout shifts or initial Next.js routing has settled
103:       const timeout = setTimeout(() => {
104:         sectionRefs.current.forEach((el, i) => {
105:           if (!el) return;
106:           ScrollTrigger.create({
107:             trigger: el,
108:             start: `top ${SPY_THRESHOLD}`,
109:             end: `bottom ${SPY_THRESHOLD}`,
110:             onEnter: () => setActiveIndex(i),
111:             onEnterBack: () => setActiveIndex(i),
112:           });
113:         });
114:         ScrollTrigger.refresh();
115:       }, 150);
116: 
117:       return () => clearTimeout(timeout);
118:     });
119: 
120:     return () => ctx.revert();
121:   }, []);
```

**Key Findings in `IdentityPage`**:
- **Critical Context Bypass (Lines 103-115)**: `gsap.context(func)` records GSAP objects created synchronously inside `func`. The `setTimeout(..., 150)` defers execution of `ScrollTrigger.create`. As a result, the created `ScrollTrigger` instances are NOT recorded in `ctx`.
- When navigating away from `/identity`, `ctx.revert()` is called. It clears the timeout handle (line 117), but any `ScrollTrigger` created after the 150ms delay remains ALIVE in GSAP's global registry.
- These orphaned `ScrollTrigger` instances keep firing `onEnter` / `onEnterBack` callbacks when scrolling on other pages, attempting to update state on an unmounted `IdentityPage` component.

### C. Dependency Status in `package.json`
- `gsap` version `^3.15.0` is installed.
- `@gsap/react` package is **NOT installed**.

---

## 2. Logic Chain

```
[Observation: SmoothScrolling in RootLayout]
       │
       ▼
Next.js App Router soft navigation keeps RootLayout mounted; children DOM elements swap inside #smooth-content.
       │
       ▼
[Observation: ScrollSmoother caches #smooth-content height & transform position]
       │
       ▼
If scroll position is 1200px on /identity and user soft navigates to / (height 800px):
 - Smoother transform remains at -1200px or attempts to animate from -1200px.
 - Without window.scrollTo(0, 0) and smoother.scrollTop(0), scroll is trapped out of bounds.
       │
       ▼
[Observation: setTimeout(..., 150) inside gsap.context in IdentityPage]
       │
       ▼
GSAP context records synchronously during execution. setTimeout executes asynchronously 150ms later.
       │
       ▼
ScrollTriggers are NOT registered in ctx. Context revert on unmount fails to kill triggers.
       │
       ▼
Orphaned ScrollTriggers pollute global ScrollTrigger registry, corrupting layout bounds and firing callbacks post-unmount.
```

---

## 3. Caveats & Assumptions

1. **Scope Boundaries**: This analysis focuses specifically on `SmoothScrolling.tsx`, `IdentityPage` (`src/app/identity/page.tsx`), and their interaction with Next.js App Router soft navigation. Other pages (`/work`, `/contact`, etc.) were checked and currently do not declare custom `ScrollTrigger` instances.
2. **Browser Scroll Restoration**: Modern browsers attempt native scroll restoration when soft-navigating back/forward. Setting `history.scrollRestoration = "manual"` is required so `ScrollSmoother` retains total authority over viewport scroll offsets.
3. **Environment**: Assumes client-side execution in React 19 / Next.js 16 environment. `@gsap/react` `useGSAP` handles React 18/19 strict mode and concurrent rendering automatically.

---

## 4. Conclusion & Detailed Refactoring Strategy

### Summary of Solutions:
1. **Install `@gsap/react`**: Use official `useGSAP` hook for scoped animations and automatic cleanup on unmount/dependency updates.
2. **Refactor `SmoothScrolling.tsx`**:
   - Use `useGSAP` with wrapper ref scope for initializing `ScrollSmoother`.
   - On `pathname` change, reset scroll position (`window.scrollTo(0,0)` and `smoother.scrollTop(0)`), followed by a delayed `smoother.refresh()` and `ScrollTrigger.refresh()` after DOM paint.
3. **Refactor `IdentityPage` (`src/app/identity/page.tsx`)**:
   - Replace standard `useEffect` hooks with a single `useGSAP` hook scoped to `containerRef`.
   - Remove `setTimeout(..., 150)` completely so all `ScrollTrigger` instances (desktop pinning and section scroll spy) are recorded synchronously within the GSAP context.
   - Synchronous context recording guarantees 100% clean teardown on route change.

---

### Step-by-Step Code Changes

#### Step 1: Install `@gsap/react`
Run command: `npm install @gsap/react`

#### Step 2: Refactored `src/components/SmoothScrolling.tsx`
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

  // Initialize ScrollSmoother once on layout mount using useGSAP
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

  // Handle Soft Navigation (Route Transition) Lifecycle
  useEffect(() => {
    // 1. Immediately reset scroll position to top on route swap
    window.scrollTo(0, 0);
    if (smootherRef.current) {
      smootherRef.current.scrollTop(0);
    }

    // 2. Schedule refresh after Next.js completes DOM reconciliation
    const rafId = requestAnimationFrame(() => {
      if (smootherRef.current) {
        smootherRef.current.refresh();
      }
      ScrollTrigger.refresh();
    });

    return () => cancelAnimationFrame(rafId);
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

#### Step 3: Refactored `src/app/identity/page.tsx`
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

// (SWATCHES, ATMOSPHERIC, SEMANTIC, RADII arrays and Swatch component unchanged)

export default function IdentityPage() {
  const containerRef = useRef<HTMLElement>(null);
  const columnRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      // 1. Sidebar Pinning for Desktop Viewports
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

      // 2. Scroll Spy Section Triggers (synchronous registration)
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

      // 3. Force calculation refresh after registering all triggers
      ScrollTrigger.refresh();
    },
    { scope: containerRef }
  );

  return (
    <main ref={containerRef} className="flex-1 w-full bg-background pt-32 pb-24">
      {/* ... JSX markup unchanged ... */}
    </main>
  );
}
```

---

## 5. Verification Method

To verify that the refactored GSAP ScrollSmoother and ScrollTrigger lifecycle functions seamlessly:

1. **Build & Lint Verification**:
   - Run `npm run build` to confirm zero compilation or type errors.
   - Run `npm run lint` to verify ESLint compliance.

2. **Soft Navigation Lifecycle Verification**:
   - Start local dev server (`npm run dev`) or test build (`npm run start`).
   - Navigate to `/`. Scroll down to the bottom of the page.
   - Click the "Identity" link in the header to trigger a soft route transition to `/identity`.
   - **Check**: Page should scroll immediately to top (offset 0), `ScrollSmoother` transform should reset to 0, and line sidebar pinning should engage cleanly at `top 160`.
   - Scroll through `/identity` sections ("Overview", "Logomark", "Principles", "Typography", "Color", "Geometry").
   - **Check**: `LineSidebar` active index should update dynamically as each section crosses `top 160`.
   - Soft-navigate back to `/` by clicking the logo or header link.
   - **Check**: Scroll position resets to top; no residual pin spacers or orphan ScrollTriggers remain active in `ScrollTrigger.getAll()`.
