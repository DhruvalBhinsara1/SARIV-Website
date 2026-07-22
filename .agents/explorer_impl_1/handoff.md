# Handoff Report — Explorer 1 (Implementation Track)

## 1. Observation
- **Missing Package**: `/Users/dhruvalbhinsara/SARIV-Website/package.json` line 29 contains `"gsap": "^3.15.0"`, but `@gsap/react` is absent from dependencies.
- **Scroller Lifecycle (`src/components/SmoothScrolling.tsx`)**:
  - Lines 14–28: `ScrollSmoother.create()` initialized inside `useEffect([], ...)` on initial mount only.
  - Lines 30–35: `useEffect([pathname])` executes `requestAnimationFrame(() => ScrollTrigger.refresh())`, but scroll position is not reset on soft navigation.
- **Async Context Leak & Pinning (`src/app/identity/page.tsx`)**:
  - Lines 81–96: `useEffect([], ...)` creates `gsap.matchMedia()` pinning `asideRef` to `columnRef` before `ScrollSmoother` recalculates route content dimensions.
  - Lines 100–122: `useEffect([], ...)` uses `gsap.context()` with an inner `setTimeout(..., 150)` creating section spy `ScrollTrigger` instances. In GSAP, instances created inside `setTimeout` escape `ctx.revert()`, leaving orphaned triggers in `ScrollTrigger.getAll()` across soft navigations.
- **Sidebar Controlled Prop (`src/components/ui/LineSidebar.tsx`)**:
  - Lines 72–75: `LineSidebar` listens to `controlledActive` (`activeIndex`). Unfired or orphaned triggers prevent `setActiveIndex` updates in `IdentityPage`, freezing `LineSidebar` on section 0.

## 2. Logic Chain
1. `SmoothScrolling` remains mounted during Next.js soft navigation while `#smooth-content` inner DOM changes.
2. In `IdentityPage`, raw `useEffect` hooks run synchronously on mount. Pinning triggers evaluate coordinates against stale `ScrollSmoother` height calculations (Obs: `IdentityPage:81-96`).
3. Section spy triggers are instantiated inside `setTimeout(..., 150)` (Obs: `IdentityPage:100-122`). Because `setTimeout` callbacks execute asynchronously outside the initial `gsap.context()` execution block, `ctx.revert()` fails to clean up these triggers when navigating away.
4. On soft navigating back to `/identity`, orphaned triggers conflict with newly mounted triggers in GSAP's global registry `ScrollTrigger.getAll()`.
5. Because trigger bounds are misaligned or orphaned, `setActiveIndex` is never invoked on scroll, causing `LineSidebar` active state tracking to freeze (Obs: `LineSidebar:72-75`).
6. Installing `@gsap/react` and refactoring `SmoothScrolling.tsx` and `IdentityPage.tsx` using `useGSAP` with scoped container refs (`scope: containerRef`) guarantees automatic revert, correct scroller height calculation, and proper soft navigation handling.

## 3. Caveats
- `@gsap/react` must be installed (`npm install @gsap/react`).
- `ScrollSmoother` must be available in GSAP build.
- Route transition animation delays (if added in future) may require calling `ScrollTrigger.refresh()` after animations complete.

## 4. Conclusion
The soft navigation bugs on `/identity` are caused by:
1. Stale `ScrollSmoother` scroll bounds and missing scroll-top resets in `SmoothScrolling.tsx`.
2. Async context leaks (`setTimeout`) in `IdentityPage.tsx` escaping `gsap.context()` revert.
3. Lack of `@gsap/react` (`useGSAP`) component ref scoping.

Full refactoring plan is documented in `.agents/explorer_impl_1/analysis.md`.

## 5. Verification Method
1. Install `@gsap/react`: `npm install @gsap/react`.
2. Run build check: `npm run build`.
3. Start dev server (`npm run dev`) and test soft navigation from `/` (scrolled 500px) to `/identity`.
4. Inspect `ScrollTrigger.getAll()` in browser console to confirm zero orphaned triggers.
5. Scroll down `/identity` to verify `asideRef` sticky pinning at `top 160` and `LineSidebar` active section highlighting (00-05).
