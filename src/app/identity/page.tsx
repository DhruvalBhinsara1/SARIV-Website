import { Mark } from "@/components/Mark";

const DETAILS = [
  {
    index: "01",
    title: "App OS Architecture",
    body: "Adaptive geometry for strict OS containers. The mark maintains consistent optical volume across variable corner radii (r: 22.5px to r: 16px).",
  },
  {
    index: "02",
    title: "Surface Integration",
    body: "Refining the relationship between mark and complex background depths. Utilizing high-fidelity backdrop filters for environmental context.",
  },
  {
    index: "03",
    title: "Wordmark Pairing",
    body: "Space Grotesk Bold with precise tracking rules (+0.15em). Geometric harmony established between signet height and cap height.",
  },
];

export default function IdentityPage() {
  return (
    <main className="flex-1 w-full">
      <section className="px-8 md:px-20 pt-12 pb-32">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-12">
          <h1 className="animate-reveal text-white text-[12vw] md:text-[140px] font-bold leading-[0.85] tracking-[-0.04em]">
            Identity
            <br />
            System
          </h1>
          <p className="animate-fade-up max-w-xs font-mono text-xs uppercase tracking-widest leading-relaxed text-neutral-500">
            Practical application of the mark in digital OS environments. A study in optical balance.
          </p>
        </div>
      </section>

      <section className="w-full aspect-[21/9] flex items-center justify-center relative overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="premium-text-stroke text-[40vw] font-bold select-none leading-none">
            SARIV
          </span>
        </div>
        <Mark className="animate-fade-up kinetic-glow relative z-10 size-48 md:size-80 text-white" />
      </section>

      <section className="px-8 md:px-20 py-48">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24">
          {DETAILS.map((detail, i) => (
            <div
              key={detail.index}
              className="animate-fade-up lg:col-span-4 flex flex-col gap-12"
              style={{ animationDelay: `${0.1 + i * 0.2}s` }}
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[10px] text-neutral-700">{detail.index}</span>
                <h3 className="text-white text-xs font-bold tracking-[0.4em] uppercase">
                  {detail.title}
                </h3>
              </div>
              <div className="flex flex-col items-start gap-16">
                <div className="w-full aspect-square bg-[#0a0a0a] flex items-center justify-center transition-colors duration-700 hover:bg-[#111]">
                  <div className="w-48 h-48 bg-white rounded-[32px] flex items-center justify-center shadow-2xl transition-transform hover:scale-105">
                    <Mark className="size-16 text-black" />
                  </div>
                </div>
                <p className="text-sm font-light leading-relaxed max-w-xs">{detail.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
