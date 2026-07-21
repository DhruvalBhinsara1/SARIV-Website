import Link from "next/link";
import { HeroScene } from "@/components/HeroScene";

export default function Home() {
  return (
    <main className="flex-1 w-full">
      <HeroScene />

      <section className="relative px-8 md:px-20 py-32 overflow-hidden">
        <div className="animate-fade-up max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-12">
          <p className="max-w-md font-body text-base leading-relaxed tracking-[0.16px] text-[#4e4e4e]">
            We design and build digital products that feel timeless, intentional, and technically
            exceptional. We don&apos;t chase trends. We build products people remember.
          </p>
          <div className="flex gap-3">
            <Link
              href="/identity"
              className="flex items-center h-10 px-5 rounded-full bg-[#292524] text-white font-body text-[15px] font-medium hover:bg-[#0c0a09] transition-colors"
            >
              Identity System
            </Link>
            <a
              href="mailto:hello@sariv.systems"
              className="flex items-center h-10 px-5 rounded-full border border-[#d6d3d1] text-[#0c0a09] font-body text-[15px] font-medium hover:border-[#0c0a09] transition-colors"
            >
              Get in touch
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
