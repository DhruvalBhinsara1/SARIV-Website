import Image from "next/image";
import Link from "next/link";
import { Typography } from "@/components/ui/Typography";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArrowRight } from "lucide-react";

export default function WorkPage() {
  return (
    <main className="flex-1 w-full bg-background pt-32 pb-24">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 mb-24">
        <ScrollReveal>
          <Typography variant="display">
            Our Work
          </Typography>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <Typography variant="body" className="mt-8 max-w-2xl text-lg md:text-xl">
            We don&apos;t build generic products. We engineer precise, enduring tools designed to empower focused work. Here are our flagship projects.
          </Typography>
        </ScrollReveal>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-[360px]">
        
        {/* FreeFlow - Large Tile */}
        <ScrollReveal delay={0.1} className="lg:col-span-2 lg:row-span-2">
          <Link href="/products/freeflow" className="block w-full h-full group">
            <div className="w-full h-full rounded-[2rem] bg-surface-elevated border border-border overflow-hidden flex flex-col relative transition-all duration-500 hover:border-primary/50 hover:shadow-elevation">
              <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
                <Image
                  src="/freeflow-ui.png"
                  alt="FreeFlow"
                  fill
                  className="object-cover object-left-top opacity-60 group-hover:opacity-90 transition-all duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
              <div className="relative z-20 mt-auto p-8 md:p-12 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
                <div className="max-w-xl">
                  <Image src="/freeflow-logo.png" alt="FreeFlow" width={200} height={50} className="w-40 mb-6 drop-shadow-md" />
                  <Typography variant="subheading" className="text-white/90">
                    A native macOS application engineered to capture and render buttery-smooth, auto-zooming product demos. Privacy-first, completely non-destructive, and visually stunning.
                  </Typography>
                </div>
                <div className="w-14 h-14 rounded-full bg-white text-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>
            </div>
          </Link>
        </ScrollReveal>

        {/* Core Defenses - Square Tile */}
        <ScrollReveal delay={0.2} className="col-span-1 row-span-1">
          <a href="https://www.core-defenses.com/" target="_blank" rel="noopener noreferrer" className="block w-full h-full group">
            <div className="w-full h-full rounded-[2rem] bg-surface-elevated border border-border overflow-hidden flex flex-col relative transition-all duration-500 hover:border-primary/50 hover:shadow-elevation">
              <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
                <Image
                  src="/core-defenses.png"
                  alt="Core Defenses"
                  fill
                  className="object-cover object-[80%_center] opacity-60 group-hover:opacity-90 transition-all duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
              <div className="relative z-20 mt-auto p-8 flex flex-col h-full justify-end">
                <Typography variant="caption" transform="uppercase" className="text-white/70 mb-2 block font-medium tracking-widest">
                  Client Project
                </Typography>
                <Typography variant="heading" className="text-white mb-3 text-2xl md:text-3xl">
                  Core Defenses
                </Typography>
                <Typography variant="body" className="text-white/80 text-sm line-clamp-3">
                  Architecting the digital presence for next-generation defense. A high-performance, cinematic marketing experience.
                </Typography>
              </div>
            </div>
          </a>
        </ScrollReveal>

        {/* Start Project - Typography Tile */}
        <ScrollReveal delay={0.3} className="col-span-1 row-span-1">
          <div className="w-full h-full rounded-[2rem] bg-primary text-surface p-8 md:p-10 flex flex-col justify-between relative overflow-hidden group shadow-elevation">
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />
            <div className="relative z-10">
              <Typography variant="caption" transform="uppercase" className="text-surface/80 mb-4 block font-medium tracking-widest">
                Available for Work
              </Typography>
              <Typography variant="display" className="text-4xl xl:text-5xl leading-tight">
                Start a<br />Project
              </Typography>
            </div>
            <Link href="/contact" className="relative z-10 mt-8 flex items-center justify-between bg-surface text-primary px-6 py-4 rounded-full font-medium group-hover:bg-surface/90 transition-colors shadow-sm">
              <span>Get in touch</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
        
      </div>
    </main>
  );
}
