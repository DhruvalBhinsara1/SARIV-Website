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
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Start tracking when the container enters the bottom 80% of the viewport.
    // End tracking when the container reaches the top 40% of the viewport.
    offset: ["start 80%", "end 40%"]
  });

  const words = text.split(" ");

  return (
    <div ref={containerRef} className={className}>
      <Typography 
        variant="heading" 
        className="text-4xl md:text-5xl lg:text-7xl leading-[1.1] max-w-[1200px] text-center"
        data-cursor="text"
      >
        {words.map((word, i) => {
          // Calculate a slice of the 0 to 1 scroll progress for this specific word.
          // By extending the end point, multiple words will be in a state of partial 
          // opacity at the same time, creating a much smoother gradient blending effect.
          const step = 1 / words.length;
          const start = i * step;
          const end = start + (step * 5); // 5 words overlapping in transition
          
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
    </div>
  );
}

function Word({ children, progress, range }: { children: string, progress: MotionValue<number>, range: [number, number] }) {
  // Map this word's specific progress range (e.g. 0.1 to 0.2) to an opacity of 0.2 to 1
  const opacity = useTransform(progress, range, [0.15, 1]);
  
  return (
    <motion.span style={{ opacity }} className="inline-block transition-opacity duration-150">
      {children}
    </motion.span>
  );
}
