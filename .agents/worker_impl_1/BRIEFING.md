# BRIEFING — 2026-07-22T14:07:40Z

## Mission
Refactor SmoothScrolling and Identity Page to use @gsap/react useGSAP hook with proper ScrollTrigger & ScrollSmoother integration, ensuring clean builds and linting.

## 🔒 My Identity
- Archetype: implementer/qa/specialist
- Roles: implementer, qa, specialist
- Working directory: /Users/dhruvalbhinsara/SARIV-Website/.agents/worker_impl_1
- Original parent: 350018c1-02db-4793-a9b2-7149e582a109
- Milestone: Milestone 2 - Implementation

## 🔒 Key Constraints
- Install `@gsap/react` package via `npm install @gsap/react`.
- Refactor `src/components/SmoothScrolling.tsx` and `src/app/identity/page.tsx` using `@gsap/react` (`useGSAP`).
- Do not use `setTimeout` hack for ScrollTrigger initialization/refresh in `identity/page.tsx`.
- Ensure clean build (`npm run build`) and clean linting (`npm run lint`).
- Genuine implementation with no hardcoded test shortcuts or dummy facades.

## Current Parent
- Conversation ID: 350018c1-02db-4793-a9b2-7149e582a109
- Updated: 2026-07-22T14:07:40Z

## Task Summary
- **What to build**: Installed `@gsap/react` and refactored `SmoothScrolling.tsx` & `identity/page.tsx` using `useGSAP` with scoped selectors/refs and clean ScrollTrigger refresh.
- **Success criteria**: Zero lint errors, zero build errors, genuine logic, proper scroll restoration on route changes, pin & scroll spy functional without timer hacks.
- **Interface contracts**: PROJECT.md and SCOPE.md
- **Code layout**: PROJECT.md

## Key Decisions Made
- Used `useGSAP` with `scope: wrapperRef` in `SmoothScrolling.tsx` and `scope: containerRef` in `IdentityPage`.
- Removed `setTimeout(..., 150)` from `IdentityPage`, making all `ScrollTrigger.create()` calls synchronous so GSAP context tracks and auto-reverts them cleanly on unmount.
- Added immediate scroll reset (`window.scrollTo(0,0)` and `smoother.scrollTop(0)`) on App Router `pathname` change in `SmoothScrolling.tsx`.

## Artifact Index
- `/Users/dhruvalbhinsara/SARIV-Website/.agents/worker_impl_1/ORIGINAL_REQUEST.md` — Prompt request
- `/Users/dhruvalbhinsara/SARIV-Website/.agents/worker_impl_1/BRIEFING.md` — Briefing index
- `/Users/dhruvalbhinsara/SARIV-Website/.agents/worker_impl_1/progress.md` — Heartbeat progress tracking
- `/Users/dhruvalbhinsara/SARIV-Website/.agents/worker_impl_1/handoff.md` — Final Handoff report

## Change Tracker
- **Files modified**:
  - `package.json`: Added `@gsap/react` (`^2.1.2`).
  - `src/components/SmoothScrolling.tsx`: Refactored with `useGSAP`, `wrapperRef` scoping, and route-change scroll reset.
  - `src/app/identity/page.tsx`: Refactored with `useGSAP`, `containerRef` scoping, synchronous pin/spy triggers, and `ScrollTrigger.refresh()`.
  - `src/components/ui/LineSidebar.tsx`: Fixed React 19 ref mutation during render, state-in-effect, and callback access before declaration.
  - `e2e/helpers/scroll-helpers.ts` & `e2e/specs/tier1-feature-coverage/F1-build-integration.spec.ts`: Updated `@ts-ignore` to `@ts-expect-error window extension` for ESLint compliance.
- **Build status**: PASS (`npm run build` succeeded)
- **Pending issues**: None

## Quality Status
- **Build/test result**: PASS
- **Lint status**: PASS (0 errors)
- **Tests added/modified**: Verified against project build and lint suites.

## Loaded Skills
- None loaded.
