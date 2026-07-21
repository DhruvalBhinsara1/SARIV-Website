import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 w-full">
      <section className="relative min-h-[80vh] flex flex-col justify-center px-8 md:px-20 py-32 overflow-hidden">
        <div className="gradient-orb absolute inset-0 -z-10" />
        <div className="max-w-[1200px] mx-auto w-full flex flex-col gap-16">
          <h1 className="animate-reveal font-display font-light text-[#0c0a09] text-[13vw] md:text-[96px] leading-[1.05] tracking-[-1.92px]">
            Building
            <br />
            what matters.
          </h1>
          <div className="animate-fade-up flex flex-col md:flex-row md:items-end justify-between gap-12">
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
        </div>
      </section>
    </main>
  );
}
