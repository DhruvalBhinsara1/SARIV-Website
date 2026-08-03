"use client";

import { useEffect, useState } from "react";
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
  { src: "/mountains.png", alt: "Mountain range at golden hour", base: "/hero_image_upscale.png" },
  { src: "/winter.png", alt: "Winter village with aurora" },
  { src: "/lake.png", alt: "Lake and mountains at sunset" },
  { src: "/bridge.png", alt: "Autumn forest bridge" },
];

export function HeroScene() {
  const [dailyIndex, setDailyIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Calculate the current day since epoch
    const epochDays = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    setDailyIndex(epochDays % SCENES.length);
    setIsMounted(true);
  }, []);

  const scene = SCENES[dailyIndex];

  // During SSR, we render the first scene as a fallback to avoid hydration errors.
  // We use opacity transition so the switch to the daily image is seamless once hydrated.

  return (
    <div
      className="relative w-full flex items-center justify-center px-4 overflow-hidden pt-40 pb-20"
      style={{
        minHeight: 'calc(100vh + env(safe-area-inset-top, 0px) + env(safe-area-inset-bottom, 0px))',
        marginTop: 'calc(-1 * env(safe-area-inset-top, 0px))'
      }}
    >
      {/* Background Layering */}
      <div className="absolute inset-0 z-0 bg-black">
        {SCENES.map((s, i) => (
          <div
            key={s.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${(isMounted && i === dailyIndex) || (!isMounted && i === 0) ? "opacity-100" : "opacity-0"
              }`}
          >
            {s.base && (
              <Image src={s.base} alt="" fill className="object-cover" priority={i === 0 || i === dailyIndex} draggable={false} />
            )}
            <Image
              src={s.src}
              alt={s.alt}
              fill
              className="object-cover"
              priority={i === 0 || i === dailyIndex}
              draggable={false}
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
          className="animate-fade-up mt-8 max-w-xl text-center text-lg md:text-xl leading-relaxed"
          style={{ animationDelay: "0.2s" }}
        >
          <span className="bg-black/70 backdrop-blur-md text-white px-2 py-1 box-decoration-clone">
            We design and build digital products that feel timeless, intentional, and technically
            exceptional. We don&apos;t chase trends. We build products people remember.
          </span>
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
      </div>

      <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-20 pointer-events-none animate-fade-in" style={{ animationDelay: "0.8s" }}>
        <Typography variant="body" className="text-white/40 text-xs tracking-[0.3em] font-medium uppercase">
          EST 2026
        </Typography>
      </div>
    </div>
  );
}
