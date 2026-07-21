"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mark } from "./Mark";

gsap.registerPlugin(ScrollTrigger);

export function HeroScene() {
  const stageRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top top",
          end: "+=125%",
          scrub: 1,
          pin: true,
        },
      });

      tl.to(markRef.current, { rotateY: 360, rotateX: 14, z: 140, scale: 1.3, ease: "none" }, 0)
        .to(line1Ref.current, { yPercent: -55, z: 60, opacity: 0.2, ease: "none" }, 0)
        .to(line2Ref.current, { yPercent: 35, z: -50, ease: "none" }, 0)
        .to(orbRef.current, { scale: 1.5, opacity: 0.4, ease: "none" }, 0);
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={stageRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      style={{ perspective: "1400px" }}
    >
      <div ref={orbRef} className="gradient-orb absolute inset-0" />
      <div className="relative z-10 flex flex-col items-center" style={{ transformStyle: "preserve-3d" }}>
        <div ref={markRef} className="mb-8" style={{ transformStyle: "preserve-3d", willChange: "transform" }}>
          <Mark className="size-24 md:size-40 text-[#0c0a09]" />
        </div>
        <h1
          className="font-display font-light text-[#0c0a09] text-[13vw] md:text-[96px] leading-[1.05] tracking-[-1.92px] text-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          <span ref={line1Ref} className="block" style={{ willChange: "transform" }}>
            Building
          </span>
          <span ref={line2Ref} className="block" style={{ willChange: "transform" }}>
            what matters.
          </span>
        </h1>
      </div>
    </div>
  );
}
