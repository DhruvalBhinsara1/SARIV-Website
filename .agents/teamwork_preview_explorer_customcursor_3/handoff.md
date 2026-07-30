# Handoff Report: CustomCursor Performance & Event Delegation Architecture

## 1. Observation

1. **Component Location & Integration**:
   - `src/components/ui/CustomCursor.tsx` is mounted globally in `src/components/AppChrome.tsx` (line 55).
   - Global CSS injection (lines 57–63 in `CustomCursor.tsx`) hides the browser pointer on `(pointer: fine)` devices using `cursor: none !important`.

2. **Per-Pixel DOM Traversal in `handleMouseMove`**:
   - `src/components/ui/CustomCursor.tsx` lines 26–35:
     ```tsx
     const handleMouseMove = (e: MouseEvent) => {
       setHidden(false);
       mouseX.set(e.clientX);
       mouseY.set(e.clientY);

       const target = e.target as HTMLElement;
       // Check if we are hovering over something interactive, text elements, or media/svgs
       const isInteractive = !!target.closest('a, button, input, textarea, select, [role="button"], label, [data-cursor], h1, h2, h3, h4, h5, h6, p, span, li, svg, img, video, text');
       setIsHovered(isInteractive);
     };
     ```
   - Observed that `target.closest(...)` with 20 CSS selectors executes on every single `mousemove` event (firing at up to 144–240+ Hz).

3. **Over-Inclusive Target Selector**:
   - The selector string includes generic text and media tags: `h1, h2, h3, h4, h5, h6, p, span, li, svg, img, video, text`.
   - Almost every element in the DOM contains a `p`, `span`, `h1..h6`, `svg`, or `img`. As a result, `isInteractive` returns `true` almost everywhere on the page, keeping `isHovered` continuously true (`scale: 1`) and destroying interactive hover state contrast.

4. **Spring Physics Configuration**:
   - `src/components/ui/CustomCursor.tsx` line 14:
     ```tsx
     const springConfig = { damping: 30, stiffness: 400, mass: 0.5 };
     ```
   - Mass of 0.5 and damping of 30 causes lag/inertia relative to hardware pointer movement.

---

## 2. Logic Chain

1. **From Observation 2 & 3**: Because `target.closest(...)` is executed on every mouse coordinate tick with generic tags (`span`, `p`, `h1..h6`), the main thread suffers per-pixel DOM tree traversal overhead and React state setter invocations (`setIsHovered`). Furthermore, because almost all elements match `span`/`p`/`h1..h6`, the cursor remains enlarged across non-interactive content.
2. **From Logic Step 1**: Decoupling position tracking from hover state detection will eliminate DOM traversals during mouse motion. Moving hover detection to a delegated `pointerover` listener on `window` means DOM element lookup runs strictly when entering or leaving an element boundary.
3. **From Observation 2 & Catalog of Interactive Elements**: Standard interactive elements (`a`, `button`, `input`, `textarea`, `select`, `label`, `summary`, `[role="button"]`, `[role="link"]`, `[role="tab"]`, `[role="option"]`, `[role="switch"]`, `[data-cursor]`) can be targeted exclusively without including generic text/media tags.
4. **From Observation 4**: Reducing `mass` from `0.5` to `0.2` and increasing `stiffness` from `400` to `600` (with `damping: 35`) eliminates the lag/inertia while maintaining smooth Framer Motion spring interpolation.

---

## 3. Caveats

- **I-beam or Text Variants**: If specific text blocks require custom text cursor scaling (e.g. the manifesto typography in `src/app/page.tsx` line 50), they must explicitly use `data-cursor="text"` rather than relying on generic `h1..h6, p, span` tag matching.
- **Dynamic DOM Updates**: `pointerover` delegation automatically captures dynamically rendered modals, drawers, or portal elements without requiring manual re-registration.

---

## 4. Conclusion

1. **Refactoring Target 1 (R1 - Event Delegation)**: In `src/components/ui/CustomCursor.tsx`, update `handleMouseMove` to only update MotionValues (`mouseX.set`, `mouseY.set`). Add a separate `pointerover` listener on `window` using `{ passive: true }` to evaluate `target.closest(INTERACTIVE_SELECTOR)` only on element boundary transitions.
2. **Refactoring Target 2 (R1 - Selector Precision)**: Exclude `h1..h6, p, span, li, svg, img, video, text` from the default hover selector. Restrict to `a, button, input, textarea, select, label, summary, [role="button"], [role="link"], [role="tab"], [role="option"], [role="switch"], [data-cursor]`.
3. **Refactoring Target 3 (R2 - Spring Physics Tuning)**: Change `springConfig` to `{ damping: 35, stiffness: 600, mass: 0.2 }` for `smoothMouseX` / `smoothMouseY` and `{ type: "spring", stiffness: 400, damping: 25 }` for scale transitions.

---

## 5. Verification Method

1. **Build & Lint Verification**:
   - Run `npm run build` and `npm run lint` from project root `/Users/dhruvalbhinsara/SARIV-Website`.
   - Confirm 0 TypeScript errors and 0 ESLint warnings.

2. **Interactive Hover Verification**:
   - Inspect custom cursor scaling when hovering over links, buttons, form inputs, checkboxes, tabs, and `data-cursor` elements.
   - Confirm cursor dot remains small (12px) over standard non-interactive paragraphs and headings, and expands (48px) only over interactive targets.

3. **Performance & Motion Verification**:
   - Verify smooth 60-144+ FPS tracking during rapid mouse movements with zero pointer lag.
