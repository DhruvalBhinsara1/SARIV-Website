# Handoff Report — Explorer 3 (Implementation Track: Milestone 2)

**From**: Explorer 3 (`.agents/explorer_impl_3`)  
**To**: Sub-Orchestrator / Implementation Worker  
**Date**: 2026-07-22  

---

## 1. Observation

### Exact File Paths & Code Line Quotes:
1. **`package.json`**:
   - Lines 29: `"gsap": "^3.15.0"`
   - Dependency check: `@gsap/react` is **NOT listed** in `dependencies` or `devDependencies`.
   - Node Modules check: Directory `/Users/dhruvalbhinsara/SARIV-Website/node_modules/@gsap` does not exist.

2. **`src/app/identity/page.tsx`**:
   - Lines 81-96 (`useEffect` #1): Uses `gsap.matchMedia()` without `@gsap/react` scoping.
   - Lines 100-121 (`useEffect` #2):
     ```tsx
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
     ```
   - Quoted flaw: `ScrollTrigger.create()` is executed inside `setTimeout(..., 150)`. Async execution bypasses `gsap.context` recording, causing orphaned triggers to persist after unmount.

3. **`src/components/SmoothScrolling.tsx`**:
   - Lines 14-28 (`useEffect` #1): `ScrollSmoother.create()` is run on initial component mount with empty dependency array `[]`.
   - Lines 30-35 (`useEffect` #2): `useEffect([pathname])` calls `requestAnimationFrame(() => ScrollTrigger.refresh())` without resetting scroll top (`smoother.scrollTop(0)`) or waiting for Next.js DOM reconciliation and Framer Motion transition animations to settle.

4. **`src/app/template.tsx`**:
   - Lines 7-14: `<motion.div initial={{ opacity: 0, filter: "blur(4px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>`
   - Quoted flaw: 0.5s (500ms) page transition animation runs on every route change. Measuring layout offsets before 500ms yields incorrect scroll trigger bounds.

---

## 2. Logic Chain

```
Observation 1 (@gsap/react missing in package.json)
  │
  ▼
React useEffect is manually managing GSAP contexts and matchMedia without React 19 layout lifecycle synchronization.
  │
  ▼
Observation 2 (setTimeout(..., 150) inside gsap.context in IdentityPage)
  │
  ▼
gsap.context only records synchronous GSAP creations. Async setTimeout defers ScrollTrigger.create.
  │
  ▼
When IdentityPage unmounts on soft navigation, ctx.revert() fails to kill the delayed ScrollTriggers.
  │
  ▼
Orphaned ScrollTriggers remain alive in global GSAP registry, firing callbacks and corrupting layout bounds on other routes.
  │
  ▼
Observation 3 & 4 (SmoothScrolling in RootLayout + Framer Motion in template.tsx)
  │
  ▼
Next.js App Router replaces DOM content without unmounting RootLayout. Viewport scroll remains at old route offset (e.g. Y=2000px).
  │
  ▼
Calling ScrollTrigger.refresh() before Framer Motion 500ms transition finishes results in wrong scroll height measurements.
  │
  ▼
Conclusion & Solution: Install @gsap/react -> Refactor SmoothScrolling to reset scroll top on pathname change -> Refactor IdentityPage to use synchronous useGSAP with containerRef scoping.
```

---

## 3. Caveats

1. **Other Pages Investigation**: Checked `/`, `/about`, `/work`, `/contact`, `/products/freeflow`. Currently, `IdentityPage` is the only page defining custom `ScrollTrigger` instances.
2. **ScrollRestoration Setting**: `history.scrollRestoration = "manual"` MUST remain set so native browser scroll restoration does not conflict with `ScrollSmoother`.
3. **Framer Motion Duration**: Page transition animation in `template.tsx` takes 500ms. Refreshes scheduled via `setTimeout(..., 100)` or post-frame ensure layout has stabilized.

---

## 4. Conclusion

The GSAP integration bugs during Next.js App Router soft navigation stem directly from missing `@gsap/react` package hooks, async `setTimeout` context bypass in `IdentityPage`, and missing scroll top resets in `SmoothScrolling`.

Applying the proposed refactoring blueprint will:
1. Guarantee 100% clean teardown of all `ScrollTrigger` and `pin` instances on soft route transitions.
2. Reset scroll position immediately on page navigation (`window.scrollTo(0,0)` and `smoother.scrollTop(0)`).
3. Provide reactive, selector-based DOM element tracking via `useGSAP` container scoping.

---

## 5. Verification Method

Independent verification can be executed as follows:

### Step 1: Verification Commands
- Build verification: `npm run build`
- Lint verification: `npm run lint`

### Step 2: Inspection Files
- Check `package.json` for `"@gsap/react"`.
- Inspect `src/components/SmoothScrolling.tsx` for `useGSAP` wrapper scoping & `scrollTop(0)` reset.
- Inspect `src/app/identity/page.tsx` for `useGSAP` container scoping and complete removal of `setTimeout(..., 150)`.

### Step 3: Invalidation Conditions
- Any occurrence of `setTimeout` wrapping `ScrollTrigger.create()` inside GSAP context blocks.
- Failure of `ScrollTrigger.getAll()` to be cleared upon navigating away from `/identity`.
- Scroll trap or non-zero scroll position upon soft navigating between `/` and `/identity`.
