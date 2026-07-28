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

// ─── Desktop float slot config ────────────────────────────────────────────────
// Each slot has a unique image. py = total Y drift over the full scroll.
const DESKTOP_SLOTS = [
  { left: "2%",  top: "6%",  width: "30vw", rot: -5, py: -80,  src: "/freeflow-ui.png",       label: "FreeFlow"      },
  { left: "60%", top: "3%",  width: "28vw", rot:  4, py: -110, src: "/core-defenses.png",     label: "Core Defenses" },
  { left: "1%",  top: "54%", width: "22vw", rot:  3, py: -45,  src: "/nexabrew.jpeg",          label: "NexaBrew"      },
  { left: "68%", top: "56%", width: "18vw", rot: -3, py: -35,  src: "/nexabrew-dashboard.jpg", label: "NexaBrew POS"  },
] as const;

// Which project index each slot "belongs to" (drives highlight on scroll)
const SLOT_PROJECT = [0, 1, 2, 2] as const;

// ─── Mobile static card config ────────────────────────────────────────────────
// Images sit in the top ~30% and bottom ~30% of the viewport.
// The center band (~30%-68%) is reserved for text — no overlap.
// All widths ≤ 38vw so nothing bleeds off-screen.
const MOBILE_CARDS = [
  { left: "3%",  top: "3%",  width: "38vw", rot: -4, src: "/freeflow-ui.png",       label: "FreeFlow",       zIndex: 10 },
  { left: "55%", top: "5%",  width: "36vw", rot:  3, src: "/core-defenses.png",     label: "Core Defenses",  zIndex: 9  },
  { left: "2%",  top: "70%", width: "36vw", rot:  3, src: "/nexabrew.jpeg",          label: "NexaBrew",       zIndex: 10 },
  { left: "54%", top: "72%", width: "34vw", rot: -3, src: "/nexabrew-dashboard.jpg", label: "NexaBrew POS",   zIndex: 9  },
] as const;

