"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Mark } from "./Mark";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Typography } from "./ui/Typography";
import { buttonVariants } from "./ui/Button";
import { Magnetic } from "./ui/Magnetic";

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const BASE_SCENES = [
  // mountains.png has a Mark-shaped cutout — needs the sky image behind it to fill that hole.
  // Always first: kept fixed as the opening scene, the rest shuffle around it.
  { src: "/mountains.png", alt: "Mountain range at golden hour", base: "/hero_image_upscale.png" },
  { src: "/trees.png", alt: "Sunlit forest canopy" },
  { src: "/valcano.png", alt: "Erupting volcano at dusk" },
  { src: "/earth.png", alt: "Earth viewed from orbit" },
];

const ROTATE_INTERVAL_MS = 10 * 1000;

function shuffleRest<T>(scenes: T[]): T[] {
  const [first, ...rest] = scenes;
  for (let i = rest.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rest[i], rest[j]] = [rest[j], rest[i]];
  }
  return [first, ...rest];
}

export function HeroScene() {
  const [scenes, setScenes] = useState(BASE_SCENES);
  const [[page, direction], setPage] = useState([0, 0]);

  const wrapIndex = (i: number) => ((i % scenes.length) + scenes.length) % scenes.length;
  const activeScene = wrapIndex(page);

  // Render a window of 5 scenes around the current page to ensure adjacent images are always physically present.
  const renderItems = [];
  for (let i = page - 2; i <= page + 2; i++) {
    renderItems.push({
      pageIndex: i,
      scene: scenes[wrapIndex(i)]
    });
  }

  // Shuffle client-side only, after hydration — randomizing during the
  // initial render would mismatch the server-rendered order.
  useEffect(() => {
    setScenes((s) => shuffleRest(s));
  }, []);

  // Keyed on page so a manual prev/next/dot pick restarts the countdown
  useEffect(() => {
    const id = setTimeout(() => {
      setPage([page + 1, 1]);
    }, ROTATE_INTERVAL_MS);
    return () => clearTimeout(id);
  }, [page, scenes.length]);

  const prevScene = () => setPage([page - 1, -1]);
  const nextScene = () => setPage([page + 1, 1]);
  const jumpToScene = (i: number) => {
    setPage([i, i > activeScene ? 1 : -1]);
  };

  return (
    <div 
      className="relative w-full flex items-center justify-center px-4 overflow-hidden pt-40 pb-20"
      style={{ 
        minHeight: 'calc(100vh + env(safe-area-inset-top, 0px) + env(safe-area-inset-bottom, 0px))', 
        marginTop: 'calc(-1 * env(safe-area-inset-top, 0px))' 
      }}
    >
      {/* Background Layering */}
      <div className="absolute inset-0 z-0">
        {/* Layer 1: Infinite physical slider track */}
        <motion.div
          className="absolute inset-0 cursor-grab active:cursor-grabbing touch-pan-y"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          animate={{ x: `${page * -100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              nextScene();
            } else if (swipe > swipeConfidenceThreshold) {
              prevScene();
            }
          }}
        >
          {renderItems.map((item) => (
            <div
              key={item.pageIndex}
              className="absolute top-0 bottom-0 w-full h-full"
              style={{ left: `${item.pageIndex * 100}%` }}
            >
              {item.scene.base && (
                <Image src={item.scene.base} alt="" fill className="object-cover" priority={item.pageIndex === page} draggable={false} />
              )}
              <Image
                src={item.scene.src}
                alt={item.scene.alt}
                fill
                className="object-cover"
                priority={item.pageIndex === page}
                draggable={false}
              />
            </div>
          ))}
        </motion.div>

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
            {scenes.map((scene, i) => (
              <button
                key={scene.src}
                onClick={() => jumpToScene(i)}
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

      <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-20 pointer-events-none animate-fade-in" style={{ animationDelay: "0.8s" }}>
        <Typography variant="body" className="text-white/40 text-xs tracking-[0.3em] font-medium uppercase">
          EST 2026
        </Typography>
      </div>
    </div>
  );
}
