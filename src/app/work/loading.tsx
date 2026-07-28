import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main className="flex-1 w-full bg-background pt-32 pb-24">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 mb-24">
        <Skeleton className="h-14 md:h-20 w-64 mb-8" />
        <Skeleton className="h-5 w-[90%] max-w-2xl mb-2" />
        <Skeleton className="h-5 w-[70%] max-w-xl" />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[minmax(0,auto)] md:auto-rows-[minmax(360px,auto)]">
        <Skeleton className="col-span-2 lg:row-span-2 rounded-[2rem] h-full min-h-[280px]" />
        <Skeleton className="aspect-[4/5] lg:aspect-auto col-span-1 row-span-1 rounded-2xl md:rounded-[2rem]" />
        <Skeleton className="aspect-[4/5] lg:aspect-auto col-span-1 row-span-1 rounded-2xl md:rounded-[2rem]" />
      </div>
    </main>
  );
}
