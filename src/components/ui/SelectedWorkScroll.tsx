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
// Each slot has a unique image + a link to its project.
// py = total Y drift (px) over the full scroll distance.
// projIdx = which project this slot represents (for link + highlight).
const DESKTOP_SLOTS = [
  { left: "4%",  top: "4%",  width: "32vw", rot: -5, py: -70,  src: "/freeflow-ui.png",       label: "FreeFlow",      projIdx: 0 },
  { left: "58%", top: "2%",  width: "30vw", rot:  4, py: -100, src: "/core-defenses.png",     label: "Core Defenses", projIdx: 1 },
  { left: "3%",  top: "52%", width: "24vw", rot:  3, py: -40,  src: "/nexabrew.jpeg",          label: "NexaBrew",      projIdx: 2 },
  { left: "66%", top: "54%", width: "20vw", rot: -3, py: -30,  src: "/nexabrew-dashboard.jpg", label: "NexaBrew POS",  projIdx: 2 },
] as const;

// ─── Mobile static card config ────────────────────────────────────────────────
// Top pair sits in 2%–28% vertical band, bottom pair in 66%–92%.
// Centre band (28%–66%) is reserved for text — no overlap.
// widths are 42–44vw — big but never exceeding right edge.
const MOBILE_CARDS = [
  { left: "5%",  top: "2%",  width: "42vw", rot: -4, src: "/freeflow-ui.png",       label: "FreeFlow",      projIdx: 0, zIndex: 10 },
  { left: "50%", top: "4%",  width: "42vw", rot:  3, src: "/core-defenses.png",     label: "Core Defenses", projIdx: 1, zIndex: 9  },
  { left: "4%",  top: "68%", width: "42vw", rot:  3, src: "/nexabrew.jpeg",          label: "NexaBrew",      projIdx: 2, zIndex: 10 },
  { left: "50%", top: "70%", width: "40vw", rot: -3, src: "/nexabrew-dashboard.jpg", label: "NexaBrew POS",  projIdx: 2, zIndex: 9  },
] as const;

const p2 = (n: number) => String(n).padStart(2, "0");
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

