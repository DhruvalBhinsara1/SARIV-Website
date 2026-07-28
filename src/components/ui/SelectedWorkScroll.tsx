"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type WorkProject = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
  external?: boolean;
  align?: "left" | "right";
};

// ─── Float slot layout ────────────────────────────────────────────────────────
// src  = explicit unique image per slot (no duplicates)
// py   = total Y drift (px) over the full scroll distance
const SLOTS = [
  { left: "2%",  top: "6%",  width: "33vw", rot: -5, py: -90,  src: "/freeflow-ui.png",   label: "FreeFlow"      },
  { left: "59%", top: "3%",  width: "30vw", rot:  4, py: -130, src: "/core-defenses.png", label: "Core Defenses" },
  { left: "0%",  top: "58%", width: "25vw", rot:  3, py: -55,  src: "/nexabrew.jpeg",     label: "NexaBrew"      },
  { left: "67%", top: "61%", width: "20vw", rot: -3, py: -45,  src: "/traveloop.jpeg",    label: "Traveloop"     },
] as const;

// Which project index each slot "belongs to" (drives highlight on scroll)
const SLOT_PROJECT = [0, 1, 2, 2] as const;

const p2 = (n: number) => String(n).padStart(2, "0");
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export function SelectedWorkScroll({ projects }: { projects: WorkProject[] }) {
  // ── Refs ────────────────────────────────────────────────────────────────────
  const outerRef    = useRef<HTMLDivElement>(null);
  const innerRef    = useRef<HTMLDivElement>(null);
  const floatRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs     = useRef<(HTMLDivElement | null)[]>([]);

  // Center text — updated directly via DOM to avoid fighting React's reconciler
  const counterRef  = useRef<HTMLSpanElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const anchorRef   = useRef<HTMLAnchorElement>(null);

  const activeRef = useRef(0);

  // ── Swap center content when active project changes ──────────────────────
  function switchProject(index: number) {
    if (index === activeRef.current) return;
    activeRef.current = index;
    const proj = projects[index];

    // Counter + Title: slide out → swap text → slide in
    const topEls = [counterRef.current, titleRef.current].filter(Boolean);
    gsap.killTweensOf(topEls);
    gsap.to(topEls, {
      y: -14, opacity: 0, duration: 0.18, ease: "power2.in",
      onComplete() {
        if (counterRef.current)
          counterRef.current.textContent = `${p2(index + 1)} / ${p2(projects.length)}`;
        if (titleRef.current)
          titleRef.current.textContent = proj.title;
        gsap.fromTo(
          topEls,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.36, ease: "power3.out", stagger: 0.05 }
        );
      },
    });

    // Subtitle crossfade
    gsap.killTweensOf(subRef.current);
    gsap.to(subRef.current, {
      opacity: 0, duration: 0.18,
      onComplete() {
        if (subRef.current) subRef.current.textContent = proj.subtitle;
        gsap.to(subRef.current, { opacity: 1, duration: 0.36 });
      },
    });

    // Update CTA href + attributes
    const a = anchorRef.current;
    if (a) {
      a.href = proj.link;
      if (proj.external) {
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener noreferrer");
      } else {
        a.removeAttribute("target");
        a.removeAttribute("rel");
      }
    }

    // Float cards: highlight slot(s) for this project, dim others
    floatRefs.current.forEach((el, i) => {
      if (!el) return;
      const isActive = SLOT_PROJECT[i as keyof typeof SLOT_PROJECT] === index;
      gsap.killTweensOf(el);
      gsap.to(el, {
        opacity: isActive ? 1 : 0.12,
        scale:   isActive ? 1 : 0.92,
        filter:  isActive ? "saturate(1) blur(0px)" : "saturate(0.08) blur(2.5px)",
        duration: 0.65, ease: "power2.inOut",
      });
    });

    // Progress dots
    dotRefs.current.forEach((dot, i) => {
      if (!dot) return;
      dot.style.background = i === index ? "var(--color-primary)" : "var(--color-border)";
      dot.style.transform  = i === index ? "scale(1.6)" : "scale(1)";
    });
  }

  // ── GSAP setup ──────────────────────────────────────────────────────────────
  useGSAP(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const N = projects.length;
        const scrollBudget = window.innerHeight * (N + 0.6);

        const pinST = ScrollTrigger.create({
          trigger: outer,
          pin: inner,
          start: "top top",
          end: () => `+=${scrollBudget}`,
          scrub: 1.3,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate(self) {
            const progress = clamp(self.progress, 0, 1 - 1e-6);

            // Parallax each float card at its own speed
            floatRefs.current.forEach((el, i) => {
              if (!el) return;
              gsap.set(el, { y: progress * SLOTS[i].py });
            });

            // Update active project
            switchProject(clamp(Math.floor(progress * N), 0, N - 1));
          },
        });

        // Entrance animation
        gsap.fromTo(
          floatRefs.current.filter(Boolean),
          { y: 60, opacity: 0 },
          {
            y: 0,
            // Slot 0 starts fully visible; others start dim
            opacity: (i: number) =>
              SLOT_PROJECT[i as keyof typeof SLOT_PROJECT] === 0 ? 1 : 0.12,
            stagger: 0.12,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: outer, start: "top 78%" },
          }
        );

        return () => { pinST.kill(); };
      }
    );

    return () => mm.revert();
  }, { scope: outerRef, dependencies: [projects.length] });

  const p0 = projects[0];

  return (
    <div ref={outerRef}>

      {/* ══ DESKTOP: sticky full-viewport Mobbin-style ═══════════════════════ */}
      <div
        ref={innerRef}
        className="hidden lg:block relative w-full bg-background overflow-hidden select-none"
        style={{ height: "100svh" }}
      >
        {/* Floating images — each slot has its own unique src */}
        {SLOTS.map((slot, i) => (
          <div
            key={i}
            ref={el => { floatRefs.current[i] = el; }}
            className="absolute will-change-transform pointer-events-none"
            style={{
              left:    slot.left,
              top:     slot.top,
              width:   slot.width,
              rotate:  `${slot.rot}deg`,
              opacity: 0,
              zIndex:  i < projects.length ? 10 : 6,
            }}
          >
            <div
              className="relative w-full rounded-2xl overflow-hidden"
              style={{
                aspectRatio: "16 / 10",
                boxShadow: "0 20px 56px rgba(0,0,0,0.12), 0 4px 14px rgba(0,0,0,0.07)",
              }}
            >
              <Image
                src={slot.src}
                alt={slot.label}
                fill
                sizes="35vw"
                className="object-cover"
                priority={i === 0}
              />
            </div>
            <p className="text-[9px] font-mono text-muted tracking-widest uppercase mt-2 px-1">
              {slot.label}
            </p>
          </div>
        ))}

        {/* Center content */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 pointer-events-none"
          style={{ padding: "0 min(22%, 300px)" }}
        >
          <p className="text-[10px] font-mono text-muted/50 tracking-[0.3em] uppercase mb-6">
            Scroll to explore
          </p>

          <span
            ref={counterRef}
            className="text-[11px] font-mono text-muted tracking-[0.35em] uppercase mb-5 block"
          >
            {p2(1)} / {p2(projects.length)}
          </span>

          <h2
            ref={titleRef}
            className="font-display text-primary leading-none tracking-tight mb-5"
            style={{ fontSize: "clamp(3.5rem, 8.5vw, 7.5rem)" }}
          >
            {p0.title}
          </h2>

          <p
            ref={subRef}
            className="text-muted text-sm leading-relaxed mb-8 line-clamp-3"
            style={{ maxWidth: "26ch" }}
          >
            {p0.subtitle}
          </p>

          <div className="pointer-events-auto">
            <a
              ref={anchorRef}
              href={p0.link}
              {...(p0.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group inline-flex items-center gap-2.5 border border-primary/35 text-primary text-sm font-medium px-7 py-3.5 rounded-full hover:bg-primary hover:text-surface transition-all duration-300"
            >
              {p0.external ? "View Live Site" : "View Case Study"}
              <span className="inline-block group-hover:translate-x-0.5 transition-transform">→</span>
            </a>
          </div>
        </div>

        {/* Progress dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2.5 items-center">
          {projects.map((_, i) => (
            <div
              key={i}
              ref={el => { dotRefs.current[i] = el; }}
              className="rounded-full transition-all duration-300"
              style={{
                width:      "6px",
                height:     "6px",
                background: i === 0 ? "var(--color-primary)" : "var(--color-border)",
                transform:  i === 0 ? "scale(1.6)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>

      {/* ══ MOBILE: full-viewport horizontal snap carousel ═══════════════════ */}
      {/*
        Each card is 100svh tall × 100vw wide.
        CSS scroll-snap handles the swipe; no JS needed.
        Image fills the card as background, content overlays at the bottom.
      */}
      <div
        className="lg:hidden relative"
        style={{ height: "100svh" }}
      >
        {/* Snap track */}
        <div
          className="flex h-full overflow-x-auto snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
        >
          {projects.map((proj, i) => (
            <div
              key={proj.id}
              className="snap-start flex-shrink-0 relative"
              style={{ width: "100vw", height: "100%" }}
            >
              {/* Full-bleed project image */}
              <Image
                src={proj.image}
                alt={proj.title}
                fill
                sizes="100vw"
                className="object-cover"
                priority={i === 0}
              />

              {/* Dark gradient overlay — stronger at bottom for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/35 to-black/10" />

              {/* Content pinned to bottom */}
              <div className="absolute bottom-0 left-0 right-0 px-6 pb-14 pt-20">
                {/* Counter */}
                <p className="text-[10px] font-mono text-white/50 tracking-[0.3em] uppercase mb-3">
                  {p2(i + 1)} / {p2(projects.length)}
                </p>

                {/* Title */}
                <h2 className="font-display text-white leading-none tracking-tight mb-3" style={{ fontSize: "clamp(2.8rem,11vw,4.5rem)" }}>
                  {proj.title}
                </h2>

                {/* Subtitle */}
                <p className="text-white/65 text-sm leading-relaxed mb-7 line-clamp-2 max-w-xs">
                  {proj.subtitle}
                </p>

                {/* CTA */}
                {proj.external ? (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-black text-sm font-medium px-5 py-3 rounded-full hover:bg-white/90 active:scale-95 transition-all"
                  >
                    View Live Site →
                  </a>
                ) : (
                  <Link
                    href={proj.link}
                    className="inline-flex items-center gap-2 bg-white text-black text-sm font-medium px-5 py-3 rounded-full hover:bg-white/90 active:scale-95 transition-all"
                  >
                    View Case Study →
                  </Link>
                )}
              </div>

              {/* Swipe hint dots — bottom center */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 items-center">
                {projects.map((_, j) => (
                  <div
                    key={j}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width:      j === i ? "20px" : "6px",
                      height:     "6px",
                      background: j === i ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
