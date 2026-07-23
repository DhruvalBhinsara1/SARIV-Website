import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Typography } from "@/components/ui/Typography";
import { buttonVariants } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const projects = [
  {
    number: "01",
    title: "",
    description: "A native macOS application engineered to capture and render buttery-smooth, auto-zooming product demos. Privacy-first, completely non-destructive, and visually stunning.",
    linkText: "View Case Study",
    linkUrl: "/products/freeflow",
    external: false,
    logo: "/freeflow-logo.png",
    image: "/freeflow-ui.png",
    imageAspect: "aspect-[4/3] sm:aspect-[16/10] rounded-3xl overflow-hidden border border-border bg-surface",
    imageClass: "object-cover object-top"
  },
  {
    number: "02",
    title: "Architecting the digital presence for next-generation defense.",
    description: "We partnered with Core Defenses to design and engineer a high-performance, visually striking marketing experience. Featuring cinematic video headers, rigorous typography, and seamless animations, the site was built from the ground up to reflect the precision of their critical infrastructure platforms.",
    linkText: "View Live Site",
    linkUrl: "https://www.core-defenses.com/",
    external: true,
    logo: "",
    image: "/core-defenses.png",
    imageAspect: "aspect-[4/3] sm:aspect-video rounded-3xl overflow-hidden border border-border bg-surface",
    imageClass: "object-cover object-top"
  }
];

export default function WorkPage() {
  return (
    <main className="flex-1 w-full bg-background pt-32 pb-24">
      <div className="max-w-[1200px] mx-auto px-4 md:px-20 mb-24">
        <Typography variant="display" className="animate-fade-up">
          Our Work
        </Typography>
        <Typography variant="body" className="animate-fade-up mt-8 max-w-2xl text-lg md:text-xl" style={{ animationDelay: "0.1s" }}>
          We don&apos;t build generic products. We engineer precise, enduring tools designed to empower focused work. Here are our flagship projects.
        </Typography>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-20 flex flex-col gap-32">
        {projects.map((project, index) => (
          <ScrollReveal key={project.number} delay={index === 0 ? 0.2 : 0}>
            <section className="flex flex-col gap-8">
            <div className={`flex flex-col-reverse gap-6 md:items-start md:gap-16 ${index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"}`}>
              <div className={`flex max-w-[560px] flex-col gap-6 ${index % 2 === 1 ? 'items-end text-right' : 'items-start text-left'}`}>
                <Typography variant="caption" transform="uppercase" muted>
                  {project.number}
                </Typography>
                
                {project.title && (
                  <Typography variant="display" className="text-3xl tracking-tight">
                    {project.title}
                  </Typography>
                )}
                
                <Typography variant="subheading" muted className="text-justify">
                  {project.description}
                </Typography>
                
                {project.external ? (
                  <a href={project.linkUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "primary" })}>
                    {project.linkText}
                  </a>
                ) : (
                  <Link href={project.linkUrl} className={buttonVariants({ variant: "primary" })}>
                    {project.linkText}
                  </Link>
                )}
              </div>
              
              {project.logo && (
                <Image
                  src={project.logo}
                  alt={`Logo for ${project.number}`}
                  width={400}
                  height={100}
                  className="w-40 md:w-[280px] h-auto flex-shrink-0 object-contain mt-2"
                />
              )}
            </div>
            
            <div className={`relative w-full ${project.imageAspect} flex items-center justify-center`}>
              <Image
                src={project.image}
                alt={`Screenshot for ${project.number}`}
                fill
                className={project.imageClass}
              />
              </div>
            </section>
          </ScrollReveal>
        ))}
      </div>
    </main>
  );
}
