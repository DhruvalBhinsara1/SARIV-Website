import { Mark } from "@/components/Mark";

const FOCUS_AREAS = [
  {
    index: "01",
    title: "Shader Experiments",
    body: "GLSL studies in light, noise, and material — testing what a surface can feel like before it ships in a product.",
  },
  {
    index: "02",
    title: "Cursor Systems",
    body: "Custom pointer behavior and hover choreography. Small interactions that change how a whole interface feels alive.",
  },
  {
    index: "03",
    title: "Scroll Interactions",
    body: "Pinning, scrubbing, and pace — treating scroll position as a timeline rather than a side effect of reading.",
  },
  {
    index: "04",
    title: "Layout Systems",
    body: "Grid logic that adapts to content density instead of fixed breakpoints. Structure that holds under pressure.",
  },
  {
    index: "05",
    title: "Motion Experiments",
    body: "Easing curves, stagger timing, and physical response — motion as a language, not a garnish.",
  },
  {
    index: "06",
    title: "Typography Ideas",
    body: "Variable font play, optical sizing, and kinetic type — reading as an experience, not just information transfer.",
  },
];

export default function WorkPage() {
  return (
    <main className="flex-1 w-full">
      <section className="px-8 md:px-20 pt-12 pb-32">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-12">
          <h1 className="animate-reveal text-white text-[12vw] md:text-[140px] font-bold leading-[0.85] tracking-[-0.04em]">
            Selected
            <br />
            Work
          </h1>
          <p className="animate-fade-up max-w-xs font-mono text-xs uppercase tracking-widest leading-relaxed text-neutral-500">
            SARIV is early. What follows is FreeFlow — our lab, not a client roster.
          </p>
        </div>
      </section>

      <section className="w-full aspect-[21/9] flex items-center justify-center relative overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="premium-text-stroke text-[24vw] font-bold select-none leading-none">
            FreeFlow
          </span>
        </div>
        <Mark className="animate-fade-up kinetic-glow relative z-10 size-48 md:size-80 text-white" />
      </section>

      <section className="px-8 md:px-20 py-32">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
          <h2 className="animate-fade-up md:col-span-4 text-white text-3xl md:text-4xl font-bold leading-tight tracking-[-0.02em]">
            FreeFlow is our experimental laboratory.
          </h2>
          <p
            className="animate-fade-up md:col-span-7 md:col-start-6 text-base font-light leading-relaxed max-w-2xl"
            style={{ animationDelay: "0.15s" }}
          >
            Before an idea reaches production, it goes through FreeFlow first. It&apos;s where we
            prototype the things that don&apos;t have a client brief attached — shader experiments,
            cursor systems, scroll interactions, layout systems, motion experiments, navigation
            concepts, typography ideas. Some of it ships. Most of it exists just to prove or disprove
            a hunch. Either way, it&apos;s how we keep our technical craft ahead of what we&apos;re asked
            to build.
          </p>
        </div>
      </section>

      <section className="px-8 md:px-20 py-32 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {FOCUS_AREAS.map((area, i) => (
            <div
              key={area.index}
              className="animate-fade-up flex flex-col gap-6"
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[10px] text-neutral-700">{area.index}</span>
                <h3 className="text-white text-xs font-bold tracking-[0.4em] uppercase">
                  {area.title}
                </h3>
              </div>
              <p className="text-sm font-light leading-relaxed max-w-xs">{area.body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
