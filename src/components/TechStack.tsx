"use client";

import React, { useRef } from "react";
import { 
  motion, 
  useScroll, 
  useSpring, 
  useTransform, 
  useMotionValue, 
  useVelocity, 
  useAnimationFrame 
} from "framer-motion";
import { Typography } from "@/components/ui/Typography";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { 
  SiNextdotjs,
  SiNodedotjs,
  SiSupabase,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiPython,
  SiSwift,
  SiPytorch,
  SiPandas
} from "react-icons/si";

const TECH_LOGOS = [
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Supabase", icon: SiSupabase },
  { name: "HTML5", icon: SiHtml5 },
  { name: "CSS3", icon: SiCss },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Python", icon: SiPython },
  { name: "Swift", icon: SiSwift },
  { name: "PyTorch", icon: SiPytorch },
  { name: "Pandas", icon: SiPandas },
];

/**
 * Helper to wrap a value between min and max.
 */
function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

export function TechStack() {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 3], {
    clamp: false
  });

  // Base speed (percentage per second)
  const baseVelocity = -1.5;
  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // Change direction based on scroll velocity
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    // Accelerate based on scroll speed
    moveBy += directionFactor.current * moveBy * Math.abs(velocityFactor.get());

    // Wrap the value between 0 and -50 (percent)
    baseX.set(wrap(-50, 0, baseX.get() + moveBy));
  });

  // We need to render the logos multiple times to ensure we have enough width for 50%
  // so we can seamlessly loop.
  // Rendering 4 sets guarantees we can smoothly wrap at -50% without showing blank space,
  // depending on screen size. But a flex w-max with 2 sets of [items] works if we wrap at -50%.
  // Wait, if it wraps at -50%, it expects the container to be exactly twice the width of the unique items.
  // We can just use the transform directly on a flex row.
  const x = useTransform(baseX, (v) => `${v}%`);

  return (
    <section className="py-24 md:py-32 border-t border-b border-border bg-surface overflow-hidden relative">
      <ScrollReveal>
        <div className="max-w-4xl mx-auto text-center px-4 mb-16">
          <Typography variant="heading" className="text-sm tracking-widest uppercase text-muted mb-4">
            Built with
          </Typography>
          <Typography variant="display" className="text-4xl md:text-5xl">
            Modern technologies for exceptional experiences.
          </Typography>
        </div>
      </ScrollReveal>

      <div className="relative flex overflow-hidden w-full group py-4">
        <motion.div 
          className="flex w-max" 
          style={{ x }}
        >
          {/* First Set */}
          <div className="flex w-max">
            {TECH_LOGOS.map((tech, i) => (
              <div 
                key={`${tech.name}-${i}`} 
                className="flex items-center justify-center gap-4 px-8 md:px-12 opacity-50 hover:opacity-100 transition-opacity duration-300"
              >
                <tech.icon className="w-10 h-10 md:w-14 md:h-14" />
                <Typography variant="body" className="text-2xl md:text-3xl font-medium whitespace-nowrap">
                  {tech.name}
                </Typography>
              </div>
            ))}
          </div>
          
          {/* Second Set */}
          <div className="flex w-max">
            {TECH_LOGOS.map((tech, i) => (
              <div 
                key={`${tech.name}-copy-${i}`} 
                className="flex items-center justify-center gap-4 px-8 md:px-12 opacity-50 hover:opacity-100 transition-opacity duration-300"
              >
                <tech.icon className="w-10 h-10 md:w-14 md:h-14" />
                <Typography variant="body" className="text-2xl md:text-3xl font-medium whitespace-nowrap">
                  {tech.name}
                </Typography>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Gradient fades on edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-surface to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-surface to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
