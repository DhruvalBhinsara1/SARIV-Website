import Link from "next/link";
import { Typography } from "@/components/ui/Typography";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/Button";

// Mock data for the Journal index
const posts = [
  {
    slug: "engineering-zero-technical-debt",
    title: "Engineering a Zero-Technical-Debt Foundation",
    description: "How we architected the SARIV frontend using Next.js App Router, strictly typed Tailwind v4, and Radix UI to ensure infinite scalability.",
    category: "Engineering",
    date: "July 22, 2026",
  },
  {
    slug: "designing-for-the-developer",
    title: "Designing for the Developer",
    description: "Our philosophy on building developer tools that feel like consumer products. Why aesthetics matter just as much as API performance.",
    category: "Design",
    date: "July 15, 2026",
  },
  {
    slug: "the-future-of-local-ai",
    title: "The Future of Local AI in macOS",
    description: "Exploring the capabilities of Apple Silicon's Neural Engine and why the future of agentic workflows might live entirely on-device.",
    category: "Artificial Intelligence",
    date: "July 01, 2026",
  }
];

const categories = ["All", "Engineering", "Design", "Artificial Intelligence", "Product"];

export default function JournalIndexPage() {
  return (
    <main className="flex-1 w-full bg-background pt-32 pb-24">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <Typography variant="display" className="mb-12 animate-fade-up">
          The Journal
        </Typography>

        {/* Category Filters (UI Only) */}
        <div className="flex flex-wrap gap-2 mb-16 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          {categories.map((category, i) => (
            <button
              key={category}
              className={buttonVariants({ variant: i === 0 ? "secondary" : "ghost", size: "small" })}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <Link key={post.slug} href={`/journal/${post.slug}`} className="group h-full">
              <Card className="h-full flex flex-col justify-between transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-elevation animate-fade-up" style={{ animationDelay: `${0.15 + (i * 0.05)}s` }}>
                <CardHeader>
                  <Typography variant="caption" transform="uppercase" muted className="mb-4">
                    {post.category}
                  </Typography>
                  <CardTitle className="group-hover:text-secondary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="mt-4 flex flex-col justify-end">
                  <CardDescription className="mb-6">
                    {post.description}
                  </CardDescription>
                  <Typography variant="caption" muted>
                    {post.date}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
