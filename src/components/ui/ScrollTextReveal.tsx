"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";

interface ScrollTextRevealProps {
  text: string;
  className?: string;
}

export function ScrollTextReveal({ text, className }: ScrollTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll over the entire 150vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Track from when the top of the container hits the top of the viewport
    // until the bottom of the container hits the bottom of the viewport
    offset: ["start start", "end end"]
  });

  const words = text.split(" ");

  // The entire text block fades out at the very end of the scroll (80% to 100%)
  const blockOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);
  const blockY = useTransform(scrollYProgress, [0.8, 1], [0, -50]);

  return (
    // Tall container creates scrollable space (150vh means 50vh of extra scrolling)
    <div ref={containerRef} className={cn("h-[150vh] relative", className)}>
      {/* Sticky container locks to viewport */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ opacity: blockOpacity, y: blockY }}
          className="px-4 md:px-20 w-full flex justify-center"
        >
          <Typography 
            variant="heading" 
            className="text-4xl md:text-5xl lg:text-7xl leading-[1.1] max-w-[1200px] text-center"
            data-cursor="text"
          >
            {words.map((word, i) => {
              // Word fade in happens during 0% -> 60% of the total container scroll
              const transitionLength = 0.15; 
              // start ranges from 0 to (0.6 - 0.15 = 0.45)
              const start = (i / Math.max(1, words.length - 1)) * (0.6 - transitionLength);
              const end = start + transitionLength;
              
              return (
                <React.Fragment key={i}>
                  <Word progress={scrollYProgress} range={[start, end]}>
                    {word}
                  </Word>
                  {i < words.length - 1 && " "}
                </React.Fragment>
              );
            })}
          </Typography>
        </motion.div>
      </div>
    </div>
  );
}

function Word({ children, progress, range }: { children: string, progress: MotionValue<number>, range: [number, number] }) {
  // Map opacity from 0 to 1
  const opacity = useTransform(progress, range, [0, 1]);
  // Map vertical position from 20px down, up to 0
  const y = useTransform(progress, range, [20, 0]);
  // Map blur from 10px to 0px
  const filter = useTransform(progress, range, ["blur(10px)", "blur(0px)"]);
  
  return (
    <motion.span style={{ opacity, y, filter, willChange: "opacity, transform, filter" }} className="inline-block">
      {children}
    </motion.span>
  );
}
