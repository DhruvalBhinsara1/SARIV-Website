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
          <div className="flex flex-col-reverse gap-6 md:flex-row md:items-start md:gap-16">
            <div className="flex max-w-[560px] flex-col items-start gap-6">
              <Typography variant="caption" transform="uppercase" muted>
                01
              </Typography>
              <Typography variant="subheading" muted className="text-justify">
                A native macOS application engineered to capture and render buttery-smooth, auto-zooming product demos. Privacy-first, completely non-destructive, and visually stunning.
              </Typography>
              <Link href="/products/freeflow" className={buttonVariants({ variant: "primary" })}>
                View Case Study
              </Link>
            </div>
            <Image
              src="/freeflow-logo.png"
              alt="FreeFlow"
              width={400}
              height={100}
              className="w-40 md:w-[280px] h-auto flex-shrink-0 object-contain mt-2"
            />
          </div>
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10]">
            <Image
              src="/freeflow-ui.png"
              alt="FreeFlow Demo"
              fill
              className="object-contain object-center"
            />
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
