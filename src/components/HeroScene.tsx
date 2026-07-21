"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HeroScene() {
  const stageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 1,
          pin: true,
        },
      });

      // Only ever animate transform (never opacity) so scrolling past the
      // pin's end leaves a clean, fully legible resting frame — not a
      // half-faded mid-transition state.
      tl.to(imageRef.current, { scale: 1.16, rotateX: 5, ease: "none" }, 0).to(
        headlineRef.current,
        { yPercent: -14, ease: "none" },
        0
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={stageRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ perspective: "1400px" }}
    >
      <div
        ref={imageRef}
        className="absolute inset-0"
        style={{ transformOrigin: "center 65%", willChange: "transform" }}
      >
        <Image
          src="/hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f5f5f5]/60 via-transparent to-[#f5f5f5]/20" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-20">
        <h1
          ref={headlineRef}
          className="max-w-3xl font-display font-light text-[#0c0a09] text-[13vw] md:text-[96px] leading-[1.05] tracking-[-1.92px]"
          style={{ willChange: "transform" }}
        >
          Building
          <br />
          what matters.
        </h1>
      </div>
    </div>
  );
}
