import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { buttonVariants } from "@/components/ui/Button";
import { Mark } from "@/components/Mark";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — SARIV",
  description:
    "SARIV is an independent software studio. We partner with a few select teams each year to build digital tools that feel intuitive, fast, and crafted with care.",
};

const CAPABILITIES = [
  {
    category: "Full-stack products",
    description: "From a blank canvas to a polished launch, we design and build complete web applications.",
  },
  {
    category: "Internal tools",
    description: "We replace messy spreadsheets and slow workflows with fast, custom software your team will love using.",
  },
  {
    category: "Thoughtful AI",
    description: "We integrate AI in places where it actually saves time and removes friction—never just for the sake of it.",
  },
];

export default function AboutPage() {
  return (
    <main className="flex-1 w-full bg-background">
      {/* ── 1. HERO ────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[85vh] flex flex-col justify-start overflow-hidden bg-background pt-40 md:pt-48 pb-20">
        <div className="absolute inset-0 z-0 opacity-40 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 z-0 overflow-hidden pointer-events-none select-none flex justify-end">
          <span className="text-[22vw] font-bold leading-[0.82] tracking-tighter text-neutral-200 pr-[1vw]">
            SARIV
          </span>
        </div>
        
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-8 w-full">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-10">
              <Mark className="w-4 h-4 text-secondary" />
              <span className="font-body text-secondary uppercase tracking-[0.25em] text-[11px] font-semibold">
                About SARIV
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="font-display font-normal text-primary text-[clamp(44px,6.5vw,96px)] leading-[0.93] tracking-[-0.025em] max-w-4xl mb-8">
              We build software for humans.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="font-body text-secondary text-lg md:text-xl max-w-lg leading-relaxed">
              SARIV is an independent studio. We partner with a few select teams each year to build digital tools that feel intuitive, fast, and crafted with care.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 2. THE STORY & VALUES ──────────────────────────────── */}
      <section className="border-t border-border py-20 md:py-32 bg-surface-elevated">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <ScrollReveal>
              <div>
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted block mb-8">
                  Our Story
                </span>
                <div className="flex flex-col gap-6 font-body text-secondary text-[17px] md:text-lg leading-[1.75]">
                  <p>
                    We started SARIV because we were tired of encountering software that felt broken, bloated, or overly complicated. You probably know the kind—products shipped in a rush, with confusing interfaces and frustrating bugs.
                  </p>
                  <p>
                    We believe technology should make your day easier, not harder. That means thinking deeply about the people actually using the tool, designing interfaces that get out of the way, and writing code that lasts.
                  </p>
                  <p className="text-primary">
                    We're a small team, and we like it that way. It means we can give every project the undivided attention it deserves, treating your product as if it were our own.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div>
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted block mb-8">
                  How We Build
                </span>
                <ul className="flex flex-col gap-8">
                  <li>
                    <h3 className="font-display text-primary text-xl mb-2">People first</h3>
                    <p className="font-body text-secondary text-base leading-relaxed">
                      If a user has to read a manual to understand our interface, we designed it wrong. Great software feels natural and gets out of the way.
                    </p>
                  </li>
                  <li>
                    <h3 className="font-display text-primary text-xl mb-2">Quality over speed</h3>
                    <p className="font-body text-secondary text-base leading-relaxed">
                      We prefer to take the time to sweat the small details—like empty states, animations, and accessibility.
                    </p>
                  </li>
                  <li>
                    <h3 className="font-display text-primary text-xl mb-2">Keep it simple</h3>
                    <p className="font-body text-secondary text-base leading-relaxed">
                      Complexity is easy; clarity is the real challenge. We strip away the noise until only the essential solution remains.
                    </p>
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── 3. CAPABILITIES ─────────────────────────────────────── */}
      <section className="border-t border-border py-20 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <ScrollReveal>
            <h2 className="font-display font-normal text-primary text-3xl md:text-[40px] leading-tight mb-12 md:mb-16 max-w-sm">
              How we can help.
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {CAPABILITIES.map((item, i) => (
              <ScrollReveal key={item.category} delay={i * 0.08}>
                <div className="flex flex-col gap-4">
                  <span className="font-mono text-[10px] text-muted tracking-widest">
                    0{i + 1}
                  </span>
                  <h3 className="font-display font-normal text-primary text-2xl md:text-[28px] leading-tight">
                    {item.category}
                  </h3>
                  <p className="font-body text-secondary text-[15px] md:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. INVITATION ───────────────────────────────────────── */}
      <section className="relative py-24 md:py-40 overflow-hidden bg-surface-elevated border-t border-border">
        <ScrollReveal>
          <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-8 flex flex-col items-center text-center gap-6 md:gap-8">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted">
              Start a conversation
            </span>
            <h2 className="font-display font-normal text-primary text-[clamp(36px,5vw,72px)] leading-[0.95] tracking-[-0.02em] max-w-2xl">
              Have a project in mind?
            </h2>
            <p className="font-body text-secondary text-lg md:text-xl max-w-lg leading-relaxed">
              Whether you're starting from scratch or need to fix something that isn't working, we'd love to hear what you're building.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-6">
              <Magnetic strength={15}>
                <Link
                  href="/contact"
                  className={buttonVariants({ variant: "primary", size: "large" })}
                >
                  Get in Touch
                </Link>
              </Magnetic>
              <Magnetic strength={15}>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 font-body font-medium text-secondary hover:text-primary transition-colors text-base"
                >
                  View Our Work
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Magnetic>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
