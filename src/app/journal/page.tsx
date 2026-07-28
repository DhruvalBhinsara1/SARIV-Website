import { Typography } from "@/components/ui/Typography";
import { getJournalPosts, getJournalCategories } from "@/lib/journal";
import { JournalClient } from "./JournalClient";

export default async function JournalIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: activeCategory = "All" } = await searchParams;
  const allPosts = await getJournalPosts();
  const categories = await getJournalCategories();

  return (
    <main className="flex-1 w-full bg-background pt-32 pb-24">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <Typography variant="display" className="mb-12 animate-fade-up">
          The Journal
        </Typography>

        <JournalClient 
          initialCategory={activeCategory} 
          categories={categories} 
          allPosts={allPosts} 
        />
      </div>
    </main>
  );
}
