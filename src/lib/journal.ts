export type JournalPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  content: string; // Markdown or simple HTML for now
};

const posts: JournalPost[] = [
  {
    slug: "engineering-zero-technical-debt",
    title: "Engineering a Zero-Technical-Debt Foundation",
    description: "How we architected the SARIV frontend using Next.js App Router, strictly typed Tailwind v4, and Radix UI to ensure infinite scalability.",
    category: "Engineering",
    date: "July 22, 2026",
    content: `
# Engineering a Zero-Technical-Debt Foundation

At SARIV, we believe that the first 10% of a project dictates the trajectory of the remaining 90%. When we set out to build our own digital presence, we applied the exact same rigor we use for our enterprise clients.

## The Stack

We chose Next.js with the App Router for its advanced rendering paradigms (React Server Components), paired with Tailwind CSS v4 for utility-first styling without the bloat. 

By enforcing strict TypeScript configurations—disallowing \`any\` and implicit types—we eliminated an entire class of runtime errors before a single line of business logic was written.

### The Value of Discipline

Building without technical debt isn't about moving slowly; it's about moving predictably. By investing heavily in a robust foundation, we've created a platform that can scale infinitely, allowing our team to focus on what truly matters: crafting exceptional user experiences.
    `,
  },
  {
    slug: "designing-for-the-developer",
    title: "Designing for the Developer",
    description: "Our philosophy on building developer tools that feel like consumer products. Why aesthetics matter just as much as API performance.",
    category: "Design",
    date: "July 15, 2026",
    content: `
# Designing for the Developer

For too long, developer tools have been treated as second-class citizens in the design world. The assumption was that developers only care about utility, not aesthetics. We completely reject that premise.

## The Intersection of Form and Function

A great API needs a great interface. When we design for developers, we treat them with the same respect as a consumer. This means focusing on typography, whitespace, and micro-interactions just as much as we focus on latency and throughput.

### Creating Joyful Workflows

A beautiful tool is a joy to use. It reduces cognitive load, minimizes frustration, and ultimately leads to better, more creative work. At SARIV, we don't just build tools that work; we build tools that developers love to use.
    `,
  },
  {
    slug: "the-future-of-local-ai",
    title: "The Future of Local AI in macOS",
    description: "Exploring the capabilities of Apple Silicon's Neural Engine and why the future of agentic workflows might live entirely on-device.",
    category: "Artificial Intelligence",
    date: "July 01, 2026",
    content: `
# The Future of Local AI in macOS

The cloud has revolutionized AI, but the pendulum is swinging back to the edge. With the immense power of Apple Silicon's Neural Engine, we are on the cusp of a new era of on-device artificial intelligence.

## Privacy and Performance

Local AI offers two massive advantages: absolute privacy and zero-latency performance. When an agentic workflow doesn't need to make a round-trip to a data center, it can operate at the speed of thought.

### The Edge of Possibility

We are actively exploring how to harness this local power for our products. Imagine a world where your most sensitive data never leaves your machine, yet you still have access to state-of-the-art intelligence. That is the future we are building towards.
    `,
  },
];

export function getJournalPosts(): JournalPost[] {
  return posts;
}

export function getJournalPostBySlug(slug: string): JournalPost | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getJournalCategories(): string[] {
  const categories = new Set(posts.map((post) => post.category));
  return ["All", ...Array.from(categories)];
}