// ─── Linked image card ────────────────────────────────────────────────────────
function LinkedCard({
  src, alt, link, external, sizes, rounded = "rounded-2xl",
  aspect = "16 / 10", shadow = true, children,
}: {
  src: string; alt: string; link: string; external?: boolean;
  sizes: string; rounded?: string; aspect?: string; shadow?: boolean;
  children?: React.ReactNode;
}) {
  const Tag = external ? "a" : Link;
  const extraProps = external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};
  return (
    <Tag
      href={link}
      {...extraProps}
      className={`block relative w-full ${rounded} overflow-hidden group/card`}
      style={{
        aspectRatio: aspect,
        ...(shadow ? { boxShadow: "0 16px 48px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)" } : {}),
      }}
    >
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover transition-transform duration-500 group-hover/card:scale-105" />
      {/* Subtle hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/10 transition-colors duration-300" />
      {children}
    </Tag>
  );
}

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

  // ── Switch active project on scroll ──────────────────────────────────────
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

    // Highlight — opacity only, no blur
    floatRefs.current.forEach((el, i) => {
      if (!el) return;
      const isActive = DESKTOP_SLOTS[i].projIdx === index;
      gsap.killTweensOf(el);
      gsap.to(el, {
        opacity: isActive ? 1 : 0.15,
        scale:   isActive ? 1 : 0.94,
        duration: 0.55, ease: "power2.inOut",
      });
    });

    dotRefs.current.forEach((dot, i) => {
      if (!dot) return;
      dot.style.background = i === index ? "var(--color-primary)" : "var(--color-border)";
      dot.style.transform  = i === index ? "scale(1.6)" : "scale(1)";
    });
  }

  // ── GSAP: desktop pin-scroll ─────────────────────────────────────────────
  useGSAP(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const N = projects.length;
        // Tighter budget: ~0.8 screen per project instead of 1.2
        const scrollBudget = window.innerHeight * (N * 0.8 + 0.4);

        const pinST = ScrollTrigger.create({
          trigger: outer,
          pin: inner,
          start: "top top",
          end: () => `+=${scrollBudget}`,
          scrub: 0.9,
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

        // Entrance
        gsap.fromTo(
          floatRefs.current.filter(Boolean),
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: (i: number) => DESKTOP_SLOTS[i].projIdx === 0 ? 1 : 0.15,
            stagger: 0.1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: outer, start: "top 80%" },
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

      {/* ══ DESKTOP ═══════════════════════════════════════════════════════════ */}
      <div
        ref={innerRef}
        className="hidden lg:block relative w-full bg-background overflow-hidden select-none"
        style={{ height: "100svh" }}
      >
        {/* Floating linked image cards */}
        {DESKTOP_SLOTS.map((slot, i) => {
          const proj = projects[clamp(slot.projIdx, 0, projects.length - 1)];
          return (
            <div
              key={i}
              ref={el => { floatRefs.current[i] = el; }}
              className="absolute will-change-transform"
              style={{
                left: slot.left, top: slot.top, width: slot.width,
                rotate: `${slot.rot}deg`, opacity: 0,
                zIndex: slot.projIdx < projects.length ? 10 : 6,
              }}
            >
              <LinkedCard
                src={slot.src}
                alt={slot.label}
                link={proj.link}
                external={proj.external}
                sizes="35vw"
              />
              <p className="text-[9px] font-mono text-muted tracking-widest uppercase mt-2 px-1">{slot.label}</p>
            </div>
          );
        })}

        {/* Center content */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 pointer-events-none"
          style={{ padding: "0 min(22%, 300px)" }}
        >
          <p className="text-[10px] font-mono text-muted/50 tracking-[0.3em] uppercase mb-5">Scroll to explore</p>
          <span ref={counterRef} className="text-[11px] font-mono text-muted tracking-[0.35em] uppercase mb-4 block">
            {p2(1)} / {p2(projects.length)}
          </span>
          <h2
            ref={titleRef}
            className="font-display text-primary leading-none tracking-tight mb-4"
            style={{ fontSize: "clamp(3.5rem, 8.5vw, 7.5rem)" }}
          >
            {p0.title}
          </h2>
          <p ref={subRef} className="text-muted text-sm leading-relaxed mb-7 line-clamp-3" style={{ maxWidth: "26ch" }}>
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
                width: "6px", height: "6px",
                background: i === 0 ? "var(--color-primary)" : "var(--color-border)",
                transform:  i === 0 ? "scale(1.6)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>

      {/* ══ MOBILE: static scattered — like desktop but no scroll ════════════
          Four linked image cards at corners, project names + CTA in centre.
          All images at full opacity, no blur, no dimming.
      ════════════════════════════════════════════════════════════════════════ */}
      <div
        className="lg:hidden relative overflow-hidden bg-background"
        style={{ height: "100svh" }}
      >
        {/* Scattered linked image cards */}
        {MOBILE_CARDS.map((card, i) => {
          const proj = projects[clamp(card.projIdx, 0, projects.length - 1)];
          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: card.left, top: card.top, width: card.width,
                rotate: `${card.rot}deg`, zIndex: card.zIndex,
              }}
            >
              <LinkedCard
                src={card.src}
                alt={card.label}
                link={proj.link}
                external={proj.external}
                sizes="45vw"
                rounded="rounded-xl"
              />
            </div>
          );
        })}

        {/* Centre overlay — project titles + CTA */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 pointer-events-none px-6">
          <p className="text-[9px] font-mono text-muted/70 tracking-[0.3em] uppercase mb-3">
            Our Projects
          </p>

          <div className="flex flex-col w-full gap-0.5 mb-5">
            {projects.map((proj, i) => (
              <h2
                key={proj.id}
                className={`font-display text-primary leading-tight ${
                  i % 2 === 0 ? "self-start text-left pl-2" : "self-end text-right pr-2"
                }`}
                style={{ fontSize: "clamp(1.5rem, 7vw, 2.2rem)" }}
              >
                {proj.title}
              </h2>
            ))}
          </div>

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
