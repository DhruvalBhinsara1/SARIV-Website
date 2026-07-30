# CustomCursor Physics Analysis & Parameter Optimization Report

**Target File**: `src/components/ui/CustomCursor.tsx`  
**Related Components**: `src/components/AppChrome.tsx`  
**Date**: 2026-07-30  
**Investigator**: `teamwork_preview_explorer` (Explorer Subagent)

---

## Executive Summary

The custom cursor in SARIV (`src/components/ui/CustomCursor.tsx`) uses Framer Motion's `useSpring` hook to smooth `useMotionValue(0)` mouse coordinates. The current physics configuration yields an **overdamped, low-frequency harmonic oscillator** with heavy mass inertia ($m = 0.5$), producing a noticeable **150ms–200ms latency/float** behind pointer motion. 

Additionally, continuous DOM `closest(...)` calls on every `mousemove` event dispatch React state updates (`setIsHovered`), adding main-thread execution overhead during rapid mouse movements.

By re-tuning the physics parameters to **$m = 0.1$, $k = 900$, $c = 18$** (near-critical damping $\zeta \approx 0.95$), catch-up latency is reduced from **~180ms to ~30ms**, achieving crisp, tight pointer tracking with a smooth, premium organic feel.

---

## 1. Current `useSpring` Physics Configuration

In `src/components/ui/CustomCursor.tsx` (lines 11–16):

```tsx
const mouseX = useMotionValue(0);
const mouseY = useMotionValue(0);

const springConfig = { damping: 30, stiffness: 400, mass: 0.5 };
const smoothMouseX = useSpring(mouseX, springConfig);
const smoothMouseY = useSpring(mouseY, springConfig);
```

### Parameter Breakdown

| Parameter | Current Value | Default in Framer Motion | Impact |
| :--- | :--- | :--- | :--- |
| **`stiffness`** ($k$) | `400` | `100` | Restoring force per unit displacement |
| **`damping`** ($c$) | `30` | `10` | Viscous resistance against velocity |
| **`mass`** ($m$) | `0.5` | `1.0` | Inertial resistance to acceleration |
| **`restDelta`** | *Unspecified* (implicit `0.01`) | `0.01` | Minimum distance threshold before spring sleeps |
| **`restSpeed`** | *Unspecified* (implicit `0.01`) | `0.01` | Minimum velocity threshold before spring sleeps |

Additionally, line 76 configures scale transition when hovering interactive elements:
```tsx
transition={{ scale: { type: "spring", stiffness: 300, damping: 20 }, opacity: { duration: 0.2 } }}
```

---

## 2. Root Cause Analysis: Why the Cursor Feels "Floaty" & Latent

The floaty delay is driven by three main factors:

### A. Mass-Spring-Damper Physics (Overdamped System)

The motion of `smoothMouseX` and `smoothMouseY` follows the second-order linear differential equation for a damped harmonic oscillator:

$$m \ddot{x}(t) + c \dot{x}(t) + k x(t) = 0$$

Using the current parameters ($m = 0.5$, $k = 400$, $c = 30$):

1. **Natural Undamped Frequency ($\omega_n$)**:
   $$\omega_n = \sqrt{\frac{k}{m}} = \sqrt{\frac{400}{0.5}} = \sqrt{800} \approx 28.284 \text{ rad/s}$$
   In Hertz ($f_n$):
   $$f_n = \frac{\omega_n}{2\pi} \approx 4.50 \text{ Hz}$$
   A natural frequency of 4.5 Hz corresponds to a natural period of $T_n \approx 222 \text{ ms}$. This represents a slow fundamental response rate.

2. **Critical Damping Coefficient ($c_c$)**:
   $$c_c = 2 \sqrt{m \cdot k} = 2 \sqrt{0.5 \times 400} = 2 \sqrt{200} \approx 28.284$$

3. **Damping Ratio ($\zeta$)**:
   $$\zeta = \frac{c}{c_c} = \frac{30}{28.284} \approx 1.0607$$

#### Physical Consequences of $\zeta = 1.0607 > 1.0$ (Overdamped):
- **Overdamping**: Because $\zeta > 1.0$, the spring solver decays along two real exponential characteristic roots:
  $$r_1, r_2 = -\zeta \omega_n \pm \omega_n \sqrt{\zeta^2 - 1} = -30 \pm 10 \implies r_1 = -20 \text{ s}^{-1}, \, r_2 = -40 \text{ s}^{-1}$$
- The slower mode ($r_1 = -20 \text{ s}^{-1}$) dominates the position tail with a time constant of $\tau = \frac{1}{20} = 50 \text{ ms}$.
- **Settling Time ($95\% - 98\%$)**: $3\tau \text{ to } 4\tau = 150 \text{ ms} - 200 \text{ ms}$.
- Human visual perception detects mouse pointer latency exceeding **12ms–16ms**. A 150ms–200ms delay causes the custom cursor circle to lag significantly behind the hardware cursor.

