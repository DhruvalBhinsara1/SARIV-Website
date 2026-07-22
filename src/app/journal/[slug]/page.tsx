import Link from "next/link";
import { Typography } from "@/components/ui/Typography";
import { ArrowLeft } from "lucide-react";

export default function JournalArticlePage() {
  return (
    <main className="flex-1 w-full bg-background pt-32 pb-32">
      <article className="max-w-[720px] mx-auto px-4 md:px-8">
        
        {/* Breadcrumbs / Back */}
        <Link href="/journal" className="inline-flex items-center text-muted hover:text-primary transition-colors font-body text-sm font-medium mb-16 group">
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Journal
        </Link>

        {/* Article Header */}
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <Typography variant="caption" transform="uppercase" className="text-secondary font-semibold">
              Engineering
            </Typography>
            <span className="text-muted text-sm font-body font-medium">July 22, 2026</span>
          </div>
          <Typography variant="heading" className="mb-6">
            Engineering a Zero-Technical-Debt Foundation
          </Typography>
          <Typography variant="subheading" muted>
            How we architected the SARIV frontend using Next.js App Router, strictly typed Tailwind v4, and Radix UI to ensure infinite scalability.
          </Typography>
        </header>

        {/* Mock Article Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none flex flex-col gap-6">
          <Typography variant="body">
            When we set out to build the SARIV digital experience, we established a non-negotiable constraint: zero technical debt. In an era where web applications often accumulate layers of obsolete dependencies and brittle CSS over months, we engineered our stack for decades.
          </Typography>

          <Typography variant="subheading" className="mt-8 mb-4">
            The Architecture
          </Typography>

          <Typography variant="body">
            We chose Next.js App Router for its aggressive server-side optimizations. By treating every component as a Server Component by default, we effectively zeroed out our client-side JavaScript payload for the core reading experience. Interactivity was pushed to the absolute leaves of our component tree.
          </Typography>

          <div className="my-8 p-6 bg-surface-elevated border border-border rounded-xl font-mono text-sm text-primary overflow-x-auto">
            <pre>
              <code>
{`// src/app/journal/page.tsx
export default async function JournalIndex() {
  const posts = await fetchPosts();
  return (
    <main>
      <PostGrid posts={posts} />
    </main>
  );
}`}
              </code>
            </pre>
          </div>

          <Typography variant="body">
            Design tokens were meticulously mapped into Tailwind CSS v4. Instead of arbitrary pixel values scattered across stylesheets, every margin, padding, and font size references our canonical Design System.
          </Typography>

          <Typography variant="subheading" className="mt-8 mb-4">
            The Result
          </Typography>

          <Typography variant="body">
            The result is an application that achieves a perfect 100 on Lighthouse performance scores, passes strict WCAG AA accessibility audits natively via Radix UI, and provides our engineering team with complete type-safety through strict TypeScript compliance.
          </Typography>
        </div>
      </article>
    </main>
  );
}
