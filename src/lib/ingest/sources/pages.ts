import type { DocumentSource, SourceDocument } from "@/lib/ingest/types";

// ponytail: hand-curated excerpts, not a crawler — SARIV already owns this copy
// as source. Covering more pages is data entry (extend this array), not new
// engineering; started with Home/About/Contact as the representative sample.
const PAGES: SourceDocument[] = [
  {
    id: "page:home",
    title: "Home",
    url: "/",
    content: `Building what matters. We design and build digital products that feel timeless, intentional, and technically exceptional. We don't chase trends. We build products people remember.

We don't build generic products. We engineer precise, enduring tools designed to empower focused work.

Selected work includes FreeFlow, Core Defenses, and NexaBrew.`,
  },
  {
    id: "page:about",
    title: "About",
    url: "/about",
    content: `We build products that deserve to exist. SARIV is an independent software studio focused on creating products that solve meaningful problems — not software built for the sake of shipping.

We started SARIV with a simple belief: technology shouldn't add complexity — it should remove it. Every product we build begins with a real problem, not a trend. We work closely with founders, businesses, and ambitious teams to create software that is thoughtful, scalable, and built to last. We're not interested in building things that look good in screenshots. We're interested in building things that hold up when real people depend on them.

Our principles: Build What Matters — we choose problems worth solving over features worth marketing. Design Before Development — great software begins with clarity, not code. Simplicity Wins — the best interfaces disappear. Long-Term Thinking — products should grow without being rebuilt every year.

Our process: Problem (understand the real challenge), Direction (define the simplest solution), Craft (design and engineer with obsessive attention to detail), Refine (measure, improve, repeat — shipping is a beginning, not an end).

What we build: Software Products (complete digital experiences built from the ground up), Internal Platforms (tools that help businesses operate better), AI Experiences (practical AI integrated where it genuinely helps, not for the press release).

What we believe: Clarity over complexity. Quality over quantity. Longevity over trends. Products over projects.`,
  },
  {
    id: "page:contact",
    title: "Contact",
    url: "/contact",
    content: `Get in Touch. Questions, feedback, or just want to say hello? Send us a message and we'll get back to you. Have a project in mind? Visit the Start a Project page instead.`,
  },
];

export const pagesSource: DocumentSource = {
  name: "pages",
  async load(): Promise<SourceDocument[]> {
    return PAGES;
  },
};
