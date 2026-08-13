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
  external?: boolean;
  align?: "left" | "right";
  aspect?: string;
  objectFit?: string;
};

// ─── Desktop float slot config ────────────────────────────────────────────────
// Each slot has a unique image + a link to its project.
// py = total Y drift (px) over the full scroll distance.
// projIdx = which project this slot represents (for link + highlight).
const DESKTOP_SLOTS = [
  { left: "3%",    right: "auto", top: "6%",  width: "clamp(260px, 30vw, 420px)", rot: -4, py: -50, projIdx: 0 },
  { left: "auto", right: "3%",    top: "8%",  width: "clamp(280px, 32vw, 460px)", rot:  3, py: -30, projIdx: 1 },
  { left: "5%",    right: "auto", top: "55%", width: "clamp(220px, 26vw, 380px)", rot:  2, py: -40, projIdx: 2 },
  { left: "auto", right: "4%",    top: "60%", width: "clamp(200px, 24vw, 340px)", rot: -2, py: -25, projIdx: 3 },
] as const;

const p2 = (n: number) => String(n).padStart(2, "0");
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

// ─── Linked image card ────────────────────────────────────────────────────────
  src, alt, link, external, sizes, rounded = "rounded-2xl",
  aspect = "16 / 10", shadow = true, objectFit = "object-cover", children,
}: {
  src: string; alt: string; link: string; external?: boolean;
  sizes: string; rounded?: string; aspect?: string; shadow?: boolean;
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
      className={`block relative w-full ${rounded} overflow-hidden group/card ${shadow ? 'shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]' : ''}`}
      style={{
        aspectRatio: aspect,
      }}
    >
      <Image src={src} alt={alt} fill sizes={sizes} className={`${objectFit} transition-transform duration-700 group-hover/card:scale-[1.03]`} />
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
  const anchorTextRef = useRef<HTMLSpanElement>(null);
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
    
    if (anchorTextRef.current) {
      const targetText = proj.external ? "Live Site" : "View Case Study";
      if (anchorTextRef.current.textContent !== targetText) {
        gsap.to(anchorTextRef.current, {
          opacity: 0,
          duration: 0.2,
          onComplete() {
            if (anchorTextRef.current) anchorTextRef.current.textContent = targetText;
            gsap.to(anchorTextRef.current, { opacity: 1, duration: 0.36 });
          }
        });
      }
    }

    // Highlight — bring active card to the front while fading others
    floatRefs.current.forEach((el, i) => {
      if (!el) return;
      const isActive = DESKTOP_SLOTS[i].projIdx === index;
      gsap.killTweensOf(el);
      
      // Depth effect: active image pops in front, but NEVER covers the z-40 text
      gsap.set(el, { zIndex: isActive ? 30 : 10 });
      
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

  // ── GSAP: desktop pin-scroll & floating animations ──────────────────────
  useGSAP(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    
    // Continuous random floating for all images
    gsap.utils.toArray(".floating-img").forEach((el: any) => {
      gsap.to(el, {
        y: -10 - Math.random() * 8,
        x: (Math.random() - 0.5) * 6,
        rotation: (Math.random() - 0.5) * 2,
        duration: 3 + Math.random() * 2,
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
        const scrollBudget = window.innerHeight * (N * 0.8 + 0.4);
        
        const section = document.getElementById("selected-work-section");

        const pinST = ScrollTrigger.create({
          trigger: section || outer,
          pin: section || inner,
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

        // Entrance animation
        gsap.fromTo(
          floatRefs.current.filter(Boolean),
          { opacity: 0, scale: 0.9 },
          {
            opacity: (i: number) => DESKTOP_SLOTS[i].projIdx === 0 ? 1 : 0.15,
            scale: (i: number) => DESKTOP_SLOTS[i].projIdx === 0 ? 1 : 0.94,
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
    <div ref={outerRef} className="w-full h-full">

      {/* ══ DESKTOP ═══════════════════════════════════════════════════════════ */}
      <div
        ref={innerRef}
        className="hidden lg:block relative w-full h-full bg-background select-none"
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
                left: slot.left, right: slot.right, top: slot.top, width: slot.width,
                rotate: `${slot.rot}deg`, opacity: 0,
                zIndex: slot.projIdx < projects.length ? 10 : 6,
              }}
            >
              <div className="floating-img w-full h-full">
                <LinkedCard
                  src={proj.image}
                  alt={proj.title}
                  link={proj.link}
                  external={proj.external}
                  sizes="35vw"
                  rounded="rounded-xl"
                  aspect={proj.aspect}
                  objectFit={proj.objectFit}
                />
              </div>
              <p className="text-[9px] font-mono text-muted tracking-widest uppercase mt-3 px-2 text-center opacity-70">{proj.title}</p>
            </div>
          );
        })}

        {/* Center content */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-40 pointer-events-none"
          style={{ padding: "0 min(25%, 350px)" }}
        >
          <p className="text-[10px] font-mono text-muted/50 tracking-[0.3em] uppercase mb-6">Scroll to explore</p>
          <span ref={counterRef} className="text-[11px] font-mono text-muted tracking-[0.35em] uppercase mb-5 block">
            {p2(1)} / {p2(projects.length)}
          </span>
          <h2
            ref={titleRef}
            className="font-display text-primary leading-none tracking-tight mb-5 drop-shadow-sm"
            style={{ fontSize: "clamp(3rem, 6.5vw, 6rem)" }}
          >
            {p0.title}
          </h2>
          <p ref={subRef} className="text-muted text-sm leading-relaxed mb-8 line-clamp-3 bg-background/50 backdrop-blur-sm p-2 rounded-lg" style={{ maxWidth: "30ch" }}>
            {p0.subtitle}
          </p>
          <div className="pointer-events-auto">
            <a
              ref={anchorRef}
              href={p0.link}
              {...(p0.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group inline-flex items-center gap-2.5 border border-primary/35 bg-background/80 backdrop-blur-md text-primary text-sm font-medium px-8 py-3.5 rounded-full hover:bg-primary hover:text-surface transition-all duration-300"
            >
              <span ref={anchorTextRef}>{p0.external ? "Live Site" : "View Case Study"}</span>
              <span className="inline-block group-hover:translate-x-0.5 transition-transform">→</span>
            </a>
          </div>
        </div>

        {/* Progress dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex gap-3 items-center bg-background/80 backdrop-blur-sm py-2 px-4 rounded-full">
          {projects.map((_, i) => (
            <div
              key={i}
              ref={el => { dotRefs.current[i] = el; }}
              className="rounded-full transition-all duration-300"
              style={{
                width: "6px", height: "6px",
                background: i === 0 ? "var(--color-primary)" : "var(--color-border)",
                transform:  i === 0 ? "scale(1.5)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>

      {/* ══ MOBILE: static scattered flex layout ════════════ */}
      <div className="lg:hidden w-full h-full flex flex-col justify-between py-6 pb-12 z-10 overflow-hidden">
        
        {/* Top Pair */}
        <div className="flex justify-between items-start px-2">
          {/* Top Left */}
          {projects[0] && (
            <div className="w-[46%] -rotate-3 origin-top-left z-10">
              <div className="floating-img w-full h-full">
                <LinkedCard
                  src={projects[0].image}
                  alt={projects[0].title}
                  link={projects[0].link}
                  external={projects[0].external}
                  sizes="50vw"
                  rounded="rounded-2xl"
                  aspect={projects[0].aspect}
                  objectFit={projects[0].objectFit}
                />
              </div>
            </div>
          )}
          {/* Top Right */}
          {projects[1] && (
            <div className="w-[44%] rotate-3 origin-top-right mt-8 z-10">
              <div className="floating-img w-full h-full">
                <LinkedCard
                  src={projects[1].image}
                  alt={projects[1].title}
                  link={projects[1].link}
                  external={projects[1].external}
                  sizes="50vw"
                  rounded="rounded-2xl"
                  aspect={projects[1].aspect}
                  objectFit={projects[1].objectFit}
                />
              </div>
            </div>
          )}
        </div>

        {/* Centre overlay — project titles + CTA */}
        <div className="flex flex-col items-center justify-center text-center px-4 relative z-20 my-10 py-6">
          <div className="flex flex-col w-full gap-2 mb-2">
            {projects.map((proj, i) => (
              <h2
                key={proj.id}
                className={`font-display text-primary leading-tight drop-shadow-md ${
                  i % 2 === 0 ? "self-start text-left pl-2" : "self-end text-right pr-2"
                }`}
                style={{ fontSize: "clamp(2rem, 9vw, 3rem)" }}
              >
                {proj.title}
              </h2>
            ))}
          </div>
        </div>

        {/* Bottom Pair */}
        <div className="flex justify-between items-end px-2">
          {/* Bottom Left */}
          {projects[2] && (
            <div className="w-[45%] rotate-3 origin-bottom-left mb-6 z-10">
              <div className="floating-img w-full h-full">
                <LinkedCard
                  src={projects[2].image}
                  alt={projects[2].title}
                  link={projects[2].link}
                  external={projects[2].external}
                  sizes="50vw"
                  rounded="rounded-2xl"
                  aspect={projects[2].aspect}
                  objectFit={projects[2].objectFit}
                />
              </div>
            </div>
          )}
          {/* Bottom Right */}
          {projects[3] && (
            <div className="w-[43%] -rotate-2 origin-bottom-right z-10">
              <div className="floating-img w-full h-full">
                <LinkedCard
                  src={projects[3].image}
                  alt={projects[3].title}
                  link={projects[3].link}
                  external={projects[3].external}
                  sizes="50vw"
                  rounded="rounded-2xl"
                  aspect={projects[3].aspect}
                  objectFit={projects[3].objectFit}
                />
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
