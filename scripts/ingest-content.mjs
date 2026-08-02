// Seeds document_chunks with the site's real page copy so the chat assistant
// has something grounded to answer from. Re-run any time page copy changes —
// replaceDocument-style delete+insert per documentId makes it safe to repeat.
//
// ponytail: plain script duplicating the small embed+insert logic from
// src/lib/ai instead of importing path-aliased TS from node directly — no
// build step needed to run it.
import fs from "node:fs";
import { embedMany } from "ai";
import { google } from "@ai-sdk/google";
import { sql } from "@vercel/postgres";

for (const line of fs.readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m) process.env[m[1]] = m[2].replace(/^"(.*)"$/, "$1");
}

const embeddingModel = google.textEmbeddingModel(
  process.env.GOOGLE_EMBEDDING_MODEL || "gemini-embedding-2"
);

const DOCUMENTS = [
  {
    id: "home",
    title: "Homepage",
    url: "/",
    paragraphs: [
      `SARIV's mission statement, shown on the homepage: "Building what matters." We design and build digital products that feel timeless, intentional, and technically exceptional. We don't chase trends. We build products people remember.`,
      `SARIV's manifesto: "We don't build generic products. We engineer precise, enduring tools designed to empower focused work."`,
      `SARIV's brand values are timeless, intentional, and exceptional.`,
    ],
  },
  {
    id: "about",
    title: "About SARIV",
    url: "/about",
    paragraphs: [
      `SARIV is an independent software studio. We partner with a few select teams each year to build digital tools that feel intuitive, fast, and crafted with care. Our core belief is that we build software for humans.`,
      `Our story: we started SARIV because we were tired of encountering software that felt broken, bloated, or overly complicated. We believe technology should make your day easier, not harder — thinking deeply about the people actually using the tool, designing interfaces that get out of the way, and writing code that lasts. We're a small team, and we like it that way — it means we can give every project the undivided attention it deserves, treating your product as if it were our own.`,
      `How we build — People first: if a user has to read a manual to understand our interface, we designed it wrong. Great software feels natural and gets out of the way.`,
      `How we build — Quality over speed: we prefer to take the time to sweat the small details, like empty states, animations, and accessibility.`,
      `How we build — Keep it simple: complexity is easy; clarity is the real challenge. We strip away the noise until only the essential solution remains.`,
      `What we can help with — Full-stack products: from a blank canvas to a polished launch, we design and build complete web applications.`,
      `What we can help with — Internal tools: we replace messy spreadsheets and slow workflows with fast, custom software your team will love using.`,
      `What we can help with — Thoughtful AI: we integrate AI in places where it actually saves time and removes friction, never just for the sake of it.`,
    ],
  },
  {
    id: "services",
    title: "Services",
    url: "/services",
    paragraphs: [
      `SARIV solves business problems through software. No one wakes up needing a JavaScript framework — they wake up needing to replace spreadsheets, automate operations, or build a product that actually works. That's where we start.`,
      `The SARIV standard: a cheap agency builds a liability you have to manage. We build assets that work reliably, require zero babysitting, and scale with your growth.`,
      `Service 1 — High-Performance Digital Platforms: fast, meticulously engineered websites designed to elevate your brand and convert visitors into customers, built on modern frameworks with obsessive attention to performance, accessibility, and search visibility. Best for companies whose current website fails to reflect the premium quality of their actual services, funded startups needing a digital presence that matches their ambition, and B2B firms losing deals because their site looks dated. Engagements start at $2,500 (₹2,00,000), typical timeline 3–6 weeks. Deliverables: UI/UX design and prototyping, responsive frontend engineering, CMS integration and content modeling, technical SEO and Core Web Vitals, custom animations and micro-interactions, analytics and conversion tracking.`,
      `Service 2 — Custom Digital Products: bespoke, data-driven web applications engineered to automate operations or serve customers. We don't build MVPs that need to be rewritten — we build foundations that scale. Best for growing businesses that have outgrown off-the-shelf SaaS, teams replacing manual spreadsheet workflows with purpose-built software, and startups building their first customer-facing product on a solid technical foundation. Engagements start at $7,500 (₹6,00,000), typical timeline 8–16 weeks. Deliverables: full-stack application engineering, database architecture and migrations, API design and third-party integrations, authentication and role-based access, admin dashboards and reporting, CI/CD pipeline and deployment, monitoring and error tracking.`,
      `Service 3 — Platform Modernization & Integration: technical debt silently compounds, legacy systems become bottlenecks, and disconnected tools create manual workarounds. We untangle the complexity and build infrastructure designed to last. Best for established businesses where legacy systems are slowing growth, companies paying premium SaaS subscriptions for tools that don't talk to each other, and teams spending more time maintaining code than building features. Engagements start at $4,000 (₹3,20,000), typical timeline 6–10 weeks. Deliverables: codebase and architecture audit, incremental refactoring strategy, custom API development, third-party system integration, cloud migration and optimization, documentation and knowledge transfer.`,
      `Engineering principle 1 — Architecture before implementation: every decision has consequences three years from now. We design data models, API contracts, and infrastructure patterns before writing the first line of production code.`,
      `Engineering principle 2 — Performance is a feature: sub-second load times, optimized database queries, efficient bundle sizes. Speed is not an afterthought — it is a core deliverable.`,
      `Engineering principle 3 — Maintainability over cleverness: clean, well-documented code that your team can understand, extend, and debug six months after we hand it over. No clever shortcuts that become technical debt.`,
      `Engineering principle 4 — Security by default: input validation, authentication, rate limiting, and encryption are built into every layer, not bolted on after launch.`,
      `Engagement process, phase 1 — Understanding & Scoping (1–2 weeks): we invest time in understanding the business problem, not just the feature list. Produces a detailed scope document, technical architecture, and a fixed-price proposal.`,
      `Engagement process, phase 2 — Design & Architecture (1–3 weeks): we design the user experience and technical foundation in parallel — database schemas, API contracts, deployment strategies, and UI prototypes, all validated before a single line of production code.`,
      `Engagement process, phase 3 — Iterative Engineering (4–10 weeks): we build in focused sprints with complete visibility. Clients receive working demos at every milestone, with feedback loops measured in days, not months.`,
      `Engagement process, phase 4 — Launch & Operational Readiness (1–2 weeks): deployment, monitoring, documentation, and knowledge transfer. We ensure the client's team is equipped to maintain and extend the system confidently.`,
      `SARIV's proof points: 100% of code ownership transferred to the client, sub-1-second target load time for every project, zero vendor lock-in by design, and a 24-hour response time on all inquiries.`,
      `FAQ — How long does a typical engagement take? Digital platforms typically take 3–6 weeks. Custom digital products range from 8–16 weeks depending on complexity. Modernization projects vary, but most initial phases complete within 6–10 weeks.`,
      `FAQ — Do you work with early-stage startups? Yes, if the project is well-scoped and the budget aligns with the level of engineering required. SARIV is particularly effective for funded startups that need a strong technical foundation before scaling.`,
      `FAQ — What happens after launch? SARIV provides a post-launch support period included in every engagement, plus ongoing retained engineering partnerships for teams that need continued development, monitoring, and iteration.`,
      `FAQ — Can we see examples of your work? Yes — the Work page has case studies including FreeFlow, NexaBrew, and Core Defenses.`,
      `FAQ — Who owns the code? The client does. Upon full payment, all custom project deliverables and source code transfer to the client. SARIV's internal tools, frameworks, and reusable components remain SARIV's, clearly delineated in every agreement.`,
      `FAQ — Do you sign NDAs? Yes — confidentiality is fundamental to how SARIV works, and SARIV is happy to sign a client's NDA before any technical discussions begin.`,
    ],
  },
  {
    id: "work",
    title: "Our Work",
    url: "/work",
    paragraphs: [
      `SARIV's flagship projects include FreeFlow, Core Defenses, NexaBrew, and Traveloop.`,
      `FreeFlow (SARIV's own product): a native macOS application engineered to capture and render buttery-smooth, auto-zooming product demos. Privacy-first, completely non-destructive, and visually stunning.`,
      `Core Defenses (client project): architecting the digital presence for next-generation defense — a high-performance, visually striking marketing experience featuring cinematic video headers and rigorous typography. Live at core-defenses.com.`,
      `NexaBrew (client project): a real-time cafe POS and management system built for the floor — order-taking, kitchen display, table tracking, and live reporting in one place. Live at nexabrew.vercel.app.`,
      `Traveloop (side project): a trip-planning app for building itineraries, tracking budgets, and splitting costs with your crew. Open source on GitHub.`,
    ],
  },
  {
    id: "freeflow-product",
    title: "FreeFlow (Product)",
    url: "/products/freeflow",
    paragraphs: [
      `FreeFlow is SARIV's own product: the ultimate screen recorder for product teams. It ditches manual keyframing and captures cinematic, auto-zooming demos instantly, for macOS.`,
      `FreeFlow feature — Algorithmic Zooming: it calculates the optimal focal point and bounding box for every click, moving the camera with a custom spring physics animation. No manual keyframing required.`,
      `FreeFlow feature — Synthetic Cursor: FreeFlow hides the native, pixelated macOS cursor and renders a scalable vector cursor in post-production for maximum clarity at any zoom level.`,
      `FreeFlow feature — Privacy First: everything happens locally, using Apple's ScreenCaptureKit directly, so sensitive product data never leaves the user's machine.`,
      `FreeFlow feature — Hardware Accelerated: leverages the Metal API and Apple Silicon Media Engine to encode 4K 60fps ProRes video with near-zero CPU overhead.`,
      `FreeFlow technical FAQ — Requires macOS 13 (Ventura) or later, because it relies on the ScreenCaptureKit framework for high-performance, low-latency capture.`,
      `FreeFlow technical FAQ — Export formats: MP4 (H.264/HEVC), WebM (VP9), lossless ProRes 422, and optimized GIF generation for landing pages.`,
      `FreeFlow technical FAQ — Recordings are non-destructive: users can manually adjust the timing, easing curve, and bounding box of any automatic zoom directly in the timeline before exporting.`,
      `FreeFlow technical FAQ — Captures both microphone input and internal system audio simultaneously, on separate tracks for easy post-processing.`,
    ],
  },
  {
    id: "contact",
    title: "Contact",
    url: "/contact",
    paragraphs: [
      `SARIV's direct contact email is officialsariv@gmail.com. Headquarters: Surat, Gujarat, India — the team works globally remote.`,
      `SARIV on social media: Twitter/X @officialsariv, LinkedIn at linkedin.com/company/sariv, Instagram @hellosariv.`,
      `Use the Contact page for general questions. Use the Start a Project page instead for a new project inquiry with budget and timeline details.`,
    ],
  },
  {
    id: "start-project",
    title: "Start a Project",
    url: "/start-project",
    paragraphs: [
      `The Start a Project form captures project type (Web Design, Mobile App, Brand Identity, Product Design, or Other), budget range (Under $10k, $10k–$25k, $25k–$50k, or $50k+), and timeline (ASAP, 1–3 months, 3–6 months, or Flexible). SARIV responds to project inquiries within 24 hours.`,
    ],
  },
];

function toVectorLiteral(embedding) {
  return JSON.stringify(embedding);
}

for (const doc of DOCUMENTS) {
  console.log(`Embedding "${doc.title}" (${doc.paragraphs.length} chunks)...`);
  const { embeddings } = await embedMany({ model: embeddingModel, values: doc.paragraphs });

  await sql`delete from document_chunks where metadata->>'documentId' = ${doc.id}`;

  for (let i = 0; i < doc.paragraphs.length; i++) {
    const metadata = JSON.stringify({ documentId: doc.id, title: doc.title, url: doc.url });
    await sql`
      insert into document_chunks (source, content, embedding, metadata)
      values (${doc.url}, ${doc.paragraphs[i]}, ${toVectorLiteral(embeddings[i])}::vector, ${metadata}::jsonb)
    `;
  }
  console.log(`  → stored ${doc.paragraphs.length} chunks for "${doc.title}"`);
}

console.log("Done.");
