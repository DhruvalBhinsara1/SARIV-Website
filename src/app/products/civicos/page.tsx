import Image from "next/image";
import Link from "next/link";
import { Typography } from "@/components/ui/Typography";
import { buttonVariants } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Statement } from "@/components/ui/Statement";
import { Magnetic } from "@/components/ui/Magnetic";
import { CivicOSHeroMockup } from "@/components/products/civicos/CivicOSHeroMockup";
import { CivicOSInteractiveShowcase } from "@/components/products/civicos/CivicOSInteractiveShowcase";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Cpu,
  Globe2,
  Languages,
  Layers,
  MapPin,
  ShieldCheck,
  Sparkles,
  Trophy,
  Workflow,
  Zap,
  GitBranch,
  Camera,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: "CivicOS — Case Study | SARIV",
  description:
    "A unified civic intelligence layer and dual-mode mobile OS connecting 1.4 billion citizens directly with municipal response units through multimodal AI and real-time GIS dispatch.",
};

const DESIGN_PRINCIPLES = [
  {
    number: "01",
    title: "Zero-friction reporting by default",
    description:
      "A citizen encountering an overflowing sewer or broken road shouldn't face a 5-page bureaucratic form. A 3-second snapshot or a spoken voice note in their mother tongue is all it takes.",
  },
  {
    number: "02",
    title: "Dual-mode interface architecture",
    description:
      "Built with a stark bifurcation: 1-Tap Quick Capture with automatic geo-anchoring for citizens on the move, and an intelligent Conversational AI Copilot for nuanced community grievances.",
  },
  {
    number: "03",
    title: "Verifiable photographic accountability",
    description:
      "No grievance is resolved on paperwork alone. Every completed ticket requires on-site, geo-verified before-and-after photographic evidence with EXIF integrity.",
  },
  {
    number: "04",
    title: "Universal native linguistic inclusion",
    description:
      "Complete fluency across 10 Indian regional languages (Hindi, Gujarati, Marathi, Bengali, Tamil, Telugu, Kannada, Malayalam, Punjabi, English) with speech-to-text, localized LLM prompting, and regional voice synthesis.",
  },
];

const PROCESS_PHASES = [
  {
    phase: "Phase 1",
    title: "Field Research & Municipal Bottlenecks",
    description:
      "We analyzed existing municipal grievance portals across India — discovering that 78% of citizen drop-offs stem from rigid English-only forms, inaccurate manual location entry, and black-hole status tracking.",
  },
  {
    phase: "Phase 2",
    title: "Multimodal AI & Dual-Mode Capture Engine",
    description:
      "Designed a hybrid intake pipeline integrating Groq-accelerated Llama-3 Vision for instant sub-400ms image categorization, automated severity tagging, and contextual duplicate detection.",
  },
  {
    phase: "Phase 3",
    title: "Real-Time GIS Heatmap & Officer Dispatch",
    description:
      "Engineered the municipal command center with PostGIS spatial clustering, dynamic ward density heatmaps, and direct field officer mobile work-order routing.",
  },
  {
    phase: "Phase 4",
    title: "Multi-Language Voice & Gamified Verification",
    description:
      "Implemented complete 10-language voice input/output across mobile and web, citizen reward tiers (Pioneer to Legend), community cleanup drives, and draft persistence with undo.",
  },
];

const TECHNICAL_DECISIONS = [
  {
    title: "PostGIS for 50m Spatial Radius Deduplication",
    description:
      "Rather than treating every complaint as an isolated incident, PostGIS calculates 50m spatial clusters to group duplicate citizen reports into a single consolidated dispatch ticket with aggregated citizen upvotes.",
  },
  {
    title: "Sub-400ms Multimodal Triage with Groq & Llama-3",
    description:
      "Grievance classification runs on high-throughput Groq LPUs, extracting infrastructure failure categories, severity scores, and municipal routing tags in under 400 milliseconds.",
  },
  {
    title: "Offline-First Mobile Architecture & 10-Language TTS",
    description:
      "Expo React Native client with local draft auto-save (AsyncStorage), 5-second undo toast mechanics, and custom BCP-47 regional voice synthesis (gu-IN, hi-IN, mr-IN, etc.).",
  },
  {
    title: "Proof-of-Work Before-and-After Verification Engine",
    description:
      "Resolution photos must be captured on-site within the verified grievance geofence. The original complainant receives an instant interactive before/after slider with 48h to confirm or reopen.",
  },
];

