import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Typography } from "@/components/ui/Typography";
import { buttonVariants } from "@/components/ui/Button";
import CurvedLoop from "@/components/ui/CurvedLoop";

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
    <main className="flex-1 w-full bg-background">
      {/* Hero / Intro Section */}
      <section className="relative px-4 md:px-20 pt-48 pb-32 overflow-hidden">
        <div className="animate-fade-up max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-12">
          <Typography variant="body" className="max-w-xl text-lg md:text-xl">
            We design and build digital products that feel timeless, intentional, and technically
            exceptional. We don&apos;t chase trends. We build products people remember.
          </Typography>
          <div className="flex gap-4">
            <Link
              href="/identity"
              className={buttonVariants({ variant: "primary" })}
            >
              Identity System
            </Link>
            <a
              href="mailto:officialsariv@gmail.com"
              className={buttonVariants({ variant: "secondary" })}
            >
              Get in touch
            </a>
          </div>
        </div>
      </section>

      {/* Visual Section */}
      <section className="px-4 md:px-20 py-12 md:py-32 flex flex-col gap-12 items-center">
        <div className="max-w-[1200px] w-full flex flex-col-reverse gap-8 md:flex-row md:items-start md:gap-16">
          <SectionHeader
            eyebrow="The Solution"
            heading="Record once. Re-render instantly."
            supportingText="A native macOS app for recording beautiful product demos. Capture your screen, and FreeFlow automatically zooms into the action, re-renders a crisp synthetic cursor, and exports a themed video — a lightweight alternative to Screen Studio, Loom, and Arcade."
            cta={
              <Link href="/products/freeflow" className={buttonVariants({ variant: "primary" })}>
                See how it works
              </Link>
            }
          />
          <Image
            src="/freeflow-logo.png"
            alt="FreeFlow"
            width={400}
            height={100}
            className="w-40 md:w-[320px] h-auto flex-shrink-0 object-contain"
          />
        </div>
          
        <div className="relative animate-fade-up w-full max-w-[1400px] aspect-[4/3] sm:aspect-[16/10] group">
          <Image
            src="/freeflow-ui.png"
            alt="FreeFlow App Interface"
            fill
            className="object-contain object-center transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 md:px-20 py-32">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <Card key={feature.index} className="animate-fade-up" style={{ animationDelay: `${0.05 + i * 0.08}s` }}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Typography variant="caption" muted className="font-semibold tracking-widest uppercase">
                    {feature.index}
                  </Typography>
                  <Image src="/freeflow-logo.png" alt="" width={16} height={16} className="opacity-50" />
                </div>
                <CardTitle className="mt-4">{feature.title}</CardTitle>
                <CardDescription className="mt-2 text-justify">{feature.body}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Curved Loop Divider */}
      <section className="overflow-hidden border-t border-border py-16 md:py-24">
        <CurvedLoop
          marqueeText="Building What Matters ✦ Timeless ✦ Intentional ✦ Exceptional ✦"
          curveAmount={120}
          speed={1}
        />
      </section>

      {/* Steps / How it Works */}
      <section className="px-4 md:px-20 py-32 border-t border-border">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-16">
          <Typography variant="heading" className="animate-fade-up text-4xl md:text-5xl">
            How it works
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {STEPS.map((step, i) => (
              <div
                key={step.index}
                className="animate-fade-up flex flex-col gap-4"
                style={{ animationDelay: `${0.1 + i * 0.15}s` }}
              >
                <Typography variant="heading" className="text-5xl md:text-6xl text-border">
                  {step.index}
                </Typography>
                <Typography variant="subheading" className="font-medium">
                  {step.title}
                </Typography>
                <Typography variant="body" muted>
                  {step.body}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 md:px-20 py-32 border-t border-border bg-surface-elevated">
        <div className="animate-fade-up max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
          <Typography variant="heading" className="text-3xl md:text-4xl max-w-lg">
            Want early access to FreeFlow?
          </Typography>
          <a
            href="mailto:officialsariv@gmail.com"
            className={buttonVariants({ variant: "primary" })}
          >
            Get in touch
          </a>
        </div>
      </section>
    </main>
  );
}
