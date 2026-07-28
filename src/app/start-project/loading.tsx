import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main className="flex-1 w-full bg-background pt-32 pb-24">
      <div className="max-w-[720px] mx-auto px-4 md:px-8">
        <Skeleton className="h-4 w-32 mb-6" />
        <Skeleton className="h-12 md:h-14 w-[90%] mb-4" />
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-5 w-[80%] mb-16" />

        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row gap-8">
            <Skeleton className="h-14 flex-1 rounded-lg" />
            <Skeleton className="h-14 flex-1 rounded-lg" />
          </div>
          <Skeleton className="h-14 w-full rounded-lg" />
          <div className="flex flex-col md:flex-row gap-8">
            <Skeleton className="h-14 flex-1 rounded-lg" />
            <Skeleton className="h-14 flex-1 rounded-lg" />
            <Skeleton className="h-14 flex-1 rounded-lg" />
          </div>
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-12 w-40 rounded-full" />
        </div>
      </div>
    </main>
  );
}
