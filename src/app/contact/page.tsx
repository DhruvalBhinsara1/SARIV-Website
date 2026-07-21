export default function ContactPage() {
  return (
    <main className="flex-1 w-full">
      <section className="px-8 md:px-20 pt-12 pb-32">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-12">
          <h1 className="animate-reveal text-white text-[12vw] md:text-[140px] font-bold leading-[0.85] tracking-[-0.04em]">
            Get in
            <br />
            touch.
          </h1>
          <p className="animate-fade-up max-w-xs font-mono text-xs uppercase tracking-widest leading-relaxed text-neutral-500">
            No forms, no funnels. Just write to us.
          </p>
        </div>
      </section>

      <section className="w-full aspect-[21/9] flex items-center justify-center relative overflow-hidden bg-[#050505] px-8">
        <a
          href="mailto:hello@sariv.systems"
          className="animate-fade-up kinetic-glow relative z-10 text-white text-[8vw] md:text-[80px] font-bold tracking-[-0.02em] leading-none hover:opacity-70 transition-opacity text-center break-all"
          style={{ animationDelay: "0.2s" }}
        >
          hello@sariv.systems
        </a>
      </section>

      <section className="px-8 md:px-20 py-32">
        <div className="max-w-[1400px] mx-auto">
          <p
            className="animate-fade-up font-mono text-xs uppercase tracking-widest leading-relaxed text-neutral-500 max-w-sm"
            style={{ animationDelay: "0.3s" }}
          >
            For project inquiries and collaborations.
          </p>
        </div>
      </section>
    </main>
  );
}
