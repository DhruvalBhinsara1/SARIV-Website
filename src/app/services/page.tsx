"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ScrollTextReveal } from "@/components/ui/ScrollTextReveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { Mark } from "@/components/Mark";
import { buttonVariants } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/Accordion";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { LocalizedPrice } from "@/components/ui/LocalizedPrice";

/* ────────────────────────────────────────────────────────────
   DATA
   ──────────────────────────────────────────────────────────── */

const ENGINEERING_PRINCIPLES = [
  {
    number: "01",
    title: "Architecture before implementation",
    description:
      "Every decision has consequences three years from now. We design data models, API contracts, and infrastructure patterns before writing the first line of production code.",
  },
  {
    number: "02",
    title: "Performance is a feature",
    description:
      "Sub-second load times, optimized database queries, efficient bundle sizes. Speed is not an afterthought — it is a core deliverable.",
  },
  {
    number: "03",
    title: "Maintainability over cleverness",
    description:
      "Clean, well-documented code that your team can understand, extend, and debug six months after we hand it over. No clever shortcuts that become technical debt.",
  },
  {
    number: "04",
    title: "Security by default",
    description:
      "Input validation, authentication, rate limiting, and encryption are built into every layer — not bolted on after launch.",
  },
];

const FAQ_ITEMS = [
  {
    question: "How long does a typical engagement take?",
    answer:
      "Digital platforms typically take 3–6 weeks. Custom digital products range from 8–16 weeks depending on complexity. Modernization projects vary based on the existing codebase, but most initial phases complete within 6–10 weeks.",
  },
  {
    question: "Do you work with early-stage startups?",
    answer:
      "Yes, if the project is well-scoped and the budget aligns with the level of engineering required. We are particularly effective for funded startups that need a strong technical foundation before scaling.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We provide a post-launch support period included in every engagement. Beyond that, we offer ongoing retained engineering partnerships for teams that need continued development, monitoring, and iteration.",
  },
  {
    question: "Can we see examples of your work?",
    answer:
      "Absolutely. Visit our Work page to see case studies including FreeFlow, NexaBrew, and Core Defenses. We are happy to walk through our process and technical decisions in detail during a consultation.",
  },
  {
    question: "Who owns the code?",
    answer:
      "You do. Upon full payment, all custom project deliverables and source code transfer to you. Our internal tools, frameworks, and reusable components remain ours — clearly delineated in every agreement.",
  },
  {
    question: "Do you sign NDAs?",
    answer:
      "Yes. Confidentiality is fundamental to how we work. We are happy to sign your NDA before any technical discussions begin.",
  },
];

/* ────────────────────────────────────────────────────────────
   COUNTER ANIMATION COMPONENT
   ──────────────────────────────────────────────────────────── */

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  return (
    <motion.span
      className="font-display text-[clamp(48px,6vw,72px)] text-primary leading-none"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {value}
      {suffix && <span className="text-muted">{suffix}</span>}
    </motion.span>
  );
}

/* ────────────────────────────────────────────────────────────
   PAGE
   ──────────────────────────────────────────────────────────── */

