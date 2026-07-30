import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { JourneyScroll } from "@/components/ui/JourneyScroll";
import { buttonVariants } from "@/components/ui/Button";
import { Mark } from "@/components/Mark";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — SARIV",
  description:
    "SARIV is an independent software studio. We take on a small number of products a year and build them properly.",
};

const PRINCIPLES = [
  {
    title: "Build what matters",
    description:
      "We'd rather solve one problem completely than five of them halfway. If a feature doesn't earn its place, it doesn't ship.",
  },
  {
    title: "Design before development",
    description:
      "Most software problems are thinking problems wearing a technical costume. We work them out before we open an editor.",
  },
  {
    title: "Simplicity wins",
    description:
      "The best software gets out of the way. If someone has to learn our interface before they can use it, we designed it wrong.",
  },
  {
    title: "Build it to last",
    description:
      "Anyone can ship something that works this quarter. We're interested in the version that still works in three years.",
  },
];

const PROCESS = [
  {
    step: "Problem",
    description:
      "The brief is rarely the problem. We start by finding out what's actually in the way.",
  },
  {
    step: "Direction",
    description: "Then we find the simplest thing that solves it. Complexity is easy; clarity is the work.",
  },
  {
    step: "Craft",
    description: "Then we build it properly — the empty states, the error cases, the slow-connection path.",
  },
  {
    step: "Refine",
    description: "Then we keep going. Launch is where the real feedback starts, not where the work stops.",
  },
];

const TIMELINE = [
  {
    year: "May 2026",
    event: "SARIV Founded",
    description:
      "Founded on a random Wednesday in May. One person, one belief: build software that deserves to exist.",
  },
  {
    year: "May 2026",
    event: "First Client",
    description:
      "Landed our first client within weeks of starting. Core Defenses — a digital presence for next-generation defense.",
  },
  {
    year: "Jul 2026",
    event: "FreeFlow — In Progress",
    description:
      "Deep in development on FreeFlow — a native macOS screen recorder built for creators who refuse to compromise on quality.",
  },
  {
    year: "Next",
    event: "What's Next?",
    description:
      "If you're working on something that deserves to exist, we'd love to hear about it.",
    isCTA: true,
  },
];

const CAPABILITIES = [
  {
    category: "Software products",
    description: "End-to-end products. Apps, platforms, and tools built from nothing to launch.",
  },
  {
    category: "Internal platforms",
    description: "The unglamorous systems a business actually runs on. Faster workflows, cleaner data.",
  },
  {
    category: "AI, where it earns it",
    description: "Practical AI in the places it removes real friction. Not AI for the announcement.",
  },
];

