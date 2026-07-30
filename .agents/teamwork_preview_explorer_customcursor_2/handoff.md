# Handoff Report — CustomCursor Physics Investigation

**Agent**: `teamwork_preview_explorer`  
**Working Directory**: `/Users/dhruvalbhinsara/SARIV-Website/.agents/teamwork_preview_explorer_customcursor_2`  
**Target File**: `/Users/dhruvalbhinsara/SARIV-Website/src/components/ui/CustomCursor.tsx`  
**Consumer Component**: `/Users/dhruvalbhinsara/SARIV-Website/src/components/AppChrome.tsx:55`  
**Date**: 2026-07-30  

---

## 1. Observation

Direct observations from `/Users/dhruvalbhinsara/SARIV-Website/src/components/ui/CustomCursor.tsx`:

1. **Spring Configuration (Lines 11–16)**:
   ```tsx
   const mouseX = useMotionValue(0);
   const mouseY = useMotionValue(0);

   const springConfig = { damping: 30, stiffness: 400, mass: 0.5 };
   const smoothMouseX = useSpring(mouseX, springConfig);
   const smoothMouseY = useSpring(mouseY, springConfig);
   ```
2. **Hover Scale Transition (Line 76)**:
   ```tsx
   transition={{ scale: { type: "spring", stiffness: 300, damping: 20 }, opacity: { duration: 0.2 } }}
   ```
3. **Mouse Move Handler & Interactive Target Selector (Lines 26–34)**:
   ```tsx
   const handleMouseMove = (e: MouseEvent) => {
     setHidden(false);
     mouseX.set(e.clientX);
     mouseY.set(e.clientY);

     const target = e.target as HTMLElement;
     const isInteractive = !!target.closest('a, button, input, textarea, select, [role="button"], label, [data-cursor], h1, h2, h3, h4, h5, h6, p, span, li, svg, img, video, text');
     setIsHovered(isInteractive);
   };
   ```
4. **CSS Pointer Hiding (Lines 57–63)**:
   ```tsx
   @media (pointer: fine) {
     body, *, a, button, input, textarea, select {
       cursor: none !important;
     }
   }
   ```
5. **Transform Style Binding (Lines 64–71)**:
   ```tsx
   <motion.div
     className="fixed top-0 left-0 w-12 h-12 bg-white rounded-full pointer-events-none z-[99999] mix-blend-difference flex items-center justify-center overflow-hidden will-change-transform"
     style={{
       x: smoothMouseX,
       y: smoothMouseY,
       translateX: "-50%",
       translateY: "-50%",
     }}
   ```

---

## 2. Logic Chain

1. **Observation**: `springConfig` is `{ damping: 30, stiffness: 400, mass: 0.5 }`.
2. **Logic Step 1**: Undamped natural frequency is calculated as $\omega_n = \sqrt{k / m} = \sqrt{400 / 0.5} = \sqrt{800} \approx 28.28 \text{ rad/s}$ ($f_n \approx 4.50 \text{ Hz}$).
3. **Logic Step 2**: Critical damping is $c_c = 2\sqrt{m \cdot k} = 2\sqrt{0.5 \times 400} = 28.28$.
4. **Logic Step 3**: Damping ratio $\zeta = c / c_c = 30 / 28.28 \approx 1.0607 > 1.0$. This proves the system is mathematically **overdamped**.
5. **Logic Step 4**: In an overdamped harmonic system ($\zeta > 1$), motion returns to equilibrium via slow exponential decay curves without oscillation. The dominant decay root is $r_1 = -20 \text{ s}^{-1}$ with time constant $\tau = 50 \text{ ms}$.
6. **Logic Step 5**: Settling to within 95%-98% of target mouse pointer location takes $3\tau$ to $4\tau$ (**150ms–200ms**).
7. **Logic Step 6**: Human visual latency perception threshold for pointer tracking is ~12ms–16ms. A 150ms–200ms settling time causes noticeable float, rubber-band dragging, and latency.
8. **Logic Step 7**: Re-tuning parameters to $m = 0.1$, $k = 900$, $c = 18$ yields $\omega_n \approx 94.87 \text{ rad/s}$ and $\zeta \approx 0.95$. Settling time drops from ~180ms down to **~35ms**, providing crisp, snappy tracking with smooth organic feel.

---

## 3. Caveats

1. **Read-Only Scope**: This report provides analysis and parameter recommendations. No changes were made directly to `src/components/ui/CustomCursor.tsx` during this investigation.
2. **Display Refresh Rates**: Settling feel varies slightly across hardware displays (60Hz vs 120Hz/144Hz monitors). At 144Hz (frame time 6.9ms), Option 1 (`stiffness: 900`, `damping: 18`, `mass: 0.1`) feels silky smooth.
3. **Mouse Polling Rate**: High-polling mice (1000Hz) benefit further from functional state update guards (`setIsHovered((prev) => prev !== isInteractive ? isInteractive : prev)`).

---

## 4. Conclusion

- **Current Config**: `stiffness: 400`, `damping: 30`, `mass: 0.5` (Overdamped, $\zeta = 1.06$, ~180ms lag).
- **Cause of Float**: Overdamped harmonic oscillator math combined with mass inertia ($m = 0.5$) and low natural frequency (4.5 Hz).
- **Recommended Physics Parameters (Crisp & Organic)**:
  - `mass`: `0.1`
  - `stiffness`: `900`
  - `damping`: `18`
  - `restDelta`: `0.001`
  - `restSpeed`: `0.001`

---

## 5. Verification Method

To verify these findings and test the recommended configuration:

1. **Inspect Code**:
   View `src/components/ui/CustomCursor.tsx` lines 14–16.
2. **Run Dev Server & Compare**:
   Execute `npm run dev` or `pnpm dev`. Move mouse rapidly across the screen.
3. **Apply Recommended Patch**:
   Update line 14 of `src/components/ui/CustomCursor.tsx`:
   ```tsx
   const springConfig = { mass: 0.1, stiffness: 900, damping: 18, restDelta: 0.001, restSpeed: 0.001 };
   ```
4. **Observe Precision**:
   Verify pointer tracking lag drops from ~180ms to ~35ms, catching up sharply without sluggish floating while maintaining smooth edges.
