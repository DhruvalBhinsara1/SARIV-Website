import Image from "next/image";
import Link from "next/link";
import { HeroScene } from "@/components/HeroScene";
import { Typography } from "@/components/ui/Typography";
import { buttonVariants } from "@/components/ui/Button";
import CurvedLoop from "@/components/ui/CurvedLoop";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Magnetic } from "@/components/ui/Magnetic";

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
        <div className="flex flex-col max-w-7xl mx-auto w-full">
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

          <div className="flex flex-col gap-12 md:gap-24">
            {PROJECTS.map((project, i) => (
              <ScrollReveal key={project.id}>
                <div 
                  className={`relative group flex flex-col gap-8 rounded-[2rem] overflow-hidden ${project.theme}`}
                >
                  {/* Project Image */}
                  <div className="relative w-full aspect-[4/3] md:aspect-[16/9]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className={`object-cover transition-transform duration-700 ${project.id === 'core-defenses' ? 'object-top group-hover:scale-105' : 'object-[30%_center] md:object-center mix-blend-darken group-hover:scale-105'}`}
                    />
                  </div>

                  {/* Project Info Panel */}
                  <div className="flex flex-col items-start md:flex-row md:items-end justify-between gap-8 p-8 md:p-12 z-10 bg-inherit relative">
                    <div className="flex flex-col max-w-xl gap-4">
                      <Typography variant="heading" className={`text-3xl md:text-4xl ${project.id === 'core-defenses' ? 'text-white' : ''}`}>
                        {project.title}
                      </Typography>
                      <Typography variant="body" className={`transition-colors duration-300 ${project.id === 'core-defenses' ? "text-neutral-300 hover:text-white" : "text-muted hover:text-primary"}`}>
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
              </ScrollReveal>
            ))}
          </div>
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
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
              <Magnetic strength={20}>
                <Link href="/start-project" className={`${buttonVariants({ variant: "primary", size: "large" })} w-[200px]`}>
                  Start a Project
                </Link>
              </Magnetic>
              <Magnetic strength={20}>
                <Link href="/contact" className={`${buttonVariants({ variant: "secondary", size: "large" })} w-[200px]`}>
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
