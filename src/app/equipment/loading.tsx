import { Skeleton } from "@/components/ui/skeleton";

const EquipmentCardSkeleton = () => (
  <div className="h-full overflow-hidden rounded-xl border border-border bg-card shadow-sm">
    <Skeleton className="aspect-[4/3] w-full rounded-none" />
    <div className="space-y-3 px-4 pt-4 pb-3">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-5 w-4/5" />
      <Skeleton className="h-3 w-2/3" />
      <div className="flex items-end justify-between gap-3 pt-3">
        <div className="space-y-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="h-6 w-16 rounded-md" />
      </div>
    </div>
    <div className="p-4">
      <Skeleton className="h-9 w-full" />
    </div>
  </div>
);

const Loading = () => {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div role="status" aria-label="Loading equipment" className="space-y-1">
        <span className="sr-only">Loading equipment…</span>

        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-8 w-56 sm:h-9" />
        <Skeleton className="h-4 w-72 max-w-full" />

        <div className="mt-6 rounded-xl border border-border bg-card p-4 sm:p-5">
          <Skeleton className="mb-4 h-5 w-40" />
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-9 w-full" />
            </div>
            <Skeleton className="h-9 w-full lg:w-32" />
            <div className="space-y-2 lg:w-52">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-9 w-full" />
            </div>
          </div>
          <div className="mt-5 grid gap-4 border-t border-border pt-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-9 w-full" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-14" />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <EquipmentCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Loading;
