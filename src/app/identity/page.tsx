"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";
import { Typography } from "@/components/ui/Typography";
import { Mark } from "@/components/Mark";
import LineSidebar from "@/components/ui/LineSidebar";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);

const SECTIONS = [
  { label: "Identity System", id: "Overview" },
  { label: "Logomark", id: "Logomark" },
  { label: "Principles", id: "Principles" },
  { label: "Typography", id: "Typography" },
  { label: "Color", id: "Color" },
  { label: "Geometry", id: "Geometry" },
];

const HEADER_OFFSET = 128; // matches the site's pt-32 fixed-header clearance
const SPY_THRESHOLD = 160; // matches the pin's "top 160" start line

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const smoother = ScrollSmoother.get();
  if (smoother) {
    smoother.scrollTo(smoother.offset(el, "top top") - HEADER_OFFSET, true);
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

const SWATCHES = [
  { name: "Background", hex: "#FAF9F7", className: "bg-background" },
  { name: "Surface", hex: "#FFFFFF", className: "bg-surface" },
  { name: "Surface Elevated", hex: "#F4F4F2", className: "bg-surface-elevated" },
  { name: "Primary", hex: "#111111", className: "bg-primary" },
  { name: "Secondary", hex: "#555555", className: "bg-secondary" },
  { name: "Muted", hex: "#8A8A8A", className: "bg-muted" },
];

const ATMOSPHERIC = [
  { name: "Mist Blue", hex: "#DCEFF4", className: "bg-mist-blue" },
  { name: "Soft Peach", hex: "#F5E4DB", className: "bg-soft-peach" },
  { name: "Warm Sand", hex: "#F4EFE8", className: "bg-warm-sand" },
  { name: "Pale Lavender", hex: "#ECE8F4", className: "bg-pale-lavender" },
  { name: "Fog Green", hex: "#E8F2EC", className: "bg-fog-green" },
];

const SEMANTIC = [
  { name: "Success", hex: "#0F9D58", className: "bg-success" },
  { name: "Warning", hex: "#F4B400", className: "bg-warning" },
  { name: "Error", hex: "#DB4437", className: "bg-error" },
  { name: "Info", hex: "#4285F4", className: "bg-info" },
];

const RADII = [
  { name: "Small", token: "8px", className: "rounded-sm" },
  { name: "Medium", token: "16px", className: "rounded-md" },
  { name: "Large", token: "24px", className: "rounded-lg" },
  { name: "Pill", token: "999px", className: "rounded-pill" },
];

function Swatch({ name, hex, className }: { name: string; hex: string; className: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className={`h-24 rounded-lg border border-border ${className}`}></div>
      <Typography variant="caption" className="font-medium">{name}</Typography>
      <Typography variant="caption" muted className="font-mono">{hex}</Typography>
    </div>
  );
}

export default function IdentityPage() {
  const containerRef = useRef<HTMLElement>(null);
  const columnRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      // 1. Aside sticky pinning for desktop viewports
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        if (columnRef.current && asideRef.current) {
          ScrollTrigger.create({
            trigger: columnRef.current,
            pin: asideRef.current,
            start: "top 160",
            end: "bottom bottom",
            pinSpacing: false,
          });
        }
      });

      // 2. Section scroll spy triggers
      sectionRefs.current.forEach((el, i) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: `top ${SPY_THRESHOLD}`,
          end: `bottom ${SPY_THRESHOLD}`,
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });
      });

      // 3. Force instant refresh to align with ScrollSmoother height
      ScrollTrigger.refresh();
    },
    { scope: containerRef }
  );

  return (
    <main ref={containerRef} className="flex-1 w-full bg-background pt-32 pb-24">
      <div className="max-w-[1100px] mx-auto px-4 md:px-8 lg:grid lg:grid-cols-[140px_1fr] lg:gap-16 lg:items-start">
        <aside ref={asideRef} className="hidden lg:block">
          <LineSidebar
            items={SECTIONS.map((s) => s.label)}
            activeIndex={activeIndex}
            accentColor="#111111"
            textColor="#8A8A8A"
            markerColor="#E7E7E4"
            fontSize={0.95}
            itemGap={24}
            proximityRadius={80}
            maxShift={12}
            markerLength={32}
            onItemClick={(i) => {
              setActiveIndex(i);
              scrollToSection(SECTIONS[i].id);
            }}
          />
        </aside>

        <div ref={columnRef} className="flex flex-col gap-16 min-w-0">
        <section id="Overview" ref={(el) => { sectionRefs.current[0] = el; }} className="animate-fade-up scroll-mt-32">
          <Typography variant="display" className="mb-8">
            Identity System
          </Typography>
          <Typography variant="body" className="text-xl">
            The SARIV Design System exists to ensure that every digital interface we build feels unmistakably like it belongs to the same product family. Our goal is not to look modern. Our goal is to be timeless.
          </Typography>
        </section>

        <hr className="border-border" />

        <section id="Logomark" ref={(el) => { sectionRefs.current[1] = el; }} className="animate-fade-up scroll-mt-32">
          <Typography variant="heading" className="mb-8">
            1. Logomark
          </Typography>
          <Typography variant="body" className="mb-8 max-w-2xl">
            A single continuous form, never redrawn per surface. It renders in <code className="font-mono text-sm">currentColor</code>, so it inherits whatever ink the surface calls for — no separate light/dark asset.
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="h-40 rounded-lg border border-border bg-surface flex items-center justify-center">
              <Mark className="size-16 text-primary" />
            </div>
            <div className="h-40 rounded-lg border border-border bg-primary flex items-center justify-center">
              <Mark className="size-16 text-surface" />
            </div>
          </div>
          <div className="flex items-end gap-8">
            <div className="flex flex-col items-center gap-3">
              <Mark className="size-8 text-primary" />
              <Typography variant="caption" muted>32px</Typography>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Mark className="size-14 text-primary" />
              <Typography variant="caption" muted>56px</Typography>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Mark className="size-20 text-primary" />
              <Typography variant="caption" muted>80px</Typography>
            </div>
          </div>
        </section>

        <hr className="border-border" />

        <section id="Principles" ref={(el) => { sectionRefs.current[2] = el; }} className="animate-fade-up scroll-mt-32" style={{ animationDelay: "0.1s" }}>
          <Typography variant="heading" className="mb-8">
            2. Principles
          </Typography>
          <div className="flex flex-col gap-8">
            <div>
              <Typography variant="subheading" className="mb-4">Less, Better</Typography>
              <Typography variant="body">
                Do fewer things, but do them exceptionally well. Avoid visual clutter at all costs. Every single element on the screen must earn its place.
              </Typography>
            </div>
            <div>
              <Typography variant="subheading" className="mb-4">Typography Is The Interface</Typography>
              <Typography variant="body">
                In the absence of heavy graphical elements, typography carries the vast majority of the visual weight. We rely on large, striking headlines, readable body copy, generous line spacing, and high contrast.
              </Typography>
            </div>
          </div>
        </section>

        <hr className="border-border" />

        <section id="Typography" ref={(el) => { sectionRefs.current[3] = el; }} className="animate-fade-up scroll-mt-32" style={{ animationDelay: "0.2s" }}>
          <Typography variant="heading" className="mb-8">
            3. Typography
          </Typography>
          <div className="flex flex-col gap-12">
            <div>
              <Typography variant="caption" muted className="mb-2 uppercase tracking-widest">Display</Typography>
              <Typography variant="display">Instrument Serif</Typography>
            </div>
            <div>
              <Typography variant="caption" muted className="mb-2 uppercase tracking-widest">Heading</Typography>
              <Typography variant="heading">Instrument Serif</Typography>
            </div>
            <div>
              <Typography variant="caption" muted className="mb-2 uppercase tracking-widest">Subheading</Typography>
              <Typography variant="subheading">Inter Medium</Typography>
            </div>
            <div>
              <Typography variant="caption" muted className="mb-2 uppercase tracking-widest">Body</Typography>
              <Typography variant="body">Inter Regular. Used for all readable interface content. We enforce full text justification to create a strict, engineered, and editorial reading experience.</Typography>
            </div>
          </div>
        </section>

        <hr className="border-border" />

        <section id="Color" ref={(el) => { sectionRefs.current[4] = el; }} className="animate-fade-up scroll-mt-32" style={{ animationDelay: "0.3s" }}>
          <Typography variant="heading" className="mb-8">
            4. Color
          </Typography>
          <div className="flex flex-col gap-10">
            <div>
              <Typography variant="caption" muted className="mb-4 uppercase tracking-widest">Core</Typography>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {SWATCHES.map((s) => <Swatch key={s.name} {...s} />)}
              </div>
            </div>
            <div>
              <Typography variant="caption" muted className="mb-4 uppercase tracking-widest">Atmospheric</Typography>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {ATMOSPHERIC.map((s) => <Swatch key={s.name} {...s} />)}
              </div>
            </div>
            <div>
              <Typography variant="caption" muted className="mb-4 uppercase tracking-widest">Semantic</Typography>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {SEMANTIC.map((s) => <Swatch key={s.name} {...s} />)}
              </div>
            </div>
          </div>
        </section>

        <hr className="border-border" />

        <section id="Geometry" ref={(el) => { sectionRefs.current[5] = el; }} className="animate-fade-up scroll-mt-32" style={{ animationDelay: "0.4s" }}>
          <Typography variant="heading" className="mb-8">
            5. Geometry &amp; Depth
          </Typography>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {RADII.map((r) => (
              <div key={r.name} className="flex flex-col gap-2">
                <div className={`h-24 bg-surface-elevated border border-border ${r.className}`}></div>
                <Typography variant="caption" className="font-medium">{r.name}</Typography>
                <Typography variant="caption" muted className="font-mono">{r.token}</Typography>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 max-w-[220px]">
            <div className="h-24 rounded-lg bg-surface shadow-elevation"></div>
            <Typography variant="caption" className="font-medium">Elevation</Typography>
            <Typography variant="caption" muted className="font-mono">0 8px 40px rgba(0,0,0,.05)</Typography>
          </div>
        </section>
        </div>
      </div>
    </main>
  );
}
