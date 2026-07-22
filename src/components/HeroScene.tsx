import { Mark } from "./Mark";
import Image from "next/image";

export function HeroScene() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 overflow-hidden pt-32 pb-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero_image.png"
          alt="Background Hero Image"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Background ambient gradient orb */}
      <div className="absolute inset-0 gradient-orb opacity-50 animate-fade-in z-0" />
      
      <div className="relative z-10 flex flex-col items-center w-full">
        <div className="mb-10 animate-fade-up">
          <Mark className="size-20 md:size-28 text-white" />
        </div>
        
        <h1 className="font-display font-light text-white text-[14vw] md:text-[96px] leading-[1.05] tracking-[-1.92px] text-center max-w-[900px] animate-fade-up" style={{ animationDelay: "0.1s" }}>
          Building <br className="md:hidden" />
          what matters.
        </h1>
      </div>
    </div>
  );
}
