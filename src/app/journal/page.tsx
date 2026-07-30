import { getJournalPosts, getJournalCategories } from "@/lib/journal";
import { Mark } from "@/components/Mark";
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
    <main className="flex-1 w-full bg-background pt-32 md:pt-40 pb-32">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Masthead */}
        <header className="border-b border-border pb-12 md:pb-16 mb-12 animate-fade-up">
          <div className="flex items-center gap-3 mb-10">
            <Mark className="w-4 h-4 text-secondary" />
            <span className="font-body text-secondary uppercase tracking-[0.25em] text-[11px] font-semibold">
              The SARIV Journal
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-8 md:gap-20 items-end">
            <h1 className="font-display font-normal text-primary text-[clamp(48px,8vw,110px)] leading-[0.9] tracking-[-0.03em]">
              Notes on
              <br />
              building well.
            </h1>
            <p className="font-body text-secondary text-base md:text-lg leading-relaxed md:pb-4">
              Essays on design, engineering, and the decisions behind the products we ship. Written
              when we have something worth saying — not on a schedule.
            </p>
          </div>
        </header>

        <JournalClient
          initialCategory={activeCategory}
          categories={categories}
          allPosts={allPosts}
        />
      </div>
    </main>
  );
}
