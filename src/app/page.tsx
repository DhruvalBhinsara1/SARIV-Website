import Link from "next/link";
import { HeroScene } from "@/components/HeroScene";
import { Typography } from "@/components/ui/Typography";
import { buttonVariants } from "@/components/ui/Button";
import CurvedLoop from "@/components/ui/CurvedLoop";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { SelectedWorkScroll, type WorkProject } from "@/components/ui/SelectedWorkScroll";

const PROJECTS: WorkProject[] = [
  {
    id: "freeflow",
    title: "FreeFlow",
    subtitle: "A native macOS application engineered to capture and render buttery-smooth, auto-zooming product demos. Privacy-first, completely non-destructive, and visually stunning.",
    image: "/freeflow-ui.png",
    link: "/products/freeflow",
    external: false,
  },
  {
    id: "core-defenses",
    title: "Core Defenses",
    subtitle: "Architecting the digital presence for next-generation defense. A high-performance, visually striking marketing experience featuring cinematic video headers and rigorous typography.",
    image: "/core-defenses.png",
    link: "https://www.core-defenses.com/",
    external: true,
    align: "right",
  }
];

export default function Home() {
  return (
    <main className="flex-1 w-full bg-background">
      <HeroScene />

      {/* Manifesto Section */}
      <section className="px-4 md:px-20 py-24 md:py-40 flex justify-center border-t border-border">
        <ScrollReveal>
          <Typography 
            variant="heading" 
            className="text-4xl md:text-5xl lg:text-7xl leading-[1.1] max-w-[1200px] text-center"
            data-cursor="text"
          >
            We don't build generic products. We engineer precise, enduring tools designed to empower focused work.
          </Typography>
        </ScrollReveal>
      </section>

      {/* Curved Loop Divider */}
      <section className="overflow-hidden py-12 md:py-16">
        <CurvedLoop
          marqueeText="Building What Matters ✦ Timeless ✦ Intentional ✦ Exceptional ✦"
          curveAmount={80}
          speed={1}
        />
      </section>

      {/* Selected Works Section */}
      <section className="px-4 md:px-20 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24">
              <Typography variant="display" className="text-5xl md:text-7xl">
                Selected Work
              </Typography>
              <Link href="/work" className={buttonVariants({ variant: "secondary" })}>
                View All Projects
              </Link>
            </div>
          </ScrollReveal>

          <SelectedWorkScroll projects={PROJECTS} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 md:px-20 py-32 border-t border-border bg-surface-elevated">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-10">
            <Typography variant="display" className="text-5xl md:text-7xl">
              Let's connect.
            </Typography>
            <Typography variant="body" className="text-xl md:text-2xl text-muted max-w-2xl">
              Whether you have a visionary project in mind or just want to say hello, we'd love to hear from you.
            </Typography>
            <div className="flex flex-row items-center gap-4 mt-6">
              <Magnetic strength={20}>
                <Link href="/start-project" className={buttonVariants({ variant: "primary", size: "large" })}>
                  Start a Project
                </Link>
              </Magnetic>
              <Magnetic strength={20}>
                <Link href="/contact" className={buttonVariants({ variant: "secondary", size: "large" })}>
                  Say Hello
                </Link>
              </Magnetic>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
