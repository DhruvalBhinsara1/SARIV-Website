"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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

// ─── Magnetic card hook ───────────────────────────────────────────────────────
function useMagneticCard(strength = 18) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, {
      rotateY: (x / rect.width) * strength,
      rotateX: -(y / rect.height) * strength,
      transformPerspective: 900,
      ease: "power2.out",
      duration: 0.4,
    });
  }, [strength]);

  const onLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "elastic.out(1,0.75)" });
  }, []);

  return { cardRef, onMove, onLeave };
}

// ─── Single project card ──────────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
}: {
  project: WorkProject;
  index: number;
}) {
  const { cardRef, onMove, onLeave } = useMagneticCard(12);
  const imgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLDivElement>(null);
  const cardWrapRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const card = cardWrapRef.current;
    if (!card) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: "top 82%",
        toggleActions: "play none none reverse",
      },
    });

    // Clip-path reveal for number
    tl.fromTo(
      numRef.current,
      { clipPath: "inset(0 100% 0 0)", opacity: 0 },
      { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.7, ease: "power3.out" },
      0
    );

    // Card slides up
    tl.fromTo(
      cardRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      0.1
    );

    // Title clip reveal
    tl.fromTo(
      titleRef.current,
      { clipPath: "inset(0 0 100% 0)" },
      { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "power3.out" },
      0.25
    );

    // Sub + btn fade up
    tl.fromTo(
      [subRef.current, btnRef.current],
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
      0.45
    );

    // Parallax on the image
    gsap.to(imgRef.current, {
      yPercent: -15,
      ease: "none",
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });
  }, { scope: cardWrapRef });

  const num = String(index + 1).padStart(2, "0");

  return (
    <div ref={cardWrapRef} className="group/card">
      {/* Index number */}
      <div
        ref={numRef}
        className="text-[11px] font-mono text-muted mb-4 tracking-[0.2em] uppercase select-none"
        style={{ clipPath: "inset(0 100% 0 0)" }}
      >
        {num} — Project
      </div>

      {/* Tilt card */}
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        className="relative w-full rounded-[2rem] overflow-hidden bg-black opacity-0"
      >
        {/* Image layer with parallax */}
        <div ref={imgRef} className="absolute inset-0 scale-110" style={{ willChange: "transform" }}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority={index === 0}
          />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10" />

        {/* Content */}
        <div className="relative z-10 h-[52vh] md:h-[58vh] flex flex-col justify-end p-7 md:p-12">
          {/* Title */}
          <div className="overflow-hidden mb-3">
            <div ref={titleRef} style={{ clipPath: "inset(0 0 100% 0)" }}>
              <p className="text-white font-display text-4xl md:text-6xl lg:text-7xl leading-none tracking-tight">
                {project.title}
              </p>
            </div>
          </div>

          {/* Subtitle */}
          <div ref={subRef} className="opacity-0">
            <p className="text-white/70 text-sm md:text-base max-w-lg leading-relaxed mb-6">
              {project.subtitle}
            </p>
          </div>

          {/* Button */}
          <div ref={btnRef} className="opacity-0">
            {project.external ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-sm font-medium hover:bg-white/90 transition-colors group/btn"
              >
                <span>View Live Site</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </a>
            ) : (
              <Link
                href={project.link}
                className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-sm font-medium hover:bg-white/90 transition-colors group/btn"
              >
                <span>View Case Study</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>

        {/* Shine on hover */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.06)_0%,transparent_70%)]" />
      </div>
    </div>
  );
}

// ─── Main exported component ──────────────────────────────────────────────────
export function SelectedWorkScroll({ projects }: { projects: WorkProject[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  // Desktop: horizontal pin-scroll
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const totalScroll = track.scrollWidth - track.clientWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: "top top",
          end: () => `+=${totalScroll + window.innerHeight * 0.5}`,
          scrub: 1.2,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      tl.to(track, { x: -totalScroll, ease: "none" });

      // Floating label animates as section enters
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: { trigger: section, start: "top 80%" },
        }
      );

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} className="relative">

      {/* ── Desktop: horizontal scroll track ─────────────────────────── */}
      <div className="hidden lg:block overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-8 will-change-transform"
          style={{ width: "max-content" }}
        >
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="w-[55vw] xl:w-[50vw] flex-shrink-0 pt-2 pb-16"
            >
              <ProjectCard project={project} index={i} />
            </div>
          ))}

          {/* End spacer card */}
          <div className="w-[20vw] flex-shrink-0 flex items-center justify-center pb-16">
            <div ref={labelRef} className="text-center opacity-0">
              <p className="text-muted text-sm tracking-widest uppercase font-mono mb-4">
                That&apos;s a wrap
              </p>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 text-primary font-medium text-base border-b border-primary pb-0.5 hover:gap-4 transition-all duration-300 group"
              >
                All projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile: vertical stack ────────────────────────────────────── */}
      <div className="lg:hidden flex flex-col gap-16">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}
