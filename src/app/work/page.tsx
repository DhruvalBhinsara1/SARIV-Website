import Image from "next/image";
import Link from "next/link";
import { Typography } from "@/components/ui/Typography";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArrowRight } from "lucide-react";

export default function WorkPage() {
  return (
    <main className="w-full bg-background h-screen flex flex-col justify-center pt-20 pb-4 md:pt-24 md:pb-8">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 mb-3 md:mb-6 shrink-0">
        <ScrollReveal>
          <Typography variant="heading" className="text-2xl md:text-5xl">
            Our Work
          </Typography>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <Typography variant="body" className="mt-1.5 md:mt-3 max-w-2xl text-xs md:text-base line-clamp-2 md:line-clamp-none">
            We don&apos;t build generic products. We engineer precise, enduring tools designed to empower focused work. Here are our flagship projects.
          </Typography>
        </ScrollReveal>
      </div>

      {/*
        Mobile (2-col, 3-row):
          Row 1: FreeFlow spans full width (col-span-2)
          Row 2: NexaBrew | CoreDefenses
          Row 3: Traveloop | CTA

        Desktop lg (3-col, 2-row):
          Col 1 rows 1–2: FreeFlow (tall left column)
          Col 2 row 1: NexaBrew
          Col 3 row 1: CoreDefenses
          Col 2 row 2: Traveloop
          Col 3 row 2: CTA (col-span-1 on lg, overrides mobile col-span-1)
      */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 w-full flex-1 min-h-0 grid grid-cols-2 lg:grid-cols-3 grid-rows-[1.6fr_1fr_1fr] lg:grid-rows-2 gap-2.5 md:gap-4">

        {/* FreeFlow — spans full width on mobile (col-span-2), left tall column on desktop (col-span-1 row-span-2) */}
        <ScrollReveal delay={0.1} className="col-span-2 lg:col-span-1 lg:row-span-2 min-h-0">
          <Link href="/products/freeflow" className="block w-full h-full group">
            <div className="w-full h-full rounded-2xl md:rounded-[2rem] bg-surface-elevated border border-border overflow-hidden flex flex-col relative transition-all duration-500 hover:border-primary/50 hover:shadow-elevation">
              <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
                <Image
                  src="/freeflow-ui.png"
                  alt="FreeFlow"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-left-top opacity-60 group-hover:opacity-90 transition-all duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
              <div className="relative z-20 mt-auto p-5 md:p-8 lg:p-10 flex flex-row items-end justify-between gap-4">
                <div>
                  <Image src="/freeflow-logo.png" alt="FreeFlow" width={160} height={40} className="w-28 md:w-36 mb-3 md:mb-5 drop-shadow-md" />
                  <Typography variant="subheading" className="text-white/90 text-xs md:text-sm lg:text-base line-clamp-3 md:line-clamp-4 max-w-xs">
                    A native macOS application engineered to capture and render buttery-smooth, auto-zooming product demos. Privacy-first, completely non-destructive, and visually stunning.
                  </Typography>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </div>
              </div>
            </div>
          </Link>
        </ScrollReveal>

        {/* NexaBrew */}
        <ScrollReveal delay={0.15} className="col-span-1 min-h-0">
          <a href="https://nexabrew.vercel.app" target="_blank" rel="noopener noreferrer" className="block w-full h-full group">
            <div className="w-full h-full rounded-2xl md:rounded-[2rem] bg-surface-elevated border border-border overflow-hidden flex flex-col relative transition-all duration-500 hover:border-primary/50 hover:shadow-elevation">
              <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
                <Image
                  src="/nexabrew.jpeg"
                  alt="NexaBrew"
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover opacity-60 group-hover:opacity-90 transition-all duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
              <div className="relative z-20 p-3 md:p-6 flex flex-col h-full justify-end">
                <Typography variant="caption" transform="uppercase" className="text-white/70 mb-0.5 md:mb-1.5 block font-medium tracking-widest text-[9px] md:text-[10px] lg:text-xs">
                  Client Project
                </Typography>
                <Typography variant="heading" className="text-white mb-1 md:mb-2 text-base md:text-xl lg:text-2xl">
                  NexaBrew
                </Typography>
                <Typography variant="body" className="text-white/80 text-[10px] md:text-xs lg:text-sm line-clamp-2">
                  A real-time cafe POS, kitchen display, and management system built for the floor.
                </Typography>
              </div>
            </div>
          </a>
        </ScrollReveal>

        {/* Core Defenses */}
        <ScrollReveal delay={0.2} className="col-span-1 min-h-0">
          <a href="https://www.core-defenses.com/" target="_blank" rel="noopener noreferrer" className="block w-full h-full group">
            <div className="w-full h-full rounded-2xl md:rounded-[2rem] bg-surface-elevated border border-border overflow-hidden flex flex-col relative transition-all duration-500 hover:border-primary/50 hover:shadow-elevation">
              <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
                <Image
                  src="/core-defenses.png"
                  alt="Core Defenses"
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-[80%_center] opacity-60 group-hover:opacity-90 transition-all duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
              <div className="relative z-20 p-3 md:p-6 flex flex-col h-full justify-end">
                <Typography variant="caption" transform="uppercase" className="text-white/70 mb-0.5 md:mb-1.5 block font-medium tracking-widest text-[9px] md:text-[10px] lg:text-xs">
                  Client Project
                </Typography>
                <Typography variant="heading" className="text-white mb-1 md:mb-2 text-base md:text-xl lg:text-2xl">
                  Core Defenses
                </Typography>
                <Typography variant="body" className="text-white/80 text-[10px] md:text-xs lg:text-sm line-clamp-2">
                  Architecting the digital presence for next-generation defense.
                </Typography>
              </div>
            </div>
          </a>
        </ScrollReveal>

        {/* Traveloop */}
        <ScrollReveal delay={0.25} className="col-span-1 min-h-0">
          <a href="https://github.com/DhruvalBhinsara1/traveloop" target="_blank" rel="noopener noreferrer" className="block w-full h-full group">
            <div className="w-full h-full rounded-2xl md:rounded-[2rem] bg-surface-elevated border border-border overflow-hidden flex flex-col relative transition-all duration-500 hover:border-primary/50 hover:shadow-elevation">
              <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
                <Image
                  src="/traveloop.jpeg"
                  alt="Traveloop"
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top opacity-60 group-hover:opacity-90 transition-all duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
              <div className="relative z-20 p-3 md:p-6 flex flex-col h-full justify-end">
                <Typography variant="caption" transform="uppercase" className="text-white/70 mb-0.5 md:mb-1.5 block font-medium tracking-widest text-[9px] md:text-[10px] lg:text-xs">
                  Side Project
                </Typography>
                <Typography variant="heading" className="text-white mb-1 md:mb-2 text-base md:text-xl lg:text-2xl">
                  Traveloop
                </Typography>
                <Typography variant="body" className="text-white/80 text-[10px] md:text-xs lg:text-sm line-clamp-2">
                  A trip-planning app for building itineraries, tracking budgets, and splitting costs with your crew.
                </Typography>
              </div>
            </div>
          </a>
        </ScrollReveal>

        {/* Start Project — spans 1 col on mobile, 1 col on desktop (sits right of Traveloop) */}
        <ScrollReveal delay={0.3} className="col-span-1 min-h-0">
          <div className="w-full h-full rounded-2xl md:rounded-[2rem] bg-primary text-surface p-4 md:p-7 lg:p-8 flex flex-col justify-between relative overflow-hidden group shadow-elevation">
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />
            <div className="relative z-10">
              <Typography variant="caption" transform="uppercase" className="text-surface/80 mb-1.5 md:mb-3 block font-medium tracking-widest text-[9px] md:text-[10px] lg:text-xs">
                Available for Work
              </Typography>
              <Typography variant="display" className="text-surface text-xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight">
                Start a<br />Project
              </Typography>
            </div>
            <Link href="/start-project" className="relative z-10 mt-3 md:mt-6 flex items-center gap-2 bg-surface text-primary px-4 md:px-5 py-2 md:py-3 rounded-full font-medium text-xs md:text-sm w-fit group-hover:bg-surface/90 transition-colors shadow-sm">
              <span>Get in touch</span>
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
        
      </div>
    </main>
  );
}
