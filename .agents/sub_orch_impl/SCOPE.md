# Scope: Implementation Track (Milestone 2)

## Objectives
Refactor GSAP ScrollTrigger and ScrollSmoother integration in Next.js App Router to fix soft navigation bugs using `@gsap/react`.

## Requirements
1. **R1. Refactor GSAP Integration using `@gsap/react`**
   - Install `@gsap/react` package if not present.
   - Refactor `src/app/identity/page.tsx` and `src/components/SmoothScrolling.tsx` to use the `useGSAP` hook.
   - Scope GSAP animations and ScrollTrigger instances properly to component refs so that cleanup happens automatically on route transitions.

2. **R2. Ensure ScrollTrigger works on Soft Navigation**
   - The scroll spy functionality for `LineSidebar` in `IdentityPage` must activate immediately when soft navigating from `/` (or any other route) to `/identity`.
   - Ensure dynamic active section updates as the user scrolls.
   - Ensure sticky sidebar pinning logic (`asideRef`) works seamlessly on soft loads.

3. **R3. Maintain SmoothScrolling Compatibility**
   - `SmoothScrolling` (`ScrollSmoother` wrapper) must function across page transitions.
   - Must not break global layout, duplicate smoother instances, or trap scroll.

## Verification Requirements
- Implementation must pass build and lint checks.
- Unit/integration tests for components.
- Verification by Reviewer, Challenger, and Forensic Auditor before marking Milestone 2 ready for final E2E test suite pass.
