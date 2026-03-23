export default function ProviderLoading() {
  return (
    <main className="pt-16 pb-32">
      {/* Hero skeleton */}
      <div className="h-72 md:h-96 w-full bg-surface-container-high animate-pulse" />

      {/* Content skeleton */}
      <div className="max-w-4xl mx-auto px-6 -mt-16 relative z-10">
        <div className="bg-surface-container-lowest rounded-2xl p-8 md:p-12 shadow-xl space-y-6">
          {/* Title */}
          <div className="h-8 w-64 rounded bg-surface-container-high animate-pulse" />
          {/* Subtitle */}
          <div className="h-4 w-48 rounded bg-surface-container-high animate-pulse" />

          {/* Rating and badges row */}
          <div className="flex gap-3 mt-4">
            <div className="h-7 w-16 rounded-lg bg-surface-container-high animate-pulse" />
            <div className="h-7 w-20 rounded-lg bg-surface-container-high animate-pulse" />
            <div className="h-7 w-24 rounded-lg bg-surface-container-high animate-pulse" />
          </div>

          {/* Description lines */}
          <div className="space-y-3 pt-4">
            <div className="h-4 w-full rounded bg-surface-container-high animate-pulse" />
            <div className="h-4 w-full rounded bg-surface-container-high animate-pulse" />
            <div className="h-4 w-3/4 rounded bg-surface-container-high animate-pulse" />
          </div>

          {/* Services section */}
          <div className="pt-6 space-y-4">
            <div className="h-6 w-32 rounded bg-surface-container-high animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-24 rounded-xl bg-surface-container-high animate-pulse" />
              <div className="h-24 rounded-xl bg-surface-container-high animate-pulse" />
            </div>
          </div>

          {/* CTA button */}
          <div className="h-12 w-48 rounded-xl bg-surface-container-high animate-pulse mt-6" />
        </div>
      </div>
    </main>
  );
}
