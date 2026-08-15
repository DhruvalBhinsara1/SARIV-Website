"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const TILT_DEGREES = 4;

export function CivicOSHeroMockup() {
  const reduceMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const frameRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduceMotion || !frameRef.current) return;
    const { left, top, width, height } = frameRef.current.getBoundingClientRect();
    const px = (e.clientX - left) / width - 0.5;
    const py = (e.clientY - top) / height - 0.5;
    setTilt({ x: px * TILT_DEGREES * 2, y: py * TILT_DEGREES * 2 });
  }

  return (
    <motion.div
      ref={frameRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      animate={{ rotateY: tilt.x, rotateX: -tilt.y }}
      transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.2 }}
      style={{ transformPerspective: 1200 }}
      className="relative w-full"
    >
      {/* Background Web Portal Mockup */}
      <div className="relative w-full bg-surface-elevated border border-border rounded-2xl overflow-hidden p-2 md:p-3 shadow-elevation">
        <div className="relative w-full rounded-xl overflow-hidden border border-border/50 bg-[#0a0a0a] aspect-[16/10]">
          <Image
            src="/web-dashboard.png"
            alt="CivicOS Municipal Operations Command and Live GIS Dispatch Map"
            fill
            className="object-cover object-top"
            priority
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Overlapping Floating Mobile App Frame */}
      <div className="absolute -bottom-6 -right-2 md:-bottom-10 md:-right-6 w-[40%] md:w-[34%] aspect-[9/19.5] bg-[#0E0E10] border-2 border-white/20 rounded-[1.75rem] md:rounded-[2.25rem] overflow-hidden p-1 shadow-2xl shadow-black/80 z-20 transition-transform duration-500 hover:scale-[1.03]">
        <div className="relative w-full h-full rounded-[1.4rem] md:rounded-[1.9rem] overflow-hidden bg-[#FBFBFC]">
          <Image
            src="/civicos-mobile-home.png"
            alt="CivicOS Citizen Mobile Operating System"
            fill
            className="object-cover object-top"
            priority
          />
        </div>
      </div>
    </motion.div>
  );
}
