import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { Mark } from "@/components/Mark";
import { buttonVariants } from "@/components/ui/Button";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Project = {
  id: string;
  kind: string;
  year: string;
  title: string;
  description: string;
  caption: string;
  image: string;
  // Real intrinsic pixel dimensions — Next needs these to know the asset's
  // actual aspect ratio when not cropping with `fill`.
  imageWidth: number;
  imageHeight: number;
  logo?: string;
  link: string;
  external?: boolean;
  ctaLabel: string;
};

const PROJECTS: Project[] = [
  {
    id: "freeflow",
    kind: "Internal Product",
    year: "2026",
    title: "FreeFlow",
    description:
      "A native macOS application engineered to capture and render buttery-smooth, auto-zooming product demos. Privacy-first, completely non-destructive, and visually stunning.",
    caption: "Editorial mode — capture and render, entirely on-device",
    image: "/freeflow-ui.png",
    imageWidth: 3024,
    imageHeight: 1890,
    logo: "/freeflow-logo.png",
    link: "/products/freeflow",
    ctaLabel: "View case study",
  },
  {
    id: "civicos",
    kind: "Internal Product",
    year: "2026",
    title: "CivicOS",
    description:
      "Infrastructure for the modern municipality — a unified platform for reporting and managing civic issues, connecting 1.4B citizens with municipal response teams via multimodal AI and GIS dispatch.",
    caption: "AI-triaged issue reporting and real-time GIS dispatch for city governments",
    image: "/civicos.png",
    imageWidth: 1536,
    imageHeight: 1024,
    link: "/products/civicos",
    ctaLabel: "View case study",
  },
  {
    id: "core-defenses",
    kind: "Client Project",
    year: "2026",
    title: "Core Defenses",
    description: "Architecting the digital presence for next-generation defense.",
    caption: "Analytics and infrastructure for nuclear-grade environments",
    image: "/core-defenses.png",
    imageWidth: 3024,
    imageHeight: 1722,
    link: "https://www.core-defenses.com/",
    external: true,
    ctaLabel: "Visit live site",
  },
  {
    id: "nexabrew",
    kind: "Client Project",
    year: "2026",
    title: "NexaBrew",
    description:
      "A real-time cafe POS, kitchen display, and management system built for the floor.",
    caption: "Order terminal — counter and kitchen, always in sync",
    image: "/nexabrew.png",
    imageWidth: 3024,
    imageHeight: 1730,
    link: "https://nexabrew.vercel.app",
    external: true,
    ctaLabel: "Visit live site",
  },
  {
    id: "traveloop",
    kind: "Side Project",
    year: "2026",
    title: "Traveloop",
    description:
      "A trip-planning app for building itineraries, tracking budgets, and splitting costs with your crew.",
    caption: "Itinerary, budget, and cost-splitting for group trips",
    image: "/traveloop.jpeg",
    imageWidth: 1206,
    imageHeight: 2622,
    link: "https://github.com/DhruvalBhinsara1/traveloop",
    external: true,
    ctaLabel: "View on GitHub",
  },
];

const p2 = (n: number) => String(n).padStart(2, "0");

