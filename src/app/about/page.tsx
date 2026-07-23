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
    "SARIV is an engineering and design collective focused on building timeless digital infrastructure. Learn about our mission, values, and the principles that guide our work.",
};

const SERVICES = [
  {
    number: "01",
    title: "Engineering",
    description:
      "Full-stack systems built with strict type-safety, zero technical debt, and the long-term in mind. Every variable accounted for. Every failure mode considered.",
    tags: ["Next.js", "TypeScript", "Systems Design", "API Architecture"],
  },
  {
    number: "02",
    title: "Design",
    description:
      "Quiet luxury. We strip away the superfluous and rely on typography, motion, and structural integrity — not ornamentation — to convey lasting value.",
    tags: ["UI/UX Systems", "Motion Design", "Design Tokens", "Accessibility"],
  },
  {
    number: "03",
    title: "Products",
    description:
      "Opinionated software built for focused, deliberate work. We don't build features. We solve real constraints with surgical precision.",
    tags: ["macOS", "Web Apps", "Developer Tooling", "SaaS"],
  },
];

const PRINCIPLES = [
  {
    number: "01",
    title: "Zero Technical Debt",
    description:
      "Speed of execution in the long term requires uncompromising discipline in the short term. We do not accept quick hacks that compromise architecture.",
  },
  {
    number: "02",
    title: "Quiet Luxury",
    description:
      "Our design philosophy strips away the superfluous. We rely on typography, motion, and structural integrity to convey value, rather than excessive ornamentation.",
  },
  {
    number: "03",
    title: "Deterministic Execution",
    description:
      "Every variable is strictly typed. Every UI state is predictable. We engineer systems that scale reliably and fail gracefully under pressure.",
  },
  {
    number: "04",
    title: "Developer Experience",
    description:
      "A pristine codebase is a fast codebase. We prioritize strict linting, automated testing, and clear abstractions to protect the mental bandwidth of our engineers.",
  },
];

