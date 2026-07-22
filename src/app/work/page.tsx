import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Typography } from "@/components/ui/Typography";
import { buttonVariants } from "@/components/ui/Button";

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
        {/* Project 1: FreeFlow */}
        <section className="animate-fade-up flex flex-col gap-8" style={{ animationDelay: "0.2s" }}>
          <SectionHeader
            eyebrow="01"
            heading={<Image src="/freeflow-logo.png" alt="FreeFlow" width={400} height={100} className="h-10 md:h-14 w-auto object-contain -ml-1" />}
            supportingText="A native macOS application engineered to capture and render buttery-smooth, auto-zooming product demos. Privacy-first, completely non-destructive, and visually stunning."
            cta={
              <Link href="/products/freeflow" className={buttonVariants({ variant: "primary" })}>
                View Case Study
              </Link>
            }
          />
          <div className="w-full aspect-video rounded-3xl border border-border bg-surface-elevated p-8 md:p-16 flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image 
                src="/freeflow-ui.png" 
                alt="FreeFlow Demo" 
                fill
                className="object-contain"
              />
            </div>
          </div>
        </section>

        {/* Project 2: Placeholder */}
        <section className="animate-fade-up flex flex-col gap-8">
          <SectionHeader
            eyebrow="02"
            heading="Atlas"
            supportingText="A spatial computing interface for organizing complex, heavily nested data structures. Currently in stealth mode."
            cta={
              <a href="#" className={buttonVariants({ variant: "secondary" })}>
                Coming Soon
              </a>
            }
          />
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden border border-border bg-surface flex items-center justify-center">
            <Typography variant="subheading" muted>
              Classified
            </Typography>
          </div>
        </section>
      </div>
    </main>
  );
}
