import Image from "next/image";
import Link from "next/link";
import { HeroScene } from "@/components/HeroScene";
import { Typography } from "@/components/ui/Typography";
import { buttonVariants } from "@/components/ui/Button";
import CurvedLoop from "@/components/ui/CurvedLoop";

const PROJECTS = [
  {
    id: "freeflow",
    title: "FreeFlow",
    subtitle: "A native macOS application engineered to capture and render buttery-smooth, auto-zooming product demos. Privacy-first, completely non-destructive, and visually stunning.",
    image: "/freeflow-ui.png",
    link: "/products/freeflow",
    external: false,
    theme: "bg-[#F4F4F2]" // Light mode aesthetic
  },
  {
    id: "core-defenses",
    title: "Core Defenses",
    subtitle: "Architecting the digital presence for next-generation defense. A high-performance, visually striking marketing experience featuring cinematic video headers and rigorous typography.",
    image: "/core-defenses.png",
    link: "https://www.core-defenses.com/",
    external: true,
    theme: "bg-[#111111] text-white" // Dark mode aesthetic to contrast
  }
];

export default function Home() {
  return (
    <main className="flex-1 w-full bg-background">
      <HeroScene />

      {/* Manifesto Section */}
      <section className="px-4 md:px-20 py-24 md:py-40 flex justify-center border-t border-border">
        <Typography 
          variant="heading" 
          className="text-4xl md:text-5xl lg:text-7xl leading-[1.1] max-w-[1200px] text-center"
        >
          We don't build generic products. We engineer precise, enduring tools designed to empower focused work.
        </Typography>
      </section>

      {/* Curved Loop Divider */}
      <section className="overflow-hidden border-t border-border py-12 md:py-16">
        <CurvedLoop
          marqueeText="Building What Matters ✦ Timeless ✦ Intentional ✦ Exceptional ✦"
          curveAmount={80}
          speed={1}
        />
      </section>

      {/* Selected Works Section */}
      <section className="px-4 md:px-20 py-24 md:py-32 border-t border-border">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <Typography variant="display" className="text-5xl md:text-6xl">
              Selected Works
            </Typography>
            <Link href="/work" className={buttonVariants({ variant: "secondary" })}>
              View All Projects
            </Link>
          </div>

          <div className="flex flex-col gap-12 md:gap-24">
            {PROJECTS.map((project, i) => (
              <div 
                key={project.id} 
                className={`relative group flex flex-col gap-8 rounded-[2rem] overflow-hidden ${project.theme}`}
              >
                {/* Project Image */}
                <div className="relative w-full aspect-[4/3] md:aspect-[16/9] p-4 md:p-12">
                  <div className="relative w-full h-full overflow-hidden rounded-xl">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className={`object-cover transition-transform duration-700 group-hover:scale-105 ${project.id === 'core-defenses' ? 'object-top' : 'object-center'}`}
                    />
                  </div>
                </div>

                {/* Project Info Panel */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 p-8 md:p-12 z-10 bg-inherit relative">
                  <div className="flex flex-col max-w-xl gap-4">
                    <Typography variant="heading" className="text-3xl md:text-4xl">
                      {project.title}
                    </Typography>
                    <Typography variant="body" className={project.id === 'core-defenses' ? "text-neutral-300" : "text-muted"}>
                      {project.subtitle}
                    </Typography>
                  </div>
                  
                  {project.external ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className={`${buttonVariants({ variant: 'primary' })} ${project.id === 'core-defenses' ? 'bg-white !text-black hover:bg-white/90' : ''}`}>
                      View Live Site
                    </a>
                  ) : (
                    <Link href={project.link} className={buttonVariants({ variant: "primary" })}>
                      View Case Study
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 md:px-20 py-32 border-t border-border bg-surface-elevated">
        <div className="animate-fade-up max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
          <Typography variant="heading" className="text-3xl md:text-4xl max-w-lg">
            Ready to build something exceptional?
          </Typography>
          <Link
            href="/contact"
            className={buttonVariants({ variant: "primary", size: "large" })}
          >
            Get in touch
          </Link>
        </div>
      </section>
    </main>
  );
}
