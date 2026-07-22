# SARIV Motion System

**Version:** 1.0  
**Status:** Canonical Reference

---

## 1. Purpose

In the SARIV Design System, motion is never used as decoration. Motion is a functional tool used to communicate intent, guide attention, establish hierarchy, create rhythm, and evoke emotion.

The user should never consciously notice the animations themselves. They should simply feel that the interface behaves naturally and predictably. If an animation exists only because it "looks cool," it must be removed.

---

## 2. Motion Philosophy

SARIV motion should always feel:
- **Calm:** Slow, deliberate, and unhurried.
- **Intentional:** Occurring only to communicate a change in state or hierarchy.
- **Physical:** Governed by real-world physics (mass, friction, inertia).
- **Elegant:** Smooth easing curves without harsh stops.
- **Cinematic:** Transitions that feel like camera movements in a film.

SARIV motion must **never** feel:
- **Flashy or Gimmicky:** We do not build sites for design awards; we build them for trust.
- **Playful:** Bouncing and spring physics are restricted.
- **Distracting:** Motion should never pull the user's eye away from the primary content.
- **Overly Reactive:** The interface should not aggressively respond to every slight cursor movement.

---

## 3. Core Motion Principles

### 3.1 Reveal Progressively
Reveal information only when it becomes relevant to the user. Never animate an entire page's content simultaneously. Staggered reveals help the user process information in chunks.

### 3.2 Maintain Continuity
Every movement should feel connected. Elements should rarely appear instantaneously from nothing; they should fade, slide, or scale into existence. This continuity grounds the user in the spatial architecture of the application.

### 3.3 Respect Weight & Scale
Objects in the interface have perceived physical weight.
- Large, structural elements (e.g., hero sections, modals, large images) must move slower.
- Small, functional elements (e.g., buttons, toggles, tooltips) must move faster.

### 3.4 Serve a Purpose
Before implementing an animation, ensure it answers one of these questions for the user:
1. *Where am I?* (Spatial orientation).
2. *What just changed?* (State feedback).
3. *What should I look at next?* (Directing attention).

---

## 4. Technical Specifications

### 4.1 Timing Scale (Durations)
Standardized durations ensure rhythm and consistency across the product.

- **Instant:** `75ms` (Immediate state changes like checkbox toggles).
- **Small UI:** `150ms` (Button hovers, tooltip reveals, minor color shifts).
- **Normal:** `250ms` (Standard transitions, card lifts, dropdowns).
- **Large:** `500ms` (Modal reveals, page transitions, drawer slides).
- **Section Reveal:** `800ms` (Scroll-triggered content fades).
- **Narrative / Hero:** `1200ms - 2500ms` (Cinematic hero reveals, slow background shifts).

### 4.2 Easing Curves
The easing curve dictates the "feeling" of the motion.
- **Primary Easing (The SARIV Curve):** `cubic-bezier(0.22, 1, 0.36, 1)` (Smooth, elegant deceleration).
- **Alternative (Linear/InOut):** `ease-in-out` (Used strictly for infinite background loops or opacity fades).
- **Prohibited:** Never use `bounce`, `elastic`, `back`, or harsh `overshoot` curves.

---

## 5. Implementation Guidelines

### 5.1 Scrolling & Parallax
Scrolling through the site should feel like progressing through a documentary film, not moving through independent, disconnected sections.
- **Allowed Parallax:** Background gradients, lighting effects, subtle noise textures.
- **Prohibited Parallax:** Text, buttons, forms, and navigation must remain completely stable. The content must never be subjected to parallax effects.

### 5.2 Section Reveals
As the user scrolls, sections must enter smoothly to manage cognitive load.
- **Animation:** `Fade` (`0` to `100%`) + `Translate Y` (`24px` to `0px`).
- **Duration:** `800ms`.
- **Staggering:** If elements within a section animate sequentially, delay them by `100ms`. Never stagger more than 6 elements in a single sequence.

### 5.3 Page Transitions
Navigation between pages must feel seamless. Never slide pages horizontally like a mobile app drawer.
- **Sequence:** Fade Out → Subtle Blur → Fade In new content.
- **Duration:** `500ms`.

### 5.4 Micro-Interactions
- **Buttons (Hover):** Background shifts slightly, shadow increases softly, `Translate Y (-2px)`.
- **Buttons (Press):** `Scale (0.98)` over `150ms`.
- **Cards (Hover):** `Translate Y (-2px) - (-4px)`, shadow deepens softly. Do not scale cards larger than `1.02`.
- **Accordions:** Smooth expansion of `height` and `opacity` over `300ms`. No bounce.

---

## 6. The Cinematic Hero Sequence

The hero section of the homepage is the most critical motion sequence. It must create emotion before explanation.
1. **Logo:** Appears and slowly transforms/resolves.
2. **Atmosphere:** Ambient background motion (light/noise) begins.
3. **Headline:** Fades upward (`opacity 0 -> 100%`, `Translate Y 32px -> 0px` over `900ms`).
4. **Supporting Copy:** Fades in after the headline.
5. **CTA:** Appears last, completing the sequence.
6. **Scroll Indicator:** Fades in softly with a slow pulse (`opacity 30% <-> 70%`) after the sequence concludes.

---

## 7. Performance & Engineering Constraints

Motion must never compromise performance. Speed communicates competence.
- **Performance Target:** Maintain a strict `60 FPS` on low-end devices, targeting `120 FPS` on capable displays.
- **CSS Properties:** Only animate properties that do not trigger layout recalculations. Animate `transform` (translate, scale, rotate), `opacity`, and `filter` (blur).
- **Prohibited Properties:** Never animate `width`, `height`, `top`, `left`, `margin`, or `padding` if it causes surrounding elements to reflow.
- **Libraries:** Standardize on one primary animation library (e.g., Framer Motion or CSS Transitions). Use GSAP exclusively for complex, pinned scroll timelines. Never mix multiple libraries for a single interaction.

---

## 8. Accessibility: Reduced Motion

Accessibility is a non-negotiable requirement.
- The system must respect the `prefers-reduced-motion` media query.
- **When Reduced Motion is active:**
  - Completely disable parallax, large transitions, camera movements, and background drifting.
  - Retain simple `opacity` fades to prevent jarring instantaneous cuts.
- Accessibility and user comfort always supersede cinematic design.
