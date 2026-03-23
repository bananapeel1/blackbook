import Skeleton from "@/components/Skeleton";

export default function DashboardLoading() {
  return (
    <main className="pt-20 pb-32 container mx-auto px-6">
      <div className="mb-8">
        <Skeleton className="h-12 w-64 mb-3" />
        <Skeleton className="h-5 w-96" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 space-y-6">
          <Skeleton className="h-64 rounded-2xl" />
          <Skeleton className="h-48 rounded-2xl" />
        </div>
        <div className="md:col-span-4 space-y-6">
          <Skeleton className="h-40 rounded-2xl" />
          <Skeleton className="h-40 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
        </div>
      </div>
    </main>
  );
}
