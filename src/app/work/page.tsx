import { Mark } from "@/components/Mark";

const DECISIONS = [
  {
    index: "01",
    title: "Intent, Not Edits",
    body: "Projects store zoom mode + aggressiveness, not baked segments. Zoom is re-derived at render time by a pure analyzer, so the engine improves without migrating old recordings.",
  },
  {
    index: "02",
    title: "Synthetic Cursor",
    body: "Cursor pixels are excluded from capture; the pointer is re-rendered from the timeline path with a One-Euro filter and centripetal Catmull-Rom, staying crisp under any zoom.",
  },
  {
    index: "03",
    title: "Camera Follow",
    body: "A HOLD/REFRAME state machine drives a critically-damped spring onto the subject, with hysteresis and a short velocity-based lead. Following, never snapping. Deterministic.",
  },
  {
    index: "04",
    title: "Display P3 Color",
    body: "Capture pinned to P3, high-bitrate master, render in P3, MP4 tagged P3-D65 — exports match what the panel showed instead of clamping to sRGB.",
  },
  {
    index: "05",
    title: "One-Pass Export",
    body: "The exporter decodes the source sequentially, no per-frame keyframe seeks, computing zoom analysis and cursor path once per export. Export time scales roughly linearly with length.",
  },
  {
    index: "06",
    title: "Privacy By Design",
    body: "The input timeline records facts about where interaction happened — cursor, clicks, scroll, typing bursts — never key codes or on-screen content.",
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
            SARIV is early. FreeFlow is the one real thing we&apos;ve shipped — a native macOS app,
            in active development.
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
            A macOS app for recording beautiful product demos.
          </h2>
          <p
            className="animate-fade-up md:col-span-7 md:col-start-6 font-body text-base leading-relaxed tracking-[0.16px] text-[#4e4e4e] max-w-2xl"
            style={{ animationDelay: "0.15s" }}
          >
            Capture your screen, and FreeFlow automatically zooms into the action, re-renders a
            crisp synthetic cursor, and exports a themed video — a lightweight, native alternative
            to Screen Studio, Loom, and Arcade. Recording captures two artifacts: the raw screen
            video and a privacy-safe input timeline of cursor positions, clicks, scroll, and typing
            bursts. Everything else — auto-zoom, camera follow, the synthetic cursor, themes — is
            computed deterministically from that timeline at render time. Same input, same output;
            preview equals export.
          </p>
        </div>
      </section>

      <section className="px-8 md:px-20 py-24 border-t border-[#e7e5e4]">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-4">
          <span className="animate-fade-up font-body text-xs font-semibold tracking-[0.96px] uppercase text-[#777169]">
            Under the hood
          </span>
          <h2 className="animate-fade-up font-display font-light text-[#0c0a09] text-2xl md:text-3xl tracking-[-0.32px] max-w-2xl">
            Key engineering decisions
          </h2>
        </div>
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {DECISIONS.map((decision, i) => (
            <div
              key={decision.index}
              className="animate-fade-up flex flex-col gap-4 rounded-xl border border-[#e7e5e4] bg-white p-6"
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              <div className="flex items-baseline gap-3">
                <span className="font-body text-[10px] text-[#a8a29e]">{decision.index}</span>
                <h3 className="font-body text-xs font-semibold tracking-[0.96px] uppercase text-[#0c0a09]">
                  {decision.title}
                </h3>
              </div>
              <p className="font-body text-sm leading-relaxed tracking-[0.15px] text-[#4e4e4e]">
                {decision.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
