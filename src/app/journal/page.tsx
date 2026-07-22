import Link from "next/link";
import { Typography } from "@/components/ui/Typography";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/Button";
import { getJournalPosts, getJournalCategories } from "@/lib/journal";

export default async function JournalIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: activeCategory = "All" } = await searchParams;
  const allPosts = getJournalPosts();
  const categories = getJournalCategories();

  const filteredPosts =
    activeCategory === "All"
      ? allPosts
      : allPosts.filter((post) => post.category === activeCategory);

  return (
    <main className="flex-1 w-full bg-background pt-32 pb-24">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <Typography variant="display" className="mb-12 animate-fade-up">
          The Journal
        </Typography>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-16 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          {categories.map((category, i) => {
            const isActive = category === activeCategory;
            return (
              <Link
                key={category}
                href={category === "All" ? "/journal" : `/journal?category=${encodeURIComponent(category)}`}
                className={buttonVariants({ variant: isActive ? "secondary" : "ghost", size: "small" })}
              >
                {category}
              </Link>
            );
          })}
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, i) => (
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
        
        {filteredPosts.length === 0 && (
          <div className="py-20 text-center">
            <Typography variant="body" muted>No articles found for this category.</Typography>
          </div>
        )}
      </div>
    </main>
  );
}