export default function AboutPage() {
  return (
    <main className="flex-1 w-full bg-background">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[80vh] flex items-end overflow-hidden border-b border-border">
        {/* Atmospheric gradient background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 20% 80%, #DCEFF4 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 20%, #F5E4DB 0%, transparent 60%), #FAF9F7",
          }}
        />

        {/* Giant watermark */}
        <div className="absolute bottom-0 right-0 pointer-events-none select-none z-0 overflow-hidden">
          <span className="text-[20vw] font-bold leading-[0.8] tracking-tighter text-neutral-200 block translate-x-[5%]">
            SARIV
          </span>
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-8 pt-40 pb-20 w-full">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-8">
              <Mark className="w-5 h-5 text-primary" />
              <Typography
                variant="caption"
                transform="uppercase"
                className="text-secondary font-semibold tracking-widest"
              >
                About SARIV
              </Typography>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Typography
              variant="display"
              className="max-w-5xl text-primary"
            >
              We build what matters.
            </Typography>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <Typography
              variant="body"
              className="mt-8 max-w-xl text-xl md:text-2xl text-secondary leading-relaxed"
            >
              An engineering and design collective focused on architecting timeless digital infrastructure. We refuse to chase trends.
            </Typography>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Manifesto ────────────────────────────────────────── */}
      <section className="px-4 md:px-8 py-28 md:py-40 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          <ScrollReveal>
            <Typography
              variant="heading"
              className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] sticky top-32"
            >
              "Software should outlast the team that built it."
            </Typography>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="flex flex-col gap-6 pt-2 md:pt-4">
              <Typography variant="body" className="text-lg leading-relaxed">
                Most software today is built to be disposable. It relies on unstable dependencies, fragile patterns, and "move fast and break things" methodologies that ultimately result in crushing technical debt and products nobody trusts.
              </Typography>
              <Typography variant="body" className="text-lg leading-relaxed">
                Our mission is to build software that lasts. We treat frontend architecture with the same rigor and precision as backend systems programming. Every decision is intentional. Every abstraction earns its place.
              </Typography>
              <Typography variant="body" className="text-lg leading-relaxed">
                SARIV was founded on a simple belief: that the best products are precise, enduring tools designed to empower focused work — and that great engineering is inseparable from great design.
              </Typography>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── What We Do ────────────────────────────────────────── */}
      <section className="bg-surface-elevated border-t border-b border-border py-28 md:py-40">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
              <Typography variant="heading" className="text-4xl md:text-5xl">
                What we do
              </Typography>
              <Typography variant="body" muted className="max-w-sm text-base">
                We operate at the intersection of engineering precision and design restraint.
              </Typography>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <ScrollReveal key={service.number} delay={i * 0.1}>
                <div className="bg-surface rounded-2xl border border-border p-8 md:p-10 flex flex-col gap-6 h-full hover:shadow-elevation hover:border-primary/20 transition-all duration-500">
                  <div className="flex items-center justify-between">
                    <Typography
                      variant="caption"
                      className="font-mono text-muted tracking-widest"
                    >
                      {service.number}
                    </Typography>
                    <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center">
                      <ArrowRight className="w-3.5 h-3.5 text-muted" />
                    </div>
                  </div>

                  <div>
                    <Typography variant="subheading" className="text-2xl mb-4">
                      {service.title}
                    </Typography>
                    <Typography variant="body" muted className="text-[16px] leading-relaxed">
                      {service.description}
                    </Typography>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium font-body text-secondary bg-surface-elevated px-3 py-1 rounded-full border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Engineering Principles ───────────────────────────── */}
      <section className="py-28 md:py-40 max-w-[1200px] mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 md:mb-20">
            <Typography variant="heading" className="text-4xl md:text-5xl">
              Engineering Principles
            </Typography>
            <Typography variant="body" muted className="max-w-xs text-base">
              The invariants we refuse to compromise on, regardless of timeline or budget.
            </Typography>
          </div>
        </ScrollReveal>

        <div className="flex flex-col">
          {PRINCIPLES.map((principle, i) => (
            <ScrollReveal key={principle.number} delay={i * 0.08}>
              <div className="group grid grid-cols-1 md:grid-cols-[120px_1fr_1fr] gap-4 md:gap-8 items-start border-t border-border py-10 md:py-12 hover:bg-surface-elevated transition-colors duration-300 rounded-2xl px-4 -mx-4">
                <Typography
                  variant="caption"
                  className="font-mono text-muted tracking-widest text-sm group-hover:text-primary transition-colors pt-1"
                >
                  {principle.number} //
                </Typography>
                <Typography
                  variant="subheading"
                  className="text-xl md:text-2xl"
                >
                  {principle.title}
                </Typography>
                <Typography variant="body" muted className="text-[16px] leading-relaxed">
                  {principle.description}
                </Typography>
              </div>
            </ScrollReveal>
          ))}
          {/* Final border */}
          <div className="border-t border-border" />
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="px-4 md:px-20 py-32 border-t border-border bg-surface-elevated">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-10">
            <Typography variant="display" className="text-5xl md:text-7xl">
              Let&apos;s build something lasting.
            </Typography>
            <Typography variant="body" className="text-xl md:text-2xl text-muted max-w-2xl">
              Whether you have a visionary project in mind or just want to say hello, we&apos;d love to hear from you.
            </Typography>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
              <Magnetic strength={20}>
                <Link
                  href="/start-project"
                  className={`${buttonVariants({ variant: "primary", size: "large" })} w-[200px]`}
                >
                  Start a Project
                </Link>
              </Magnetic>
              <Magnetic strength={20}>
                <Link
                  href="/contact"
                  className={`${buttonVariants({ variant: "secondary", size: "large" })} w-[200px]`}
                >
                  Say Hello
                </Link>
              </Magnetic>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </main>
  );
}
