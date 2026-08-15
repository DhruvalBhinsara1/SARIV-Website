import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main className="flex-1 w-full bg-background pt-32 pb-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-28">
        <div>
          <Skeleton className="h-4 w-28 mb-6" />
          <Skeleton className="h-16 w-48 rounded-xl mb-6" />
          <Skeleton className="h-5 w-full mb-2" />
          <Skeleton className="h-5 w-full mb-2" />
          <Skeleton className="h-5 w-[70%] mb-8" />
          <div className="flex gap-4">
            <Skeleton className="h-12 w-44 rounded-full" />
            <Skeleton className="h-12 w-40 rounded-full" />
          </div>
        </div>
        <Skeleton className="h-64 md:h-96 w-full rounded-2xl" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <Skeleton className="h-4 w-32 mb-4" />
        <Skeleton className="h-12 w-[60%] max-w-md" />
      </div>
    </main>
  );
}
