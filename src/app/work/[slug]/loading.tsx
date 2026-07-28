import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main className="flex-1 w-full bg-background pt-32 pb-32">
      <article className="max-w-[900px] mx-auto px-4 md:px-8">
        <Skeleton className="h-4 w-28 mb-16" />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8">
          <div className="max-w-2xl w-full">
            <Skeleton className="h-4 w-40 mb-6" />
            <Skeleton className="h-12 md:h-16 w-full mb-2" />
            <Skeleton className="h-12 md:h-16 w-[70%]" />
          </div>
          <Skeleton className="h-11 w-40 rounded-full shrink-0" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-border mb-20">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="h-3 w-16 mb-3" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <Skeleton className="h-64 md:h-96 w-full rounded-2xl mb-8" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-[80%]" />
        </div>
      </article>
    </main>
  );
}
