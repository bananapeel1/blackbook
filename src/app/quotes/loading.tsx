import Skeleton from "@/components/Skeleton";

export default function QuotesLoading() {
  return (
    <main className="pt-20 pb-32 container mx-auto px-6">
      <div className="mb-8">
        <Skeleton className="h-12 w-48 mb-3" />
        <Skeleton className="h-5 w-72" />
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32 rounded-2xl" />
        ))}
      </div>
    </main>
  );
}