const p2 = (n: number) => String(n).padStart(2, "0");
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export function SelectedWorkScroll({ projects }: { projects: WorkProject[] }) {
  const outerRef   = useRef<HTMLDivElement>(null);
  const innerRef   = useRef<HTMLDivElement>(null);
  const floatRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const anchorRef  = useRef<HTMLAnchorElement>(null);
  const activeRef  = useRef(0);

  // ── Switch active project (desktop only) ─────────────────────────────────
  function switchProject(index: number) {
    if (index === activeRef.current) return;
    activeRef.current = index;
    const proj = projects[index];

    const topEls = [counterRef.current, titleRef.current].filter(Boolean);
    gsap.killTweensOf(topEls);
    gsap.to(topEls, {
      y: -14, opacity: 0, duration: 0.18, ease: "power2.in",
      onComplete() {
        if (counterRef.current) counterRef.current.textContent = `${p2(index + 1)} / ${p2(projects.length)}`;
        if (titleRef.current)   titleRef.current.textContent   = proj.title;
        gsap.fromTo(topEls, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.36, ease: "power3.out", stagger: 0.05 });
      },
    });

    gsap.killTweensOf(subRef.current);
    gsap.to(subRef.current, {
      opacity: 0, duration: 0.18,
      onComplete() {
        if (subRef.current) subRef.current.textContent = proj.subtitle;
        gsap.to(subRef.current, { opacity: 1, duration: 0.36 });
      },
    });

    const a = anchorRef.current;
    if (a) {
      a.href = proj.link;
      proj.external
        ? (a.setAttribute("target", "_blank"), a.setAttribute("rel", "noopener noreferrer"))
        : (a.removeAttribute("target"), a.removeAttribute("rel"));
    }

    // Highlight active slots — opacity only, NO blur
    floatRefs.current.forEach((el, i) => {
      if (!el) return;
      const isActive = SLOT_PROJECT[i as keyof typeof SLOT_PROJECT] === index;
      gsap.killTweensOf(el);
      gsap.to(el, {
        opacity: isActive ? 1 : 0.14,
        scale:   isActive ? 1 : 0.93,
        duration: 0.6, ease: "power2.inOut",
      });
    });

    dotRefs.current.forEach((dot, i) => {
      if (!dot) return;
      dot.style.background = i === index ? "var(--color-primary)" : "var(--color-border)";
      dot.style.transform  = i === index ? "scale(1.6)" : "scale(1)";
    });
  }

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
            floatRefs.current.forEach((el, i) => {
              if (!el) return;
              gsap.set(el, { y: progress * DESKTOP_SLOTS[i].py });
            });
            switchProject(clamp(Math.floor(progress * N), 0, N - 1));
          },
        });

        // Entrance: float cards arrive from below
        gsap.fromTo(
          floatRefs.current.filter(Boolean),
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: (i: number) =>
              SLOT_PROJECT[i as keyof typeof SLOT_PROJECT] === 0 ? 1 : 0.14,
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
        {/* Floating images */}
        {DESKTOP_SLOTS.map((slot, i) => (
          <div
            key={i}
            ref={el => { floatRefs.current[i] = el; }}
            className="absolute will-change-transform pointer-events-none"
            style={{ left: slot.left, top: slot.top, width: slot.width, rotate: `${slot.rot}deg`, opacity: 0, zIndex: i < projects.length ? 10 : 6 }}
          >
            <div
              className="relative w-full rounded-2xl overflow-hidden"
              style={{ aspectRatio: "16 / 10", boxShadow: "0 20px 56px rgba(0,0,0,0.12), 0 4px 14px rgba(0,0,0,0.07)" }}
            >
              <Image src={slot.src} alt={slot.label} fill sizes="35vw" className="object-cover" priority={i === 0} />
            </div>
            <p className="text-[9px] font-mono text-muted tracking-widest uppercase mt-2 px-1">{slot.label}</p>
          </div>
        ))}

        {/* Center content */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 pointer-events-none"
          style={{ padding: "0 min(22%, 300px)" }}
        >
          <p className="text-[10px] font-mono text-muted/50 tracking-[0.3em] uppercase mb-6">Scroll to explore</p>
          <span ref={counterRef} className="text-[11px] font-mono text-muted tracking-[0.35em] uppercase mb-5 block">
            {p2(1)} / {p2(projects.length)}
          </span>
          <h2
            ref={titleRef}
            className="font-display text-primary leading-none tracking-tight mb-5"
            style={{ fontSize: "clamp(3.5rem, 8.5vw, 7.5rem)" }}
          >
            {p0.title}
          </h2>
          <p ref={subRef} className="text-muted text-sm leading-relaxed mb-8 line-clamp-3" style={{ maxWidth: "26ch" }}>
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

      {/* ══ MOBILE: desktop-vibe static scattered layout, no scroll ══════════
          Four project images scattered at fixed corners, centre text overlay.
          All images at full opacity — no blur, no dimming.
      ══════════════════════════════════════════════════════════════════════ */}
      <div
        className="lg:hidden relative overflow-hidden bg-background"
        style={{ height: "100svh" }}
      >
        {/* Scattered project image cards */}
        {MOBILE_CARDS.map((card, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left:    card.left,
              top:     card.top,
              width:   card.width,
              rotate:  `${card.rot}deg`,
              zIndex:  card.zIndex,
            }}
          >
            <div
              className="relative w-full rounded-xl overflow-hidden"
              style={{
                aspectRatio: "16 / 10",
                boxShadow: "0 10px 28px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              <Image
                src={card.src}
                alt={card.label}
                fill
                sizes="40vw"
                className="object-cover"
                priority={i < 2}
              />
            </div>
          </div>
        ))}

        {/* Centre overlay — project list + CTA */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 pointer-events-none px-6">
          <p className="text-[9px] font-mono text-muted/70 tracking-[0.3em] uppercase mb-4">
            Our Projects
          </p>

          {/* List of project names */}
          <div className="flex flex-col items-center gap-1 mb-6">
            {projects.map((proj, i) => (
              <h2
                key={proj.id}
                className="font-display text-primary leading-tight"
                style={{ fontSize: "clamp(2rem, 9vw, 3rem)" }}
              >
                {proj.title}
              </h2>
            ))}
          </div>

          {/* Subtle link */}
          <div className="pointer-events-auto">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-primary/70 text-xs font-medium border border-primary/25 px-5 py-2.5 rounded-full hover:bg-primary hover:text-surface hover:border-primary transition-all duration-300"
            >
              View All Projects →
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
