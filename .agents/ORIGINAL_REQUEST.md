# Original User Request

## 2026-07-22T13:59:46Z

Fix the GSAP ScrollTrigger bug in the Next.js App Router where the sidebar navigation list (`LineSidebar` in `IdentityPage`) only activates on a hard reload and fails to update its active state during soft navigations.

Working directory: /Users/dhruvalbhinsara/SARIV-Website

## Requirements

### R1. Refactor GSAP Integration using `@gsap/react`
Refactor the ScrollTrigger logic in `src/app/identity/page.tsx` and `src/components/SmoothScrolling.tsx` to use the official `@gsap/react` package (`useGSAP` hook) to correctly handle Next.js App Router's soft-navigation lifecycle and cleanup.

### R2. Ensure ScrollTrigger works on Soft Navigation
The scroll spy functionality for the sidebar (`LineSidebar`) must correctly track the active section when navigating from any other page without requiring a hard reload.

### R3. Maintain SmoothScrolling Compatibility
Ensure the `ScrollSmoother` wrapper continues to function flawlessly across page transitions, without breaking the global layout or trapping scroll.

## Acceptance Criteria

### Verification Scenarios (Must be tested)
- [ ] Install `@gsap/react` and successfully build the app.
- [ ] Test soft navigation from the home page (`/`) to `/identity` ensuring the sidebar activates immediately.
- [ ] Scroll down `/identity` to verify the sidebar updates dynamically.
- [ ] Navigate back and forth between pages multiple times to guarantee no memory leaks, duplicate triggers, or broken states.
- [ ] Verify that the sticky sidebar pinning logic (`asideRef`) works perfectly on soft loads.

## 2026-07-30T19:57:54Z

# Teamwork Project Prompt — Draft

> Status: Launched

Fix the performance lag and "springy" delay in the CustomCursor component on the SARIV website to ensure a buttery-smooth, native-feeling experience without dropping frames.

Working directory: /Users/dhruvalbhinsara/SARIV-Website
Integrity mode: demo

## Requirements

### R1. Eliminate Performance Bottlenecks
The cursor must not cause frame drops. Refactor the hover detection to avoid running expensive operations (like `target.closest` with complex selectors) and state updates continuously on every `mousemove` event. Consider CSS-based approaches or more efficient event delegation.

### R2. Tighten Cursor Physics
Adjust the Framer Motion `useSpring` configuration. The cursor should still feel organic, but track the user's mouse much more responsively than the current floaty physics.

## Acceptance Criteria

### Performance
- [ ] Rapidly moving the mouse continuously across the screen causes zero noticeable frame drops or jank in the browser.
- [ ] The `mousemove` event listener does not execute expensive DOM traversals on every pixel of movement.

### Experience
- [ ] The cursor smoothly tracks the mouse with a tight, responsive spring effect (not 1:1, but significantly faster than the current implementation).
- [ ] Hovering over interactive elements (links, buttons, inputs) still correctly expands the cursor size and scales down when leaving.

