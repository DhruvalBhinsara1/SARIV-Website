export default function ContactPage() {
  return (
    <main className="flex-1 w-full">
      <section className="px-8 md:px-20 pt-12 pb-24">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-12">
          <h1 className="animate-reveal font-display font-light text-[#0c0a09] text-[11vw] md:text-[64px] leading-[1.05] tracking-[-1.92px]">
            Get in
            <br />
            touch.
          </h1>
          <p className="animate-fade-up max-w-xs font-body text-sm leading-relaxed tracking-[0.15px] text-[#777169]">
            No forms, no funnels. Just write to us.
          </p>
        </div>
      </section>

      <section className="px-8 md:px-20 pb-24">
        <div className="animate-fade-up relative max-w-[1200px] mx-auto aspect-[21/9] rounded-2xl bg-[#fafafa] flex items-center justify-center overflow-hidden px-8">
          <div className="gradient-orb absolute inset-0" />
          <a
            href="mailto:hello@sariv.systems"
            className="relative z-10 font-display font-light text-[#0c0a09] text-[7vw] md:text-[56px] tracking-[-0.96px] leading-none hover:opacity-70 transition-opacity text-center break-all"
          >
            hello@sariv.systems
          </a>
        </div>
      </section>

      <section className="px-8 md:px-20 py-24">
        <div className="max-w-[1200px] mx-auto">
          <p className="animate-fade-up font-body text-sm leading-relaxed tracking-[0.15px] text-[#777169] max-w-sm">
            For project inquiries and collaborations.
          </p>
        </div>
      </section>
    </main>
  );
}
