"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Mark } from "./Mark";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "./ui/Typography";
import { buttonVariants } from "./ui/Button";
import { Magnetic } from "./ui/Magnetic";

const SCENES = [
  { src: "/trees.png", alt: "Sunlit forest canopy" },
  { src: "/valcano.png", alt: "Erupting volcano at dusk" },
  { src: "/earth.png", alt: "Earth viewed from orbit" },
  // mountains.png has a Mark-shaped cutout — needs the sky image behind it to fill that hole.
  { src: "/mountains.png", alt: "Mountain range at golden hour", base: "/hero_image_upscale.png" },
];

// ponytail: fixed rotation, no user control requested — bump this if "a few minutes" needs tuning.
const ROTATE_INTERVAL_MS = 3 * 60 * 1000;

export function HeroScene() {
  const [activeScene, setActiveScene] = useState(0);

  // Keyed on activeScene so a manual prev/next/dot pick restarts the countdown
  // instead of auto-advancing a moment later.
  useEffect(() => {
    const id = setTimeout(() => {
      setActiveScene((i) => (i + 1) % SCENES.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearTimeout(id);
  }, [activeScene]);

  const prevScene = () => setActiveScene((i) => (i - 1 + SCENES.length) % SCENES.length);
  const nextScene = () => setActiveScene((i) => (i + 1) % SCENES.length);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 overflow-hidden pt-32 pb-20">
      {/* Background Layering */}
      <div className="absolute inset-0 z-0">
        {/* Layer 1: Rotating hero scene, crossfaded */}
        {SCENES.map((scene, i) => (
          <div
            key={scene.src}
            className={`absolute inset-0 transition-opacity duration-500 ease-out ${
              i === activeScene ? "opacity-100" : "opacity-0"
            }`}
          >
            {scene.base && (
              <Image src={scene.base} alt="" fill className="object-cover" priority={i === 0} />
            )}
            <Image
              src={scene.src}
              alt={scene.alt}
              fill
              className="object-cover"
              priority={i === 0 && !scene.base}
            />
          </div>
        ))}

        {/* Paper Shader Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.65] mix-blend-multiply">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <filter id="paper-texture" x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
              <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.15 0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#paper-texture)" />
          </svg>
        </div>
      </div>

      {/* Background ambient gradient orb */}
      <div className="absolute inset-0 gradient-orb opacity-50 animate-fade-in z-0 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center w-full mt-24">

        <Mark
          className="w-20 h-20 md:w-28 md:h-28 text-white mix-blend-difference animate-fade-up mb-6"
          style={{ animationDelay: "0s" }}
        />

        <h1
          className="font-display font-light text-white text-[14vw] md:text-[96px] leading-[1.05] tracking-[-1.92px] text-center max-w-[900px] animate-fade-up [text-shadow:0_4px_30px_rgba(0,0,0,0.6)]"
          style={{ animationDelay: "0.1s" }}
        >
          Building <br className="md:hidden" />
          what matters.
        </h1>

        <Typography
          variant="body"
          className="animate-fade-up mt-8 max-w-xl text-center text-white/85 text-lg md:text-xl [text-shadow:0_2px_16px_rgba(0,0,0,0.55)]"
          style={{ animationDelay: "0.2s" }}
        >
          We design and build digital products that feel timeless, intentional, and technically
          exceptional. We don&apos;t chase trends. We build products people remember.
        </Typography>

        <div className="animate-fade-up mt-8 flex gap-4" style={{ animationDelay: "0.3s" }}>
          <Magnetic strength={25}>
            <Link href="/work" className={buttonVariants({ variant: "primary" })}>
              View Work
            </Link>
          </Magnetic>
          <Magnetic strength={25}>
            <Link
              href="/contact"
              className={buttonVariants({ variant: "secondary", className: "border-transparent bg-white text-primary hover:bg-white/90" })}
            >
              Get in touch
            </Link>
          </Magnetic>
        </div>

        <div
          className="animate-fade-up mt-10 flex items-center gap-5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
          style={{ animationDelay: "0.4s" }}
        >
          <button
            onClick={prevScene}
            aria-label="Previous scene"
            className="text-white/60 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            {SCENES.map((scene, i) => (
              <button
                key={scene.src}
                onClick={() => setActiveScene(i)}
                aria-label={`Show ${scene.alt}`}
                aria-current={i === activeScene}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeScene ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextScene}
            aria-label="Next scene"
            className="text-white/60 hover:text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
