## 2026-07-22T14:02:12Z
MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

You are Worker 1 for Implementation Track (Milestone 2).
Your working directory is /Users/dhruvalbhinsara/SARIV-Website/.agents/worker_impl_1.
Please review the analysis reports at:
- /Users/dhruvalbhinsara/SARIV-Website/.agents/explorer_impl_1/analysis.md
- /Users/dhruvalbhinsara/SARIV-Website/.agents/explorer_impl_2/analysis.md
- /Users/dhruvalbhinsara/SARIV-Website/PROJECT.md
- /Users/dhruvalbhinsara/SARIV-Website/.agents/sub_orch_impl/SCOPE.md

Your mission:
1. Install `@gsap/react` package (`npm install @gsap/react`).
2. Refactor `src/components/SmoothScrolling.tsx`:
   - Import `useGSAP` from `@gsap/react` and register plugin: `gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);`.
   - Initialize `ScrollSmoother` inside `useGSAP` hook scoped to `wrapperRef`.
   - On route changes (`pathname`), ensure immediate scroll reset (`window.scrollTo(0,0)` & `smoother.scrollTop(0)`) followed by `requestAnimationFrame(() => ScrollTrigger.refresh())`.
3. Refactor `src/app/identity/page.tsx`:
   - Import `useGSAP` from `@gsap/react` and register plugin: `gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);`.
   - Replace standard `useEffect` hooks with a single `useGSAP` hook scoped to `containerRef`.
   - Synchronously register desktop `asideRef` sticky pinning (`gsap.matchMedia`) and section scroll spy triggers without `setTimeout`.
   - Synchronously invoke `ScrollTrigger.refresh()` at the end of the `useGSAP` callback.
4. Run `npm run build` and `npm run lint` to verify clean build and zero lint errors.
5. Write your handoff report with build outputs and verification results to /Users/dhruvalbhinsara/SARIV-Website/.agents/worker_impl_1/handoff.md and send a message when done.
