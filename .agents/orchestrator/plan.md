# Plan: CustomCursor Performance and Physics Fix

## Objective
Fix performance lag and springy delay in `CustomCursor` component on SARIV website, achieving buttery-smooth, native-feeling responsiveness without frame drops.

## Milestones & Strategy

### Milestone 1: Exploration & Codebase Analysis
- **Goal**: Locate `CustomCursor.tsx` and related components/hooks/styles. Analyze existing `mousemove` hover detection logic, DOM traversal operations (`target.closest`), `useSpring` parameters (`stiffness`, `damping`, `mass`), and layout integration.
- **Worker**: `teamwork_preview_explorer` (Explorer 1)
- **Output**: Detailed diagnostic report with baseline physics parameters and recommended refactoring options.

### Milestone 2: Refactoring Implementation & Build Verification
- **Goal**: Implement optimized hover detection (e.g. event delegation with `mouseover`/`mouseout` or pointer events instead of per-mousemove DOM tree traversals) and tighter Framer Motion spring physics.
- **Worker**: `teamwork_preview_worker` (Worker 1)
- **Verification**: Run `npm run build` / `npm run lint` / TypeScript check and verify all hover interactions and smooth tracking without performance lag.

### Milestone 3: Review, Stress Testing & Forensic Audit
- **Goal**: Review implementation for clean code and performance gains; run Challenger for empirical verification; run Forensic Auditor for integrity verification.
- **Workers**: `teamwork_preview_reviewer` (2 reviewers), `teamwork_preview_challenger` (Challenger), `teamwork_preview_auditor` (Forensic Auditor).

## Acceptance Criteria
- Zero frame drops on rapid mouse movement.
- No continuous expensive DOM traversals in `mousemove` event listeners.
- Tighter, responsive cursor physics tracking mouse position smoothly.
- Interactive hover effects (buttons, links, inputs, custom cursor elements) work perfectly.
- Clean build, zero lint/TypeScript errors, 100% integrity audit pass.