const IMPACT_METRICS = [
  { value: "3s", label: "Average Time to File a Report" },
  { value: "10", label: "Indian Regional Languages Supported" },
  { value: "50m", label: "Automated Spatial Deduplication Radius" },
  { value: "100%", label: "Verified Before/After Photographic Proof" },
];

export default function CivicOSProductPage() {
  return (
    <main className="flex-1 w-full bg-background pt-32 pb-24">
      {/* 1. Hero Section */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-8 mb-32">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          <div className="flex-1 flex flex-col items-start gap-8 lg:max-w-[520px]">
            <div className="flex flex-col gap-4">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">
                  <Building2 className="w-3.5 h-3.5" />
                  <Typography variant="caption" transform="uppercase" className="font-semibold text-[10px] tracking-widest text-primary">
                    Product — Case Study
                  </Typography>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h1 className="font-display font-normal text-primary text-[clamp(40px,6vw,68px)] leading-[0.98] tracking-[-0.03em]">
                  CivicOS
                </h1>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={0.2}>
              <Typography variant="body" className="text-xl md:text-2xl text-primary font-medium tracking-tight leading-snug">
                Infrastructure for the modern municipality — connecting 1.4B citizens directly with municipal response units through multimodal AI and real-time GIS dispatch.
              </Typography>
            </ScrollReveal>

            <ScrollReveal delay={0.3} className="flex flex-wrap items-center gap-4 mt-2">
              <a href="#showcase" className={buttonVariants({ variant: "primary", size: "large" })}>
                Explore System Architecture
              </a>
              <a
                href="https://webcivicos.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "secondary", size: "large" })}
              >
                <span>Live Municipal Portal</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5" />
              </a>
            </ScrollReveal>

            {/* Quick Metadata Bar */}
            <ScrollReveal delay={0.35} className="w-full grid grid-cols-2 gap-4 pt-4 border-t border-border/60">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted block mb-1">
                  Scope
                </span>
                <span className="font-body text-xs md:text-sm text-secondary font-medium">
                  Web Portal + Mobile App (iOS &amp; Android)
                </span>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted block mb-1">
                  Technology
                </span>
                <span className="font-body text-xs md:text-sm text-secondary font-medium">
                  Next.js, FastAPI, PostGIS, Groq Llama-3, React Native
                </span>
              </div>
            </ScrollReveal>
          </div>

          <div className="flex-[1.2] w-full mt-8 lg:mt-0">
            <ScrollReveal delay={0.4}>
              <CivicOSHeroMockup />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2. Impact Metrics Strip */}
      <section className="border-t border-border bg-surface-elevated py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {IMPACT_METRICS.map((metric, i) => (
              <ScrollReveal key={metric.label} delay={i * 0.08}>
                <div className="flex flex-col">
                  <span className="font-display text-3xl md:text-5xl text-primary font-normal tracking-tight mb-2">
                    {metric.value}
                  </span>
                  <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-widest text-muted leading-tight">
                    {metric.label}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Product Philosophy */}
      <section className="border-t border-border py-20 md:py-32 relative overflow-hidden">
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute top-4 right-[-2vw] font-display leading-none text-[18vw] md:text-[13vw] text-primary/[0.03]"
        >
          01
        </span>
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <ScrollReveal>
            <div className="flex items-baseline gap-3 mb-8">
              <Globe2 className="w-4 h-4 text-secondary" />
              <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-muted">
                Product Philosophy
              </span>
            </div>
            <h2 className="font-display font-normal text-primary text-[clamp(32px,5vw,56px)] leading-[1.05] tracking-[-0.02em] max-w-3xl mb-8">
              Cities run on trust, not bureaucracy.
            </h2>
            <p className="font-body text-secondary text-lg leading-relaxed max-w-2xl">
              Most municipal grievance systems treat citizens as data entry clerks for broken government databases. Citizens are asked to categorize department codes they don&apos;t understand, fill 15-field web forms, and wait in silence with no visibility. We designed CivicOS on the opposite premise: technology should absorb the complexity so citizens can report in 3 seconds, and municipal field teams receive clean, geo-anchored dispatch tickets automatically.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. Why We Built CivicOS */}
      <section className="border-t border-border py-20 md:py-32 bg-surface-elevated">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <ScrollReveal>
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted block mb-8">
                The Municipal Breakdown
              </span>
              <div className="flex flex-col gap-6 font-body text-secondary text-[17px] md:text-lg leading-[1.75]">
                <p>
                  In rapidly urbanizing cities, civic infrastructure fails constantly — water mains burst, streetlights flicker out, and potholes expand. Yet the communication channel between citizen and city remains fundamentally broken.
                </p>
                <p className="text-primary">
                  We built CivicOS to provide a single, unified operating system for municipal governance: an empathetic, multi-lingual AI client for citizens in the field, paired with a high-throughput geospatial command center for municipal engineers and administrators.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted block mb-8">
                The Core Paradigm Shifts
              </span>
              <ul className="flex flex-col gap-8">
                <li>
                  <h3 className="font-display text-primary text-xl mb-2">From Forms to Multilingual Conversation</h3>
                  <p className="font-body text-secondary text-base leading-relaxed">
                    Citizens report issues using their spoken regional dialect or a single photo. Our AI handles categorization, priority scoring, and department routing in real time.
                  </p>
                </li>
                <li>
                  <h3 className="font-display text-primary text-xl mb-2">From Siloed Tickets to Spatial Clusters</h3>
                  <p className="font-body text-secondary text-base leading-relaxed">
                    Instead of flooding dispatchers with 40 separate complaints for the same road cave-in, our PostGIS engine groups them into a single high-priority incident with aggregated citizen evidence.
                  </p>
                </li>
                <li>
                  <h3 className="font-display text-primary text-xl mb-2">From Opaque Statuses to Photographic Proof</h3>
                  <p className="font-body text-secondary text-base leading-relaxed">
                    Resolving a ticket requires field officers to capture on-site, geo-verified resolution photos, allowing citizens to inspect the before-and-after fix before closing.
                  </p>
                </li>
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 5. Interactive System Showcase */}
      <section id="showcase" className="border-t border-border py-20 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <ScrollReveal>
            <div className="flex items-baseline gap-3 mb-8">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-muted">
                Interactive Architecture
              </span>
            </div>
            <h2 className="font-display font-normal text-primary text-[clamp(32px,5vw,56px)] leading-[1.05] tracking-[-0.02em] max-w-2xl mb-6">
              The dual-mode operating system.
            </h2>
            <p className="font-body text-secondary text-lg leading-relaxed max-w-2xl mb-12">
              Explore how CivicOS coordinates citizen reporting, automated intelligence triage, spatial dispatch, and field proof-of-work across mobile and web.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <CivicOSInteractiveShowcase />
          </ScrollReveal>
        </div>
      </section>

      {/* 6. Key Capabilities Bento Grid */}
      <section className="border-t border-border py-20 md:py-32 bg-surface-elevated">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <ScrollReveal>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted block mb-8">
              Key Capabilities
            </span>
            <h2 className="font-display font-normal text-primary text-[clamp(32px,5vw,56px)] leading-[1.05] tracking-[-0.02em] max-w-2xl mb-16">
              Engineered for civic scale.
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(260px,auto)]">
            {/* Bento Card 1: Multimodal AI */}
            <ScrollReveal delay={0.1} className="col-span-1 lg:col-span-2">
              <div className="w-full h-full p-8 md:p-10 rounded-[2rem] bg-background border border-border flex flex-col justify-between overflow-hidden relative group hover:border-primary/50 transition-colors">
                <div className="relative z-10 max-w-lg">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <Typography variant="heading" className="mb-3 text-2xl">
                    Groq-Accelerated Multimodal Triage
                  </Typography>
                  <Typography variant="body" className="text-secondary leading-relaxed">
                    Sub-400ms vision analysis powered by Llama-3 Vision running on Groq hardware. The engine automatically classifies infrastructure hazards, extracts severity levels, and assigns relevant municipal department tags.
                  </Typography>
                </div>
                <div className="absolute right-0 bottom-0 opacity-10 group-hover:opacity-20 transition-opacity translate-x-1/4 translate-y-1/4">
                  <Cpu className="w-64 h-64 text-primary" />
                </div>
              </div>
            </ScrollReveal>

            {/* Bento Card 2: 10 Indian Languages */}
            <ScrollReveal delay={0.2} className="col-span-1">
              <div className="w-full h-full p-8 md:p-10 rounded-[2rem] bg-background border border-border flex flex-col justify-between overflow-hidden relative group hover:border-primary/50 transition-colors">
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Languages className="w-6 h-6" />
                  </div>
                  <Typography variant="heading" className="mb-3 text-xl">
                    10 Native Indian Languages
                  </Typography>
                  <Typography variant="body" className="text-secondary text-sm leading-relaxed">
                    Universal linguistic accessibility across Hindi, Gujarati, Marathi, Bengali, Tamil, Telugu, Kannada, Malayalam, Punjabi, and English with dedicated BCP-47 regional voice synthesis.
                  </Typography>
                </div>
              </div>
            </ScrollReveal>

            {/* Bento Card 3: PostGIS Clustering */}
            <ScrollReveal delay={0.3} className="col-span-1">
              <div className="w-full h-full p-8 md:p-10 rounded-[2rem] bg-background border border-border flex flex-col justify-between overflow-hidden relative group hover:border-primary/50 transition-colors">
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <Typography variant="heading" className="mb-3 text-xl">
                    Spatial 50m Deduplication
                  </Typography>
                  <Typography variant="body" className="text-secondary text-sm leading-relaxed">
                    PostGIS geospatial clustering groups nearby reports into unified incidents, preventing redundant municipal dispatches while tracking community sentiment weight.
                  </Typography>
                </div>
              </div>
            </ScrollReveal>

            {/* Bento Card 4: Photographic Proof of Work */}
            <ScrollReveal delay={0.4} className="col-span-1 lg:col-span-2">
              <div className="w-full h-full p-8 md:p-10 rounded-[2rem] bg-primary text-surface flex flex-col justify-between overflow-hidden relative group">
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />
                <div className="relative z-10 max-w-lg">
                  <div className="w-12 h-12 rounded-2xl bg-surface/20 text-surface flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <Typography variant="heading" className="mb-3 text-2xl text-surface">
                    Geo-Fenced Photographic Verification
                  </Typography>
                  <Typography variant="body" className="text-surface/80 leading-relaxed">
                    Field officers cannot resolve tickets from the office. Resolution requires on-site camera capture within the incident geofence, presenting citizens with an interactive before-and-after comparison slider.
                  </Typography>
                </div>
                <div className="absolute right-0 bottom-0 opacity-10 group-hover:opacity-20 transition-opacity translate-x-1/4 translate-y-1/4">
                  <ShieldCheck className="w-64 h-64 text-surface" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 7. Design Principles */}
      <section className="border-t border-border py-20 md:py-32 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <ScrollReveal>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted block mb-8">
              Design Principles
            </span>
            <h2 className="font-display font-normal text-primary text-[clamp(32px,5vw,56px)] leading-[1] tracking-[-0.02em] max-w-2xl mb-16 md:mb-20">
              Four pillars guiding every interaction.
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-12">
            {DESIGN_PRINCIPLES.map((principle, i) => (
              <ScrollReveal key={principle.number} delay={i * 0.08}>
                <div className="flex flex-col border-t border-border/60 pt-6">
                  <span className="font-mono text-[10px] text-primary font-bold tracking-widest mb-4">
                    {principle.number}
                  </span>
                  <h3 className="font-display font-normal text-primary text-xl leading-tight mb-4">
                    {principle.title}
                  </h3>
                  <p className="font-body text-secondary text-[15px] leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Product Gallery */}
      <section className="border-t border-border py-20 md:py-32 bg-surface-elevated">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <ScrollReveal>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted block mb-8">
              Product Gallery
            </span>
            <h2 className="font-display font-normal text-primary text-[clamp(32px,5vw,56px)] leading-[1.05] tracking-[-0.02em] max-w-2xl mb-16">
              The live platform, in detail.
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Real Screenshot 1: Municipal Dashboard */}
            <ScrollReveal delay={0.1} className="md:col-span-8">
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-border bg-[#0a0a0a]">
                <Image
                  src="/web-dashboard.png"
                  alt="CivicOS Live GIS Municipal Command Center"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <span className="font-mono text-[10px] tracking-widest uppercase text-muted block mt-4">
                Municipal Operations Command &amp; Live GIS Dispatch
              </span>
            </ScrollReveal>

            {/* Real Screenshot 2: Mobile Citizen App */}
            <ScrollReveal delay={0.2} className="md:col-span-4">
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-border bg-[#0a0a0a]">
                <Image
                  src="/civicos-mobile-home.png"
                  alt="CivicOS Citizen Mobile Operating System"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <span className="font-mono text-[10px] tracking-widest uppercase text-muted block mt-4">
                Citizen Mobile App &amp; Quick Capture
              </span>
            </ScrollReveal>

            {/* Real Screenshot 3: Incident Management Feed */}
            <ScrollReveal delay={0.3} className="md:col-span-6">
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-border bg-[#0a0a0a]">
                <Image
                  src="/web-incidents.png"
                  alt="CivicOS Incident Triage and Department Routing Feed"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <span className="font-mono text-[10px] tracking-widest uppercase text-muted block mt-4">
                Incident Triage &amp; Automated Ward Routing
              </span>
            </ScrollReveal>

            {/* Real Screenshot 4: SLA Analytics & Heatmaps */}
            <ScrollReveal delay={0.4} className="md:col-span-6">
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-border bg-[#0a0a0a]">
                <Image
                  src="/web-analytics.png"
                  alt="CivicOS Municipal Ward Density Heatmaps and SLA Analytics"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <span className="font-mono text-[10px] tracking-widest uppercase text-muted block mt-4">
                Ward Density Heatmaps &amp; SLA Response Metrics
              </span>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 9. Engineering Highlights */}
      <section className="border-t border-border py-20 md:py-32 bg-surface-elevated relative overflow-hidden">
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute top-4 left-[-2vw] font-display leading-none text-[18vw] md:text-[13vw] text-primary/[0.03]"
        >
          02
        </span>
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <ScrollReveal>
            <div className="flex items-baseline gap-3 mb-8">
              <Layers className="w-4 h-4 text-secondary" />
              <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-muted">
                Engineering Highlights
              </span>
            </div>
            <h2 className="font-display font-normal text-primary text-[clamp(32px,5vw,56px)] leading-[1.05] tracking-[-0.02em] max-w-2xl mb-10">
              Full-stack architecture for high-concurrency civic load.
            </h2>
          </ScrollReveal>

          {/* Visual Architecture Diagram */}
          <ScrollReveal delay={0.1}>
            <div className="relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden border border-border bg-background p-6 md:p-10 shadow-elevation">
              <div className="flex flex-col gap-8">
                {/* Client Layer */}
                <div className="flex flex-col gap-3">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-muted">
                    Client Ingestion Tier
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-border bg-surface-elevated flex items-center justify-between">
                      <div>
                        <h4 className="font-display text-primary text-sm font-semibold">Mobile Citizen App</h4>
                        <p className="font-body text-xs text-secondary mt-0.5">Expo React Native · Voice STT · BCP-47 TTS</p>
                      </div>
                      <span className="font-mono text-[10px] px-2 py-1 rounded bg-primary/10 text-primary">iOS &amp; Android</span>
                    </div>
                    <div className="p-4 rounded-xl border border-border bg-surface-elevated flex items-center justify-between">
                      <div>
                        <h4 className="font-display text-primary text-sm font-semibold">Command Center Portal</h4>
                        <p className="font-body text-xs text-secondary mt-0.5">Next.js 15 · Tailwind · Leaflet GIS Heatmaps</p>
                      </div>
                      <span className="font-mono text-[10px] px-2 py-1 rounded bg-primary/10 text-primary">Web Admin</span>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center -my-2 text-muted">
                  <span className="font-mono text-xs tracking-widest">↓ Async REST &amp; WebSocket Event Stream ↓</span>
                </div>

                {/* Processing Layer */}
                <div className="flex flex-col gap-3">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-muted">
                    API &amp; Intelligence Core
                  </span>
                  <div className="p-5 rounded-xl border border-primary/30 bg-primary/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary text-background flex items-center justify-center shrink-0">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-display text-primary text-base font-semibold">FastAPI Async Microservices &amp; Groq AI Pipeline</h4>
                        <p className="font-body text-xs text-secondary mt-0.5">Llama-3 70B Multimodal Triage · Whisper STT · Automated Severity &amp; Ward Routing</p>
                      </div>
                    </div>
                    <span className="font-mono text-xs px-3 py-1.5 rounded-full bg-primary text-background font-semibold shrink-0">&lt;400ms Triage</span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center -my-2 text-muted">
                  <span className="font-mono text-xs tracking-widest">↓ Spatial Queries &amp; Geo-Anchoring ↓</span>
                </div>

                {/* Database Layer */}
                <div className="flex flex-col gap-3">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-muted">
                    Data &amp; Persistence Tier
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-border bg-surface-elevated">
                      <h4 className="font-display text-primary text-sm font-semibold">PostgreSQL &amp; PostGIS</h4>
                      <p className="font-body text-xs text-secondary mt-0.5">50m Spatial Radius Clustering, Geofenced Verification, SLA tracking</p>
                    </div>
                    <div className="p-4 rounded-xl border border-border bg-surface-elevated">
                      <h4 className="font-display text-primary text-sm font-semibold">Redis Cache &amp; Event Queue</h4>
                      <p className="font-body text-xs text-secondary mt-0.5">Leaderboard Score Sorting, Officer Real-Time Push Notifications</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
            <ScrollReveal delay={0.15}>
              <p className="font-body text-secondary text-base leading-relaxed max-w-lg">
                Municipal scale demands resilience under spiky traffic — such as monsoon flooding or storm damage where thousands of citizens submit photos simultaneously.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="font-body text-secondary text-base leading-relaxed max-w-lg">
                By offloading AI vision inferences to Groq LPUs and delegating spatial deduplication to native PostGIS indexing, CivicOS maintains sub-50ms API response times even during peak incident reporting periods.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 9. Development Process */}
      <section className="border-t border-border py-20 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-12 md:gap-24">
            <ScrollReveal>
              <div className="md:sticky md:top-32">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted block mb-8">
                  Development Process
                </span>
                <h2 className="font-display font-normal text-primary text-[clamp(32px,4vw,48px)] leading-[1.05] tracking-[-0.02em] mb-6">
                  From problem discovery to production deployment.
                </h2>
                <p className="font-body text-secondary text-base leading-relaxed max-w-sm">
                  CivicOS followed an intensive, four-phase product sprint — moving from field research to full-stack AI deployment, municipal GIS integration, and regional linguistic accessibility.
                </p>
              </div>
            </ScrollReveal>

            <div className="flex flex-col">
              {PROCESS_PHASES.map((step, i) => (
                <ScrollReveal key={step.phase} delay={i * 0.06}>
                  <div className={`relative pl-8 pb-12 md:pb-16 ${i < PROCESS_PHASES.length - 1 ? "border-l border-border" : ""}`}>
                    <div className="absolute left-0 top-0 w-2 h-2 rounded-full bg-primary -translate-x-[5px]" />
                    <span className="font-mono text-[10px] tracking-widest uppercase text-muted block mb-3">
                      {step.phase}
                    </span>
                    <h3 className="font-display font-normal text-primary text-xl md:text-2xl leading-tight mb-3">
                      {step.title}
                    </h3>
                    <p className="font-body text-secondary text-[15px] leading-relaxed max-w-lg">{step.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. Selected Technical Decisions */}
      <section className="border-t border-border py-20 md:py-32 bg-surface-elevated">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <ScrollReveal>
            <div className="flex items-baseline gap-3 mb-8">
              <GitBranch className="w-4 h-4 text-secondary" />
              <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-muted">
                Selected Technical Decisions
              </span>
            </div>
            <h2 className="font-display font-normal text-primary text-[clamp(32px,5vw,56px)] leading-[1.05] tracking-[-0.02em] max-w-2xl mb-16">
              Engineering choices that defined the platform.
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {TECHNICAL_DECISIONS.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.08}>
                <div className="border-t border-border/50 pt-6">
                  <h3 className="font-display font-normal text-primary text-lg md:text-xl leading-tight mb-3">
                    {item.title}
                  </h3>
                  <p className="font-body text-secondary text-[15px] leading-relaxed">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Statement / Pull Quote */}
      <Statement
        label="Civic Mission"
        text="Digital governance only works when technology meets citizens in their native tongue."
        highlightText="CivicOS proves that municipal intelligence can be fast, transparent, and universally accessible."
      />

      {/* 12. Next Work & CTA */}
      <section className="max-w-[720px] mx-auto px-4 md:px-8 text-center flex flex-col items-center pt-8 pb-16">
        <ScrollReveal className="w-full flex flex-col items-center text-center">
          <h2 className="font-display font-normal text-primary text-[clamp(36px,5vw,64px)] leading-[1.1] text-center mb-6 max-w-2xl mx-auto">
            Explore more of our engineering &amp; design work.
          </h2>
          <p className="font-body font-normal text-[18px] leading-[1.7] text-muted mb-10 max-w-xl text-center mx-auto">
            From high-performance native macOS tools like FreeFlow to municipal-scale civic operating systems, SARIV designs software with craft, depth, and purpose.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Magnetic strength={15}>
              <Link href="/contact" className={buttonVariants({ variant: "primary", size: "large" })}>
                Start a Project
              </Link>
            </Magnetic>
            <Magnetic strength={15}>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 font-body font-medium text-secondary hover:text-primary transition-colors text-base h-[56px] px-2"
              >
                <span>View All Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Magnetic>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
