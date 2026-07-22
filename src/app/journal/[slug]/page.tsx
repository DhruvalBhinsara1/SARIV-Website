import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { getJournalPostBySlug, getJournalPosts } from "@/lib/journal";
import { Typography } from "@/components/ui/Typography";

export async function generateStaticParams() {
  const posts = getJournalPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getJournalPostBySlug(slug);

  if (!post) return {};

  return {
    title: `${post.title} | SARIV Journal`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function JournalPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getJournalPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex-1 w-full bg-background pt-32 pb-24">
      <div className="max-w-[800px] mx-auto px-4 md:px-8">
        <Link 
          href="/journal" 
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Journal
        </Link>

        <header className="mb-16 animate-fade-up">
          <Typography variant="caption" transform="uppercase" muted className="mb-4">
            {post.category} • {post.date}
          </Typography>
          <Typography variant="display" className="mb-6">
            {post.title}
          </Typography>
          <Typography variant="body" className="text-xl text-muted-foreground leading-relaxed">
            {post.description}
          </Typography>
        </header>

        <article className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => <Typography variant="heading" className="mt-12 mb-6 text-3xl" {...props} />,
              h2: ({ node, ...props }) => <Typography variant="heading" className="mt-12 mb-6 text-2xl" {...props} />,
              h3: ({ node, ...props }) => <Typography variant="subheading" className="mt-8 mb-4 font-bold" {...props} />,
              p: ({ node, ...props }) => <Typography variant="body" className="mb-6 leading-relaxed" {...props} />,
              a: ({ node, ...props }) => <a className="text-secondary hover:underline underline-offset-4" {...props} />,
              ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-6 space-y-2 text-muted-foreground" {...props} />,
              li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
              blockquote: ({ node, ...props }) => (
                <blockquote className="border-l-4 border-secondary pl-6 italic my-8 text-muted-foreground" {...props} />
              ),
              code: ({ node, className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || "");
                const isInline = !match && !className;
                return isInline ? (
                  <code className="bg-surface-elevated px-1.5 py-0.5 rounded-md text-sm font-mono text-primary" {...props}>
                    {children}
                  </code>
                ) : (
                  <div className="rounded-xl overflow-hidden my-8 border border-border shadow-elevation">
                    <pre className="bg-surface-elevated p-6 overflow-x-auto text-sm font-mono leading-relaxed">
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  </div>
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>
      </div>
    </main>
  );
}
