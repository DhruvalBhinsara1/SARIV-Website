"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

// Illustrative only — not real product footage. Cycles a focal point through
// a small mock interface, pairing a cursor move with a pan+zoom on the same
// transform-origin, echoing the easing described in Design Principle 02.
const POINTS = [
  { x: 22, y: 28 },
  { x: 72, y: 34 },
  { x: 50, y: 76 },
];

const HOLD_MS = 2200;
const ZOOM_DELAY_MS = 150;
const ZOOM_DURATION_MS = 1400;

export function MotionShowcase() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const advance = setInterval(() => setIndex((i) => (i + 1) % POINTS.length), HOLD_MS);
    return () => clearInterval(advance);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    const zoomIn = setTimeout(() => setZoomed(true), ZOOM_DELAY_MS);
    const zoomOut = setTimeout(() => setZoomed(false), ZOOM_DURATION_MS);
    return () => {
      clearTimeout(zoomIn);
      clearTimeout(zoomOut);
    };
  }, [index, reduceMotion]);

  const point = POINTS[index];

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border bg-[#0a0a0a]">
      <div
        className={cn(
          "absolute inset-0 transition-transform ease-[cubic-bezier(0.22,1,0.36,1)]",
          reduceMotion ? "duration-0" : "duration-[1400ms]",
          zoomed && !reduceMotion ? "scale-[1.5]" : "scale-100"
        )}
        style={{ transformOrigin: `${point.x}% ${point.y}%` }}
      >
        {/* Abstract mock interface — not FreeFlow's real UI, just enough structure to demonstrate the motion. */}
        <div className="absolute inset-6 md:inset-10 flex flex-col gap-4">
          <div className="flex gap-3">
            <div className="h-3 w-24 rounded-full bg-white/10" />
            <div className="h-3 w-14 rounded-full bg-white/5" />
          </div>
          <div className="flex-1 grid grid-cols-3 gap-4">
            <div className="rounded-xl bg-white/[0.06] border border-white/10" />
            <div className="rounded-xl bg-white/[0.06] border border-white/10" />
            <div className="rounded-xl bg-white/[0.06] border border-white/10" />
          </div>
          <div className="h-16 rounded-xl bg-white/[0.06] border border-white/10" />
        </div>
      </div>

      {!reduceMotion && (
        <div
          className="absolute w-3 h-3 rounded-full bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.15)] transition-[left,top] duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${point.x}%`, top: `${point.y}%` }}
        />
      )}
    </div>
  );
}
