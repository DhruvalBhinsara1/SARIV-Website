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
  aspect?: string;
  objectFit?: string;
  bg?: string;
  accent?: string;
  border?: string;
  tag?: string;
};

const p2 = (n: number) => String(n).padStart(2, "0");
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export function SelectedWorkScroll({ projects }: { projects: WorkProject[] }) {
  const outerRef      = useRef<HTMLDivElement>(null);
  const innerRef      = useRef<HTMLDivElement>(null);
  const cardRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs       = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef    = useRef<HTMLSpanElement>(null);
  const titleRef      = useRef<HTMLHeadingElement>(null);
  const subRef        = useRef<HTMLParagraphElement>(null);
  const anchorRef     = useRef<HTMLAnchorElement>(null);
  const anchorTextRef = useRef<HTMLSpanElement>(null);
  const activeRef     = useRef(0);

  // ── Switch active project on scroll with smooth transitions ───────────────
  function switchProject(index: number) {
    if (index === activeRef.current) return;
    activeRef.current = index;
    const proj = projects[index];
    const targetBg = proj.bg || "#FAF9F7";
    const accent = proj.accent || "var(--color-primary)";

    // 1. Smoothly morph background color of the entire section canvas
    if (innerRef.current) {
      gsap.to(innerRef.current, {
        backgroundColor: targetBg,
        duration: 0.7,
        ease: "power2.out",
      });
    }

    // 2. Counter animation
    if (counterRef.current) {
      counterRef.current.textContent = `${p2(index + 1)} / ${p2(projects.length)}`;
      gsap.to(counterRef.current, {
        color: accent,
        duration: 0.4,
      });
    }

    // 3. Title animation
    if (titleRef.current) {
      gsap.killTweensOf(titleRef.current);
      gsap.to(titleRef.current, {
        y: -16, opacity: 0, duration: 0.16, ease: "power2.in",
        onComplete() {
          if (titleRef.current) titleRef.current.textContent = proj.title;
          gsap.fromTo(titleRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" });
        },
      });
    }

    // 4. Subtitle transition
    if (subRef.current) {
      gsap.killTweensOf(subRef.current);
      gsap.to(subRef.current, {
        opacity: 0, duration: 0.16,
        onComplete() {
          if (subRef.current) subRef.current.textContent = proj.subtitle;
          gsap.to(subRef.current, { opacity: 1, duration: 0.32 });
        },
      });
    }

    // 5. CTA Button link & text
    const a = anchorRef.current;
    if (a) {
      a.href = proj.link;
      proj.external
        ? (a.setAttribute("target", "_blank"), a.setAttribute("rel", "noopener noreferrer"))
        : (a.removeAttribute("target"), a.removeAttribute("rel"));
    }
    
    if (anchorTextRef.current) {
      const targetText = proj.external ? "Live Site" : "View Case Study";
      if (anchorTextRef.current.textContent !== targetText) {
        gsap.to(anchorTextRef.current, {
          opacity: 0,
          duration: 0.18,
          onComplete() {
            if (anchorTextRef.current) anchorTextRef.current.textContent = targetText;
            gsap.to(anchorTextRef.current, { opacity: 1, duration: 0.3 });
          }
        });
      }
    }

    // 6. Showcase Cards: crossfade active project card into focus
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const isActive = i === index;
      gsap.killTweensOf(card);
      
      if (isActive) {
        gsap.set(card, { zIndex: 20, pointerEvents: "auto" });
        gsap.to(card, {
          opacity: 1,
          scale: 1,
          y: 0,
          rotate: 0,
          duration: 0.6,
          ease: "power2.out",
        });
      } else {
        const isPrev = i < index;
        gsap.set(card, { zIndex: 10, pointerEvents: "none" });
        gsap.to(card, {
          opacity: 0,
          scale: 0.94,
          y: isPrev ? -30 : 30,
          rotate: isPrev ? -2 : 2,
          duration: 0.5,
          ease: "power2.inOut",
        });
      }
    });

    // 7. Progress dots smooth color morph
    dotRefs.current.forEach((dot, i) => {
      if (!dot) return;
      const isCurrent = i === index;
      const dotColor = isCurrent ? accent : "rgba(0,0,0,0.18)";
      gsap.to(dot, {
        backgroundColor: dotColor,
        scale: isCurrent ? 1.5 : 1,
        duration: 0.35,
      });
    });
  }

  // ── GSAP: desktop pin-scroll ──────────────────────────────────────────────
  useGSAP(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const N = projects.length;
        const scrollBudget = window.innerHeight * (N * 0.85 + 0.3);

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
            switchProject(clamp(Math.floor(progress * N), 0, N - 1));
          },
        });

        return () => { pinST.kill(); };
      }
    );

    return () => mm.revert();
  }, { scope: outerRef, dependencies: [projects.length] });

  const p0 = projects[0];

  return (
    <div ref={outerRef} className="w-full relative">

      {/* ══ DESKTOP PINNED SHOWCASE ═══════════════════════════════════════════ */}
      <div
        ref={innerRef}
        className="hidden lg:flex flex-col justify-between w-full h-[100svh] select-none overflow-hidden transition-colors duration-700 relative px-8 md:px-16 lg:px-20 py-10"
        style={{ backgroundColor: p0.bg || "#ECEFF8" }}
      >
        {/* Top Header Row */}
        <div className="max-w-[1400px] mx-auto w-full shrink-0 relative z-30 flex items-center justify-between">
          <h2 className="font-display text-4xl md:text-5xl text-primary tracking-tight">
            Selected Work
          </h2>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-primary/20 bg-surface/80 backdrop-blur-md text-primary text-sm font-medium hover:bg-primary hover:text-surface transition-all duration-300 shadow-xs"
          >
            View All Projects
          </Link>
        </div>

        {/* Center Spotlight: Left Info + Right Hero Showcase Card */}
        <div className="max-w-[1400px] mx-auto w-full flex-1 flex items-center justify-between gap-12 lg:gap-16 my-auto relative z-30">
          
          {/* Left Column: Typography & Action */}
          <div className="w-[42%] flex flex-col items-start text-left">
            <span
              ref={counterRef}
              className="text-xs font-mono tracking-[0.35em] uppercase mb-4 block font-semibold transition-colors duration-500"
              style={{ color: p0.accent || "var(--color-primary)" }}
            >
              {p2(1)} / {p2(projects.length)}
            </span>

            <h3
              ref={titleRef}
              className="font-display text-primary leading-[0.95] tracking-tight mb-5 drop-shadow-xs"
              style={{ fontSize: "clamp(3.5rem, 5.5vw, 5.5rem)" }}
            >
              {p0.title}
            </h3>

            <p
              ref={subRef}
              className="text-muted text-base lg:text-lg leading-relaxed mb-8 max-w-[36ch]"
            >
              {p0.subtitle}
            </p>

            <div>
              <a
                ref={anchorRef}
                href={p0.link}
                {...(p0.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group inline-flex items-center gap-2.5 border border-primary/25 bg-surface/90 backdrop-blur-md text-primary text-sm font-medium px-8 py-3.5 rounded-full hover:bg-primary hover:text-surface transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <span ref={anchorTextRef}>{p0.external ? "Live Site" : "View Case Study"}</span>
                <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Showcase Card Stack */}
          <div className="w-[58%] max-w-[780px] aspect-[16/10] relative flex items-center justify-center">
            {projects.map((proj, i) => {
              const isInitial = i === 0;
              const Tag = proj.external ? "a" : Link;
              const extraProps = proj.external
                ? { target: "_blank" as const, rel: "noopener noreferrer" }
                : {};

              return (
                <div
                  key={proj.id}
                  ref={el => { cardRefs.current[i] = el; }}
                  className="absolute inset-0 flex items-center justify-center transition-transform"
                  style={{
                    opacity: isInitial ? 1 : 0,
                    transform: isInitial ? "scale(1) translateY(0)" : "scale(0.94) translateY(30px)",
                    zIndex: isInitial ? 20 : 10,
                    pointerEvents: isInitial ? "auto" : "none",
                  }}
                >
                  <Tag
                    href={proj.link}
                    {...extraProps}
                    className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden group/card bg-surface/90 border border-black/10 dark:border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.18)] hover:border-black/25 transition-all duration-300 block"
                  >
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      fill
                      sizes="(min-width: 1024px) 55vw, 90vw"
                      className="object-contain transition-transform duration-700 group-hover/card:scale-[1.02]"
                      priority={isInitial}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/5 transition-colors duration-300 pointer-events-none" />
                  </Tag>
                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom Progress Bar */}
        <div className="max-w-[1400px] mx-auto w-full shrink-0 relative z-30 flex items-center justify-between pt-2">
          <span className="text-[11px] font-mono tracking-widest uppercase text-muted/60">
            Scroll to explore
          </span>
          <div className="flex gap-2 items-center bg-surface/80 backdrop-blur-md py-2 px-4 rounded-full border border-black/5 dark:border-white/5 shadow-xs pointer-events-auto">
            {projects.map((proj, i) => (
              <button
                key={i}
                type="button"
                onClick={() => switchProject(i)}
                aria-label={`View ${proj.title}`}
                className="p-1.5 rounded-full cursor-pointer focus:outline-none flex items-center justify-center group"
              >
                <div
                  ref={el => { dotRefs.current[i] = el; }}
                  className="rounded-full transition-all duration-300 group-hover:scale-125"
                  style={{
                    width: "7px", height: "7px",
                    background: i === 0 ? (projects[0].accent || "var(--color-primary)") : "rgba(0,0,0,0.2)",
                    transform:  i === 0 ? "scale(1.5)" : "scale(1)",
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══ MOBILE: clean vertical project cards ═════════════════════════════ */}
      <div
        className="lg:hidden relative w-full flex flex-col gap-16 py-12 px-6 overflow-hidden transition-colors duration-700"
        style={{ backgroundColor: p0.bg || "#ECEFF8" }}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-3xl text-primary">
            Selected Work
          </h2>
          <Link
            href="/work"
            className="text-xs font-mono uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-border bg-surface text-primary"
          >
            View All
          </Link>
        </div>

        <div className="flex flex-col gap-12">
          {projects.map((proj, i) => {
            const Tag = proj.external ? "a" : Link;
            const extraProps = proj.external
              ? { target: "_blank" as const, rel: "noopener noreferrer" }
              : {};

            return (
              <div key={proj.id} className="flex flex-col gap-4">
                <Tag
                  href={proj.link}
                  {...extraProps}
                  className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-surface border border-black/10 dark:border-white/10 shadow-lg block"
                >
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </Tag>
                <div className="flex flex-col gap-1.5 px-1">
                  <span
                    className="text-[10px] font-mono tracking-widest uppercase font-semibold"
                    style={{ color: proj.accent || "var(--color-primary)" }}
                  >
                    {p2(i + 1)} / {p2(projects.length)}
                  </span>
                  <h3 className="font-display text-2xl text-primary">
                    {proj.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {proj.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
