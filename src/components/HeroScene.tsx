import { Mark } from "./Mark";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "./ui/Typography";
import { buttonVariants } from "./ui/Button";
import { Magnetic } from "./ui/Magnetic";

export function HeroScene() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 overflow-hidden pt-32 pb-20">
      {/* Background Layering */}
      <div className="absolute inset-0 z-0">
        {/* Layer 1: Base Image (acts as sky and patches holes) */}
        <Image
          src="/hero_image_upscale.png"
          alt="Base Background"
          fill
          className="object-cover"
          priority
        />
        
        {/* Layer 2: Giant Logo */}
        <div className="absolute inset-0 flex items-start justify-end pointer-events-none pt-24 pr-12 md:pt-16 md:pr-40">
          <Mark className="w-[250px] md:w-[450px] h-auto text-white opacity-80 animate-fade-up -translate-y-8" style={{ animationDelay: "0.2s" }} />
        </div>

        {/* Layer 3: Mountains Foreground */}
        <Image
          src="/mountains.png"
          alt="Mountains Foreground"
          fill
          className="object-cover"
          priority
        />
        
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
        
        <h1 className="font-display font-light text-white text-[14vw] md:text-[96px] leading-[1.05] tracking-[-1.92px] text-center max-w-[900px] animate-fade-up" style={{ animationDelay: "0.1s" }}>
          Building <br className="md:hidden" />
          what matters.
        </h1>

        <Typography
          variant="body"
          className="animate-fade-up mt-8 max-w-xl text-center text-white/85 text-lg md:text-xl"
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
            <a
              href="mailto:officialsariv@gmail.com"
              className={buttonVariants({ variant: "secondary", className: "border-transparent bg-white text-primary hover:bg-white/90" })}
            >
              Get in touch
            </a>
          </Magnetic>
        </div>
      </div>
    </div>
  );
}
