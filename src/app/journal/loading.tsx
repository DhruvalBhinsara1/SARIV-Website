import { Skeleton } from "@/components/ui/Skeleton";

// Mirrors the magazine layout in page.tsx + JournalClient: masthead, category
// filters, one lead story, a pair of tinted tall cards, two numbered wide
// rows, two quiet title-only rows, and pagination — same shapes and spacing
// so nothing shifts when real content swaps in.
export default function Loading() {
  return (
    <main className="flex-1 w-full bg-background pt-32 md:pt-40 pb-32">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Masthead */}
        <header className="border-b border-border pb-12 md:pb-16 mb-12">
          <div className="flex items-center gap-3 mb-10">
            <Skeleton className="h-4 w-4 rounded-sm" />
            <Skeleton className="h-3 w-40" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-8 md:gap-20 items-end">
            <div className="flex flex-col gap-3">
              <Skeleton className="h-12 md:h-24 w-[85%]" />
              <Skeleton className="h-12 md:h-24 w-[55%]" />
            </div>
            <div className="flex flex-col gap-3 md:pb-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </header>

        {/* Category filters */}
        <div className="flex flex-wrap items-center gap-6 border-b border-border pb-6 mb-16 md:mb-24">
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-24" />
        </div>

        {/* Lead story */}
        <div className="border-b border-border pb-16 md:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] md:items-end gap-6 md:gap-16">
            <div className="max-w-3xl w-full">
              <div className="flex items-center gap-3 mb-8">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-3" />
                <Skeleton className="h-3 w-28" />
              </div>
              <div className="flex flex-col gap-3 mb-6">
                <Skeleton className="h-10 md:h-16 w-[90%]" />
                <Skeleton className="h-10 md:h-16 w-[50%]" />
              </div>
              <div className="flex flex-col gap-2 max-w-xl">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
              </div>
            </div>
            <Skeleton className="h-3 w-20 shrink-0" />
          </div>
        </div>

        {/* Tall pair — tinted, matches the real cards' rest-state color */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 py-16 md:py-24">
          {["bg-mist-blue", "bg-warm-sand"].map((tint, i) => (
            <div key={i} className={`${tint} rounded-2xl p-8 md:p-10 min-h-[320px] flex flex-col justify-between`}>
              <div className="flex items-center gap-3">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-3" />
                <Skeleton className="h-3 w-20" />
              </div>
              <div className="flex flex-col gap-3">
                <Skeleton className="h-7 w-[80%]" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                <Skeleton className="h-3 w-12 mt-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Wide rows */}
        <div className="flex flex-col border-t border-border">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-[64px_1fr_1fr] gap-4 md:gap-12 items-start border-b border-border py-10 md:py-12"
            >
              <Skeleton className="h-3 w-6" />
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-3" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-8 w-[75%]" />
              </div>
              <div className="flex flex-col gap-2 max-w-md md:pt-8">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>

        {/* Quiet rows */}
        <div className="flex flex-col pt-16 md:pt-24">
          <Skeleton className="h-3 w-28 mb-8" />
          {[0, 1].map((i) => (
            <div key={i} className="border-b border-border py-10 md:py-14">
              <div className="flex items-center gap-3 mb-4">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-3" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-8 md:h-10 w-[60%] max-w-2xl" />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 pt-20">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-9 rounded-full" />
          ))}
        </div>
      </div>
    </main>
  );
}
