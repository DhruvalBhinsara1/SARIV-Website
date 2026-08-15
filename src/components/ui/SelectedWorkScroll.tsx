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
};

// ─── Desktop float slot config ────────────────────────────────────────────────
// Each slot has a unique image + a link to its project.
// py = total Y drift (px) over the full scroll distance.
// projIdx = which project this slot represents.
const DESKTOP_SLOTS = [
  { left: "4%",   right: "auto", top: "18%", width: "clamp(260px, 28vw, 410px)", rot: -3, py: -40, projIdx: 0 },
  { left: "auto", right: "4%",   top: "18%", width: "clamp(260px, 28vw, 410px)", rot:  3, py: -30, projIdx: 1 },
  { left: "6%",   right: "auto", top: "56%", width: "clamp(240px, 26vw, 380px)", rot:  2, py: -35, projIdx: 2 },
  { left: "auto", right: "5%",   top: "56%", width: "clamp(240px, 26vw, 380px)", rot: -2, py: -25, projIdx: 3 },
] as const;

const p2 = (n: number) => String(n).padStart(2, "0");
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

// ─── Linked image card ────────────────────────────────────────────────────────
function LinkedCard({
  src, alt, link, external, sizes, rounded = "rounded-2xl",
  aspect = "16 / 10", objectFit = "object-contain", children,
}: {
  src: string; alt: string; link: string; external?: boolean;
  sizes: string; rounded?: string; aspect?: string;
  objectFit?: string;
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
      className={`block relative w-full ${rounded} overflow-hidden group/card bg-surface/90 border border-black/10 dark:border-white/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.18)] hover:border-black/25 transition-all duration-300`}
      style={{
        aspectRatio: aspect,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={`${objectFit} transition-transform duration-700 group-hover/card:scale-[1.03]`}
      />
      <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/5 transition-colors duration-300 pointer-events-none" />
      {children}
    </Tag>
  );
}

export function SelectedWorkScroll({ projects }: { projects: WorkProject[] }) {
  const outerRef       = useRef<HTMLDivElement>(null);
  const innerRef       = useRef<HTMLDivElement>(null);
  const floatRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs        = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef     = useRef<HTMLSpanElement>(null);
  const titleRef       = useRef<HTMLHeadingElement>(null);
  const subRef         = useRef<HTMLParagraphElement>(null);
  const anchorRef      = useRef<HTMLAnchorElement>(null);
  const anchorTextRef  = useRef<HTMLSpanElement>(null);
  const activeRef      = useRef(0);

  // ── Switch active project on scroll with smooth color transitions ──────
  function switchProject(index: number) {
    if (index === activeRef.current) return;
    activeRef.current = index;
    const proj = projects[index];
    const targetBg = proj.bg || "#FAF9F7";
    const accent = proj.accent || "var(--color-primary)";

    // 1. Smoothly morph background color of the full pinned section
    if (innerRef.current) {
      gsap.to(innerRef.current, {
        backgroundColor: targetBg,
        duration: 0.75,
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
        y: -12, opacity: 0, duration: 0.16, ease: "power2.in",
        onComplete() {
          if (titleRef.current) titleRef.current.textContent = proj.title;
          gsap.fromTo(titleRef.current, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.32, ease: "power3.out" });
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

    // 6. Floating cards: active card pops to 1 opacity, inactive cards dim to 0.20
    floatRefs.current.forEach((el, i) => {
      if (!el) return;
      const isActive = DESKTOP_SLOTS[i].projIdx === index;
      gsap.killTweensOf(el);
      
      gsap.set(el, { zIndex: isActive ? 30 : 10 });
      
      gsap.to(el, {
        opacity: isActive ? 1 : 0.20,
        scale:   isActive ? 1 : 0.94,
        duration: 0.55,
        ease: "power2.inOut",
      });
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

  // ── GSAP: desktop pin-scroll & floating animations ──────────────────────
  useGSAP(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    
    // Continuous subtle organic floating for all cards
    gsap.utils.toArray(".floating-img").forEach((el: any) => {
      gsap.to(el, {
        y: -8 - Math.random() * 6,
        x: (Math.random() - 0.5) * 5,
        rotation: (Math.random() - 0.5) * 1.5,
        duration: 3.5 + Math.random() * 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: -Math.random() * 5,
      });
    });

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
            floatRefs.current.forEach((el, i) => {
              if (!el) return;
              gsap.set(el, { y: progress * DESKTOP_SLOTS[i].py });
            });
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

      {/* ══ DESKTOP PINNED SECTION ════════════════════════════════════════════ */}
      <div
        ref={innerRef}
        className="hidden lg:flex flex-col justify-between w-full h-[100svh] select-none overflow-hidden transition-colors duration-700 relative"
        style={{ backgroundColor: p0.bg || "#ECEFF8" }}
      >
        {/* Top Header Row — unified inside pinned canvas */}
        <div className="px-8 md:px-20 max-w-[1400px] mx-auto w-full pt-10 md:pt-12 shrink-0 relative z-40 flex items-center justify-between">
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

        {/* Floating linked image cards */}
        {DESKTOP_SLOTS.map((slot, i) => {
          const proj = projects[clamp(slot.projIdx, 0, projects.length - 1)];
          const isInitialActive = slot.projIdx === 0;
          return (
            <div
              key={i}
              ref={el => { floatRefs.current[i] = el; }}
              className="absolute will-change-transform rounded-2xl"
              style={{
                left: slot.left, right: slot.right, top: slot.top, width: slot.width,
                rotate: `${slot.rot}deg`,
                opacity: isInitialActive ? 1 : 0.20,
                scale: isInitialActive ? 1 : 0.94,
                zIndex: isInitialActive ? 30 : 10,
              }}
            >
              <div className="floating-img w-full h-full">
                <LinkedCard
                  src={proj.image}
                  alt={proj.title}
                  link={proj.link}
                  external={proj.external}
                  sizes="35vw"
                  rounded="rounded-2xl"
                  aspect={proj.aspect}
                  objectFit={proj.objectFit || "object-contain"}
                />
              </div>
              <p className="text-[10px] font-mono text-muted/70 tracking-widest uppercase mt-3 px-2 text-center font-medium">
                {proj.title}
              </p>
            </div>
          );
        })}

        {/* Center content */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-40 pointer-events-none"
          style={{ padding: "0 min(25%, 360px)" }}
        >
          <span
            ref={counterRef}
            className="text-[11px] font-mono tracking-[0.35em] uppercase mb-4 block font-semibold transition-colors duration-500"
            style={{ color: p0.accent || "var(--color-primary)" }}
          >
            {p2(1)} / {p2(projects.length)}
          </span>

          <h2
            ref={titleRef}
            className="font-display text-primary leading-[0.95] tracking-tight mb-5 drop-shadow-xs"
            style={{ fontSize: "clamp(3.5rem, 7vw, 6.5rem)" }}
          >
            {p0.title}
          </h2>

          <p
            ref={subRef}
            className="text-muted text-sm md:text-base leading-relaxed mb-8 max-w-[32ch]"
          >
            {p0.subtitle}
          </p>

          <div className="pointer-events-auto">
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

        {/* Bottom Progress dots */}
        <div className="w-full pb-8 shrink-0 relative z-40 flex justify-center">
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

      {/* ══ MOBILE: static scattered flex layout with unified background ════ */}
      <div
        className="lg:hidden relative w-full flex flex-col justify-between py-10 px-4 z-10 overflow-hidden transition-colors duration-700"
        style={{ backgroundColor: p0.bg || "#ECEFF8" }}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between mb-8">
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

        {/* Top Pair */}
        <div className="flex justify-between items-start">
          {/* Top Left */}
          {projects[0] && (
            <div className="w-[47%] -rotate-2 origin-top-left z-10">
              <div className="floating-img w-full h-full">
                <LinkedCard
                  src={projects[0].image}
                  alt={projects[0].title}
                  link={projects[0].link}
                  external={projects[0].external}
                  sizes="50vw"
                  rounded="rounded-2xl"
                  aspect={projects[0].aspect}
                  objectFit={projects[0].objectFit || "object-contain"}
                />
              </div>
            </div>
          )}
          {/* Top Right */}
          {projects[1] && (
            <div className="w-[45%] rotate-2 origin-top-right mt-6 z-10">
              <div className="floating-img w-full h-full">
                <LinkedCard
                  src={projects[1].image}
                  alt={projects[1].title}
                  link={projects[1].link}
                  external={projects[1].external}
                  sizes="50vw"
                  rounded="rounded-2xl"
                  aspect={projects[1].aspect}
                  objectFit={projects[1].objectFit || "object-contain"}
                />
              </div>
            </div>
          )}
        </div>

        {/* Centre overlay — project titles */}
        <div className="flex flex-col items-center justify-center text-center px-2 relative z-20 my-8 py-4">
          <div className="flex flex-col w-full gap-4 mb-2">
            {projects.map((proj, i) => (
              <div
                key={proj.id}
                className={`flex flex-col ${i % 2 === 0 ? "items-start pl-2" : "items-end pr-2"}`}
              >
                <span
                  className="text-[10px] font-mono tracking-widest uppercase font-semibold"
                  style={{ color: proj.accent || "var(--color-primary)" }}
                >
                  {p2(i + 1)} / {p2(projects.length)}
                </span>
                <h2
                  className="font-display text-primary leading-tight drop-shadow-xs"
                  style={{ fontSize: "clamp(2.2rem, 9vw, 3.2rem)" }}
                >
                  {proj.title}
                </h2>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Pair */}
        <div className="flex justify-between items-end">
          {/* Bottom Left */}
          {projects[2] && (
            <div className="w-[46%] rotate-2 origin-bottom-left mb-4 z-10">
              <div className="floating-img w-full h-full">
                <LinkedCard
                  src={projects[2].image}
                  alt={projects[2].title}
                  link={projects[2].link}
                  external={projects[2].external}
                  sizes="50vw"
                  rounded="rounded-2xl"
                  aspect={projects[2].aspect}
                  objectFit={projects[2].objectFit || "object-contain"}
                />
              </div>
            </div>
          )}
          {/* Bottom Right */}
          {projects[3] && (
            <div className="w-[45%] -rotate-2 origin-bottom-right z-10">
              <div className="floating-img w-full h-full">
                <LinkedCard
                  src={projects[3].image}
                  alt={projects[3].title}
                  link={projects[3].link}
                  external={projects[3].external}
                  sizes="50vw"
                  rounded="rounded-2xl"
                  aspect={projects[3].aspect}
                  objectFit={projects[3].objectFit || "object-contain"}
                />
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
