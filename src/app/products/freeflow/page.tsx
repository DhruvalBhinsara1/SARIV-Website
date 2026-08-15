import Image from "next/image";
import Link from "next/link";
import freeflowUi from "../../../../public/freeflow-ui.png";
import { Typography } from "@/components/ui/Typography";
import { buttonVariants } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Statement } from "@/components/ui/Statement";
import { Magnetic } from "@/components/ui/Magnetic";
import { MotionShowcase } from "@/components/products/freeflow/MotionShowcase";
import { InteractiveMockup } from "@/components/products/freeflow/InteractiveMockup";
import {
  ArrowRight,
  Maximize2,
  MousePointer2,
  Lock,
  Zap,
  Compass,
  Layers,
  GitBranch,
  Sparkles,
} from "lucide-react";

const DESIGN_PRINCIPLES = [
  {
    number: "01",
    title: "Nothing manual by default",
    description:
      "Every click already knows its own focal point and bounding box. The system does the keyframing so the person recording doesn't have to.",
  },
  {
    number: "02",
    title: "Motion with intent",
    description:
      "Every zoom, pan, and cursor movement runs through the same spring-physics model — deliberate, continuous, never a hard cut.",
  },
  {
    number: "03",
    title: "Invisible until needed",
    description:
      "The interface disappears the moment recording starts. Controls surface only when a decision is actually required.",
  },
];

const PROCESS_PHASES = [
  {
    phase: "Phase 1",
    title: "Research & Capture Study",
    description:
      "We studied how product teams actually record demos today — the manual zoom, the shaky cursor, the re-takes — before writing a line of code.",
  },
  {
    phase: "Phase 2",
    title: "Prototyping the Zoom Engine",
    description:
      "The spring-physics model behind every automatic zoom went through dozens of easing-curve iterations before it felt right, not just correct.",
  },
  {
    phase: "Phase 3",
    title: "Native Performance Pass",
    description:
      "Moving from a general capture approach to ScreenCaptureKit and the Metal API directly, so encoding cost stays near zero even at 4K 60fps.",
  },
  {
    phase: "Phase 4",
    title: "Refinement & Dogfooding",
    description:
      "We use FreeFlow to record our own product demos. Every rough edge we hit ourselves becomes the next thing we fix.",
  },
];

const TECHNICAL_DECISIONS = [
  {
    title: "Built on ScreenCaptureKit, not a generic recorder",
    description:
      "FreeFlow requires macOS 13 or later because it's built directly on Apple's ScreenCaptureKit framework, rather than a cross-platform capture layer — the tradeoff is macOS-only, in exchange for low-latency, high-performance capture.",
  },
  {
    title: "Editing stays non-destructive",
    description:
      "A recording's automatic zooms are a timeline, not a baked-in export. Timing, easing, and bounding boxes stay adjustable until the moment of export.",
  },
  {
    title: "Audio kept on separate tracks",
    description:
      "Microphone input and internal system audio are captured simultaneously but kept on separate tracks, so post-processing doesn't mean re-recording.",
  },
  {
    title: "Export formats chosen for real workflows",
    description:
      "MP4 (H.264/HEVC) and WebM (VP9) for the web, lossless ProRes 422 for further editing, and an optimized GIF path built specifically for landing pages.",
  },
];