function ProjectSection({ project, index }: { project: Project; index: number }) {
  // Alternating composition — the image swaps sides each section so the page
  // never settles into a single repeating rhythm.
  const flipped = index % 2 === 1;
  const Tag = project.external ? "a" : Link;
  const linkProps = project.external
    ? { target: "_blank" as const, rel: "noopener noreferrer" as const }
    : {};

  return (
    <section className="relative border-t border-border py-20 md:py-32 overflow-hidden">
      {/* Oversized index numeral, bled off the edge — the recurring anchor */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none select-none absolute top-8 font-display leading-none text-[18vw] md:text-[13vw] text-primary/[0.045]",
          flipped ? "right-[-2vw]" : "left-[-2vw]"
        )}
      >
        {p2(index + 1)}
      </span>

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Eyebrow rule */}
        <ScrollReveal>
          <div className="flex items-baseline justify-between gap-6 border-b border-border pb-5 mb-12 md:mb-16">
            <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-muted">
              {p2(index + 1)} — {project.kind}
            </span>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted">
              {project.year}
            </span>
          </div>
        </ScrollReveal>

        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center",
            flipped && "lg:[direction:rtl] lg:[&>*]:[direction:ltr]"
          )}
        >
          {/* Text column */}
          <div className="lg:col-span-5">
            <ScrollReveal delay={0.05}>
              {project.logo ? (
                <Image
                  src={project.logo}
                  alt={project.title}
                  width={200}
                  height={50}
                  className="w-32 md:w-40 mb-6 invert"
                />
              ) : null}
              <h2 className="font-display font-normal text-primary text-[clamp(44px,6vw,84px)] leading-[0.95] tracking-[-0.025em] mb-7">
                {project.title}
              </h2>
              <p className="font-body text-secondary text-base md:text-lg leading-relaxed max-w-md mb-10">
                {project.description}
              </p>
              <Tag
                href={project.link}
                {...linkProps}
                className="group inline-flex items-center gap-2.5 font-body text-sm font-medium text-primary"
              >
                <span className="border-b border-primary/25 pb-0.5 group-hover:border-primary transition-colors">
                  {project.ctaLabel}
                </span>
                {project.external ? (
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                ) : (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                )}
              </Tag>
            </ScrollReveal>
          </div>

          {/* Image column — offset vertically so it never aligns flush with the type */}
          <div className={cn("lg:col-span-7", flipped ? "lg:-mt-12" : "lg:mt-12")}>
            <ScrollReveal delay={0.12}>
              <Tag
                href={project.link}
                {...linkProps}
                className="group block relative w-fit max-w-full rounded-2xl md:rounded-[2rem] overflow-hidden bg-[#0a0a0a] shadow-elevation"
              >
                {/* No `fill` + `object-cover` here on purpose — these four
                    screenshots span landscape and portrait aspect ratios, and
                    cropping to one fixed box was cutting off real content
                    (nav bars, bottom rows). Intrinsic width/height lets each
                    image keep its own ratio; max-h caps how tall the portrait
                    one can get next to the others. */}
                <Image
                  src={project.image}
                  alt={project.title}
                  width={project.imageWidth}
                  height={project.imageHeight}
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="block w-auto h-auto max-h-[70vh] md:max-h-[560px] max-w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.02]"
                />
              </Tag>
              {/* Editorial caption, in the manner of a photo credit */}
              <p className="font-mono text-[10px] tracking-widest uppercase text-muted mt-4">
                {project.caption}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function WorkPage() {
  return (
    <main className="w-full bg-background">
      {/* Index / masthead */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-8 pt-32 md:pt-40 pb-20 md:pb-28">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-10">
            <Mark className="w-4 h-4 text-secondary" />
            <span className="font-body text-secondary uppercase tracking-[0.25em] text-[11px] font-semibold">
              Selected Work
            </span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-8 md:gap-20 items-end">
          <ScrollReveal delay={0.08}>
            <h1 className="font-display font-normal text-primary text-[clamp(48px,8vw,110px)] leading-[0.9] tracking-[-0.03em]">
              Our work,
              <br />
              built properly.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.16}>
            <p className="font-body text-secondary text-base md:text-lg leading-relaxed md:pb-4">
              We don&apos;t build generic products. We engineer precise, enduring tools designed to
              empower focused work.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {PROJECTS.map((project, i) => (
        <ProjectSection key={project.id} project={project} index={i} />
      ))}

      {/* Closing invitation */}
      <section className="border-t border-border bg-surface-elevated py-28 md:py-40 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />
        <ScrollReveal>
          <div className="relative max-w-[1200px] mx-auto px-6 md:px-8 flex flex-col items-start gap-8">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted">
              Available for work
            </span>
            <h2 className="font-display font-normal text-primary text-[clamp(40px,6.5vw,88px)] leading-[0.95] tracking-[-0.02em] max-w-3xl">
              Have something worth building?
            </h2>
            <Magnetic strength={15}>
              <Link
                href="/start-project"
                className={buttonVariants({ variant: "primary", size: "large" })}
              >
                Start a project
              </Link>
            </Magnetic>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
