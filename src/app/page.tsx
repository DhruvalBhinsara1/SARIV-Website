import Link from "next/link";
import { HeroScene } from "@/components/HeroScene";

const FEATURES = [
  {
    index: "01",
    title: "Auto-Zoom & Camera Follow",
    body: "A critically-damped spring follows the action — holding, reframing, never snapping. Deterministic, so the same recording always renders the same way.",
  },
  {
    index: "02",
    title: "Synthetic Cursor",
    body: "Cursor pixels are excluded from capture; the pointer is re-rendered from the input timeline, so it stays crisp under any zoom level.",
  },
  {
    index: "03",
    title: "One-Pass Export",
    body: "Sequential decode, single analysis pass — export time scales linearly with recording length, with real progress in-app and in the menubar.",
  },
  {
    index: "04",
    title: "Display P3 Color",
    body: "Capture, render, and export all stay in Display P3 end-to-end, so what you export matches what your panel showed.",
  },
  {
    index: "05",
    title: "Non-Destructive Editing",
    body: "Theme, canvas, and zoom are intent, not baked-in edits. Change your mind after recording — Update Video re-renders, the capture is never touched.",
  },
  {
    index: "06",
    title: "Privacy-First Capture",
    body: "The input timeline records where interaction happened — cursor, clicks, scroll, typing bursts — never key codes or on-screen content.",
  },
];

const STEPS = [
  {
    index: "01",
    title: "Record",
    body: "Capture your full display, a single window, or a drag-selected area — with system audio and an optional mic track.",
  },
  {
    index: "02",
    title: "Auto-edit",
    body: "FreeFlow analyzes the input timeline and computes zoom, camera follow, and cursor rendering — no manual keyframing.",
  },
  {
    index: "03",
    title: "Export",
    body: "One pass to a themed 1080p, 4K, or vertical MP4 — or an animated GIF. Re-export anytime after restyling.",
  },
];

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

      <section className="px-8 md:px-20 py-24 border-t border-[#e7e5e4]">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
          <span className="animate-fade-up font-body text-xs font-semibold tracking-[0.96px] uppercase text-[#777169]">
            Our flagship
          </span>
          <div className="animate-fade-up flex flex-col md:flex-row md:items-end justify-between gap-12">
            <h2 className="font-display font-light text-[#0c0a09] text-4xl md:text-6xl tracking-[-0.96px]">
              FreeFlow
            </h2>
            <p className="max-w-md font-body text-base leading-relaxed tracking-[0.16px] text-[#4e4e4e]">
              A native macOS app for recording beautiful product demos. Capture your screen, and
              FreeFlow automatically zooms into the action, re-renders a crisp synthetic cursor, and
              exports a themed video — a lightweight alternative to Screen Studio, Loom, and Arcade.
            </p>
          </div>
          <Link
            href="/work"
            className="animate-fade-up self-start mt-4 flex items-center h-10 px-5 rounded-full border border-[#d6d3d1] text-[#0c0a09] font-body text-[15px] font-medium hover:border-[#0c0a09] transition-colors"
          >
            See how it works
          </Link>
        </div>
      </section>

      <section className="px-8 md:px-20 py-24">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.index}
              className="animate-fade-up flex flex-col gap-4 rounded-xl border border-[#e7e5e4] bg-white p-6"
              style={{ animationDelay: `${0.05 + i * 0.08}s` }}
            >
              <div className="flex items-baseline gap-3">
                <span className="font-body text-[10px] text-[#a8a29e]">{feature.index}</span>
                <h3 className="font-body text-xs font-semibold tracking-[0.96px] uppercase text-[#0c0a09]">
                  {feature.title}
                </h3>
              </div>
              <p className="font-body text-sm leading-relaxed tracking-[0.15px] text-[#4e4e4e]">
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-8 md:px-20 py-24 border-t border-[#e7e5e4]">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-16">
          <h2 className="animate-fade-up font-display font-light text-[#0c0a09] text-3xl md:text-4xl tracking-[-0.32px]">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {STEPS.map((step, i) => (
              <div
                key={step.index}
                className="animate-fade-up flex flex-col gap-4"
                style={{ animationDelay: `${0.1 + i * 0.15}s` }}
              >
                <span className="font-display font-light text-[#0c0a09] text-5xl tracking-[-0.32px]">
                  {step.index}
                </span>
                <h3 className="font-body text-base font-medium text-[#0c0a09]">{step.title}</h3>
                <p className="font-body text-sm leading-relaxed tracking-[0.15px] text-[#4e4e4e]">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 md:px-20 py-32 border-t border-[#e7e5e4] bg-[#fafafa]">
        <div className="animate-fade-up max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
          <h2 className="font-display font-light text-[#0c0a09] text-3xl md:text-4xl tracking-[-0.32px] max-w-lg">
            Want early access to FreeFlow?
          </h2>
          <a
            href="mailto:hello@sariv.systems"
            className="flex items-center h-10 px-5 rounded-full bg-[#292524] text-white font-body text-[15px] font-medium hover:bg-[#0c0a09] transition-colors shrink-0"
          >
            Get in touch
          </a>
        </div>
      </section>
    </main>
  );
}
