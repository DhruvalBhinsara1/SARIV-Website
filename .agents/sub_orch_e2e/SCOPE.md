# Scope: E2E Testing Track (Milestone 1)

## Objectives
Design and implement a comprehensive, requirement-driven opaque-box E2E test suite for the GSAP ScrollTrigger soft navigation fix in Next.js App Router. Publish `TEST_READY.md` upon completion.

## Features & Tiers
### Identified Features (N=5):
1. **F1**: App Build & `@gsap/react` Package Integration
2. **F2**: Soft Navigation to `/identity` (Sidebar activates immediately on route change without hard reload)
3. **F3**: Scroll Spy Functionality (Sidebar active item updates dynamically as page scrolls)
4. **F4**: Multi-transition Navigation & Memory/Scroll Stability (Repeated transitions between `/` and `/identity`, no duplicate triggers or trapped scroll)
5. **F5**: Sticky Sidebar Pinning (`asideRef` pinning logic works on soft loads)

### Coverage Thresholds
- **Tier 1 (Feature Coverage)**: ≥5 test cases per feature (25 total)
- **Tier 2 (Boundary & Corner Cases)**: ≥5 test cases per feature (25 total - fast scroll, rapid route switching, deep linking, resize, scroll restoration)
- **Tier 3 (Cross-Feature Combinations)**: Pairwise interactions (e.g. soft nav + rapid scroll + back button)
- **Tier 4 (Real-World Application Scenarios)**: ≥5 full user journeys (navigate home -> identity -> scroll sections -> navigate home -> return identity)
- **Total test cases**: ~60 test cases

## Interface & Entry Points
- Web Application running locally (e.g. via Next.js dev server or `next start` on `http://localhost:3000` or Playwright webServer).
- Test runner command defined in `TEST_READY.md` (e.g. `npm run test:e2e` or `npx playwright test`).

## Deliverables
- Test infrastructure and test files under `e2e/` or `tests/`.
- `TEST_INFRA.md` documenting philosophy, feature inventory, architecture, and coverage thresholds.
- `TEST_READY.md` at project root signaling completion to the Implementation Track.
