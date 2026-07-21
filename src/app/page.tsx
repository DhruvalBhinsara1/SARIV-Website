import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 w-full">
      <section className="min-h-[80vh] flex flex-col justify-center px-8 md:px-20 py-32">
        <div className="max-w-[1400px] mx-auto w-full flex flex-col gap-16">
          <h1 className="animate-reveal text-white text-[13vw] md:text-[128px] font-bold leading-[0.9] tracking-[-0.04em]">
            Building
            <br />
            what matters.
          </h1>
          <div className="animate-fade-up flex flex-col md:flex-row md:items-end justify-between gap-12">
            <p className="max-w-md text-sm font-light leading-relaxed text-neutral-400">
              We design and build digital products that feel timeless, intentional, and technically
              exceptional. We don&apos;t chase trends. We build products people remember.
            </p>
            <div className="flex gap-4">
              <Link
                href="/identity"
                className="px-6 py-3 bg-white text-black text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-neutral-200 transition-colors"
              >
                Identity System
              </Link>
              <a
                href="mailto:hello@sariv.systems"
                className="px-6 py-3 border border-white/20 text-white text-[11px] font-bold tracking-[0.3em] uppercase hover:border-white/60 transition-colors"
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