export default function ServicesPage() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <main className="w-full bg-background min-h-screen">

      {/* ═══════════════════════════════════════════════════════
          SECTION 1 — HERO
          A confident, minimal opening. No clutter.
          ═══════════════════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-8 pt-32 md:pt-40 pb-20 md:pb-28">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-10">
            <Mark className="w-4 h-4 text-secondary" />
            <span className="font-body text-secondary uppercase tracking-[0.25em] text-[11px] font-semibold">
              Services
            </span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-8 md:gap-20 items-end">
          <ScrollReveal delay={0.08}>
            <h1 className="font-display font-normal text-primary text-[clamp(48px,8vw,96px)] leading-[0.9] tracking-[-0.03em]">
              We solve business
              <br />
              problems through
              <br />
              software.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.16}>
            <p className="font-body text-secondary text-base md:text-lg leading-relaxed md:pb-4">
              No one wakes up needing a JavaScript framework. They wake up
              needing to replace spreadsheets, automate operations, or build
              a product that actually works. That&apos;s where we start.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2 — MANIFESTO
          A single, powerful statement in a high-contrast dark block.
          ═══════════════════════════════════════════════════════ */}
      <section className="bg-primary text-surface py-24 md:py-40">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8 md:gap-12">
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-surface/60">
                The SARIV Standard
              </span>
              <p className="font-display font-normal text-[clamp(32px,5vw,64px)] leading-[1.05] tracking-[-0.02em]">
                A cheap agency builds a liability you have to manage.
                <br className="hidden md:block" />
                <span className="text-surface/50">
                  We build assets that work reliably, require zero babysitting, and scale with your growth.
                </span>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3 — OFFER 1: HIGH-PERFORMANCE DIGITAL PLATFORMS
          Asymmetric layout, left-heavy copy with right details.
          ═══════════════════════════════════════════════════════ */}
      <section className="border-t border-border py-20 md:py-32 relative overflow-hidden">
        {/* Oversized watermark numeral — echoes work page pattern */}
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute top-4 right-[-2vw] font-display leading-none text-[18vw] md:text-[13vw] text-primary/[0.03]"
        >
          01
        </span>

        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          {/* Eyebrow */}
          <ScrollReveal>
            <div className="flex items-baseline justify-between gap-6 border-b border-border pb-5 mb-12 md:mb-16">
              <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-muted">
                01 — Digital Platforms
              </span>
              <Badge color="muted">Most Popular</Badge>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left column: copy */}
            <div className="lg:col-span-7">
              <ScrollReveal delay={0.05}>
                <h2 className="font-display font-normal text-primary text-[clamp(36px,5vw,64px)] leading-[0.95] tracking-[-0.02em] mb-6">
                  High-Performance
                  <br />
                  Digital Platforms
                </h2>
                <p className="font-body text-secondary text-lg leading-relaxed max-w-xl mb-10">
                  Fast, meticulously engineered websites designed to elevate
                  your brand and convert visitors into customers. Built on
                  modern frameworks with obsessive attention to performance,
                  accessibility, and search visibility.
                </p>

                {/* Business outcomes as horizontal badges */}
                <div className="flex flex-wrap gap-3 mb-12">
                  {[
                    "Elevated Brand Perception",
                    "Higher Conversion Rates",
                    "Sub-Second Load Times",
                    "Technical SEO Built-In",
                  ].map((outcome) => (
                    <span
                      key={outcome}
                      className="inline-flex items-center px-4 py-2 rounded-full border border-border text-xs font-mono tracking-wide text-secondary bg-surface-elevated/50"
                    >
                      {outcome}
                    </span>
                  ))}
                </div>

                {/* Who this is for */}
                <div className="border-t border-border/50 pt-8">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-muted block mb-3">
                    Who this is for
                  </span>
                  <p className="font-body text-secondary text-[15px] leading-relaxed max-w-lg">
                    Companies whose current website fails to reflect the
                    premium quality of their actual services. Funded startups
                    needing a digital presence that matches their ambition.
                    B2B firms losing deals because their site looks dated.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Right column: deliverables + pricing */}
            <div className="lg:col-span-5">
              <ScrollReveal delay={0.12}>
                <div className="border border-border rounded-[2rem] p-8 md:p-10 bg-surface">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-muted block mb-6">
                    Typical Deliverables
                  </span>
                  <ul className="flex flex-col gap-4 mb-10">
                    {[
                      "UI/UX Design & Prototyping",
                      "Responsive Frontend Engineering",
                      "CMS Integration & Content Modeling",
                      "Technical SEO & Core Web Vitals",
                      "Custom Animations & Micro-interactions",
                      "Analytics & Conversion Tracking",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-primary shrink-0 opacity-60 mt-0.5" />
                        <span className="font-body text-sm text-secondary">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-border/50 pt-8 flex flex-col gap-2">
                    <span className="font-mono text-[10px] tracking-widest uppercase text-muted">
                      Engagements start at
                    </span>
                    <span className="font-display text-3xl text-primary">
                      <LocalizedPrice
                        usdPrice="$2,500"
                        inrPrice="₹2,00,000"
                      />
                    </span>
                    <span className="font-body text-xs text-muted mt-1">
                      Typical timeline: 3–6 weeks
                    </span>
                  </div>

                  <Link
                    href="/start-project"
                    className={cn(
                      buttonVariants({
                        variant: "primary",
                        className: "w-full justify-between group mt-8",
                      })
                    )}
                  >
                    Discuss your platform
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4 — OFFER 2: CUSTOM DIGITAL PRODUCTS
          Flipped layout (RTL), image-column replaced by architecture diagram.
          ═══════════════════════════════════════════════════════ */}
      <section className="border-t border-border py-20 md:py-32 bg-surface-elevated relative overflow-hidden">
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute top-4 left-[-2vw] font-display leading-none text-[18vw] md:text-[13vw] text-primary/[0.03]"
        >
          02
        </span>

        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <ScrollReveal>
            <div className="flex items-baseline justify-between gap-6 border-b border-border pb-5 mb-12 md:mb-16">
              <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-muted">
                02 — Digital Products
              </span>
              <Badge color="primary">Flagship</Badge>
            </div>
          </ScrollReveal>

          {/* Flipped: deliverables left, copy right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start lg:[direction:rtl] lg:[&>*]:[direction:ltr]">
            {/* Copy column (visually right on desktop) */}
            <div className="lg:col-span-7">
              <ScrollReveal delay={0.05}>
                <h2 className="font-display font-normal text-primary text-[clamp(36px,5vw,64px)] leading-[0.95] tracking-[-0.02em] mb-6">
                  Custom Digital
                  <br />
                  Products
                </h2>
                <p className="font-body text-secondary text-lg leading-relaxed max-w-xl mb-10">
                  Bespoke, data-driven web applications engineered to
                  automate your operations or serve your customers. We
                  don&apos;t build MVPs that need to be rewritten — we build
                  foundations that scale.
                </p>

                {/* Architecture visualization — ASCII-inspired diagram */}
                <div className="bg-background border border-border rounded-2xl p-6 md:p-8 mb-10 font-mono text-[11px] md:text-xs text-muted leading-relaxed overflow-x-auto">
                  <div className="text-primary/40 mb-4">// Typical system architecture</div>
                  <div className="flex flex-col gap-1">
                    <span className="text-secondary">┌─────────────────┐     ┌──────────────┐</span>
                    <span className="text-secondary">│  <span className="text-primary">Client App</span>    │────▶│  <span className="text-primary">API Layer</span>  │</span>
                    <span className="text-secondary">│  Next.js / React │     │  REST / tRPC │</span>
                    <span className="text-secondary">└─────────────────┘     └──────┬───────┘</span>
                    <span className="text-secondary">                               │</span>
                    <span className="text-secondary">              ┌────────────────┼────────────────┐</span>
                    <span className="text-secondary">              │                │                │</span>
                    <span className="text-secondary">        ┌─────▼─────┐   ┌──────▼──────┐  ┌─────▼─────┐</span>
                    <span className="text-secondary">        │ <span className="text-primary">Database</span> │   │ <span className="text-primary">Auth / IAM</span> │  │ <span className="text-primary">Storage</span>  │</span>
                    <span className="text-secondary">        │ Postgres  │   │  Sessions   │  │  S3 / R2  │</span>
                    <span className="text-secondary">        └───────────┘   └─────────────┘  └───────────┘</span>
                  </div>
                </div>

                {/* Business outcomes */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {[
                    "Streamlined Operations",
                    "Centralized Data",
                    "Automated Workflows",
                    "Scalable Architecture",
                  ].map((outcome) => (
                    <span
                      key={outcome}
                      className="inline-flex items-center px-4 py-2 rounded-full border border-border text-xs font-mono tracking-wide text-secondary bg-background/50"
                    >
                      {outcome}
                    </span>
                  ))}
                </div>

                <div className="border-t border-border/50 pt-8">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-muted block mb-3">
                    Who this is for
                  </span>
                  <p className="font-body text-secondary text-[15px] leading-relaxed max-w-lg">
                    Growing businesses that have outgrown off-the-shelf SaaS.
                    Teams replacing manual spreadsheet workflows with purpose-built
                    software. Startups building their first customer-facing product
                    on a solid technical foundation.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Deliverables card (visually left on desktop) */}
            <div className="lg:col-span-5">
              <ScrollReveal delay={0.12}>
                <div className="border border-border rounded-[2rem] p-8 md:p-10 bg-surface">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-muted block mb-6">
                    Typical Deliverables
                  </span>
                  <ul className="flex flex-col gap-4 mb-10">
                    {[
                      "Full-Stack Application Engineering",
                      "Database Architecture & Migrations",
                      "API Design & Third-Party Integrations",
                      "Authentication & Role-Based Access",
                      "Admin Dashboards & Reporting",
                      "CI/CD Pipeline & Deployment",
                      "Monitoring & Error Tracking",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-primary shrink-0 opacity-60 mt-0.5" />
                        <span className="font-body text-sm text-secondary">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-border/50 pt-8 flex flex-col gap-2">
                    <span className="font-mono text-[10px] tracking-widest uppercase text-muted">
                      Engagements start at
                    </span>
                    <span className="font-display text-3xl text-primary">
                      <LocalizedPrice
                        usdPrice="$7,500"
                        inrPrice="₹6,00,000"
                      />
                    </span>
                    <span className="font-body text-xs text-muted mt-1">
                      Typical timeline: 8–16 weeks
                    </span>
                  </div>

                  <Link
                    href="/start-project"
                    className={cn(
                      buttonVariants({
                        variant: "primary",
                        className: "w-full justify-between group mt-8",
                      })
                    )}
                  >
                    Discuss your product
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 5 — OFFER 3: PLATFORM MODERNIZATION & INTEGRATION
          Full-width layout, different visual treatment.
          ═══════════════════════════════════════════════════════ */}
      <section className="border-t border-border py-20 md:py-32 relative overflow-hidden">
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute top-4 right-[-2vw] font-display leading-none text-[18vw] md:text-[13vw] text-primary/[0.03]"
        >
          03
        </span>

        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <ScrollReveal>
            <div className="flex items-baseline justify-between gap-6 border-b border-border pb-5 mb-12 md:mb-16">
              <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-muted">
                03 — Modernization
              </span>
            </div>
          </ScrollReveal>

          {/* Wide heading with supporting text */}
          <ScrollReveal delay={0.05}>
            <div className="max-w-3xl mb-12 md:mb-16">
              <h2 className="font-display font-normal text-primary text-[clamp(36px,5vw,64px)] leading-[0.95] tracking-[-0.02em] mb-6">
                Platform Modernization
                <br />
                & Integration
              </h2>
              <p className="font-body text-secondary text-lg leading-relaxed max-w-xl">
                Technical debt silently compounds. Legacy systems become
                bottlenecks. Disconnected tools create manual workarounds that
                cost hours every week. We untangle the complexity and build
                infrastructure designed to last.
              </p>
            </div>
          </ScrollReveal>

          {/* Before / After transformation visual */}
          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-0 mb-12 md:mb-16 border border-border rounded-2xl overflow-hidden">
              {/* Before */}
              <div className="p-8 md:p-10 bg-surface border-b md:border-b-0 md:border-r border-border">
                <span className="font-mono text-[10px] tracking-widest uppercase text-error/70 block mb-6">
                  Before
                </span>
                <ul className="flex flex-col gap-4">
                  {[
                    "Manual data entry across disconnected systems",
                    "Slow deployments with frequent rollback failures",
                    "Outdated dependencies with known security risks",
                    "No monitoring — issues discovered by customers",
                    "Knowledge trapped in undocumented legacy code",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 font-body text-sm text-secondary"
                    >
                      <span className="text-error/60 mt-0.5 shrink-0">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* After */}
              <div className="p-8 md:p-10 bg-fog-green/30">
                <span className="font-mono text-[10px] tracking-widest uppercase text-success/70 block mb-6">
                  After
                </span>
                <ul className="flex flex-col gap-4">
                  {[
                    "Automated data synchronization across platforms",
                    "Zero-downtime deployments with rollback safety",
                    "Modern, maintained stack with security patches",
                    "Real-time monitoring and alerting infrastructure",
                    "Documented, tested, maintainable codebase",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 font-body text-sm text-secondary"
                    >
                      <Check className="w-4 h-4 text-success shrink-0 opacity-70 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* Deliverables + pricing side-by-side */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <ScrollReveal delay={0.05}>
                <div className="flex flex-wrap gap-3 mb-8">
                  {[
                    "Automated Data Flow",
                    "Reduced Maintenance Costs",
                    "Eliminated Technical Debt",
                    "Improved Security Posture",
                  ].map((outcome) => (
                    <span
                      key={outcome}
                      className="inline-flex items-center px-4 py-2 rounded-full border border-border text-xs font-mono tracking-wide text-secondary bg-surface-elevated/50"
                    >
                      {outcome}
                    </span>
                  ))}
                </div>

                <div className="border-t border-border/50 pt-8">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-muted block mb-3">
                    Who this is for
                  </span>
                  <p className="font-body text-secondary text-[15px] leading-relaxed max-w-lg">
                    Established businesses where legacy systems are slowing
                    growth. Companies paying premium SaaS subscriptions for
                    tools that don&apos;t talk to each other. Teams spending
                    more time maintaining code than building features.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-5">
              <ScrollReveal delay={0.12}>
                <div className="border border-border rounded-[2rem] p-8 md:p-10 bg-surface">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-muted block mb-6">
                    Typical Deliverables
                  </span>
                  <ul className="flex flex-col gap-4 mb-10">
                    {[
                      "Codebase & Architecture Audit",
                      "Incremental Refactoring Strategy",
                      "Custom API Development",
                      "Third-Party System Integration",
                      "Cloud Migration & Optimization",
                      "Documentation & Knowledge Transfer",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-primary shrink-0 opacity-60 mt-0.5" />
                        <span className="font-body text-sm text-secondary">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-border/50 pt-8 flex flex-col gap-2">
                    <span className="font-mono text-[10px] tracking-widest uppercase text-muted">
                      Engagements start at
                    </span>
                    <span className="font-display text-3xl text-primary">
                      <LocalizedPrice
                        usdPrice="$4,000"
                        inrPrice="₹3,20,000"
                      />
                    </span>
                    <span className="font-body text-xs text-muted mt-1">
                      Typical timeline: 6–10 weeks
                    </span>
                  </div>

                  <Link
                    href="/start-project"
                    className={cn(
                      buttonVariants({
                        variant: "primary",
                        className: "w-full justify-between group mt-8",
                      })
                    )}
                  >
                    Discuss your infrastructure
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 6 — ENGINEERING PRINCIPLES
          Replaces the generic "Our Process" with SARIV's actual
          engineering philosophy. 4 principles, numbered, staggered.
          ═══════════════════════════════════════════════════════ */}
      <section
        ref={parallaxRef}
        className="border-t border-border py-20 md:py-32 bg-surface-elevated relative overflow-hidden"
      >
        {/* Subtle noise texture — matches about page */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />

        <div className="relative max-w-[1200px] mx-auto px-6 md:px-8">
          <ScrollReveal>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted block mb-8">
              How We Build
            </span>
            <h2 className="font-display font-normal text-primary text-[clamp(36px,5vw,56px)] leading-[1] tracking-[-0.02em] max-w-2xl mb-16 md:mb-20">
              Engineering principles, not process templates.
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 md:gap-y-16">
            {ENGINEERING_PRINCIPLES.map((principle, i) => (
              <ScrollReveal key={principle.number} delay={i * 0.08}>
                <motion.div
                  style={{ y: i % 2 === 1 ? parallaxY : 0 }}
                  className="flex flex-col"
                >
                  <span className="font-mono text-[10px] text-muted tracking-widest mb-4">
                    {principle.number}
                  </span>
                  <h3 className="font-display font-normal text-primary text-xl md:text-2xl leading-tight mb-4">
                    {principle.title}
                  </h3>
                  <p className="font-body text-secondary text-[15px] leading-relaxed">
                    {principle.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 7 — ENGAGEMENT METRICS / PROOF
          Horizontal stat bar to break visual monotony
          ═══════════════════════════════════════════════════════ */}
      <section className="border-t border-border py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: "100", suffix: "%", label: "Code ownership transferred to you" },
              { value: "<1s", suffix: "", label: "Target load time for every project" },
              { value: "0", suffix: "", label: "Vendor lock-in by design" },
              { value: "24h", suffix: "", label: "Response time on all inquiries" },
            ].map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.06}>
                <div className="flex flex-col">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  <span className="font-body text-secondary text-sm mt-3 leading-snug">
                    {stat.label}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 8 — HOW WE ENGAGE (Process)
          Vertical timeline instead of horizontal cards.
          ═══════════════════════════════════════════════════════ */}
      <section className="border-t border-border py-20 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-12 md:gap-24">
            {/* Left: sticky heading */}
            <ScrollReveal>
              <div className="md:sticky md:top-32">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted block mb-8">
                  How We Engage
                </span>
                <h2 className="font-display font-normal text-primary text-[clamp(32px,4vw,48px)] leading-[1.05] tracking-[-0.02em] mb-6">
                  Every engagement follows the same discipline.
                </h2>
                <p className="font-body text-secondary text-base leading-relaxed max-w-sm">
                  We don&apos;t skip steps. Predictability and transparency are
                  how we earn trust — and how we consistently deliver software
                  that works on day one.
                </p>
              </div>
            </ScrollReveal>

            {/* Right: timeline steps */}
            <div className="flex flex-col">
              {[
                {
                  phase: "Phase 1",
                  title: "Understanding & Scoping",
                  description:
                    "We invest time in understanding your business problem — not just the feature list. This phase produces a detailed scope document, technical architecture, and a fixed-price proposal. No ambiguity.",
                  duration: "1–2 weeks",
                },
                {
                  phase: "Phase 2",
                  title: "Design & Architecture",
                  description:
                    "We design the user experience and technical foundation in parallel. Database schemas, API contracts, deployment strategies, and UI prototypes — all validated before a single line of production code.",
                  duration: "1–3 weeks",
                },
                {
                  phase: "Phase 3",
                  title: "Iterative Engineering",
                  description:
                    "We build in focused sprints with complete visibility. You receive working demos at every milestone — not a black box followed by a big reveal. Feedback loops are measured in days, not months.",
                  duration: "4–10 weeks",
                },
                {
                  phase: "Phase 4",
                  title: "Launch & Operational Readiness",
                  description:
                    "Deployment, monitoring, documentation, and knowledge transfer. We don't disappear after launch — we ensure your team is equipped to maintain and extend the system confidently.",
                  duration: "1–2 weeks",
                },
              ].map((step, i) => (
                <ScrollReveal key={step.phase} delay={i * 0.06}>
                  <div className={cn(
                    "relative pl-8 pb-12 md:pb-16",
                    i < 3 && "border-l border-border"
                  )}>
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-0 w-2 h-2 rounded-full bg-primary -translate-x-[5px]" />
                    
                    <div className="flex items-baseline gap-4 mb-3">
                      <span className="font-mono text-[10px] tracking-widest uppercase text-muted">
                        {step.phase}
                      </span>
                      <span className="font-mono text-[10px] tracking-widest text-muted/50">
                        {step.duration}
                      </span>
                    </div>
                    <h3 className="font-display font-normal text-primary text-xl md:text-2xl leading-tight mb-3">
                      {step.title}
                    </h3>
                    <p className="font-body text-secondary text-[15px] leading-relaxed max-w-lg">
                      {step.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 9 — FAQ
          Accordion-based, handling objections transparently.
          ═══════════════════════════════════════════════════════ */}
      <section className="border-t border-border py-20 md:py-32 bg-surface-elevated">
        <div className="max-w-[800px] mx-auto px-6 md:px-8">
          <ScrollReveal>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted block mb-8">
              Frequently Asked
            </span>
            <h2 className="font-display font-normal text-primary text-[clamp(32px,4vw,48px)] leading-[1.05] tracking-[-0.02em] mb-12 md:mb-16">
              Questions we get asked.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <Accordion type="single" collapsible className="w-full">
              {FAQ_ITEMS.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>
                    <p className="leading-relaxed max-w-xl">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 10 — CTA
          Closing invitation — matches about page CTA pattern.
          ═══════════════════════════════════════════════════════ */}
      <section className="border-t border-border py-28 md:py-40 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />

        <ScrollReveal>
          <div className="relative max-w-[1200px] mx-auto px-6 md:px-8 flex flex-col items-start gap-8">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted">
              Ready to start
            </span>
            <h2 className="font-display font-normal text-primary text-[clamp(40px,6.5vw,88px)] leading-[0.95] tracking-[-0.02em] max-w-3xl">
              Have something
              <br />
              worth building?
            </h2>
            <p className="font-body text-secondary text-lg max-w-lg leading-relaxed">
              Tell us about your project. We&apos;ll respond within 24 hours
              with an honest assessment of how we can help — or whether
              we&apos;re the right fit.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4 mt-4">
              <Magnetic strength={15}>
                <Link
                  href="/start-project"
                  className={buttonVariants({
                    variant: "primary",
                    size: "large",
                  })}
                >
                  Start a Project
                </Link>
              </Magnetic>
              <Magnetic strength={15}>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 font-body font-medium text-secondary hover:text-primary transition-colors text-base h-[56px] px-2"
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
