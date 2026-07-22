# BRIEFING — 2026-07-22T14:02:00Z

## Mission
Investigate GSAP ScrollTrigger soft navigation bug on `/identity` (and home page/sidebar navigation) and propose `@gsap/react` refactoring strategy.

## 🔒 My Identity
- Archetype: Explorer
- Roles: Read-only investigation, GSAP ScrollTrigger analysis
- Working directory: /Users/dhruvalbhinsara/SARIV-Website/.agents/explorer_impl_1
- Original parent: 350018c1-02db-4793-a9b2-7149e582a109
- Milestone: Implementation Track (Milestone 2)

## 🔒 Key Constraints
- Read-only investigation — do NOT implement code changes in src/
- Follow 5-component Handoff Protocol
- Write detailed report to /Users/dhruvalbhinsara/SARIV-Website/.agents/explorer_impl_1/analysis.md

## Current Parent
- Conversation ID: 350018c1-02db-4793-a9b2-7149e582a109
- Updated: 2026-07-22T14:02:00Z

## Investigation State
- **Explored paths**:
  - `package.json` (missing `@gsap/react` dependency)
  - `src/components/SmoothScrolling.tsx` (ScrollSmoother & ScrollTrigger.refresh lifecycle)
  - `src/app/identity/page.tsx` (pinning & section spy triggers, async setTimeout bug in gsap.context)
  - `src/components/ui/LineSidebar.tsx` (controlled activeIndex prop handling)
- **Key findings**:
  1. `IdentityPage` has an async bug where `ScrollTrigger.create` inside `setTimeout(..., 150)` escapes `gsap.context()` cleanup, leaving orphaned triggers across soft navigations.
  2. `SmoothScrolling` does not reset scroll top on soft navigations (`window.scrollTo(0,0)` or `smoother.scrollTop(0)`), causing triggers to evaluate against stale scroll positions.
  3. Lack of `@gsap/react` (`useGSAP`) prevents automatic component ref scoping and cleanup on route transitions.
- **Unexplored areas**: None (all requested paths explored).

## Key Decisions Made
- Completed detailed analysis in `analysis.md` and handoff in `handoff.md`.

## Artifact Index
- /Users/dhruvalbhinsara/SARIV-Website/.agents/explorer_impl_1/ORIGINAL_REQUEST.md — Original user request
- /Users/dhruvalbhinsara/SARIV-Website/.agents/explorer_impl_1/BRIEFING.md — Working memory briefing
- /Users/dhruvalbhinsara/SARIV-Website/.agents/explorer_impl_1/analysis.md — Detailed analysis report & refactoring strategy
- /Users/dhruvalbhinsara/SARIV-Website/.agents/explorer_impl_1/handoff.md — 5-component Handoff Report
