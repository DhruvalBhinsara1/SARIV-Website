"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export function Statement({
  label,
  text,
  highlightText,
  className,
}: {
  label: string;
  text: string;
  highlightText?: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0.5, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0.5, 1], [20, 0]);

  return (
    <section 
      ref={containerRef}
      className={cn("relative py-24 md:py-32 overflow-hidden", className)}
    >
      {/* Decorative vertical line that draws down as you scroll */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border/40 -translate-x-1/2">
        <motion.div 
          className="w-full bg-primary/20 origin-top"
          style={{ height: "100%", scaleY }}
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-8 relative z-10">
        <motion.div 
          style={{ opacity, y }}
          className="max-w-4xl mx-auto text-center bg-background/80 backdrop-blur-sm py-12 px-6 rounded-[2rem] border border-border shadow-elevation"
        >
          <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-surface-elevated text-[11px] font-mono uppercase tracking-widest text-muted mb-8">
            {label}
          </span>
          <p className="font-display font-normal text-[clamp(28px,4vw,56px)] leading-[1.1] tracking-[-0.02em] text-primary">
            {text}
            {highlightText && (
              <>
                <br className="hidden md:block" />
                <span className="text-secondary">{highlightText}</span>
              </>
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
