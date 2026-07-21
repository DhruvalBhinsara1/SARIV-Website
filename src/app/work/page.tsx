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
      <section className="px-8 md:px-20 pt-12 pb-24">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-12">
          <h1 className="animate-reveal font-display font-light text-[#0c0a09] text-[11vw] md:text-[64px] leading-[1.05] tracking-[-1.92px]">
            Selected
            <br />
            Work
          </h1>
          <p className="animate-fade-up max-w-xs font-body text-sm leading-relaxed tracking-[0.15px] text-[#777169]">
            SARIV is early. What follows is FreeFlow — our lab, not a client roster.
          </p>
        </div>
      </section>

      <section className="px-8 md:px-20 pb-24">
        <div className="animate-fade-up relative max-w-[1200px] mx-auto aspect-[21/9] rounded-2xl bg-[#fafafa] flex items-center justify-center overflow-hidden">
          <div className="gradient-orb absolute inset-0" />
          <div className="relative z-10 flex flex-col items-center gap-4">
            <Mark className="size-20 md:size-28 text-[#0c0a09]" />
            <span className="font-display font-light text-[#0c0a09] text-3xl md:text-5xl tracking-[-0.32px]">
              FreeFlow
            </span>
          </div>
        </div>
      </section>

      <section className="px-8 md:px-20 py-24">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <h2 className="animate-fade-up md:col-span-4 font-display font-light text-[#0c0a09] text-3xl md:text-4xl leading-tight tracking-[-0.32px]">
            FreeFlow is our experimental laboratory.
          </h2>
          <p
            className="animate-fade-up md:col-span-7 md:col-start-6 font-body text-base leading-relaxed tracking-[0.16px] text-[#4e4e4e] max-w-2xl"
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

      <section className="px-8 md:px-20 py-24 border-t border-[#e7e5e4]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FOCUS_AREAS.map((area, i) => (
            <div
              key={area.index}
              className="animate-fade-up flex flex-col gap-4 rounded-xl border border-[#e7e5e4] bg-white p-6"
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              <div className="flex items-baseline gap-3">
                <span className="font-body text-[10px] text-[#a8a29e]">{area.index}</span>
                <h3 className="font-body text-xs font-semibold tracking-[0.96px] uppercase text-[#0c0a09]">
                  {area.title}
                </h3>
              </div>
              <p className="font-body text-sm leading-relaxed tracking-[0.15px] text-[#4e4e4e]">
                {area.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
