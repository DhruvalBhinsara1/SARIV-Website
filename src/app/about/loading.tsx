import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main className="flex-1 w-full bg-background pt-32 pb-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <Skeleton className="h-4 w-32 mb-4" />
        <Skeleton className="h-14 md:h-20 w-[90%] max-w-2xl mb-3" />
        <Skeleton className="h-14 md:h-20 w-[60%] max-w-md mb-8" />
        <Skeleton className="h-5 w-[80%] max-w-lg mb-2" />
        <Skeleton className="h-5 w-[60%] max-w-md mb-10" />
        <Skeleton className="h-12 w-40 rounded-full" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-8 mt-28 grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-40 rounded-2xl" />
        ))}
      </div>
    </main>
  );
}
