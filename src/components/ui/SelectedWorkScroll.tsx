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
// Each slot is pinned to a corner/edge, framing the center text.
// py = total Y drift (px) over the full scroll distance.
// We render 4 slots for 3 projects (slot 3 mirrors the last project as ambient).
const SLOTS = [
  { left: "2%",  top: "6%",  width: "33vw", rot: -5, py: -90 },   // top-left   → proj 0
  { left: "59%", top: "3%",  width: "30vw", rot:  4, py: -130 },  // top-right  → proj 1
  { left: "0%",  top: "58%", width: "25vw", rot:  3, py: -55 },   // bot-left   → proj 2
  { left: "67%", top: "61%", width: "20vw", rot: -3, py: -45 },   // bot-right  → proj 2 ambient
] as const;

const p2 = (n: number) => String(n).padStart(2, "0");
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export function SelectedWorkScroll({ projects }: { projects: WorkProject[] }) {
  // ── Refs ────────────────────────────────────────────────────────────────────
  const outerRef   = useRef<HTMLDivElement>(null);
  const innerRef   = useRef<HTMLDivElement>(null);
  const floatRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs    = useRef<(HTMLDivElement | null)[]>([]);

  // Center text — updated directly via DOM to avoid fighting React's reconciler
  const counterRef = useRef<HTMLSpanElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const anchorRef  = useRef<HTMLAnchorElement>(null);

  // Track which project is currently displayed
  const activeRef = useRef(0); // starts at 0 to match initial JSX

  // ── Core: swap center content when active project changes ───────────────────
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

    // Subtitle: crossfade
    gsap.killTweensOf(subRef.current);
    gsap.to(subRef.current, {
      opacity: 0, duration: 0.18,
      onComplete() {
        if (subRef.current) subRef.current.textContent = proj.subtitle;
        gsap.to(subRef.current, { opacity: 1, duration: 0.36 });
      },
    });

    // CTA anchor: update href + external attributes
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

    // Float cards: highlight active, desaturate + dim others
    floatRefs.current.forEach((el, i) => {
      if (!el) return;
      const projIdx = clamp(i, 0, projects.length - 1);
      const isActive = projIdx === index;
      gsap.killTweensOf(el);
      gsap.to(el, {
        opacity: isActive ? 1 : 0.13,
        scale:  isActive ? 1 : 0.92,
        filter: isActive
          ? "saturate(1) blur(0px)"
          : "saturate(0.1) blur(2.5px)",
        duration: 0.65, ease: "power2.inOut",
      });
    });

    // Progress dots
    dotRefs.current.forEach((dot, i) => {
      if (!dot) return;
      dot.style.background = i === index
        ? "var(--color-primary)"
        : "var(--color-border)";
      dot.style.transform = i === index ? "scale(1.6)" : "scale(1)";
    });
  }

  // ── GSAP setup ──────────────────────────────────────────────────────────────
  useGSAP(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const mm = gsap.matchMedia();

    // ── Desktop: sticky full-screen with scrubbed parallax ─────────────────
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const N = projects.length;
        // Give each project ~1 screen of scroll budget, plus a short tail
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

            // Parallax: each float card drifts at its own speed
            floatRefs.current.forEach((el, i) => {
              if (!el || !SLOTS[i]) return;
              gsap.set(el, { y: progress * SLOTS[i].py });
            });

            // Which project is "active" based on scroll progress
            const idx = clamp(Math.floor(progress * N), 0, N - 1);
            switchProject(idx);
          },
        });

        // Entrance: float cards drift in from below as section enters viewport
        const floats = floatRefs.current.filter(Boolean);
        gsap.fromTo(
          floats,
          { y: 60, opacity: 0 },
          {
            y: 0,
            // Project 0 starts fully visible; others start dim
            opacity: (i: number) => (clamp(i, 0, projects.length - 1) === 0 ? 1 : 0.13),
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

  // ── Render ──────────────────────────────────────────────────────────────────
  const p0 = projects[0];

  return (
    <div ref={outerRef}>

      {/* ══ DESKTOP: sticky full-viewport Mobbin-style section ══════════════ */}
      <div
        ref={innerRef}
        className="hidden lg:block relative w-full bg-background overflow-hidden select-none"
        style={{ height: "100svh" }}
      >

        {/* ── Floating project images ──────────────────────────────────────── */}
        {SLOTS.map((slot, i) => {
          const proj = projects[clamp(i, 0, projects.length - 1)];
          return (
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
              {/* Card with shadow */}
              <div
                className="relative w-full rounded-2xl overflow-hidden"
                style={{
                  aspectRatio: "16 / 10",
                  boxShadow: "0 24px 60px rgba(0,0,0,0.13), 0 4px 16px rgba(0,0,0,0.08)",
                }}
              >
                <Image
                  src={proj.image}
                  alt={proj.title}
                  fill
                  sizes="35vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
              {/* Project label beneath card */}
              <p className="text-[10px] font-mono text-muted tracking-widest uppercase mt-2 px-1">
                {proj.title}
              </p>
            </div>
          );
        })}

        {/* ── Center content (updates on scroll) ──────────────────────────── */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 pointer-events-none"
          style={{ padding: "0 min(24%, 320px)" }}
        >
          {/* Scroll nudge — only visible at very start */}
          <p className="text-[10px] font-mono text-muted/60 tracking-[0.3em] uppercase mb-6 pointer-events-none">
            Scroll to explore
          </p>

          {/* Counter: "01 / 03" — text updated via ref */}
          <span
            ref={counterRef}
            className="text-[11px] font-mono text-muted tracking-[0.35em] uppercase mb-5 block"
          >
            {p2(1)} / {p2(projects.length)}
          </span>

          {/* Title — large serif, updated via ref */}
          <h2
            ref={titleRef}
            className="font-display text-primary leading-none tracking-tight mb-5"
            style={{ fontSize: "clamp(3.5rem, 8.5vw, 7.5rem)" }}
          >
            {p0.title}
          </h2>

          {/* Subtitle — updated via ref */}
          <p
            ref={subRef}
            className="text-muted text-sm leading-relaxed mb-8 line-clamp-3"
            style={{ maxWidth: "26ch" }}
          >
            {p0.subtitle}
          </p>

          {/* CTA — href updated via ref, pointer-events re-enabled */}
          <div className="pointer-events-auto">
            <a
              ref={anchorRef}
              href={p0.link}
              {...(p0.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group inline-flex items-center gap-2.5 border border-primary/35 text-primary text-sm font-medium px-7 py-3.5 rounded-full hover:bg-primary hover:text-surface transition-all duration-300"
            >
              {p0.external ? "View Live Site" : "View Case Study"}
              <span className="inline-block group-hover:translate-x-0.5 transition-transform duration-200">
                →
              </span>
            </a>
          </div>
        </div>

        {/* ── Progress dots ────────────────────────────────────────────────── */}
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

      {/* ══ MOBILE: stacked project cards ═══════════════════════════════════ */}
      <div className="lg:hidden flex flex-col gap-10">
        {projects.map((proj, i) => (
          <div key={proj.id}>
            <p className="text-[10px] font-mono text-muted tracking-[0.25em] uppercase mb-3">
              {p2(i + 1)} — Project
            </p>
            <div
              className="relative w-full rounded-2xl overflow-hidden bg-black"
              style={{ aspectRatio: "16 / 9" }}
            >
              <Image
                src={proj.image}
                alt={proj.title}
                fill
                sizes="100vw"
                className="object-cover opacity-80"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-white text-3xl leading-none mb-2">
                  {proj.title}
                </h3>
                <p className="text-white/65 text-sm mb-5 line-clamp-2">
                  {proj.subtitle}
                </p>
                {proj.external ? (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-black text-sm font-medium px-5 py-2.5 rounded-full hover:bg-white/90 transition-colors"
                  >
                    View Live Site →
                  </a>
                ) : (
                  <Link
                    href={proj.link}
                    className="inline-flex items-center gap-2 bg-white text-black text-sm font-medium px-5 py-2.5 rounded-full hover:bg-white/90 transition-colors"
                  >
                    View Case Study →
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
