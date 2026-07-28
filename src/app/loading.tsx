import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main className="flex-1 w-full bg-background">
      <div className="h-screen flex flex-col items-center justify-center gap-6 px-4">
        <Skeleton className="h-12 md:h-20 w-[85%] max-w-[900px]" />
        <Skeleton className="h-12 md:h-20 w-[70%] max-w-[700px]" />
        <Skeleton className="h-5 w-[90%] max-w-[500px] mt-6" />
        <Skeleton className="h-5 w-[70%] max-w-[400px]" />
        <div className="flex gap-4 mt-6">
          <Skeleton className="h-12 w-36 rounded-full" />
          <Skeleton className="h-12 w-36 rounded-full" />
        </div>
      </div>

      <section className="px-4 md:px-20 py-24 md:py-40 flex justify-center border-t border-border">
        <div className="w-full max-w-[1200px] flex flex-col items-center gap-4">
          <Skeleton className="h-10 md:h-14 w-[95%]" />
          <Skeleton className="h-10 md:h-14 w-[80%]" />
        </div>
      </section>
    </main>
  );
}
