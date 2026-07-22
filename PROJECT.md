# Project: GSAP ScrollTrigger Soft Navigation Fix

## Architecture
- **Framework**: Next.js App Router (React Server/Client Components, Soft Navigation router).
- **Animation/Scroll Library**: GSAP with `ScrollTrigger`, `ScrollSmoother`, and official `@gsap/react` package (`useGSAP` hook).
- **Core Components**:
  - `src/app/identity/page.tsx` (`IdentityPage` with `LineSidebar` scroll spy & section pinning via `asideRef`).
  - `src/components/SmoothScrolling.tsx` (`SmoothScrolling` wrapper managing `ScrollSmoother` lifecycle across router page transitions).
- **Data & Lifecycle Flow**:
  - `SmoothScrolling` wraps layout / page components, providing smooth scrolling via GSAP `ScrollSmoother`.
  - `IdentityPage` mounts `LineSidebar` and target section refs (`#section-1`, `#section-2`, etc.), attaching GSAP `ScrollTrigger` instances via `useGSAP` hook.
  - Soft navigation between `/` and `/identity` must clean up old `ScrollTrigger` / `ScrollSmoother` instances and re-bind listeners cleanly without hard reload.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | E2E Testing Track | Create opaque-box E2E test suite for GSAP soft navigation, sidebar active state tracking, smooth scrolling, and page transitions; publish `TEST_READY.md`. | None | IN_PROGRESS |
| 2 | Implementation Track: GSAP React Refactor & Soft Nav Fix | Refactor GSAP integration in `src/app/identity/page.tsx` and `src/components/SmoothScrolling.tsx` to `@gsap/react` (`useGSAP`), ensuring soft navigation scroll spy & pinning work without hard reload. | None | IN_PROGRESS |
| 3 | E2E Test Pass & Adversarial Hardening | Verify 100% pass rate on E2E test suite (Tiers 1-4) and run Tier 5 adversarial coverage hardening (Challenger -> Worker -> Reviewer). | M1, M2 | PLANNED |

## Interface Contracts
### `IdentityPage` (`src/app/identity/page.tsx`) ↔ `LineSidebar` (`src/components/LineSidebar.tsx` or inline)
- `LineSidebar` receives current active section index or updates via `ScrollTrigger` callbacks.
- `asideRef` pinned via GSAP `ScrollTrigger.create({ pin: true, ... })` or CSS sticky / GSAP pin.
- `useGSAP` context scoping must target container ref (`mainRef` or `containerRef`) to auto-revert triggers on unmount / navigation.

### `SmoothScrolling` (`src/components/SmoothScrolling.tsx`) ↔ App Router (`pathname` / route state)
- `SmoothScrolling` listens to route transitions or uses `useGSAP` dependent on `pathname` to refresh/re-create `ScrollSmoother` and `ScrollTrigger`.
- `ScrollTrigger.refresh()` and proper `smoother.kill()` / cleanup on route unmount.

## Code Layout
- `src/app/identity/page.tsx`: Identity page component containing `LineSidebar`, GSAP `ScrollTrigger` section logic.
- `src/components/SmoothScrolling.tsx`: Global smooth scroll wrapper component using GSAP `ScrollSmoother`.
- `src/app/layout.tsx`: Root layout wrapping pages with `SmoothScrolling`.
- `tests/` or `e2e/`: E2E test suite created by E2E Testing Track.
