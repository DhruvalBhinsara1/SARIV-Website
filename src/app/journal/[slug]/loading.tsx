import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main className="flex-1 w-full bg-background pt-32 pb-24">
      <article className="max-w-[720px] mx-auto px-4 md:px-8">
        <Skeleton className="h-4 w-28 mb-10" />
        <Skeleton className="h-4 w-24 mb-4" />
        <Skeleton className="h-12 md:h-16 w-full mb-2" />
        <Skeleton className="h-12 md:h-16 w-[70%] mb-8" />
        <Skeleton className="h-4 w-32 mb-16" />

        <div className="flex flex-col gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-full" />
          ))}
          <Skeleton className="h-5 w-[60%]" />
        </div>
      </article>
    </main>
  );
}