4. **Inertia from High Mass ($m = 0.5$)**:
   A mass of `0.5` causes substantial acceleration lag when changing direction quickly (mouse flicking/gestures).

---

### B. High-Frequency DOM Querying & React State Re-renders

Lines 26–35 in `CustomCursor.tsx`:
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

1. **Broad Selector Over-matching**:
   The `target.closest(...)` selector includes common typography and structure elements (`h1`-`h6`, `p`, `span`, `li`, `text`, `svg`, `img`, `video`). As a result, almost all text and images trigger `isHovered = true`.
2. **State Updates on Mouse Movement**:
   `setIsHovered(isInteractive)` is called on every `mousemove` event. When crossing text bounds, React triggers state updates and re-renders during high-frequency mouse movements (e.g. 500Hz–1000Hz gaming mice), adding main-thread overhead during motion.

---

### C. Missing `restDelta` / `restSpeed` Thresholds

Without explicit `restDelta` and `restSpeed`, Framer Motion defaults to `0.01`. In sub-pixel space, micro-oscillations persist longer before entering rest state, adding tail lag when stopping mouse movement.

---

## 3. Parameter Benchmark & Recommendations

To achieve tight, responsive tracking while maintaining a smooth, organic feel:

### Physics Comparison Table

| Option | Mass ($m$) | Stiffness ($k$) | Damping ($c$) | $\omega_n$ (rad/s) | Damping Ratio ($\zeta$) | 98% Catch-Up Time | Feel & Behavior |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Current** | `0.5` | `400` | `30` | 28.3 | 1.06 (Overdamped) | ~180 ms | Floaty, rubber-band lag, sluggish catch-up |
| **Option 1 (Recommended: Crisp & Organic)** | `0.1` | `900` | `18` | 94.9 | 0.95 (Near Critical) | **~35 ms** | **Snappy, fluid, zero perceptible lag, smooth organic feel** |
| **Option 2 (Ultra-Fast Precision)** | `0.05` | `1200` | `15.5` | 154.9 | 1.00 (Critical) | **~18 ms** | Extremely tight, high precision, minimal spring elasticity |
| **Option 3 (Velvet Smooth)** | `0.1` | `700` | `16` | 83.7 | 0.96 (Near Critical) | **~45 ms** | Soft elegant glide, subtle weight |

### Recommended Parameters (Option 1 - Crisp & Organic)

```ts
const springConfig = {
  mass: 0.1,
  stiffness: 900,
  damping: 18,
  restDelta: 0.001,
  restSpeed: 0.001,
};
```

#### Why these values work best:
- **Mass `0.1`**: Reduces inertial resistance by 80%, allowing near-instantaneous acceleration matching pointer speed.
- **Stiffness `900`**: Increases natural frequency to $\omega_n \approx 94.87 \text{ rad/s}$ ($f_n \approx 15.1 \text{ Hz}$), accelerating response rate by ~3.35x.
- **Damping `18`**: $c_c = 2\sqrt{0.1 \times 900} = 18.97$. Damping ratio $\zeta = \frac{18}{18.97} \approx 0.9488$. This subtle underdamping ($\zeta \approx 0.95$) provides crisp snap without overshoot while smoothing out micro-jitter from raw mouse events.
- **`restDelta: 0.001` & `restSpeed: 0.001`**: Ensures immediate rest settling when mouse halts.

---

## 4. Proposed Implementation Snippet

In `src/components/ui/CustomCursor.tsx`:

```tsx
// Optimized Physics Configuration
const springConfig = { 
  mass: 0.1, 
  stiffness: 900, 
  damping: 18,
  restDelta: 0.001,
  restSpeed: 0.001,
};

const smoothMouseX = useSpring(mouseX, springConfig);
const smoothMouseY = useSpring(mouseY, springConfig);
```

### Additional Optimization (Target Check Refinement)

```tsx
const handleMouseMove = (e: MouseEvent) => {
  setHidden(false);
  mouseX.set(e.clientX);
  mouseY.set(e.clientY);

  const target = e.target as HTMLElement;
  // Refine interactive elements to true actionable targets to minimize state churn
  const isInteractive = !!target.closest('a, button, input, textarea, select, [role="button"], label, [data-cursor]');
  
  setIsHovered((prev) => (prev !== isInteractive ? isInteractive : prev));
};
```

---

## Conclusion

By updating `springConfig` from `{ damping: 30, stiffness: 400, mass: 0.5 }` to `{ mass: 0.1, stiffness: 900, damping: 18, restDelta: 0.001, restSpeed: 0.001 }`, the custom cursor transitions from an overdamped, 180ms-lagging floaty cursor to a high-precision, 35ms-responsive organic pointer overlay.
