import { Mark } from "./Mark";
import Image from "next/image";

export function HeroScene() {
  return (
    <div className="relative min-h-[90vh] w-full flex items-center justify-center px-4 overflow-hidden pt-32 pb-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero_image.png"
          alt="Background Hero Image"
          fill
          className="object-cover opacity-60"
          priority
        />
        {/* Optional overlay to ensure text readability */}
        <div className="absolute inset-0 bg-background/30 backdrop-blur-[2px]" />
      </div>

      {/* Background ambient gradient orb */}
      <div className="absolute inset-0 gradient-orb opacity-50 animate-fade-in z-0 mix-blend-overlay" />
      
      <div className="relative z-10 flex flex-col items-center w-full">
        <div className="mb-10 animate-fade-up">
          <Mark className="size-20 md:size-28 text-primary drop-shadow-sm" />
        </div>
        
        <h1 className="font-display font-light text-primary text-[14vw] md:text-[96px] leading-[1.05] tracking-[-1.92px] text-center max-w-[900px] animate-fade-up drop-shadow-md" style={{ animationDelay: "0.1s" }}>
          Building <br className="md:hidden" />
          what matters.
        </h1>
      </div>
    </div>
  );
}
