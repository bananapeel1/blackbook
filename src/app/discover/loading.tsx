export default function DiscoverLoading() {
  return (
    <main className="pt-24 pb-32 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header skeleton */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="space-y-3">
          <div className="h-3 w-32 rounded bg-surface-container-high animate-pulse" />
          <div className="h-10 w-72 rounded bg-surface-container-high animate-pulse" />
          <div className="h-4 w-56 rounded bg-surface-container-high animate-pulse" />
        </div>
        <div className="h-10 w-40 rounded-xl bg-surface-container-high animate-pulse" />
      </div>

      {/* Filter bar skeleton */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
        <div className="md:col-span-2 h-14 rounded-xl bg-surface-container-high animate-pulse" />
        <div className="h-14 rounded-xl bg-surface-container-high animate-pulse" />
        <div className="h-14 rounded-xl bg-surface-container-high animate-pulse" />
      </section>

      {/* Provider card skeletons */}
      <div className="space-y-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="bg-surface-container-low rounded-2xl overflow-hidden flex flex-col md:flex-row"
          >
            {/* Image placeholder */}
            <div className="w-full md:w-72 h-48 md:h-auto bg-surface-container-high animate-pulse" />
            {/* Content placeholder */}
            <div className="flex-1 p-6 md:p-8 space-y-4">
              <div className="flex justify-between">
                <div className="space-y-2">
                  <div className="h-6 w-48 rounded bg-surface-container-high animate-pulse" />
                  <div className="h-4 w-36 rounded bg-surface-container-high animate-pulse" />
                </div>
                <div className="h-6 w-12 rounded bg-surface-container-high animate-pulse" />
              </div>
              <div className="h-4 w-full rounded bg-surface-container-high animate-pulse" />
              <div className="h-4 w-3/4 rounded bg-surface-container-high animate-pulse" />
              <div className="flex gap-2 mt-4">
                <div className="h-7 w-20 rounded-lg bg-surface-container-high animate-pulse" />
                <div className="h-7 w-24 rounded-lg bg-surface-container-high animate-pulse" />
              </div>
              <div className="flex justify-between items-center pt-6 border-t border-outline-variant/20 mt-6">
                <div className="h-4 w-24 rounded bg-surface-container-high animate-pulse" />
                <div className="h-11 w-32 rounded-xl bg-surface-container-high animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
