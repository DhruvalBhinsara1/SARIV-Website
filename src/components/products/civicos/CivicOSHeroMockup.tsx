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
      <div className="absolute -bottom-6 -right-2 md:-bottom-10 md:-right-6 w-[42%] md:w-[36%] aspect-[9/17.5] bg-[#0E0E10] border-2 border-white/20 rounded-[1.75rem] md:rounded-[2.25rem] overflow-hidden p-1.5 md:p-2 shadow-2xl shadow-black/80 z-20 transition-transform duration-500 hover:scale-[1.03]">
        {/* Dynamic Island / Speaker notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-12 md:w-16 h-3 md:h-4 bg-black rounded-full z-30 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-white/10" />
        </div>
        
        <div className="relative w-full h-full rounded-[1.25rem] md:rounded-[1.75rem] overflow-hidden bg-black">
          <Image
            src="/civicos-mobile-real.jpg"
            alt="CivicOS Citizen AI Assistant Mobile App Interface"
            fill
            className="object-cover object-center"
          />
        </div>
      </div>
    </motion.div>
  );
}
