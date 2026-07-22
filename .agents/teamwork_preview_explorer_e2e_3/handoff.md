# E2E Test Case Specification & Test Infrastructure Report

**Author**: Explorer 3 (E2E Testing Track, Milestone 1)  
**Working Directory**: `/Users/dhruvalbhinsara/SARIV-Website/.agents/teamwork_preview_explorer_e2e_3`  
**Target Project**: SARIV Website (GSAP ScrollTrigger Soft Navigation Fix)  
**Date**: 2026-07-22  

---

## 1. Observation

### 1.1 Problem Statement & Codebase Context
From `/Users/dhruvalbhinsara/SARIV-Website/.agents/ORIGINAL_REQUEST.md`, `/Users/dhruvalbhinsara/SARIV-Website/PROJECT.md`, and `/Users/dhruvalbhinsara/SARIV-Website/.agents/sub_orch_e2e/SCOPE.md`:
- **Core Bug**: In Next.js App Router, soft navigation to `/identity` fails to update the active state of `LineSidebar` during scroll unless a hard browser reload occurs.
- **Root Cause Area**: GSAP `ScrollTrigger` instances created inside `src/app/identity/page.tsx` (lines 81-121) and `ScrollSmoother` in `src/components/SmoothScrolling.tsx` (lines 14-35) rely on `useEffect` hooks and global GSAP plugin references without proper App Router lifecycle cleanup or `@gsap/react` (`useGSAP`) context scoping.
- **Key Requirements**:
  - Refactor GSAP integration to `@gsap/react` (`useGSAP` hook) in `IdentityPage` and `SmoothScrolling`.
  - Guarantee soft navigation from home (`/`) or any route to `/identity` activates scroll spy immediately.
  - Maintain `ScrollSmoother` compatibility across page transitions without layout breaking or scroll trapping.
  - Verify sticky sidebar pinning (`asideRef`) works seamlessly on soft navigation.

### 1.2 Identified Features (F1 - F5)
1. **F1: App Build & `@gsap/react` Package Integration** (`src/app/identity/page.tsx`, `package.json`).
2. **F2: Soft Navigation to `/identity`** (`src/components/Header.tsx`, `src/app/identity/page.tsx`).
3. **F3: Scroll Spy Tracking** (`LineSidebar` in `src/components/ui/LineSidebar.tsx`, `sectionRefs` in `src/app/identity/page.tsx`).
4. **F4: Multi-transition Navigation & Memory/Scroll Stability** (`src/components/SmoothScrolling.tsx`, route lifecycle).
5. **F5: Sticky Sidebar Pinning** (`asideRef`, `gsap.matchMedia`, `ScrollTrigger.create({ pin: asideRef.current, ... })`).

### 1.3 Target DOM Elements & Selectors
- **Sidebar Container**: `aside` containing `LineSidebar` (`asideRef` in `IdentityPage`, line 78).
- **Sidebar Navigation**: `nav.line-sidebar[aria-label="Section navigation"]` (`src/components/ui/LineSidebar.tsx`, line 169).
- **Sidebar List Items**: `ul.line-sidebar__list > li.line-sidebar__item` (line 176).
- **Active Sidebar Item Assertion**: `li.line-sidebar__item[aria-current="true"]` (line 182).
- **Identity Sections**:
  - `section#Overview` (Index 0)
  - `section#Logomark` (Index 1)
  - `section#Principles` (Index 2)
  - `section#Typography` (Index 3)
  - `section#Color` (Index 4)
  - `section#Geometry` (Index 5)
- **Smooth Scroll Wrappers**: `#smooth-wrapper` (line 38) and `#smooth-content` (line 39) in `SmoothScrolling.tsx`.
- **Navigation Trigger Links**: `a[href="/identity"]`, `a[href="/"]`, `a[href="/work"]`, `a[href="/contact"]`, `a[href="/start-project"]` in `Header.tsx`.

---

## 2. Logic Chain

1. **Requirement Mapping**: To validate the fix thoroughly without trusting unverified assumptions, an opaque-box E2E test suite must cover feature happy paths (Tier 1), edge cases (Tier 2), cross-feature interactions (Tier 3), and complete user journeys (Tier 4).
2. **Feature Coverage Strategy (Tier 1)**: Each of the 5 identified core features (F1-F5) requires at least 5 concrete test cases targeting exact DOM states, attributes (`aria-current="true"`), and GSAP trigger behaviors. Total Tier 1 tests: **27 tests**.
3. **Boundary & Corner Cases (Tier 2)**: Soft navigation bugs typically surface during fast scroll events, rapid page clicking, direct deep-linking, window resizing, and back/forward browser navigation. Designing test cases specifically exercising high velocity and lifecycle transitions prevents regression. Total Tier 2 tests: **25 tests**.
4. **Cross-Feature Combinations (Tier 3)**: Pairing features (e.g. soft nav + active scroll, window resize + sticky pin, multi-page loop + memory tracking) tests real system interaction boundaries. Total Tier 3 tests: **10 tests**.
5. **Real-World Application Scenarios (Tier 4)**: 5 end-to-end multi-step user flows ensure realistic user behavior is tested from initial landing through complex interaction loops. Total Tier 4 tests: **5 tests**.
6. **Infrastructure Blueprinting**: Defining explicit architecture for `TEST_INFRA.md` and `TEST_READY.md` provides clear instructions for downstream implementation and verification.

