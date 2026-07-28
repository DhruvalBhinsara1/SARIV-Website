"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Typography } from "@/components/ui/Typography";
import { buttonVariants } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type WorkProject = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
  external?: boolean;
  /** Which side the text panel sits on — pick the side that's clear in the screenshot. */
  align?: "left" | "right";
};

export function SelectedWorkScroll({ projects }: { projects: WorkProject[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  // Snap only across this section's own scroll range (top of first card to
  // bottom of last), so the big inter-card gap "pulls" into place without
  // touching scroll anywhere else on the page.
  useGSAP(
    () => {
      if (!wrapperRef.current) return;
      const wrapper = wrapperRef.current;
      const cards = cardRefs.current.filter(Boolean);
      if (cards.length < 2) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cardTriggers = cards.map((card) => ScrollTrigger.create({ trigger: card, start: "top top" }));
        const range = ScrollTrigger.create({ trigger: wrapper, start: "top top", end: "bottom bottom" });
        const snapTo = cardTriggers.map((t) => (t.start - range.start) / (range.end - range.start));
        cardTriggers.forEach((t) => t.kill());
        range.kill();

        const snapTrigger = ScrollTrigger.create({
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          snap: { snapTo, duration: 0.5, ease: "power1.inOut" },
        });

        return () => snapTrigger.kill();
      });

      return () => mm.revert();
    },
    { scope: wrapperRef, dependencies: [projects.length] }
  );

  return (
    <div ref={wrapperRef} className="flex flex-col gap-20 md:gap-32">
      {projects.map((project, i) => {
        const isRight = project.align === "right";
        return (
          <ScrollReveal key={project.id}>
            <div
              ref={(el) => {
                if (el) cardRefs.current[i] = el;
              }}
              className="relative w-full h-[38vh] md:h-[48vh] rounded-[2rem] overflow-hidden bg-black"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover scale-110 blur-[3px]"
              />
              <div
                className={`absolute inset-0 ${
                  isRight
                    ? "bg-gradient-to-l from-black/90 via-black/55 to-black/15"
                    : "bg-gradient-to-r from-black/90 via-black/55 to-black/15"
                }`}
              />

              <div
                className={`relative h-full flex flex-col justify-center p-8 md:p-16 ${
                  isRight ? "items-end text-right" : "items-start text-left"
                }`}
              >
                <Typography
                  variant="display"
                  className="text-white text-4xl md:text-6xl lg:text-7xl max-w-2xl mb-6"
                >
                  {project.title}
                </Typography>
                <Typography
                  variant="body"
                  className={`text-white/80 max-w-xl text-base md:text-lg mb-8 ${isRight ? "text-right" : ""}`}
                >
                  {project.subtitle}
                </Typography>
                {project.external ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${buttonVariants({ variant: "primary" })} w-fit bg-white !text-black hover:bg-white/90`}
                  >
                    View Live Site <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                ) : (
                  <Link
                    href={project.link}
                    className={`${buttonVariants({ variant: "primary" })} w-fit bg-white !text-black hover:bg-white/90`}
                  >
                    View Case Study <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
