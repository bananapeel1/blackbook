import Skeleton from "@/components/Skeleton";

export default function VesselsLoading() {
  return (
    <main className="pt-20 pb-32 container mx-auto px-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Skeleton className="h-12 w-48 mb-3" />
          <Skeleton className="h-5 w-72" />
        </div>
        <Skeleton className="h-12 w-32 rounded-lg" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-48 rounded-2xl" />
        ))}
      </div>
    </main>
  );
}
