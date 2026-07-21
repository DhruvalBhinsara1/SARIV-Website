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
      <section className="px-8 md:px-20 pt-12 pb-24">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-12">
          <h1 className="animate-reveal font-display font-light text-[#0c0a09] text-[11vw] md:text-[64px] leading-[1.05] tracking-[-1.92px]">
            Identity
            <br />
            System
          </h1>
          <p className="animate-fade-up max-w-xs font-body text-sm leading-relaxed tracking-[0.15px] text-[#777169]">
            Practical application of the mark in digital OS environments. A study in optical balance.
          </p>
        </div>
      </section>

      <section className="px-8 md:px-20 pb-24">
        <div className="animate-fade-up relative max-w-[1200px] mx-auto aspect-[21/9] rounded-2xl bg-[#fafafa] flex items-center justify-center overflow-hidden">
          <div className="gradient-orb absolute inset-0" />
          <Mark className="relative z-10 size-32 md:size-48 text-[#0c0a09]" />
        </div>
      </section>

      <section className="px-8 md:px-20 py-24">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {DETAILS.map((detail, i) => (
            <div
              key={detail.index}
              className="animate-fade-up lg:col-span-4 flex flex-col gap-6 rounded-xl border border-[#e7e5e4] bg-white p-6"
              style={{ animationDelay: `${0.1 + i * 0.2}s` }}
            >
              <div className="flex items-baseline gap-3">
                <span className="font-body text-[10px] text-[#a8a29e]">{detail.index}</span>
                <h3 className="font-body text-xs font-semibold tracking-[0.96px] uppercase text-[#0c0a09]">
                  {detail.title}
                </h3>
              </div>
              <div className="flex flex-col gap-6">
                <div className="w-full aspect-square rounded-lg bg-[#f0efed] flex items-center justify-center">
                  <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
                    <Mark className="size-10 text-[#0c0a09]" />
                  </div>
                </div>
                <p className="font-body text-sm leading-relaxed tracking-[0.15px] text-[#4e4e4e]">
                  {detail.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
