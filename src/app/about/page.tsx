import Link from "next/link";
import { Typography } from "@/components/ui/Typography";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { buttonVariants } from "@/components/ui/Button";
import { Mark } from "@/components/Mark";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — SARIV",
  description:
    "We build products that deserve to exist. SARIV is an independent software studio focused on creating products that solve meaningful problems — not software built for the sake of shipping.",
};

const PRINCIPLES = [
  {
    title: "Build What Matters",
    description:
      "We choose problems worth solving over features worth marketing. If it doesn't serve a real need, we don't build it.",
  },
  {
    title: "Design Before Development",
    description:
      "Great software begins with clarity, not code. We think deeply before we write a single line.",
  },
  {
    title: "Simplicity Wins",
    description:
      "The best interfaces disappear. Good software shouldn't demand attention — it should quietly help people achieve what they came to do.",
  },
  {
    title: "Long-Term Thinking",
    description:
      "Products should grow without being rebuilt every year. We engineer for longevity, not just the launch.",
  },
];

const PROCESS = [
  {
    number: "01",
    step: "Problem",
    description:
      "Understand the real challenge — not the surface request, but what's actually getting in the way.",
  },
  {
    number: "02",
    step: "Direction",
    description:
      "Define the simplest solution. Complexity is easy. Clarity is the work.",
  },
  {
    number: "03",
    step: "Craft",
    description:
      "Design and engineer with obsessive attention to detail. Every pixel. Every interaction. Every edge case.",
  },
  {
    number: "04",
    step: "Refine",
    description:
      "Measure, improve, repeat. Shipping is a beginning, not an end.",
  },
];

const TIMELINE = [
  {
    year: "2024",
    event: "SARIV Founded",
    description:
      "Started as an independent studio with one belief: software should outlast the teams that build it.",
  },
  {
    year: "2024",
    event: "First Clients",
    description:
      "Worked with early clients to build their digital presence. Core Defenses was among the first.",
  },
  {
    year: "2025",
    event: "FreeFlow Launched",
    description:
      "Shipped our first internal product — a native macOS screen recorder built for creators who refuse to compromise.",
  },
  {
    year: "Now",
    event: "Growing Ecosystem",
    description:
      "More products in development. More problems worth solving.",
  },
  {
    year: "Next",
    event: "What's Next?",
    description:
      "If you're working on something that deserves to exist, we'd love to hear about it.",
    isCTA: true,
  },
];

const WHAT_WE_BUILD = [
  {
    number: "01",
    category: "Software Products",
    description:
      "Complete digital experiences built from the ground up. Apps, platforms, and tools that people actually want to use.",
  },
  {
    number: "02",
    category: "Internal Platforms",
    description:
      "Tools that help businesses operate better — faster workflows, cleaner data, fewer workarounds.",
  },
  {
    number: "03",
    category: "AI Experiences",
    description:
      "Practical AI integrated where it genuinely helps. Not AI for the press release — AI that removes friction.",
  },
];

const BELIEFS = [
  "Clarity over complexity.",
  "Quality over quantity.",
  "Longevity over trends.",
  "Products over projects.",
];

