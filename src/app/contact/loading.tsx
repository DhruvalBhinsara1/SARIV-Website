import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main className="flex-1 w-full bg-background min-h-[100dvh] flex flex-col justify-center pt-24 pb-12">
      <div className="max-w-[600px] mx-auto px-6 w-full">
        <Skeleton className="h-12 w-48 mb-6" />
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-5 w-[70%] mb-10" />

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <Skeleton className="h-3 w-12 mb-2" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
          <div>
            <Skeleton className="h-3 w-12 mb-2" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
        </div>
        <Skeleton className="h-3 w-20 mb-2" />
        <Skeleton className="h-32 w-full rounded-lg mb-8" />
        <Skeleton className="h-12 w-40 rounded-full" />
      </div>
    </main>
  );
}
