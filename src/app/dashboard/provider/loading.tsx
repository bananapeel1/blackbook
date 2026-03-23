import Skeleton from "@/components/Skeleton";

export default function ProviderDashboardLoading() {
  return (
    <main className="pt-20 pb-32 container mx-auto px-6">
      <div className="mb-8">
        <Skeleton className="h-12 w-72 mb-3" />
        <Skeleton className="h-5 w-48" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-28 rounded-2xl" />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Skeleton className="h-80 rounded-2xl" />
        <Skeleton className="h-80 rounded-2xl" />
      </div>
    </main>
  );
}
