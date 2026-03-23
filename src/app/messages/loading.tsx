import Skeleton from "@/components/Skeleton";

export default function MessagesLoading() {
  return (
    <main className="pt-20 pb-32 container mx-auto px-6">
      <div className="mb-8">
        <Skeleton className="h-12 w-48 mb-3" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[600px]">
        <div className="md:col-span-4 space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-20 rounded-xl" />
          ))}
        </div>
        <div className="md:col-span-8">
          <Skeleton className="h-full rounded-2xl" />
        </div>
      </div>
    </main>
  );
}
