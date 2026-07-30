import React from "react";
import { Typography } from "@/components/ui/Typography";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { 
  SiNextdotjs,
  SiNodedotjs,
  SiSupabase,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiPython,
  SiSwift,
  SiPytorch,
  SiPandas
} from "react-icons/si";

const TECH_LOGOS = [
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Supabase", icon: SiSupabase },
  { name: "HTML5", icon: SiHtml5 },
  { name: "CSS3", icon: SiCss3 },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Python", icon: SiPython },
  { name: "Swift", icon: SiSwift },
  { name: "PyTorch", icon: SiPytorch },
  { name: "Pandas", icon: SiPandas },
];

export function TechStack() {
  // Duplicate the array to ensure seamless infinite scrolling
  const scrollItems = [...TECH_LOGOS, ...TECH_LOGOS];

  return (
    <section className="py-24 md:py-32 border-t border-b border-border bg-surface overflow-hidden relative">
      <ScrollReveal>
        <div className="max-w-4xl mx-auto text-center px-4 mb-16">
          <Typography variant="heading" className="text-sm tracking-widest uppercase text-muted mb-4">
            Built with
          </Typography>
          <Typography variant="display" className="text-4xl md:text-5xl">
            Modern technologies for exceptional experiences.
          </Typography>
        </div>
      </ScrollReveal>

      <div className="relative flex overflow-x-hidden w-full group py-4">
        <div className="flex animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap">
          {scrollItems.map((tech, i) => (
            <div 
              key={`${tech.name}-${i}`} 
              className="flex items-center justify-center gap-4 mx-8 md:mx-12 opacity-50 hover:opacity-100 transition-opacity duration-300 min-w-[200px]"
            >
              <tech.icon className="w-10 h-10 md:w-14 md:h-14" />
              <Typography variant="body" className="text-2xl md:text-3xl font-medium">
                {tech.name}
              </Typography>
            </div>
          ))}
        </div>
        
        {/* Second identical div to create the seamless loop */}
        <div className="flex animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap absolute top-4" style={{ left: "100%" }}>
          {scrollItems.map((tech, i) => (
            <div 
              key={`${tech.name}-copy-${i}`} 
              className="flex items-center justify-center gap-4 mx-8 md:mx-12 opacity-50 hover:opacity-100 transition-opacity duration-300 min-w-[200px]"
            >
              <tech.icon className="w-10 h-10 md:w-14 md:h-14" />
              <Typography variant="body" className="text-2xl md:text-3xl font-medium">
                {tech.name}
              </Typography>
            </div>
          ))}
        </div>

        {/* Gradient fades on edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-surface to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-surface to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