---

## 3. Caveats

1. **Scope Boundary**: This specification designs the complete test suite inventory and infrastructure blueprint. Actual test file implementation (`.spec.ts`) and test execution will be performed by the test implementer subagents and verified in Milestone 3.
2. **Environment Dependency**: E2E tests assume a running Next.js environment (e.g. `http://localhost:3000` via Playwright's `webServer` config or `npm run dev` / `next start`).
3. **GSAP Canvas / DOM Animations**: Assertions focus on DOM state, scroll offsets (`window.scrollY` / `ScrollSmoother.get().scrollTop()`), CSS classes/styles (`aria-current`, `pin-spacer`, position offsets), and clean event lifecycle behavior. Internal GSAP frame interpolations are tested via state transitions.
4. **No Direct Source Modification**: As an Explorer agent, no application source files (`src/`) were modified during this task.

---

## 4. Conclusion

A comprehensive **67-test 4-Tier Test Case Specification** has been designed to validate the GSAP ScrollTrigger soft navigation fix in the Next.js App Router. The inventory provides exact steps, target selectors, expected behavior, and assertions across all 4 tiers, accompanied by detailed blueprints for `TEST_INFRA.md` and `TEST_READY.md`.

---

## 5. Verification Method & Test Case Inventory Specification

### 5.1 Test Execution & Verification Framework
- **Runner**: Playwright (`@playwright/test`).
- **Target Command**: `npx playwright test` / `npm run test:e2e`.
- **Target URL**: `http://localhost:3000`.

---

### 5.2 Complete Test Inventory Specification

#### Tier 1: Feature Coverage Specifications (27 Tests)

##### Feature F1: App Build & `@gsap/react` Integration (5 Tests)
- **`T1-F1-01`**: **Next.js Production Build Validation**
  - *Description*: Verify `npm run build` completes successfully with zero TypeScript, bundling, or module resolution errors.
  - *Steps*: Execute `npm run build` via sub-process runner.
  - *Assertions*: Exit code is 0; build stdout contains no missing export or `@gsap/react` import errors.
- **`T1-F1-02`**: **Client Hydration of `useGSAP` Scoped Components**
  - *Description*: Verify `/identity` renders without React hydration error warnings or console exceptions.
  - *Steps*: Navigate directly to `/identity`; monitor console errors.
  - *Assertions*: Zero console errors; `ul.line-sidebar__list` and section elements hydratable and present in DOM.
- **`T1-F1-03`**: **GSAP ScrollTrigger & ScrollSmoother Registration Verification**
  - *Description*: Ensure `ScrollTrigger` and `ScrollSmoother` plugins register cleanly on window context.
  - *Steps*: Inspect `window.gsap` / global GSAP registry upon load.
  - *Assertions*: `ScrollTrigger` instance exists; `ScrollSmoother.get()` returns active instance after mount.
- **`T1-F1-04`**: **Scoped Context Cleanup Setup (`useGSAP` Context)**
  - *Description*: Confirm GSAP triggers in `IdentityPage` are scoped within container ref (`columnRef` / `asideRef`).
  - *Steps*: Inspect active triggers on mount; verify trigger parent scope is attached to page root.
  - *Assertions*: `ScrollTrigger.getAll()` scope matches container node; cleanup unbinds triggers on route unmount.
- **`T1-F1-05`**: **`@gsap/react` Export & Hook Usage Verification**
  - *Description*: Ensure `useGSAP` hook handles lifecycle cleanup automatically.
  - *Steps*: Mount component, trigger unmount via route change, check active trigger count.
  - *Assertions*: Trigger array length drops to 0 or base smooth scroll trigger count upon navigating away from `/identity`.

##### Feature F2: Soft Navigation to `/identity` (5 Tests)
- **`T1-F2-01`**: **Soft Navigation Home -> Identity Active State Initialization**
  - *Description*: Navigate from `/` to `/identity` via header link; verify sidebar activates section 0 immediately.
  - *Steps*: Open `/`, click header link `a[href="/identity"]`, wait for path `/identity`.
  - *Assertions*: URL is `/identity`; `li.line-sidebar__item:nth-child(1)` has `aria-current="true"`.
- **`T1-F2-02`**: **Soft Navigation Work -> Identity ScrollTrigger Binding**
  - *Description*: Navigate from `/work` to `/identity` without page reload; verify ScrollTrigger recalculates bounds.
  - *Steps*: Open `/work`, click `a[href="/identity"]`.
  - *Assertions*: `ScrollTrigger.getAll().length` > 0; section triggers active without forcing hard refresh.
- **`T1-F2-03`**: **Soft Navigation Contact -> Identity Offset Precision**
  - *Description*: Navigate from `/contact` to `/identity`; verify section element offset calculation.
  - *Steps*: Open `/contact`, soft navigate to `/identity`, inspect trigger start values.
  - *Assertions*: `ScrollTrigger` start values correspond to `#Overview`, `#Logomark`, `#Principles`, `#Typography`, `#Color`, `#Geometry` top coordinates.
- **`T1-F2-04`**: **ScrollTrigger Refresh Execution on Soft Arrival**
  - *Description*: Verify `ScrollTrigger.refresh()` fires after soft route transition completes.
  - *Steps*: Listen for `ScrollTrigger` refresh event on soft navigation.
  - *Assertions*: Refresh callback is triggered within 200ms of route change.
- **`T1-F2-05`**: **Scroll Reset to Top on Soft Arrival**
  - *Description*: Ensure soft navigation to `/identity` resets scroll position to top prior to trigger binding.
  - *Steps*: Scroll `/` down 500px, click `a[href="/identity"]`.
  - *Assertions*: `window.scrollY` or `ScrollSmoother.get().scrollTop()` is 0 upon page load; section 0 active.

##### Feature F3: Scroll Spy Tracking (7 Tests)
- **`T1-F3-01`**: **Section 0 -> Section 1 Spy Transition**
  - *Description*: Scroll down from Overview to Logomark; verify active item updates to index 1.
  - *Steps*: Soft navigate to `/identity`, scroll down until `#Logomark` reaches `SPY_THRESHOLD` (160px).
  - *Assertions*: `li.line-sidebar__item:nth-child(1)` `aria-current` is `undefined`; `li.line-sidebar__item:nth-child(2)` has `aria-current="true"`.
- **`T1-F3-02`**: **Section 1 -> Section 2 (Principles) Spy Transition**
  - *Description*: Continue scroll to `#Principles`; verify index 2 becomes active.
  - *Steps*: Scroll further down until `#Principles` passes `SPY_THRESHOLD`.
  - *Assertions*: `li.line-sidebar__item:nth-child(3)` has `aria-current="true"`.
- **`T1-F3-03`**: **Section 2 -> Section 3 (Typography) Spy Transition**
  - *Description*: Continue scroll to `#Typography`; verify index 3 becomes active.
  - *Steps*: Scroll down to `#Typography`.
  - *Assertions*: `li.line-sidebar__item:nth-child(4)` has `aria-current="true"`.
- **`T1-F3-04`**: **Section 3 -> Section 4 (Color) Spy Transition**
  - *Description*: Continue scroll to `#Color`; verify index 4 becomes active.
  - *Steps*: Scroll down to `#Color`.
  - *Assertions*: `li.line-sidebar__item:nth-child(5)` has `aria-current="true"`.
- **`T1-F3-05`**: **Section 4 -> Section 5 (Geometry) Spy Transition**
  - *Description*: Continue scroll to `#Geometry`; verify index 5 becomes active.
  - *Steps*: Scroll down to `#Geometry`.
  - *Assertions*: `li.line-sidebar__item:nth-child(6)` has `aria-current="true"`.
- **`T1-F3-06`**: **Reverse Upward Scroll Spy Tracking**
  - *Description*: Scroll up from Geometry back to Overview; verify `onEnterBack` callbacks update active state in reverse.
  - *Steps*: Scroll from bottom of `/identity` to top continuously.
  - *Assertions*: Active index updates cleanly 5 -> 4 -> 3 -> 2 -> 1 -> 0 without skipping items.
- **`T1-F3-07`**: **Sidebar Item Click Scroll Spy Sync**
  - *Description*: Click section item in `LineSidebar`; verify smooth scroll aligns with active index state.
  - *Steps*: Click `li.line-sidebar__item:nth-child(4)` ("Typography").
  - *Assertions*: Scroll position smooth scrolls to `#Typography`; active index stays set to 3.

##### Feature F4: Multi-Transition & Stability (5 Tests)
- **`T1-F4-01`**: **No Orphaned Triggers Across 5 Navigation Cycles**
  - *Description*: Soft navigate `/` -> `/identity` 5 times sequentially; verify total active `ScrollTrigger` instances stay stable.
  - *Steps*: Perform 5 rapid route transitions between `/` and `/identity`.
  - *Assertions*: Total count of triggers after 5th arrival equals initial trigger count (no duplicate trigger leak).
- **`T1-F4-02`**: **Scroll Lock Prevention Post Multi-Transition**
  - *Description*: Soft navigate 3 times between pages, then attempt scrolling.
  - *Steps*: Navigate `/` -> `/identity` -> `/` -> `/identity`, then issue mousewheel scroll.
  - *Assertions*: Page scrolls smoothly; `#smooth-content` transform updates freely without scroll freeze.
- **`T1-F4-03`**: **Memory & Listener Cleanup Verification**
  - *Description*: Navigate away from `/identity`; verify `useGSAP` / `ScrollTrigger` listeners are removed.
  - *Steps*: Open `/identity`, check trigger count, navigate to `/work`.
  - *Assertions*: `IdentityPage` section triggers are fully killed / reverted; no memory leak or detached event listeners.
- **`T1-F4-04`**: **No Duplicate `onEnter` Firing**
  - *Description*: Ensure `ScrollTrigger` callbacks do not execute twice per scroll event after soft nav.
  - *Steps*: Add spy to `setActiveIndex` callback; scroll through section.
  - *Assertions*: `setActiveIndex` fires exactly once per section boundary cross.
- **`T1-F4-05`**: **`SmoothScrolling` Wrapper DOM Integrity**
  - *Description*: Verify `#smooth-wrapper` and `#smooth-content` remain properly nested and uncorrupted during soft routing.
  - *Steps*: Inspect DOM tree before and after soft navigation.
  - *Assertions*: `#smooth-wrapper` contains `#smooth-content` containing active page content.

##### Feature F5: Sticky Sidebar Pinning (5 Tests)
- **`T1-F5-01`**: **Desktop Sidebar Pin Activation at Threshold (160px)**
  - *Description*: Scroll past 160px on desktop (≥1024px); verify `asideRef` pins in place.
  - *Steps*: Set viewport 1280x800, soft navigate to `/identity`, scroll down 200px.
  - *Assertions*: `aside` element is pinned (has position fixed or pin-spacer wrapper attached by GSAP).
- **`T1-F5-02`**: **Sidebar Unpin at Column Bottom Boundary**
  - *Description*: Scroll to the end of section column (`end: "bottom bottom"`); verify sidebar stops pinning at bottom.
  - *Steps*: Scroll to bottom of `/identity`.
  - *Assertions*: Sidebar unpins cleanly and remains within column boundary without overflowing footer.
- **`T1-F5-03`**: **Soft Navigation Pin Calculation Match**
  - *Description*: Verify pin start (`top 160`) and end coordinates match on soft nav vs hard load.
  - *Steps*: Compare pin start/end positions between hard load `/identity` and soft load `/` -> `/identity`.
  - *Assertions*: Pin bounds are identical (±1px variance).
- **`T1-F5-04`**: **Pin Parity Hard Reload vs Soft Navigation**
  - *Description*: Scroll mid-page on soft nav vs hard reload and measure `asideRef` computed style.
  - *Steps*: Measure `aside` fixed top offset on both load types.
  - *Assertions*: Offsets match exactly (160px top clearance).
- **`T1-F5-05`**: **Smooth Scroll Jump Pin Stability**
  - *Description*: Click sidebar item while scrolled to top; verify pin state remains stable during rapid scroll animation.
  - *Steps*: Click "Geometry" item from top of page.
  - *Assertions*: Sidebar pins smoothly during target jump and unpins correctly at bottom.

---

#### Tier 2: Boundary & Corner Case Specifications (25 Tests)

##### Fast & Aggressive Scrolling (5 Tests)
- **`T2-BS-01`**: **High-Velocity Wheel Fling (3000px in 150ms)**
  - *Description*: Simulate ultra-fast scroll wheel input from top to bottom.
  - *Steps*: Dispatch fast scroll wheel events down to 3000px.
  - *Assertions*: `LineSidebar` active item updates to index 5 ("Geometry") without throwing animation errors.
- **`T2-BS-02`**: **Instant Scroll Jump via `window.scrollTo(0, 2500)`**
  - *Description*: Programmatically set scroll position instantly.
  - *Steps*: Call `window.scrollTo(0, 2500)` or `ScrollSmoother.get().scrollTo(2500)`.
  - *Assertions*: Active index updates immediately to section corresponding to Y=2500.
- **`T2-BS-03`**: **Rapid Direction Reversal (Zig-Zag Scroll)**
  - *Description*: Rapidly scroll down 600px, up 400px, down 800px within 300ms.
  - *Steps*: Dispatch back-and-forth scroll events in rapid succession.
  - *Assertions*: Active index settles precisely on section matching final resting position.
- **`T2-BS-04`**: **Bottom Rubber-Band Overscroll Handling**
  - *Description*: Scroll past maximum scrollable height (overscroll).
  - *Steps*: Scroll to bottom and trigger excess downward scroll delta.
  - *Assertions*: Active index remains 5 ("Geometry"); no runtime crash or out-of-bounds index error.
- **`T2-BS-05`**: **Fast Scroll During Section Entry Animations**
  - *Description*: Scroll fast while section CSS animations (`animate-fade-up`) are running.
  - *Steps*: Fast scroll immediately upon arriving at `/identity`.
  - *Assertions*: Trigger offsets remain accurate; animation delays do not corrupt scroll spy bounds.

##### Rapid Navigation Toggling (5 Tests)
- **`T2-RN-01`**: **5x Navigation Link Clicking (<1s)**
  - *Description*: Click `a[href="/identity"]` 5 times in rapid succession.
  - *Steps*: Click header link 5 times in 800ms.
  - *Assertions*: No duplicate React key warnings; single clean `useGSAP` state maintained.
- **`T2-RN-02`**: **Rapid Inter-Route Cycling (`/` -> `/identity` -> `/work` -> `/identity`)**
  - *Description*: Rapidly switch between 3 routes in <1.5s.
  - *Steps*: Execute soft navigations across 3 pages in fast sequence.
  - *Assertions*: Page loads `/identity` cleanly on final step with fully functioning scroll spy.
- **`T2-RN-03`**: **Aborted Navigation Mid-Transition**
  - *Description*: Trigger soft navigation to `/identity` and immediately click `/` before render completes.
  - *Steps*: Click `/identity` then click home link within 50ms.
  - *Assertions*: Application settles on `/` without orphan `ScrollTrigger` instances from abandoned route.
- **`T2-RN-04`**: **Rapid Sidebar Item Multi-Click**
  - *Description*: Rapidly click Overview -> Geometry -> Principles in <400ms.
  - *Steps*: Click item 0, item 5, item 2 in fast succession.
  - *Assertions*: Scroll position animates to final clicked target (#Principles); active index is 2.
- **`T2-RN-05`**: **Rapid Browser Back/Forward Button Stress**
  - *Description*: Perform 5 rapid browser `history.back()` / `history.forward()` actions.
  - *Steps*: Navigate between `/` and `/identity`, then issue 5 history actions in 1s.
  - *Assertions*: Router stays stable; `ScrollSmoother` recovers active viewport position cleanly.

##### Direct Deep-Linking (5 Tests)
- **`T2-DL-01`**: **Hard Reload Direct Visit to `/identity`**
  - *Description*: Open browser directly at `http://localhost:3000/identity` (hard load).
  - *Steps*: Perform browser navigate (hard reload) to `/identity`.
  - *Assertions*: Sidebar active index is 0; sticky pin binds cleanly.
- **`T2-DL-02`**: **Direct Deep Link with Section Anchor `/identity#Typography`**
  - *Description*: Direct load to URL containing hash fragment `#Typography`.
  - *Steps*: Navigate directly to `/identity#Typography`.
  - *Assertions*: Page auto-scrolls to `#Typography`; `LineSidebar` index 3 is active (`aria-current="true"`).
- **`T2-DL-03`**: **Direct Load with Query Strings `/identity?ref=campaign`**
  - *Description*: Direct load to `/identity` with URL query parameters.
  - *Steps*: Navigate to `/identity?test=123`.
  - *Assertions*: Query params preserved; GSAP initialization completely unaffected.
- **`T2-DL-04`**: **Direct Load under Throttled CPU / Slow Connection**
  - *Description*: Simulate 4x CPU throttling and 3G network speed on hard reload.
  - *Steps*: Enable throttling in browser context; load `/identity`.
  - *Assertions*: `ScrollTrigger.refresh()` executes after delayed DOM layout settles; spy functions correctly.
- **`T2-DL-05`**: **Deep Link vs Soft Nav DOM Parity Verification**
  - *Description*: Compare computed styles, pin boundaries, and DOM structure of hard load vs soft nav.
  - *Steps*: Snapshot DOM metrics on hard load and soft nav.
  - *Assertions*: 100% attribute and geometry parity.

##### Window Resizing During Scroll & Pinning (5 Tests)
- **`T2-WR-01`**: **Desktop Width Expansion (1200px -> 1920px) While Pinned**
  - *Description*: Resize browser window width while sidebar is actively pinned.
  - *Steps*: Scroll down to pin sidebar at 1200px width; expand window to 1920px.
  - *Assertions*: Pin left offset and container width recalculate automatically.
- **`T2-WR-02`**: **Viewport Height Contraction (800px -> 500px) During Active Scroll**
  - *Description*: Resize height while mid-page on `/identity`.
  - *Steps*: Scroll to section 2; resize window height to 500px.
  - *Assertions*: `SPY_THRESHOLD` trigger offsets update; active item tracking remains aligned with visible section.
- **`T2-WR-03`**: **Desktop to Mobile Breakpoint Collapse (1200px -> 768px)**
  - *Description*: Resize from desktop to mobile width (<1024px).
  - *Steps*: Scroll down to pin sidebar at 1200px width; resize viewport to 768px.
  - *Assertions*: Sidebar hides via `hidden lg:block`; GSAP matchMedia kills pin trigger; page layout flows naturally.
- **`T2-WR-04`**: **Mobile to Desktop Breakpoint Expansion (768px -> 1200px)**
  - *Description*: Resize from mobile width to desktop width while mid-page.
  - *Steps*: Load at 768px width, scroll down 500px, resize viewport to 1200px width.
  - *Assertions*: Sidebar becomes visible; `matchMedia` re-initializes pinning and binds active section.
- **`T2-WR-05`**: **Window Resize During Active Smooth Scroll Animation**
  - *Description*: Trigger window resize event while `scrollToSection` smooth scroll animation is running.
  - *Steps*: Click sidebar item "Color"; issue window resize during scroll animation.
  - *Assertions*: Animation finishes cleanly or adjusts target smoothly without JS exception.

##### Scroll Restoration & Viewport Extremes (5 Tests)
- **`T2-VE-01`**: **Browser Back Button Scroll Position Restoration**
  - *Description*: Navigate `/identity` -> `/work` -> click browser Back button.
  - *Steps*: Scroll `/identity` to section 3, click link to `/work`, click browser Back button.
  - *Assertions*: `history.scrollRestoration = "manual"` prevents native vs GSAP scroll conflict; page restores cleanly with matching active sidebar item.
- **`T2-VE-02`**: **Ultra-Short Viewport Extreme (1280x360px)**
  - *Description*: Test scroll spy tracking in ultra-short viewport window.
  - *Steps*: Set viewport height to 360px; scroll through sections.
  - *Assertions*: Active sections trigger accurately as headings cross 160px threshold.
- **`T2-VE-03`**: **Ultra-Tall Viewport Extreme (1280x2100px)**
  - *Description*: Test scroll spy and pinning when viewport height exceeds content height.
  - *Steps*: Set viewport height to 2100px.
  - *Assertions*: Pinning logic handles short scroll boundaries gracefully without stuck fixed positioning.
- **`T2-VE-04`**: **Touch Pointer Event Emulation on `LineSidebar`**
  - *Description*: Test sidebar hover and click behaviors under touch pointer events.
  - *Steps*: Emulate touch screen pointer events on `ul.line-sidebar__list`.
  - *Assertions*: `handlePointerMove` / `handlePointerLeave` loops handle touch coordinates smoothly.
- **`T2-VE-05`**: **Browser Zoom Scaling (150% Zoom)**
  - *Description*: Change browser device pixel ratio / zoom to 150%.
  - *Steps*: Set page zoom factor to 1.5; scroll down `/identity`.
  - *Assertions*: Trigger threshold offsets scale proportionally; correct active index highlights.

---

#### Tier 3: Cross-Feature Combination Specifications (10 Tests)

- **`T3-CF-01`**: **Soft Navigation During Active Smooth Scroll**
  - *Description*: Trigger sidebar smooth scroll to `#Geometry`, then immediately soft navigate to `/` mid-scroll.
  - *Steps*: Click "Geometry", wait 100ms, click `a[href="/"]`.
  - *Assertions*: Navigation completes to `/`; scroll position resets to top; returning to `/identity` starts clean at section 0.
- **`T3-CF-02`**: **Rapid Navigation Cycling + Immediate Sticky Pin Check**
  - *Description*: Soft navigate `/` -> `/identity` 3 times in 1s, then immediately scroll down 300px.
  - *Steps*: Perform rapid route toggling, then scroll down past 160px threshold.
  - *Assertions*: Sidebar pins smoothly at 160px from top without visual jump or offset error.
- **`T3-CF-03`**: **Window Resize + Soft Navigation Intersect**
  - *Description*: Soft navigate to `/identity`, resize to mobile (768px), soft navigate to `/work`, soft navigate back to `/identity`, resize to desktop (1280px).
  - *Steps*: Execute multi-step resize and route transition sequence.
  - *Assertions*: GSAP `matchMedia` re-binds pin and scroll spy triggers seamlessly on final step.
- **`T3-CF-04`**: **Deep Link + Fast Scroll + Soft Navigation Back**
  - *Description*: Direct deep link to `/identity#Color`, fast scroll up to top, soft navigate to `/contact`, soft navigate back to `/identity`.
  - *Steps*: Execute sequence; inspect final active state.
  - *Assertions*: Initial deep link activates index 4 ("Color"); returning via soft nav activates index 0 ("Overview").
- **`T3-CF-05`**: **Sidebar Item Jump + Soft Nav + Browser Back Restoration**
  - *Description*: Click "Typography" item in `LineSidebar`, soft navigate to `/`, click browser Back button.
  - *Steps*: Click item 3, navigate away, hit Back button.
  - *Assertions*: Page restores cleanly; active index highlights section corresponding to restored scroll position.
- **`T3-CF-06`**: **Multi-Page Loop Memory & Trigger Array Profiling**
  - *Description*: Loop `/` -> `/work` -> `/identity` -> `/contact` 10 full cycles while recording `ScrollTrigger.getAll().length`.
  - *Steps*: Programmatic navigation loop 10x; sample trigger count on each `/identity` arrival and departure.
  - *Assertions*: Trigger count on `/identity` is strictly constant across all 10 arrivals; 0 leaked triggers on departures.
- **`T3-CF-07`**: **Sticky Pinning + Scroll Spy + High Velocity Wheel**
  - *Description*: Fast scroll while sidebar is pinned.
  - *Steps*: Scroll down to pin sidebar, then fling scroll wheel.
  - *Assertions*: Sidebar remains pinned while `LineSidebar` active item indicator smoothly scrolls through items 1 to 5.
- **`T3-CF-08`**: **Breakpoint Cross + Sidebar Item Click Persistence**
  - *Description*: Resize to desktop, click "Principles" (index 2), resize to mobile, resize back to desktop.
  - *Steps*: Click item 2, change viewport to 768px, change viewport to 1280px.
  - *Assertions*: `LineSidebar` active index remains 2; section `#Principles` remains in view.
- **`T3-CF-09`**: **`SmoothScrolling` RAF Refresh Sync with `useGSAP` Setup**
  - *Description*: Verify `requestAnimationFrame(() => ScrollTrigger.refresh())` in `SmoothScrolling.tsx` runs after `IdentityPage` `useGSAP` setup completes.
  - *Steps*: Trace execution order of RAF refresh and section trigger creation.
  - *Assertions*: Refresh executes after section triggers are registered, preventing stale height bounds.
- **`T3-CF-10`**: **Header Scroll State (`isScrolled`) + Identity Sidebar Pin State Sync**
  - *Description*: Verify fixed header backdrop blur transition (triggered at 20px) operates in harmony with sidebar pin (triggered at 160px).
  - *Steps*: Scroll slowly from 0px to 200px.
  - *Assertions*: At Y>20px header acquires backdrop blur; at Y>160px sidebar pins; no visual overlap or z-index collisions (header z-index 10000 vs sidebar).

---

#### Tier 4: Real-World Application Scenario Specifications (5 Tests)

- **`T4-RW-01`**: **Full User Exploration Journey**
  - *Description*: Full multi-section exploration and returning navigation.
  - *Steps*:
    1. Start at Home page `/`.
    2. Click "Identity" in header navigation.
    3. Verify arrival at `/identity` with section 0 ("Overview") active.
    4. Scroll down sequentially through Overview, Logomark, Principles, Typography, Color, Geometry.
    5. Verify each section's corresponding sidebar item lights up with `aria-current="true"`.
    6. Click "SARIV" brand logo in header to soft navigate back to `/`.
    7. Click "Identity" in header to return to `/identity`.
  - *Assertions*: All 6 section transitions verified; soft return to `/identity` starts clean at section 0 with active scroll spy.
- **`T4-RW-02`**: **Interactive Section Jump & Form Navigation Journey**
  - *Description*: Sidebar item jumps, project flow navigation, and back button return.
  - *Steps*:
    1. Direct load to `/identity`.
    2. Click "Color" in `LineSidebar` -> smooth scrolls to `#Color` (index 4).
    3. Click "Principles" in `LineSidebar` -> smooth scrolls up to `#Principles` (index 2).
    4. Click "Start Project" button in header -> soft navigates to `/start-project`.
    5. Click browser Back button to return to `/identity`.
  - *Assertions*: Jumps perform smooth scroll; return via Back button restores active page state without scroll trap.
- **`T4-RW-03`**: **Responsive Mobile-to-Desktop Workflow Journey**
  - *Description*: User begins on mobile device, rotates or resizes to desktop screen, and continues browsing.
  - *Steps*:
    1. Open `/identity` at mobile viewport (375x812).
    2. Verify `LineSidebar` is hidden (`hidden lg:block`).
    3. Scroll down 800px through content sections.
    4. Resize viewport to desktop width (1440x900).
    5. Verify `LineSidebar` becomes visible, pins immediately, and highlights the currently visible section.
    6. Soft navigate to `/work` and back to `/identity`.
  - *Assertions*: Breakpoint transition auto-adapts sidebar state and preserves full scroll spy functionality.
- **`T4-RW-04`**: **High-Stress Rapid Navigation & Heavy Scroll Journey**
  - *Description*: Stress test app router and GSAP memory stability under aggressive usage patterns.
  - *Steps*:
    1. Perform 10 rapid route navigations between `/` and `/identity`.
    2. Perform 5 continuous fast scroll flings up and down `/identity`.
    3. Click 4 different `LineSidebar` items in rapid sequence.
  - *Assertions*: Zero console errors or unhandled promises; frame rate remains stable; active sidebar item accurately reflects final resting section.
- **`T4-RW-05`**: **Deep Link Direct Entry & Section Jump Journey**
  - *Description*: User enters site via external deep link directly to a specific section, then explores other sections.
  - *Steps*:
    1. Open site at `/identity#Typography`.
    2. Verify initial viewport aligns with `#Typography` and index 3 is active.
    3. Click "Logomark" (index 1) in sidebar -> smooth scrolls up to `#Logomark`.
    4. Soft navigate to `/` and click "Identity" header link.
  - *Assertions*: Direct hash deep link resolves correctly on cold start; soft navigation away and back resets cleanly to section 0.

---

### 5.3 `TEST_INFRA.md` Structural Blueprint

```markdown
# E2E Test Infrastructure & Testing Architecture (`TEST_INFRA.md`)

## 1. Testing Philosophy
- **Opaque-Box E2E Testing**: Tests treat the Next.js App Router application as a black box running via HTTP.
- **Requirement-Driven**: Every test case directly maps to specific functional requirements (R1, R2, R3) and acceptance criteria.
- **Zero Mocking of Navigation/GSAP**: Tests interact with live DOM elements, true window scroll events, and genuine App Router soft transitions.

## 2. Directory Structure
```
e2e/
├── config/
│   └── playwright.config.ts      # Playwright configuration (webServer, viewports, browsers)
├── helpers/
│   ├── scroll-helpers.ts          # Helpers for programmatic wheel events & ScrollSmoother assertions
│   ├── navigation-helpers.ts      # Helpers for soft routing & browser back/forward buttons
│   └── dom-assertions.ts          # Custom assertions for line-sidebar active state & pins
├── specs/
│   ├── tier1-feature-coverage/
│   │   ├── F1-build-integration.spec.ts
│   │   ├── F2-soft-navigation.spec.ts
│   │   ├── F3-scroll-spy.spec.ts
│   │   ├── F4-multi-transition.spec.ts
│   │   └── F5-sticky-pinning.spec.ts
│   ├── tier2-boundary-corner/
│   │   ├── fast-scrolling.spec.ts
│   │   ├── rapid-navigation.spec.ts
│   │   ├── deep-linking.spec.ts
│   │   ├── window-resizing.spec.ts
│   │   └── scroll-restoration.spec.ts
│   ├── tier3-cross-feature/
│   │   └── cross-feature-combinations.spec.ts
│   └── tier4-real-world/
│       └── user-journeys.spec.ts
```

## 3. Playwright Configuration (`playwright.config.ts`)
- `webServer`: `{ command: 'npm run dev', port: 3000, reuseExistingServer: true }`
- `use`: `{ baseURL: 'http://localhost:3000', trace: 'on-first-retry', screenshot: 'only-on-failure' }`
- `projects`: Desktop Chrome (1280x800), Desktop Firefox (1280x800), Mobile Chrome (375x812).

## 4. Helper Utilities Specifications
- `getSidebarActiveIndex(page)`: Evaluates `page.locator('li.line-sidebar__item[aria-current="true"]')` and returns item index.
- `scrollToSection(page, sectionId)`: Dispatches smooth scroll or locator click to target section.
- `countActiveScrollTriggers(page)`: Evaluates `window.ScrollTrigger.getAll().length` inside browser context.
- `isSidebarPinned(page)`: Checks if `aside` or `.pin-spacer` has fixed positioning styles active.

## 5. Feature & Tier Matrix
| Feature | Tier 1 (Coverage) | Tier 2 (Boundary) | Tier 3 (Cross) | Tier 4 (Journeys) | Total Tests |
|---|---|---|---|---|---|
| F1: App Build & `@gsap/react` | 5 | — | 1 | — | 6 |
| F2: Soft Navigation | 5 | 5 | 3 | 2 | 15 |
| F3: Scroll Spy Tracking | 7 | 5 | 3 | 2 | 17 |
| F4: Multi-transition & Memory | 5 | 5 | 2 | 1 | 13 |
| F5: Sticky Sidebar Pinning | 5 | 5 | 2 | 1 | 13 |
| **Total** | **27** | **25** | **10** | **5** | **67** |
```

---

### 5.4 `TEST_READY.md` Structural Blueprint

```markdown
# Test Readiness Signal (`TEST_READY.md`)

**Status**: READY FOR IMPLEMENTATION & VERIFICATION  
**Milestone**: Milestone 1 (E2E Testing Track)  
**Target Project**: SARIV Website (GSAP ScrollTrigger Soft Navigation Fix)  

## Execution Summary
The E2E test case specification for the GSAP ScrollTrigger soft navigation fix has been fully designed and structured across 4 distinct testing tiers.

## Quick Execution Commands
```bash
# Run full E2E test suite (Tiers 1-4)
npm run test:e2e

# Run specific tier test specs
npx playwright test e2e/specs/tier1-feature-coverage/
npx playwright test e2e/specs/tier2-boundary-corner/
npx playwright test e2e/specs/tier3-cross-feature/
npx playwright test e2e/specs/tier4-real-world/
```

## Environment Requirements
- Node.js >= 18.x
- Next.js development server running on `http://localhost:3000` (or started automatically by Playwright).

## Pass / Fail Criteria
- **100% Pass Rate** required across all 67 test cases in Tiers 1-4.
- Zero uncaught console exceptions or GSAP memory leak warnings.
- All 5 core acceptance criteria (F1-F5) verified.
```

---

## 6. Summary of Deliverables & Next Steps

1. **Test Specification Written**: Saved to `/Users/dhruvalbhinsara/SARIV-Website/.agents/teamwork_preview_explorer_e2e_3/handoff.md`.
2. **Infrastructure Blueprints Complete**: `TEST_INFRA.md` and `TEST_READY.md` blueprints specified.
3. **Parent Notification**: Handoff report and summary communicated to parent agent (`899e7d4e-60de-4b0d-91bb-ba5a9a0537c3`).