export default function AboutPage() {
  return (
    <main className="flex-1 w-full bg-background">
      {/* ── 1. OPENING STATEMENT ───────────────────────────────── */}
      <section className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0 opacity-40 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 z-0 overflow-hidden pointer-events-none select-none flex justify-end">
          <span className="text-[22vw] font-bold leading-[0.82] tracking-tighter text-neutral-200 pr-[1vw]">
            SARIV
          </span>
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-8 w-full py-40">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-12">
              <Mark className="w-4 h-4 text-secondary" />
              <span className="font-body text-secondary uppercase tracking-[0.25em] text-[11px] font-semibold">
                About SARIV
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="font-display font-normal text-primary text-[clamp(44px,6.5vw,96px)] leading-[0.93] tracking-[-0.025em] max-w-4xl mb-10">
              We build products that deserve to exist.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="font-body text-secondary text-lg md:text-xl max-w-lg leading-relaxed mb-14">
              An independent software studio. We take on a small number of products a year so that
              each one gets built properly.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex items-center gap-6">
              <Magnetic strength={15}>
                <Link href="/work" className={buttonVariants({ variant: "primary", size: "large" })}>
                  See Our Work
                </Link>
              </Magnetic>
              <Link
                href="/contact"
                className="font-body text-secondary hover:text-primary transition-colors text-sm font-medium underline underline-offset-4"
              >
                or say hello →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 2. THE STORY — narrow single column, quiet and personal ── */}
      <section className="border-t border-border py-28 md:py-40">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <ScrollReveal>
            <div className="max-w-[620px] mx-auto">
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted block mb-10 text-center">
                How this started
              </span>
              <div className="flex flex-col gap-7 font-body text-secondary text-[17px] md:text-lg leading-[1.75]">
                <p>
                  SARIV started because of a pattern we kept running into. Software that technically
                  worked, but that nobody actually wanted to use. Products shipped to hit a date,
                  then quietly rebuilt a year later.
                </p>
                <p>
                  It seemed like a solvable problem. Not with a new framework or a better process
                  diagram — just with the willingness to think a thing through before building it,
                  and to keep caring about it after launch.
                </p>
                <p className="text-primary">
                  So that&apos;s the whole studio, really. Fewer projects. More attention on each
                  one.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 3. THE BELIEF — oversized statement, dominates the viewport ── */}
      <section className="bg-surface-elevated border-t border-border py-32 md:py-56">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <ScrollReveal>
            <p className="font-display font-normal text-primary text-[clamp(30px,4.6vw,64px)] leading-[1.1] tracking-[-0.02em] max-w-4xl">
              Technology shouldn&apos;t add complexity.
              <span className="text-muted"> It should remove it.</span>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 4. PRINCIPLES — asymmetric list, no cards ──────────────── */}
      <section className="border-t border-border py-28 md:py-40">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-12 md:gap-24">
            <ScrollReveal>
              <div className="md:sticky md:top-32">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted block mb-6">
                  What we hold to
                </span>
                <h2 className="font-display font-normal text-primary text-3xl md:text-[40px] leading-[1.1]">
                  Four things we
                  <br />
                  don&apos;t compromise.
                </h2>
              </div>
            </ScrollReveal>

            <div className="flex flex-col">
              {PRINCIPLES.map((p, i) => (
                <ScrollReveal key={p.title} delay={i * 0.06}>
                  <div className="border-t border-border py-9 md:py-11 flex flex-col md:flex-row gap-3 md:gap-10">
                    <span className="font-mono text-xs text-muted tracking-widest shrink-0 md:pt-2 md:w-8">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="font-display font-normal text-primary text-2xl md:text-[28px] mb-3 leading-tight">
                        {p.title}
                      </h3>
                      <p className="font-body text-secondary text-[15px] md:text-base leading-relaxed max-w-md">
                        {p.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
              <div className="border-t border-border" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. PROCESS — horizontal 4-up, dense, tinted ─────────────── */}
      <section className="bg-surface-elevated border-t border-border py-28 md:py-40">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24">
              <h2 className="font-display font-normal text-primary text-3xl md:text-[40px] leading-tight max-w-md">
                Every project runs the same four steps.
              </h2>
              <p className="font-body text-muted text-sm max-w-xs md:text-right">
                Regardless of scope. The discipline is the point.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {PROCESS.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 0.08}>
                <div className="bg-surface-elevated h-full px-6 py-10 md:px-8 md:py-12 flex flex-col gap-5">
                  <span className="font-mono text-[10px] text-muted tracking-widest">
                    0{i + 1}
                  </span>
                  <h3 className="font-display font-normal text-primary text-xl md:text-2xl">
                    {step.step}
                  </h3>
                  <p className="font-body text-secondary text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. TIMELINE — horizontal pinned scroll ─────────────────── */}
      <JourneyScroll items={TIMELINE} />

      {/* ── 7. CAPABILITIES — plain editorial list, no cards ───────── */}
      <section className="border-t border-border py-28 md:py-40">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <ScrollReveal>
            <h2 className="font-display font-normal text-primary text-3xl md:text-[40px] leading-tight mb-16 md:mb-20 max-w-sm">
              What we take on.
            </h2>
          </ScrollReveal>
          <div className="flex flex-col">
            {CAPABILITIES.map((item, i) => (
              <ScrollReveal key={item.category} delay={i * 0.08}>
                <div className="group border-t border-border py-10 md:py-12 grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-3 md:gap-16 items-baseline">
                  <h3 className="font-display font-normal text-primary text-2xl md:text-[32px] leading-tight">
                    {item.category}
                  </h3>
                  <p className="font-body text-secondary text-[15px] md:text-base leading-relaxed max-w-md">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* ── 8. MANIFESTO — single line, maximum silence ────────────── */}
      <section className="border-t border-border py-40 md:py-64 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <ScrollReveal>
            <blockquote className="font-display font-normal text-primary text-[clamp(28px,4.2vw,58px)] leading-[1.15] tracking-[-0.02em] max-w-3xl mx-auto text-balance text-center">
              Good software doesn&apos;t demand attention. It quietly helps someone finish what they
              came to do.
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 9. INVITATION ─────────────────────────────────────────── */}
      <section className="relative py-32 md:py-48 overflow-hidden bg-surface-elevated border-t border-border">
        <ScrollReveal>
          <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-8 flex flex-col items-start gap-8">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted">
              Start a conversation
            </span>
            <h2 className="font-display font-normal text-primary text-[clamp(36px,6vw,88px)] leading-[0.95] tracking-[-0.02em] max-w-3xl">
              Working on something that deserves to exist?
            </h2>
            <p className="font-body text-secondary text-lg md:text-xl max-w-xl leading-relaxed">
              Whether it&apos;s a new product or one that already exists and deserves better, we&apos;d
              like to hear about it.
            </p>
            <div className="flex items-center gap-6 mt-4">
              <Magnetic strength={15}>
                <Link
                  href="/start-project"
                  className={buttonVariants({ variant: "primary", size: "large" })}
                >
                  Start a Project
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
