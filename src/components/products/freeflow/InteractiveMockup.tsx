"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image, { type StaticImageData } from "next/image";

// Same waypoint-cycling idea as MotionShowcase, tuned to real hotspots in
// freeflow-ui.png (record button, zoom depth, cursor size) — the hero
// literally demonstrates the pan/zoom the product does, rather than telling.
const POINTS = [
  { x: 50, y: 88 },
  { x: 89, y: 32 },
  { x: 89, y: 63 },
];

const HOLD_MS = 2600;
const ZOOM_DELAY_MS = 200;
const ZOOM_DURATION_MS = 1600;
const TILT_DEGREES = 5;

export function InteractiveMockup({ src, alt }: { src: StaticImageData | string; alt: string }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const frameRef = useRef<HTMLDivElement>(null);

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

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduceMotion || !frameRef.current) return;
    const { left, top, width, height } = frameRef.current.getBoundingClientRect();
    const px = (e.clientX - left) / width - 0.5;
    const py = (e.clientY - top) / height - 0.5;
    setTilt({ x: px * TILT_DEGREES * 2, y: py * TILT_DEGREES * 2 });
  }

  const point = POINTS[index];

  return (
    <motion.div
      ref={frameRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      animate={{ rotateY: tilt.x, rotateX: -tilt.y }}
      transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.2 }}
      style={{ transformPerspective: 1200 }}
      className="relative w-full bg-surface-elevated border border-border rounded-2xl overflow-hidden p-2 shadow-elevation"
    >
      <div className="relative w-full rounded-xl overflow-hidden border border-border/50 bg-[#0a0a0a] aspect-[16/10]">
        <div
          className={`absolute inset-0 transition-transform ease-[cubic-bezier(0.22,1,0.36,1)] ${
            reduceMotion ? "duration-0" : "duration-[1600ms]"
          } ${zoomed && !reduceMotion ? "scale-[2.2]" : "scale-100"}`}
          style={{ transformOrigin: `${point.x}% ${point.y}%` }}
        >
          <Image src={src} alt={alt} fill className="object-cover" priority />
        </div>

        {!reduceMotion && (
          <div
            className="absolute w-3 h-3 rounded-full bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.2)] transition-[left,top] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
          />
        )}
      </div>
    </motion.div>
  );
}