export default function AboutPage() {
  return (
    <main className="flex-1 w-full bg-background">

      {/* ── 1. HERO ──────────────────────────────────────────── */}
      <section className="relative w-full min-h-screen flex items-end overflow-hidden bg-[#090909]">
        {/* Atmospheric glows */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 10% 90%, rgba(220,239,244,0.09) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 50% 40% at 90% 20%, rgba(245,228,219,0.06) 0%, transparent 70%)",
            }}
          />
        </div>
        {/* Grain */}
        <div className="absolute inset-0 z-0 opacity-25 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
        {/* Watermark */}
        <div className="absolute bottom-0 right-0 pointer-events-none select-none z-0 overflow-hidden">
          <span className="text-[22vw] font-bold leading-[0.8] tracking-tighter text-white/[0.04] block translate-x-[5%]">
            SARIV
          </span>
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-8 pt-48 pb-24 w-full">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-10">
              <Mark className="w-5 h-5 text-white/50" />
              <span className="font-body text-white/40 uppercase tracking-[0.2em] text-xs font-semibold">
                About SARIV
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="font-display font-normal text-white text-[clamp(48px,7vw,100px)] leading-[0.95] tracking-[-0.02em] max-w-4xl mb-8">
              We build products that deserve to exist.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="font-body text-white/55 text-lg md:text-xl max-w-xl leading-relaxed mb-12">
              SARIV is an independent software studio focused on creating products that solve meaningful problems — not software built for the sake of shipping.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <Magnetic strength={15}>
              <Link href="/work" className={buttonVariants({ variant: "primary", size: "large" })}>
                See Our Work
              </Link>
            </Magnetic>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 2. WHY SARIV EXISTS ──────────────────────────────── */}
      <section className="border-t border-border py-28 md:py-40">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16 md:gap-24 items-start">
            <ScrollReveal>
              <div>
                <span className="font-body text-muted uppercase tracking-[0.2em] text-xs font-semibold block mb-6">
                  Why We Exist
                </span>
                <Typography variant="heading" className="text-3xl md:text-4xl leading-tight">
                  Not another agency.
                </Typography>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <div className="flex flex-col gap-6">
                <p className="font-body text-xl md:text-2xl text-primary leading-relaxed font-medium">
                  We started SARIV with a simple belief:<br />
                  technology shouldn&apos;t add complexity — it should remove it.
                </p>
                <Typography variant="body" muted className="text-[17px]">
                  Every product we build begins with a real problem, not a trend. We work closely with founders, businesses, and ambitious teams to create software that is thoughtful, scalable, and built to last.
                </Typography>
                <Typography variant="body" muted className="text-[17px]">
                  We&apos;re not interested in building things that look good in screenshots. We&apos;re interested in building things that hold up when real people depend on them.
                </Typography>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── 3. PRINCIPLES ───────────────────────────────────── */}
      <section className="bg-[#090909] py-28 md:py-40">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <ScrollReveal>
            <span className="font-body text-white/35 uppercase tracking-[0.2em] text-xs font-semibold block mb-4">
              Our Principles
            </span>
            <h2 className="font-display font-normal text-white text-[clamp(32px,5vw,60px)] leading-[1.05] mb-16 md:mb-20 max-w-lg">
              Four beliefs we refuse to compromise on.
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
            {PRINCIPLES.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.08}>
                <div className="bg-[#090909] p-10 md:p-14 flex flex-col gap-6 group hover:bg-white/[0.03] transition-colors duration-500 h-full">
                  <span className="font-mono text-white/20 text-sm tracking-widest">
                    0{i + 1}
                  </span>
                  <h3 className="font-display font-normal text-white text-2xl md:text-3xl">
                    {p.title}
                  </h3>
                  <p className="font-body text-white/50 text-[16px] leading-relaxed max-w-sm">
                    {p.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. HOW WE BUILD ─────────────────────────────────── */}
      <section className="py-28 md:py-40 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 mb-20">
              <div>
                <span className="font-body text-muted uppercase tracking-[0.2em] text-xs font-semibold block mb-6">
                  How We Build
                </span>
                <Typography variant="heading" className="text-3xl md:text-4xl">
                  The process.
                </Typography>
              </div>
              <Typography variant="body" muted className="text-[17px] self-end max-w-none">
                Every engagement follows the same discipline — regardless of scope or complexity.
              </Typography>
            </div>
          </ScrollReveal>

          <div className="flex flex-col">
            {PROCESS.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 0.1}>
                <div className="group grid grid-cols-1 md:grid-cols-[80px_200px_1fr] gap-4 md:gap-8 items-start border-t border-border py-10 hover:bg-surface-elevated transition-colors duration-300 rounded-2xl px-4 -mx-4">
                  <span className="font-mono text-muted text-sm tracking-widest pt-1">
                    {step.number}
                  </span>
                  <Typography variant="subheading" className="text-xl md:text-2xl">
                    {step.step}
                  </Typography>
                  <Typography variant="body" muted className="text-[16px] leading-relaxed">
                    {step.description}
                  </Typography>
                </div>
              </ScrollReveal>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* ── 5. TIMELINE ─────────────────────────────────────── */}
      <section className="bg-surface-elevated border-t border-border py-28 md:py-40">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <ScrollReveal>
            <span className="font-body text-muted uppercase tracking-[0.2em] text-xs font-semibold block mb-4">
              The Journey
            </span>
            <Typography variant="heading" className="text-3xl md:text-4xl mb-16 md:mb-20">
              Where we&apos;ve been.
            </Typography>
          </ScrollReveal>

          <div className="relative flex flex-col pl-8 md:pl-0">
            {/* Vertical connecting line */}
            <div className="absolute left-[11px] md:left-[147px] top-2 bottom-2 w-px bg-border" />

            {TIMELINE.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="relative grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 md:gap-16 pb-16 last:pb-0">
                  {/* Dot */}
                  <div className="absolute left-[-17px] md:left-[140px] top-1.5 w-[13px] h-[13px] rounded-full bg-primary ring-4 ring-surface-elevated z-10" />
                  {/* Year */}
                  <div className="hidden md:flex items-start pt-0.5">
                    <span className="font-mono text-muted text-sm tracking-widest">{item.year}</span>
                  </div>
                  {/* Content */}
                  <div className="flex flex-col gap-2">
                    <span className="font-mono text-muted text-xs tracking-widest md:hidden">{item.year}</span>
                    <h3 className="font-display font-normal text-primary text-xl md:text-2xl">
                      {item.event}
                    </h3>
                    <p className="font-body text-secondary text-[15px] leading-relaxed max-w-lg">
                      {item.description}
                    </p>
                    {item.isCTA && (
                      <Link
                        href="/contact"
                        className="mt-2 inline-flex items-center gap-2 text-sm font-medium font-body text-primary underline underline-offset-4 hover:text-secondary transition-colors w-fit"
                      >
                        Let&apos;s talk <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. BEHIND SARIV ─────────────────────────────────── */}
      <section className="py-28 md:py-40 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <ScrollReveal>
            <span className="font-body text-muted uppercase tracking-[0.2em] text-xs font-semibold block mb-16">
              Behind SARIV
            </span>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-16 md:gap-24 items-start">
            {/* Avatar */}
            <ScrollReveal>
              <div className="relative max-w-sm">
                <div
                  className="w-full aspect-square rounded-3xl overflow-hidden flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)" }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(ellipse 80% 60% at 20% 30%, rgba(220,239,244,0.15) 0%, transparent 60%)",
                    }}
                  />
                  <span className="relative font-display text-white/90 text-[100px] leading-none select-none">
                    D
                  </span>
                </div>
                <div className="absolute -bottom-5 -right-5 w-20 h-20 rounded-2xl bg-primary flex items-center justify-center shadow-elevation">
                  <Mark className="w-9 h-9 text-white" />
                </div>
              </div>
            </ScrollReveal>

            {/* Text */}
            <ScrollReveal delay={0.15}>
              <div className="flex flex-col gap-6 md:pt-2">
                <Typography variant="heading" className="text-3xl md:text-4xl lg:text-5xl leading-tight">
                  Dhruval Bhinsara
                </Typography>
                <span className="font-body text-muted text-xs font-semibold uppercase tracking-[0.2em]">
                  Founder &amp; Engineer
                </span>
                <div className="w-10 h-px bg-border my-2" />
                <Typography variant="body" muted className="text-[17px]">
                  SARIV is led by Dhruval Bhinsara — a software engineer focused on building thoughtful digital products.
                </Typography>
                <Typography variant="body" muted className="text-[17px]">
                  What began as independent client work evolved into a studio dedicated to a single idea: software built with intention lasts longer, performs better, and means more to the people who use it.
                </Typography>
                <Typography variant="body" muted className="text-[17px]">
                  Being a small studio isn&apos;t a limitation. It&apos;s a deliberate choice — it means every project gets the full attention of someone who genuinely cares about it.
                </Typography>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── 7. WHAT WE BUILD ────────────────────────────────── */}
      <section className="bg-surface-elevated border-t border-border py-28 md:py-40">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <ScrollReveal>
            <span className="font-body text-muted uppercase tracking-[0.2em] text-xs font-semibold block mb-4">
              What We Build
            </span>
            <Typography variant="heading" className="text-3xl md:text-4xl mb-16 md:mb-20 max-w-sm leading-tight">
              Outcomes, not deliverables.
            </Typography>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WHAT_WE_BUILD.map((item, i) => (
              <ScrollReveal key={item.category} delay={i * 0.1}>
                <div className="bg-surface rounded-2xl border border-border p-8 md:p-10 flex flex-col gap-6 h-full hover:shadow-elevation hover:border-primary/20 transition-all duration-500 group">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-muted text-xs tracking-widest">{item.number}</span>
                    <div className="w-7 h-7 rounded-full border border-border flex items-center justify-center group-hover:border-primary/30 transition-colors">
                      <ArrowRight className="w-3 h-3 text-muted" />
                    </div>
                  </div>
                  <Typography variant="subheading" className="text-xl md:text-2xl">
                    {item.category}
                  </Typography>
                  <Typography variant="body" muted className="text-[15px] leading-relaxed">
                    {item.description}
                  </Typography>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. WHAT WE BELIEVE ──────────────────────────────── */}
      <section className="border-t border-border py-28 md:py-40">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16 items-start">
            <ScrollReveal>
              <span className="font-body text-muted uppercase tracking-[0.2em] text-xs font-semibold block mb-6">
                What We Believe
              </span>
              <Typography variant="heading" className="text-3xl md:text-4xl leading-tight">
                A short manifesto.
              </Typography>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <div className="flex flex-col gap-8">
                <blockquote className="font-display font-normal text-primary text-2xl md:text-3xl lg:text-[36px] leading-[1.25]">
                  &ldquo;Technology should feel invisible. Good software doesn&apos;t demand attention — it quietly helps people achieve what they came to do.&rdquo;
                </blockquote>
                <div className="flex flex-col gap-4 pt-4 border-t border-border">
                  {BELIEFS.map((belief) => (
                    <div key={belief} className="flex items-center gap-4">
                      <div className="w-1 h-1 rounded-full bg-muted flex-shrink-0" />
                      <span className="font-body text-secondary text-[17px]">{belief}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── 9. CTA ──────────────────────────────────────────── */}
      <section className="relative py-32 md:py-48 overflow-hidden bg-[#090909] border-t border-white/10">
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 110%, rgba(220,239,244,0.12) 0%, transparent 70%)",
          }}
        />

        <ScrollReveal>
          <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-8 flex flex-col items-start gap-8">
            <span className="font-body text-white/35 uppercase tracking-[0.2em] text-xs font-semibold">
              Start a Conversation
            </span>
            <h2 className="font-display font-normal text-white text-[clamp(36px,6vw,88px)] leading-[0.95] tracking-[-0.02em] max-w-3xl">
              Ready to build something that matters?
            </h2>
            <p className="font-body text-white/50 text-lg md:text-xl max-w-xl leading-relaxed">
              Whether you&apos;re launching something new or improving something that already exists, we&apos;d love to hear what you&apos;re building.
            </p>
            <div className="flex items-center gap-6 mt-4">
              <Magnetic strength={15}>
                <Link href="/start-project" className={buttonVariants({ variant: "primary", size: "large" })}>
                  Start a Project
                </Link>
              </Magnetic>
              <Magnetic strength={15}>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 font-body font-medium text-white/60 hover:text-white transition-colors text-base"
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
