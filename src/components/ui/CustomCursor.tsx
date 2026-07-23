"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [isTouch, setIsTouch] = useState(true);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 400, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    
    setIsTouch(false);

    const handleMouseMove = (e: MouseEvent) => {
      setHidden(false);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      // Check if we are hovering over something interactive, text elements, or media/svgs
      const isInteractive = !!target.closest('a, button, input, textarea, select, [role="button"], label, [data-cursor], h1, h2, h3, h4, h5, h6, p, span, li, svg, img, video, text');
      setIsHovered(isInteractive);
    };

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  if (isTouch) {
    return null;
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (pointer: fine) {
          body, *, a, button, input, textarea, select {
            cursor: none !important;
          }
        }
      `}} />
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 bg-white rounded-full pointer-events-none z-[99999] mix-blend-difference flex items-center justify-center overflow-hidden will-change-transform"
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1 : 0.25,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ scale: { type: "spring", stiffness: 300, damping: 20 }, opacity: { duration: 0.2 } }}
      >
      </motion.div>
    </>
  );
}
