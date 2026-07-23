import Image from "next/image";
import { Mark } from "@/components/Mark";
import { Typography } from "@/components/ui/Typography";

export default function ExportBannerPage() {
  return (
    <div className="relative w-full h-screen bg-background overflow-hidden">
      <style>{`
        header, footer, .mix-blend-difference { display: none !important; }
      `}</style>
      
      {/* Layer 1: Sky */}
      <Image
        src="/sky.png"
        alt="Sky Background"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Layer 2: Floating Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 -translate-y-[4vh]">
        <div className="flex items-center gap-6 mb-6 drop-shadow-2xl">
          <span className="text-white font-display text-6xl tracking-[0.2em] font-medium">SARIV</span>
          <Mark className="w-16 h-auto text-white" />
        </div>
        <Typography variant="heading" className="text-white text-5xl drop-shadow-2xl">
          Building what matters.
        </Typography>
      </div>

      {/* Layer 3: Mountains Foreground */}
      <Image
        src="/mountains.png"
        alt="Mountains Foreground"
        fill
        className="object-cover object-center"
        priority
      />
    </div>
  );
}