export default function FreeFlowProductPage() {
  return (
    <main className="flex-1 w-full bg-background pt-32 pb-24">
      {/* 1. Hero */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-8 mb-32">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          <div className="flex-1 flex flex-col items-start gap-8 lg:max-w-[500px]">
            <div className="flex flex-col gap-4">
              <ScrollReveal>
                <Typography variant="caption" transform="uppercase" muted>
                  Product — Case Study
                </Typography>
              </ScrollReveal>
              <ScrollReveal delay={0.1} className="relative h-12 md:h-16 w-auto max-w-full -ml-2">
                <Image
                  src="/freeflow-logo.png"
                  alt="FreeFlow"
                  width={400}
                  height={100}
                  className="h-full w-auto object-contain object-left"
                  priority
                />
              </ScrollReveal>
            </div>

            <ScrollReveal delay={0.2}>
              <Typography variant="body" className="text-xl md:text-2xl text-primary font-medium tracking-tight leading-tight">
                A native macOS recorder built to make product demos feel considered, not captured.
              </Typography>
            </ScrollReveal>

            <ScrollReveal delay={0.3} className="flex flex-wrap items-center gap-4 mt-2">
              <a href="#process" className={buttonVariants({ variant: "primary", size: "large" })}>
                Explore the Design Process
              </a>
              <Link href="/contact" className={buttonVariants({ variant: "secondary", size: "large" })}>
                Contact Us
              </Link>
            </ScrollReveal>
          </div>

          <div className="flex-[1.2] w-full mt-8 lg:mt-0">
            <ScrollReveal delay={0.4}>
              <InteractiveMockup src={freeflowUi} alt="FreeFlow interface" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2. Product Philosophy */}
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
              <Compass className="w-4 h-4 text-secondary" />
              <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-muted">
                Product Philosophy
              </span>
            </div>
            <h2 className="font-display font-normal text-primary text-[clamp(32px,5vw,56px)] leading-[1.05] tracking-[-0.02em] max-w-3xl mb-8">
              A demo is the first impression of a product that hasn&apos;t shipped yet.
            </h2>
            <p className="font-body text-secondary text-lg leading-relaxed max-w-2xl">
              Most screen recordings look like screen recordings — jittery cursors, abrupt cuts, zooms that
              call attention to themselves instead of the product. We think the tool used to tell a
              product&apos;s story should be held to the same standard as the product itself. FreeFlow is our
              answer to that: a recorder that gets out of the way.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. Why We Built FreeFlow */}
      <section className="border-t border-border py-20 md:py-32 bg-surface-elevated">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <ScrollReveal>
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted block mb-8">
                Why We Built It
              </span>
              <div className="flex flex-col gap-6 font-body text-secondary text-[17px] md:text-lg leading-[1.75]">
                <p>
                  Every product studio eventually needs to show its work — a demo for a client, a walkthrough
                  for a launch. We kept reaching for the same workaround: manual keyframing, timeline
                  scrubbing, hours spent making a thirty-second clip look intentional.
                </p>
                <p className="text-primary">
                  So we built the tool we wanted to use. FreeFlow started as an internal utility and became
                  a product in its own right once it was clear the problem wasn&apos;t unique to us.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted block mb-8">
                What Changed
              </span>
              <ul className="flex flex-col gap-8">
                <li>
                  <h3 className="font-display text-primary text-xl mb-2">From editing to recording</h3>
                  <p className="font-body text-secondary text-base leading-relaxed">
                    The zoom and pan a demo needs are decided at the moment of the click, not reconstructed
                    afterward in an editor.
                  </p>
                </li>
                <li>
                  <h3 className="font-display text-primary text-xl mb-2">From generic to native</h3>
                  <p className="font-body text-secondary text-base leading-relaxed">
                    Building directly on Apple&apos;s capture and graphics APIs instead of a
                    cross-platform abstraction layer.
                  </p>
                </li>
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4. Key Capabilities */}
      <section className="max-w-screen-xl mx-auto px-4 md:px-8 py-20 md:py-32">
        <ScrollReveal>
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted block mb-8">
            Key Capabilities
          </span>
          <h2 className="font-display font-normal text-primary text-[clamp(32px,5vw,56px)] leading-[1.05] tracking-[-0.02em] max-w-2xl mb-16">
            Engineered for perfection.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[minmax(260px,auto)]">
          <ScrollReveal delay={0.1} className="col-span-2 row-span-1">
            <div className="w-full h-full p-8 md:p-10 rounded-[2rem] bg-surface-elevated border border-border flex flex-col justify-between overflow-hidden relative group hover:border-primary/50 transition-colors">
              <div className="relative z-10 max-w-md">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Maximize2 className="w-6 h-6" />
                </div>
                <Typography variant="heading" className="mb-3 text-2xl">Algorithmic Zooming</Typography>
                <Typography variant="body" className="text-secondary">
                  We calculate the optimal focal point and bounding box for every click, moving the camera with a custom spring physics animation. No more manual keyframing.
                </Typography>
              </div>
              <div className="absolute right-0 bottom-0 opacity-10 group-hover:opacity-20 transition-opacity translate-x-1/4 translate-y-1/4">
                <Maximize2 className="w-64 h-64" />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="col-span-1 row-span-1">
            <div className="w-full h-full p-5 md:p-10 rounded-2xl md:rounded-[2rem] bg-surface-elevated border border-border flex flex-col justify-between overflow-hidden relative group hover:border-primary/50 transition-colors">
              <div className="relative z-10">
                <div className="w-9 h-9 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-3 md:mb-6 group-hover:scale-110 transition-transform">
                  <MousePointer2 className="w-4 h-4 md:w-6 md:h-6" />
                </div>
                <Typography variant="heading" className="mb-1.5 md:mb-3 text-base md:text-xl">Synthetic Cursor</Typography>
                <Typography variant="body" className="text-secondary text-xs md:text-sm">
                  FreeFlow hides the native, pixelated macOS cursor and renders a scalable vector cursor in post-production for maximum clarity at any zoom level.
                </Typography>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3} className="col-span-1 row-span-1">
            <div className="w-full h-full p-5 md:p-10 rounded-2xl md:rounded-[2rem] bg-surface-elevated border border-border flex flex-col justify-between overflow-hidden relative group hover:border-primary/50 transition-colors">
              <div className="relative z-10">
                <div className="w-9 h-9 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-3 md:mb-6 group-hover:scale-110 transition-transform">
                  <Lock className="w-4 h-4 md:w-6 md:h-6" />
                </div>
                <Typography variant="heading" className="mb-1.5 md:mb-3 text-base md:text-xl">Privacy First</Typography>
                <Typography variant="body" className="text-secondary text-xs md:text-sm">
                  Everything happens locally. We use Apple&apos;s ScreenCaptureKit directly, ensuring your sensitive product data never leaves your machine.
                </Typography>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4} className="col-span-2 row-span-1">
            <div className="w-full h-full p-8 md:p-10 rounded-[2rem] bg-primary text-surface flex flex-col justify-between overflow-hidden relative group">
              <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />
              <div className="relative z-10 max-w-md">
                <div className="w-12 h-12 rounded-2xl bg-surface/20 text-surface flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <Typography variant="heading" className="mb-3 text-2xl text-surface">Hardware Accelerated</Typography>
                <Typography variant="body" className="text-surface/80">
                  Leveraging the Metal API and Apple Silicon Media Engine to encode 4K 60fps ProRes video with near-zero CPU overhead.
                </Typography>
              </div>
              <div className="absolute right-0 bottom-0 opacity-10 group-hover:opacity-20 transition-opacity translate-x-1/4 translate-y-1/4">
                <Zap className="w-64 h-64 text-surface" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 5. Design Principles */}
      <section className="border-t border-border py-20 md:py-32 bg-surface-elevated relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />
        <div className="relative max-w-[1200px] mx-auto px-6 md:px-8">
          <ScrollReveal>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted block mb-8">
              Design Principles
            </span>
            <h2 className="font-display font-normal text-primary text-[clamp(32px,5vw,56px)] leading-[1] tracking-[-0.02em] max-w-2xl mb-16 md:mb-20">
              Three ideas the whole product is built around.
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-12">
            {DESIGN_PRINCIPLES.map((principle, i) => (
              <ScrollReveal key={principle.number} delay={i * 0.08}>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] text-muted tracking-widest mb-4">{principle.number}</span>
                  <h3 className="font-display font-normal text-primary text-xl md:text-2xl leading-tight mb-4">
                    {principle.title}
                  </h3>
                  <p className="font-body text-secondary text-[15px] leading-relaxed">{principle.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Engineering Highlights */}
      <section className="border-t border-border py-20 md:py-32 relative overflow-hidden">
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
              Fast because it runs close to the metal.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="relative w-full max-w-2xl mx-auto aspect-[3/2] rounded-2xl overflow-hidden border border-border bg-surface-elevated">
              <Image src="/freeflow_diagram.png" alt="FreeFlow's local capture pipeline: ScreenCaptureKit to Zoom Engine to Metal Encode to Local Export" fill className="object-contain p-4" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
            <ScrollReveal delay={0.15}>
              <p className="font-body text-secondary text-base leading-relaxed max-w-lg">
                Every frame stays on-device, start to finish. There&apos;s no upload step and no cloud
                render queue — the same machine that captures the screen also does the encoding, in real
                time, on the Apple Silicon Media Engine.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="font-body text-secondary text-base leading-relaxed max-w-lg">
                That local-first architecture is also why FreeFlow never asks for network access to
                function. Privacy wasn&apos;t layered on afterward — it fell out of the decision to build
                on-device from day one.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 7. Product Gallery */}
      <section className="border-t border-border py-20 md:py-32 bg-surface-elevated">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <ScrollReveal>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted block mb-8">
              Product Gallery
            </span>
            <h2 className="font-display font-normal text-primary text-[clamp(32px,5vw,56px)] leading-[1.05] tracking-[-0.02em] max-w-2xl mb-16">
              The interface, in detail.
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <ScrollReveal delay={0.1} className="md:col-span-3">
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-border bg-[#0a0a0a]">
                <Image src={freeflowUi} alt="FreeFlow full interface" fill className="object-cover object-top" />
              </div>
              <span className="font-mono text-[10px] tracking-widest uppercase text-muted block mt-4">
                Full Interface
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.2} className="md:col-span-2">
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-border bg-[#0a0a0a]">
                <Image
                  src={freeflowUi}
                  alt="FreeFlow recording controls, detail"
                  fill
                  className="object-cover object-right origin-right scale-[1.8]"
                />
              </div>
              <span className="font-mono text-[10px] tracking-widest uppercase text-muted block mt-4">
                Recording Controls, Detail
              </span>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 8. Motion & Interaction Showcase */}
      <section className="border-t border-border py-20 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <ScrollReveal>
            <div className="flex items-baseline gap-3 mb-8">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-muted">
                Motion &amp; Interaction
              </span>
            </div>
            <h2 className="font-display font-normal text-primary text-[clamp(32px,5vw,56px)] leading-[1.05] tracking-[-0.02em] max-w-2xl mb-6">
              The zoom is the product.
            </h2>
            <p className="font-body text-secondary text-lg leading-relaxed max-w-2xl mb-12">
              An illustrative recreation of the spring-physics curve behind every automatic zoom — the same
              easing model FreeFlow applies to a real recording.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <MotionShowcase />
          </ScrollReveal>
        </div>
      </section>

      {/* 9. Development Process */}
      <section id="process" className="border-t border-border py-20 md:py-32 bg-surface-elevated">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-12 md:gap-24">
            <ScrollReveal>
              <div className="md:sticky md:top-32">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted block mb-8">
                  Development Process
                </span>
                <h2 className="font-display font-normal text-primary text-[clamp(32px,4vw,48px)] leading-[1.05] tracking-[-0.02em] mb-6">
                  Built the way we build for clients.
                </h2>
                <p className="font-body text-secondary text-base leading-relaxed max-w-sm">
                  FreeFlow followed the same discipline as any SARIV engagement — research first, native
                  performance by design, and refinement through real use.
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
      <section className="border-t border-border py-20 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <ScrollReveal>
            <div className="flex items-baseline gap-3 mb-8">
              <GitBranch className="w-4 h-4 text-secondary" />
              <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-muted">
                Selected Technical Decisions
              </span>
            </div>
            <h2 className="font-display font-normal text-primary text-[clamp(32px,5vw,56px)] leading-[1.05] tracking-[-0.02em] max-w-2xl mb-16">
              A few choices worth explaining.
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

      {/* 11. What's Next */}
      <Statement
        label="What's Next"
        text="FreeFlow is still being refined by the same team that uses it every week."
        highlightText="We're exploring where it goes next before we say more."
      />

      {/* 12. CTA */}
      <section className="max-w-[720px] mx-auto px-4 md:px-8 text-center flex flex-col items-center pt-8 pb-16">
        <ScrollReveal className="w-full flex flex-col items-center text-center">
          <h2 className="font-display font-normal text-primary text-[clamp(36px,5vw,64px)] leading-[1.1] text-center mb-6 max-w-2xl mx-auto">
            Follow where FreeFlow goes next.
          </h2>
          <p className="font-body font-normal text-[18px] leading-[1.7] text-muted mb-10 max-w-xl text-center mx-auto">
            FreeFlow will eventually live on its own site, with its own documentation and release notes.
            For now, this is where we&apos;re telling its story.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Magnetic strength={15}>
              <Link href="/contact" className={buttonVariants({ variant: "primary", size: "large" })}>
                Follow Development
              </Link>
            </Magnetic>
            <Magnetic strength={15}>
              <Link href="/work" className="inline-flex items-center gap-2 font-body font-medium text-secondary hover:text-primary transition-colors text-base h-[56px] px-2">
                See More of Our Work
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Magnetic>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
