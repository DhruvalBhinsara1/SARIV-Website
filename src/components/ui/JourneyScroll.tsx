"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { Typography } from "@/components/ui/Typography";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type JourneyItem = {
  year: string;
  event: string;
  description: string;
  isCTA?: boolean;
};

// One SARIV atmospheric tint per slide (SARIV_BrandGuidelines §5.2) — mood, never focal point.
const TINTS = ["bg-mist-blue", "bg-soft-peach", "bg-warm-sand", "bg-pale-lavender"];

export function JourneyScroll({ items }: { items: JourneyItem[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Horizontal pinned scroll only for desktop viewports without reduced motion.
      // Mobile / reduced-motion just gets the plain stacked list below.
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current;
        if (!track) return;

        const getDistance = () => track.scrollWidth - window.innerWidth;

        const nodes = railRef.current
          ? gsap.utils.toArray<HTMLElement>(railRef.current.querySelectorAll("[data-node]"))
          : [];
        const lastIndex = items.length - 1;

        gsap.set(fillRef.current, { scaleX: 0, transformOrigin: "left center" });

        const scrollTween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              gsap.set(fillRef.current, { scaleX: self.progress });
              const active = Math.round(self.progress * lastIndex);
              nodes.forEach((node, i) =>
                node.classList.toggle("bg-primary", i <= active)
              );
            },
          },
        });

        // Slide 0 starts already in view (never crosses in from the right),
        // so its enter-from-right trigger would never fire — skip it.
        gsap.utils.toArray<HTMLElement>(track.children).slice(1).forEach((slide) => {
          gsap.from(slide.querySelector("[data-content]"), {
            opacity: 0,
            y: 32,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: slide,
              containerAnimation: scrollTween,
              start: "left 88%",
              toggleActions: "play none none reverse",
            },
          });
        });

        return () => {
          scrollTween.scrollTrigger?.kill();
          scrollTween.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-background border-t border-border overflow-hidden py-28 md:py-0 md:h-screen md:flex md:flex-col md:justify-center"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 w-full mb-10 shrink-0 relative z-10">
        <ScrollReveal>
          <span className="font-body text-muted uppercase tracking-[0.2em] text-xs font-semibold block mb-4">
            The Journey
          </span>
          <Typography variant="heading" className="text-3xl md:text-4xl">
            Where we&apos;ve been.
          </Typography>
        </ScrollReveal>
      </div>

      {/* Progress rail — literal structure/progression, echoing the SARIV mark */}
      <div
        ref={railRef}
        className="hidden md:block relative w-full max-w-[420px] mx-auto h-4 mb-6 shrink-0 z-10"
      >
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-primary/15" />
        <div
          ref={fillRef}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-primary"
        />
        <div className="relative flex justify-between items-center h-full">
          {items.map((_, i) => (
            <span
              key={i}
              data-node
              className={`w-2 h-2 rounded-full border border-primary transition-colors duration-300 ${
                i === 0 ? "bg-primary" : "bg-background"
              }`}
            />
          ))}
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex flex-col gap-10 md:gap-0 md:flex-row md:w-max"
      >
        {items.map((item, i) => (
          <div
            key={i}
            className={`relative flex items-center justify-center md:w-screen md:shrink-0 px-6 py-16 md:py-24 overflow-hidden ${TINTS[i % TINTS.length]}`}
          >
            {/* Oversized index numeral — mood layer, never the focal point */}
            <span
              aria-hidden="true"
              className="pointer-events-none select-none absolute inset-0 flex items-center justify-center font-display text-primary/[0.05] text-[clamp(200px,34vw,420px)] leading-none"
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <div data-content className="relative z-10 max-w-[620px] text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="font-mono text-muted text-xs tracking-widest">{item.year}</span>
              </div>
              <h3 className="font-display font-normal text-primary text-4xl md:text-6xl leading-[1.05]">
                {item.event}
              </h3>
              <p className="font-body text-secondary text-base md:text-lg leading-relaxed mt-6 max-w-[52ch] mx-auto">
                {item.description}
              </p>
              {item.isCTA && (
                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium font-body text-primary underline underline-offset-4 hover:text-secondary transition-colors w-fit"
                >
                  Let&apos;s talk <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
